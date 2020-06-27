import axios from 'axios'
import store from '@/store'

const env = process.env.NODE_ENV
const conn = store.getters['applicationStore/conn']

const dev = {
  master: 'http://localhost:8000/',
  beta: 'http://localhost:8000/'
}

const prod = {
  master: 'https://back.backup.techmobil.com.br/',
  beta: 'http://localhost:8000/'
}

const api = axios.create({
  baseURL: env === 'production' ? prod[conn] : dev[conn]
})

api.interceptors.request.use(config => {
  if (!config.url.includes('oauth/token')) {
    config.baseURL = config.baseURL + 'api/v1'
  } else {

  }
  return config
}, err => {
  return Promise.reject(err)
})

api.interceptors.response.use(response => {
  return response
}, err => {
  return Promise.reject(err)
})

export default api
