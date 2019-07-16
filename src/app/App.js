import React, { useState } from "react";

import Form from "../components/Form";
import Json from "../components/Json";
import TestCharts from "../components/TestCharts/index";
import StockChart from "../components/StockChart/index";
import { Outer, TickerBoxOuter } from "./App.style";
import { useFetchTickerHistory } from "./utils";

function App() {
  const [ticker, setTicker] = useState("A");
  const result = useFetchTickerHistory(ticker);

  return (
    <Outer>
      <h1>Get historical ticker data</h1>
      <TickerBoxOuter>
        <Form ticker={ticker} setTicker={setTicker} />
        <StockChart ticker={ticker} stockPricesData={result}/>
        <TestCharts />
        <Json json={result}/>
      </TickerBoxOuter>
    </Outer>
  );
}

export default App;
