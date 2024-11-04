import { SETMESSAGE } from "../types/message";

export const setMessage = (data: any) => {
  return {
    type: SETMESSAGE,
    payload: data,
  };
};
