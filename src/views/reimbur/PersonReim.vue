<template>
  <div>
    <group title="基本信息" label-width="7.5rem" value-align="left">
      <v-search title="选择部门" :cdata="positionList" v-model="formsData.department"></v-search>
      <v-search title="费用承担公司" :cdata="burksList" v-model="formsData.burks"></v-search>
      <v-search title="费用归集成本中心" :cdata="burksList" v-model="formsData.kostl"></v-search>
      <x-input title="附件数"></x-input>
      <x-textarea title="说明"></x-textarea>
    </group>
    <sticky :offset="50">
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addPreim()">添加报销单</x-button>
      </box>
    </sticky>
    <group title="备用金列表" v-if="formsData.length > 0">
      <cell v-for="d in formsData" :key="d.uuid" :title="d.yjje" is-link @click.native="addPreim(d)">{{d}}</cell>
    </group>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addPreim" style="color:#00B705">提交</flexbox-item>
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {Box, XButton, PopupPicker, XInput, XTextarea, Group, Cell, FlexboxItem, Flexbox, Sticky} from 'vux'
  import vSearch from '@/components/searchChecker';
  import {mapGetters} from 'vuex'
  import api from 'api'
  import dataUtils from '../../filters/dataUtils'
  import * as _ from 'underscore'
  import whole from '@/lib/whole'

  export default {
    components: {
      Box, XButton, PopupPicker, XInput, XTextarea, Group, Cell, FlexboxItem, Flexbox, Sticky, vSearch
    },
    data() {
      return {
        showKostlPopupPicker: false,
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
//      burksList: function (val) {
//        this.forms.burks[0] = val[0].value
//      }
    },
    created() {
      this.setData() // 填写的时候回退保存值
      this.getBaseData()
    },
    methods: {
      getBaseData() {
        let _that = this;
        api.getPosition(function (res) {
          if (res) {
            _that.positionList = res.positionlist // 转换可识别的样式
            _that.burksList = res.bukrlist // 转换可识别的样式
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
          let _that = this;
          api.getKostal(params, function (res) {
            if (res.data.code && res.data.data) {
              _that.kostlList = dataUtils.getListValue(res.data.data.kostlrulist)
            } else {
              this.showKostlPopupPicker = false
            }
          })
        } else {
          whole.showTop('请选择费用承担公司')
          this.showKostlPopupPicker = false
        }
      },
      addPreim(data = {}) {
        let info = {
          department: this.forms.department[0]
        }
        this.$store.dispatch('addPreimInfo', info)
        this.$router.push({path: '/addPreim', query: {formsData: JSON.stringify(data)}})
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
      },
      saveReserve() {
        console.log(this.forms)
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
