import { AxiosResponse } from "axios";
import { ProductsReponse } from "../types/product";
import httpRequest from "./api";

export const getAll = async (
  search?: string
): Promise<AxiosResponse<ProductsReponse>> => {
  return await httpRequest.get(`/products?title=${search}`);
};
