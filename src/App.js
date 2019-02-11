import React, { Component } from 'react'
import io from 'socket.io-client'
import jwtDecode from 'jwt-decode'
import OAuth from './OAuth'
import Loading from './Loading'
import Footer from './Footer'
import api from './api'
import { API_URL } from './config'
import './App.css'
const socket = io(API_URL)
const providers = ['twitter', 'google', 'facebook', 'github']

export default class App extends Component {
  
  state = {
    loading: true,
    authData: {}
  }
  
  refresh = () => {
    api.refreshToken()
      .then(authToken => {
        localStorage.setItem('authToken', authToken)
        const authData = jwtDecode(authToken).user
        this.setState({ authData })
      })
      .catch(err => {
        console.log(err)
        // pop up to say something is wrong
        localStorage.removeItem('authToken')
      })
    }

  componentDidMount() {
    api.wakeUp()
      .then(() => {
        this.setState({ loading: false })  
        const authToken = localStorage.getItem('authToken')
        
        if (authToken) {
          this.refresh(authToken)
        }
      })
    
    socket.on('error', msg => {
      console.log(msg)
    })
  }

  addAllAuthData = authToken => {
    localStorage.setItem('authToken', authToken)
    const authData = jwtDecode(authToken).user
    this.setState({ authData })
  }

  closeCard = provider => {
    api.unlink(provider)
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
        <div>{this.state.authData.email}</div>
        <button onClick={this.logout}>log out</button>
        <Footer />
      </div>
    )
  }
}