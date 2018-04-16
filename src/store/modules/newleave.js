import dataUtils from '../../filters/dataUtils'
export default {
  state: {
    forms: [],
    forms2: [],
    infos: {}
  },

  actions: {
    clearReserve({commit}) {
      commit('CLEAR_RESERVE');
    },
    addConnect({commit}, data) {
      commit('ADD_CONNECT', data)
    },
    editConnect({commit}, data) {
      commit('EDIT_CONNECT_INFO', data)
    },
    setConnect({commit}, data) {
      commit('SET_CONNECT', data)
    },
    addAccredit({commit}, data) {
      commit('ADD_ACCREDIT', data)
    }
  },

  mutations: {
    'ADD_CONNECT_INFO'(state, info) {
      state.infos = info
    },
    'ADD_CONNECT' (state, data) {
      let froms = dataUtils.filterData(state.forms, data)
      state.forms = froms
    },
    'EDIT_CONNECT_INFO'(state, data) {
      let index = data.index;
      state.forms[index] = data;
    },
    'ADD_ACCREDIT'(state, data) {
      let froms = dataUtils.filterData(state.forms2, data)
      state.forms2 = froms
    }
  },
  getters: {
    getConnectFroms: state => state.forms,
    getConnectFroms2: state => state.forms2,
    getConnectInfos: state => state.infos
  }
}
