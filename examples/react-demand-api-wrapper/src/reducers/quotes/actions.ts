import * as React from "react";
import { Constants } from "./types";
import { QuotesV2Service } from "@karhoo/demand-api";

export default (dispatch: React.Dispatch<any>) => ({
  setInstance: (quotesService: QuotesV2Service) =>
    dispatch({ type: Constants.SET_INSTANCE, payload: { quotesService } }),
});
