import React from 'react';
import axios from 'axios';
import { stateHash } from '../constants';
import { dateConverter } from '../utils';
import { dateOptions } from '../constants';

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
    const { data } = await axios.get(`https://api.covidtracking.com/v1/states/${stateId}/daily.json`);
    this.setState({data});
  }

  render(){
    const { data } = this.state;
    const stateCode = this.props.match.params.stateId.slice(1);
    const stateName = stateHash[stateCode];
    let latestData;
    let latestDate;
    if (data.length > 0) {
      latestData = data[0];
      latestDate = dateConverter(latestData.date);
    } else {
      latestData = {};
      latestDate = null;
    }
    return (
      <div>
        <h1>{stateName}</h1>
        <div className='section-container'>
          {
            latestData.date ? <div className='daily daily__cases'>
              <p className='dateline'>Latest data: {latestDate.toLocaleDateString("en-US", dateOptions)}</p>
              <h2>+ {latestData.positiveIncrease.toLocaleString()} cases</h2>
              <p className='total'>{latestData.positive.toLocaleString()} total cases</p>
            </div> : ''
          }
          <StateBarChart data={data} size={[800,400]} objKey='positiveIncrease' color={'#C70039'}/>
        </div>
        <div className='section-container'>
          {
            latestData.date ? <div className='daily daily__cases'>
              <h2>+ {latestData.deathIncrease.toLocaleString()} deaths</h2>
              <p className='total'>{latestData.death.toLocaleString()} total deaths</p>
            </div> : ''
          }
          <StateBarChart data={data} size={[800,400]} objKey='deathIncrease' color={'#363636'}/>
        </div>
      </div>
    )
  }
}
