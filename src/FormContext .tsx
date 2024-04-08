import React, { ReactNode, createContext, useContext, useState } from "react";
import { UserInfo } from "./App";

interface FormContextProps {
  values: { [key: string]: any };
  handleChange: (name: string, value: any) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

interface FormProps {
  children: ReactNode;
  initialValues: any;
}

export const FormProvider: React.FC<FormProps> = ({
  children,
  initialValues,
}) => {
  const [values, setValues] = useState<{ [key: string]: any }>(initialValues);

  const handleChange = (name: string, value: any) => {
    setValues((prevValues: UserInfo) => {
      return { ...prevValues, [name]: value };
    });
  };

  return (
    <FormContext.Provider value={{ values, handleChange }}>
      {children}
    </FormContext.Provider>
  );
};
