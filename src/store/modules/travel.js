import dataUtils from '../../filters/dataUtils'
export default {
  state: {
    forms: [],
    infos: {}
  },

  actions: {
    addTravelInfo({commit}, info) {
      commit('ADD_TRAVEL_INFO', info);
    },
    addTravel({commit}, data) {
      commit('ADD_TRAVEL', data);
    }
  },

  mutations: {
    'ADD_TRAVEL_INFO'(state, info) {
      state.infos = info
    },
    'ADD_TRAVEL'(state, data) {
      let froms = dataUtils.filterData(state.forms, data)
      state.forms = froms
    }
  },
  getters: {
    getTravelFroms: state => state.forms,
    getTravelInfos: state => state.infos
  }
}
