import { AxiosResponse } from "axios";
import {
  ProductRequest,
  ProductResponse,
  ProductsReponse,
} from "../types/product";
import httpRequest from "./api";

export const getAll = async (
  page?: number,
  perPage?: number,
  search?: string
): Promise<AxiosResponse<ProductsReponse>> => {
  const requestPage = page ?? 1;
  const requestPerPage = perPage ?? 10;
  const requestSearch = search ?? "";
  return await httpRequest.get(
    `/products?page=${requestPage}&per_page=${requestPerPage}&search=${requestSearch}`
  );
};

export const addProduct = async (
  Request: ProductRequest
): Promise<AxiosResponse<ProductResponse>> => {
  return await httpRequest.post("/products", Request, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editProduct = async (
  id: string
): Promise<AxiosResponse<ProductResponse>> => {
  return await httpRequest.get(`products/${id}`);
};

export const deleteProduct = async (
  id: string
): Promise<AxiosResponse<ProductsReponse>> => {
  return await httpRequest.delete(`/products/${id}`);
};
