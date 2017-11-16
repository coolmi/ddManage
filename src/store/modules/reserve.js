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
    }
  },

  mutations: {
    'ADD_RESERVE_INFO'(state, info) {
      state.infos = info
    },
    'ADD_RESERVE'(state, data) {
      let froms = dataUtils.filterData(state.forms, data)
      state.forms = froms
    }
  },
  getters: {
    getReserveFroms: state => state.forms,
    getReserveInfos: state => state.infos
  }
}
