/**
 * Created by lzl on 17/2/14.
 */
const state = {
  topMessage: '未知错误',
  showTopMessage: false,
  isLoading: ''
}

const actions = {
  topMessage({ commit }, msg) {
    commit('TOP_MESSAGE', msg);
  },
  showTopMessage({ commit }, status) {
    commit('SHOW_TOP_MESSAGE', status);
  },
  isLoading({ commit }, status) {
    commit('LOADING', status);
  }
}

const mutations = {
  'TOP_MESSAGE'(state, msg) {
    state.topMessage = msg
  },
  'SHOW_TOP_MESSAGE'(state, status) {
    state.showTopMessage = status
  },
  'LOADING'(state, status) {
    state.isLoading = status
  }
}

export default {
  state,
  mutations,
  actions
}
