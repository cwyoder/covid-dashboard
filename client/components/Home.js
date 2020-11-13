import React from 'react';
import BarChart from './BarChart';
import axios from 'axios';
import { dateConverter } from '../utils';
import { dateOptions } from '../constants';

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
        <h1>United States</h1>
        <div className='section-container'>
          {
            latestData.date ? <div className='daily daily__cases'>
              <p className='dateline'>Latest data: {latestDate.toLocaleDateString("en-US", dateOptions)}</p>
              <h2>+ {latestData.positiveIncrease.toLocaleString()} cases</h2>
              <p className='total'>{latestData.positive.toLocaleString()} total cases</p>
            </div> : ''
          }
          <BarChart data={data} size={[800,400]} objKey='positiveIncrease' color={'#C70039'}/>
        </div>
        <div className='section-container'>
          {
            latestData.date ? <div className='daily daily__cases'>
              <h2>+ {latestData.deathIncrease.toLocaleString()} deaths</h2>
              <p className='total'>{latestData.death.toLocaleString()} total deaths</p>
            </div> : ''
          }
          <BarChart data={data} size={[800,400]} objKey='deathIncrease' color={'#363636'}/>
        </div>
      </div>
    )
  }
}
