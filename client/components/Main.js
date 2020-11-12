import React from "react";
import { HashRouter as Router, Link, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

import Home from './Home';
import States from './States';
import SingleState from './SingleState';
import Hospital from './Hospital';
import About from './About';

export default class Main extends React.Component{
  constructor(){
    super();
  }
  render(){
    return (
      <Router>
        <Navbar/>
        <main>
            <Route path='/' exact component={ Home } />
            <Route path='/states' exact component={ States } />
            <Route path='/states/:stateId' exact component={ SingleState } />
            <Route path='/hospital' component={ Hospital } />
            <Route path='/about' component={ About } />
        </main>
        <Footer/>
      </Router>
    )
  }
}
