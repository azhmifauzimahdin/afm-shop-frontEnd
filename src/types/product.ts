export interface ProductRequest {
  title: string;
  description: string;
  price: number;
  discount: number;
  images: [];
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  sold: number;
  created_at: string;
  updated_at: string;
  price_now: number;
  format_price: number;
  images: [ProductImage];
}

export interface ProductImage {
  id: string;
  product_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}

export interface ProductsReponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    products: [Product];
  };
}

export interface DataResponse {
  current_page: number;
  data: [Product];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface ProductResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    product: Product;
  };
}

export interface ProductImageReponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    image: ProductImage;
  };
}
