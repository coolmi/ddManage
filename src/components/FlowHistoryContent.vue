<template>
  <div class="timeline">
    <timeline>
      <timeline-item v-for="(hd, index) in historyData" :key="index">
        <card :class="[index === 0 ? 'recent' : '']" class="card" style="color: #4C4C4C">
          <div slot="header" class="weui-panel__hd" style="color: #4C4C4C">
            <p>{{hd.content}}</p>
            <p v-if="hd.totalDuration" style="color: #4C4C4C">已耗时：{{hd.totalDuration}}</p>
          </div>
          <p slot="content" class="card-padding" style="color: #4C4C4C" v-if="index !== 0">{{hd.message}}</p>
          <div class="weui-panel__ft" slot="footer" v-if="hd.time">
            <a class="weui-cell weui-cell_access weui-cell_link" href="javascript:">
              <div class="weui-cell__bd" style="font-size:.75rem; color: #A0A0A0">{{hd.time}}
                <p style="font-size:.75rem; color: #4C4C4C" v-if="hd.duration">环节耗时：{{hd.duration}}</p>
              </div>
            </a>
          </div>
        </card>
      </timeline-item>
    </timeline>
  </div>
</template>

<script>
  import {TransferDom, Popup, Timeline, TimelineItem, Card} from 'vux'

  export default {
    name: 'FlowHistoryContent',
    props: {
      historyData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        html: '',
        showSub: false,
        showCollapse: false
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Popup,
      Timeline,
      TimelineItem,
      Card
    }
  }
</script>

<style scoped lang="less" type="text/less">
  .timeline {
    p {
      color: #888;
      font-size: 0.8rem;
    }
    h4 {
      color: #666;
      font-weight: normal;
    }
    .recent {
      // border: 1px solid @color-wechat-green;
    }
    .card {
      border-radius: 10px;
    }
    .card-padding {
      padding: 15px;
    }
//    .vux-timeline-item-color
  }
</style>
