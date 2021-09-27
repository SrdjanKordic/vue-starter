import axios from 'axios'

let instance = axios.create({
  withCredentials: true,
})

instance.interceptors.request.use((request) => {
  request.headers.common['Accept'] = 'application/json'
  request.headers.common['Content-type'] = 'application/json'
  //request.headers.common['Access-Control-Allow-Origin'] = '*'
  return request
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      //sessionStorage.removeItem('user')
      localStorage.removeItem('user')
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

export default instance
