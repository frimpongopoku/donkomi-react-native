import { combineReducers } from "redux";
import { doNothingReducer, firebaseAuthUserReducer } from "./reducers";

export default combineReducers({
  nothing: doNothingReducer,
  fireAuth: firebaseAuthUserReducer,
});
