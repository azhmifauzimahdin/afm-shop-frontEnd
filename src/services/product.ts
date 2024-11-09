import { AxiosResponse } from "axios";
import {
  ProductImageReponse,
  ProductRequest,
  ProductResponse,
  ProductsReponse,
} from "../types/product";
import httpRequest from "./api";

export const getAll = async (
  search?: string
): Promise<AxiosResponse<ProductsReponse>> => {
  return await httpRequest.get(`/products?search=${search ?? ""}`);
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
  return await httpRequest.get(`/products/${id}`);
};

export const updateProduct = async (
  id: string,
  Request: ProductRequest
): Promise<AxiosResponse<ProductResponse>> => {
  return await httpRequest.post(`/products/${id}`, Request, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct = async (
  id: string
): Promise<AxiosResponse<ProductsReponse>> => {
  return await httpRequest.delete(`/products/${id}`);
};

export const deleteProductImage = async (
  id: string
): Promise<AxiosResponse<ProductImageReponse>> => {
  return await httpRequest.delete(`/images/${id}`);
};
