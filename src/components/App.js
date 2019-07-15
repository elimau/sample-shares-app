import React, { useState, useEffect } from "react";

function useFetch(url, defaultData) {
  const [data, updateData] = useState(defaultData);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(url);
      const json = await resp.json();
      updateData(json);
    }
    fetchData();
  }, [url]);

  return data;
}

function useFetchWeather(ticker = "GOOG") {
  const query = `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}`;
  return useFetch(query, {});
}

function App() {
  const [location, setLocation] = useState("A");
  const result = useFetchWeather(location);

  return (
    <div>
      <p>hello world</p>
      <p>
        <input
          type="input"
          value={location}
          onChange={evt => setLocation(evt.target.value)}
        />
      </p>
      <p>{JSON.stringify(result)}</p>
    </div>
  );
}

export default App;
