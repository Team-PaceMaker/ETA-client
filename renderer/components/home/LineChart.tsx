import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import COLOR from 'constants/colors';

interface IFocusPoint {
  date: Date;
  value: number;
}

const DUMMY_DATA: IFocusPoint[] = [
  { date: new Date('2023-11-11'), value: 0 },
  { date: new Date('2023-11-12'), value: 5 },
  { date: new Date('2023-11-13'), value: 3 },
  { date: new Date('2023-11-14'), value: 4 },
  { date: new Date('2023-11-15'), value: 8 },
  { date: new Date('2023-11-16'), value: 6 },
  { date: new Date('2023-11-17'), value: 3 },
];

const LineChart = () => {
  const [focusStatistic, setFocusStatistic] = useState<IFocusPoint[]>(DUMMY_DATA);

  useEffect(() => {
    drawChart(focusStatistic);
  }, [focusStatistic]);

  return <div id='line-container'></div>;
};

const drawChart = (focusStatistic: IFocusPoint[]) => {
  const margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 700 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  d3.select('#line-container').select('svg').remove();

  const svg = d3
    .select('#line-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // D3.js 스케일 설정
  // const xMin = d3.min(focusStatistic, (d) => d.date) as Date;
  // const xMax = d3.max(focusStatistic, (d) => d.date) as Date;

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(focusStatistic, (d) => d.date) as [Date, Date])
    // .domain([xMin, xMax])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(focusStatistic, (d) => d.value) as number])
    .range([height, 0]);

  // 선 생성
  const line = d3
    .line<IFocusPoint>()
    .x((d) => xScale(d.date) as number)
    .y((d) => yScale(d.value) as number);

  function interpolateLine(d: IFocusPoint[]) {
    return function (t: number) {
      console.log(t, d);
      const tIndex = Math.floor(t * (d.length - 1));
      const tData = d.slice(0, tIndex + 1);
      return line(tData) as string;
    };
  }

  // x축 생성
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(5, d3.timeFormat('%m-%d')).tickPadding(10)) // 일자 형식으로 포맷팅);
    .style('font-size', '15px')
    .style('color', 'white');

  // y축 생성
  svg
    .append('g')
    .call(
      d3
        .axisLeft(yScale)
        .tickFormat((d) => `${d}시간`)
        .tickPadding(10)
    )
    .style('font-size', '15px')
    .style('color', 'white');

  // 그래프 그리기
  svg
    .append('path')
    .datum(focusStatistic)
    .attr('fill', 'none')
    .attr('stroke', COLOR.GREEN)
    .attr('stroke-width', 5)
    // .attr('d', line)
    .style('opacity', 0)
    .transition()
    .ease(d3.easeCubicOut)
    .style('opacity', 1)
    .duration(1000) // 애니메이션 지속 시간
    .attrTween('d', interpolateLine); // 애니메이션 트위닝 함수 적용

  // 그림자 생성
  const area = d3
    .area<IFocusPoint>()
    .x((d) => xScale(d.date) as number)
    .y0(height)
    .y1((d) => yScale(d.value) as number);

  // 그림자 영역 추가
  svg
    .append('path')
    .datum(focusStatistic)
    .attr('class', 'area')
    .attr('d', area)
    .style('fill', 'rgba(105, 241, 118, 0.3)')
    .style('opacity', 0)
    .transition()
    .duration(1000)
    .ease(d3.easeCubicOut)
    .style('opacity', 1);

  // 데이터 점 추가
  svg
    .selectAll('circle')
    .data(focusStatistic)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d.date) as number)
    .attr('cy', (d) => yScale(d.value) as number)
    .attr('r', 5)
    .attr('fill', 'white')
    .on('mouseover', (event, d) => {
      // 마우스 오버 시에 툴팁을 표시
      const tooltip = svg.append('g').attr('class', 'tooltip');

      tooltip
        .append('rect')
        .attr('x', (xScale(d.date) as number) - 30)
        .attr('y', (yScale(d.value) as number) - 40)
        .attr('width', 60)
        .attr('height', 45)
        .attr('fill', 'white')
        .attr('rx', 10) // 둥근 사각형의 가로 반지름
        .attr('ry', 10); // 둥근 사각형의 세로 반지름

      tooltip
        .append('text')
        .attr('x', xScale(d.date) as number)
        .attr('y', (yScale(d.value) as number) - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', 16)
        .attr('fill', 'black')
        .text(`${d.value} ETA`);
    })

    .on('mouseout', () => {
      svg.select('.tooltip').remove();
    })
    .style('opacity', 0)
    .transition()
    .duration(1000)
    .ease(d3.easeCubicOut)
    .style('opacity', 1);
};

export default LineChart;
