const initialState = {
  user: {
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
    case "UPDATEUSER":
      return {
        ...state,
        user: payload,
      };
    case "DELETEUSER":
      return {
        user: {
          id: "",
          name: "",
          email: "",
          gender: "",
          image: "",
          birthday: "",
          image_url: "",
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
