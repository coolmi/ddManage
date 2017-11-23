<template>
  <div>
    <group>
      <cell title="备用金" link="/reserve"></cell>
      <cell title="出差" link="/travel"></cell>
      <cell title="员工出差申请" link="/businessTrip"></cell>
    </group>
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
      <group gutter="0" label-width="18rem">
        <!--待办-->
        <cell v-for="(item, index) in dbList" :key="index"
              v-if="(flowType === 0 || flowType === '0') && (item.ishidden === '0' || item.ISHIDDEN === 0) && dbList.length > 0"
              :title="item.mytitle"
              :inline-desc="item.START_TIME_ || item.start_time | getLastTimeStr"
              @click.native="toFlowView(item, 'db')">
          <img slot="icon" width="20" class="cellImg"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
        </cell>
      </group>
      <group gutter="0">
        <!--申请中-->
        <cell v-for="(item, index) in sqzList" :key="index"
              v-if="flowType === 1 || flowType === '1'"
              :title="item.PROCDEFNAME_ || item.procdefname_"
              :inline-desc="item.START_TIME_ || item.start_time_ | getLastTimeStr"
              style="font-size: 15px"
              @click.native="toFlowView(item, 'sqz')">
          <div slot="default" style="font-size: .8rem">
            {{item.TASKNAME_ || item.taskname_}}
          </div>
          <img slot="icon" width="20" class="cellImg"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
        </cell>
      </group>
      <group gutter="0">
        <!--已办理-->
        <cell v-for="(item, index) in yblList" :key="index"
              v-if="flowType === 2 || flowType === '2'"
              :title="item.START_USER_NAME || item.start_user_name, item.NAME_ || item.name_ | getTile"
              :inline-desc="item.START_TIME_ || item.start_time_ | getLastTimeStr"
              style="font-size: 15px"
              @click.native="toFlowView(item, 'ybl')">
          <img slot="icon" width="20" class="cellImg"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
        </cell>
      </group>
      <group gutter="0">
        <!--已结束-->
        <cell v-for="(item, index) in yjsList" :key="index"
              v-if="flowType === 3 || flowType === '3'"
              :title="item.PROCDEFNAME_ || item.procdefname_"
              :inline-desc="item.START_TIME_ || item.start_time_ | getLastTimeStr"
              style="font-size: 15px"
              @click.native="toFlowView(item, 'yjs')">
          <img slot="icon" width="20" class="cellImg"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
        </cell>
      </group>
    </div>
    <!--</swiper-item>-->
    <!--</swiper>-->
  </div>
</template>

<script>
  import {Tab, TabItem, Sticky, Swiper, SwiperItem, Cell, Group} from 'vux'
  import flowBN from '@/flow/flowButtonNames'
  import flowRU from '@/flow/flowResponseUtils'
  import flowGLU from '@/flow/flowGetListUtils'
  import api from 'api'
  import ding from '@/lib/ding'
  import dingUser from '@/lib/dingUser'
  import {mapGetters} from 'vuex'
  import whole from '@/lib/whole'

  export default {
    components: {
      Tab,
      TabItem,
      Sticky,
      Swiper,
      SwiperItem,
      Cell,
      Group
    },
    data() {
      return {
        showPage: 0, // 后台请求login 状态码
        dbTab: flowBN.rightButtonName,
        selectedIndex: 0,
        index: 0,
        flowType: 0, // 其实就是index的值
        dbList: [],
        sqzList: [],
        yblList: [],
        yjsList: []
      }
    },
    computed: {
      ...mapGetters({
        path: 'getddConfigPath'
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
        _that.doNext(_that.index)
        _that.selectedIndex = _that.index
        _that.startPush(); // 启动刷新
      })
      this.getUserid();
//      this.setRight(); // 设置右上角按钮
      this.startPush(); // 启动刷新
    },
    methods: {
      startPush() {
        let dd = window.dd;
        let _that = this;
        dd.ready(function () {
          dd.ui.pullToRefresh.enable({
            onSuccess: function() {
              _that.doNext(_that.index);
            },
            onFail: function() {
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
        let _that = this;
        if (flowIndex === 0 || flowIndex === '0') {
          flowRU.getDBList(function (res) {
            _that.dbList = res.list
          })
        } else if (flowIndex === 1 || flowIndex === '1') {
          flowRU.getSQZList(function (res) {
            _that.sqzList = res.list
          })
        } else if (flowIndex === 2 || flowIndex === '2') {
          flowRU.getYBLList(function (res) {
            _that.yblList = res.list
          })
        } else if (flowIndex === 3 || flowIndex === '3') {
          flowRU.getYJSList(function (res) {
            _that.yjsList = res.list
          })
        }
        this.flowType = flowIndex
        ding.stopPush()
      },
      toFlowView(item, type) {
        let flowParams = flowGLU.getList(item, type);
//        this.$store.dispatch('saveFlowParams', flowParams);
        if (type === 'db') {
          this.$router.push({path: '/flowHandle', query: {flowParams: JSON.stringify(flowParams)}})
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
      getTile(first, second, concat = '发起的') {
        return first + concat + second
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .cellImg {
    display: block;
    margin-right: 15px;
  }
</style>
