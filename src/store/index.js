import Vue from 'vue'
import Vuex from 'vuex'

import authenticationStore from './authenticationStore'
import applicationStore from './applicationStore'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  modules: {
    authenticationStore,
    applicationStore
  }
})
