import { State, Actions, Constants } from "./types";

export const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case Constants.SET_INSTANCE:
      return action.payload.trip;
    default:
      return state;
  }
};
