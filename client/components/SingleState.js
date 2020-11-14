import React from 'react';
import axios from 'axios';
import { stateHash } from '../constants';
import { dateConverter } from '../utils';
import { dateOptions } from '../constants';
import { Link } from 'react-router-dom';
import { Key } from './Key';

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
        <div className='back'>
          <Link to="/states">❮❮ Back to states</Link>
        </div>
        <h1>COVID in {stateName}</h1>
        <div className='section-container'>
          {
            latestData.date ? <div className='daily daily__cases'>
              <p className='dateline'>Latest data: {latestDate.toLocaleDateString("en-US", dateOptions)}</p>
              <h2>+ {latestData.positiveIncrease.toLocaleString()} cases reported</h2>
              <p className='total'>{latestData.positive.toLocaleString()} total cases reported</p>
            </div> : ''
          }
          <div className='chart-container'>
            <StateBarChart data={data} size={[1080,500]} objKey='positiveIncrease' color={'#C70039'}/>
            <Key statistic="cases" />
          </div>
        </div>
        <div className='section-container'>
          {
            latestData.date ? <div className='daily daily__cases'>
              <h2>+ {latestData.deathIncrease.toLocaleString()} deaths reported</h2>
              <p className='total'>{latestData.death.toLocaleString()} total deaths reported</p>
            </div> : ''
          }
          <div className='chart-container'>
            <StateBarChart data={data} size={[1080,500]} objKey='deathIncrease' color={'#363636'}/>
            <Key statistic="deaths" />
          </div>
        </div>
      </div>
    )
  }
}
