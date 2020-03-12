import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'
import axios from '@/config/axios'
import api from '@/config/api'

import './registerServiceWorker'

Vue.use(axios)

Vue.prototype.$api = api
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
