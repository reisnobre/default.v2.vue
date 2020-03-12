const state = {
  user: null
}

const getters = {
  user: () => state.user
}
const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}

const actions = {
  get ({ commit }, that) {
    return new Promise((resolve, reject) => {
      that.$http.get(that.$api({
        target: 'user',
        conn: that.$store.getters.conn
      })).then(response => {
        commit('SET_USER', response.data)
        resolve()
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
