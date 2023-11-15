import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import COLOR from '../../constants/colors';

interface DataPoint {
  date: Date;
  value: number;
}

const realData: DataPoint[] = [
  { date: new Date('2023-11-11'), value: 5 },
  { date: new Date('2023-11-12'), value: 3 },
  { date: new Date('2023-11-13'), value: 4 },
  { date: new Date('2023-11-14'), value: 8 },
  { date: new Date('2023-11-15'), value: 6 },
  { date: new Date('2023-11-16'), value: 3 },
];

// const dummyData = [
//   { date: '2023-09-18', value: 5 },
//   { date: '2023-09-19', value: 3 },
//   { date: '2023-09-20', value: 4 },
//   { date: '2023-09-21', value: 8 },
//   { date: '2023-09-22', value: 6 },
//   { date: '2023-09-23', value: 3 },
// ];

const LineChart = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    drawChart(divRef);
  }, [divRef]);

  return <div id='line-container' ref={divRef}></div>;
};

function drawChart(divRef: React.RefObject<HTMLDivElement>) {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 560 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  d3.select('#line-container').select('svg').remove();

  const svg = d3
    .select(divRef.current)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // const parseDate: any = d3.timeParse('%Y-%m-%d');
  // const data = dummyData.map(({ date, value }) => ({
  //   date: parseDate(date),
  //   value,
  // }));

  // Add X axis
  // const xDomain = d3.extent(data, (data) => data.date) as [number, number];
  // const x = d3.scaleUtc().domain(xDomain).range([0, width]);

  // Add Y axis
  // const yMax = d3.max(data, (data) => data.value) as number;
  // const y = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

  // D3.js 스케일 설정
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(realData, (d) => d.date) as [Date, Date])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(realData, (d) => d.value) as number])
    .range([height, 0]);

  // 선 생성
  const line = d3
    .line<DataPoint>()
    .x((d) => xScale(d.date) as number)
    .y((d) => yScale(d.value) as number);

  // x축 생성
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(7).tickFormat(d3.timeFormat('%m-%d'))) // 일자 형식으로 포맷팅);
    .style('font-size', '15px')
    .style('color', 'white');

  // y축 생성
  svg.append('g').call(d3.axisLeft(yScale)).style('font-size', '15px').style('color', 'white');

  svg
    .append('path')
    .datum(realData)
    .attr('fill', 'none')
    .attr('stroke', COLOR.GREEN)
    .attr('stroke-width', 3)
    // .attr('d', line.curve(d3.curveBasis));
    .attr('d', line);
}

export default LineChart;
