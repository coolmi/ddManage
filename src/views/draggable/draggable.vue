<template>
  <div class="box">
    <div class="littlebox" v-for="(l, index) in list">

      <div class="tiptitle tiptwo">
        <div class="titlep">
          <p class="titlelarge">{{l.title}}</p>
        </div>
        <p v-show="!editState" class="tips" v-if="index === 0">（按住拖动调整排序）</p>
        <p class="tipbtn" @click="dragg" v-if="index === 0">{{editText}}</p>
      </div>
      <draggable class="draggbox" v-model="l.item"
                 :options="dragOption">
        <transition-group name="list">
          <div v-for="element in l.item" :key="element.name" class="draggable" @click="clickLink(element)">
            <div class="itembox" :class="flag">
              <img :src="element.url" class="appimg">
              <p class="appinfo">{{element.name}}</p>
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import api from 'api'
  import ding from '@/lib/ding'
  import dingUser from '@/lib/dingUser'
  import {mapGetters} from 'vuex'
  import whole from '@/lib/whole'
  import baseConfig from '@/api/baseConfig'

  export default {
    data() {
      return {
        tiptwo: 'tiptwo',
        editState: true,
        swiperOption: {
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          spaceBetween: 30
        },
        list: [
          {
            title: '我的常用',
            item: [
              {
                id: 1,
                name: '审批',
                url: ('static/images/sp.png'),
                link: '/home',
                type: 'bd'
              }
            ]
          },
          {
            title: '新闻公告',
            item: [
              {
                name: '新闻',
                url: ('static/images/xinw.png'),
                link: 'http://dingtalk.gmkholdings.com:8081',
                type: 'wl'
              },
              {
                name: '公文',
                url: ('static/images/gongw.png'),
                link: 'http://dingtalk.gmkholdings.com:8081/gw',
                type: 'wl'
              },
              {
                name: '公告',
                url: ('static/images/gongg.png'),
                link: 'http://dingtalk.gmkholdings.com:8081/gg',
                type: 'wl'
              },
              {
                name: '集团官网',
                url: ('static/images/guanw.png'),
                link: 'http://www.gmkholdings.com',
                type: 'wl'
              }
            ]
          },
          {
            title: '行政办公',
            item: [
              {
                id: 2,
                name: '会议室',
                url: ('static/images/hys.png'),
                link: 'http://dingtalk.gmkholdings.com:8082',
                type: 'wl'
              },
              {
                id: 3,
                name: '出差',
                url: ('static/images/cc.png'),
                link: '/businessTrip',
                type: 'bd'
              },
              {
                id: 4,
                name: '备用金',
                url: ('static/images/byj.png'),
                link: '/reserve',
                type: 'bd'
              },
              {
                id: 5,
                name: '报销',
                url: ('static/images/bx.png'),
                link: '/preim',
                type: 'bd'
              },
              {
                id: 6,
                name: '会议纪要',
                url: ('static/images/hyjy.png'),
                link: 'http://mm.gmkholdings.com',
                type: 'wl'
              },
              {
                id: 6,
                name: '草稿',
                url: ('static/images/hyjy.png'),
                link: '/saveList',
                type: 'bd'
              }
            ]
          }
        ],
        flag: '',
        editText: '编辑'
      }
    },
    components: {
      draggable,
      swiper,
      swiperSlide
    },
    computed: {
      ...mapGetters({
        path: 'getddConfigPath'
      }),
      dragOption() {
        return {
          animation: 500,
          group: 'description',
          disabled: this.editState,
          ghostClass: 'ghost'
        }
      }
    },
    created() {
      this.getUserid();
      this.setRight(); // 设置右上角按钮
    },
    methods: {
      getUserid() {
        let _that = this;
//        _that.doNext(_that.flowType);
        dingUser.getRequestAuthCode(this.path).then((data) => {
          api.getLogin(data, function (res) {
            if (res.data.code) {
              _that.$store.dispatch('saveLoginStatus', true);
              api.getAppItemList(function (res) {
                if (res.data.code) {
                  _that.list = res.data.data.list.length > 0 ? res.data.data.list : _that.list
                }
              })
            } else {
              whole.showTop('获取钉钉免登权限失败')
            }
          })
        })
      },
      setRight() {
        let dd = window.dd
        let _that = this;
        let rightBtn = {
          text: '切换用户',
          show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
          control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
          showIcon: true, // 是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
          onSuccess: function (result) {
            api.getLogout(function () {
              dd.device.notification.prompt({
                message: '输入itcode',
                title: '提示',
                buttonLabels: ['确定', '取消'],
                onSuccess: function (result) {
                  if (result.buttonIndex === 0) {
                    dingUser.getRequestAuthCode(_that.path).then((data) => {
                      api.getDebugLogin(data, result.value, function (res) {
                        if (res.data.code) {
                          _that.showPage = 1;
                        } else {
                          _that.showPage = 2;
                        }
                      })
                    })
                  }
                },
                onFail: function (err) {
                }
              });
            })
          }
        }
        ding.setRight(rightBtn)
      },
      clickLink(element) {
        if (element.type === 'bd') {
          let dingtalkCode = 'APPSERVER'
          let path = element.link !== '' ? element.link : ''
          window.location.href = 'dingtalk://dingtalkclient/page/link?url=' + encodeURI(baseConfig.baseURL + path + '?dingtalk_code=' + dingtalkCode)
        } else if (element.type === 'wl') {
          let path = element.link
          let dd = window.dd;
          dd.biz.util.openLink({
            url: path, // 要打开链接的地址
            onSuccess: function(result) {

            },
            onFail: function(err) {}
          })
//          window.location.href = 'dingtalk://dingtalkclient/page/link?url=' + encodeURI(path)
        }
      },
      dragg() {
        this.editState = !this.editState
        this.flag = this.editState ? 'bordernone' : 'dashedline'
        this.editText = this.editState ? '编辑' : '完成'
        if (this.editState) {
          let _that = this;
          api.saveAppItem(_that.list, function (res) {
            console.log(res)
          })
        }
      },
      disabled: true,
      draggable: false
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
  }

  .box {
    width: 100%;
    height: 100%;
    margin-top: 10px;
  }

  .draggable {
    width: 25%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-top: 15px;
    /*border:1px solid red;*/
  }

  .itembox {
    height: 80px;
    width: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .dashedline {
    border: 1px dashed #E5E5E5;
  }

  .bordernone {
    border: none;
  }

  .littlebox {
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
  }

  .littlebox > div > span {
    display: flex;
    justify-content: flex-start;
    align-items: left;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    min-height: 120px;
  }

  .draggbox {
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #F1F1F1;
  }

  .tiptitle {
    width: 100%;
    height: 50px;
    /*border: 1px solid #e5e5e5;*/
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
  }

  .tiptwo {
    margin-top: 10px;
  }

  .titlep {
    width: 60%;
    height: 44px;
    padding-left: 20px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #191F25;
    letter-spacing: -0.82px;
    line-height: 44px;
  }

  .titlelarge {

  }

  .tipbtn {
    width: 60px;
    height: 30px;
    color: #60adfb;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    padding-right: 20px;
  }

  .tips {
    font-size: 12px;
    color: #999999;
    position: absolute;
    right: 60px;
    top: 25px;
  }

  .appimg {
    width: 60%;
  }

  .appinfo {
    margin-top: 5px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(25,31,37,0.56);
    letter-spacing: -0.16px;
    line-height: 32px;
  }
</style>
