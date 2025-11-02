import React, { createContext, useContext, useState, ReactNode } from "react";


export interface BusinessFormData {
  role: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  preschoolersPg: string;
  preschoolersNur: string;
  preschoolersJkg: string;
  preschoolersSkg: string;
  feeRangeMin: string;
  feeRangeMax: string;
}


const defaultData: BusinessFormData = {
  role: 1, 
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  address: "",
  state: "",
  city: "",
  pincode: "",
  preschoolersPg: "",
  preschoolersNur: "",
  preschoolersJkg: "",
  preschoolersSkg: "",
  feeRangeMin: "",
  feeRangeMax: "",
};

interface BusinessFormContextProps {
  formData: BusinessFormData;
  updateFormData: (data: Partial<BusinessFormData>) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}
const backendUrl = process.env.BACKEND_URL
const BusinessFormContext = createContext<BusinessFormContextProps | undefined>(undefined);

export const BusinessFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<BusinessFormData>(defaultData);

  const updateFormData = (data: Partial<BusinessFormData>) => {
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
          preschoolersPg: Number(formData.preschoolersPg),
          preschoolersNur: Number(formData.preschoolersNur),
          preschoolersJkg: Number(formData.preschoolersJkg),
          preschoolersSkg: Number(formData.preschoolersSkg),
          feeRangeMin: Number(formData.feeRangeMin),
          feeRangeMax: Number(formData.feeRangeMax),
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
    <BusinessFormContext.Provider value={{ formData, updateFormData, submitForm, resetForm }}>
      {children}
    </BusinessFormContext.Provider>
  );
};

export const useBusinessForm = () => {
  const context = useContext(BusinessFormContext);
  if (!context) throw new Error("useBusinessForm must be used within BusinessFormProvider");
  return context;
};
