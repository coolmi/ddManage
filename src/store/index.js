import Vue from 'vue';
import Vuex from 'vuex';
import loading from './modules/loading'
import ddstate from './modules/ddstate'
import reserve from './modules/reserve'
import businessTrip from './modules/businessTrip'
import travel from './modules/travel'
import city from './modules/city'
import personReim from './modules/personReim'
import newleave from './modules/newleave'
import editfieldinfo from './modules/editfieldinfo'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
      loading,
      ddstate,
      reserve,
      businessTrip,
      travel,
      city,
      personReim,
      newleave,
      editfieldinfo
    },
    strict: debug
});
