/**
 * 关于钉钉的一些配置
 */
import Q from 'q'
import dingEM from '@/lib/dingErrMessage'
import dingApiConfig from '@/lib/dingApiConfig'
import dingUser from '@/lib/dingUser'
import store from '@/store'
import api from 'api'
import whole from '@/lib/whole'
import * as _ from 'underscore'

let dd = window.dd;

// function getParamByName(name) {
//   var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//   var r = window.location.search.substr(1).match(reg);
//   if (r != null) return unescape(r[2]);
//   return null;
// };

const NOREFRESH = [];

const CORPID = 'ding7d5c838d71be2f8535c2f4657eb6378f';

export function parseCorpId(url, param) {
  var searchIndex = url.indexOf('?');
  var searchParams = url.slice(searchIndex + 1).split('&');
  for (var i = 0; i < searchParams.length; i++) {
    var items = searchParams[i].split('=');
    if (items[0].trim() === param) {
      return items[1].trim();
    }
  }
}

export function alertInfo(mes, title = '提示', btnName = '确定') {
  dd.ready(function () {
    dd.device.notification.alert({
      message: mes,
      title: title,
      buttonName: btnName,
      onSuccess: function () {
      },
      onFail: function (err) {
      }
    });
  });
}

export function confirm(config) {
  dd.ready(function () {
    dd.device.notification.confirm(config)
  });
}

export function setLeft(config = {}) {
  dd.ready(function () {
    dd.biz.navigation.setLeft(config)
  });
}

export function setRight(config = {}) {
  dd.ready(function () {
    dd.biz.navigation.setRight(config)
  });
}

export function setRightMenu(config = {}) {
  dd.ready(function () {
    dd.biz.navigation.setMenu(config)
  });
}

export function setTitle(config) {
  config.onSuccess = config.onTitleSuccess || {};
  config.onFail = config.onTitleFail || {};
  dd.ready(function () {
    dd.biz.navigation.setTitle(config);
  });
}

export function startPush(config) {
  dd.ui.pullToRefresh.enable(config)
}

export function stopPush() {
  dd.ui.pullToRefresh.stop()
}

export function closeThisWindow() {
  dd.biz.navigation.close({
    onSuccess: function (result) {
    },
    onFail: function (err) {
    }
  })
}

export function showPreloader(mes = '加载中', showIcon = true) {
  dd.device.notification.showPreloader({
    text: '使劲加载中..',
    showIcon: true,
    onSuccess: function(result) {
    },
    onFail: function(err) {}
  })
}

export function hidePreloader() {
  dd.device.notification.hidePreloader({})
}

export function jsApiOAuth(path) {
  return Q.Promise((success, error) => {
    if (path === undefined) {
      whole.showTop(dingEM.ddConfigPathNUll);
      return
    }
    api.getJsApiInfos(encodeURIComponent(path), function (res) {
      if (res.data.code) {
        let data = res.data.data;
        const checks = ['agentId', 'corpId', 'timeStamp', 'nonceStr', 'signature'];
        const responseKey = Object.keys(data);
        checks.map(function (v) {
          const checkResult = responseKey.filter(function (k) {
            return v === k;
          });
          if (checkResult.length === 0) {
            whole.showTop('jsApiOAuth Response ' + v + ' 不能返回空');
            return;
          }
        });
        let jsApiList = getJSApiList()
        // console.table(jsApiList)
        let ddConfig = {
          agentId: data.agentId, // 必填，微应用ID
          corpId: data.corpId, // 必填，企业ID
          timeStamp: data.timeStamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          type: 0,  // 选填。0表示微应用的jsapi,1表示服务窗的jsapi。不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
          jsApiList: jsApiList // 必填，需要使用的jsapi列表，注意：不要带dd。
        }
        // store.dispatch('dcSuccess', ddConfig)
        success(ddConfig);
      } else {
        store.dispatch('dcFail')
        whole.showTop(dingEM.ddConfigInfoError)
      }
    })
  })
}

function getJSApiList() {
  let dacArr = _.keys(dingApiConfig);
  let jsApiList = [];
  for (let d of dacArr) {
    if (dingApiConfig[d]) {
      jsApiList.push(d)
    }
  }
  return jsApiList
}

export function ddISReady(corpID) {
  dd.ready(function () {
    dingUser.getRequestAuthCode(corpID).then((code) => {
    })
  });
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
}

export default {
  NOREFRESH,
  CORPID,
  parseCorpId,
  jsApiOAuth,
  ddISReady,
  alertInfo,
  confirm,
  setLeft,
  setRight,
  setRightMenu,
  setTitle,
  startPush,
  stopPush,
  showPreloader
}
