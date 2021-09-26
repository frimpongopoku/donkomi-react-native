import { NOTHING, SET_DONKOMI_USER, SET_FIREBASE_AUTH_USER } from "../actions/constants";

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


