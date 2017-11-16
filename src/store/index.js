import Vue from 'vue';
import Vuex from 'vuex';
import loading from './modules/loading'
import ddstate from './modules/ddstate'
import reserve from './modules/reserve'
import travel from './modules/travel'
import city from './modules/city'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
      loading,
      ddstate,
      reserve,
      travel,
      city
    },
    strict: debug
});
