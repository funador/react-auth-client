import React, { useState } from 'react'
import io from 'socket.io-client'
import FontAwesome from 'react-fontawesome'
import { API_URL } from './config'
const socket = io(API_URL, {
  autoConnect: false
})

export default function OAuth(props) {
	
  const [user, setUser] = useState({})
  const [disabled, setDisabled] = useState('')

  const checkPopup = (popup) => {
    const check = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        setDisabled('')
      }
    }, 1000)
  }

  const openBlankPopup = () => {
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const newWindow = window.open("about:blank", '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`)

    return newWindow
  }

const connectToSocketAndSetPopupLocation = (popup) => {

    const { provider } = props
    socket.connect()
    // wait for socket to be connected to be sure that socket.id is available
    socket.on('connect', () => {
      // wait for popup to be opened because sometimes it won't be in time
      const checkPopup = window.setInterval(() => {
        if (popup && !popup.closed) {
          console.log(popup.closed)
          // we need to do it this way because when we would try to open a new window inside this callback
          // it would be blocked by popup blocker. As workaround we change the location of the blank popup here
          const url = `${API_URL}/${provider}?socketId=${socket.id}`
          popup.location.href = url
          clearInterval(checkPopup)
        } 
      }, 50)
    })

  }

  const startAuth = () => {

    const { provider } = props
    let popup = null
    
    if (!disabled) {

      popup = openBlankPopup()
      connectToSocketAndSetPopupLocation(popup)
      checkPopup(popup)
      setDisabled('disabled')

      socket.on(provider, user => {
        popup.close()
        setUser(user)
        socket.close()
      })
    }

  }

  const closeCard = () => {
    setUser({})
  }


  const { name, photo} = user
  const { provider } = props
  const atSymbol = provider === 'twitter' ? '@' : ''

  return (
    <div>
      {name
        ? <div className='card'> 
            <img src={photo} alt={name} />
            <FontAwesome
              name='times-circle'
              className='close'
              onClick={closeCard}
            />
            <h4>{`${atSymbol}${name}`}</h4>
          </div>
        : <div className='button-wrapper fadein-fast'>
            <button 
              onClick={startAuth} 
              className={`${provider} ${disabled} button`}
            >
              <FontAwesome
                name={provider}
              />
            </button>
          </div>
      }
    </div>
  )
}
