<template>
  <div>
    <group title="出差明细">
      <cell v-if="show === true">去程</cell>
      <popup-picker v-if="show === false" title="类型" :data="typeList" :columns="1" v-model="formsData.tp" show-name></popup-picker>
      <datetime v-model="formsData.startda" :start-date="systemDate" title="出发日期"></datetime>
      <datetime v-model="formsData.endda" :start-date="systemDate" title="到达日期"></datetime>
      <popup-picker title="出发地点" :data="tripPlace" :columns="1" v-model="formsData.splace" show-name></popup-picker>
      <popup-picker title="到达地点" :data="tripPlace" :columns="1" v-model="formsData.eplace" show-name></popup-picker>
      <popup-picker title="交通方式" :data="tripTraffic" :columns="1" v-model="formsData.transmodeId" show-name></popup-picker>
      <x-textarea title="工作内容" v-model="formsData.workc" placeholder="请输入工作内容" :show-counter="false" :rows="3" autosize></x-textarea>
      <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData.uuid"></x-input>
    </group>
    <flexbox class="footerButton">
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import {Group, PopupPicker, XSwitch, XTextarea, XInput, Sticky, Box, XButton, Datetime, FlexboxItem, Flexbox} from 'vux'
import api from 'api' // 接口
import dataUtils from '../../filters/dataUtils' // 工具类
import whole from '@/lib/whole' // 封装组件库
import moment from 'moment' // 时间类

export default {

  components: {
    Group, PopupPicker, XSwitch, XTextarea, XInput, Sticky, Box, XButton, Datetime, FlexboxItem, Flexbox
  },

  data: () => ({
    formsData: {
      tp: [],
      splace: [],
      eplace: [],
      transmodeId: [],
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
        this.typeList = [{name: '去程', value: '去程'}]
        this.formsData.tp = ['去程']
      } else {
        this.typeList = [{name: '返程', value: '返程'}]
        this.formsData.tp = ['返程']
      }
    } else {
      this.typeList = [{name: '去程', value: '去程'}, {name: '返程', value: '返程'}]
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
          _that.tripPlace = dataUtils.getListValue(res.cityList) // 交通方式
          _that.tripTraffic = dataUtils.getListValue(res.waerslist) // 交通方式
        }
      })
    },
    // changeBurks() {
    // if (this.forms.department.length > 0 && this.forms.burks > 0) {
    //   let postid = this.forms.department[0];
    //   let bukrs = this.forms.burks[0];
    //   let params = {
    //     postid: postid,
    //     bukrs: bukrs
    //   }
    //   let _that = this;
    //   api.getKostal(params, function (res) {
    //     if (res) {
    //       _that.kostlList = dataUtils.getListValue(res.kostlrulist) // 转换可识别的样式
    //     }
    //   })
    //   } else {
    //     whole.showTop('请选择费用承担公司')
    //     return false
    //   }
    // },
    saveReserve () {
      if (this.formsData.tp.length === 0) {
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
      if (this.formsData.splace.length === 0) {
        whole.showTop('请选择出发地点')
        return;
      }
      if (this.formsData.eplace.length === 0) {
        whole.showTop('请选择到达地点')
        return;
      }
      if (this.formsData.transmodeId.length === 0) {
        whole.showTop('请选择交通方式')
        return;
      }
      if (this.formsData.workc.length === 0) {
        whole.showTop('请填写工作内容')
        return;
      }
      var transmode = dataUtils.getDescValueP(this.tripTraffic, this.formsData.transmodeId)

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
