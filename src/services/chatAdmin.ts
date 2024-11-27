import { AxiosResponse } from "axios";
import httpRequest from "./api";
import { ChatResponse, SendChatResponse } from "../types/chat";

export const getAll = async (): Promise<AxiosResponse<ChatResponse>> => {
  return await httpRequest.get("/admin/messages");
};

export const sendChat = async (
  id: string | undefined,
  message: string
): Promise<AxiosResponse<SendChatResponse>> => {
  return await httpRequest.post(`/admin/messages/${id}`, { message: message });
};

export const readChat = async (
  id: string
): Promise<AxiosResponse<ChatResponse>> => {
  return await httpRequest.put(`/admin/messages/read/${id}`);
};
