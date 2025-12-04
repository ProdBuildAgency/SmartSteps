export interface ProductAsset {
  id: string;
  url: string;
  asset_type: "IMAGE" | string;
}

export interface ProductTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  status: number;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;     // server gives string
  currency: string;
  category: ProductCategory;
  status: string;
  is_library_item: boolean;
  sku: string | null;
  tags: ProductTag[];
  assets: ProductAsset[];
  createdAt: string;
  updatedAt: string;
}
export interface CartItem extends Product {
  quantity: number;
}