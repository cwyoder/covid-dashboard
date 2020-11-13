import React from 'react';
import BarChart from './BarChart';
import axios from 'axios';
import { intervalAverages } from '../utils';

export default class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      data: []
    }
  }

  async componentDidMount(){
    const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');
    this.setState({data});
  }

  render(){
    const { data } = this.state;
    return (
      <div>
        <h1>Home</h1>
        <h2>cases</h2>
        <BarChart data={data} size={[800,400]} objKey='positiveIncrease' color={'#C70039'}/>
        <h2>deaths</h2>
        <BarChart data={data} size={[800,400]} objKey='deathIncrease' color={'#363636'}/>
      </div>
    )
  }
}
