import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSession } from "@/contexts/SessionContext";
import { Product } from "@/types/product";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

  // ⭐ Get token from SessionProvider
  const { token, isLoadingSession } = useSession();

  const fetchProducts = async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${backendUrl}/api/v1/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  // ⭐ Wait until session is restored AND token exists
  useEffect(() => {
    if (isLoadingSession) {
      return;
    }

    if (!token) {
      return;
    }

    fetchProducts();
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
  if (!ctx) {
    throw new Error("useProducts must be used inside a ProductProvider");
  }
  return ctx;
};
