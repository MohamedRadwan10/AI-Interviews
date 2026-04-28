"use client";
import React from "react";
import { Download, Printer } from "lucide-react";
import MainButton from "@/Components/Common/MainButton";
import { useDownloadReport } from "@/hooks/useDownloadReport";

const DownloadReport = ({
  downloadUrl,
  fileName = "report",
  fileType = "pdf",
  printElementId,
  className = "",
  showPrint = true,
}) => {
  const { isDownloading, downloadAsFile, printContent } = useDownloadReport();

  const handleDownload = () => {
    if (printElementId) {
      downloadAsFile({ printElementId, fileName });
    } else if (downloadUrl) {
      console.warn("No printElementId provided for download");
    }
  };

  const handlePrint = () => {
    if (printElementId) {
      printContent(printElementId);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {downloadUrl && (
        <MainButton
          onClick={handleDownload}
          isLoading={isDownloading}
          className="flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-brand-primaryDark transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Download className="w-4 h-4" />
          Download {fileType.toUpperCase()}
        </MainButton>
      )}
      {showPrint && printElementId && (
        <MainButton
          onClick={handlePrint}
          className="flex items-center gap-2 bg-white dark:bg-dark-primary-3 text-ui-textMain dark:text-white border border-ui-borderLight dark:border-ui-border px-5 py-2.5 rounded-xl font-semibold hover:bg-light-main dark:hover:bg-dark-primary-4 transition-all duration-200"
        >
          <Printer className="w-4 h-4" />
          Print
        </MainButton>
      )}
    </div>
  );
};

export default DownloadReport;
