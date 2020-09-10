import * as React from "react";
import { Constants } from "./types";
import { LocationService } from "@karhoo/demand-api";

export default (dispatch: React.Dispatch<any>) => ({
  setInstance: (locationService: LocationService) =>
    dispatch({ type: Constants.SET_INSTANCE, payload: { locationService } }),
});
