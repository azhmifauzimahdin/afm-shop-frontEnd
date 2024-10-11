import { DECREMENT, INCREMENT } from "../types/counter";

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});
