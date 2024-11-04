import { SETLOADING } from "../types/loading";

export const setLoading = (data: any) => {
  return {
    type: SETLOADING,
    payload: data,
  };
};
