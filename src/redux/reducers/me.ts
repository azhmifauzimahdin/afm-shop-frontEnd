const initialState = {
  me: {
    id: "",
    name: "",
    email: "",
    image: "",
    gender: "",
    birthday: "",
  },
};

const reducer = (
  state = initialState,
  action: { type: string; payload: number }
) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATEME":
      return {
        ...state,
        me: payload,
      };
    case "DELETEME":
      return {
        me: {
          id: "",
          name: "",
          email: "",
          gender: "",
          image: "",
          birthday: "",
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
