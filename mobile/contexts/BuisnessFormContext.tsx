import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of your form data
export interface BusinessFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  preschoolName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  pg: string;
  nur: string;
  jkg: string;
  skg: string;
  feeMin: string;
  feeMax: string;
}

// Default (empty) form data
const defaultData: BusinessFormData = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  preschoolName: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  pg: "",
  nur: "",
  jkg: "",
  skg: "",
  feeMin: "",
  feeMax: "",
};

interface BusinessFormContextProps {
  formData: BusinessFormData;
  updateFormData: (data: Partial<BusinessFormData>) => void;
  submitForm: () => Promise<void>;
}

const BusinessFormContext = createContext<BusinessFormContextProps | undefined>(undefined);

export const BusinessFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<BusinessFormData>(defaultData);

  const updateFormData = (data: Partial<BusinessFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // Example API call
  const submitForm = async () => {
    try {
      const response = await fetch("https://your-backend-url.com/api/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      const result = await response.json();
      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <BusinessFormContext.Provider value={{ formData, updateFormData, submitForm }}>
      {children}
    </BusinessFormContext.Provider>
  );
};

// Custom hook for easy access
export const useBusinessForm = () => {
  const context = useContext(BusinessFormContext);
  if (!context) {
    throw new Error("useBusinessForm must be used within BusinessFormProvider");
  }
  return context;
};
