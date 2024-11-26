export type User = {
  id: string;
  name: string;
  email: string;
  document: string;
  birth_date: string;
  profile: 'regular' | 'manager' | 'admin';
  password: string;
  random_hash: string;
  created_at: string;
  image_url: string;
};

export type UserRelation = {
  manager_user_id: string;
  user_id: string;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  category_id: string;
  price: string;
  original_price: string;
  amount_in_stock: string;
  image_url: string;
  status: 'active' | 'inactive';
  created_at: string;
};

export type ProductForm = {
  id: string;
  name: string;
  category_id: string;
  price: string;
  original_price: string;
  amount_in_stock: string;
  status: 'active' | 'inactive';
};

export type ProductRaw = Omit<
  Product,
  'price' | 'original_price' | 'amount_in_stock'
> & {
  price: number;
  original_price: number;
  amount_in_stock: number;
};

export type Sale = {
  id: string;
  date: string;
  amount: string;
  user_id: string;
  customer_id: string;
  created_at: string;
};

export type SaleRaw = Omit<Sale, 'amount'> & {
  amount: number;
};

export type SaleProduct = {
  product_id: string;
  sale_id: string;
};

export type Category = {
  id: string;
  name: string;
  created_at: string;
};

export type Customer = {
  id: string;
  name: string;
  document: string;
  email: string;
  phone_number: string;
  created_at: string;
};

export type CategoryField = {
  id: string;
  name: string;
};

export type State = {
  errors?: {};
  message?: string | null;
};
