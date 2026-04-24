import { useState, useCallback, useMemo } from "react";
import axios from "axios";

export const useDownloadReport = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const downloadAsFile = useCallback(async ({ url, fileName = "report", fileType = "pdf" }) => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

      const response = await axios.get(url, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Accept": fileType === "pdf" ? "application/pdf" : "*/*",
        },
        responseType: "blob",
      });

      const blob = response.data;
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${fileName}.${fileType}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download error:", err);
      setDownloadError(err.message || "Failed to download file");
    } finally {
      setIsDownloading(false);
    }
  }, []);

  const printContent = useCallback((elementId) => {
    const content = document.getElementById(elementId);
    if (!content) return;

    const printWindow = window.open("", "_blank");
    const styles = Array.from(document.styleSheets)
      .map((sheet) => {
        try { return Array.from(sheet.cssRules).map((r) => r.cssText).join("\n"); }
        catch { return ""; }
      })
      .join("\n");

    printWindow.document.write(`
      <html><head><style>${styles}</style></head>
      <body>${content.innerHTML}</body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }, []);

  return useMemo(() => ({
    isDownloading,
    downloadError,
    downloadAsFile,
    printContent,
  }), [isDownloading, downloadError, downloadAsFile, printContent]);
};
