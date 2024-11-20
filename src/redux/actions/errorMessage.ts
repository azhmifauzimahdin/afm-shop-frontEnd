import { ADDERRORMESSAGE, SETERRORMESSAGE } from "../types/errorMessage";

export const setErrorMessage = (data: any) => {
  return {
    type: SETERRORMESSAGE,
    payload: data,
  };
};

export const addErrorMessage = (data: any) => {
  return {
    type: ADDERRORMESSAGE,
    payload: data,
  };
};
