const initialState = {
  message: "",
};

const reducer = (
  state = initialState,
  action: { type: string; payload: boolean }
) => {
  const { type, payload } = action;

  switch (type) {
    case "SETMESSAGE":
      return {
        ...state,
        message: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
