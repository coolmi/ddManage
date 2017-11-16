import axios from './axiosConfig'
const getPositionURL = '/authapi/ddtalkwf/getPostion'
const getReserveTypeURL = '/authapi/ddtalkwf/getFundTypeList'
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
