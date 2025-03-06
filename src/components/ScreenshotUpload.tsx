
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Upload, X, Image, Check } from "lucide-react";
import FormField from "./FormField";

interface ScreenshotUploadProps {
  id: string;
  label: string;
  description?: string;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
  className?: string;
  accept?: string;
}

const ScreenshotUpload: React.FC<ScreenshotUploadProps> = ({
  id,
  label,
  description,
  value,
  onChange,
  error,
  required = false,
  className,
  accept = "image/*",
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create preview when file changes
  React.useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files?.[0]) {
      onChange(e.dataTransfer.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <FormField 
      id={id} 
      label={label} 
      description={description} 
      error={error}
      required={required}
      className={className}
    >
      <div
        className={cn(
          "form-transition relative rounded-xl border-2 border-dashed p-4 cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50 hover:bg-accent/50",
          error && "border-destructive/50 hover:border-destructive",
          value && "border-primary/50 bg-primary/5",
          className
        )}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="sr-only"
        />
        
        <div className="flex flex-col items-center justify-center p-4 text-center">
          {preview ? (
            <div className="relative w-full">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-lg border border-border shadow-sm">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="h-auto w-full object-cover transition-opacity"
                  style={{ maxHeight: "200px" }}
                />
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={removeFile}
                    className="rounded-full bg-destructive/90 p-1 text-destructive-foreground shadow-sm hover:bg-destructive transition-colors"
                    aria-label="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 rounded-full bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                  <div className="flex items-center gap-1">
                    <Check size={12} className="text-primary" />
                    <span>{value?.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {isDragging ? (
                <Upload className="mb-2 h-10 w-10 text-primary animate-bounce" />
              ) : (
                <Image className="mb-2 h-10 w-10 text-muted-foreground" />
              )}
              <p className="mb-1 font-medium">
                {isDragging ? "Drop your image here" : "Upload your screenshot"}
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to select a file
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Supported formats: PNG, JPG, GIF (Max 5MB)
              </p>
            </>
          )}
        </div>
      </div>
    </FormField>
  );
};

export default ScreenshotUpload;
