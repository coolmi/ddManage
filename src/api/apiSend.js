import axios from './axiosConfig'
// 获取部门
const getPositionURL = '/authapi/ddtalkwf/getPostion'
// 获取费用承担公司
const getBurkListURL = '/authapi/ddtalkwf/getBukrlist'
/**
 * 验证是否获取到用户基本信息
 * @type vfiled ：需要验证的字段，多个用逗号隔开（lifnr："财务编号",pernr,"员工编号",postid,"岗位编号",sysbusinessunitid,"事业部编号",sysdeptid,"部门编号",userid,"itcode",zzdbxjb,"报销级别"）
 */
const validateUserBaseInfoURL = '/authapi/ddtalkwf/validateUserBaseInfo'
// 获取休假类型
const leaveTypeListURL = '/authapi/newleave/getLeaveTypeList'
const xjtsURL = '/authapi/newleave/getXjts'
const kqbcURL = '/authapi/newleave/getKqbc'
const saveNewLeaveURL = '/authapi/newleave/saveNewLeave'
const startNewLeaveURL = '/authapi/newleave/startNewLeave'
const nextAssignNewLeaveURL = '/authapi/newleave/nextAssignNewLeave'
const saveOverTimeURL = '/authapi/overtime/saveOverTime'
const startOverTimeURL = '/authapi/overtime/startOverTime'
const nextAssignOverTimeURL = '/authapi/overtime/nextAssignOverTime'
const saveNewLeaveBackURL = '/authapi/newleaveback/saveNewLeaveBack'
const startNewLeaveBackURL = '/authapi/newleaveback/startNewLeaveBack'
const nextAssignNewLeaveBackURL = '/authapi/newleaveback/nextAssignNewLeaveBack'
const newLeaveBackListURL = '/authapi/newleaveback/backList'
const newLeaveInfoByIdURL = '/authapi/newleaveback/getNewLeaveInfoById'

// 报销
// 员工费用报销--通讯费--获取超标准金额
const getOverproofTelnetURL = '/authapi/ddtalkwf/getOverproofTelnet'

// 备用金
// 获取费用所属事业部(bukrs, appda | Get)
const getBusinessDepartmentURL = '/authapi/ddtalkwf/getBusinessDepartment'
// 获取备用金类型(无参数 | Get)
const getReserveTypeURL = '/authapi/ddtalkwf/getFundTypeList'
// 获取币种列表(bukrs, appda | Get)
const getWaersListByBukrsURL = '/authapi/ddtalkwf/getWaersListByBukrs'
// 根据公司 大类获取交通方式 类型
// const getSubMenuListURL = '/authapi/ddtalkwf/getSubMenuList'
// 提交验证接口
const nextassigneeDepositWFURL = 'authapi/ddtalkwf/nextassigneeDepositWF'
// 提交
const startDepositWFURL = '/authapi/ddtalkwf/startDepositWF'
// 保存
const saveDepositResegsURL = 'authapi/ddtalkwf/saveDepositResegs'
// 获取项目编号通用
const getColdconamListURL = 'authapi/ddtalkwf/getColnrList'
// 获取项目编号专项
const getColdconamzListURL = 'authapi/ddtalkwf/getColnrListz'
// 长途交通金额校验
const getOverproofLtradURL = 'authapi/ddtalkwf/getOverproofLtrad'

// 员工出差申请
// 获取交通方式(bukrs, appda | Get)
const getTrafficwaysURL = '/authapi/ddtalkwf/getTrafficways'
// 获取出发/到达地点(bukrs | Get)
const getCitysbyBukrsURL = '/authapi/ddtalkwf/getCitysbyBukrs'
// 根据公司 大类获取交通方式 类型
const getSubMenuListURL = '/authapi/ddtalkwf/getSubMenuList'
// 提交验证接口
const nextassigneeTravelWFURL = 'authapi/ddtalkwf/nextassigneeTravelWF'
// 提交
const startTravelWFURL = '/authapi/ddtalkwf/startTravelWF'
// 税率
const getTaxCodeListURL = '/authapi/ddtalkwf/getTaxCodeList'
// 保存
const saveTravelURL = '/authapi/ddtalkwf/saveTravel'
// 获取申请保存列表（draftType: depositApp 备用金申请/ travel 出差申请 / reimburse: 费用报销申请）
const getDraftListURL = '/authapi/ddtalkwf/getDraftList'
// 查看申请保存详情（draftType, appid | Get）
const getDraftDataByIdURL = '/authapi/ddtalkwf/getDraftDataById'

// 员工费用报销-交通类型
const getPersonReimTrafficTypeURL = '/authapi/ddtalkwf/getTrafficType'

const getPosition = function () {
  return axios.get(getPositionURL);
}
const getBurkList = function () {
  return axios.get(getBurkListURL);
}
// 备用金共同请求（获取备用金类型+币种列表）
const getReserveType = function () {
  return axios.get(getReserveTypeURL);
}
const getWaersListByBukrs = function (params) {
  return axios.get(getWaersListByBukrsURL, {
    params
  });
}
// 出差申请共同请求（获取交通方式+地点）
const getTrafficways = function (params) {
  return axios.get(getTrafficwaysURL, {
    params
  });
}
const getCitysbyBukrs = function (params = {}) {
  return axios.get(getCitysbyBukrsURL, {
    params
  });
}
const getTaxCodeList = function (params = {}) {
  return axios.get(getTaxCodeListURL, {
    params
  });
}
const getSubMenuList = function (params = {}) {
  return axios.get(getSubMenuListURL, {
    params
  });
}
const getColdconamList = function (params = {}) {
  return axios.get(getColdconamListURL, {
    params
  });
}
const getOverproofLtrad = function (params = {}) {
  return axios.get(getOverproofLtradURL, {
    params
  });
}
const getColdconamzList = function (params = {}) {
  return axios.get(getColdconamzListURL, {
    params
  });
}
const getPersonReimTrafficType = function (params = {}) {
  return axios.get(getPersonReimTrafficTypeURL, {
    params
  });
}
export default {
  getPositionURL,
  getBusinessDepartmentURL,
  getReserveTypeURL,
  getWaersListByBukrsURL,
  nextassigneeDepositWFURL,
  startDepositWFURL,
  saveDepositResegsURL,
  getColdconamListURL,
  getColdconamList,
  getOverproofLtrad,
  getOverproofLtradURL,
  getColdconamzListURL,
  getColdconamzList,
  getBurkListURL,
  validateUserBaseInfoURL,
  getTrafficwaysURL,
  getCitysbyBukrsURL,
  nextassigneeTravelWFURL,
  getPersonReimTrafficTypeURL,
  getPosition,
  getBurkList,
  getReserveType,
  getWaersListByBukrs,
  getTrafficways,
  getCitysbyBukrs,
  getSubMenuList,
  getPersonReimTrafficType,
  startTravelWFURL,
  getTaxCodeList,
  getTaxCodeListURL,
  saveTravelURL,
  getDraftListURL,
  getDraftDataByIdURL,
  leaveTypeListURL,
  xjtsURL,
  kqbcURL,
  saveNewLeaveBackURL,
  startNewLeaveBackURL,
  nextAssignNewLeaveBackURL,
  saveNewLeaveURL,
  startNewLeaveURL,
  nextAssignNewLeaveURL,
  saveOverTimeURL,
  startOverTimeURL,
  nextAssignOverTimeURL,
  newLeaveInfoByIdURL,
  newLeaveBackListURL,
  getOverproofTelnetURL
}
