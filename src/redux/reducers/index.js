import { combineReducers } from "redux";
import {
  doNothingReducer,
  firebaseAuthUserReducer,
  setDonkomiUserReducer,
  setUserShopItemsReducer,
  setUserShopsReducer,
  showFloatingModalReducer,
} from "./reducers";

export default combineReducers({
  nothing: doNothingReducer,
  fireAuth: firebaseAuthUserReducer,
  user: setDonkomiUserReducer,
  modal: showFloatingModalReducer,
  shops: setUserShopsReducer, 
  products: setUserShopItemsReducer
});
