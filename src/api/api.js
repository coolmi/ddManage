import axios from './axiosConfig'
import APILIST from './apiBase'
import APISEND from './apiSend'
import * as _ from 'underscore'
import ding from '@/lib/ding';

const AUTH_DINGTALKCODE = 'auth.dingtalkcode';
export default {
  /**
   * 获取登录 -- Debug模式用
   * @param params
   * @param cb
   */
  getDebugLogin: function (code, itcode, cb) {
    let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code') || ding.getLocation(AUTH_DINGTALKCODE)
    axios.get('/dingding/es/login?code=' + code + '&debugitcode=' + itcode + '&dingtalk_code=' + dingtalkCode)
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
    let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code') || ding.getLocation(AUTH_DINGTALKCODE)
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
    let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code') || ding.getLocation(AUTH_DINGTALKCODE)
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
   * 下一步
   * @param parmas
   * @param cb
   */
  nextAssignTaskList: function (parmas, cb) {
    axios.post(APILIST.nextassignetasklist_url, parmas)
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
    axios.get(APILIST.getduser_url + '?pernr=' + params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 根据postid获取钉钉用户信息
   * @param params
   * @param cb
   */
  getDingUserInfoByPostid: function (params, cb) {
    axios.get(APILIST.getduserbypostid_url + '?postidoritcode=' + params)
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
   * 传阅
   */
  goCY: function (params, cb) {
    axios.post(APILIST.cy_url, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 会签
   */
  goHq: function (params, cb) {
    axios.post(APILIST.hq_url, params)
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
  getPosition1: function (cb) {
    axios.all([APISEND.getPosition()])
      .then(axios.spread(function (...a) {
      // 两个请求现在都执行完成
      let aa = _.map(a, _.iteratee('data'));
      let aaa = _.map(aa, _.iteratee('data'));
      cb(aaa);
    }
    ))
    ;
  },
  getBurck1: function (params, cb) {
    axios.get(APISEND.getBurkList1, {
      params
    })
    .then((res) => {
      cb(res);
  }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 验证是否获取到用户基本信息
   * @param cb
   */
  getvalidateUserBaseInfoURL: function (params, cb) {
    axios.get(APISEND.validateUserBaseInfoURL, {
      params
    })
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
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
   * 提交验证
   * @param cb
   */
  getNextassigneeTravelWFURL: function (params, cb) {
    axios.post(APISEND.nextassigneeTravelWFURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 报销申请提交验证
   * @param cb
   */
  getnextassigneeFeeAppURL: function (params, cb) {
    axios.post(APISEND.getnextassigneeFeeAppURL, params)
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
   * 查看申请保存详情
   * @param  {[type]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  getDraftDataByIdURL: function (params, cb) {
    axios.get(APISEND.getDraftDataByIdURL, {
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
  /**
   * 获取费用归集成本中心
   * @param  {[type]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  getIsSelTravel: function (params, cb) {
    axios.get(APILIST.getIsSelTravel_url, {
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
   * 获取是否临时岗位（专项）
   * @param  {[type]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  getIsTempOrg: function (params, cb) {
    axios.get(APISEND.getIsTempOrgURL, {
      params
    })
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 提交验证
   * @param cb
   */
  getNextassigneeDepositWFURL: function (params, cb) {
    axios.post(APISEND.nextassigneeDepositWFURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取休假类型
   * @param  {[type]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  getLeaveTypeListURL: function (cb) {
    axios.get(APISEND.leaveTypeListURL)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取休假天数
   * @param  {[type]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  getXjtsURL: function (params, cb) {
    axios.post(APISEND.xjtsURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取实际休假天数
   * @param  {[type]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  getSjXjtsURL: function (params, cb) {
    axios.post(APISEND.sjXjtsURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取休假天数
   * @param  {[type]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  getKqbcURL: function (params, cb) {
    axios.post(APISEND.kqbcURL, params)
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
   * 根据ddids获取itcode和手机号
   * */
  getUserInfoDdid: function (params, cb) {
    axios.get(APILIST.getUserInfoDdid_url + '?ddid=' + params)
      .then(res => {
        cb(res)
      }).catch(error => {
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
  },
  /**
   * 预判
   * @param cb
   */
  getNextAssignNewLeaveURL: function (params, cb) {
    axios.post(APISEND.nextAssignNewLeaveURL, params)
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
  getStartNewLeaveURL: function (params, cb) {
    axios.post(APISEND.startNewLeaveURL, params)
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
  getSaveNewLeaveURL: function (params, cb) {
    axios.post(APISEND.saveNewLeaveURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 预判
   * @param cb
   */
  getNextAssignNewLeaveBackURL: function (params, cb) {
    axios.post(APISEND.nextAssignNewLeaveBackURL, params)
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
  getStartNewLeaveBackURL: function (params, cb) {
    axios.post(APISEND.startNewLeaveBackURL, params)
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
  getSaveNewLeaveBackURL: function (params, cb) {
    axios.post(APISEND.saveNewLeaveBackURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 预判
   * @param cb
   */
  getNextAssignOverTimeURL: function (params, cb) {
    axios.post(APISEND.nextAssignOverTimeURL, params)
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
  getStartOverTimeURL: function (params, cb) {
    axios.post(APISEND.startOverTimeURL, params)
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
  getSaveOverTimeURL: function (params, cb) {
    axios.post(APISEND.saveOverTimeURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  getNewLeaveBackListURL: function (params, cb) {
    axios.get(APISEND.newLeaveBackListURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  getNewLeaveInfoByIdURL: function (params, cb) {
    axios.get(APISEND.newLeaveInfoByIdURL, {
      params
    })
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 个人报销基本数据
   * @param cb   , APISEND.getTaxCodeList(typaram)
   */
  getPersonReimBaseData: function (fsparam, lxparam, typaram, cb) {
    axios.all([APISEND.getSubMenuList(fsparam), APISEND.getSubMenuList(lxparam), APISEND.getCitysbyBukrs(typaram), APISEND.getWaersListByBukrs(typaram)])
      .then(axios.spread(function (...a) {
      // 两个请求现在都执行完成
      let aa = _.map(a, _.iteratee('data'));
      let aaa = _.map(aa, _.iteratee('data'));
      cb(aaa);
    }
    ))
    ;
  },
  // 获取项目编号通用
  getColdconamList: function (params, cb) {
    axios.all([APISEND.getColdconamList(params)])
      .then(axios.spread(function (...a) {
      // 两个请求现在都执行完成
      let aa = _.map(a, _.iteratee('data'));
      let aaa = _.map(aa, _.iteratee('data'));
      cb(aaa);
    }
    ))
    ;
  },
  // 长途交通金额超标验证
  getOverproofLtrad: function (params, cb) {
    axios.all([APISEND.getOverproofLtrad(params)])
      .then(axios.spread(function (...a) {
      // 两个请求现在都执行完成
      let aa = _.map(a, _.iteratee('data'));
      let aaa = _.map(aa, _.iteratee('data'));
      cb(aaa);
    }
    ))
    ;
  },
  // 城市交通金额超标验证
  getOverproofCitytrad: function (params, cb) {
    axios.all([APISEND.getOverproofCitytrad(params)])
      .then(axios.spread(function (...a) {
      // 两个请求现在都执行完成
      let aa = _.map(a, _.iteratee('data'));
      let aaa = _.map(aa, _.iteratee('data'));
      cb(aaa);
    }
    ))
    ;
  },
  // 住宿机餐补金额超标验证
  getMealAllwance: function (params, cb) {
    axios.all([APISEND.getMealAllwance(params), APISEND.getOverproofHotel(params)])
      .then(axios.spread(function (...a) {
      // 两个请求现在都执行完成
      let aa = _.map(a, _.iteratee('data'));
      let aaa = _.map(aa, _.iteratee('data'));
      cb(aaa);
    }
    ))
    ;
  },
  // 餐补超额校验
  getOverproofMealFee: function (params, cb) {
    axios.all([APISEND.getOverproofMealFee(params)])
      .then(axios.spread(function (...a) {
      // 两个请求现在都执行完成
      let aa = _.map(a, _.iteratee('data'));
      let aaa = _.map(aa, _.iteratee('data'));
      cb(aaa);
    }
    ))
    ;
  },
  // 获取项目编号专项
  getColdconamzList: function (params, cb) {
  axios.all([APISEND.getColdconamzList(params)])
  .then(axios.spread(function (...a) {
  // 两个请求现在都执行完成
  let aa = _.map(a, _.iteratee('data'));
  let aaa = _.map(aa, _.iteratee('data'));
  cb(aaa);
}
))
;
},
  // 获取税码
  getTaxCodeList: function (sparams, cb) {
    axios.all([APISEND.getTaxCodeList(sparams)])
      .then(axios.spread(function (...a) {
      let aa = _.map(a, _.iteratee('data'));
      let aaa = _.map(aa, _.iteratee('data'));
      cb(aaa);
    }
    ))
    ;
  },
  /**
   * 获取员工费用报销--通讯费--获取超标准金额
   * @param  {[brucks]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  getOverproofTelnet: function (params, cb) {
    axios.all([APISEND.getOverproofTelnet(params)])
      .then(axios.spread(function (...a) {
      // 两个请求现在都执行完成
      let aa = _.map(a, _.iteratee('data'));
      let aaa = _.map(aa, _.iteratee('data'));
      cb(aaa);
    }
    ))
    ;
  },
  // 办公费用类型 币种  码率
  getOfficePersonReimBaseData: function (fsparam, typaram, cb) {
    axios.all([APISEND.getSubMenuList(fsparam), APISEND.getWaersListByBukrs(typaram), APISEND.getTaxCodeList(typaram), APISEND.getCitysbyBukrs(typaram)])
      .then(axios.spread(function (...a) {
      // 两个请求现在都执行完成
      let aa = _.map(a, _.iteratee('data'));
      let aaa = _.map(aa, _.iteratee('data'));
      cb(aaa);
    }
    ))
    ;
  },
  getTravelList: function (cb) {
    axios.get(APILIST.travellist_url)
      .then((res) => {
      cb(res);
  }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取交通方式
   * @param  {[brucks]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  /* getTrfficWays: function (data, cb) {
    axios.get(APILIST.getTrfficWays_url, {
      data
    })
      .then((res) => {
      cb(res);
  }).catch((error) => {
      return Promise.reject(error)
    })
  }, */
  /**
   * 获取交通类型
   * @param  {[brucks]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  getTrfficType: function (params, cb) {
    axios.get(APILIST.getTrfficType_url, {
      params
    })
      .then((res) => {
      cb(res);
  }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /*
  * 员工报销获取费用承担公司(获取项目类型、费用承担公司、专项内部订单号)
  * */
  getProtypeInfo: function (params, cb) {
    axios.get(APILIST.getBukrlist_url, {
      params
    })
      .then((res) => {
      cb(res);
  }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /*
  * 获取报销币种
  * */
  getFundTypeList: function (params, cb) {
    axios.get(APISEND.getReserveType(), {
      params
    })
      .then((res) => {
      cb(res);
  }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 报销申请提交
   * @param cb
   */
  startFeeAppURL: function (params, cb) {
    axios.post(APISEND.startFeeAppURL, params)
      .then((res) => {
      cb(res);
  }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 报销申请保存
   * @param cb
   */
  saveFeeAppURL: function (params, cb) {
    axios.post(APISEND.saveFeeAppURL, params)
      .then((res) => {
      cb(res);
  }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取代办人下拉框
   * @param  {[type]}   params [参数]
   * @param  {Function} cb     [返回数据]
   * @return {[type]}          [description]
   */
  findGPerson: function (cb) {
    axios.get(APISEND.findGPersonURL)
      .then((res) => {
      cb(res);
  }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * app拖拽位置保存接口
   * @param params
   * @param cb
   */
  saveAppItem: function (params, cb) {
    axios.post('/authapi/appPosition/saveAppItem', params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * app拖拽位置查询接口
   * @param cb
   */
  getAppItemList: function (cb) {
    axios.get('/authapi/appPosition/getAppItemList')
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  getNews: function (cb) {
    axios.get('/news/flashImages4Dd')
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  getFXgfOrg: function (postid, cb) {
    axios.get('/authapi/ddtalkwf/getIsFxgfOrg?postid=' + postid)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  getPbInfo: function (startdate, enddate, cb) {
    axios.get('/authapi/ddtalkwf/getSchedulelist?startdate=' + startdate + '&enddate=' + enddate)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 根据postid获取员工信息
  getUserInfoByPostid: function (params, cb) {
    axios.get(APILIST.getUserInfoPostid_url + '?postid=' + params, {
      params
    }).then((res) => {
      // alert(params)
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // IT运维派单
  /**
   * 获取问题来源类别
   * @params cb
   */
  getProblemsources: function (params) {
    axios.get(APISEND.getProblemURL, {
      params
    }).then((res) => {
      alert(params)
      // cb(res)
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 获取问题来源类别
  getProblems: function (cb) {
    axios.get('/authapi/sendsingle/findProblemsources')
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  // 获取运维工程师列表
  getYwlist: function (cb) {
    axios.get('/authapi/sendsingle/findyw')
      .then((res) => {
        cb(res);
      }).catch((error) => {
        return Promise.reject(error)
    })
  },
  getUserinfoPostid: function (params, appda, cb) {
    axios.get('/authapi/sendsingle/getuserinfo?postid=' + params + '&appda=' + appda)
      .then((res) => {
        cb(res)
      }).catch((error) => {
        return Promise.reject(error)
    })
  },
  getPeritinfo: function (params, cb) {
    axios.get('/authapi/sendsingle/findPeritinfo?itcode=' + params, {
      params
    }).then((res) => {
      cb(res);
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 保存
   * @param cb
   */
  getSaveItopsBackURL: function (params, cb) {
    axios.post(APISEND.saveItopsBackURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  getStartItopsURL: function (params, cb) {
    axios.post(APISEND.startItopsURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  getNextItopsURL: function (params, cb) {
    axios.post(APISEND.nextassignItopsURL, params)
      .then((res) => {
        cb(res);
      }).catch((error) => {
        return Promise.reject(error)
    })
  }
}
