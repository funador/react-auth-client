import React, { Component } from 'react'
import io, { Socket } from 'socket.io-client'
import OAuth from './OAuth'
import Loading from './Loading'
import Footer from './Footer'
import { API_URL } from './config'
import './App.css'

const socket = io(API_URL, { transports: ['websocket'] })
const providers = ['twitter', 'google', 'facebook', 'github']

interface AppState {
  loading: boolean
}

export default class App extends Component<{}, AppState> {

  state: AppState = {
    loading: true
  }

  componentDidMount() {
    fetch(`${API_URL}/wake-up`)
      .then(res => {
        if (res.ok) {
          this.setState({ loading: false })
        }
      })
  }

  render() {
    const buttons = (providers: string[], socket: Socket) =>
      providers.map(provider =>
        <OAuth
          provider={provider}
          key={provider}
          socket={socket}
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
        <Footer />
      </div>
    )
  }
}
