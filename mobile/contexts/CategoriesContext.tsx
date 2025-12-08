import React, { createContext, useContext, useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  loading: false,
  error: null,
});

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BACKEND_URL}/api/v1/category`);
      const data = await res.json();

      // 🔥 Your API returns an array, so just use it directly
      const categoryArray = Array.isArray(data) ? data : [];

      setCategories([
        { id: "all", name: "All", slug: "all" }, // Always include "All"
        ...categoryArray,
      ]);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
