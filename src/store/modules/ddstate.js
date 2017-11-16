/**
 * Created by lzl on 17/2/14.
 */
import base from '@/api/baseConfig'
export default {
  state: {
    ddConfig: null,
    ddConfigStatus: null,
    ddConfigCode: null,
    ddUserID: '',
    ddConfigPath: '' || base.baseURL,
    ddAddress: ''
  },
  actions: {
    dcSuccess({commit}, config) {
      commit('DDCONFIG_SUCCESS', config);
    },
    saveURL({commit}, url) {
      commit('SAVE_URL', url);
    },
    dcFail({commit}) {
      commit('DDCONFIG_FAIL');
    },
    updateCode({commit}, code) {
      commit('UPDATE_CODE', code);
    },
    updateUserID({commit}, userid) {
      commit('UPDATE_USERID', userid);
    },
    updateAddress({commit}, address) {
      commit('UPDATE_ADDRESS', address);
    }
  },
  mutations: {
    'DDCONFIG_SUCCESS'(state, config) {
      state.ddConfig = config
      state.ddConfigStatus = true
    },
    'DDCONFIG_FAIL'(state) {
      state.ddConfig = null
      state.ddConfigStatus = false
    },
    'UPDATE_CODE'(state, code) {
      state.ddConfigCode = code
    },
    'UPDATE_USERID'(state, userid) {
      state.ddUserID = userid
    },
    'SAVE_URL'(state, url) {
      state.ddConfigPath = url
    },
    'UPDATE_ADDRESS'(state, address) {
      state.ddAddress = address
    }
  },
  getters: {
    getddConfig: state => state.ddConfig,
    getddConfigCode: state => state.ddConfigCode,
    getddConfigPath: state => state.ddConfigPath,
    getddUserID: state => state.ddUserID,
    getddAddress: state => state.ddAddress
  }
}
