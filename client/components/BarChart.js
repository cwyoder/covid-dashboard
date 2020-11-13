import React from 'react';
import { scaleLinear, scaleBand, scaleTime, max, select, range, timeMonth, line, axisBottom, axisLeft } from 'd3';
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
    const dataCopy = this.props.data.slice(0).reverse();
    const averages = intervalAverages(dataCopy, 7, this.props.objKey);

    // console.log(averages);
    // console.log(dataCopy);

    const margin = {top: 20, right: 30, bottom: 30, left: 40};

    const wbar = this.props.size && dataCopy.length > 0 ? (this.props.size[0] - margin.right - margin.left) / dataCopy.length : 0;

    const dataMax = max(dataCopy.map(datum => datum[this.props.objKey]));
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .rangeRound([margin.top, this.props.size[1] - margin.bottom])

    const yScaleAvg = scaleLinear()
      .domain([0, dataMax])
      .rangeRound([this.props.size[1] - margin.bottom, margin.top])

    const xDomain = this.props.data.length > 0 ? [Date.parse(dataCopy[0].dateChecked), Date.parse(dataCopy[dataCopy.length - 1].dateChecked)] : [0,1]

    const xScale = scaleTime()
      .domain(xDomain)
      .range([margin.left, this.props.size[0] - margin.right])

    const avgLine = line()
      .x(d => xScale(Date.parse(d.dateChecked)) + (wbar / 2))
      .y(d => yScaleAvg(d.average))

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
      .data(dataCopy)
      .join("rect")
        .attr('x', (d,i) => xScale(Date.parse(d.dateChecked)))
        .attr('y', d => yScaleAvg(d[this.props.objKey]) )
        .attr('height', d => {
          // console.log(d[this.props.objKey]);
          return yScale(d[this.props.objKey]) - margin.top
        })
        .attr('width', wbar);

    select(node).append("path")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-miterlimit", 1)
      .attr("stroke-width", 3)
      .attr("d", avgLine(averages));

    select(node).append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(axisLeft(yScaleAvg).ticks(null, "s"))
      .call(g => g.select(".domain").remove());

    select(node).append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${this.props.size[1] - margin.bottom})`)
      .call(axisBottom(xScale).ticks(timeMonth))
      .call(g => g.select(".domain").remove());

  }

  render() {
    return <svg ref={node => this.node = node} width={this.props.size[0]} height={this.props.size[1]}></svg>
  }
}
