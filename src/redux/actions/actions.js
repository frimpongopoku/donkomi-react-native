import { NOTHING, SET_FIREBASE_AUTH_USER } from "./constants";

export const doNothingAction = () => {
  return { type: NOTHING, payload: ["something", "Here", "there"] };
};

export const setFirebaseAuthUserAction = (user) => {
  return { type: SET_FIREBASE_AUTH_USER, payload: user };
};
