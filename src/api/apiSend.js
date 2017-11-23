import axios from './axiosConfig'
// 获取部门
const getPositionURL = '/authapi/ddtalkwf/getPostion'

const getReserveTypeURL = '/authapi/ddtalkwf/getFundTypeList'
// 获取费用承担公司
const getBurkListURL = '/authapi/ddtalkwf/getBukrlist'

const getPosition = function () {
  return axios.get(getPositionURL);
}
const getReserveType = function () {
  return axios.get(getReserveTypeURL);
}

const getBurkList = function () {
  return axios.get(getBurkListURL);
}

export default {
  getPositionURL,
  getReserveTypeURL,
  getBurkListURL,
  getPosition,
  getReserveType,
  getBurkList
}
