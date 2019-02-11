import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { popupCenter } from './utils'
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
    console.log('innerHeight', window.innerHeight)
    console.log('innerWidth', window.innerWidth)
    console.log('screen', window.screen)

    const { provider, socket } = this.props
    const width = 600, height = 600
    const left = (window.screen.width / 2) - width
    const top = (window.screen.height / 2) - height
    const url = `${API_URL}/${provider}?socketId=${socket.id}`

    return popupCenter(url, 600, 600)

    // return window.open(url, '',       
    //   `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    //   scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    //   height=${height}, top=${top}, left=${left}`
    // )
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
