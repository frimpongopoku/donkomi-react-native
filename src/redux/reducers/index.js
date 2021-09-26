import { combineReducers } from "redux";
import {
  doNothingReducer,
  firebaseAuthUserReducer,
  setDonkomiUserReducer,
} from "./reducers";

export default combineReducers({
  nothing: doNothingReducer,
  fireAuth: firebaseAuthUserReducer,
  user: setDonkomiUserReducer,
});
