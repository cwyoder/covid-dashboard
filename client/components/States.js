import React from 'react';
import axios from 'axios';
import { stateHash } from '../constants';
import { Link } from 'react-router-dom';


export default class States extends React.Component {
  constructor(){
    super();
    this.state = {
      data: []
    }
  }

  async componentDidMount(){
    const { data } = await axios.get('https://api.covidtracking.com/v1/states/current.json');
    this.setState({data});
  }

  render(){
    const { data } = this.state;
    return (
      <div>
        <h1>State selector</h1>
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Daily increase in positive cases</th>
              <th>Total positive cases</th>
              <th>Data updated</th>
            </tr>
          </thead>
          <tbody>
            { data.filter(st => {
              return (st.state !== 'AS' && st.state !== 'GU' && st.state !== 'MP' && st.state !== 'PR' && st.state !== 'VI')
            }).map(st => {
              return (
                <tr key={`table_${st.state}`}>
                  <td>
                    <Link to={`/states/:${st.state}`} >
                      {stateHash[st.state]}
                    </Link>
                  </td>
                  <td>{st.positiveIncrease}</td>
                  <td>{st.positive}</td>
                  <td className='ital-cell'>{st.lastUpdateEt}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
