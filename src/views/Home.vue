<template>
  <div>
    <button @click="go(0)">待办任务</button>
    <button @click="go(1)">申请中</button>
    <button @click="go(2)">已办理</button>
    <button @click="go(3)">已结束</button>
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
  import { Grid, GridItem, Group, Cell } from 'vux'
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
            onSuccess: function(result) {
              if (result.value === '123456') {
                _that.showDebug = true;
              } else if (result.value === '654321') {
                _that.showDebug = false;
              }
            },
            onFail: function(err) {}
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
</style>
