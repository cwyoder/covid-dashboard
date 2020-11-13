import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component{
  constructor() {
    super();
  }

  render(){
    return (
      <nav id='navbar'>
        <div className='home-logo'>
          <Link className="navbar-link" to="/">
            <p>COVID Dashboard</p>
          </Link>
        </div>
        <div className='nav-items'>
          <ul>
            <li>
              <Link className="navbar-link" to="/">U.S. total</Link>
            </li>
            <li>
              <Link className="navbar-link" to="/states">By State</Link>
            </li>
            <li>
              <Link className="navbar-link" to="/hospital">Hospital statistics</Link>
            </li>
            <li>
              <Link className="navbar-link" to="/about">About</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
