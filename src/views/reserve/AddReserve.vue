<template>
  <div>
    <group labelWidth="6.5rem" gutter="0" labelMarginRight="1rem" value-align="left">
      <selector title="备用金类型" placeholder="请选择" :options="reserveList" v-model="formsData.reserveType"></selector>
      <datetime title="预计归还日期" placeholder="请选择" valueTextAlign="left" v-model="formsData.ghdate"></datetime>
      <x-input title="预借金额" placeholder="请填写" required :max=9 v-model="formsData.yjje"></x-input>
      <cell v-show="dxyjje">{{dxyjje}}</cell>
      <selector title="币种" placeholder="请选择" direction="right" :options="bzList" v-model="formsData.bz"></selector>
      <x-textarea title="申请事由" placeholder="请填写" v-model="formsData.sqsy"></x-textarea>
      <x-input v-show="false" v-model="formsData.uuid"></x-input>
    </group>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addReserve" style="color:#00B705">继续添加</flexbox-item>
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { XTextarea, XInput, PopupPicker, Group, Datetime, Flexbox, FlexboxItem, Selector, Cell } from 'vux'
  import dataUtils from '../../filters/dataUtils'
  import api from 'api'

  export default {
    components: {
      XTextarea, XInput, PopupPicker, Group, Datetime, Flexbox, FlexboxItem, Selector, Cell
    },
    data() {
      return {
        formsData: {
          reserveType: '',
          ghdate: '',
          yjje: '',
          bz: '',
          sqsy: '',
          uuid: ''
        },
        aa: '123',
        reserveList: [],
        bzList: []
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
      addReserve() {
        this.$store.dispatch('addReserve', this.formsData)
        this.formsData = {}
      },
      saveReserve() {
        this.$store.dispatch('addReserve', this.formsData)
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../../node_modules/vux/src/styles/1px.less';
  .footerButton {
    text-align: center;
  }
</style>
