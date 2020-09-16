import { State, Actions, Constants } from "./types";
import { QuotesBloc } from "@karhoo/demand-bloc-quotes";

export const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case Constants.SET_INSTANCE:
      return new QuotesBloc(action.payload.quotesService);
    default:
      return state;
  }
};
