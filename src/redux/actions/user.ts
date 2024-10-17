import { DELETEUSER, UPDATEUSER } from "../types/user";

export const updateUser = (data: any) => {
  return {
    type: UPDATEUSER,
    payload: data,
  };
};

export const deleteUser = () => {
  return {
    type: DELETEUSER,
  };
};
