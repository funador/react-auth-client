import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { notify } from 'react-notify-toast'
import { launchPopup } from './utils'
import { API_URL } from './config'

export default class OAuth extends Component {
  
  state = {
    disabled: ''
  }  

  componentDidMount() {
    const { socket, provider } = this.props

    socket.on(provider, authToken => {  
      this.popup.close()
      this.props.addAllAuthData(authToken)
    })

    socket.on(`${provider}-error`, msg => {
      this.popup.close()
      notify.show(msg)
    })
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: ''})
      }
    }, 1000)
  }

  openPopup() {
    const { provider, socket } = this.props
    const url = `${API_URL}/${provider}?socketId=${socket.id}`

    return launchPopup(url, 600, 600)
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup()  
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }
  }

  render() {
    let name, photo
    if (this.props.authData) {
      name = this.props.authData.name
      photo = this.props.authData.photo
    }
    
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
                onClick={() => this.props.closeCard(provider)}
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

OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
}
