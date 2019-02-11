import React, { Component } from 'react'
import io from 'socket.io-client'
import jwtDecode from 'jwt-decode'
import OAuth from './OAuth'
import Loading from './Loading'
import Footer from './Footer'
import { API_URL } from './config'
import './App.css'
const socket = io(API_URL)
const providers = ['twitter', 'google', 'facebook', 'github']

export default class App extends Component {
  
  state = {
    loading: true,
    authData: {}
  }

  wakeUp = () => 
    fetch(`${API_URL}/wake-up`)
      .then(res => {
        if (res.ok) {
          return this.setState({ loading: false })  
        }
      })
  
  refreshToken = authToken => 
    fetch(`${API_URL}/refresh`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(authToken => {
        localStorage.setItem('authToken', authToken)
        const authData = jwtDecode(authToken).user
        this.setState({ authData })
      })

  componentDidMount() {
    this.wakeUp()
      .then(() => {
        const authToken = localStorage.getItem('authToken')
        
        if (authToken) {
          this.refreshToken(authToken)
        }
      })
  }

  addAllAuthData = authToken => {
    localStorage.setItem('authToken', authToken)
    const authData = jwtDecode(authToken).user
    this.setState({ authData })
  }

  closeCard = provider => {
    const authToken = localStorage.getItem('authToken')

    fetch(`${API_URL}/unlink/${provider}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(() => {
        this.setState({
          authData: {
            ...this.state.authData,
            [provider]: {}
          }
        })
      })
  }

  logout = () => {
    localStorage.removeItem('authToken')
    this.setState({ authData: {} })
  }

  render() {
    const buttons = (providers, socket) => 
      providers.map(provider => 
        <OAuth 
          provider={provider}
          key={provider}
          socket={socket}
          authData={this.state.authData[provider]}
          addAllAuthData={this.addAllAuthData}
          closeCard={this.closeCard}
        />
      )
    
    return (
      <div className='wrapper'>
        <div className='container'>
          {this.state.loading
            ? <Loading />
            : buttons(providers, socket)
          }
        </div>
        <button onClick={this.logout}>log out</button>
        <Footer />
      </div>
    )
  }
}