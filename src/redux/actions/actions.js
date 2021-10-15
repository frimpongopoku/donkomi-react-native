import {
  GET_AVAILABLE_ROLES,
  NOTHING,
  REMOVE_DONKOMI_USER_AUTH,
  REMOVE_FIREBASE_AUTH,
  SET_DONKOMI_USER,
  SET_FIREBASE_AUTH_USER,
  SET_ROUTINES,
  SET_STOCK,
  SET_USER_SHOPS,
  SET_USER_SHOP_ITEMS,
  SET_VENDORS,
  SHOW_FLOATING_MODAL,
} from "./constants";

import InternetExplorer from "./../../shared/classes/InternetExplorer";
import { DELETE_A_VENDOR, REGISTER_USER } from "../../shared/urls";

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

export const setUserShopsAction = (shops = null) => {
  return { type: SET_USER_SHOPS, payload: shops };
};
export const setUserShopItemsAction = (items = null) => {
  return { type: SET_USER_SHOP_ITEMS, payload: items };
};

export const setAvailableRolesAction = (roles = []) => {
  return { type: GET_AVAILABLE_ROLES, payload: roles };
};
export const setVendorsAction = (data = []) => {
  return { type: SET_VENDORS, payload: data };
};
export const setRoutinesAction = (data = []) => {
  return { type: SET_ROUTINES, payload: data };
};

export const setStockAction = (data = []) => {
  return { type: SET_STOCK, payload: data };
};

export const processAndDeleteVendor = (params) => {
  const { vendor, vendors, user_id } = params;
  return (dispatch, getState) => {
    const { stock } = getState();
    dispatch(
      deleteContentFromBackend(DELETE_A_VENDOR, {
        vendor_id: vendor.id,
        user_id,
      })
    );
    dispatch(removeRelatedStock(vendor, stock));
    dispatch(removeItemFromRedux(vendors, "id", vendor.id, SET_VENDORS));
  };
};

const removeRelatedStock = (vendor, stock = []) => {
  const items = stock.filter((s) => s.vendor !== vendor.id);
  return { type: SET_STOCK, payload: items };
};

const deleteContentFromBackend = (URL, body) => {
  InternetExplorer.send(URL, "POST", body).catch((e) => {
    console.log("ERROR_DELETING_CONTENT_FROM_BACKEND", e?.toString());
  });
  return { type: "NOTHING", payload: null };
};
const removeItemFromRedux = (list = [], key, value, type) => {
  const rem = list.filter((itm) => itm[key] !== value);
  console.log("I am teh remaineder", rem);
  return { type, payload: rem };
};
