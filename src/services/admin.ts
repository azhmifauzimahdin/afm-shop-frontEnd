import { AxiosResponse } from "axios";
import { AdminResponse } from "../types/admin";
import httpRequest from "./api";

export const me = async (): Promise<AxiosResponse<AdminResponse>> => {
  return await httpRequest.get("/admin/me");
};
