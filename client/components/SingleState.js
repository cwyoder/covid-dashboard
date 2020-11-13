import React from 'react';
import axios from 'axios';
import { stateHash } from '../constants';

import StateBarChart from './StateBarChart';


export default class SingleState extends React.Component {
  constructor(){
    super();
    this.state = {
      data: []
    }
  }

  async componentDidMount(){
    const stateId = this.props.match.params.stateId.toLowerCase().slice(1);
    console.log('stateID', stateId);
    const { data } = await axios.get(`https://api.covidtracking.com/v1/states/${stateId}/daily.json`);
    this.setState({data});
  }

  render(){
    const { data } = this.state;
    const stateCode = this.props.match.params.stateId.slice(1);
    const stateName = stateHash[stateCode];
    return (
      <div>
        <h1>{stateName}</h1>
        <h2>cases</h2>
        <StateBarChart data={data} size={[800,400]} objKey='positiveIncrease' color={'#C70039'}/>
        <h2>deaths</h2>
        <StateBarChart data={data} size={[800,400]} objKey='deathIncrease' color={'#363636'}/>
      </div>
    )
  }
}
