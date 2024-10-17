import { AxiosResponse } from "axios";
import httpRequest from "./api";
import {
  ChangePasswordRequest,
  UserEmailRequest,
  UserEmailResponse,
  UserRequest,
  UserResponse,
  UserVerificationRequest,
} from "../types/user";

export const me = async (): Promise<AxiosResponse<UserResponse>> => {
  return await httpRequest.get("/me");
};

export const updateUser = async (
  Request: UserRequest
): Promise<AxiosResponse<UserResponse>> => {
  return await httpRequest.post("/user", Request, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateEmail = async (
  Request: UserEmailRequest
): Promise<AxiosResponse<UserEmailResponse>> => {
  return await httpRequest.put("/user/email", Request);
};

export const resendOtp = async (
  Request: UserEmailRequest
): Promise<AxiosResponse<UserEmailResponse>> => {
  return await httpRequest.put("/user/resend-otp", Request);
};

export const otpVerification = async (
  Request: UserVerificationRequest
): Promise<AxiosResponse<UserResponse>> => {
  return await httpRequest.put("/user/verifikasi-otp", Request);
};

export const changePassword = async(Request: ChangePasswordRequest): Promise<AxiosResponse<UserResponse>> => {
  return await httpRequest.put("/user/change-password", Request);
}
