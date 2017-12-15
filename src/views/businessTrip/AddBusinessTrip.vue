<template>
  <div>
    <group title="出差明细">
      <cell title="类型" v-if="show === true">去程</cell>
      <!-- <popup-picker v-if="show === false" title="类型" :data="typeList" :columns="1" v-model="formsData.tp" show-name></popup-picker> -->
      <v-search v-if="show === false" title="类型" :cdata="typeList" v-model="formsData.tp"></v-search>
      <!-- <datetime v-model="formsData.startda" :start-date="systemDate" title="出发日期"></datetime> -->
      <calendar v-model="formsData.startda" title="出发日期" disable-past></calendar>
      <!-- <datetime v-model="formsData.endda" :start-date="systemDate" title="到达日期"></datetime> -->
      <calendar v-model="formsData.endda" title="到达日期" disable-past></calendar>
      <!-- <popup-picker title="出发地点" :data="tripPlace" :columns="1" v-model="formsData.splace" show-name></popup-picker> -->
      <v-search title="出发地点" :cdata="tripPlace" v-model="formsData.splace"></v-search>
      <!-- <popup-picker title="到达地点" :data="tripPlace" :columns="1" v-model="formsData.eplace" show-name></popup-picker> -->
      <v-search title="到达地点" :cdata="tripPlace" v-model="formsData.eplace"></v-search>
      <!-- <popup-picker title="交通方式" :data="tripTraffic" :columns="1" v-model="formsData.transmodeId" show-name></popup-picker> -->
      <v-search title="交通方式" :cdata="tripTraffic" v-model="formsData.transmodeId"></v-search>
      <x-textarea title="工作内容" v-model="formsData.workc" placeholder="请输入工作内容" :show-counter="false" :rows="3" autosize></x-textarea>
      <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData.uuid"></x-input>
    </group>
    <flexbox class="footerButton">
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import {Group, PopupPicker, Cell, XSwitch, XTextarea, XInput, Sticky, Box, XButton, Datetime, FlexboxItem, Flexbox, Calendar} from 'vux'
import vSearch from '@/components/searchChecker';
import api from 'api' // 接口
import dataUtils from '../../filters/dataUtils' // 工具类
import whole from '@/lib/whole' // 封装组件库
import moment from 'moment' // 时间类

export default {

  components: {
    Group, PopupPicker, Cell, XSwitch, XTextarea, XInput, Sticky, Box, XButton, Datetime, FlexboxItem, Flexbox, vSearch, Calendar
  },

  data: () => ({
    formsData: {
      tp: '',
      splace: '',
      eplace: '',
      transmodeId: '',
      startda: moment().format('YYYY-MM-DD'),
      endda: moment().format('YYYY-MM-DD'),
      workc: '',
      uuid: ''
    },
    systemDate: moment().format('YYYY-MM-DD'),
    tripPlace: [],
    tripTraffic: [],
    typeList: [],
    show: false
  }),

  created() {
    // this.setData() // 填写的时候回退保存值
    let bukrs = this.$route.query.formsDemo.bukrs
    let flag = this.$route.query.formsDemo.flag
    let formsData = this.$route.query.formsDemo.formsData
    if (JSON.stringify(formsData) === '"{}"') {
      if (flag === 0) {
        this.typeList = [{key: '去程', value: '去程'}]
        this.formsData.tp = '去程'
      } else {
        this.typeList = [{key: '返程', value: '返程'}]
        this.formsData.tp = '返程'
      }
    } else {
      this.typeList = [{key: '去程', value: '去程'}, {key: '返程', value: '返程'}]
      this.show = true
      this.formsData = JSON.parse(this.$route.query.formsDemo.formsData)
    }
    this.getBaseData(bukrs) // 获取交通方式 + 获取出发/到达地点
  },

  methods: {
    getBaseData(bukrs = {}) {
      let _that = this;
      let params = {
        bukrs: bukrs
      };
      api.getTrafficCitys(params, params, function (res) {
        if (res) {
          // _that.tripPlace = dataUtils.getListValue(res.cityList) // 地点
          _that.tripPlace = res.cityList // 地点
          // _that.tripTraffic = dataUtils.getListValue(res.waerslist) // 交通方式
          _that.tripTraffic = res.waerslist // 交通方式
        }
      })
    },
    saveReserve () {
      if (this.formsData.tp === '') {
        whole.showTop('请选择类型')
        return;
      }
      if (this.formsData.startda.length === 0) {
        whole.showTop('请选择出发日期')
        return;
      }
      if (this.formsData.endda.length === 0) {
        whole.showTop('请选择到达日期')
        return;
      } else {
        if (moment(this.formsData.endda).isBefore(this.formsData.startda)) {
          whole.showTop('到达日期不能小于结束日期')
          return;
        }
      }
      if (this.formsData.splace === '') {
        whole.showTop('请选择出发地点')
        return;
      }
      if (this.formsData.eplace === '') {
        whole.showTop('请选择到达地点')
        return;
      }
      if (this.formsData.transmodeId === '') {
        whole.showTop('请选择交通方式')
        return;
      }
      if (this.formsData.workc === '') {
        whole.showTop('请填写工作内容')
        return;
      }
      var transmode = dataUtils.getDescValue(this.tripTraffic, this.formsData.transmodeId)

      let formsData = {
        tp: this.formsData.tp,
        startda: this.formsData.startda,
        endda: this.formsData.endda,
        workc: this.formsData.workc,
        splace: this.formsData.splace,
        eplace: this.formsData.eplace,
        transmodeId: this.formsData.transmodeId,
        transmode: transmode,
        uuid: this.formsData.uuid
      }

      console.log(formsData);

      this.$store.dispatch('addBusinessTrip', formsData)
      console.log('保存')
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
.footerButton {
  padding-bottom: 10px;
  text-align: center;
}
</style>
