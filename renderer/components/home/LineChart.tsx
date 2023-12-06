import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import COLOR from 'constants/colors';
import { getUserGraph } from 'apis/user';
import { IFocusPoint } from 'types/user';

const INITIAL_DATA = [
  { date: new Date('2000-01-01'), attentionTime: 0 },
  { date: new Date('2000-01-02'), attentionTime: 0 },
  { date: new Date('2000-01-03'), attentionTime: 0 },
  { date: new Date('2000-01-04'), attentionTime: 0 },
  { date: new Date('2000-01-05'), attentionTime: 0 },
  { date: new Date('2000-01-06'), attentionTime: 0 },
  { date: new Date('2000-01-07'), attentionTime: 0 },
];

const LineChart = ({ type }: { type: string }) => {
  const [focusStatistic, setFocusStatistic] = useState<IFocusPoint[]>(INITIAL_DATA);

  const handleGetGraph = (week: number) => {
    getUserGraph(week).then((res: IFocusPoint[]) => {
      setFocusStatistic(
        res.map((data) => ({
          ...data,
          date: new Date(data.date),
          attentionTime: getHour(data.attentionTime),
        }))
      );
    });
  };

  useEffect(() => {
    if (focusStatistic.length > 0) drawChart(focusStatistic);
  }, [focusStatistic]);

  useEffect(() => {
    getUserGraph(1).then((res: IFocusPoint[]) => {
      setFocusStatistic(
        res.map((data) => ({
          ...data,
          date: new Date(data.date),
          attentionTime: getHour(data.attentionTime),
        }))
      );
    });
  }, []);

  return (
    <div id='line-container'>
      {type === 'mypage' && (
        <>
          <button onClick={() => handleGetGraph(1)}>1주일전</button>
          <button onClick={() => handleGetGraph(2)}>2주일전</button>
          <button onClick={() => handleGetGraph(3)}>3주일전</button>
        </>
      )}
    </div>
  );
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
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(focusStatistic, (d) => d.date) as [Date, Date])
    .range([0, width]);

  const yMaxValue = Math.ceil(d3.max(focusStatistic, (d) => d.attentionTime) as number);
  const yScale = d3.scaleLinear().domain([0, yMaxValue]).range([height, 0]);

  // 선 생성
  const line = d3
    .line<IFocusPoint>()
    .x((d) => xScale(d.date) as number)
    .y((d) => yScale(d.attentionTime) as number);

  function interpolateLine(d: IFocusPoint[]) {
    return function (t: number) {
      const tIndex = Math.floor(t * (d.length - 1));
      const tData = d.slice(0, tIndex + 1);
      return line(tData) as string;
    };
  }

  // 날짜 데이터 배열
  const dateArray = focusStatistic.map((data) => data.date);

  // x축 생성
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(
      d3
        .axisBottom(xScale)
        .tickValues(dateArray)
        .tickSizeOuter(0)
        .tickFormat(d3.timeFormat('%m-%d'))
        .tickPadding(10)
    )
    .style('font-size', '15px')
    .style('color', 'white');

  // y축 생성
  svg
    .append('g')
    .call(
      d3
        .axisLeft(yScale)
        .ticks(yMaxValue)
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
    .y1((d) => yScale(d.attentionTime) as number);

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
    .attr('cy', (d) => yScale(d.attentionTime) as number)
    .attr('r', 5)
    .attr('fill', 'white')
    .on('mouseover', (event, d) => {
      // 마우스 오버 시에 툴팁을 표시
      const tooltip = svg.append('g').attr('class', 'tooltip');

      tooltip
        .append('rect')
        .attr('x', (xScale(d.date) as number) - 30)
        .attr('y', (yScale(d.attentionTime) as number) - 40)
        .attr('width', 60)
        .attr('height', 45)
        .attr('fill', 'white')
        .attr('rx', 10)
        .attr('ry', 10);

      tooltip
        .append('text')
        .attr('x', xScale(d.date) as number)
        .attr('y', (yScale(d.attentionTime) as number) - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', 16)
        .attr('fill', 'black')
        .text(`${d.attentionTime} ETA`);
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

const getHour = (second: number) => {
  const UNIT_HOUR = 60 * 60;
  const hour = second / UNIT_HOUR;
  return Number(hour.toFixed(2));
};

export default LineChart;
