import dataUtils from '../../filters/dataUtils'
export default {
  state: {
    forms: [],
    infos: {}
  },

  actions: {
    addReserveInfo({commit}, info) {
      commit('ADD_RESERVE_INFO', info);
    },
    addReserve({commit}, data) {
      commit('ADD_RESERVE', data);
    },
    clearReserve({commit}) {
      commit('CLEAR_RESERVE');
    }
  },

  mutations: {
    'ADD_RESERVE_INFO'(state, info) {
      state.infos = info
    },
    'ADD_RESERVE'(state, data) {
      let froms = dataUtils.filterData(state.forms, data)
      state.forms = froms
    },
    'CLEAR_RESERVE'(state) {
      state.forms = []
    }
  },
  getters: {
    getReserveFroms: state => state.forms,
    getReserveInfos: state => state.infos
  }
}
