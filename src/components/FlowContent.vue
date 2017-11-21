<template>
  <div class="flow_content">
    <div v-for="item in contentdata.forms" :key="item.pageid">
      <!--&& item.pageid !== 'jbxx' && item.pageid !== 'sqxx' && item.pageid !== 'sqrxx'-->
      <!--<div class="itemTitle" v-if="item.title && item.pageid !== 'fjxx' && item.pageid !== 'spjl' && item.pageid !== 'jbxx'">{{item.title}}</div>-->
      <group gutter="2">
        <cell class="itemTitle" v-if="item.title && item.pageid !== 'fjxx' && item.pageid !== 'spjl'"
              :title="item.title" is-link :arrow-direction="item.showContent ? 'down' : 'left'"
              @click.native="item.showContent = !item.showContent"></cell>
        <!--{{item.showContent ? '隐藏': '展开'}}-->
      </group>
      <flow-sub-content v-show="item.showContent" :ref="item.pageid" style="margin-top: 0"
                        :subforms="item.subComponents"
                        v-if="item.subComponents && item.pageid !== 'fjxx' && item.pageid !== 'spjl'"></flow-sub-content>
    </div>
  </div>
</template>

<script>
  import flowc from '@/flow/flowContentUtils'
  import FlowSubContent from 'comp/FlowSubContent'
  import FlowEditSubContent from 'comp/FlowEditSubContent'
  import {XInput, Group, XButton, Cell, Divider, Popup, XTextarea} from 'vux'
  //  import acell from 'comp/cell'

  export default {
    name: 'FlowContent',
    props: {
      contentdata: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        html: '',
        showSub: false,
        showCollapse: false,
        showEdit: true
      }
    },
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      Divider,
      FlowSubContent,
      FlowEditSubContent,
//      acell,
      Popup,
      XTextarea
    },
    created() {
      this.html = flowc.setFlowContent(this.forms)
      this.getEleByForms(this.forms)
    },
    methods: {
      getEleByForms(forms) {
//        console.log(forms)
      },
      showcell(pageid) {
        console.log(this.$refs[pageid])
        console.log(pageid)
      }
    }
  }
</script>

<style scoped lang="less">
  .flow_content {
    margin-bottom: 4rem;
  }

  .itemTitle {
    margin-top: @item-title-margin-top;
    margin-bottom: @item-title-margin-bottom;
    padding-left: @itemGapH;
    padding-right: @itemGapH;
    color: @theme-color;
    font-size: @cell-tips-font-size;
  }

  .popdiv {
    width: 95%;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 5px;
    padding-top: 10px;
  }
</style>
