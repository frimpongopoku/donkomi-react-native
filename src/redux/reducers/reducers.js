import {
  GET_AVAILABLE_ROLES,
  LOAD_NEWS,
  NOTHING,
  SET_CAMPAIGNS,
  SET_DONKOMI_USER,
  SET_FIREBASE_AUTH_USER,
  SET_MARKET_NEWS,
  SET_MARKET_NEWS_PARAMS,
  SET_ROUTINES,
  SET_STOCK,
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

export const setStockReducer = (
  state = null,
  action
) => {
  if (action.type === SET_STOCK) return action.payload;

  return state;
};
export const setCampaignReducer = (
  state = null,
  action
) => {
  if (action.type === SET_CAMPAIGNS) return action.payload;

  return state;
};
export const loadNewsReducer = (
  state = null,
  action
) => {
  if (action.type === LOAD_NEWS) return action.payload;

  return state;
};
export const setNewsParamsReducer = (
  state = null,
  action
) => {
  if (action.type === LOAD_NEWS) return action.payload;

  return state;
};
export const marketNewsReducer = (
  state = null,
  action
) => {
  if (action.type === SET_MARKET_NEWS) return action.payload;

  return state;
};
export const marketNewsParamsReducer = (
  state = null,
  action
) => {
  if (action.type === SET_MARKET_NEWS_PARAMS) return action.payload;

  return state;
};
