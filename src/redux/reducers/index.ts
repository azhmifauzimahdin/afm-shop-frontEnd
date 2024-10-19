import { combineReducers } from "redux";

import me from "./me";
import user from "./user";
import products from "./product";

export default combineReducers({ me, user, products });
