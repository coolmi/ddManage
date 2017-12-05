<template>
  <div>
    <group title="备用金录入">
      <popup-picker title="备用金类型" :data="fundTypeList" :columns="1" v-model="formsData.stype" show-name></popup-picker>
      <datetime v-model="formsData.edate" :start-date="systemDate" title="预计归还日期"></datetime>
      <x-input title="预借金额" placeholder="请填写预借金额" :max=9 v-model="formsData.dmbtr"></x-input>
      <cell v-show="udmbtr">{{udmbtr}}</cell>
      <popup-picker title="币种" :data="waerslist" :columns="1" v-model="formsData.waers" show-name></popup-picker>
      <x-textarea title="申请事由" v-model="formsData.smemo" placeholder="请输入申请事由" :show-counter="false" :rows="3" autosize></x-textarea>
      <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData.uuid"></x-input>
    </group>
    <flexbox class="footerButton">
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import {Group, PopupPicker, XTextarea, XInput, Cell, XButton, Datetime, FlexboxItem, Flexbox} from 'vux'
import api from 'api' // 接口
import dataUtils from '../../filters/dataUtils' // 工具类
import whole from '@/lib/whole' // 封装组件库
import moment from 'moment' // 时间类

export default {

  components: {
    Group, PopupPicker, XTextarea, XInput, Cell, XButton, Datetime, FlexboxItem, Flexbox
  },

  data: () => ({
    formsData: {
      stype: [],
      waers: [],
      edate: moment().format('YYYY-MM-DD'),
      dmbtr: '',
      smemo: '',
      uuid: ''
    },
    systemDate: moment().format('YYYY-MM-DD'),
    waerslist: [],
    fundTypeList: []
  }),

  computed: {
    udmbtr: function () {
      return dataUtils.money2dx(this.formsData.dmbtr)
    }
  },

  created() {
    let bukrs = this.$route.query.formsDemo.bukrs
    this.formsData = JSON.parse(this.$route.query.formsDemo.formsData)
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
          console.log(res);
          _that.waerslist = dataUtils.getListValue(res.waerslist) // 币种类型
          _that.fundTypeList = dataUtils.getListValue(res.fundTypeList) // 备用金类型
        }
      })
    },
    saveReserve () {
      if (this.formsData.stype.length === 0) {
        whole.showTop('请选择备用金类型')
        return;
      }
      if (this.formsData.edate.length === 0) {
        whole.showTop('请选择预计归还日期')
        return;
      }
      if (this.formsData.dmbtr === 0) {
        whole.showTop('请输入预借金额')
        return;
      }
      if (this.formsData.waers.length === 0) {
        whole.showTop('请选择币种')
        return;
      }

      let formsData = {
        stype: this.formsData.stype,
        edate: this.formsData.edate,
        waers: this.formsData.waers,
        dmbtr: this.formsData.dmbtr,
        smemo: this.formsData.smemo,
        uuid: this.formsData.uuid
      }
      console.log(formsData);

      // this.$store.dispatch('addReserve', formsData)
      // console.log('保存')
      // this.$router.go(-1)
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
