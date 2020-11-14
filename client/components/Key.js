import React from 'react';

export const Key = ({ statistic }) => {
  return (
    <div className={`key`}>
      <p className="keylabel">KEY:</p>
      <div className="keyportion">
        <span className={`area area__${statistic}`}></span>
        <p>{`Daily ${statistic} reported`}</p>
      </div>
      <div className="keyportion">
        <span className={`line line__${statistic}`}></span>
        <p>7-day average</p>
      </div>
    </div>
  )
}
