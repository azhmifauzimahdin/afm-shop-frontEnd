const initialState = {
  id: false,
};

const reducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  const { type, payload } = action;

  switch (type) {
    case "SETID":
      return {
        ...state,
        id: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
