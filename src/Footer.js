import React from 'react'
import FontAwesome from 'react-fontawesome'

const Footer = () => {
  return (
    <footer>
      <a 
        href='https://github.com/funador/react-auth-twitter' 
        title='Github repo'
        className={'small-button'}
      >
        <FontAwesome
          name={'github'}
        />
      </a>
    </footer>
  )
}

export default Footer