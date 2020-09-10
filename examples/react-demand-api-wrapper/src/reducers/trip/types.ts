import { LocationService } from "@karhoo/demand-api";
import { TripCreateModule } from "@karhoo/demand-bloc-trip-create";
import { ActionMap } from "../../types";

// Add your types here

// and create a state
export interface State extends TripCreateModule {}

// declare actions
export interface DispatchActions {
  setInstance: (locationService: LocationService) => void;
}

// define constants
export enum Constants {
  SET_INSTANCE = "SET_INSTANCE",
}

// define payload
type Payload = {
  [Constants.SET_INSTANCE]: { locationService: LocationService };
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];
