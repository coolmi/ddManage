let APILIST = {
  // 待办、申请中、已办理、已接受
  dblist_url: '/authapi/gmkcommon/V1/todolist',
  sqzlist_url: '/authapi/gmkcommon/V1/myrunningapplylist',
  ybllist_url: '/authapi/gmkcommon/V1/donelist',
  yjslist_url: '/authapi/gmkcommon/V1/myfinishedapplylist',
  // 根据pernr获取钉钉用户信息
  getduser_url: '/authapi/common/V1/getDingUserInfo',
  // 根据postid获取钉钉用户信息
  getduserbypostid_url: '/authapi/common/V1/getDingUserInfo2',
  // 根据钉钉id获取主岗
  getMPostidByDdid_url: '/authapi/forexmobi/V1/getMPostidByDdid',
  // 待办
  // 详情和权限
  handleinfo_url: '/authapi/forexmobi/V1/handleInfo',
  author_url: '/authapi/forexmobi/V1/authorizedInfo',
  // 获取附件 getflowfiles.jsp
  getflowfiles_url: '/authapi/common/V1/getflowfiles',
  // 审批记录 gethistory.jsp
  gethistory_url: '/authapi/common/V1/appHistory',

  // 打开附件 openfile.jsp
  // openfile_url: '/authapi/common/V1/getflowfile',
  openfile_url: '/authapi/common/V1/getflowfilefordding',
  openDingfile_url: '/authapi/common/V1/getflowfilefordding2',
  openDingfile4Ywfj_url: '/authapi/common/V1/getflowfilefordding3', // 业务附件，非流程附件下的eventsType：openUrl 使用

  // 表单中的选人请求有值时 获取 name
  selectPersonName_url: '/authapi/common/V1/getPositionAndPersionItem',

  // 下一环节 donextsub.jsp
  nextassigne_url: '/authapi/common/V1/nextAssigne',
  nextassignetasklist_url: '/authapi/common/V1/nextAssignTaskList',
  // 确定 docommitesub.jsp
  commite_url: '/authapi/common/V1/commite',

  // 付款的下一环节-单独-特殊
// pay_nextassigne_url : '/authapi/payment/payment/nextAssigne',
// pay_commite_url : '/authapi/payment/payment/commite',

  // 选人 selectuser.jsp
  selectuser_url: '/authapi/common/V1/plusSignList',

  // 加签 转办 dosignplus_and_delegate.jsp
  signplus_url: '/authapi/common/V1/commiteSignPlus',
  delegate_url: '/authapi/common/V1/commiteDelegate',
  cy_url: '/authapi/common/V1/jsoncirculate',
  hq_url: '/authapi/common/V1/jsoncirculate',
  // 已结束详情
  yjs_info_url: '/authapi/forexmobi/V1/viewDetailForm',
  // 获取用户头像 .jsp
  interface_geticon_url: '/authapi/common/V1/geticon',
  // 获取用户信息 .jsp
  interface_getsinglepersoninfo_url: '/authapi/common/V1/getsinglepersoninfo',
  do_claim_task: '/authapi/common/V1/jsonclaimtask',
  // 密码过期校验checkpasstime.jsp
  checkpasswordurl: '/api/updatepass/password/check-timeout',
  // 密码修改
  updatepassurl: '/api/updatepass/password/update-pass',
  // 发送验证码
  send_code_url: '/api/updatepass/password/send-code',
  // 验证验证码
  validate_code_url: '/api/updatepass/password/validate-code',
  // 找回密码
  reset_pass_url: '/api/updatepass/password/reset-pass',

  getBukrsAndKostlByPostid_url: '/authapi/ddtalkwf/getBukrsAndKostlByPostid',
  getIsSelTravel_url: '/authapi/ddtalkwf/getIsSelTravel',
  // 获取出差订单号
  travellist_url: '/authapi/ddtalkwf/getTravelList',
  // 获取交通方式
  // getTrfficWays_url: '/authapi/ddtalkwf/getTrafficWays',
  // 获取交通类型
  getTrfficType_url: '/authapi/ddtalkwf/getTrafficType',
  // 员工报销获取费用承担公司(获取项目类型、费用承担公司、专项内部订单号)
  getBukrlist_url: '/authapi/ddtalkwf/getBukrlist',
  // 根据公司 大类获取交通方式 类型
  getSubMenuList_url: '/authapi/ddtalkwf/getSubMenuList',
  // 根据费用承担公司获取报销币种
  getWaersListByBukrs_url: '/authapi/ddtalkwf/getWaersListByBukrs',
  // 根据员工ddids获取ITCODE
  getUserInfoDdid_url: '/authapi/newleave/getUserInfoByDdid',
  // 根据postid获取个人信息
  getUserInfoPostid_url: '/authapi/ddtalkwf/commoninfo',
  // IT运维派单
  // IT派单根据postid获取个人信息包括所属公司
  getUserinfoForPostid_url: '/authapi/sendsingle/getuserinfo'
  // 获取问题来源类别
}
export default APILIST
