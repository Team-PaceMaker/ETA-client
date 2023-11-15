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

const LineChart = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    drawChart(divRef);
  }, [divRef]);

  return <div id='line-container' ref={divRef}></div>;
};

function drawChart(divRef: React.RefObject<HTMLDivElement>) {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 700 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  d3.select('#line-container').select('svg').remove();

  const svg = d3
    .select(divRef.current)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

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

  function interpolateLine(d: DataPoint[]) {
    return function (t: number) {
      const tIndex = Math.floor(t * (d.length - 1));
      const tData = d.slice(0, tIndex + 1);
      return line(tData) as string;
    };
  }

  // x축 생성
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(7).tickFormat(d3.timeFormat('%m-%d'))) // 일자 형식으로 포맷팅);
    .style('font-size', '15px')
    .style('color', 'white');

  // y축 생성
  svg.append('g').call(d3.axisLeft(yScale)).style('font-size', '15px').style('color', 'white');

  // 그래프 그리기
  svg
    .append('path')
    .datum(realData)
    .attr('fill', 'none')
    .attr('stroke', COLOR.GREEN)
    .attr('stroke-width', 5)
    // .attr('d', line)
    .style('opacity', 0) // 초기에는 투명도를 0으로 설정
    .transition()
    .ease(d3.easeCubicOut)
    .style('opacity', 1) // 애니메이션을 통해 투명도를 1로 증가시킴
    .duration(500) // 애니메이션 지속 시간 (2초)
    .attrTween('d', interpolateLine); // 애니메이션 트위닝 함수 적용

  // 그림자 생성
  const area = d3
    .area<DataPoint>()
    .x((d) => xScale(d.date) as number)
    .y0(height)
    .y1((d) => yScale(d.value) as number);

  // 그림자 영역 추가
  svg
    .append('path')
    .datum(realData)
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
    .data(realData)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d.date) as number)
    .attr('cy', (d) => yScale(d.value) as number)
    .attr('r', 5)
    .attr('fill', 'white')
    .style('opacity', 0)
    .transition()
    .duration(1000)
    .ease(d3.easeCubicOut)
    .style('opacity', 1);
}

export default LineChart;
