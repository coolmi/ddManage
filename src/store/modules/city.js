import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default{
  state: {
    header_name: '',
    link: '',
    right: '',
    showCity: false,
    targetCity: '',
    currentCity: '',
    startCity: '请选择',
    endCity: '请选择'
  },
  actions: {
    changeCityState({commit}, params) {
      commit('CHANGE_CITY_STATE', params);
    }
  },
  mutations: {
    'CHANGE_CITY_STATE'(state, params) {
      state[params.name] = params.newVal;
    }
  },
  getters: {
    showCity: state => state.showCity,
    startCity: state => state.startCity,
    endCity: state => state.endCity,
    currentCity: state => state.currentCity
  }
}
