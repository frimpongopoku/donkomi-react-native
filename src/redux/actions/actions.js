import {
  NOTHING,
  REMOVE_DONKOMI_USER_AUTH,
  REMOVE_FIREBASE_AUTH,
  SET_DONKOMI_USER,
  SET_FIREBASE_AUTH_USER,
  SET_USER_SHOPS,
  SET_USER_SHOP_ITEMS,
  SHOW_FLOATING_MODAL,
} from "./constants";

import InternetExplorer from "./../../shared/classes/InternetExplorer";
import { REGISTER_USER } from "../../shared/urls";

export const doNothingAction = () => {
  return { type: NOTHING, payload: ["something", "Here", "there"] };
};

export const setFirebaseAuthUserAction = (user) => {
  return { type: SET_FIREBASE_AUTH_USER, payload: user };
};
export const removeFirebaseAuthAction = () => {
  return { type: REMOVE_FIREBASE_AUTH, payload: null };
};

export const setDonkomiUserAction = (user = null) => {
  return { type: SET_DONKOMI_USER, payload: user };
};

export const removeDonkomiUserAuthAction = () => {
  return setDonkomiUserAction();
};

export const logoutAction = () => {
  return (dispatch) => {
    dispatch(removeFirebaseAuthAction());
    dispatch(removeDonkomiUserAuthAction());
  };
};

export const showFloatingModalActions = (
  props = { show: false, Jsx: null, close: true }
) => {
  return { type: SHOW_FLOATING_MODAL, payload: props };
};


export const setUserShopsAction = (shops= null) => { 
  return {type: SET_USER_SHOPS,payload:shops}
}
export const setUserShopItemsAction = (items = null) => { 
  return {type: SET_USER_SHOP_ITEMS,payload:items}
}