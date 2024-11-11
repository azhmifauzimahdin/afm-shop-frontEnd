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
        products: [payload, ...state.products],
      };
    case "EDITPRODUCT":
      return {
        ...state,
        products: state.products.map((product: Product) =>
          product.id === payload.id ? payload : product
        ),
      };
    case "DELPRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product: Product) => product.id !== payload
        ),
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
