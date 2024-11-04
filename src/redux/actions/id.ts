import { SETID } from "../types/id";

export const setID = (data: any) => {
  return {
    type: SETID,
    payload: data,
  };
};
