<template>
  <div>
    <group title="选择类型">
      <checker v-model="checker" class="checkerDiv" default-item-class="checker-item"
               selected-item-class="checker-item-selected">
        <checker-item value="1">{{typeObj[1]}}</checker-item>
        <checker-item value="2">{{typeObj[2]}}</checker-item>
        <checker-item value="3">{{typeObj[3]}}</checker-item>
        <checker-item value="4">{{typeObj[4]}}</checker-item>
        <checker-item value="5">{{typeObj[5]}}</checker-item>
        <checker-item value="6">{{typeObj[6]}}</checker-item>
        <checker-item value="7">{{typeObj[7]}}</checker-item>
      </checker>
    </group>
    <group v-if="checker === '1'" :title="typeObj[checker]">
      <v-search title="选择" :cdata="results" v-model="formsData.jtlx"></v-search>
    </group>
    <group v-if="checker === '2'" :title="typeObj[checker]"></group>
    <group v-if="checker === '3'" :title="typeObj[checker]"></group>
    <group v-if="checker === '4'" :title="typeObj[checker]"></group>
    <group v-if="checker === '5'" :title="typeObj[checker]"></group>
    <group v-if="checker === '6'" :title="typeObj[checker]"></group>
    <group v-if="checker === '7'" :title="typeObj[checker]"></group>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addReserve" style="color:#00B705">继续添加</flexbox-item>
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {
    XTextarea,
    XInput,
    PopupPicker,
    Group,
    Datetime,
    Flexbox,
    FlexboxItem,
    Selector,
    Cell,
    Checker,
    CheckerItem
  } from 'vux'
  import vSearch from '@/components/searchChecker';
  import dataUtils from '../../filters/dataUtils'
  import api from 'api'

  let typeObj = {
    '1': '市内交通',
    '2': '餐费',
    '3': '住宿费',
    '4': '办公费用',
    '5': '培训费',
    '6': '通讯费',
    '7': '礼品费'
  }

  export default {
    components: {
      XTextarea, XInput, PopupPicker, Group, Datetime, Flexbox, FlexboxItem, Selector, Cell, Checker, CheckerItem, vSearch
    },
    data() {
      return {
        formsData: {
          jtlx: ''
        },
        typeObj: typeObj,
        checker: '1',
        results: [
          {
            value: '哈哈',
            key: '1001'
          },
          {
            value: '嘿嘿',
            key: '2001'
          }
        ]
      }
    },
    computed: {
      dxyjje: function () {
        return dataUtils.money2dx(this.formsData.yjje)
      }
    },
    created() {
      let formsData = this.$route.query.formsData
      this.formsData = JSON.parse(formsData)
      this.getBaseData()
    },
    methods: {
      getBaseData() {
        let _that = this;
        api.getBaseData(function (res) {
          if (res) {
            _that.reserveList = res.fundTypeList;
            _that.bzList = res.fundTypeList;
          }
        })
      },
      addPreim() {
//        this.$store.dispatch('addPreim', this.formsData)
//        this.formsData = {}
      },
      saveReserve() {
        console.log(this.formsData)
//        this.$store.dispatch('addPreim', this.formsData)
//        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../../node_modules/vux/src/styles/1px.less';

  .checkerDiv {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
  }

  .checker-item {
    display: flex;
    width: 25%;
    margin: 2px 2px;
    border: 1px solid #ececec;
    padding: 5px 5px;
    text-align: center;
  }

  .checker-item-selected {
    border: 1px solid green;
  }

  .footerButton {
    padding-bottom: 10px;
    text-align: center;
  }
</style>
