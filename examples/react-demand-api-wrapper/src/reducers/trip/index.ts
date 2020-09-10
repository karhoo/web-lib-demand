import { State, Actions, Constants } from "./types";
import { TripCreateBloc } from "@karhoo/demand-bloc-trip-create";

export const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case Constants.SET_INSTANCE:
      return new TripCreateBloc(action.payload.locationService);
    default:
      return state;
  }
};
