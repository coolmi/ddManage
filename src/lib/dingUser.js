import ding from '@/lib/ding'
import store from '@/store'
import api from 'api'
import Q from 'q'
import dingEM from '@/lib/dingErrMessage'
import whole from '@/lib/whole'

export function getRequestAuthCode(path) {
  return Q.Promise((success, error) => {
    // success('123sddsfsdfdsfsdfds')
    ding.jsApiOAuth(path).then((ddconfig) => {
      let dd = window.dd;
      dd.ready(function () {
        dd.runtime.permission.requestAuthCode({
          corpId: ddconfig.corpId,
          onSuccess: function (result) {
            store.dispatch('updateCode', result.code)
            success(result.code)
          },
          onFail: function (err) {
            store.dispatch('updateCode', false)
            whole.showTop(dingEM.ddRequestAuthCodeError)
          }
        })
      })
      dd.error(function (err) {
        /**
         {
            message:"错误信息",//message信息会展示出钉钉服务端生成签名使用的参数，请和您生成签名的参数作对比，找出错误的参数
            errorCode:"错误码"
         }
         **/
        console.log('dd ding error: ' + window.location.href + JSON.stringify(err));
        whole.showTop(dingEM.ddError)
      });
    });
  });
}

export function getUserInfo(ddcode, corpId) {
  return Q.Promise((success, error) => {
    let params = {
      code: ddcode,
      corpId: corpId,
      suiteKey: window.getParamByName('suiteKey')
    }
    api.getUserInfos(params, function (res) {
      if (res.date.code) {
        success(res.data.data)
      } else {
        whole.showTop(dingEM.ddUserInfoError)
      }
    })
  });
};

export default {
  getRequestAuthCode,
  getUserInfo
}
