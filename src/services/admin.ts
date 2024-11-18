import { AxiosResponse } from "axios";
import { AdminResponse } from "../types/admin";
import httpRequest from "./api";
import { ChangePasswordRequest } from "../types/user";

export const me = async (): Promise<AxiosResponse<AdminResponse>> => {
  return await httpRequest.get("/admin/me");
};

export const changePassword = async (
  Request: ChangePasswordRequest
): Promise<AxiosResponse<AdminResponse>> => {
  return await httpRequest.put("/admin/change-password", Request);
};
