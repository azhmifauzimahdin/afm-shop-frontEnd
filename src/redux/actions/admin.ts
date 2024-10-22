import { DELETEADMIN, UPDATEADMIN } from "../types/admin";

export const updateAdmin = (data: any) => {
  return {
    type: UPDATEADMIN,
    payload: data,
  };
};

export const deleteAdmin = () => {
  return {
    type: DELETEADMIN,
  };
};
