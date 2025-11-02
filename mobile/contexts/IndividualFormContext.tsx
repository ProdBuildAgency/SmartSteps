import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

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
  confirmPassword: "",
};

interface IndividualFormContextProps {
  formData: IndividualFormData;
  updateFormData: (data: Partial<IndividualFormData>) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

const IndividualFormContext = createContext<IndividualFormContextProps | undefined>(undefined);

export const IndividualFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<IndividualFormData>(defaultData);

  const updateFormData = (data: Partial<IndividualFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(defaultData);
  };

  const submitForm = async () => {
    try {
      console.log("Submitting form data:", formData);
      console.log("Backend URL:", backendUrl);

      const response = await axios.post(`${backendUrl}/auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Form submitted successfully:", response.data);
      resetForm(); // Clear after success
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error submitting form:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error submitting form:", error);
      }
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
