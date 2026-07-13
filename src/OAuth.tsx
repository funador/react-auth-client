import React, { Component } from 'react'
import { Socket } from 'socket.io-client'
import FontAwesome from 'react-fontawesome'
import { API_URL } from './config'

interface OAuthProps {
  provider: string
  socket: Socket
}

interface OAuthUser {
  name?: string
  photo?: string
}

interface OAuthState {
  user: OAuthUser
  disabled: string
}

export default class OAuth extends Component<OAuthProps, OAuthState> {

  state: OAuthState = {
    user: {},
    disabled: ''
  }

  popup: Window | null = null

  componentDidMount() {
    const { socket, provider } = this.props

    socket.on(provider, (user: OAuthUser) => {
      this.popup?.close()
      this.setState({ user })
    })
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed) {
        clearInterval(check)
        this.setState({ disabled: '' })
      }
    }, 1000)
  }

  openPopup() {
    const { provider, socket } = this.props
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

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup()
      this.checkPopup()
      this.setState({ disabled: 'disabled' })
    }
  }

  closeCard = () => {
    this.setState({ user: {} })
  }

  render() {
    const { name, photo } = this.state.user
    const { provider } = this.props
    const { disabled } = this.state
    const atSymbol = provider === 'twitter' ? '@' : ''

    return (
      <div>
        {name
          ? <div className='card'>
              <img src={photo} alt={name} />
              <FontAwesome
                name='times-circle'
                className='close'
                onClick={this.closeCard}
              />
              <h4>{`${atSymbol}${name}`}</h4>
            </div>
          : <div className='button-wrapper fadein-fast'>
              <button
                onClick={this.startAuth}
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
}
