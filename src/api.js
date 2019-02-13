import { API_URL } from './config'

export default {
  
  wakeUp: socketId => {
    return fetch(`${API_URL}/wake-up?socketId=${socketId}`, {
      credentials: 'include'
    })
      .then(res => res.ok)
  },

  refresh: () => {
    const authToken = localStorage.getItem('authToken')

    return fetch(`${API_URL}/refresh`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      credentials: 'include'
    })
    .then(res => res.json())
  },

  unlink: provider => {
    const authToken = localStorage.getItem('authToken')

    return fetch(`${API_URL}/unlink/${provider}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      credentials: 'include'
    })
  },

  logout: () => {
    const authToken = localStorage.getItem('authToken')

    return fetch(`${API_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      credentials: 'include'
    })
      .then(res => res.ok)
  }
} 