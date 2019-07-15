import React, { useState } from "react";

import Form from "../components/Form";
import Json from "../components/Json";
import Chart from "../components/Chart/index";
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
        <Chart json={result}/>
        <Json json={result}/>
      </TickerBoxOuter>
    </Outer>
  );
}

export default App;
