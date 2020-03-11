import axios from 'axios'

import { header } from '@/config'
import store from '@/store.js'

axios.interceptors.request.use(config => {
  if (config.url.includes('api/v1')) {
    // ADD HEADERS TO ALL REQUESTS TO THE API
    config.headers = header()
    // store.dispatch('applicationStore/setLoading', 1)
  }

  if (config.method === 'post') {
    // TRIGGER ON TARGETED ROUTES
    if (['database', 'connection'].indexOf(config.url.split('/').pop()) !== -1) {
      store.dispatch('applicationStore/setProcessingStart')
    }
  }
  // if (config.url.includes('clients')) {
  //   store.dispatch('applicationStore/setProcessingStart')
  // }
  return config
}, err => {
  // store.dispatch('applicationStore/setLoading', -1)
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  if (response.config.method === 'post') {
    // TRIGGER ON TARGETED ROUTES
    if (['database', 'connection'].indexOf(response.config.url.split('/').pop()) !== -1) {
      store.dispatch('applicationStore/setProcessingFinish', true)
    }
  }
  return response
}, err => {
  return Promise.reject(err)
})

export default axios
