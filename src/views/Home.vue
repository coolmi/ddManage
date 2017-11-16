<template>
  <div>
    <div id="header">
      <ul class="libox libox1">
        <li class="true-li">
          <div @click="go(0)"><img src="../../static/images/1.png" alt="none">
            <p class="tt">待办任务</p></div>
        </li>
        <li class="true-li">
          <div @click="go(1)"><img src="../../static/images/1.png" alt="none">
            <p class="tt">申请中</p></div>
        </li>
        <li class="true-li">
          <div @click="go(2)"><img src="../../static/images/1.png" alt="none">
            <p class="tt">已办理</p></div>
        </li>
        <li class="true-li">
          <div @click="go(3)"><img src="../../static/images/1.png" alt="none">
            <p class="tt">已结束</p></div>
        </li>
      </ul>
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
    <grid>
      <grid-item link="/reserve" label="备用金申请"></grid-item>
      <grid-item link="/travel" label="出差申请"></grid-item>
    </grid>
    <group>
      <cell title="备用金审批" @click.native="goFlowPage('/reserve')"></cell>
    </group>
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

  .libox {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
    background-color: #fff;
  }

  .libox .true-li {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .libox1 {
    box-sizing: content-box;
    padding-top: 2rem;
    padding-bottom: 2rem;
    margin-bottom: 1rem;
  }

  .tt {
    display: flex;
    justify-content: center;
  }
</style>
