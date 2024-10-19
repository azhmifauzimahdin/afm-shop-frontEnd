import { Product } from "../../types/product";

const initialState = {
  products: [],
};

const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case "SETPRODUCT":
      return {
        ...state,
        products: payload,
      };
    case "ADDPRODUCT":
      return {
        ...state,
        products: [...state.products, payload],
      };
    case "DELPRODUCT":
      return {
        ...state,
        products: state.products.filter((todo: Product) => todo.id !== payload),
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
