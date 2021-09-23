import { NOTHING } from "../actions/constants";

export const doNothingReducer = (state = null, action) => {
  if (action.type === NOTHING) return action.payload;

  return state;
};
