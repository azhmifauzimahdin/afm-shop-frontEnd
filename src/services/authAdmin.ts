import { AxiosResponse } from "axios";
import { LoginAdminResponse, LoginRequest } from "../types/login";
import httpRequest from "./api";
import { LogoutResponse } from "../types/logout";

export const login = async (
  request: LoginRequest
): Promise<AxiosResponse<LoginAdminResponse>> => {
  return await httpRequest.post("/admin/login", request);
};

export const logout = async (): Promise<AxiosResponse<LogoutResponse>> => {
  return await httpRequest.post("/admin/logout");
};
