import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";


export interface BusinessFormData {
  role: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  preschoolersPg?: string;
  preschoolersNur?: string;
  preschoolersJkg?: string;
  preschoolersSkg?: string;
  feeRangeMin?: string;
  feeRangeMax?: string;
}

const defaultBusinessData: BusinessFormData = {
  role: 1,
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  businessName: "",
  address: "",
  state: "",
  city: "",
  pincode: "",
  preschoolersPg: "0",
  preschoolersNur: "0",
  preschoolersJkg: "0",
  preschoolersSkg: "0",
  feeRangeMin: "0",
  feeRangeMax: "0",
};

interface BusinessFormContextProps {
  formData: BusinessFormData;
  updateFormData: (data: Partial<BusinessFormData>) => void;
  submitForm: () => Promise<any>;
  resetForm: () => void;
}

const businessBackendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

const BusinessFormContext = createContext<BusinessFormContextProps | undefined>(undefined);

export const BusinessFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<BusinessFormData>(defaultBusinessData);

  const updateFormData = (data: Partial<BusinessFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(defaultBusinessData);
  };

  const submitForm = async () => {
  if (!businessBackendUrl) {
    throw new Error("❌ Backend URL not configured. Check EXPO_PUBLIC_BACKEND_URL.");
  }

  try {
    // console.log("Submitting Business form:", formData);

    const payload = {
      ...formData,
      preschoolersPg: Number(formData?.preschoolersPg) || 0,
      preschoolersNur: Number(formData?.preschoolersNur) || 0,
      preschoolersJkg: Number(formData?.preschoolersJkg) || 0,
      preschoolersSkg: Number(formData?.preschoolersSkg) || 0,
      feeRangeMin: Number(formData?.feeRangeMin) || 0,
      feeRangeMax: Number(formData?.feeRangeMax) || 0,
    };

    const response = await axios.post(`${businessBackendUrl}/api/v1/auth/register`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    // console.log("✅ Business form submitted:", response.data);
    resetForm();

    return {
      token: response.data.token,
      user: response.data.user,
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Business form error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Registration failed"); // ✅ THROW
    }
    console.error("❌ Unexpected error:", error);
    throw new Error("Unexpected error during registration"); // ✅ THROW
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

/* -------------------------------------------------------------------------- */
/*                           INDIVIDUAL FORM CONTEXT                          */
/* -------------------------------------------------------------------------- */

export interface IndividualFormData {
  role: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const defaultIndividualData: IndividualFormData = {
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
  submitForm: () => Promise<any>;
  resetForm: () => void;
}

const IndividualFormContext = createContext<IndividualFormContextProps | undefined>(undefined);

export const IndividualFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<IndividualFormData>(defaultIndividualData);

  const updateFormData = (data: Partial<IndividualFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(defaultIndividualData);
  };

  const submitForm = async () => {
  if (!businessBackendUrl) throw new Error("Backend URL not configured");

  try {
    // console.log("Submitting Individual form:", formData);

    const response = await axios.post(`${businessBackendUrl}/api/v1/auth/register`, formData);

    resetForm();

    return {
      token: response.data.token,
      user: response.data.user,
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw new Error("Unexpected error during registration");
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

export const RegisterUserProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BusinessFormProvider>
      <IndividualFormProvider>{children}</IndividualFormProvider>
    </BusinessFormProvider>
  );
};
