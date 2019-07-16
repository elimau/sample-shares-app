import React, { useState } from "react";

import TickerInputForm from "../components/TickerInputForm";
import Json from "../components/Json";
import TestCharts from "../components/TestCharts/index";
import StockChart from "../components/StockChart/index";
import { Outer, TickerBoxOuter } from "./App.style";
import { useFetchTickerHistory } from "./effects";

function App() {
  const [ticker, setTicker] = useState("");
  const result = useFetchTickerHistory(ticker);

  return (
    <Outer>
      <h1>Get historical ticker data</h1>
      <TickerBoxOuter>
        <TickerInputForm ticker={ticker} setTicker={setTicker} />
        <StockChart ticker={ticker} stockPricesData={result}/>
        <TestCharts />
        <Json json={result}/>
      </TickerBoxOuter>
    </Outer>
  );
}

export default App;
