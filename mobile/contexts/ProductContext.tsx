import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSession } from "@/contexts/SessionContext";
import { Product } from "@/types/product";

interface FetchParams {
  ids?: string[];
  categoryIds?: string[];
  tagIds?: string[];
  s?: string; // search
  status?: string;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;

  fetchProducts: (params?: FetchParams) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
  const { token, isLoadingSession } = useSession();

  const buildQuery = (params?: FetchParams) => {
    if (!params) return "";

    const query = new URLSearchParams();

    if (params.ids) params.ids.forEach((id) => query.append("ids", id));
    if (params.categoryIds)
      params.categoryIds.forEach((id) => query.append("categoryIds", id));
    if (params.tagIds)
      params.tagIds.forEach((id) => query.append("tagIds", id));

    if (params.s) query.append("s", params.s);
    if (params.status) query.append("status", params.status);

    return `?${query.toString()}`;
  };

  const fetchProducts = async (params?: FetchParams) => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const queryString = buildQuery(params);
      const url = `${backendUrl}/api/v1/products${queryString}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!Array.isArray(data)) {
        setProducts([]);
        throw new Error("Invalid product response");
      }

      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  // Fetch all products on first load
  useEffect(() => {
    if (isLoadingSession) return;
    if (!token) return;

    fetchProducts(); // 📌 no params = fetch all
  }, [token, isLoadingSession]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside a ProductProvider");
  return ctx;
};
