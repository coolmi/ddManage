import dataUtils from '../../filters/dataUtils'
export default {
  state: {
    forms: [],
    infos: {}
  },

  actions: {
    addBusinessTripInfo({commit}, info) {
      commit('ADD_BUSINESSTRIP_INFO', info);
    },
    addBusinessTrip({commit}, data) {
      commit('ADD_BUSINESSTRIP', data);
    },
    clearBusinessTrip({commit}) {
      commit('CLEAR_BUSINESSTRIP');
    }
  },

  mutations: {
    'ADD_BUSINESSTRIP_INFO'(state, info) {
      state.infos = info
    },
    'ADD_BUSINESSTRIP'(state, data) {
      let froms = dataUtils.filterData(state.forms, data)
      state.forms = froms
    },
    'CLEAR_BUSINESSTRIP'(state) {
      state.forms = []
    }
  },
  getters: {
    getBusinessTripInfos: state => state.infos,
    getBusinessTripForms: state => state.forms
  }
}
