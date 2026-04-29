import { useState, useCallback, useMemo } from "react";

export const useDownloadReport = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const downloadAsFile = useCallback(async ({ printElementId, fileName = "report" }) => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      
      const element = document.getElementById(printElementId);
      if (!element) {
        throw new Error("Element not found for PDF generation");
      }

      const opt = {
        margin:       [0.2, 0.2],
        filename:     `${fileName}.pdf`,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { 
          scale: 3, 
          useCORS: true, 
          logging: false,
          windowWidth: 1200,
          width: 1200
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      element.classList.add("generating-pdf");
      await html2pdf().set(opt).from(element).save();
      element.classList.remove("generating-pdf");
      
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
