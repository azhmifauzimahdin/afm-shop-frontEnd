import { Product } from "../../types/product";
import { ADDPRODUCT, DELPRODUCT, SETPRODUCT } from "../types/product";

export const setProduct = (data: Product[]) => {
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

export const delProduct = (data: Product) => {
  return {
    type: DELPRODUCT,
    payload: data,
  };
};
