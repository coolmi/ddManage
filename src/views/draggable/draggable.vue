<template>
  <div class="box">
    <div class="littlebox">
      <div class="tiptitle">
        <div class="titlep">
          <p class="titlelarge">审批</p>
        </div>
        <p v-show="!editState" class="tips">（按住拖动调整排序）</p>
        <p class="tipbtn" @click="dragg">{{editText}}</p>
      </div>
      <draggable class="draggbox" v-model="list1"
                 :options="dragOption">
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
        <p class="titlep">发起</p>
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
            url: ('static/logo.png'),
            link: '/home'
          }
        ],
        list3: [
          {
            id: 2,
            name: '会议室',
            url: ('static/logo.png'),
            link: ''
          },
          {
            id: 3,
            name: '出差申请',
            url: ('static/logo.png'),
            link: ''
          },
          {
            id: 4,
            name: '备用金申请',
            url: ('static/logo.png'),
            link: ''
          },
          {
            id: 5,
            name: '报销申请',
            url: ('static/logo.png'),
            link: '/preim'
          },
          {
            id: 6,
            name: '人事申请',
            url: ('static/logo.png'),
            link: ''
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
      clickLink(element) {
        let dingtalkCode = 'APPSERVER'
        let path = element.link !== '' ? element.link : ''
        window.location.href = 'dingtalk://dingtalkclient/page/link?url=' + encodeURI(baseConfig.baseURL + path + '?dingtalk_code=' + dingtalkCode)
      },
      dragg() {
        this.editState = !this.editState
        this.flag = this.editState ? 'bordernone' : 'dashedline'
        this.editText = this.editState ? '编辑' : '完成'
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
    width: 33.3%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-top: 15px;
    /*border: 1px solid #E5E5E5;*/
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
    height: 30px;
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
    height: 30px;
    padding-left: 20px;
    font-size: 16px;
    color: #2a374a;
    line-height: 30px;
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
    left: 80px;
    top: 15px;
  }

  .appimg {
    width: 60%;
  }

  .appinfo {
    margin-top: 5px;
    font-size: 14px;
    color: #2a374a;
  }
</style>
