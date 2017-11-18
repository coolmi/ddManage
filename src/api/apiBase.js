let APILIST = {
  // 待办、申请中、已办理、已接受
  dblist_url: '/authapi/gmkcommon/V1/todolist',
  sqzlist_url: '/authapi/gmkcommon/V1/myrunningapplylist',
  ybllist_url: '/authapi/gmkcommon/V1/donelist',
  yjslist_url: '/authapi/gmkcommon/V1/myfinishedapplylist',
  // 根据pernr获取钉钉用户信息
  getduser_url: '/authapi/common/V1/getDingUserInfo',
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

  // 表单中的选人请求有值时 获取 name
  selectPersonName_url: '/authapi/common/V1/getPositionAndPersionItem',

  // 下一环节 donextsub.jsp
  nextassigne_url: '/authapi/common/V1/nextAssigne',
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
  reset_pass_url: '/api/updatepass/password/reset-pass'
}
export default APILIST
