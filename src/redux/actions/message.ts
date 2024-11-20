import { SETMESSAGE } from "../types/message";

export const setMessage = (data: string) => {
  return {
    type: SETMESSAGE,
    payload: data,
  };
};
