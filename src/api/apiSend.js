import axios from './axiosConfig'
// 获取部门
const getPositionURL = '/authapi/ddtalkwf/getPostion'
// 获取费用承担公司
const getBurkListURL = '/authapi/ddtalkwf/getBukrlist'

// 备用金
// 获取备用金类型
const getReserveTypeURL = '/authapi/ddtalkwf/getFundTypeList'

// 员工出差申请
// 获取交通方式(bukrs, appda | Get)
const getTrafficwaysURL = '/authapi/ddtalkwf/getTrafficways'
// 获取出发/到达地点(bukrs | Get)
const getCitysbyBukrsURL = '/authapi/ddtalkwf/getCitysbyBukrs'
// 提交
const startTravelWFURL = '/authapi/ddtalkwf/startTravelWF'

const getPosition = function () {
  return axios.get(getPositionURL);
}
const getBurkList = function () {
  return axios.get(getBurkListURL);
}
const getReserveType = function () {
  return axios.get(getReserveTypeURL);
}
const getTrafficways = function (params) {
  return axios.get(getTrafficwaysURL, {
    params
  });
}
const getCitysbyBukrs = function (params) {
  return axios.get(getCitysbyBukrsURL, {
    params
  });
}

export default {
  getPositionURL,
  getReserveTypeURL,
  getBurkListURL,
  getTrafficwaysURL,
  getCitysbyBukrsURL,
  getPosition,
  getBurkList,
  getReserveType,
  getTrafficways,
  getCitysbyBukrs,
  startTravelWFURL
}
