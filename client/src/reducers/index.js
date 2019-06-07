import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import clubReducer from "./clubReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  clubs: clubReducer
});
