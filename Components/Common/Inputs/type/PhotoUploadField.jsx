"use client";
import React, { useRef, useMemo, useCallback, useEffect, useState } from "react";
import MainImage from "@/Components/Common/Image";
import { User, Camera } from "lucide-react";

const PhotoUploadField = (props) => {
  const { value, onChange, onBlur, field_name, uploadType } = props;
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const inputId = `${field_name}-file-input`;

  const accept = useMemo(() =>
    uploadType === "image" ? "image/png,image/jpeg,image/jpg,image/webp,image/*" : ".pdf,.doc,.docx",
  [uploadType]);

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

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file && onChange) onChange(file);
    if (onBlur) onBlur({ target: { name: field_name } });
    e.target.value = "";
  }, [onChange, onBlur, field_name]);

  const handleCircleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const previewContent = useMemo(() => {
    if (!preview) return null;
    return (
      <MainImage
        src={preview}
        alt="Avatar Preview"
        width={100}
        height={100}
        imageClassName="w-full h-full object-cover"
        imageStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }, [preview]);

  return (
    <div className="w-full h-full relative rounded-full overflow-hidden flex items-center justify-center">
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div
        onClick={handleCircleClick}
        className="group w-full h-full rounded-full cursor-pointer flex items-center justify-center overflow-hidden bg-light-blue50 dark:bg-dark-primary-3 relative"
      >
        {preview ? previewContent : <User className="w-10 h-10 text-brand-primary" />}

        <div className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Camera className="w-5 h-5 text-white" />
          <span className="text-[9px] text-white font-semibold leading-tight text-center px-1">
            Change Photo
          </span>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadField;