import { Admin } from "./admin";
import { User } from "./user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  success: boolean;
  message: string;
  data: LoginResponseData;
}

export interface LoginResponseData {
  authorization: token;
  user: User;
}

export interface token {
  token: string;
  type: string;
}
export interface LoginAdminResponse {
  code: number;
  success: boolean;
  message: string;
  data: LoginAdminResponseData;
}

export interface LoginAdminResponseData {
  authorization: token;
  user: Admin;
}

export interface getLoginGoogle {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
}
