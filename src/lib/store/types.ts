export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  stock_quantity: number;
  status: 'active' | 'draft';
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ProductInput = Pick<Product, 'name' | 'description' | 'price' | 'currency' | 'stock_quantity' | 'status' | 'image_url'>;
