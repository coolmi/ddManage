<template>
  <div>
    <group title="基本信息" label-width="7.5rem" value-align="left">
      <v-search title="报销类型" :cdata="rbsTypeList" v-model="forms.rbstype" @on-hide="changerbstype"></v-search>
      <v-search title="选择岗位" :cdata="positionList" v-model="forms.postid" @on-hide="getProtypeInfo"></v-search>
      <x-input title="项目类型" v-model="forms.protype"></x-input>
      <!--<v-search title="项目类型" :cdata="protypeList" v-model="forms.protype"></v-search>-->
      <v-search title="费用承担公司" :cdata="burksList" v-model="forms.burks"></v-search>
      <v-search title="费用归集成本中心"v-if="protype === '0'"  :cdata="kostlList" v-model="forms.kostl" @on-show="changeBurks"></v-search>
      <x-input title="专项内部订单号" v-if="protype === '1'"  v-model="forms.aufnr"></x-input>
      <x-input title="附件数" v-model="forms.attach"></x-input>
      <v-search title="出差申请单号" v-if="show === '0'" :cdata="travelList" v-model="forms.travel" ></v-search>
      <x-textarea title="说明" v-model="forms.instruction" :rows="1"></x-textarea>
    </group>
    <sticky :offset="50">
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addPreim()">添加报销单</x-button>
      </box>
    </sticky>
    <group title="员工报销申请列表" v-if="formsData.length > 0">
      <cell v-for="d in formsData" :key="d.uuid" :title="d.yjje" is-link @click.native="addPreim(d)">{{d}}</cell>
    </group>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addReserve(0)" style="color:#00B705">提交</flexbox-item>
      <flexbox-item @click.native="addReserve(1)" style="color:#FF8519">保存</flexbox-item>
      <!--<flexbox-item class="vux-1px-r" @click.native="addPreim" style="color:#00B705">提交</flexbox-item>
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>-->
    </flexbox>
  </div>
</template>

<script>
  import {Box, XButton, PopupPicker, XInput, XTextarea, Group, Cell, FlexboxItem, Flexbox, Sticky} from 'vux'
  import vSearch from '@/components/searchChecker';
  import api from 'api'
  import {mapGetters} from 'vuex'
  import * as _ from 'underscore'
  import whole from '@/lib/whole'
  // import dataUtils from '../../filters/dataUtils' // 工具类

  export default {
    components: {
      Box, XButton, PopupPicker, XInput, XTextarea, Group, Cell, FlexboxItem, Flexbox, Sticky, vSearch
    },
    data() {
      return {
        showKostlPopupPicker: false,
        forms: {
          rbstype: '',
          postid: '',
          burks: '',
          kostl: '',
          protype: '',
          travel: '',
          attach: '',
          instruction: '',
          aufnr: ''
        },
        positionList: [],
        rbsTypeList: [
          {
            value: '差旅',
            key: '0'
          },
          {
            value: '非差旅',
            key: '1'
          }
        ],
        burksList: [],
        kostlList: [],
        travelList: [],
        protype: '',
        show: '1',
        protypeList: [
          {
            value: '通用',
            key: '0'
          },
          {
            value: '专项',
            key: '1'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        formsData: 'getPersonReimFroms',
        infos: 'getReserveInfos'
      })
    },
    watch: {
     // positionList: function (val) {
     //   this.forms.department[0] = val[0].value
    //  }
//      burksList: function (val) {
//        this.forms.burks[0] = val[0].value
//      }
    },

    created() {
      console.log(this.formsData)
    alert(JSON.stringify(this.formsData))
    //  this.setData() // 填写的时候回退保存值
      this.getBaseData()
    },
    methods: {
      changerbstype() {
        let _that = this
        if (this.forms.rbstype === '0') {
          api.getTravelList(function (res) {
            if (res.data.code) {
              _that.travelList = res.data.data.travelList
              _that.show = '0'
            }
          })
        }
      },
      getProtypeInfo() {
        let _that = this
        let data = {
          postid: this.forms.postid
        }
        api.getProtypeInfo(data, function (res) {
          if (res.data.code) {
            _that.protypeList = res.data.data.burkList
            _that.protype = res.data.data.protype
            _that.forms.protype = res.data.data.proname
            if (_that.protype === '1') {
              _that.forms.aufnr = res.data.data.aufnr
            }
          }
        })
      },
      changeRbs() {
        this.show = this.forms.rbstype[0]
      },
      getBaseData() {
        let _that = this;
        api.getPosition(function (res) {
          if (res) {
            _that.positionList = res.positionlist
            _that.burksList = res.bukrlist // 转换可识别的样式
          }
        })
      },
      changeBurks() {
        if (this.forms.postid.length > 0 && this.forms.burks > 0) {
          let postid = this.forms.postid;
          let bukrs = this.forms.burks;
          let params = {
            postid: postid,
            bukrs: bukrs
          }
          let _that = this;
          api.getKostal(params, function (res) {
            if (res.data.code && res.data.data) {
              _that.kostlList = res.data.data.kostlrulist
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
          forms: this.forms
        }
      //  this.$store.dispatch('addPreimInfo', info)
        this.$router.push({path: '/addPreim', query: {formsData: info}})
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
