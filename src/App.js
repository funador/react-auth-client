import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import OAuth from './OAuth'
import Loading from './Loading'
import Footer from './Footer'
import { API_URL } from './config'
import './App.css'
const socket = io(API_URL)
const providers = ['twitter', 'google', 'facebook', 'github']

export default function App() {
  
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`${API_URL}/wake-up`)
      .then(res => {
        if (res.ok) {
          setLoading(false)  
        }
      })
  });

  const buttons = (providers, socket) => 
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
        {loading
          ? <Loading />
          : buttons(providers, socket)
        }
      </div>
      <Footer />
    </div>
  )
}