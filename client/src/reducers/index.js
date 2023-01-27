import { combineReducers } from "redux";

import auth from "./auth";
import repos from "./repos";

export default combineReducers({
    auth, repos
})