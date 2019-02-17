import React from 'react'
import Notifications from 'react-notify-toast'

export default props =>
  <header>
    <Notifications />
    {props.showLogout
      ? ( <>
            <div>Welcome {props.email}</div>
            <button onClick={props.logout}>log out</button>
            <button onClick={props.deleteAccount}>close account</button>
          </>
        )
      : ''
    }
  </header>