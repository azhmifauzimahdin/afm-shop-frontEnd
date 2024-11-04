import { combineReducers } from "redux";

import me from "./me";
import user from "./user";
import products from "./product";
import admin from "./admin";
import loading from "./loading";
import message from "./message";
import id from "./id";

export default combineReducers({
  me,
  user,
  products,
  admin,
  loading,
  message,
  id,
});
