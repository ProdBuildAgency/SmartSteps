export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: any; // ImageSourcePropType
}

export interface CartItem extends Product {
  quantity: number;
}