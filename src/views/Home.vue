<template>
  <div>
    <div style="height:44px;">
      <sticky :check-sticky-support="false">
        <tab :line-width=2 v-model="index">
          <tab-item class="vux-center" :selected="selectedIndex === index" v-for="(item, index) in dbTab"
                    @click="tabItemClick(item, index)" :key="index">{{item}}
          </tab-item>
        </tab>
      </sticky>
    </div>
    <!--<swiper v-model="index" ref="swiper" :show-dots="false" :threshold="200" id="swiper">-->
    <!--<swiper-item v-for="(item, index) in dblist" :key="index">-->
    <div class="tab-swiper vux-center" ref="list">
      <group gutter="0" label-width="18rem" v-if="(flowType === 0 || flowType === '0') && dbList.length > 0">
        <!--待办 | getDateDiff-->
        <cell v-for="(item, index) in dbList" :key="index"
              v-if="(item.ishidden === '0' || item.ISHIDDEN === 0) && dbList.length > 0"
              :title="item.mytitle ? (item.mytitle || item.MYTITLE) : ((item.START_USER_NAME || item.start_user_name) + '发起了' + (item.NAME_ || item.name_) + ',请办理!')"
              :inline-desc="item.START_TIME_ || item.start_time | getLastTimeStr"
              @click.native="toFlowView(item, 'db')">
          <img slot="icon" width="35" height="35" v-if="item.avatar" class="cellImg"
               :src="item.avatar">
          <div slot="icon" class="cellDiv" v-else>
            {{item.START_USER_NAME || item.start_user_name | getName}}
          </div>
        </cell>
      </group>
      <div v-if="(flowType === 0 || flowType === '0') && ifdb === 1" class="emptyDiv">
        <img src="/static/images/zwsj.png">
      </div>
      <group gutter="0" v-if="flowType === 1 || flowType === '1' && sqzList.length > 0">
        <!--申请中-->
        <cell v-for="(item, index) in sqzList" :key="index"
              :title="item.PROCDEFNAME_ || item.procdefname_"
              :inline-desc="item.START_TIME_ || item.start_time_ | getLastTimeStr"
              style="font-size: 15px"
              @click.native="toFlowView(item, 'sqz')">
          <div slot="default" style="font-size: .8rem">
            {{item.TASKNAME_ || item.taskname_}}
          </div>
          <img slot="icon" width="35" height="35" v-if="sqzcurrentInfo.avatar" class="cellImg"
               :src="sqzcurrentInfo.avatar">
          <div slot="icon" class="cellDiv" v-else-if="sqzcurrentInfo.currentUsername">
            {{sqzcurrentInfo.currentUsername | getName}}
          </div>
        </cell>
      </group>
      <div v-if="(flowType === 1 || flowType === '1') && ifsqz === 1" class="emptyDiv">
        <img src="/static/images/zwsj.png">
      </div>
      <group gutter="0" v-if="flowType === 2 || flowType === '2' && yblList.length > 0">
        <!--已办理-->
        <cell v-for="(item, index) in yblList" :key="index"
              :title="item.mytitle ? (item.mytitle || item.MYTITLE) : ((item.START_USER_NAME || item.start_user_name) + '发起了' + (item.NAME_ || item.name_) + ',请办理!')"
              :inline-desc="item.START_TIME_ || item.start_time_ | getLastTimeStr"
              style="font-size: 15px"
              @click.native="toFlowView(item, 'ybl')">
          <img slot="icon" width="35" height="35" v-if="item.avatar" class="cellImg"
               :src="item.avatar">
          <div slot="icon" class="cellDiv" v-else>
            {{item.START_USER_NAME || item.start_user_name | getName}}
          </div>
        </cell>
        <infinite-loading v-if="yblList.length > 0" @infinite="yblinfiniteHandler"></infinite-loading>
      </group>
      <div v-if="(flowType === 2 || flowType === '2') && ifybl === 1" class="emptyDiv">
        <img src="/static/images/zwsj.png">
      </div>
      <group gutter="0" v-if="flowType === 3 || flowType === '3'">
        <!--已结束-->
        <cell v-for="(item, index) in yjsList" :key="index"
              :title="item.PROCDEFNAME_ || item.procdefname_"
              :inline-desc="item.START_TIME_ || item.start_time_ | getLastTimeStr"
              style="font-size: 15px"
              @click.native="toFlowView(item, 'yjs')">
          <img slot="icon" width="35" height="35" v-if="yjscurrentInfo.avatar" class="cellImg"
               :src="yjscurrentInfo.avatar">
          <div slot="icon" class="cellDiv" v-else-if="yjscurrentInfo.currentUsername">
            {{yjscurrentInfo.currentUsername | getName}}
          </div>
        </cell>
        <infinite-loading v-if="yjsList.length > 0" @infinite="yjsinfiniteHandler"></infinite-loading>
      </group>
      <div v-if="(flowType === 3 || flowType === '3') && ifyjs === 1" class="emptyDiv">
        <img src="/static/images/zwsj.png">
      </div>
    </div>
    <!--</swiper-item>-->
    <!--</swiper>-->
  </div>
</template>

<script>
  import {Tab, TabItem, Sticky, Swiper, SwiperItem, Cell, Group} from 'vux'
  import InfiniteLoading from 'vue-infinite-loading';
  import flowBN from '@/flow/flowButtonNames'
  import flowRU from '@/flow/flowResponseUtils'
  import flowGLU from '@/flow/flowGetListUtils'
  import api from 'api'
  import ding from '@/lib/ding'
  import dingUser from '@/lib/dingUser'
  import {mapGetters} from 'vuex'
  import whole from '@/lib/whole'

  let moment = require('moment');

  export default {
    components: {
      Tab,
      TabItem,
      Sticky,
      Swiper,
      SwiperItem,
      Cell,
      Group,
      InfiniteLoading
    },
    data() {
      return {
        showPage: 0, // 后台请求login 状态码
        dbTab: flowBN.rightButtonName,
        selectedIndex: 0,
        index: 0,
        flowType: 0, // 其实就是index的值
        dbList: [],
        ifdb: 0,
        sqzList: [],
        ifsqz: 0,
        yblList: [],
        ifybl: 0,
        yjsList: [],
        ifyjs: 0,
        sqzcurrentInfo: {},
        yjscurrentInfo: {},
        pageSize: 20,
        pageNo: 1,
        yjsPageNo: 1
      }
    },
    computed: {
      ...mapGetters({
        path: 'getddConfigPath',
        getLoginStatus: 'getLoginStatus',
        itemIndex: 'getItemIndex'
      })
    },
    watch: {
      index: function (val) {
        this.doNext(val)
      }
    },
    created() {
      let _that = this;
      this.$navigation.on('back', (to, from) => {
        _that.pageNo = 1;
        _that.doNext(_that.index)
        _that.selectedIndex = _that.index
        _that.startPush(); // 启动刷新
      })
      if (this.getLoginStatus) {
        this.pageNo = 1;
        this.doNext(this.itemIndex)
        this.selectedIndex = this.itemIndex
        this.startPush(); // 启动刷新
      } else {
        this.getUserid();
        this.setRight(); // 设置右上角按钮
        this.startPush(); // 启动刷新
      }
    },
    methods: {
      yblinfiniteHandler($state) {
        let _that = this;
        _that.pageNo++
        let params = {
          pageNo: _that.pageNo,
          pageSize: _that.pageSize
        }
        flowRU.getYBLList(params, function (res) {
          _that.yblList = _that.yblList.concat(res.page.list)
          $state.loaded();
        })
      },
      yjsinfiniteHandler($state) {
        let _that = this;
        _that.yjsPageNo++
        let params = {
          pageNo: _that.yjsPageNo,
          pageSize: _that.pageSize
        }
        flowRU.getYJSList(params, function (res) {
          _that.yjsList = _that.yjsList.concat(res.page.list)
          _that.yjscurrentInfo = res
          $state.loaded();
        })
      },
      startPush() {
        let dd = window.dd;
        let _that = this;
        dd.ready(function () {
          dd.ui.pullToRefresh.enable({
            onSuccess: function () {
              _that.doNext(_that.index);
            },
            onFail: function () {
            }
          })
        })
      },
      getUserid() {
        let _that = this;
//        _that.doNext(_that.flowType);
        dingUser.getRequestAuthCode(this.path).then((data) => {
          api.getLogin(data, function (res) {
            if (res.data.code) {
              _that.$store.dispatch('saveLoginStatus', true)
              _that.doNext(_that.flowType);
            } else {
              whole.showTop('获取钉钉免登权限失败')
            }
          })
        })
      },
      tabItemClick(item, index) {
        this.selectedIndex = index;
      },
      doNext(flowIndex) {
        this.$store.dispatch('saveItemIndex', flowIndex)
        let _that = this;
        if (flowIndex === 0 || flowIndex === '0') {
          flowRU.getDBList(function (res) {
            if (res.page.count === 0) {
              _that.ifdb = 1
            }
            _that.dbList = res.page.list
          })
        } else if (flowIndex === 1 || flowIndex === '1') {
          flowRU.getSQZList(function (res) {
            if (res.page.count === 0) {
              _that.ifsqz = 1
            }
            _that.sqzList = res.page.list
            _that.sqzcurrentInfo = res
          })
        } else if (flowIndex === 2 || flowIndex === '2') {
          _that.pageNo = 1;
          let params = {
            pageNo: _that.pageNo,
            pageSize: _that.pageSize
          }
          flowRU.getYBLList(params, function (res) {
            if (res.page.count === 0) {
              _that.ifybl = 1
            }
            _that.yblList = res.page.list
          })
        } else if (flowIndex === 3 || flowIndex === '3') {
          _that.pageNo = 1;
          let params = {
            pageNo: _that.pageNo,
            pageSize: _that.pageSize
          }
          flowRU.getYJSList(params, function (res) {
            if (res.page.count === 0) {
              _that.ifyjs = 1
            }
            _that.yjsList = res.page.list
            _that.yjscurrentInfo = res
          })
        }
        this.flowType = flowIndex
        ding.stopPush()
      },
      toFlowView(item, type) {
        let flowParams = flowGLU.getList(item, type);
//        this.$store.dispatch('saveFlowParams', flowParams);
        if (type === 'db') {
          this.$router.push({path: '/flowHandle', query: {abc: 1, flowParams: JSON.stringify(flowParams)}})
        } else {
          this.$router.push({path: '/flowQuery', query: {flowParams: JSON.stringify(flowParams)}})
        }
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
      }
    },
    filters: {
      getName(data) {
        return data.substr(data.length - 2)
      },
      getTile(first, second, concat = '发起的') {
        return first + concat + second
      },
      getDateDiff(dateData) {
        let result = dateData
        let a = moment(dateData);
        let date = new Date()
        let fmt = 'yyyy-MM-dd'
        var o = {
          'M+': date.getMonth() + 1, // 月份
          'd+': date.getDate(), // 日
          'h+': date.getHours(), // 小时
          'm+': date.getMinutes(), // 分
          's+': date.getSeconds(), // 秒
          'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
          'S': date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
          }
        }
        var b = moment(fmt);
        let day = b.diff(a, 'days')
        if (day === 0) {
          result = '今天'
        } else if (day === 1) {
          result = '昨天'
        } else if (day === 2) {
          result = '前天'
        }
        return result
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .cellDiv {
    width: 35px;
    height: 35px;
    line-height: 35px;
    margin-right: 10px;
    font-size: .8rem;
    text-align: center;
    border-radius: 50%;
    color: #FFFFFF;
    background-color: #986526;
  }

  .cellImg {
    display: block;
    margin-right: 10px;
    border-radius: 50%;
  }

  .bottom-load-wrapper {
    line-height: 50px;
    text-align: center;
  }

  .icon-arrow {
    transition: .2s;
    transform: rotate(180deg);
  }

  .icon-loading {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .emptyDiv {
    width:100%;
    height:500px;
    line-height:500px;
    overflow:hidden;
    position:relative;
    text-align:center;
    margin:auto
  }

  .emptyDiv img {
    position:static;
    top:-50%;left:-50%;
    vertical-align:middle
  }
</style>
