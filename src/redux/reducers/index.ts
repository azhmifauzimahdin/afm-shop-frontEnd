import { combineReducers } from "redux";

import counter from "./counter";
import todo from "./todo";
import me from "./me";

export default combineReducers({ counter, todo, me });
