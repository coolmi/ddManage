<template>
  <div>
    <group title="基本信息">
      <popup-picker v-if="!ifView" title="选择部门" :data="positionList" v-model="forms.department" :columns="3" show-name></popup-picker>
      <popup-picker v-if="!ifView" title="费用承担公司" :data="burksList" v-model="forms.burks" :columns="3" show-name></popup-picker>
      <popup-picker v-if="!ifView" title="费用归集成本中心" :data="kostlList" v-model="forms.kostl" :columns="3" show-name  @on-show="changeBurks"></popup-picker>
      <cell v-else title="选择部门"  :value="forms.department"></cell>
    </group>
    <sticky :offset="50" v-if="!ifView">
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addReserve()">添加备用金</x-button>
      </box>
    </sticky>
    <group title="备用金列表" v-if="formsData.length > 0">
      <cell v-for="d in formsData" :key="d.uuid" :title="d.yjje" is-link @click.native="addReserve(d)">{{d}}</cell>
    </group>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addReserve" style="color:#00B705">提交</flexbox-item>
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {Box, XButton, PopupPicker, Group, Cell, FlexboxItem, Flexbox, Sticky} from 'vux'
  import {mapGetters} from 'vuex'
  import api from 'api'
  import dataUtils from '../../filters/dataUtils'
  import * as _ from 'underscore'
  import whole from '@/lib/whole'

  export default {
    components: {
      Box, XButton, PopupPicker, Group, Cell, FlexboxItem, Flexbox, Sticky
    },
    data() {
      return {
        ifView: false,
        forms: {
          department: [],
          burks: [],
          kostl: []
        },
        positionList: [],
        burksList: [],
        kostlList: []
      }
    },
    computed: {
      ...mapGetters({
        formsData: 'getReserveFroms',
        infos: 'getReserveInfos'
      })
    },
    watch: {
      positionList: function (val) {
        this.forms.department[0] = val[0].value
      }
    },
    created() {
      let ifView = this.$route.query.ifView;
      this.ifView = ifView
      this.setData() // 填写的时候回退保存值
      this.getBaseData()
    },
    methods: {
      getBaseData() {
        let _that = this;
        api.getPosition(function (res) {
          if (res) {
            _that.positionList = dataUtils.getListValue(res.positionlist)
            _that.burksList = dataUtils.getListValue(res.bukrlist)
          }
        })
      },
      changeBurks() {
        if (this.forms.department.length > 0 && this.forms.burks > 0) {
          let postid = this.forms.department[0];
          let bukrs = this.forms.burks[0];
          let params = {
            postid: postid,
            bukrs: bukrs
          }
          api.getKostal(params, function (res) {
            console.log(res)
          })
        } else {
          whole.showTop('请选择费用承担公司')
          return false
        }
      },
      addReserve(data = {}) {
        let info = {
          department: this.forms.department[0]
        }
        this.$store.dispatch('addReserveInfo', info)
        this.$router.push({path: '/addReserve', query: {formsData: JSON.stringify(data)}})
      },
      setData() {
        let forms = this._data.forms;
        let _that = this;
        Object.keys(forms).forEach(key => {
          if (_.isArray(_that.forms[key])) {
            _that.forms[key][0] = _that.infos[key]
          } else {
            _that.forms[key] = _that.infos[key]
          }
        })
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
