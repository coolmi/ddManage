<template>
  <div>
    <group title="备用金录入" labelWidth="6.5rem" labelMarginRight="1rem">
      <!-- <popup-picker title="备用金类型" :data="fundTypeList" :columns="1" v-model="formsData.stype" show-name></popup-picker> -->
      <v-search title="备用金类型" :cdata="fundTypeList" v-model="formsData.stype"></v-search>
      <!-- <datetime v-model="formsData.edate" :start-date="systemDate" title="预计归还日期"></datetime> -->
      <calendar v-model="formsData.edate" title="预计归还日期" disable-past></calendar>
      <x-input title="预借金额" placeholder="请填写预借金额" :max=9 v-model="formsData.fwbas"></x-input>
      <cell v-show="fwbas1">{{fwbas1}}</cell>
      <!-- <popup-picker title="币种" :data="waerslist" :columns="1" v-model="formsData.waers" show-name></popup-picker> -->
      <v-search title="币种" :cdata="waerslist" v-model="formsData.waers"></v-search>
      <x-textarea title="申请事由" v-model="formsData.smemo" placeholder="请输入申请事由" :show-counter="false" :rows="3" autosize></x-textarea>
      <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData.uuid"></x-input>
    </group>
    <flexbox class="footerButton">
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import {Group, PopupPicker, XTextarea, XInput, Cell, XButton, Datetime, FlexboxItem, Flexbox, Calendar} from 'vux'
import vSearch from '@/components/searchChecker';
import api from 'api' // 接口
import dataUtils from '../../filters/dataUtils' // 工具类
import whole from '@/lib/whole' // 封装组件库
import moment from 'moment' // 时间类

export default {

  components: {
    Group, PopupPicker, XTextarea, XInput, Cell, XButton, Datetime, FlexboxItem, Flexbox, vSearch, Calendar
  },

  data: () => ({
    formsData: {
      stype: '',
      waers: 'CNY',
      edate: moment().format('YYYY-MM-DD'),
      fwbas: '',
      smemo: '',
      uuid: ''
    },
    systemDate: moment().format('YYYY-MM-DD'),
    waerslist: [],
    fundTypeList: []
  }),

  computed: {
    fwbas1: function () {
      return dataUtils.money2dx(this.formsData.fwbas)
    }
  },

  created() {
    let bukrs = this.$route.query.formsDemo.bukrs
    if (JSON.stringify(this.$route.query.formsDemo.formsData) === '"{}"') {
    } else {
      this.typeList = [{name: '去程', value: '去程'}, {name: '返程', value: '返程'}]
      this.show = true
      this.formsData = JSON.parse(this.$route.query.formsDemo.formsData)
    }
    console.log(this.formsData);
    this.getBaseData(bukrs) // 获取交通方式 + 获取出发/到达地点
  },

  methods: {
    getBaseData(bukrs = {}) {
      let _that = this;
      let params = {
        bukrs: bukrs
      };
      api.getReserveSubData(params, function (res) {
        if (res) {
          // _that.waerslist = dataUtils.getListValue(res.waerslist) // 币种类型
          _that.waerslist = res.waerslist // 币种类型
          // _that.fundTypeList = dataUtils.getListValue(res.fundTypeList) // 备用金类型
          _that.fundTypeList = res.fundTypeList // 备用金类型
        }
      })
    },
    saveReserve () {
      if (this.formsData.stype === '') {
        whole.showTop('请选择备用金类型')
        return;
      }
      if (this.formsData.edate.length === 0) {
        whole.showTop('请选择预计归还日期')
        return;
      }
      if (this.formsData.fwbas === '') {
        whole.showTop('请输入预借金额')
        return;
      }
      if (this.formsData.waers === '') {
        whole.showTop('请选择币种')
        return;
      }

      let formsData = {
        stype: this.formsData.stype,
        edate: this.formsData.edate,
        waers: this.formsData.waers,
        fwbas: this.formsData.fwbas,
        fwbas1: this.fwbas1,
        smemo: this.formsData.smemo,
        uuid: this.formsData.uuid,
        type: 'byj',
        field: 'fwbas'
      }

      this.$store.dispatch('addReserve', formsData)
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
