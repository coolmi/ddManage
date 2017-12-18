import dataUtils from '../../filters/dataUtils'
export default {
  state: {
    personReimForms: [],
    personReimInfos: {}
  },

  actions: {
    addPersonReimInfo({commit}, info) {
      commit('ADD_PERSON_REIM_INFO', info);
    },
    addPersonReim({commit}, data) {
      commit('ADD_PERSON_REIM', data);
    },
    clearPersonReim({commit}) {
      commit('CLEAR_PERSON_REIM');
    }
  },

  mutations: {
    'ADD_PERSON_REIM_INFO'(state, info) {
      state.personReimInfos = info
    },
    'ADD_PERSON_REIM'(state, data) {
      let froms = dataUtils.filterData(state.forms, data)
      state.personReimForms = froms
    },
    'CLEAR_PERSON_REIM'(state) {
      state.forms = []
    }
  },
  getters: {
    getPersonReimFroms: state => state.personReimForms,
    getPersonReimInfos: state => state.personReimInfos
  }
}
