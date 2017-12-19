<template>
  <div>
    <group title="基本信息" label-width="7.5rem" value-align="left">
      <v-search title="报销类型" :cdata="rbsTypeList" v-model="forms.rbstype" @on-hide="changerbstype"></v-search>
      <v-search title="选择岗位" :cdata="positionList" v-model="forms.postid" @on-hide="getProtypeInfo"></v-search>
      <x-input title="项目类型" v-model="forms.protype"></x-input>
      <v-search title="费用承担公司" :cdata="burksList" v-model="forms.burks" @on-hide="changeBurks"></v-search>
      <v-search title="费用归集成本中心"v-if="protype === '0'"  :cdata="kostlList" v-model="forms.kostl" ></v-search>
      <x-input title="专项内部订单号" v-if="protype === '1'"  v-model="forms.aufnr"></x-input>
    <!--  <x-input title="附件数" v-model="forms.attach"></x-input>-->
      <v-search title="出差申请单号" v-if="show === '0'" :cdata="travelList" v-model="forms.atrlnr" ></v-search>
      <x-textarea title="说明" v-model="forms.instruction" ></x-textarea>
    </group>
    <sticky :offset="50">
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addPreim()">添加报销单</x-button>
      </box>
    </sticky>
    <group title="员工报销申请列表" v-if="formsData.length > 0" style="margin-bottom: 60px;">
      <cell v-for="d in formsData" :key="d.type" :title="d.type" is-link @click.native="addPreim(d)"></cell>
    </group>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addReserve(0)" style="color:#00B705">提交</flexbox-item>
      <flexbox-item @click.native="addReserve(1)" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
    <div v-transfer-dom>
      <confirm
        v-model="showCon"
        :close-on-confirm="true"
        title="提示"
        @on-confirm="onConfirm">
        <p style="text-align:center;">{{message}}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import {Box, XButton, PopupPicker, XInput, XTextarea, Group, Cell, FlexboxItem, Flexbox, Sticky, Confirm, TransferDomDirective as TransferDom} from 'vux'
  import vSearch from '@/components/searchChecker';
  import api from 'api'
  import {mapGetters} from 'vuex'
  import * as _ from 'underscore'
  import whole from '@/lib/whole'
  import dataUtils from '../../filters/dataUtils' // 工具类

  export default {
    directives: {
      TransferDom
    },
    components: {
      Box, XButton, PopupPicker, XInput, XTextarea, Group, Cell, FlexboxItem, Flexbox, Sticky, vSearch, Confirm
    },
    data() {
      return {
        showCon: false,
        showKostlPopupPicker: false,
        message: '',
        forms: {
          rbstype: '',
          postid: '',
          burks: '',
          kostl: '',
          protype: '',
          atrlnr: '',
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
        parmasOption: {},
        burksList: [],
        kostlList: [],
        dataArray: [],
        formsDataArray: [],
        travelList: [],
        protype: '',
        show: '1'
      }
    },
    computed: {
      ...mapGetters({
        formsData: 'getPersonReimFroms'
       // infos: 'getReserveInfos'
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
    this.$navigation.on('back', (to, from) => {
    var data = dataUtils.getFormData(this.formsData);
    this.dataArray.push(data)
    })
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
        if (this.forms.rbstype === '1') {
          _that.show = '1'
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
              if (_that.kostlList.length === 1) {
                _that.forms.kostl = _that.kostlList[0].key
              }
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
        if (this.forms.rbstype === '') {
          whole.showTop('请选择报销类型')
          return;
        }
        if (this.forms.postid === '') {
          whole.showTop('请选择岗位')
          return;
        }
        if (this.forms.protype === '') {
          whole.showTop('请选择项目类型')
          return;
        }
        if (this.forms.burks === '') {
          whole.showTop('请选择项费用承担公司')
          return;
        }
        if (this.forms.protype === '通用项目') {
          if (this.forms.kostl === '') {
            whole.showTop('请选择费用归集成本中心')
            return;
          }
        }
        if (this.forms.rbstype === '0') {
          if (this.forms.atrlnr === '') {
            whole.showTop('请选择出差申请号')
            return;
          }
        }
        let info = {
          forms: this.forms,
          formsData: JSON.stringify(data)
        }
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
      addReserve(flag) {
        if (this.dataArray.length > 0) {
          if (this.forms.rbstype === '') {
            whole.showTop('请选择报销类型')
            return;
          }
          if (this.forms.postid === '') {
            whole.showTop('请选择岗位')
            return;
          }
          if (this.forms.protype === '') {
            whole.showTop('请选择项目类型')
            return;
          }
          if (this.forms.protype === '0') {
            if (this.forms.burks === '') {
              whole.showTop('请选择费用归集成本中心')
              return;
            }
          }
          if (this.forms.protype === '') {
            whole.showTop('请选择项目类型')
            return;
          }
          var cdburksname = dataUtils.getDescValue(this.burksList, this.forms.burks);
          var cdkostlname = dataUtils.getDescValue(this.kostlList, this.forms.kostl);
          var cdpostidname = dataUtils.getDescValue(this.positionList, this.forms.postid);
          if (this.forms.protype === '通用项目') {
            this.forms.protype = '0'
          }
          if (this.forms.protype === '专项项目') {
            this.forms.protype = '1'
          }
          let parmas = {
            feeApp: {
              proc_inst_id: '',
              gener: '',
              repLLeaderGeneral: false,
              bukrs: '',
              userid: '',
              syspostname: cdpostidname,
              appid: '',
              travleid: '',
              username: '',
              kostl: '',
              bukrsAkostl: '',
              reservconent: '',
              sysdeptid: '',
              appda: new Date().getTime(),
              pernr: '',
              outmonthstandard: '',
              sd: '',
              credentialinfor: '',
              mindappda: '',
              cdbukrsname: cdburksname,
              businessistrue: false,
              inoutbuget: '',
              reserve: 0,
              sysdeptname: '',
              ltype: '',
              sate: '',
              zdgz: '',
              twodepartrespon: false,
              excess: false,
              ed: '',
              id: '',
              excedstand: false,
              pztxt: '',
              standard: false,
              sysbusinessunitid: '',
              sysbusinessunitname: '',
              cdkostlsname: cdkostlname,
              numpg: 1,
              notravle: this.forms.rbstype,
              protype: this.forms.protype,
              postid: this.forms.postid,
              cdbukrs: this.forms.burks,
              cdkostls: this.forms.kostl,
              aufnr: this.forms.aufnr,
              atrlnr: this.forms.atrlnr,
              smemo: this.forms.instruction
            },
            afUser: {
              sumfwbasf_valz: '',
              telpr: '',
              telnr: '',
              bukrs: '',
              userid: '',
              appid: '',
              userd: '',
              sumcdmbtrf_valz: 0,
              sumdmbtrf_valz: 0,
              akostl: '',
              pfach: '',
              bukrsAkostl: '',
              aktext: '',
              gtelpr: '',
              zzdbxjb: '',
              pernr: '',
              upostid: '',
              orgeh: '',
              upostname: '',
              ename: '',
              lifnr: '',
              businessunitname: '',
              pernr1: ''
            },
            data: this.dataArray
          }
          this.parmasOption = parmas;
          let _that = this
          if (flag === 0) {
            api.getnextassigneeFeeAppURL(parmas, function (res) {
              if (res) {
                if (res.data.code) {
                  if (res.data.message) {
                    _that.message = res.data.message;
                    _that.showCon = true;
                  } else if (res.data.error) {
                    _that.showCon = false;
                    whole.showTop(res.data.error);
                  }
                } else {
                  whole.showTop(res.data.message);
                  _that.$store.dispatch('clearPersonReim')
                  _that.$router.go(-1)
                }
              }
            })
          }
          if (flag === 1) {
            api.saveFeeAppURL(parmas, function (res) {
              if (res) {
                if (res.data.code) {
                  whole.showTop(res.data.message);
                  _that.$store.dispatch('clearPersonReim')
                  _that.$router.go(-1)
                } else {
                  whole.showTop(res.data.message);
                  _that.$store.dispatch('clearPersonReim')
                  _that.$router.go(-1)
                }
              }
            })
          }
        } else {
          whole.showTop('请填写报销申请明细');
          return;
        }
      },
      onConfirm () {
        let _that = this
        api.startFeeAppURL(this.parmasOption, function (res) {
          if (res) {
            if (res.data.code) {
              whole.showTop(res.data.message);
              _that.$store.dispatch('clearPersonReim')
              _that.$router.go(-1)
            } else {
              whole.showTop(res.data.message);
              _that.$store.dispatch('clearPersonReim')
              _that.$router.go(-1)
            }
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
