<template>
  <div id="app">
    <navigation>
      <router-view></router-view>
    </navigation>
    <div v-show="showLoad">
      <div class="mask_transparent"></div>
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="showPopTop" position="top" :show-mask="false" style="z-index: 10000000">
        <div class="position-vertical">
          {{showPopMessage}}
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {TransferDom, Popup, Grid, GridItem, Actionsheet} from 'vux'
  import {mapState, mapGetters} from 'vuex'
  import store from '../src/store'
  import ding from '@/lib/ding'
  import router from './router'
  import api from 'api'
  import dingUser from '@/lib/dingUser'
  import whole from '@/lib/whole'

  const AUTH_DINGTALKCODE = 'auth.dingtalkcode';

  export default {
    directives: {
      TransferDom
    },
    components: {
      Popup,
      Grid,
      GridItem,
      Actionsheet
    },
    computed: {
      ...mapGetters({
        path: 'getddConfigPath',
        getLoginStatus: 'getLoginStatus',
        itemIndex: 'getItemIndex'
      }),
      ...mapState({
        topMessage: state => state.loading.topMessage,
        showTopMessage: state => state.loading.showTopMessage,
        showMore: state => state.loading.showMore,
        isLoading: state => state.loading.isLoading
      })
    },
    watch: {
      showTopMessage: function (val, oldVal) {
        if (val && !oldVal) {
          this.showPopTop = true;
          this.showPopMessage = this.topMessage;
        } else {
          this.showPopTop = false;
        }
      },
      showPopTop(val) {
        if (val) {
          setTimeout(() => {
            store.dispatch('showTopMessage', false);
            this.showPopTop = false
          }, 1800)
        }
      },
      showMore: function (val, oldVal) {
        let dd = window.dd
        let _that = this;
        dd.ready(function () {
          dd.device.notification.actionSheet({
            cancelButton: '取消',
            otherButtons: _that.otherButtons,
            onSuccess: function (result) {
              let buttonIndex = result.buttonIndex
              if (buttonIndex === 0) {
                let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code') || ding.getLocation(AUTH_DINGTALKCODE)
                let ddid = dingtalkCode === 'APPSERVER-JH' ? ding.JH_CONCAT_DDID : ding.W3_CONCAT_DDID
                dd.ready(function () {
                  dd.biz.util.open({
                    name: 'profile',
                    params: {
                      id: ddid,
                      corpId: ding.getItemInLocation().corpId || ding.CORPID
                    },
                    onSuccess: function () {
                    },
                    onFail: function (err) {
                      console.log(err)
                    }
                  });
                })
              } else if (buttonIndex === 1) {
                router.push('/about')
              } else if (buttonIndex === 2) {
                api.getLogout(function () {
                  dd.device.notification.prompt({
                    message: '输入密码',
                    title: '提示',
                    buttonLabels: ['确定', '取消'],
                    onSuccess: function (result) {
                      if (result.buttonIndex === 0) {
                        if (result.value === 'gmklzl') {
                          dd.device.notification.prompt({
                            message: '输入确认密码',
                            title: '提示',
                            buttonLabels: ['确定', '取消'],
                            onSuccess: function (result1) {
                              if (result1.buttonIndex === 0) {
                                dingUser.getRequestAuthCode(_that.path).then((data) => {
                                  api.getDebugLogin(data, result1.value, function (res) {
                                  })
                                })
                              }
                            },
                            onFail: function (err) {
                            }
                          });
                        } else {
                          window.alert('密码错误')
                        }
                      }
                    },
                    onFail: function (err) {
                    }
                  });
                })
              }
            },
            onFail: function (err) {
            }
          })
        })
      },
      isLoading: function (val, oldVal) {
        if (val && !oldVal) {
          this.showLoad = true;
        } else {
          this.showLoad = false;
        }
      }
    },
    data() {
      return {
        showPopTop: false,
        showLoad: false,
        showPopMessage: '',
        otherButtons: ['问题反馈', '关于']
      }
    },
    created() {
      this.setRight();
      let dd = window.dd
      let _that = this;
      dd.ready(function () {
        dd.biz.user.get({
          onSuccess: function (info) {
            if (info.emplId === ding.GMK_LZL || info.emplId === ding.W3_CONCAT_DDID) {
              _that.otherButtons = ['问题反馈', '关于', '移动办公']
            }
          },
          onFail: function (err) {
            console.log(err)
          }
        });
      })
    },
    methods: {
      setRight() {
        let dd = window.dd
        let _that = this;
        dd.ready(function () {
          let rightBtn = {
            text: ding.RIGHT_TOP_TITLE,
            show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
            control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
            showIcon: true, // 是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
            onSuccess: function (result) {
              whole.showMore(!_that.showMore);
            }
          }
          ding.setRight(rightBtn)
        });
      }
    }
  }
</script>

<style>
  @import 'styles/reset.less';

  html, body {
    width: 100%;
    heigth: 100%
  }

  body {
    background-color: #F2F2F2;
    line-height: 1.6;
    font-size: 16px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding-top: constant(safe-area-inset-top);
    padding-left: constant(safe-area-inset-left);
    padding-right: constant(safe-area-inset-right);
    padding-bottom: 10px;
  }

  .position-vertical {
    background-color: #38ADFF;
    color: #fff;
    text-align: center;
    padding: 15px;
  }

  .mask_transparent {
    position: fixed;
    z-index: 5000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.0001);
  }

  .sk-cube-grid {
    position: absolute;
    top: 35%;
    left: 50%;
    margin-left: -30px;
    width: 60px;
    height: 60px;
    text-align: center;
  }

  .sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: #38ADFF;
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  }

  .sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  .sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }

  .sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  @-webkit-keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
  }

  @keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
  }

  .weui-actionsheet_toggle {
    padding-bottom: 10px;
  }
</style>

