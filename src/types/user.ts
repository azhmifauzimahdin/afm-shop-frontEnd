export interface UserResponse {
  code: number;
  success: boolean;
  message: string;
  data: dataUserResponse;
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
