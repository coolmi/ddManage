import axios from './axiosConfig'
// 获取部门
const getPositionURL = '/authapi/ddtalkwf/getPostion'
// 获取费用承担公司
const getBurkListURL = '/authapi/ddtalkwf/getBukrlist'

// 备用金
// 获取费用所属事业部(bukrs, appda | Get)
const getBusinessDepartmentURL = '/authapi/ddtalkwf/getBusinessDepartment'
// 获取备用金类型(无参数 | Get)
const getReserveTypeURL = '/authapi/ddtalkwf/getFundTypeList'
// 获取币种列表(bukrs, appda | Get)
const getWaersListByBukrsURL = '/authapi/ddtalkwf/getWaersListByBukrs'
// 提交
const startDepositWFURL = '/authapi/ddtalkwf/startDepositWF'
// 保存
const saveDepositResegsURL = 'authapi/ddtalkwf/saveDepositResegs'

// 员工出差申请
// 获取交通方式(bukrs, appda | Get)
const getTrafficwaysURL = '/authapi/ddtalkwf/getTrafficways'
// 获取出发/到达地点(bukrs | Get)
const getCitysbyBukrsURL = '/authapi/ddtalkwf/getCitysbyBukrs'
// 提交
const startTravelWFURL = '/authapi/ddtalkwf/startTravelWF'
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
  startDepositWFURL,
  saveDepositResegsURL,
  getBurkListURL,
  getTrafficwaysURL,
  getCitysbyBukrsURL,
  getPersonReimTrafficTypeURL,
  getPosition,
  getBurkList,
  getReserveType,
  getWaersListByBukrs,
  getTrafficways,
  getCitysbyBukrs,
  getPersonReimTrafficType,
  startTravelWFURL,
  saveTravelURL,
  getDraftListURL,
  getDraftDataByIdURL
}
