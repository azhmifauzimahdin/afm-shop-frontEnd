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
