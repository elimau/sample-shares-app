import React, { useEffect, useRef } from "react";

import { Outer, ChartOuter } from "./style";
import { drawChart } from "./utils";

function Chart(props) {
  const { json } = props;
  const chartContainer = useRef(null);
  useEffect(() => {
    drawChart(chartContainer);
  }, []);

  return (
    <Outer>
      Chart
      <ChartOuter ref={chartContainer} />
    </Outer>
  );
}

export default Chart;
