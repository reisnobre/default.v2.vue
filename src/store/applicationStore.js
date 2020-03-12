const state = {
  conn: 'prod'
}

const getters = {
  conn: () => state.conn
}

const mutations = {
  SET_CONN (state, conn) {
    state.conn = conn
    window.localStorage.setItem('conn', conn) // saving the conn as a client configuration
  }
}

const actions = {
  setConn ({ commit }, conn) {
    commit('SET_CONN', conn)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
