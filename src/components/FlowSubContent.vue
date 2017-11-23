<template>
  <div class="lzl-cells vux-no-group-title">
    <div v-for="(subC, index) in subforms" :key="index" v-show="!subC.hidden" class="lzl-cells-div">
      <template v-if="subC.subComponents">
        <template v-if="subC.panel_id !== ''">
          <flow-child-card
            :title="subC.title"
            is-link
            :link="{path: '/flowDetails', query: {title: subC.title, ctable: subC.subComponents}}"
            value-align="left">
          </flow-child-card>
        </template>
        <template v-else>
          <divider>{{subC.title}}</divider>
          <flow-sub-content :subforms="subC.subComponents"></flow-sub-content>
        </template>
      </template>
      <template v-else-if="subC.component === 'table_form'">
        <div v-for="(ntable, index) in  subC.ntableForms" :key="index">
          <flow-child-card
            :title="ntable.title"
            :value="ntable.nvalue"
            is-link
            :link="{path: '/flowDetails', query: {title: ntable.title, ctable: JSON.stringify(ntable.nchildtableForms)}}"
            value-align="left"
            v-show="ntable.component !== 'hidden' && !ntable.hidden && !subC.editable">
          </flow-child-card>
        </div>
        <!--<cell v-for="(subTable, index) in subC.tableForms" :key="index" :border-intent="false" :title="subTable.title" value="123" v-show="subC.component !== 'hidden' && subC.component !== 'table_form'"></cell>-->
        <!--<flow-sub-content :subforms="subC.tableForms"></flow-sub-content>-->
      </template>
      <template v-else-if="subC.component === 'table_ccmx'">
        <div v-for="(ntable, index) in  subC.ntableForms" :key="index">
          <flow-child-card
            :title="ntable.title"
            :value="ntable.nvalue"
            is-link
            :link="{path: '/flowDetails', query: {title: ntable.title, ctable: JSON.stringify(ntable.nchildtableForms)}}"
            value-align="left"
            v-show="ntable.component !== 'hidden' && !ntable.hidden && !subC.editable">
          </flow-child-card>
          <!--<acell-->
          <!--:title="ntable.title"-->
          <!--:value="ntable.nvalue"-->
          <!--is-link-->
          <!--:link="{path: '/flowDetails', query: {title: ntable.title, ctable: ntable.nchildtableForms}}"-->
          <!--value-align="left">-->
          </acell>
        </div>
        <!--<cell v-for="(subTable, index) in subC.tableForms" :key="index" :border-intent="false" :title="subTable.title" value="123" v-show="subC.component !== 'hidden' && subC.component !== 'table_form'"></cell>-->
        <!--<flow-sub-content :subforms="subC.tableForms"></flow-sub-content>-->
      </template>
      <template v-else-if="subC.component === 'table'">
        <div v-for="(ntable, index) in  subC.ntableForms" :key="index">
          <flow-child-card
            v-for="(cn, index) in ntable" :key="index"
            :title="cn.title"
            :value="cn.nvalue || cn.value"
            value-align="left"
            v-show="cn.component !== 'hidden' && !subC.hidden && !subC.editable"
          >
          </flow-child-card>
        </div>
      </template>
      <template v-else-if="subC.component === 'textarea'">
        <flow-child-card
          :title="subC.title"
          value-align="left"
          v-show="subC.component !== 'hidden' && !subC.hidden && subC.title && subC.editable === false && !subC.editable"
        >
          <div slot="value">{{subC.nvalue || subC.value}}</div>
        </flow-child-card>
        <!--<x-textarea class="weui-cells" :title="subC.title" :value="subC.nvalue || subC.value"-->
        <!--v-if="subC.nvalue || subC.value"></x-textarea>-->
      </template>
      <template v-else>
        <!--<acell value-align="left" :title="subC.title" :value="subC.nvalue || subC.value"-->
        <!--v-show="subC.component !== 'hidden'" v-if="flag === 'details'"></acell>-->
        <flow-child-card
          :title="subC.title"
          :value="subC.nvalue || subC.value"
          value-align="left"
          v-show="subC.component !== 'hidden' && !subC.hidden && !subC.editable"
        >
        </flow-child-card>
      </template>
    </div>
  </div>
</template>

<script>
  import FlowListCard from 'comp/FlowListCard'
  import FlowChildCard from 'comp/FlowChildCard'
  import {CellFormPreview, XInput, Group, XButton, Cell, Divider, XTextarea} from 'vux'
  import Vue from 'vue'

  export default {
    name: 'FlowSubContent',
    props: {
      subforms: {
        type: Array,
        default() {
          return []
        }
      },
      flag: {
        type: String,
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        html: '',
        showCollapse: false,
        ifColl: (val) => {
          return !val
        }
      }
    },
    methods: {
      changeColl(val) {
        Vue.set(val, 'showCollapse', !val.showCollapse)
        this.showCollapse = val.showCollapse
      }
    },
    components: {
      FlowListCard,
      FlowChildCard,
      CellFormPreview,
      XInput,
      XButton,
      Group,
      Cell,
      Divider,
      XTextarea
    }
  }
</script>

<style lang="less" scoped type="text/less">
  .lzl-cells {
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 17px;
    overflow: hidden;
    position: relative;
  }

  .lzl-cells:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  /*.lzl-cells:before {*/
    /*content: " ";*/
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*height: 1px;*/
    /*border-top: 1px solid #C7C7C7;*/
    /*color: #C7C7C7;*/
    /*transform-origin: 0 0;*/
    /*transform: scaleY(0.5);*/
  /*}*/

  /*.lzl-cells {*/
    /*&:first-child {*/
      /*&:before {*/
        /*display: none;*/
      /*}*/
    /*}*/
  /*}*/
</style>
