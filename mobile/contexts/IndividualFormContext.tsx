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
    if (!backendUrl) {
      const errorMessage = "Backend URL is not configured. Please check your environment variables for EXPO_PUBLIC_BACKEND_URL.";
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    try {
      console.log("Submitting form data:", formData);
      console.log("Backend URL:", backendUrl);

      const response = await axios.post(`${backendUrl}/api/v1/auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Form submitted successfully:", response.data);
      resetForm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Backend Error:", {
            status: error.response.status,
            data: error.response.data,
          });
        } else if (error.request) {
          console.error("Network Error: No response received from the server.", error.request);
        } else {
          console.error("Axios Setup Error:", error.message);
        }
      } else {
        console.error("Unexpected Error:", error);
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
