import React from 'react';
import { scaleLinear, scaleBand, max, select, range, line } from 'd3';
import { intervalAverages } from '../utils';

export default class BarChart extends React.Component {
  constructor(props){
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount() {
    this.createBarChart();
  }

  componentDidUpdate() {
    this.createBarChart();
  }

  createBarChart() {
    const node = this.node
    const dataToChart = this.props.data.map(datum => datum[this.props.objKey])
      .reverse();
    const averages = intervalAverages(dataToChart, 7);

    // console.log('data:', dataToChart)
    // console.log('averages:', averages)

    const dataMax = max(dataToChart);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]])

    const yScaleAvg = scaleLinear()
      .domain([0, dataMax])
      .range([this.props.size[1], 0])

    const xScale = scaleBand()
      .domain(range(this.props.data.length))
      .rangeRound([0, this.props.size[0]])

    const avgLine = line()
      .x((d, idx) => xScale(idx) + (xScale.bandwidth() / 2))
      .y(d => yScaleAvg(d))

    select(node).append('g')
        .attr("fill", "steelblue")
        .attr("fill-opacity", 0.6)
      .selectAll("rect")
      .data(dataToChart)
      .join("rect")
        .attr('x', (d,i) => xScale(i))
        .attr('y', d => this.props.size[1] - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', xScale.bandwidth());

    select(node).append("path")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-miterlimit", 1)
      .attr("stroke-width", 3)
      .attr("d", avgLine(averages));
  }

  render() {
    return <svg ref={node => this.node = node} width={this.props.size[0]} height={this.props.size[1]}></svg>
  }
}
