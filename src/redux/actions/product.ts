import { Product } from "../../types/product";
import { DELPRODUCT, SETPRODUCT } from "../types/product";

export const setProduct = (data: [Product]) => {
  return {
    type: SETPRODUCT,
    payload: data,
  };
};

export const delProduct = (id: string) => {
  return {
    type: DELPRODUCT,
    payload: id,
  };
};
