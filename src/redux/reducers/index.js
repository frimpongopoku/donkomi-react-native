import { combineReducers } from "redux";
import {
  doNothingReducer,
  firebaseAuthUserReducer,
  setDonkomiUserReducer,
  showFloatingModalReducer,
} from "./reducers";

export default combineReducers({
  nothing: doNothingReducer,
  fireAuth: firebaseAuthUserReducer,
  user: setDonkomiUserReducer,
  modal: showFloatingModalReducer,
});
