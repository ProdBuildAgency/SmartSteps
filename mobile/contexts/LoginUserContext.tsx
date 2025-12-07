import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

export interface LoginFormData {
  emailOrPhone: string;
  password: string;
}

const defaultLoginData: LoginFormData = {
  emailOrPhone: "",
  password: "",
};

interface LoginContextProps {
  formData: LoginFormData;
  updateFormData: (data: Partial<LoginFormData>) => void;
  submitLogin: () => Promise<any>;
  resetForm: () => void;
}

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<LoginFormData>(defaultLoginData);

  const updateFormData = (data: Partial<LoginFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(defaultLoginData);
  };

  const submitLogin = async () => {
    if (!backendUrl) {
      throw new Error("❌ Backend URL not configured. Check EXPO_PUBLIC_BACKEND_URL.");
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/auth/login`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      resetForm();

      return {
        token: response.data.token,
        user: response.data.user,
      };

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Login error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Login failed");
      }

      console.error("❌ Unexpected login error:", error);
      throw new Error("Unexpected error during login");
    }
  };

  return (
    <LoginContext.Provider
      value={{
        formData,
        updateFormData,
        submitLogin,
        resetForm,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginForm = () => {
  const context = useContext(LoginContext);
  if (!context) throw new Error("useLoginForm must be used within LoginProvider");
  return context;
};
