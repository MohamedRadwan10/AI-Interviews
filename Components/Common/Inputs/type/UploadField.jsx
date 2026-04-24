import { get } from "lodash-es";
import { useRef, useState, useEffect } from "react";
import { Upload, FileText, Camera } from "lucide-react";
import { FileUpload } from "primereact/fileupload";

const UploadField = (props) => {
  const field_name = get(props, "field_name");
  const value = get(props, "value");
  const onChange = get(props, "onChange");
  const label = get(props, "label");
  const error = get(props, "error");
  const uploadType = get(props, "uploadType", "file");
  const accept = get(props, "accept", uploadType === "image" ? "image/*" : ".pdf,.doc,.docx");
  const placeholder = get(props, "placeholder", uploadType === "image" ? "Upload Photo" : "Upload CV");
  
  const fileUploadRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (value && uploadType === "image") {
      if (typeof value === 'string') {
        setPreview(value);
      } else if (value instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(value);
      }
    } else {
      setPreview(null);
    }
  }, [value, uploadType]);

  const onTemplateSelect = (e) => {
    const file = e.files[0];
    if (file && onChange) {
      onChange(file);
    }
  };

  const headerTemplate = (options) => {
    const { chooseButton } = options;
    return (
      <div className="hidden">
        {chooseButton}
      </div>
    );
  };

  const emptyTemplate = () => {
    if (uploadType === "image") {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Camera className="w-8 h-8 text-brand-primary group-hover:scale-110 transition-all duration-300" />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="p-4 rounded-2xl bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-all duration-300 group-hover:rotate-6">
          <Upload className="w-10 h-10 text-brand-primary" />
        </div>
        <div className="text-center">
          <p className="font-bold text-ui-textMain dark:text-dark-white text-lg mb-1">
            {placeholder}
          </p>
          <p className="text-sm text-ui-textMuted dark:text-dark-gray flex items-center justify-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-ui-borderLight/50 dark:bg-ui-border/50 font-mono text-[10px]">
              {accept.replace(/\./g, '').toUpperCase().split(',')[0]}
            </span>
            <span>Max size: 5MB</span>
          </p>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    if (uploadType === "image") {
      return (
        <img src={file.objectURL} alt={file.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      );
    }
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="p-4 rounded-2xl bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-all duration-300 group-hover:rotate-6">
          <FileText className="w-10 h-10 text-brand-primary" />
        </div>
        <div className="text-center">
          <p className="font-bold text-ui-textMain dark:text-dark-white text-lg mb-1 truncate max-w-[200px]">
            {file.name}
          </p>
          <p className="text-sm text-ui-textMuted dark:text-dark-gray">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full mb-4 flex flex-col items-center ${get(props, "containerClassName", "")}`}>
      {label && <label className="block mb-2 font-medium text-ui-textMuted dark:text-dark-gray self-start">{label}</label>}
      
      <div className="w-full relative group">
        <FileUpload
          ref={fileUploadRef}
          name={field_name}
          accept={accept}
          maxFileSize={5000000}
          onSelect={onTemplateSelect}
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          className={`upload-field-wrapper ${uploadType === 'image' ? 'image-upload' : 'file-upload'}`}
          contentClassName={`!p-0 !border-0 !bg-transparent ${uploadType === 'image' ? 'flex items-center justify-center' : ''}`}
          chooseOptions={{
            className: 'hidden',
          }}
        />

        <div 
          onClick={() => fileUploadRef.current.getInput().click()}
          className={`cursor-pointer transition-all duration-300 mx-auto
            ${uploadType === 'image' 
              ? 'w-28 h-28 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden' 
              : 'w-full p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3'
            }
            ${error ? "border-status-error shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "border-brand-primary/40 hover:border-brand-primary hover:shadow-[0_0_20px_rgba(37,99,234,0.2)]"}
            bg-light-blue50 dark:bg-dark-primary-3 relative`}
        >
          {value && !fileUploadRef.current?.getFiles()?.length ? (
            uploadType === 'image' ? (
              <div className="w-full h-full relative group">
                 <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300">
                    <Upload className="text-white w-6 h-6 mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="text-[10px] text-white font-medium uppercase tracking-wider">Change</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="p-4 rounded-2xl bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-all duration-300 group-hover:rotate-6">
                  <FileText className="w-10 h-10 text-brand-primary" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-ui-textMain dark:text-dark-white text-lg mb-1">
                    {value.name || "File Selected"}
                  </p>
                </div>
              </div>
            )
          ) : (
            fileUploadRef.current?.getFiles()?.length ? null : emptyTemplate()
          )}

          {uploadType === "image" && !value && (
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300">
                <Upload className="text-white w-6 h-6 mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
                <span className="text-[10px] text-white font-medium uppercase tracking-wider">Upload</span>
            </div>
          )}
        </div>
      </div>
      
      {error && <small className="mt-1 text-status-error">{error}</small>}
    </div>
  );
};

export default UploadField;

