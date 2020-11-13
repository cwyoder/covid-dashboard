import React from 'react';
import { scaleLinear, scaleBand, max, select, range, line, axisBottom, axisLeft } from 'd3';
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

    const margin = {top: 20, right: 30, bottom: 30, left: 40};

    const dataMax = max(dataToChart);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .rangeRound([margin.top, this.props.size[1] - margin.bottom])

    const yScaleAvg = scaleLinear()
      .domain([0, dataMax])
      .rangeRound([this.props.size[1] - margin.bottom, margin.top])

    const xScale = scaleBand()
      .domain(range(this.props.data.length))
      .range([margin.left, this.props.size[0] - margin.right])

    const avgLine = line()
      .x((d, idx) => xScale(idx) + (xScale.bandwidth() / 2))
      .y(d => yScaleAvg(d))

    select(node).append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(axisLeft(yScaleAvg).ticks(null, "s")
        .tickSize(-this.props.size[0])
        .tickFormat(""))
      .call(g => g.select(".domain").remove())

    select(node).append('g')
        .attr("fill", "steelblue")
        .attr("fill-opacity", 0.6)
      .selectAll("rect")
      .data(dataToChart)
      .join("rect")
        .attr('x', (d,i) => xScale(i))
        .attr('y', d => yScaleAvg(d) )
        .attr('height', d => yScale(d) - margin.top)
        .attr('width', xScale.bandwidth());

    select(node).append("path")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-miterlimit", 1)
      .attr("stroke-width", 3)
      .attr("d", avgLine(averages));

    select(node).append("g")
      .attr("class", "y axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(axisLeft(yScaleAvg).ticks(null, "s"))
      .call(g => g.select(".domain").remove());

  }

  render() {
    return <svg ref={node => this.node = node} width={this.props.size[0]} height={this.props.size[1]}></svg>
  }
}
