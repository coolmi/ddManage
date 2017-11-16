import Raven from 'raven-js';

export default {
  install: (Vue) => {
    Vue.prototype.$raven = function (msg) {
      Raven.captureException(msg);
    }
  }
}
