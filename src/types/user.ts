export interface UserRequest {
  _method: string;
  name: string;
  gender: string;
  birthday: string;
  image: any;
}

export interface UserEmailRequest {
  email: string;
}

export interface UserVerificationRequest {
  email: string;
  otp: number;
}

export interface ChangePasswordRequest{
  old_password: string;
  password: string;
  password_confirmation: string;
}

export interface UserResponse {
  code: number;
  success: boolean;
  message: string;
  data: dataUserResponse;
}

export interface UserEmailResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    email: string;
  };
}

export interface dataUserResponse {
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  birthday: string;
}

export interface me {
  id: string;
  name: string;
  email: string;
  image: string;
  birthday: string;
}
