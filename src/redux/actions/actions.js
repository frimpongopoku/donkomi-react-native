import { NOTHING } from "./constants";

export const doNothingAction = () => {
  return { type: NOTHING, payload: ["something", "Here", "there"] };
};
