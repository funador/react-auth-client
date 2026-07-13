import React from 'react'

const Loading = () =>
  <div className='loading-wrapper fadein-slow'>
    <h4>Warming up the server, one moment please...</h4>
    <div className='loading'>
      <svg className='vercel-glow' viewBox='0 0 76 65' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M37.5274 0L75.0548 65H0L37.5274 0Z' />
      </svg>
    </div>
  </div>

export default Loading
