import axios from 'axios'
import baseConfig from './baseConfig'
import ding from '@/lib/ding'
import DEM from '@/lib/dingErrMessage'
// import store from '@/store';
// import router from '../router'
import whole from '@/lib/whole'

// let dd = window.dd
axios.defaults.timeout = 25000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = baseConfig.baseURL;

axios.interceptors.request.use((config) => {
  if (!(config.url.indexOf('h5config') >= 0) && !(config.url.indexOf('authorizedInfo') >= 0)) { // dding config 不显示刷新状态框 为啥？ 为了体验
    whole.busy()
  }
  return config;
}, (error) => {
  whole.leave()
  // _.toast('错误的数据');
  // _.leave();
  return Promise.reject(error);
});

axios.interceptors.response.use((res) => {
  whole.leave()
  if (res.data.code) {
    if (res.data.code === '200' || res.data.code === 200) {
      res.data.code = true;
    } else if (res.data.code === '401') {
      window.alert('授权失败')
      // ding.alertInfo(res.data.message);
      res.data.code = false;
      return Promise.resolve(res);
    } else {
      ding.alertInfo('服务器错误' + DEM.serverErr);
      res.data.code = false;
      return Promise.resolve(res);
    }
  } else if (res.data.state) {
    if (res.data.state === '200') {
      res.data.code = true;
    } else if (res.data.state === '401') {
      ding.alertInfo(res.data.message + DEM.interfaceErr);
      res.data.code = false;
    } else {
      ding.alertInfo('服务器错误' + DEM.serverErr);
      res.data.code = false;
      return Promise.resolve(res);
    }
  }
  return res;
}, (error) => {
  whole.leave()
  whole.showTop('网络异常，请刷新重试');
  console.log(JSON.stringify(error))
  // this.$raven('错误URL' + error.request.url + error)
  return Promise.reject(error);
})
export default axios;
