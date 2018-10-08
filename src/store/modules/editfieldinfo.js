/**
 * Created by lzl on 17/2/14.
 */
export default {
  state: {
    editfieldinfo: []
  },
  actions: {
    getEditFields({commit}, editfieldinfo) {
      commit('GET_EDIT_FIELDS', editfieldinfo);
    },
    initEditFields({commit}) {
      commit('INIT_EDIT_INFO');
    }

  },
  mutations: {
    'GET_EDIT_FIELDS'(state, editfieldinfo) {
      state.editfieldinfo = editfieldinfo
    },
    'INIT_EDIT_INFO'(state) {
      state.editfieldinfo = []
    }
  },
  getters: {
    editfieldinfo: state => state.editfieldinfo
  }
}
