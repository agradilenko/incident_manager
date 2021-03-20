import { combineReducers } from "redux";
import authReducer from "./authReducer";
import incedentReducer from "./incedentReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  incidents: incedentReducer
});