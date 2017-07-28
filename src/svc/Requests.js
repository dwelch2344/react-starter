import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:8080'
const api = axios.create({
  baseURL: BASE_URL
})

// api.interceptors.request.use( config => {
// })

export function setAuthHeader(token){
  if( token ){
    api.defaults.headers.common['x-jwt-token'] = token
  }else {
    delete api.defaults.headers.common['x-jwt-token']
  }  
}

export default api

