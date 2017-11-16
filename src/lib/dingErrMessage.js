const errMessage = {
  ddError: '钉小二睡着了（DC_1）', // dd.error抛出错误信息  ding.js dd.error
  ddConfigInfoError: '钉小二睡着了（DC_2）', // 获取ddConfig 接口错误  ding.js jsApiOAuth
  ddRequestAuthCodeError: '钉小二睡着了（DC_3）', // 获取免登陆码失败 dingUser.js  getRequestAuthCode
  ddConfigPathNUll: '钉小二睡着了,刷新一下叫醒它(DC_4)', // 请求后台签名的url为空
  serverErr: '(s_1)', // 系统错误
  interfaceErr: '(i_2)' // 接口错误
}
export default errMessage;
