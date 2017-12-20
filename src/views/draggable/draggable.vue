<template>
  <div class="box">
    <div class="littlebox">
      <div class="tiptitle">
        <div class="titlep">
          <p class="titlelarge">我的常用</p>
        </div>
        <p v-show="!editState" class="tips">（按住拖动调整排序）</p>
        <p class="tipbtn" @click="dragg">{{editText}}</p>
      </div>
      <draggable class="draggbox" v-model="list1"
                 :options="dragOption"  :move="getdata" @update="datadragEnd">
        <transition-group name="list1" min-height="50px">
          <div v-for="element in list1" :key="element.id" class="draggable" @click="clickLink(element)">
            <div class="itembox" :class="flag">
              <img :src="element.url" class="appimg">
              <p class="appinfo">{{element.name}}</p>
            </div>
          </div>
        </transition-group>
      </draggable>
      <div class="tiptitle tiptwo">
        <p class="titlep">新闻公告</p>
      </div>
      <draggable class="draggbox" v-model="list2"
                 :options="dragOption">
        <transition-group name="list2">
          <div v-for="element in list2" :key="element.id" class="draggable" @click="clickLink(element)">
            <div class="itembox" :class="flag">
              <img :src="element.url" class="appimg">
              <p class="appinfo">{{element.name}}</p>
            </div>
          </div>
        </transition-group>
      </draggable>
      <div class="tiptitle tiptwo">
        <p class="titlep">行政办公</p>
      </div>
      <draggable class="draggbox" v-model="list3"
                 :options="dragOption">
        <transition-group name="list3">
          <div v-for="element in list3" :key="element.id" class="draggable" @click="clickLink(element)">
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
  import api from 'api'
  import ding from '@/lib/ding'
  import dingUser from '@/lib/dingUser'
  import {mapGetters} from 'vuex'
  import whole from '@/lib/whole'
  import baseConfig from '@/api/baseConfig'

  export default {
    data() {
      return {
        editState: true,
        list1: [
          {
            id: 1,
            name: '审批',
            url: ('static/images/sp.png'),
            link: '/home',
            type: 'bd'
          }
        ],
        list2: [
          {
            id: 7,
            name: '新闻',
            url: ('static/images/xinw.png'),
            link: '/saveList',
            type: 'wl'
          },
          {
            id: 8,
            name: '公文',
            url: ('static/images/gongw.png'),
            link: '/saveList',
            type: 'wl'
          },
          {
            id: 9,
            name: '公告',
            url: ('static/images/gongg.png'),
            link: '/saveList',
            type: 'wl'
          }
        ],
        list3: [
          {
            id: 2,
            name: '会议室',
            url: ('static/images/hys.png'),
            link: 'http://10.5.1.253:10086',
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
            name: '我保存的',
            url: ('static/images/bcd.png'),
            link: '/saveList',
            type: 'bd'
          }
        ],
        flag: '',
        editText: '编辑'
      }
    },
    components: {
      draggable
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
//      this.setRight(); // 设置右上角按钮
    },
    methods: {
      getUserid() {
        let _that = this;
//        _that.doNext(_that.flowType);
        dingUser.getRequestAuthCode(this.path).then((data) => {
          api.getLogin(data, function (res) {
            if (res.data.code) {
              _that.$store.dispatch('saveLoginStatus', true)
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
          window.location.href = 'dingtalk://dingtalkclient/page/link?url=' + encodeURI(path)
        }
      },
      dragg() {
        alert('1222')
        this.editState = !this.editState
        this.flag = this.editState ? 'bordernone' : 'dashedline'
        this.editText = this.editState ? '编辑' : '完成'
        alert('12121212')
      },
      getdata(evt) {
        console.log(evt.draggedContext.element.id)
      },
      datadragEnd (evt) {
        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
        let nIndex = evt.newIndex
        console.log(nIndex)
        console.log(this.tags)
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
    border:1px solid red;
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
    height: 50px;
    padding-left: 20px;
    font-size: 16px;
    color: #2a374a;
    line-height: 50px;
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
    color: #2a374a;
    font-family: PingFangSC-Regular;
  }
</style>
