import React from 'react'
import FontAwesome from 'react-fontawesome'

const Footer = () => {
  return (
    <footer>
      <a 
        href='https://github.com/funador/react-auth-client/tree/twitter-auth' 
        title='Github repo'
        className={'github'}
      >
        <FontAwesome
          name={'github'}
        />
      </a>
    </footer>
  )
}

export default Footer