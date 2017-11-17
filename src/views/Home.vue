<template>
  <div>
    <div class="box">
      <div id="content">
        <div id="header">
          <ul class="libox libox1">
            <li class="libox1_li" @click="go(0)">
              <div class="tips">
                <img src="/static/images/sp3.png" alt="none">
                待办列表
              </div>
            </li>
            <li class="libox1_li" @click="go(1)">
              <div class="tips"><img src="/static/images/wj3.png" alt="none">申请中</div>
            </li>
            <li class="libox1_li" @click="go(2)">
              <div class="tips"><img src="/static/images/cs3.png" alt="none">已办理</div>
            </li>
            <li class="libox1_li" @click="go(3)">
              <div class="tips"><img src="/static/images/wj4.png" alt="none">已结束</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--<button @click="go(0)">待办任务</button>-->
    <!--<button @click="go(1)">申请中</button>-->
    <!--<button @click="go(2)">已办理</button>-->
    <!--<button @click="go(3)">已结束</button>-->
    <div>
      <button @click="logout">注销</button>
      <input v-model="itcode">
      <button @click="changeUser">切换用户</button>
    </div>
    <!--<grid>-->
      <!--<grid-item link="/reserve" label="备用金申请"></grid-item>-->
      <!--<grid-item link="/travel" label="出差申请"></grid-item>-->
    <!--</grid>-->
    <!--<group>-->
      <!--<cell title="备用金审批" @click.native="goFlowPage('/reserve')"></cell>-->
    <!--</group>-->
  </div>
</template>

<script>
  import {Grid, GridItem, Group, Cell} from 'vux'
  import dingUser from '@/lib/dingUser'
  import {mapGetters} from 'vuex'
  import api from 'api'
  export default {
    components: {
      GridItem, Grid, Group, Cell
    },
    data () {
      return {
        itcode: ''
      }
    },
    computed: {
      ...mapGetters({
        path: 'getddConfigPath'
      })
    },
    created() {
      this.getUserid();
    },
    methods: {
      getUserid() {
//        let _that = this;
        dingUser.getRequestAuthCode(this.path).then((data) => {
          api.getLogin(data, function (res) {
        })
      })
      },
      goFlowPage(path) {
        this.$router.push({path: path, query: {ifView: true}})
      },
      go(flowIndex) {
        let dd = window.dd
        let _that = this;
        if (this.counter >= 3) {
          this.counter = 0;
          dd.device.notification.prompt({
            message: '请不要连续点击',
            title: '提示',
            buttonLabels: ['确定'],
            onSuccess: function (result) {
              if (result.value === '123456') {
                _that.showDebug = true;
              } else if (result.value === '654321') {
                _that.showDebug = false;
              }
            },
            onFail: function (err) {
            }
          });
        } else {
          this.$router.push({path: '/db', query: {flowIndex: flowIndex}});
        }
      },
      // debug
      changeUser() {
        let _that = this;
        dingUser.getRequestAuthCode(this.path).then((data) => {
          api.getDebugLogin(data, _that.itcode, function (res) {
          if (res.data.code) {
            _that.showPage = 1;
          } else {
            _that.showPage = 2;
          }
        })
      })
      },
      logout() {
        api.getLogout()
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';

  box{
    width:100%;
    height:100%;
    overflow: auto;
    position: absolute;
    top:0;
    left: 0;
  }
  .libox{
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
    background-color: #fff;
    padding-top:1rem;
    padding-bottom:1rem;
  }
  .libox .libox1_li{
    width:24%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .tips{
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    position: relative;
    line-height: 3rem;
  }
</style>
