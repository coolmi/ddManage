import axios from './axiosConfig'
import APILIST from './apiBase'
import APISEND from './apiSend'
import * as _ from 'underscore'
import ding from '@/lib/ding';

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
    let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code')
    axios.get('/dingding/es/login?code=' + data + '&dingtalk_code=' + dingtalkCode)
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
    let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code')
    axios.get('/api/ddtalk/miandeng/h5config?purl=' + params + '&dingtalk_code=' + dingtalkCode)
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
  getYBLList: function (params, cb) {
    axios.get(APILIST.ybllist_url, {
      params
    })
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
  getYJSList: function (params, cb) {
    axios.get(APILIST.yjslist_url, {
      params
    })
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
  /**
   * 获取岗位和费用承担公司
   * @param  {Function} cb [返回数据]
   * @return {[type]}      [description]
   */
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
  // 员工出差申请
  // 获取交通方式 + 获取出发/到达地点
  getTrafficCitys: function (params1, params2, cb) {
    axios.all([APISEND.getTrafficways(params1), APISEND.getCitysbyBukrs(params2)])
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
  /**
   * 提交
   * @param cb
   */
  getStartTravelWFURL: function (params, cb) {
    axios.post(APISEND.startTravelWFURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 保存
   * @param cb
   */
  getSaveTravelURL: function (params, cb) {
    axios.post(APISEND.saveTravelURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取申请保存列表
   * @param  {[type]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  getDraftListURL: function (params, cb) {
    axios.get(APISEND.getDraftListURL, {
      params
    })
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取费用归集成本中心
   * @param  {[type]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  getKostal: function (params, cb) {
    axios.get(APILIST.getBukrsAndKostlByPostid_url, {
      params
    })
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 备用金申请
  // 获取备用金类型+币种列表
  getReserveSubData: function (params, cb) {
    axios.all([APISEND.getReserveType(), APISEND.getWaersListByBukrs(params)])
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
  /**
   * 获取费用所属事业部
   * @param  {[type]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  getBusinessDepartment: function (params, cb) {
    axios.get(APISEND.getBusinessDepartmentURL, {
      params
    })
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 提交
   * @param cb
   */
  getStartDepositWFURL: function (params, cb) {
    axios.post(APISEND.startDepositWFURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 保存
   * @param cb
   */
  getSaveDepositResegsURL: function (params, cb) {
    axios.post(APISEND.saveDepositResegsURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  getDocument: function (url, cb) {
    axios.get(url).then((res) => {
      cb(res);
    }).catch((error) => {
      return Promise.reject(error)
    })
  }
}
