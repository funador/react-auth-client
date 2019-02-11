import { API_URL } from './config'

export default {
  
  wakeUp: () => {
    return fetch(`${API_URL}/wake-up`)
      .then(res => res.ok)
  },

  refreshToken: () => {
    const authToken = localStorage.getItem('authToken')

    return fetch(`${API_URL}/refresh`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(res => res.json())
  },

  unlink: provider => {
    const authToken = localStorage.getItem('authToken')

    return fetch(`${API_URL}/unlink/${provider}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
  }
  
} 