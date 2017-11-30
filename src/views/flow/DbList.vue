<template>
  <div>
    <group gutter="0" label-width="18rem">
      <!--待办-->
      <cell v-for="(item, index) in dbList" :key="index"
            v-if="(flowType === 0 || flowType === '0') && (item.ishidden === '0' || item.ISHIDDEN === 0)"
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
            :title="(item.START_USER_NAME || item.start_user_name) + '发起的' + (item.NAME_ || item.name_)"
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
</template>

<script>
  import FlowListCard from 'comp/FlowListCard'
  import {Tab, TabItem, Card, Group, Cell} from 'vux'
  import ding from '@/lib/ding'
  import flowRU from '@/flow/flowResponseUtils'
  import flowBN from '@/flow/flowButtonNames'
  import flowGLU from '@/flow/flowGetListUtils'

  export default {
    components: {
      Tab,
      TabItem,
      Card,
      Group,
      Cell,
      FlowListCard
    },
    data() {
      return {
        dbList: [],
        sqzList: [],
        yblList: [],
        yjsList: [],
        flowType: 0
      }
    },
    created() {
      let flowIndex = this.$route.query.flowIndex || 0;
//      let _that = this;
//      this.$navigation.on('back', (to, from) => {
//        if (from.route.path === '/flowIdea') {
//          _that.getDBList(flowIndex); // 获取待办等
//          _that.setRight()
//          _that.startPush(); // 启动刷新
//        }
//      })
      this.getDBList(flowIndex); // 获取待办等
      this.setRight(); // 设置右上角按钮
      this.startPush(); // 启动刷新
    },
    methods: {
      getDBList(flowIndex = 0) {
        this.doNext(flowIndex);
      },
      // 获取流程数据，禁止刷新，设置标题，设置flowType
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
        this.setTitle(flowIndex)
        ding.stopPush()
      },
      startPush() {
        let dd = window.dd;
        let _that = this;
        dd.ui.pullToRefresh.enable({
          onSuccess: function() {
            _that.getDBList();
          },
          onFail: function() {
          }
        })
      },
      setRight() {
        let dd = window.dd;
        let _that = this;
        let rightBtn = {
          text: '更多',
          show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
          control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
          showIcon: true, // 是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
          onSuccess: function (result) {
            dd.device.notification.actionSheet({
              title: '选择列表',
              cancelButton: '取消',
              otherButtons: flowBN.rightButtonName,
              onSuccess: function (result) {
                if (result.buttonIndex !== -1) {
                  let btnIndex = result.buttonIndex;
                  let flowTypeIndex = flowBN.flowType[flowBN.rightButtonName[btnIndex]];
                  _that.doNext(flowTypeIndex)
                }
              },
              onFail: function (err) {
              }
            })
          }
        }
        ding.setRight(rightBtn)
      },
      setTitle(index) {
        let dd = window.dd
        let config = {
          title: flowBN.flowTile[index]
        }
        dd.ready(function () {
          dd.biz.navigation.setTitle(config);
        });
      },
      toFlowView(item, type) {
        let flowParams = flowGLU.getList(item, type);
//        this.$store.dispatch('saveFlowParams', flowParams);
        if (type === 'db') {
          this.$router.push({path: '/flowHandle', query: {flowParams: JSON.stringify(flowParams)}})
        } else {
          this.$router.push({path: '/flowQuery', query: {flowParams: JSON.stringify(flowParams)}})
        }
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
