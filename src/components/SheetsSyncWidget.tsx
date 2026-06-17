import React, { useState, useEffect } from "react";
import { Link2, RefreshCw, CheckCircle2, AlertTriangle, FileSpreadsheet, Eye, Info } from "lucide-react";
import { 
  getSheetsConfig, 
  saveSheetsConfig, 
  fetchLiveStatsFromGoogleSheets, 
  getCachedPlacementData, 
  LivePlacementData 
} from "@/utils/googleSheetsService";

interface SheetsSyncWidgetProps {
  onSyncComplete?: (data: LivePlacementData) => void;
  showToast?: (title: string, type: "success" | "info" | "warning", text: string) => void;
}

export function SheetsSyncWidget({ onSyncComplete, showToast }: SheetsSyncWidgetProps) {
  const [config, setConfig] = useState(getSheetsConfig());
  const [stats, setStats] = useState<LivePlacementData>(getCachedPlacementData());
  const [tokenInput, setTokenInput] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [sheetsLogs, setSheetsLogs] = useState<string[]>([]);

  useEffect(() => {
    // Keep local stats synced with any global events (e.g. if synced from home or elsewhere)
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<LivePlacementData>;
      if (customEvent.detail) {
        setStats(customEvent.detail);
      }
    };
    window.addEventListener("virtuabled-stats-updated", handleUpdate);
    return () => window.removeEventListener("virtuabled-stats-updated", handleUpdate);
  }, []);

  const addLog = (text: string) => {
    setSheetsLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${text}`]);
  };

  const handleSaveConfig = () => {
    saveSheetsConfig(config);
    if (showToast) {
      showToast("Settings Saved", "info", "Google Sheets synchronization mapping has been recorded.");
    } else {
      alert("Google Sheets configuration saved!");
    }
    addLog(`Configuration saved. Target: ${config.spreadsheetId ? config.spreadsheetId.slice(0, 8) + "..." : "None"}`);
  };

  const handleFetchLiveStats = async () => {
    if (!config.spreadsheetId.trim()) {
      setSyncError("Spreadsheet ID is required. Please check your config settings.");
      if (showToast) showToast("Config Error", "warning", "Please provide a valid Google Spreadsheet ID.");
      return;
    }

    const token = tokenInput.trim();
    if (!token) {
      setSyncError("Access Token is required to authenticate with the Google Sheets API.");
      if (showToast) showToast("Authentication Required", "warning", "An OAuth developer access token is required.");
      return;
    }

    setIsSyncing(true);
    setSyncError(null);
    addLog("Reading Sheets configuration...");
    addLog(`Targeting Sheet range: ${config.rangeName}...`);
    
    try {
      addLog("Initializing secure Google Sheets API connection handshake...");
      // Fetch stats using our service layer
      const freshData = await fetchLiveStatsFromGoogleSheets(
        token,
        config.spreadsheetId,
        config.rangeName
      );

      setStats(freshData);
      addLog(`API Handshake Success! Sourced metrics successfully.`);
      addLog(`Metrics Parsed: Placement stats = ${freshData.professionalsPlaced}, Registry total = ${freshData.totalCandidates}.`);
      
      if (onSyncComplete) {
        onSyncComplete(freshData);
      }

      if (showToast) {
        showToast(
          "Synchronization Completed",
          "success",
          "Live placement metrics and candidate counts successfully updated across all pages."
        );
      }
    } catch (err: any) {
      console.error(err);
      const msg = err.message || "Unknown retrieval error occurred.";
      setSyncError(msg);
      addLog(`Sync Failure: ${msg}`);
      if (showToast) {
        showToast("Synchronization Failed", "warning", "Failed to retrieve and map Google Sheets data.");
      }
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-6 md:p-8 relative">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-xl mb-8">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-505/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono uppercase rounded mb-3">
          Sourcing & Metrics
        </span>
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <FileSpreadsheet size={18} className="text-emerald-400" /> Google Sheets Live Sourcing Connector
        </h3>
        <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">
          Establish a direct real-time link between your enterprise workspace and live Google Sheets records. 
          Synchronize public recruitment totals, active placements, and B-BBEE target metrics automatically across the portal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Connection Setup */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="sheets-id-input" className="text-[10px] font-bold text-white uppercase tracking-widest block">
              Spreadsheet ID
            </label>
            <input
              id="sheets-id-input"
              type="text"
              placeholder="e.g., 1tS_W-Gz_Z7p7b8yX78BfV6V64..."
              value={config.spreadsheetId}
              onChange={(e) => setConfig({ ...config, spreadsheetId: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-gray-800 px-4 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="sheets-range-input" className="text-[10px] font-bold text-white uppercase tracking-widest block">
                Sheet Range
              </label>
              <input
                id="sheets-range-input"
                type="text"
                placeholder="VirtuabledStats!A1:B10"
                value={config.rangeName}
                onChange={(e) => setConfig({ ...config, rangeName: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-gray-800 px-4 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleSaveConfig}
                className="w-full py-3 bg-zinc-900 border border-gray-850 hover:bg-zinc-800 hover:border-gray-700 text-white text-[11px] uppercase font-mono font-bold tracking-widest rounded-xl transition-all"
              >
                Save Settings
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="sheets-token-input" className="text-[10px] font-bold text-white uppercase tracking-widest block">
                Google OAuth Access Token
              </label>
              <span className="text-[9px] font-mono text-zinc-550">ReadOnly scope required</span>
            </div>
            <input
              id="sheets-token-input"
              type="password"
              placeholder="ya29.a0ARWdf..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-gray-800 px-4 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleFetchLiveStats}
              disabled={isSyncing}
              className={`w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                isSyncing 
                  ? "bg-zinc-805 text-zinc-500 cursor-not-allowed border border-gray-800" 
                  : "bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-xl cursor-pointer"
              }`}
            >
              {isSyncing ? (
                <>
                  <RefreshCw size={14} className="animate-spin" /> Synchronizing Sheets API...
                </>
              ) : (
                <>
                  <Link2 size={14} /> Synchronize Live Metrics Now
                </>
              )}
            </button>
          </div>

          {syncError && (
            <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-xs rounded-xl flex items-start gap-2">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              <span>{syncError}</span>
            </div>
          )}
        </div>

        {/* Live Metrics Display & Terminal Logs */}
        <div className="flex flex-col gap-4">
          {/* Mapped Values Grid */}
          <div className="p-4 bg-zinc-950/60 border border-gray-850 rounded-2xl">
            <div className="flex items-center gap-1 mb-3 text-xs text-zinc-400 font-medium font-sans">
              <Eye size={12} className="text-emerald-400" /> Currently Plotted Metrics
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-2 bg-black/40 border border-zinc-900 rounded-lg">
                <div className="text-xl font-bold font-mono text-white">{stats.professionalsPlaced}</div>
                <div className="text-[10px] text-zinc-500 font-sans tracking-tight mt-1">Placed Specialists</div>
              </div>
              <div className="p-2 bg-black/40 border border-zinc-900 rounded-lg">
                <div className="text-xl font-bold font-mono text-white">{stats.complianceTargetsAchieved}%</div>
                <div className="text-[10px] text-zinc-500 font-sans tracking-tight mt-1">EE Goal Achieved</div>
              </div>
              <div className="p-2 bg-black/40 border border-zinc-900 rounded-lg">
                <div className="text-xl font-bold font-mono text-white">+{stats.operationalGains}%</div>
                <div className="text-[10px] text-zinc-500 font-sans tracking-tight mt-1">Workstation Gain</div>
              </div>
              <div className="p-2 bg-black/40 border border-zinc-900 rounded-lg">
                <div className="text-xl font-bold font-mono text-white">{stats.totalCandidates}</div>
                <div className="text-[10px] text-zinc-500 font-sans tracking-tight mt-1">Vetted Candidates</div>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-550 border-t border-zinc-900 pt-2.5">
              <span>Sync status: {stats.sourceSpreadsheetId ? "Connected to Sheet Source" : "Local Fallback Status"}</span>
              <span>Updated: {new Date(stats.lastSyncedAt).toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Secure Handshake Console Logs */}
          <div className="bg-black/90 border border-zinc-900 rounded-2xl p-4 flex flex-col h-[155px]">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-2">
              <span className="text-[9px] font-mono uppercase text-zinc-400 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Google API Handshake Logs
              </span>
              <span className="text-[9px] font-mono text-zinc-600">Secure TLS TLSv1.3</span>
            </div>

            <div className="flex-1 overflow-y-auto font-mono text-[9px] text-zinc-400 space-y-1.5 leading-relaxed pr-1 select-none whitespace-pre-wrap text-left">
              {sheetsLogs.length === 0 ? (
                <div className="text-zinc-650 italic pt-6 text-center">Awaiting live synchronization triggers...</div>
              ) : (
                sheetsLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={
                      log.includes("Success") || log.includes("Parsed")
                        ? "text-emerald-400"
                        : log.includes("Failure")
                        ? "text-red-400"
                        : "text-zinc-500"
                    }
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Template reference mapping tool */}
      <div className="mt-6 p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 text-zinc-500 flex items-start gap-3">
        <Info size={14} className="text-emerald-500 shrink-0 mt-0.5" />
        <div className="text-[11px] font-sans leading-relaxed">
          <strong className="text-zinc-405 block mb-0.5">Setup spreadsheet map configuration:</strong>
          Set up a spreadsheet with two columns: Column A (MetricName) and Column B (Value). Include keys like 
          <span className="text-zinc-400 font-mono bg-black/40 px-1 py-0.5 rounded mx-1">Professionals Placed</span>, 
          <span className="text-zinc-400 font-mono bg-black/40 px-1 py-0.5 rounded mx-1">Compliance Targets</span>, 
          <span className="text-zinc-400 font-mono bg-black/40 px-1 py-0.5 rounded mx-1">Managed BPO Gains</span>, and
          <span className="text-zinc-400 font-mono bg-black/40 px-1 py-0.5 rounded mx-1">Total Candidate Count</span> to sync.
        </div>
      </div>
    </div>
  );
}
