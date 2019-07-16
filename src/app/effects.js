import {
  TICKER_API_CALL_DEBOUNCED_PERIOD,
  tickerHistoricalDataGetUrl
} from "./constants";
import { useFetch } from "../common/utils";

export function useFetchTickerHistory(ticker) {
    let url
    if (ticker) {
        url = tickerHistoricalDataGetUrl(ticker);
    }
    return useFetch(url, {}, TICKER_API_CALL_DEBOUNCED_PERIOD);
}
