import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [data, setData] = useState({});

  const update = (values) => {
    setData((prev) => ({ ...prev, ...values }));
  };

  return (
    <FormContext.Provider value={{ data, update }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormData() {
  return useContext(FormContext);
}