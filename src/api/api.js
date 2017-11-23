import axios from './axiosConfig'
import APILIST from './apiBase'
import APISEND from './apiSend'
import * as _ from 'underscore'

export default {
  /**
   * 获取登录 -- Debug模式用
   * @param params
   * @param cb
   */
  getDebugLogin: function (code, itcode, cb) {
    axios.get('/dingding/es/login?code=' + code + '&debugitcode=' + itcode)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },

  /**
   * 登录
   * @param params
   * @param cb
   */
  getLogin: function (data, cb) {
    axios.get('/dingding/es/login?code=' + data)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },

  /**
   * 登出
   * @param params
   * @param cb
   */
  getLogout: function (cb) {
    axios.get('/app/logout')
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },

  /**
   * 获取JsApi参数
   * @param cb
   */
  getJsApiInfos: function (params, cb) {
    axios.get('/api/ddtalk/miandeng/h5config?purl=' + params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },

  /**
   * 待办列表
   * @param cb
   */
  getDBList: function (cb) {
    axios.get(APILIST.dblist_url)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },

  /**
   * 申请中列表
   * @param cb
   */
  getSQZList: function (cb) {
    axios.get(APILIST.sqzlist_url)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },

  /**
   * 已办理列表
   * @param cb
   */
  getYBLList: function (cb) {
    axios.get(APILIST.ybllist_url)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },

  /**
   * 已结束列表
   * @param cb
   */
  getYJSList: function (cb) {
    axios.get(APILIST.yjslist_url)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },

  /**
   * 获取流程详情
   * @param cb
   */
  getHandleInfo: function (params, cb) {
    axios.post(APILIST.handleinfo_url, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取流程权限
   * @param cb
   */
  getAuthor: function (params, cb) {
    axios.post(APILIST.author_url, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 下一步
   * @param parmas
   * @param cb
   */
  goNextAssigne: function (parmas, cb) {
    axios.post(APILIST.nextassigne_url, parmas)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 提交
   * @param parmas
   * @param cb
   */
  toCommite: function (parmas, cb) {
    axios.post(APILIST.commite_url, parmas)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取钉钉用户信息
   * @param params
   * @param cb
   */
  getDingUserInfo: function (params, cb) {
    console.log(params)
    axios.get(APILIST.getduser_url + '?pernr=' + params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取审批记录
   * @param params
   * @param cb
   */
  getHistory: function (params, cb) {
    axios.post(APILIST.gethistory_url, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取附件
   * @param params
   * @param cb
   */
  getFlowFiles: function (params, cb) {
    axios.get(APILIST.getflowfiles_url, {
      params
    })
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 打开附件
   * @param params
   * @param cb
   */
  openFlowFile: function (params, cb) {
    axios.get(APILIST.openfile_url, {
      params
    })
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 已结束,已办理，申请中详情
   * @param cb
   */
  getViewInfo: function (params, cb) {
    axios.post(APILIST.yjs_info_url, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 根据钉钉id获取主岗
   */
  getMPostidByDdid: function (params, cb) {
    axios.post(APILIST.getMPostidByDdid_url, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 加签
   */
  goSignplus: function (params, cb) {
    axios.post(APILIST.signplus_url, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 转办
   */
  goDelegate: function (params, cb) {
    axios.post(APILIST.delegate_url, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 发起
  getPosition: function (cb) {
    axios.all([APISEND.getPosition(), APISEND.getBurkList()])
      .then(axios.spread(function (...a) {
        // 两个请求现在都执行完成
        let aa = _.map(a, _.iteratee('data'));
        let aaa = _.map(aa, _.iteratee('data'));
        let obj = {};
        _.map(aaa, function (item) {
          Object.keys(item).forEach(key => {
            obj[key] = item[key]
          })
        })
        console.log(obj)
        cb(obj);
      }));
  },
  getKostal: function (postid, burks, cb) {
    axios.get('/authapi/ddtalkwf/getBukrsAndKostlByPostid?postid=' + postid + '&cdburks=' + burks)
      .then((res) => {
        console.log(res.data.data);
        cb(res.data.data);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  getBaseData: function (cb) {
    axios.all([APISEND.getReserveType()])
      .then(axios.spread(function (...a) {
        // 两个请求现在都执行完成
        let aa = _.map(a, _.iteratee('data'));
        let aaa = _.map(aa, _.iteratee('data'));
        let obj = {};
        _.map(aaa, function (item) {
          Object.keys(item).forEach(key => {
            obj[key] = item[key]
          })
        })
        cb(obj);
      }));
  },
  getDocument: function (url, cb) {
    axios.get(url).then((res) => {
      cb(res);
    }).catch((error) => {
      return Promise.reject(error)
    })
  }
}
