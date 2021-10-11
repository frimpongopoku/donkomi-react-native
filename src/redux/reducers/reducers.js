import {
  GET_AVAILABLE_ROLES,
  NOTHING,
  SET_DONKOMI_USER,
  SET_FIREBASE_AUTH_USER,
  SET_ROUTINES,
  SET_USER_SHOPS,
  SET_USER_SHOP_ITEMS,
  SET_VENDORS,
  SHOW_FLOATING_MODAL,
} from "../actions/constants";

export const doNothingReducer = (state = null, action) => {
  if (action.type === NOTHING) return action.payload;

  return state;
};

export const firebaseAuthUserReducer = (state = null, action) => {
  if (action.type === SET_FIREBASE_AUTH_USER) return action.payload;

  return state;
};
export const setDonkomiUserReducer = (state = null, action) => {
  if (action.type === SET_DONKOMI_USER) return action.payload;

  return state;
};
export const showFloatingModalReducer = (
  state = { show: false, Jsx: null, close: true },
  action
) => {
  if (action.type === SHOW_FLOATING_MODAL) return action.payload;

  return state;
};
export const setUserShopsReducer = (
  state = null,
  action
) => {
  if (action.type === SET_USER_SHOPS) return action.payload;

  return state;
};
export const setUserShopItemsReducer = (
  state = null,
  action
) => {
  if (action.type === SET_USER_SHOP_ITEMS) return action.payload;

  return state;
};
export const setAvailableRolesReducer = (
  state = null,
  action
) => {
  if (action.type === GET_AVAILABLE_ROLES) return action.payload;

  return state;
};
export const setVendorsReducer = (
  state = null,
  action
) => {
  if (action.type === SET_VENDORS) return action.payload;

  return state;
};
export const setRoutinesReducer = (
  state = null,
  action
) => {
  if (action.type === SET_ROUTINES) return action.payload;

  return state;
};
