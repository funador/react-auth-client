import React, { Component } from 'react'
import io from 'socket.io-client'
import jwtDecode from 'jwt-decode'
import { notify } from 'react-notify-toast'
import OAuth from './OAuth'
import Loading from './Loading'
import Header from './Header'
import Footer from './Footer'
import api from './api'
import { API_URL } from './config'
import { setToken, getToken, removeToken } from './utils'
import './App.css'
const socket = io(API_URL)
const providers = ['twitter', 'google', 'facebook', 'github']

export default class App extends Component {
  
  state = {
    loading: true,
    authData: {}
  }
  
  refreshToken = () => {
    api.refresh()
      .then(authToken => {
        setToken(authToken)
        const authData = jwtDecode(authToken).user
        this.setState({ authData })
      })
      .catch(err => {
        console.log(err)
        // pop up to say something is wrong
        removeToken()
      })
    }

  componentDidMount() {
    socket.on('connect', () => {
      api.wakeUp(socket.id)
        .then(() => {
          this.setState({ loading: false })  
          const authToken = getToken()
          
          if (authToken) {
            this.refreshToken(authToken)
          }
        })
    })
  }

  addAllAuthData = authToken => {
    localStorage.setItem('authToken', authToken)
    const authData = jwtDecode(authToken).user
    this.setState({ authData })
  }

  addProviderData = (provider, providerData, email) => {
    this.setState({
      authData: {
        ...this.state.authData,
        [provider]: providerData,
        email
      }
    })
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

  removeAuthData = msg => {
    removeToken()
    this.setState({ authData: {} })
    notify.show(msg)
  }

  logout = () => {
    api.logout()
      .then(() => {
        this.removeAuthData('You have been logged out')
      })
  }

  deleteAccount = () => {
    api.deleteAccount()
      .then(() => {
        this.removeAuthData('Your account has been deleted')
      })
  }

  render = () => {
    const buttons = (providers, socket) => 
      providers.map(provider => 
        <OAuth 
          provider={provider}
          key={provider}
          socket={socket}
          authData={this.state.authData[provider]}
          addProviderData={this.addProviderData}
          closeCard={this.closeCard}
        />
      )
      
    return (
      <div className='wrapper'>
        <Header 
          email={this.state.authData.email} 
          logout={this.logout}
          deleteAccount={this.deleteAccount}
          showLogout={Object.keys(this.state.authData).length} 
        />
        <div className='container'>
          {this.state.loading
            ? <Loading />
            : buttons(providers, socket)
          }
        </div>
        <Footer />
      </div>
    )
  }
}