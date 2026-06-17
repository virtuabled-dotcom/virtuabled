import { useState, useEffect } from "react";
import { 
  getCachedPlacementData, 
  LivePlacementData 
} from "./googleSheetsService";

/**
 * Custom React Hook to consume live synchronized Google Sheets placement data.
 * Subscribes to global update events so that any metric updates are rendered dynamically in real-time.
 */
export function useGoogleSheetData() {
  const [data, setData] = useState<LivePlacementData>(getCachedPlacementData());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<LivePlacementData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      }
    };

    window.addEventListener("virtuabled-stats-updated", handleUpdate);
    return () => {
      window.removeEventListener("virtuabled-stats-updated", handleUpdate);
    };
  }, []);

  const refreshLocal = () => {
    setLoading(true);
    setTimeout(() => {
      setData(getCachedPlacementData());
      setLoading(false);
    }, 1200);
  };

  return {
    data,
    loading,
    refreshLocal
  };
}
