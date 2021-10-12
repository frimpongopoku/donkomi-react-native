import { combineReducers } from "redux";
import {
  doNothingReducer,
  firebaseAuthUserReducer,
  setDonkomiUserReducer,
  setUserShopItemsReducer,
  setUserShopsReducer,
  showFloatingModalReducer,
  setAvailableRolesReducer,
  setVendorsReducer,
  setRoutinesReducer,
  setStockReducer
} from "./reducers";

export default combineReducers({
  nothing: doNothingReducer,
  fireAuth: firebaseAuthUserReducer,
  user: setDonkomiUserReducer,
  modal: showFloatingModalReducer,
  shops: setUserShopsReducer, 
  products: setUserShopItemsReducer,
  roles: setAvailableRolesReducer, 
  routines: setRoutinesReducer,
  vendors: setVendorsReducer,
  stock: setStockReducer,
});
