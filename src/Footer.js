import React from 'react'
import FontAwesome from 'react-fontawesome'

export default () => (
  <footer>
    <a 
      href='https://medium.com/p/862d59583105' 
      title='Medium Article'
      className='small-button medium'
    >
      <FontAwesome
        name='medium'
      />
    </a>
    <a 
      href='https://github.com/funador/react-auth-client' 
      title='Github repo'
      className='small-button github'
    >
      <FontAwesome
        name='github'
      />
    </a>
  </footer>
)

