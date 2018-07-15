import React, { Component } from 'react'
import io from 'socket.io-client'
import FontAwesome from 'react-fontawesome'
import Footer from './Footer'
import './App.css'
const API_URL = 'http://127.0.0.1:8080'
const socket = io(API_URL)

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      user: {},
      disabled: ''
    }
    this.popup = null  
  }

  componentDidMount() {
    
    socket.on('user', user => {
      this.popup.close()
      this.setState({user})
    })
  }

  componentWillUnmount() {
    socket.disconnect()
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: ''})
      }
    }, 1000)
  }

  openPopup() {
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    
    const url = `${API_URL}/twitter?socketId=${socket.id}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  startAuth(e) {
    e.preventDefault()
    if (!this.state.disabled) {  
      this.popup = this.openPopup()  
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }
  }

  closeCard() {
    this.setState({user: {}})
  }

  render() {
    const { name, photo} = this.state.user
    const { disabled } = this.state
  
    return (
      <div className={'container'}>
        {name 
          ? <div className={'card'}>              
              <img src={photo} alt={name} />
              <FontAwesome
                name={'times-circle'}
                className={'close'}
                onClick={this.closeCard.bind(this)}
              />
              <h4>{`@${name}`}</h4>
            </div>
          : <div className={'button'}>
              <button 
                onClick={this.startAuth.bind(this)} 
                className={`twitter ${disabled}`}
              >
                <FontAwesome
                  name={'twitter'}
                />
              </button>
            </div>
        }
        <Footer />
      </div>
    )
  }
}