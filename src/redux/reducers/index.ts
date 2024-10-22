import { combineReducers } from "redux";

import me from "./me";
import user from "./user";
import products from "./product";
import admin from "./admin";

export default combineReducers({ me, user, products, admin });
