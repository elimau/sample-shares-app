import React, { useEffect, useRef } from "react";

import { Outer, ChartOuter } from "./style";
import { drawChart } from "./utils";

function Chart(props) {
  const { ticker, stockPricesData } = props;
  const chartContainer = useRef(null);
  useEffect(() => {
    drawChart(chartContainer);
  }, []);

  return (
    <Outer>
      <h3>Stock Chart for [{ticker}]</h3>
      <ChartOuter ref={chartContainer} />
    </Outer>
  );
}

export default Chart;
