"use client";
import { get } from "lodash-es";
import { Upload, FileText, Camera } from "lucide-react";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { useUpload } from "@/hooks/common";
import MainImage from "@/Components/Common/Image";
import MainText from "@/Components/Common/MainText";

const UploadField = (props) => {
  const { uploadType = "file", value, error, label, onBlur, validation } = props;
  const { preview, accept, placeholder, fileUploadRef, onSelect, triggerUpload, formattedSize } = useUpload(props);
  const progress = Math.min(((value?.size || 0) / 5000000) * 100, 100);
  const isRequired = get(validation, "required");

  const handleInteraction = () => {
    triggerUpload();
    if (onBlur) onBlur({ target: { name: props.field_name } });
  };

  const renderPreview = () => (
    uploadType === "image" ? (
      <div className="w-full h-full relative group">
        <MainImage src={preview} alt="Preview" width={100} height={100} imageClassName="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all">
          <Upload className="text-white w-5 h-5 mb-1" /><MainText title="Change" className="text-[8px] text-white uppercase" />
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center gap-2">
        <div className="p-4 rounded-2xl bg-brand-primary/10"><FileText className="w-8 h-8 text-brand-primary" /></div>
        <div className="text-center px-4">
          <MainText title={value.name || "File Selected"} className="font-bold text-ui-textMain dark:text-dark-white text-sm truncate max-w-[150px]" />
          <MainText title={formattedSize} className="block text-[10px] text-ui-textMuted mt-1" />
        </div>
      </div>
    )
  );

  return (
    <div className={`w-full mb-4 flex flex-col ${get(props, "containerClassName", "")}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1">
          {label && <MainText tag="label" title={label} className="font-medium text-ui-textMuted dark:text-dark-gray text-sm" />}
          {isRequired && <span className="text-status-error text-xs">*</span>}
        </div>
        {value && <div className="flex items-center gap-2 w-32">
          <ProgressBar value={progress} showValue={false} style={{ height: '4px', flex: 1 }} color={progress > 90 ? '#ef4444' : '#2563eb'} />
          <MainText title={formattedSize} className="text-[9px] text-ui-textMuted min-w-[40px] text-right" />
        </div>}
      </div>
      <div className="w-full relative group">
        <div style={{ width: 0, height: 0, overflow: 'hidden', opacity: 0, position: 'absolute' }}>
          <FileUpload ref={fileUploadRef} accept={accept} maxFileSize={5000000} onSelect={onSelect} />
        </div>
        <div 
          onClick={handleInteraction}
          onBlur={onBlur}
          tabIndex={0}
          className={`cursor-pointer transition-all mx-auto bg-light-blue50 dark:bg-dark-primary-3 border-2 border-dashed outline-none focus:border-brand-primary
            ${uploadType === 'image' ? 'w-24 h-24 rounded-full flex items-center justify-center overflow-hidden' : 'w-full p-8 rounded-2xl flex flex-col items-center gap-3'}
            ${error ? "border-status-error shadow-sm" : "border-brand-primary/40 hover:border-brand-primary hover:shadow-md"}`}
        >
          {value ? renderPreview() : (
            <div className="flex flex-col items-center gap-2">
              {uploadType === "image" ? <Camera className="w-6 h-6 text-brand-primary" /> : <Upload className="w-8 h-8 text-brand-primary" />}
              <MainText title={placeholder} className="text-xs font-bold text-ui-textMain dark:text-dark-white" />
            </div>
          )}
        </div>
      </div>
      {error && <MainText title={error} className="mt-1 text-status-error text-[10px]" />}
    </div>
  );
};

export default UploadField;
