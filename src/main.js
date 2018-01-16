// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import {sync} from 'vuex-router-sync'
// import MintUI from 'mint-ui'
// import Navigation from 'vue-navigation'
// import vueScrollBehavior from 'vue-scroll-behavior'
// import Raven from 'raven-js';
// import RavenVue from 'raven-js/plugins/vue';
// import RavenConfig from '@/lib/RavenConfig'
import api from 'api'
import dingUser from '@/lib/dingUser'
import whole from '@/lib/whole'

// Raven
//   .config('http://c8e1476543fe4622a4711c079dcd144b@192.168.5.195:9000/3')
//   .addPlugin(RavenVue, Vue)
//   .install();
//
// Vue.use(RavenConfig) // 监控

import Navigation from '@/nav'
// use plugin
Vue.use(Navigation, {router})

// import vueScrollBehavior from '@/scroller'
// Vue.use(vueScrollBehavior, {router: router})

// Vue.use(vueScrollBehavior, {router: router}) // router ScrollBehavior

// Vue.use(Navigation, {router, store}) // 后退不刷新
// Vue.use(Navigation, {router, store, moduleName: 'navigation', keyName: 'VNK'})

// Vue.use(MintUI);
// import 'mint-ui/lib/style.min.css'
// import { CloseDialogsPlugin } from 'vux'
// Vue.use(CloseDialogsPlugin, router)

store.dispatch('saveURL', location.href)
store.dispatch('saveDingTalkCode')

dingUser.getRequestAuthCode(location.href).then((data) => {
  api.getLogin(data, function (res) {
    if (res.data.code) {
      initVue();
    } else {
      whole.showTop('获取钉钉免登权限失败')
    }
  })
})

Vue.config.productionTip = false

const FastClick = require('fastclick');
FastClick.attach(document.body);

require('./filters');

sync(store, router);

function initVue() {
  new Vue({
    router,
    store,
    ...App
  }).$mount('#app')
}
