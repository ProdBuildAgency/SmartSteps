import React, { createContext, useContext, useState, ReactNode } from "react";


export interface IndividualFormData {
  role: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  
}


const defaultData: IndividualFormData = {
  role: 2, 
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: ""
};

interface IndividualFormContextProps {
  formData: IndividualFormData;
  updateFormData: (data: Partial<IndividualFormData>) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}
const backendUrl = process.env.BACKEND_URL
const IndividualFormContext = createContext<IndividualFormContextProps | undefined>(undefined);

export const IndividualFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<IndividualFormData>(defaultData);

  const updateFormData = (data: Partial<IndividualFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };


  const resetForm = () => {
    setFormData(defaultData);
  };

  // API call to submit form
  const submitForm = async () => {
    try {
      console.log("Submitting form data:", formData);
      console.log(backendUrl)

      const response = await fetch(`https://smartsteps-prodbuild.vercel.app/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (!response.ok) throw new Error(`Failed to submit form (${response.status})`);

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      resetForm(); // Clear after success
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <IndividualFormContext.Provider value={{ formData, updateFormData, submitForm, resetForm }}>
      {children}
    </IndividualFormContext.Provider>
  );
};

export const useIndividualForm = () => {
  const context = useContext(IndividualFormContext);
  if (!context) throw new Error("useIndividualForm must be used within IndividualFormProvider");
  return context;
};
