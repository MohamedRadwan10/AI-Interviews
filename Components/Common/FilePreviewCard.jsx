"use client";
import React, { useMemo } from "react";
import { FileText, ExternalLink, Clock } from "lucide-react";
import MainText from "@/Components/Common/MainText";

const FilePreviewCard = ({ url, file, label, fileLabel, emptyTitle = "No file uploaded", emptySubtitle = "Upload a file below" }) => {
  const serverFileName = useMemo(() => {
    if (!url) return null;
    return decodeURIComponent(url.split("/").pop()) || "File";
  }, [url]);

  if (file) {
    return (
      <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-2xl">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-amber-500 shrink-0" />
          <div>
            <MainText title={file.name} className="font-bold text-sm text-ui-textMain dark:text-white truncate max-w-[220px]" />
            <MainText title={fileLabel ?? "Selected · Not saved yet"} className="text-[10px] text-amber-500" />
          </div>
        </div>
        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
      </div>
    );
  }

  if (!url) {
    return (
      <div className="flex items-center gap-3 p-4 bg-light-blue50 dark:bg-white/5 border border-ui-borderLight dark:border-white/5 rounded-2xl">
        <FileText className="w-8 h-8 text-ui-textMuted dark:text-ui-muted shrink-0" />
        <div>
          <MainText title={emptyTitle} className="font-bold text-sm text-ui-textMuted dark:text-ui-muted" />
          <MainText title={emptySubtitle} className="text-[10px] text-ui-textMuted dark:text-ui-muted" />
        </div>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-4 bg-light-blue50 dark:bg-white/5 border border-ui-borderLight dark:border-white/5 rounded-2xl hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all group cursor-pointer no-underline"
    >
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-brand-primary shrink-0" />
        <div>
          <MainText title={serverFileName} className="font-bold text-sm text-ui-textMain dark:text-white" />
          <MainText title={label ?? "Click to view"} className="text-[10px] text-ui-textMuted dark:text-ui-muted" />
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-ui-textMuted dark:text-ui-muted group-hover:text-brand-primary transition-colors shrink-0" />
    </a>
  );
};

export default FilePreviewCard;
