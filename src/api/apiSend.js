import axios from './axiosConfig'
// 代报销下拉框
const findGPersonURL = '/authapi/ddtalkwf/findGPerson'
// 获取部门
const getPositionURL = '/authapi/ddtalkwf/getPostion'
// 获取费用承担公司
const getBurkListURL = '/authapi/ddtalkwf/getBukrlist'
/**
 * 验证是否获取到用户基本信息
 * @type vfiled ：需要验证的字段，多个用逗号隔开（lifnr："财务编号",pernr,"员工编号",postid,"岗位编号",sysbusinessunitid,"事业部编号",sysdeptid,"部门编号",userid,"itcode",zzdbxjb,"报销级别"）
 */
const validateUserBaseInfoURL = '/authapi/ddtalkwf/validateUserBaseInfo'
const getBurkList1 = '/authapi/ddtalkwf/getBukrlist'
// 获取休假类型
const leaveTypeListURL = '/authapi/newleave/getLeaveTypeList'
const xjtsURL = '/authapi/newleave/getXjts'
const sjXjtsURL = '/authapi/newleaveback/getSjXjts'
const kqbcURL = '/authapi/newleave/getKqbc'
const saveNewLeaveURL = '/authapi/newleave/saveNewLeave'
const startNewLeaveURL = '/authapi/newleave/startNewLeave'
const nextAssignNewLeaveURL = '/authapi/newleave/nextAssignNewLeave'
const saveOverTimeURL = '/authapi/overtime/saveOverTime'
const startOverTimeURL = '/authapi/overtime/startOverTime'
const nextAssignOverTimeURL = '/authapi/overtime/nextAssignOverTime'
const saveNewLeaveBackURL = '/authapi/newleaveback/saveNewLeave'
const startNewLeaveBackURL = '/authapi/newleaveback/startNewLeave'
const nextAssignNewLeaveBackURL = '/authapi/newleaveback/nextAssignNewLeave'
const newLeaveBackListURL = '/authapi/newleaveback/getBackList'
const newLeaveInfoByIdURL = '/authapi/newleaveback/getNewLeaveInfoById'

// 报销
// 员工费用报销--通讯费--获取超标准金额
const getOverproofTelnetURL = '/authapi/ddtalkwf/getOverproofTelnet'

// 备用金
// 获取费用所属事业部(bukrs, appda | Get)
const getBusinessDepartmentURL = '/authapi/ddtalkwf/getBusinessDepartment'
// 获取是否临时岗位（专项）(postid | Get)
const getIsTempOrgURL = 'authapi/ddtalkwf/getIsTempOrg'
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
// 长途交通金额校验
const getOverproofCitytradURL = 'authapi/ddtalkwf/getOverproofCitytrad'
// 住宿机餐补金额校验
const getMealAllwanceURL = 'authapi/ddtalkwf/getMealAllowance'
// 住宿机餐补金额校验超额
const getOverproofHotelURL = 'authapi/ddtalkwf/getOverproofHotel'
// 餐补差额校验
const getOverproofMealFeeURL = 'authapi/ddtalkwf/getOverproofMealFee'
// 员工出差申请
// 获取交通方式(bukrs, appda | Get)
const getTrafficwaysURL = '/authapi/ddtalkwf/getTrafficways'
// 获取出发/到达地点(bukrs | Get)
const getCitysbyBukrsURL = '/authapi/ddtalkwf/getCitysbyBukrs'
// 根据公司 大类获取交通方式 类型
const getSubMenuListURL = '/authapi/ddtalkwf/getSubMenuList'
// 提交验证接口
const nextassigneeTravelWFURL = 'authapi/ddtalkwf/nextassigneeTravelWF'
// 提交验证接口---报销申请
const getnextassigneeFeeAppURL = 'authapi/ddtalkwf/nextassigneeFeeApp'
// 提交
const startTravelWFURL = '/authapi/ddtalkwf/startTravelWF'
// 税率
const getTaxCodeListURL = '/authapi/ddtalkwf/getTaxCodeList'
// 保存
const saveTravelURL = '/authapi/ddtalkwf/saveTravel'
// 费用报销提交
const startFeeAppURL = '/authapi/ddtalkwf/startFeeApp'
// 费用报销保存
const saveFeeAppURL = '/authapi/ddtalkwf/saveFeeApp'
// 获取申请保存列表（draftType: depositApp 备用金申请/ travel 出差申请 / reimburse: 费用报销申请）
const getDraftListURL = '/authapi/ddtalkwf/getDraftList'
// 查看申请保存详情（draftType, appid | Get）
const getDraftDataByIdURL = '/authapi/ddtalkwf/getDraftDataById'
// IT运维派单
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
const getOverproofTelnet = function (params = {}) {
  return axios.get(getOverproofTelnetURL, {
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
const getOverproofCitytrad = function (params = {}) {
  return axios.get(getOverproofCitytradURL, {
    params
  });
}
const getMealAllwance = function (params = {}) {
  return axios.get(getMealAllwanceURL, {
    params
  });
}
const getOverproofHotel = function (params = {}) {
  return axios.get(getOverproofHotelURL, {
    params
  });
}
const getOverproofMealFee = function (params = {}) {
  return axios.get(getOverproofMealFeeURL, {
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
  findGPersonURL,
  getPositionURL,
  getBusinessDepartmentURL,
  getIsTempOrgURL,
  getReserveTypeURL,
  getWaersListByBukrsURL,
  nextassigneeDepositWFURL,
  startDepositWFURL,
  saveDepositResegsURL,
  getColdconamListURL,
  getColdconamList,
  getOverproofCitytrad,
  getMealAllwance,
  getOverproofHotel,
  getOverproofHotelURL,
  getOverproofMealFee,
  getOverproofMealFeeURL,
  getMealAllwanceURL,
  getOverproofLtrad,
  getOverproofLtradURL,
  getColdconamzListURL,
  getColdconamzList,
  getBurkListURL,
  validateUserBaseInfoURL,
  getBurkList1,
  getTrafficwaysURL,
  getCitysbyBukrsURL,
  nextassigneeTravelWFURL,
  getnextassigneeFeeAppURL,
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
  getOverproofTelnet,
  getOverproofTelnetURL,
  saveTravelURL,
  startFeeAppURL,
  saveFeeAppURL,
  getDraftListURL,
  getDraftDataByIdURL,
  leaveTypeListURL,
  xjtsURL,
  sjXjtsURL,
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
  newLeaveBackListURL
}
