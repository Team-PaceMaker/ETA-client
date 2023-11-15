import React, { useEffect } from 'react';
import * as d3 from 'd3';

interface IData {
  label: string;
  value: number;
}

interface IFocusData {
  [key: string]: number;
}

const PieChart = () => {
  const data = [
    { label: 'Apples', value: 10 },
    { label: 'Oranges', value: 20 },
    { label: 'peach', value: 40 },
    { label: 'Grapes', value: 30 },
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

  const colorScale = d3.scaleSequential().interpolator(d3.interpolateCool).domain([0, data.length]);

  // const data2: IFocusData = { focus: 50, 'non-focus': 50 };
  // var color = d3.scaleOrdinal().domain(Object.keys(data2)).range(['#98abc5', '#8a89a6']);

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

    const arcGenerator = d3
      .arc<d3.PieArcDatum<IData>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie<IData>()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg.selectAll().data(pieGenerator(data)).enter();

    // Append arcs
    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i + 1))
      .style('stroke', 'black')
      .style('stroke-width', 5);

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.label)
      .style('fill', (_, i) => colorScale(data.length - i))
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
