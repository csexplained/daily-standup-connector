
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
  description?: string;
  error?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  className,
  children,
  description,
  error,
  required = false,
}) => {
  return (
    <div className={cn("form-input-container", className)}>
      <div className="flex justify-between items-baseline">
        <Label 
          htmlFor={id} 
          className={cn(
            "text-sm font-medium transition-colors",
            error ? "text-destructive" : "text-foreground"
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      </div>
      
      {description && (
        <p className="text-xs text-muted-foreground mb-1.5">{description}</p>
      )}
      
      {children}
      
      {error && (
        <p className="text-xs text-destructive mt-1.5 animate-slide-up">{error}</p>
      )}
    </div>
  );
};

export default FormField;
