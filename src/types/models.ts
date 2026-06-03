export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  created_at: string;
  sort_order: number | null;
};

export type Product = {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  image: string | null;
  gallery: string[] | null;
  ingredients: string[] | null;
  calories: number | null;
  sizes: string[] | null;
  extras: string[] | null;
  available: boolean;
  featured: boolean;
  created_at: string;
};

export type Banner = {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  active: boolean;
  created_at: string;
};

export type Settings = {
  store_name: string;
  phone: string | null;
  address: string | null;
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  opening_hours: string | null;
  updated_at: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
};

export type OrderItem = {
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  size?: string;
};

export type Order = {
  id: string;
  table_number: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total_price: number;
  items: OrderItem[];
  created_at: string;
};
