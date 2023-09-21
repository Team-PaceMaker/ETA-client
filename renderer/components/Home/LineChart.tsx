import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ILineData {
  date: any;
  value: number;
}

const dummyData = [
  { date: "2023-09-18", value: 5 },
  { date: "2023-09-19", value: 3 },
  { date: "2023-09-20", value: 4 },
  { date: "2023-09-21", value: 8 },
  { date: "2023-09-22", value: 6 },
  { date: "2023-09-23", value: 3 },
];

const LineChart = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    drawChart(divRef);
  }, [divRef]);

  return <div ref={divRef}></div>;
};

function drawChart(divRef: React.RefObject<HTMLDivElement>) {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select(divRef.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // svg.append("circle").attr("r", 10).attr("cx", 10).attr("cy", 10).attr("fill", "red");

  const parseDate: any = d3.timeParse("%Y-%m-%d");
  const data = dummyData.map(({ date, value }) => ({
    date: parseDate(date),
    value,
  }));

  // Add X axis
  const xDomain = d3.extent(data, (data) => data.date) as [number, number];
  const x = d3.scaleUtc().domain(xDomain).range([0, width]);

  // Add Y axis
  const yMax = d3.max(data, (data) => data.value) as number;
  const y = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  svg.append("g").call(d3.axisLeft(y));

  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 3)
    .attr(
      "d",
      d3
        .line<ILineData>()
        .x((value) => x(value.date))
        .y((value) => y(value.value))
        .curve(d3.curveBasis)
    );
}

export default LineChart;
