// FormInput.tsx
import React from "react";
import { useFormContext } from "./FormContext ";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export const FormInput: React.FC<FormInputProps> = ({ name, type, value }) => {
  const { values, handleChange } = useFormContext();
  const isSubmitButton = type === "submit";

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    handleChange(name, event.target.value);
  }

  function formatLabel(name: string): string {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/\./g, " ")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  return (
    <div>
      {!isSubmitButton ? (
        <label style={{ display: "block", marginBottom: "5px" }}>
          <strong>{formatLabel(name)}</strong>
        </label>
      ) : null}
      {type !== "submit" ? (
        <input
          name={name}
          value={values[name] || ""}
          type={type}
          onChange={handleInputChange}
          style={{
            padding: "8px 10px",
            margin: "5px 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
            boxSizing: "border-box",
            display: "block",
          }}
        />
      ) : (
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50", // Zelena boja
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            margin: "10px 0",
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
};
