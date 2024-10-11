export interface ForgetPasswordRequest {
  email: string;
}
export interface OtpVerificationForgetPasswordRequest {
  email: string;
  otp: number;
}

export interface ForgetPasswordResponse {
  code: number;
  success: boolean;
  message: string;
  data: ForgetPasswordResponseData;
}
export interface ForgetPasswordResponseData {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: number;
  password: string;
  password_confirmation: string;
}
