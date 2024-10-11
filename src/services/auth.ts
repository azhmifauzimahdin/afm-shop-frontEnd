import axios, { AxiosResponse } from "axios";
import { getLoginGoogle, LoginRequest, LoginResponse } from "../types/login";
import httpRequest from "./api";
import {
  CreateAccountRequest,
  OtpVerificationRequest,
  RegisterRequest,
  RegisterResponse,
} from "../types/register";
import { LogoutResponse } from "../types/logout";
import {
  ForgetPasswordRequest,
  ForgetPasswordResponse,
  OtpVerificationForgetPasswordRequest,
  ResetPasswordRequest,
} from "../types/forgetPassword";

export const login = async (
  request: LoginRequest
): Promise<AxiosResponse<LoginResponse>> => {
  return await httpRequest.post("/login", request);
};

export const logout = async (): Promise<AxiosResponse<LogoutResponse>> => {
  return await httpRequest.post("/logout");
};

export const register = async (
  request: RegisterRequest
): Promise<AxiosResponse<RegisterResponse>> => {
  return await httpRequest.post("/register", request);
};

export const resendOtp = async (
  request: RegisterRequest
): Promise<AxiosResponse<RegisterResponse>> => {
  return await httpRequest.post("/register/resend-otp", request);
};

export const otpVerification = async (
  request: OtpVerificationRequest
): Promise<AxiosResponse<RegisterResponse>> => {
  return await httpRequest.post("/register/otp-verification", request);
};

export const createAccount = async (
  request: CreateAccountRequest
): Promise<AxiosResponse<LoginResponse>> => {
  return await httpRequest.post("/register/create-account", request);
};

export const forgetPassword = async (
  request: ForgetPasswordRequest
): Promise<AxiosResponse<ForgetPasswordResponse>> => {
  return await httpRequest.post("/forget-password", request);
};

export const resendOtpForgetPassword = async (
  request: ForgetPasswordRequest
): Promise<AxiosResponse<ForgetPasswordResponse>> => {
  return await httpRequest.post("/forget-password/resend-otp", request);
};

export const otpVerificationForgetPassword = async (
  request: OtpVerificationForgetPasswordRequest
): Promise<AxiosResponse<ForgetPasswordResponse>> => {
  return await httpRequest.post("/forget-password/otp-verification", request);
};

export const resetPassword = async (
  request: ResetPasswordRequest
): Promise<AxiosResponse<LoginResponse>> => {
  return await httpRequest.post("/forget-password/reset-password", request);
};

export const loginGoogle = async (
  request: getLoginGoogle
): Promise<AxiosResponse<LoginResponse>> => {
  return await httpRequest.post("/login-google", request);
};

export const userGoogle = async (
  token: string
): Promise<AxiosResponse<getLoginGoogle>> => {
  return await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
};
