import React from 'react';

const About = (props) => {
  return (
    <div>
      <h1>About</h1>
      <div className='about'>
        <p>Hey, I'm learning d3! Sort of!</p>
        <p>This project was originally created as part of my FullStack Academy cohort's "Stackathon."</p>
        <p>Data for the COVID Dashboard is provided by The Atlantic's COVID Tracking Project API, <a href="https://covidtracking.com/about-data/license" target="_blank">published under a Creative Commons CC BY 4.0 license.</a></p>
        <p>API example: Complete US data is at <a href="https://api.covidtracking.com/v1/us/daily.json" target="_blank">https://api.covidtracking.com/v1/us/daily.json</a></p>
      </div>
    </div>
  )
}

export default About;
