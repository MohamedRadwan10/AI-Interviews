import { useRouter, usePathname } from "next/navigation";
import { useMemo, useState, useEffect, useRef, useContext, useCallback } from "react";
import { toLower, filter, get, includes } from "lodash-es";
import { ToastContext } from "@/Context/ToastContext";
import { useConfirmation } from "@/Context/ConfirmationContext";

export { useConfirmation };

export const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = useCallback((path) => {
    router.push(path);
  }, [router]);

  const navigateBack = useCallback(() => {
    router.back();
  }, [router]);

  const navigateForward = useCallback(() => {
    router.forward();
  }, [router]);

  const replaceUrl = useCallback((path) => {
    router.replace(path);
  }, [router]);

  const reload = useCallback(() => {
    router.refresh();
  }, [router]);

  return useMemo(() => ({
    router,
    pathname,
    navigateTo,
    navigateBack,
    navigateForward,
    replaceUrl,
    reload,
  }), [router, pathname, navigateTo, navigateBack, navigateForward, replaceUrl, reload]);
};

export const useUpload = ({ uploadType, value, onChange, accept: customAccept, placeholder: customPlaceholder }) => {
  const [preview, setPreview] = useState(null);
  const fileUploadRef = useRef(null);

  const accept = useMemo(() => 
    customAccept || (uploadType === "image" ? "image/png, image/jpeg, image/jpg, image/webp, image/*" : ".pdf,.doc,.docx,application/pdf"),
  [customAccept, uploadType]);

  const placeholder = useMemo(() => 
    customPlaceholder || (uploadType === "image" ? "Upload Photo" : "Upload CV"),
  [customPlaceholder, uploadType]);

  useEffect(() => {
    if (value && uploadType === "image") {
      if (typeof value === "string") setPreview(value);
      else if (value instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(value);
      }
    } else {
      setPreview(null);
    }
  }, [value, uploadType]);

  const onSelect = useCallback((e) => {
    const file = e.files[0];
    if (file && onChange) onChange(file);
  }, [onChange]);

  const triggerUpload = useCallback(() => {
    if (fileUploadRef.current?.choose) fileUploadRef.current.choose();
    else if (fileUploadRef.current?.getInput) fileUploadRef.current.getInput()?.click();
  }, []);

  const formattedSize = useMemo(() => {
    if (!value?.size) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(value.size) / Math.log(k));
    return parseFloat((value.size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, [value]);

  return useMemo(() => ({ 
    preview, 
    accept, 
    placeholder, 
    fileUploadRef, 
    onSelect, 
    triggerUpload, 
    formattedSize 
  }), [preview, accept, placeholder, onSelect, triggerUpload, formattedSize]);
};

export const useSearch = ({ data, searchFields, initialTerm = "" }) => {
  const [searchTerm, setSearchTerm] = useState(initialTerm);

  const filteredData = useMemo(() => {
    if (!searchTerm || !data) return data;
    
    const term = toLower(searchTerm);
    return filter(data, (item) => {
      return searchFields.some((field) => {
        const value = get(item, field, "");
        return includes(toLower(String(value)), term);
      });
    });
  }, [data, searchTerm, searchFields]);

  return useMemo(() => ({ 
    searchTerm, 
    setSearchTerm, 
    filteredData 
  }), [searchTerm, filteredData]);
};

export const useToast = () => {
  const out = useContext(ToastContext);
  return out?.ref;
};

export const useMainNotify = () => {
  const toast = useToast();
  
  const main = useCallback(
    (title, msg, type = 'success') => {
      if (toast?.current) {
        toast.current.show({
          severity: type,
          summary: title,
          detail: msg,
          life: 4000
        });
      }
    },
    [toast]
  );

  const success = useCallback(
    (title, msg) => {
      main(title, msg, 'success');
    },
    [main]
  );

  const error = useCallback(
    (title, msg) => {
      main(title, msg, 'error');
    },
    [main]
  );

  const info = useCallback(
    (title, msg) => {
      main(title, msg, 'info');
    },
    [main]
  );

  const warn = useCallback(
    (title, msg) => {
      main(title, msg, 'warn');
    },
    [main]
  );

  return useMemo(() => ({ success, error, info, warn }), [success, error, info, warn]);
};

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