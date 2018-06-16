import React, { Component } from 'react'
import io from 'socket.io-client'
import OAuth from './OAuth'
import Loading from './Loading'
import Header from './Header'
import Footer from './Footer'
import { API_URL } from './config'
import './App.css'
const socket = io(API_URL)
const providers = ['twitter', 'google', 'facebook', 'github']

export default class App extends Component {
  
  state = {
    err: '',
    loading: true
  }

  componentDidMount() {
    fetch(`${API_URL}/wake-up-heroku`)
      .then(res => {
        if(res.ok) {
          return this.setState({loading: false})  
        }
      })
  }

  componentWillUnmount() {
    socket.disconnect(true)
  }

  handleError(err) {
    this.setState({err})
  }

  render() {
    const buttons = (providers, socket) => 
      providers.map((provider, i) => 
        <OAuth 
          provider={provider}
          key={i}
          socket={socket}
          handleError={this.handleError.bind(this)}
        />
      )
    
    return (
      <div className={'wrapper'}>
        <Header err={this.state.err} />
        <div className={'container'}>
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