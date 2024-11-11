import { Product } from "../../types/product";
import {
  ADDPRODUCT,
  DELPRODUCT,
  EDITPRODUCT,
  SETPRODUCT,
} from "../types/product";

export const setProduct = (data: [Product]) => {
  return {
    type: SETPRODUCT,
    payload: data,
  };
};

export const addProduct = (data: Product) => {
  return {
    type: ADDPRODUCT,
    payload: data,
  };
};

export const editProduct = (data: Product) => {
  return {
    type: EDITPRODUCT,
    payload: data,
  };
};

export const delProduct = (id: string) => {
  return {
    type: DELPRODUCT,
    payload: id,
  };
};
