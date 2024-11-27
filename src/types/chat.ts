import { Admin } from "./admin";
import { User } from "./user";

export interface ChatResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    messages: [Message];
  };
}

export interface SendChatResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    messages: Chat;
  };
}

export interface Message {
  id: string;
  messages: [any | Chat];
  user: User;
  admin: Admin;
  read_user: number;
  read_admin: number;
}

export interface Chat {
  id: string;
  chat_id: string;
  message: string;
  status: number;
  sent_by: string;
  created_at: string;
  date: string;
  time: string;
}
