import { useState, useEffect } from "react";
import _ from "lodash";

const fetchAndUpdateData = async (url, updateData) => {
  const resp = await fetch(url);
  const json = await resp.json();
  updateData(json);
};

export const debouncedFetchAndUpdateData = _.debounce(fetchAndUpdateData, 200);

export function useFetch(url, defaultData, debounceMs = 0) {
  // todo: disable fetch for now.
  return {};

  // const [data, updateData] = useState(defaultData);

  // useEffect(() => {
  //   debouncedFetchAndUpdateData(url, updateData);
  //   // if (debounceMs) {
  //   //   debouncedFetchAndUpdateData(url, updateData);
  //   // } else {
  //   //   fetchAndUpdateData(url, updateData);
  //   // }
  // }, [url]);

  // return data;
}

export function useFetchTickerHistory(ticker = "GOOG") {
  const query = `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}`;
  return useFetch(query, {}, 200);
}
