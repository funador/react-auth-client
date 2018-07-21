import React from 'react'
import FontAwesome from 'react-fontawesome'

const Footer = () => {
  return (
    <footer>
      <a 
        href='https://medium.com/p/2f6b7b0ee9d2/' 
        title='Medium Article'
        className={'small-button medium'}
      >
        <FontAwesome
          name={'medium'}
        />
      </a>
      <a 
        href='https://github.com/funador/react-auth-client' 
        title='Github repo'
        className={'small-button github'}
      >
        <FontAwesome
          name={'github'}
        />
      </a>
    </footer>
  )
}

export default Footer