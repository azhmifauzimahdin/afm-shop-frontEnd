export const addTodo = (data: any) => {
  return {
    type: "ADD",
    payload: data,
  };
};
export const delTodo = (data: any) => {
  return {
    type: "DEL",
    payload: data,
  };
};
