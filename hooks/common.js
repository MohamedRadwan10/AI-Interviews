import { useRouter, usePathname } from "next/navigation";
import { useMemo, useState, useEffect, useRef, useContext, useCallback } from "react";
import { filter, get, includes, toLower, isString } from "lodash-es";
import { ToastContext } from "@/Context/ToastContext";
import { useConfirmation } from "@/Context/ConfirmationContext";

export { useConfirmation };

export const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path) => {
    router.push(path);
  };

  const navigateBack = () => {
    router.back();
  };

  const navigateForward = () => {
    router.forward();
  };

  const replaceUrl = (path) => {
    router.replace(path);
  };

  const reload = () => {
    router.refresh();
  };

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

  const onSelect = (e) => {
    const file = e.files[0];
    if (file && onChange) onChange(file);
  };

  const triggerUpload = () => {
    if (fileUploadRef.current?.choose) fileUploadRef.current.choose();
    else if (fileUploadRef.current?.getInput) fileUploadRef.current.getInput()?.click();
  };

  const formattedSize = useMemo(() => {
    if (!value?.size) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(value.size) / Math.log(k));
    return parseFloat((value.size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, [value]);

  return { preview, accept, placeholder, fileUploadRef, onSelect, triggerUpload, formattedSize };
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

  return { searchTerm, setSearchTerm, filteredData };
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