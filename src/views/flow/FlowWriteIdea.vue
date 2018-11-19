<template>
  <div>
    <group gutter='0'>
      <selector title='审批意见' placeholder='选择审批意见' :options='ideaList' v-model='checkidea'></selector>
      <x-textarea :max='200' :height='200' placeholder='请输入审批意见' v-model='idea'></x-textarea>
      <template v-if="(btype === 'jq' || btype === 'zb' || btype === 'cy' || btype === 'hq') && userInfo.length <= 0">
        <cell @click.native="checkPer()" title="选择人员" is-link></cell>
      </template>
      <cell v-for="u in userInfo" :key="u.emplId" :title="u.name" is-link @click.native="checkPer"
            v-if="userInfo.length > 0">
        <!--<img :src="u.avatar" v-if="u.avatar" slot="icon" width="30" class="userAvatar">-->
      </cell>
    </group>
    <group title="选择一个退回环节" v-if="btnHandleBackJumpList.length > 0">
      <radio :options="btnHandleBackJumpList" v-model="btnHandleBackJumpTask">
      </radio>
    </group>
    <box gap="10px 10px">
      <x-button plain type="primary" @click.native="commitFlow" :disabled="disButton">提交</x-button>
    </box>
    <box gap="10px 10px">
      <x-button type="warn" v-if="userEmplId" @click.native="cancelUser">取消选择</x-button>
    </box>
  </div>
</template>

<script>
  import ding from '@/lib/ding'
  import api from 'api'
  import whole from '@/lib/whole'
  import {XTextarea, Group, Selector, Cell, XButton, Box, Radio} from 'vux'

  export default {
    components: {
      XTextarea,
      Group,
      Selector,
      Cell,
      XButton,
      Box,
      Radio
    },
    data() {
      return {
        btnHandleBackJumpList: [], // 退回前的环节
        btnHandleBackJumpTask: '', // 选择的退回环节
        flowParams: {}, // 流程信息
        btype: '', // 按钮类别
        idea: '', // 意见
        checkidea: '',
        ideaList: ['同意', '拒绝'],
        userInfo: [],
        userName: '选择人员',
        userAvatar: '',
        userEmplId: '',
        zin: '',
        fromPath: '',
        disButton: false
      }
    },
    watch: {
      checkidea: function (val) {
        this.idea = val === '同意' ? val : (val === '拒绝' ? val : '')
      }
    },
    created() {
      this.setLeft();
//      this.setRight();
      let param = this.$route.query.flowParams;
      this.zin = this.$route.query.zin;
      this.fromPath = this.$route.query.fromPath || '';
      if (typeof param === 'string') {
        param = JSON.parse(param);
      }
      this.btype = this.$route.query.btype;
      this.flowParams = param
      if (this.btype === 'th' && param.btnHandleBackJump) { // 驳回选环节
        this.getBtnHandleBackJumpInfo()
      }
      if (this.btype === 'tj' || this.btype === 'zb' || this.btype === 'jq') {
        this.checkidea = '同意'
      } else if (this.btype === 'th') {
        this.checkidea = '拒绝'
      }
      this.flag = this.$route.query.flag;
    },
    methods: {
      getBtnHandleBackJumpInfo() {
        let _that = this;
        api.nextAssignTaskList(_that.flowParams, function (res) {
          if (res.data.msg === 'success') {
            let result = []
            for (let l of res.data.resultList) {
              let a = {};
              a.key = l.taskDefinitionKey
              a.value = l.taskname + '-' + l.username
              result.push(a)
            }
            _that.btnHandleBackJumpList = result;
          }
        })
      },
      // 选择人员
      checkPer() {
        let pickedUsers = [];
        for (let u of this.userInfo) {
          pickedUsers.push(u.emplId);
        }
        let _that = this;
        let dd = window.dd;
        let num = (_that.btype === 'hy' || _that.btype === 'zb') ? 1 : 10000
        let limitTips = '请选择人员'
//        let num = (_that.btype === 'jq' || _that.btype === 'tj') ? 1000 : 1
//        let limitTips = (_that.btype === 'jq') ? '请选择加签人员' : '请选择一位人员'
        dd.ready(function () {
          dd.biz.contact.complexPicker({
            title: '选择人员',
            corpId: ding.getItemInLocation().corpId || ding.CORPID,
            multiple: true,
            limitTips: limitTips,
            maxUsers: num,
            pickedUsers: pickedUsers,
//            pickedDepartments: [],
//            disabledUsers: [],
//            disabledDepartments: [],
//            requiredUsers: [],
//            requiredDepartments: [],
            appId: 126759727,
            permissionType: 'GLOBAL',
            responseUserOnly: false,
            onSuccess: function (result) {
              if (result.users.length > 0) {
                _that.userInfo = result.users;
              } else {
                _that.userInfo = [];
              }
            },
            onFail: function (err) {
              if (err.errorMessage) {
                whole.showTop('获取钉钉权限失败，请退回上一页面重新进入');
              }
            }
          });
        });
        dd.error(function (err) {
          /**
           {
              message:"错误信息",//message信息会展示出钉钉服务端生成签名使用的参数，请和您生成签名的参数作对比，找出错误的参数
              errorCode:"错误码"
           }
           **/
          console.log('dd ding error: ' + window.location.href + JSON.stringify(err));
        });
      },
      // 提交流程
      commitFlow() {
        this.disButton = true;
        let dataStr = {};
        let _that = this;
        let dd = window.dd;
        let flowParams = _that.flowParams
        let isjiaqian_ = flowParams.isjiaqian_;
        let commentMustable_ = flowParams.commentMustable_;
        let commentMustMsg_ = flowParams.commentMustMsg_;
        let selectPerson_ = flowParams.selectPerson_;
        dataStr.KEY_ = flowParams.KEY_;
        dataStr.appid = flowParams.APPID_;
        dataStr.id = flowParams.ID_;
        dataStr.NAME_ = flowParams.NAME_;
        dataStr.issignning = flowParams.issignningA_;
        dataStr.issignplushandle = flowParams.issignplushandleA;
        dataStr.params = flowParams.editArr || {}; // 补填字段
        dataStr.v_S_userchoiceposition = ''
        dataStr.v_S_ownerassignee = ''
        if (_that.btype === 'tj') { // 提交
          dataStr.taskId = flowParams.TASK_ID_;
          dataStr.ctype = 'default';
          dataStr.isagree = true;
          dataStr.comment = _that.idea || '同意';
          if (flowParams.selectPerson_ && flowParams.selectPerson_.selectAble && flowParams.selectPerson_.beforPop) {
            dd.ready(function () {
              dd.biz.contact.complexPicker({
                title: '选择人员并提交',
                corpId: ding.getItemInLocation().corpId || ding.CORPID,
                multiple: true,
                limitTips: '请选择要提交给的人员',
                maxUsers: 1,
                appId: 126759727,
                permissionType: 'GLOBAL',
                responseUserOnly: false,
                onSuccess: function (result) {
                  if (result.users.length > 0) {
                    let ddid = result.users[0].emplId
                    let cparams = {
                      ddid: [ddid]
                    }
                    api.getMPostidByDdid(cparams, function (res) {
                      if (res.data.data && res.data.data.error !== undefined) {
                        whole.showTop('无法获取此人的岗位，请联系HR人员');
                        return;
                      }
                      let beAsigners = res.data.data.postids
                      dataStr.v_S_ownerassignee = beAsigners
                      _that.goNextAssigne(dataStr, selectPerson_, isjiaqian_);
                    });
                  }
                },
                onFail: function (err) {
                  console.log(err)
                }
              });
            });
            _that.disButton = false;
            return
          }
          if (isjiaqian_) {
            dataStr.ctype = 'signplushandle';
            dataStr.isagree = true;
            // 被加签时的提交
            if (_that.idea === '') {
              whole.showTop('意见不能为空')
              _that.disButton = false;
              return;
            }
          }
          if (commentMustable_ && _that.idea === '') {
            whole.showTop(commentMustMsg_)
            _that.disButton = false;
            return;
          }
          _that.goNextAssigne(dataStr, selectPerson_, isjiaqian_);
        } else if (_that.btype === 'th') { // 退回
          dataStr.taskId = flowParams.TASK_ID_;
          if (_that.idea === '') {
            whole.showTop('退回时意见不能为空');
            _that.disButton = false;
            return;
          }
          dataStr.btnHandleBackJumpTask = this.btnHandleBackJumpTask;
          dataStr.ctype = 'adujst';
          dataStr.isagree = false;
          dataStr.comment = _that.idea;
          _that.goNextAssigne(dataStr, selectPerson_, isjiaqian_);
        } else if (_that.btype === 'jq') { // 加签
          dataStr.taskid = flowParams.TASK_ID_;
          if (_that.idea === '') {
            whole.showTop('请填写意见');
            _that.disButton = false;
            return;
          }
          if (_that.userInfo.length <= 0) {
            whole.showTop('请选择人员');
            _that.disButton = false;
            return;
          }
          dataStr.signplusmsg = _that.idea;
          _that.goJQandZb(dataStr);
        } else if (_that.btype === 'zb') { // 转办
          dataStr.taskid = flowParams.TASK_ID_;
          if (_that.userInfo.length <= 0) {
            whole.showTop('请选择人员');
            _that.disButton = false;
            return;
          }
          dataStr.delegatemsg = _that.idea || '同意';
          _that.goJQandZb(dataStr);
        } else if (_that.btype === 'cy') { // 传阅
          dataStr.taskid = flowParams.TASK_ID_;
          if (_that.userInfo.length <= 0) {
            whole.showTop('请选择人员');
            _that.disButton = false;
            return;
          }
          dataStr.delegatemsg = _that.idea || '传阅';
          _that.goCY(dataStr);
        } else if (_that.btype === 'hq') { // 会签
          dataStr.taskid = flowParams.TASK_ID_;
          if (_that.userInfo.length <= 0) {
            whole.showTop('请选择人员');
            _that.disButton = false;
            return;
          }
          dataStr.delegatemsg = _that.idea || '会签';
          _that.goHq(dataStr);
        } else if (_that.btype === 'zf') { // 作废
          let confirmConfig = {
            message: '确认作废此流程？',
            title: '提示',
            buttonLabels: ['确定', '取消'],
            onSuccess: function (result) {
              if (result.buttonIndex === 0) {
                dataStr.taskId = flowParams.TASK_ID_;
                dataStr.businessKey = flowParams.ID;
                dataStr.delegatemsg = _that.idea || '作废';
                _that.goZf(dataStr);
              }
            },
            onFail: function (err) {
            }
          }
          _that.disButton = false;
          ding.confirm(confirmConfig)
        }
      },
      // 加签和转办
      goJQandZb(dataStr) {
        let _that = this;
        let params = {}
        if (this.userInfo.length > 0) {
          let aa = [];
          for (let u of this.userInfo) {
            aa.push(u.emplId);
          }
          params.ddid = aa;
        }
        api.getMPostidByDdid(params, function (res) {
          _that.disButton = false;
          if (res.data.data && res.data.data.error !== undefined) {
            whole.showTop('无法获取此人的岗位，请联系HR人员');
            return;
          }
          let beAsigners = res.data.data.postids
          dataStr.beAsigners = beAsigners
          if (_that.btype === 'zb') {
            api.goDelegate(dataStr, function (res) {
              if (res.data.isrun) {
                whole.showTop('转办完成');
                setTimeout(function () {
                  _that.$router.go(-2);
                })
              } else {
                whole.showTop('提交失败，请重试~');
              }
            })
          } else if (_that.btype === 'jq') {
            api.goSignplus(dataStr, function (res) {
              if (res.data.isrun) {
                whole.showTop('加签完成');
                setTimeout(function () {
                  _that.$router.go(-2);
                })
              } else {
                whole.showTop('提交失败，请重试~');
              }
            })
          }
        })
        _that.disButton = false;
      },
      // 传阅
      goCY(dataStr) {
        let _that = this;
        let params = {}
        if (this.userInfo.length > 0) {
          let aa = [];
          for (let u of this.userInfo) {
            aa.push(u.emplId);
          }
          params.ddid = aa;
        }
        api.getMPostidByDdid(params, function (res) {
          _that.disButton = false;
          if (res.data.data && res.data.data.error !== undefined) {
            whole.showTop('无法获取此人的岗位，请联系HR人员');
            return;
          }
          let beAsigners = res.data.data.postids
          dataStr.beAsigners = beAsigners
          api.goCY(dataStr, function (res) {
            if (res.data.code) {
              whole.showTop('传阅完成');
              setTimeout(function () {
                _that.$router.go(-2);
              })
            } else {
              whole.showTop('提交失败，请重试~');
            }
          })
        })
        _that.disButton = false;
      },
      // 会签
      goHq(dataStr) {
        let _that = this;
        let params = {}
        if (this.userInfo.length > 0) {
          let aa = [];
          for (let u of this.userInfo) {
            aa.push(u.emplId);
          }
          params.ddid = aa;
        }
        api.getMPostidByDdid(params, function (res) {
          _that.disButton = false;
          if (res.data.data && res.data.data.error !== undefined) {
            whole.showTop('无法获取此人的岗位，请联系HR人员');
            return;
          }
          let beAsigners = res.data.data.postids
          dataStr.beAsigners = beAsigners
          api.goHq(dataStr, function (res) {
            if (res.data.code) {
              whole.showTop('会签完成');
              setTimeout(function () {
                _that.$router.go(-2);
              })
            } else {
              whole.showTop('提交失败，请重试~');
            }
          })
        })
        _that.disButton = false;
      },
      // 作废
      goZf(dataStr) {
        let _that = this;
        api.goZf(dataStr, function (res) {
          if (res.data.code) {
            whole.showTop('作废成功');
            setTimeout(function () {
              _that.$router.go(-2);
            })
          } else {
            whole.showTop('提交失败，请重试~');
          }
        })
        _that.disButton = false;
      },
      // 下一步
      goNextAssigne(dataStr, selectPerson_, isjiaqian_) {
        let _that = this;
        api.goNextAssigne(dataStr, function (res) {
          _that.disButton = false;
          let dd = window.dd
          let pickedUsers = [];
          if (_that.userInfo) {
            for (let u of _that.userInfo) {
              pickedUsers.push(u.emplId);
            }
          }
          let data = res.data
          if (data.error || data.err) {
            let errorstr = data.error || data.err;
            ding.alertInfo(errorstr);
            return;
          } else {
            let isend = false;
            if (data.isEnd) {
              isend = data.isEnd.toString();
            } else {
              isend = false;
            }
            let alertstr = data.msg || data.message;
            if (alertstr) {
              if (((selectPerson_.selectAble && !selectPerson_.beforPop) && _that.btype === 'tj' && (isend !== 'true' || isend === true || isjiaqian_)) || (data.canChooseApprover && data.canChooseMultiApprover)) {
                let maxUsers = data.canChooseMultiApprover ? 100 : 1
                let confirmConfig = {
                  message: alertstr,
                  title: '提示',
                  buttonLabels: ['确定', '重新选人', '取消'],
                  onSuccess: function (result) {
                    if (result.buttonIndex === 0) {
                      _that.toCommit(dataStr);
                    } else if (result.buttonIndex === 1) {
                      dd.ready(function () {
                        dd.biz.contact.complexPicker({
                          title: '选择人员',
                          corpId: ding.getItemInLocation().corpId || ding.CORPID,
                          multiple: true,
                          limitTips: '请选择相关人员',
                          maxUsers: maxUsers,
                          pickedUsers: pickedUsers,
                          appId: 126759727,
                          permissionType: 'GLOBAL',
                          responseUserOnly: false,
                          onSuccess: function (result) {
                            if (result.users.length > 0) {
                              let aaname = result.users[0].name
                              let ddid = result.users[0].emplId
                              let cparams = {
                                ddid: [ddid]
                              }
                              api.getMPostidByDdid(cparams, function (res) {
                                if (res.data.data && res.data.data.error !== undefined) {
                                  whole.showTop('无法获取此人的岗位，请联系HR人员');
                                  return;
                                }
                                let beAsigners = res.data.data.postids
                                dataStr.v_S_userchoiceposition = beAsigners
                                let aaconfirmConfig = {
                                  message: '是否提交给' + aaname + '？',
                                  title: '提示',
                                  buttonLabels: ['确定', '取消'],
                                  onSuccess: function (cresult) {
                                    if (cresult.buttonIndex === 0) {
                                      _that.toCommit(dataStr);
                                    }
                                  },
                                  onFail: function (err) {
                                    console.log(err)
                                  }
                                }
                                ding.confirm(aaconfirmConfig)
                              });
                            }
                          },
                          onFail: function (err) {
                            console.log(err)
                          }
                        });
                      });
                    }
                  },
                  onFail: function (err) {
                  }
                }
                ding.confirm(confirmConfig)
              } else {
                let confirmConfig = {
                  message: alertstr,
                  title: '提示',
                  buttonLabels: ['确定', '取消'],
                  onSuccess: function (result) {
                    if (result.buttonIndex === 0) {
                      _that.toCommit(dataStr);
                    }
                  },
                  onFail: function (err) {
                  }
                }
                ding.confirm(confirmConfig)
              }
            } else {
              whole.showTop('服务器未返回信息');
            }
          }
        })
        _that.disButton = false;
      },
      // 提交
      toCommit(dataStr) {
        this.disButton = false;
        let _that = this;
        dataStr.taskId = dataStr.taskid || dataStr.taskId
        api.toCommite(dataStr, function (res) {
          let data = res.data
          if (data.error || data.err) {
            let alertStr = data.error || data.err;
            ding.alertInfo(alertStr);
            return;
          }
//          let showMessage = data.message || data.msg;
          whole.showTop('审批完成');
          //  zin = n 循环flowHandle，即消息链接当前任务已办理完，跳转到下一条
          if (_that.zin === 'abc') {
//            alert(_that.zin);
            setTimeout(function () {
              let dd = window.dd
              dd.biz.navigation.close({
                onSuccess: function (result) {
                },
                onFail: function (err) {
                }
              })
            }, 2000)
            //  消息链接打开相应待办, 审批完成后，跳回工作通知
          } else if (_that.zin !== '') {
            setTimeout(function () {
              let dd = window.dd
              dd.biz.navigation.close({
                onSuccess: function (result) {
                },
                onFail: function (err) {
                }
              })
            }, 2000)
            //  有移动端填写, 退回至待办列表
          } else if (_that.fromPath !== '') {
            setTimeout(function () {
              _that.$router.go(-3);
            })
            //  无移动端填写，退回至待办列表
          } else {
            setTimeout(function () {
              _that.$router.go(-2);
            })
          }
        })
      },
      setRight() {
        let _that = this;
        let rightBtn = {
          text: '确定',
          show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
          control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
          showIcon: true, // 是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
          onSuccess: function (result) {
            let dataStr = {};
            let flowParams = _that.flowParams
            let isjiaqian_ = flowParams.isjiaqian_;
            let commentMustable_ = flowParams.commentMustable_;
            let commentMustMsg_ = flowParams.commentMustMsg_;
            let selectPerson_ = flowParams.selectPerson_;
            dataStr.KEY_ = flowParams.KEY_;
            dataStr.appid = flowParams.APPID_;
            dataStr.id = flowParams.ID_;
            dataStr.NAME_ = flowParams.NAME_;
            dataStr.issignning = flowParams.issignningA_;
            dataStr.issignplushandle = flowParams.issignplushandleA;
            dataStr.params = flowParams.editArr || {}; // 补填字段
            if (_that.btype === 'tj') { // 提交
              dataStr.taskId = flowParams.TASK_ID_;
              dataStr.ctype = 'default';
              dataStr.isagree = true;
              dataStr.comment = _that.idea || '同意';
              if (isjiaqian_) {
                dataStr.ctype = 'signplushandle';
                dataStr.isagree = true;
                // 被加签时的提交
                if (_that.idea === '') {
                  whole.showTop('意见不能为空')
                  return;
                }
              }
              if (commentMustable_ && _that.idea === '') {
                whole.showTop(commentMustMsg_)
                return;
              }
              _that.goNextAssigne(dataStr, selectPerson_, isjiaqian_);
            } else if (_that.btype === 'th') { // 退回
              dataStr.taskId = flowParams.TASK_ID_;
              if (_that.idea === '') {
                whole.showTop('退回时意见不能为空');
                return;
              }
              dataStr.ctype = 'adujst';
              dataStr.isagree = false;
              dataStr.comment = _that.idea;
              _that.goNextAssigne(dataStr, selectPerson_, isjiaqian_);
            } else if (_that.btype === 'jq') { // 加签
              dataStr.taskid = flowParams.TASK_ID_;
              if (_that.idea === '') {
                whole.showTop('请填写意见');
                return;
              }
              if (_that.userInfo.length <= 0) {
                whole.showTop('请选择人员');
                return;
              }
              dataStr.signplusmsg = _that.idea;
              _that.goJQandZb(dataStr);
            } else if (_that.btype === 'zb') { // 转办
              dataStr.taskid = flowParams.TASK_ID_;
              if (_that.userInfo.length <= 0) {
                whole.showTop('请选择人员');
                return;
              }
              dataStr.delegatemsg = _that.idea || '同意';
              _that.goJQandZb(dataStr);
            }
          },
          onFail: function (error) {
          }
        }
        ding.setRight(rightBtn)
      },
      cancelUser() {
        this.userInfo = [];
      },
      setLeft() {
        let leftBtn = {
          text: '取消'
        }
        ding.setLeft(leftBtn)
      }
    }
  }
</script>

<style scoped lang='less'>
  .userAvatar {
    border-radius: 50%;
    margin-right: 10px;
  }
</style>
