import axios from 'axios'
import config from '../../config'
let instance = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
})

instance.interceptors.request.use((request) => {
  request.headers.common['Accept'] = 'application/json'
  request.headers.common['Content-type'] = 'application/json'
  return request
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('user')
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

export default instance
