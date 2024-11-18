import { User } from "./user";

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
  stock: number;
  price_now: number;
  format_price: number;
  images: [Image];
  rating: Rating;
}

export interface Rating {
  rate: number;
  specific_rate: number[];
  percentage_rate: number[];
  reviews: [Review];
}

export interface Review {
  id: string;
  title: string;
  review: string;
  rating: number;
  date: string;
  images: [Image];
  user: User;
}

export interface Image {
  id: string;
  title: string;
  size: number;
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
    image: Image;
  };
}
