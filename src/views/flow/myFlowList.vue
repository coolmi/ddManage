<template>
  <div class="flow-list">
    <!--<div class="flow-detail-base">-->
      <!--<div class="flow-detail-title">-->
        <!--审批：某某某的请假-->
      <!--</div>-->
      <!--<div class="flow-detail">-->
        <!--<p><span class="detail-title">请假时间:</span><span>2018-01-01</span></p>-->
        <!--<p><span class="detail-title">请假时间:</span><span>2018-01-01</span></p>-->
        <!--<p><span class="detail-title">请假时间:</span><span>2018-01-01</span></p>-->
      <!--</div>-->
      <!--<div class="flow-detail-action">-->
        <!--<span>三分钟前</span>-->
        <!--<div class="flow-detail-action-buttons">123</div>-->
      <!--</div>-->
    <!--</div>-->
    <group gutter="0">
      <cell title="申请中"
            is-link
            :border-intent="false"
            :arrow-direction="showSqz ? 'down' : 'right'"
            @click.native="showSqz = !showSqz"
      >3</cell>
      <template v-if="showSqz">
        <cell-box :border-intent="false" class="sub-item" link="/fh">对公费用报销</cell-box>
        <cell-box class="sub-item">请假申请</cell-box>
        <cell-box class="sub-item">公共费用报销</cell-box>
      </template>
      <cell title="已结束">16</cell>
      <cell title="已办理">8</cell>
    </group>
  </div>

</template>

<script>
  import { GroupTitle, Grid, GridItem } from '../../components'
  import { Group, Cell, CellBox } from 'vux'

  export default {
    components: {
      Group,
      GroupTitle,
      Grid,
      GridItem,
      Cell,
      CellBox
    },
    data() {
      return {
        show: false,
        showSqz: true
      }
    },
    methods: {
      go() {
        this.$router.push('/selected')
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../styles/pro/myFlowList';
</style>
