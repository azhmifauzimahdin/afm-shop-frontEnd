import { DELETEME, UPDATEME } from "../types/me";

export const updateMe = (data: any) => {
  return {
    type: UPDATEME,
    payload: data,
  };
};

export const deleteMe = () => {
  return {
    type: DELETEME,
  };
};
