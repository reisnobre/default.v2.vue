import { client } from '../config/auth'
const state = {
  tokens: {}
}

const getters = {
  tokens: () => state.tokens
}
const mutations = {
  SET_TOKENS (state, tokens) {
    window.localStorage.setItem('authTokens', JSON.stringify(tokens))
    state.tokens = tokens
  },
  DELETE_TOKENS (state) {
    window.localStorage.removeItem('authTokens')
    state.tokens = {}
  }
}

const actions = {
  get ({ commit }, payload) {
    const that = payload[0]
    const data = payload[1] // { username: '', password: '' }

    // Merge the data with the necessary client configuration

    Object.assign(data, client(that.$store.getters['applicationStore/conn']), { grant_type: 'password', scope: '' })

    return new Promise((resolve, reject) => {
      that.$http.post(that.$api({
        target: 'oauth/token',
        secure: false,
        conn: that.$store.getters.conn
      }), data).then(response => {
        commit('SET_TOKENS', response.data)
        resolve(true)
      }).catch(err => {
        reject(err)
      })
    })
  },

  show ({ commit }, that) {
    return new Promise((resolve, reject) => {
      that.$http.get(that.$api({
        target: 'user',
        conn: that.$store.getters.conn
      })).then(response => {
        if (response.data.active) {
          commit('SET_USER', response.data)
          return true
        } else {
          console.log('deactivated')
          return false
        }
      }).then(status => {
        resolve(status)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
