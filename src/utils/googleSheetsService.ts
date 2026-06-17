/**
 * Google Sheets API Service Layer for Virtuabled South Africa
 * Handles fetching placement statistics, compliance ratios, and candidate registries
 * from user-linked spreadsheets, adhering to the standard OAuth scope authorization models.
 */

export interface LivePlacementData {
  professionalsPlaced: number;
  complianceTargetsAchieved: number;
  operationalGains: number;
  totalCandidates: number;
  lastSyncedAt: string;
  sourceSpreadsheetId?: string;
}

// Default values — zeroed until live Sheets data is wired in (company is newly launched)
export const DEFAULT_PLACEMENT_DATA: LivePlacementData = {
  professionalsPlaced: 0,
  complianceTargetsAchieved: 0,
  operationalGains: 0,
  totalCandidates: 0,
  lastSyncedAt: new Date().toISOString(),
};

const CACHE_KEY = "virtuabled_google_sheets_data";
const CONFIG_KEY = "virtuabled_google_sheets_config";

export interface SheetsConfig {
  spreadsheetId: string;
  rangeName: string;
  developerToken?: string;
}

export const getCachedPlacementData = (): LivePlacementData => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Failed to read cached sheets data", err);
  }
  return DEFAULT_PLACEMENT_DATA;
};

export const getSheetsConfig = (): SheetsConfig => {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Failed to read Google Sheets configuration", err);
  }
  return {
    spreadsheetId: "", // Leave blank for enterprise link
    rangeName: "VirtuabledStats!A1:B10",
  };
};

export const saveSheetsConfig = (config: SheetsConfig) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
};

/**
 * Fetch stats directly from Google Sheets API
 * Format expected:
 * | MetricName                  | Value |
 * | Professionals Placed        | 247   |
 * | Compliance Targets Achieved | 100   |
 * | Turnkey Operational Gains   | 43    |
 * | Total Candidate Count       | 512   |
 */
export async function fetchLiveStatsFromGoogleSheets(
  accessToken: string,
  spreadsheetId: string,
  range = "VirtuabledStats!A1:B10"
): Promise<LivePlacementData> {
  if (!spreadsheetId.trim()) {
    throw new Error("Google Spreadsheet ID is required to fetch live values.");
  }

  // Construct standard Google Sheets API read endpoint
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    spreadsheetId
  )}/values/${encodeURIComponent(range)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Sheets retrieval failed", errorDetails);
    throw new Error(`Google Sheets API responded with status ${response.status}: ${errorDetails}`);
  }

  const payload = await response.json();
  const rows: string[][] = payload.values || [];

  if (!rows || rows.length === 0) {
    throw new Error("Spreadsheet was read successfully but returned empty rows.");
  }

  // Parse row-based or key-value structures
  let professionalsPlaced = DEFAULT_PLACEMENT_DATA.professionalsPlaced;
  let complianceTargetsAchieved = DEFAULT_PLACEMENT_DATA.complianceTargetsAchieved;
  let operationalGains = DEFAULT_PLACEMENT_DATA.operationalGains;
  let totalCandidates = DEFAULT_PLACEMENT_DATA.totalCandidates;

  rows.forEach((row) => {
    if (row.length >= 2) {
      const key = row[0].toLowerCase().trim();
      const val = parseInt(row[1].replace(/[^0-9]/g, ""), 10);
      if (!isNaN(val)) {
        if (key.includes("placed") || key.includes("professionals")) {
          professionalsPlaced = val;
        } else if (key.includes("compliance") || key.includes("target")) {
          complianceTargetsAchieved = val;
        } else if (key.includes("operational") || key.includes("gain")) {
          operationalGains = val;
        } else if (key.includes("candidates") || key.includes("total")) {
          totalCandidates = val;
        }
      }
    }
  });

  const liveData: LivePlacementData = {
    professionalsPlaced,
    complianceTargetsAchieved,
    operationalGains,
    totalCandidates,
    lastSyncedAt: new Date().toISOString(),
    sourceSpreadsheetId: spreadsheetId,
  };

  // Cache locally
  localStorage.setItem(CACHE_KEY, JSON.stringify(liveData));
  
  // Also dispatch a custom event so other components receive real-time updates!
  window.dispatchEvent(new CustomEvent("virtuabled-stats-updated", { detail: liveData }));

  return liveData;
}
