import React from 'react'

export default () =>
  <div className='loading-wrapper fadein-slow'>
    <h4>Heroku is spinning up, one moment please...</h4>
    <div className='loading'>
      <div className='background'>
        <i className="icon-heroku"></i>
      </div>
      <div className='spinner' />
    </div>
  </div>