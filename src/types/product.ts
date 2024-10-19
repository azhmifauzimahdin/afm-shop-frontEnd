export interface Product {
  id: string;
  image: string;
  title: string;
  desctiption: string;
  price: number;
  discount: number;
  sold: number;
  created_at: string;
  updated_at: string;
}

export interface ProductsReponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    products: [Product];
  };
}
