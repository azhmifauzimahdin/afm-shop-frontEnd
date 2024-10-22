export interface Admin {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface AdminResponse {
  code: number;
  success: boolean;
  message: string;
  data: dataUserResponse;
}

export interface dataUserResponse {
  user: Admin;
}
