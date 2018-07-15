import React from 'react'
import FontAwesome from 'react-fontawesome'

export default () => {
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