<template>
  <div>
    <div class="center">
      <img src="/static/images/gmk.jpg" v-if="org === '1'" class="orgimage">
      <img src="/static/images/jinghua.png" v-if="org === '2'">

      <h1 class="vux-title" style="display:none;">
        <span class="demo-icon" slot="icon" style="font-size:60px;color:#35495e;display: block;">&#xe637;</span>
      </h1>
      <p class="vux-notice">v{{version}}</p>
    </div>
    <group>
      <cell title="新功能介绍" link="/newFunc">
      </cell>
      <!--<cell title="通用" link="/setting">-->
      <!--</cell>-->
    </group>
    <br>
    <!--<p class="vue-version">current vue version: {{ vueVersion }}</p>-->
  </div>
</template>

<script>
  import { Cell, Group, Badge, Divider } from 'vux'
  const pkg = require('../../../package.json')
  const version = pkg.version
  const AUTH_DINGTALKCODE = 'auth.dingtalkcode';
  import ding from '@/lib/ding'

  export default {
    components: {
      Cell,
      Group,
      Badge,
      Divider
    },
    data () {
      return {
        version,
        org: '0' // 京华2 新凤祥1
      }
    },
    created() {
      let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code') || ding.getLocation(AUTH_DINGTALKCODE)
      this.org = dingtalkCode === ding.JH_DINGTALK_CODE ? '2' : '1'
    }
  }
</script>

<style scoped>
  .vue-version {
    text-align: center;
    font-size: 12px;
    color: #ccc;
  }
  .center {
    margin-top: 15px;
    text-align: center;
  }
  .vux-notice {
    color: #666;
    line-height: 40px;
  }
  .demo-icon {
    margin-right: 15px;
  }
  .vux-title {
    vertical-align: middle;
    text-align: center;
    color: #04BE02;
    display: inline-block;
    width: 75px;
    height: 75px;
    line-height: 75px;
    border-radius: 50%;
  }
  body {
    font-family: Helvetica, sans-serif;
    background-color: #fbf9fe;
  }
  .demo-tip {
    background-color: #fefcec;
    color: #f76a24;
    font-size: 12px;
    padding: 5px 10px;
    margin-top: 15px;
  }
  .orgimage {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
  }
</style>
