import { QuotesV2Service } from "@karhoo/demand-api";
import { QuotesBloc } from "@karhoo/demand-bloc-quotes";
import { ActionMap } from "../../types";

// Add your types here

// and create a state
export interface State extends QuotesBloc {}

// declare actions
export interface DispatchActions {
  setInstance: (quotesService: QuotesV2Service) => void;
}

// define constants
export enum Constants {
  SET_INSTANCE = "QUOTES_SET_INSTANCE",
}

// define payload
type Payload = {
  [Constants.SET_INSTANCE]: { quotesService: QuotesV2Service };
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];
