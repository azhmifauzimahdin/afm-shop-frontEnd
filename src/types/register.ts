export interface RegisterRequest {
  email: string;
}

export interface OtpVerificationRequest {
  email: string;
  otp: number;
}

export interface RegisterResponse {
  code: number;
  success: boolean;
  message: string;
  data: RegisterResponseData;
}
export interface RegisterResponseData {
  email: string;
}

export interface CreateAccountRequest {
  email: string;
  otp: number;
  name: string;
  password: string;
  password_confirmation: string;
}
