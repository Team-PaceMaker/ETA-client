import React, { useEffect } from 'react';
import * as d3 from 'd3';
import COLOR from '@constants/colors';

interface IData {
  label: string;
  value: number;
}

const PieChart = () => {
  const data = [
    { label: '집중', value: 70 },
    { label: '산만', value: 30 },
  ];

  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };

  const outerRadius = 150;
  const innerRadius = 0;

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  function drawChart() {
    // Remove the old svg
    d3.select('#pie-container').select('svg').remove();

    // Create new svg
    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal<string, string>()
      .domain(data.map((d) => d.label)) // 데이터 키를 domain으로 설정
      .range([COLOR.GREEN, COLOR.LIGHT_GREEN]);

    const pie = d3.pie<IData>().value((d) => d.value);
    const data_ready = pie(data);

    const arc = svg.selectAll().data(data_ready).enter();

    const arcGenerator = d3
      .arc<d3.PieArcDatum<IData>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    // Append arcs
    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (d) => color(d.data.label))
      .style('stroke', 'black')
      .style('stroke-width', 0)
      .transition()
      .duration(1500)
      .attrTween('d', function (d) {
        const start = { startAngle: 0, endAngle: 0 };
        const interpolate = d3.interpolate(start, d);
        return function (t) {
          return arcGenerator(interpolate(t));
        };
      });

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.label)
      .style('font-size', 24)
      .style('font-weight', 'bold')
      .style('opacity', 0)
      .transition()
      .duration(2000)
      .ease(d3.easeCubicOut)
      .style('opacity', 1)
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }

  useEffect(() => {
    drawChart();
  }, [data]);

  return <div id='pie-container' />;
};

export default PieChart;