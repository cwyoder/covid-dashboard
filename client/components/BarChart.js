import React from 'react';
import { scaleLinear, scaleBand, max, select, range } from 'd3';
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

    console.log('data:', dataToChart)
    console.log('averages:', averages)

    const dataMax = max(dataToChart)
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]])

    const xScale = scaleBand()
      .domain(range(this.props.data.length))
      .rangeRound([0, this.props.size[0]])

    select(node)
      .selectAll('rect')
      .data(dataToChart)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(dataToChart)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(dataToChart)
      .attr('x', (d,i) => xScale(i))
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .style('fill', '#fe9922')
  }

  render() {
    return <svg ref={node => this.node = node} width={this.props.size[0]} height={this.props.size[1]}></svg>
  }
}
