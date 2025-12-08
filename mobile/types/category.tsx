export interface Category {
  id: string;
  name: string;
}

export interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
}