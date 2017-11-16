<template>
  <div class="timeline">
    <timeline>
      <timeline-item v-for="(hd, index) in historyData" :key="index">
        <card :header="{title: hd.content}" :footer="{title: hd.time}" :class="[index === 0 ? 'recent' : '']" class="card">
          <p slot="content" class="card-padding" v-if="index !== 0">{{hd.message}}</p>
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
