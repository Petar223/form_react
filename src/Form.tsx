// Form.tsx
import React from "react";
import { useFormContext } from "./FormContext ";

interface FormProps {
  onSubmit: any;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  const { values } = useFormContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const deepCopy = JSON.parse(JSON.stringify(values));
    onSubmit(nestObjects(deepCopy));
  };

  function nestObjects(values: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    Object.keys(values).forEach((key: string) => {
      if (key.includes(".")) {
        const parts = key.split(".");
        const mainKey: string = parts[0];
        const nestedKey: string = parts[1];

        if (!result[mainKey]) {
          result[mainKey] = {};
        }

        result[mainKey][nestedKey] = values[key];
      } else {
        result[key] = values[key];
      }
    });

    return result;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "fit-content",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      {children}
    </form>
  );
};
