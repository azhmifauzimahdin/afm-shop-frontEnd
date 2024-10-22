const initialState = {
  admin: {
    id: "",
    name: "",
    email: "",
    image: "",
  },
};

const reducer = (
  state = initialState,
  action: { type: string; payload: number }
) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATEADMIN":
      return {
        ...state,
        admin: payload,
      };
    case "DELETEADMIN":
      return {
        admin: {
          id: "",
          name: "",
          email: "",
          image: "",
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
