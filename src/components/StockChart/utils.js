import * as d3 from "d3";

import { BITCOIN_DATA } from "./constants";

export const drawChart = chartContainer => {
  // drawTickerHistoryLineChart(chartContainer);
  drawTestBasic(chartContainer);
  drawTestBarChart(chartContainer);
  drawTestSvgElements(chartContainer);
  drawTestPieChart(chartContainer);
  drawTestLineChart(chartContainer);
};

const drawTestLineChart = chartContainer => {
  const data = parseBitcoinData(BITCOIN_DATA);

  const svgWidth = 600;
  const svgHeight = 400;
  const svgMarginPx = 10;
  const svgMargin = {
    top: svgMarginPx * 2,
    right: svgMarginPx * 2,
    bottom: svgMarginPx * 3,
    left: svgMarginPx * 5
  };
  const width = svgWidth - svgMargin.left - svgMargin.right;
  const height = svgHeight - svgMargin.top - svgMargin.bottom;

  const svg = createSvg(chartContainer, svgWidth, svgHeight);

  const g = svg
    .append("g")
    .attr("transform", `translate(${svgMargin.left},${svgMargin.top})`);

  const x = d3.scaleTime().rangeRound([0, width]);
  const y = d3.scaleLinear().rangeRound([height, 0]);

  const line = d3
    .line()
    .x(d => {
      return x(d.date);
    })
    .y(d => {
      return y(d.value);
    });

  // scale it.. using max/min values
  x.domain(d3.extent(data, d => d.date));
  y.domain(d3.extent(data, d => d.value));

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", `#000`)
    .attr("transform", `rotate(-90)`)
    .attr("y", `6`)
    .attr("dy", `0.71em`)
    .attr("text-anchor", `end`)
    .text("Price ($)");

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
};

export const parseBitcoinData = data => {
  var arr = [];
  for (var i in data.bpi) {
    arr.push({
      date: new Date(i), //date
      value: +data.bpi[i] //convert string to number
    });
  }
  return arr;
};

const drawTestPieChart = chartContainer => {
  const data = [
    { platform: "Android", percentage: 40.11 },
    { platform: "Windows", percentage: 36.69 },
    { platform: "iOS", percentage: 13.06 }
  ];
  const svgWidth = 300;
  const svgHeight = 300;
  const radius = Math.min(svgWidth, svgHeight) / 2;

  const svg = createSvg(chartContainer, svgWidth, svgHeight);

  const g = svg.append("g").attr("transform", `translate(${radius},${radius})`);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const pie = d3.pie().value(d => {
    return d.percentage;
  });

  const path = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(0);

  const arc = g
    .selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g");

  arc
    .append("path")
    .attr("d", path)
    .attr("fill", d => {
      return color(d.data.percentage);
    });

  const label = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(0);

  arc
    .append("text")
    .attr("transform", d => {
      return `translate(${label.centroid(d)})`;
    })
    .attr("text-anchor", "middle")
    .text(d => {
      return `${d.data.platform}:${d.data.percentage}%`;
    });
};

const drawTestSvgElements = chartContainer => {
  const svgWidth = 600;
  const svgHeight = 400;

  const svg = createSvg(chartContainer, svgWidth, svgHeight).attr(
    "class",
    "draw-svg-elements-container"
  );

  const line = svg
    .append("line")
    .attr("x1", 100)
    .attr("x2", 500)
    .attr("y1", 50)
    .attr("y2", 50)
    .attr("stroke", "red")
    .attr("stroke-width", 5);

  const rect = svg
    .append("rect")
    .attr("x", 100)
    .attr("y", 100)
    .attr("width", 200)
    .attr("height", 100)
    .attr("fill", "#9895FF");

  const circle = svg
    .append("circle")
    .attr("cx", 200) // Center point
    .attr("cy", 300)
    .attr("r", 80) // Radius
    .attr("fill", "#7CE8D5");
};

const drawTestBasic = chartContainer => {
  const dataset = [1, 2, 3, 4, 5];
  const svg = d3
    .select(chartContainer.current)
    .selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    // .text("D3 is awseome!!");
    .text(d => {
      return d;
    });

  const g = svg.append("g");
  return g;
};

const drawTestBarChart = chartContainer => {
  const svgWidth = 300;
  const svgHeight = 300;
  // const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
  const dataset = [1, 2, 3, 4, 5];
  const barPadding = 5;
  const barWidth = svgWidth / dataset.length;

  const svg = d3
    .select(chartContainer.current)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([d3.max(dataset), 0])
    .range([0, svgHeight]);

  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale);
  const xAxisTranslate = svgHeight - 20;
  svg
    .append("g")
    .attr("transform", "translate(50,10)")
    .call(yAxis);
  svg
    .append("g")
    .attr("transform", `translate(50,${xAxisTranslate})`)
    .call(xAxis);

  const barChart = svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", d => {
      return svgHeight - yScale(d);
    })
    .attr("height", d => {
      return yScale(d);
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", (d, i) => {
      const translate = [barWidth * i + 50 + barWidth / 2, -20];
      return `translate(${translate})`;
    });
  const text = svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(d => {
      return d;
    })
    .attr("y", d => {
      return svgHeight - d - 2;
    })
    .attr("x", (d, i) => {
      return barWidth * i;
    })
    .attr("fill", "#00aa00");
};

const drawTickerHistoryLineChart = chartContainer => {
  const data = [12, 5, 6, 6, 9, 10];
  const marginPx = 10;
  const width = 300;
  const height = 300;

  const rootG = drawSvg(chartContainer, marginPx);
  const { x, y } = drawAxis(rootG, width, height, data);
  drawLine(rootG);
};

const drawSvg = (chartContainer, marginPx) => {
  // Create an svg
  const svg = d3
    .select(chartContainer.current)
    .append("svg")
    .attr("width", 300 + marginPx * 2)
    .attr("height", 300 + marginPx * 2);

  const margin = {
    top: marginPx,
    left: marginPx
  };
  // Create and Transform Group Element
  const g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  return g;
};

const drawAxis = (g, width, height, data) => {
  // Add Scales
  var x = d3.scaleTime().rangeRound([0, width]);
  var y = d3.scaleLinear().rangeRound([height, 0]);

  // Create a Line
  var line = d3
    .line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.value);
    });

  x.domain(
    d3.extent(data, function(d) {
      return d.date;
    })
  );
  y.domain(
    d3.extent(data, function(d) {
      return d.value;
    })
  );

  // Append Axises
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

  return {
    x,
    y
  };
};

const drawLine = (g, y) => {
  // // Append a Path
  // g.append("path")
  //   .datum(data)
  //   .attr("fill", "none")
  //   .attr("stroke", "steelblue")
  //   .attr("stroke-linejoin", "round")
  //   .attr("stroke-linecap", "round")
  //   .attr("stroke-width", 1.5)
  //   .attr("d", line);
};

const createSvg = (chartContainer, svgWidth, svgHeight) => {
  const svg = d3
    .select(chartContainer.current)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
  return svg;
};
