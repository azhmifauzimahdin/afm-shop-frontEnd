import { AxiosResponse } from "axios";
import httpRequest from "./api";
import { UserResponse } from "../types/user";

export const me = async (): Promise<AxiosResponse<UserResponse>> => {
  return await httpRequest.get("/me");
};
