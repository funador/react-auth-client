import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-fontawesome'
import { API_URL } from './config'

export default function OAuth(props) {

  const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState('');
  let popup = null;

  useEffect(() => {
    const { socket, provider } = props

    socket.on(provider, user => {  
      popup.close()
      setUser(user)
    })
  }, [popup]);

  const checkPopup = () => {
    const check = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        setDisabled('')
      }
    }, 1000)
  }

  const openPopup = () => {
    const { provider, socket } = props
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}/${provider}?socketId=${socket.id}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  const startAuth = () => {
    if (!disabled) {
      popup = openPopup()
      checkPopup()
      setDisabled('disabled')
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
