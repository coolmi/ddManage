<template>
  <div>
    <group title="申请信息">
      <!--<x-input v-model="forms.userid" title="itcode" v-show="false"></x-input>-->
      <!--<x-input v-model="forms.pernr" title="员工编号" v-show="false"></x-input>-->
      <!--<x-input v-model="forms.username" title="姓名" v-show="false"></x-input>-->
      <!--<x-input v-model="forms.postid" title="岗位" v-show="false"></x-input>-->
      <!--<x-input v-model="forms.syspostname" title="岗位名称" v-show="false"></x-input>-->
      <!--<x-input v-model="forms.sysdeptid" title="部门编号" v-show="false"></x-input>-->
      <!--<x-input v-model="forms.sysdeptname" title="部门名称" v-show="false"></x-input>-->
      <!--<x-input v-model="forms.sysbusinessunitid" title="事业部编号" v-show="false"></x-input>-->
      <!--<x-input v-model="forms.sysbusinessunitname" title="事业部名称" v-show="false"></x-input>-->
      <!--<x-input v-model="forms.holidaytypename" title="休假类型名称" v-show="false"></x-input>-->

      <!--<v-search title="选择岗位" :cdata="positionList" v-model="forms.postid"></v-search>-->
      <x-input title="休假单号" v-show="false" v-model="forms.leaveappid" ></x-input>
      <x-input title="休假类型" v-show="false" v-model="forms.holidaytype" ></x-input>
      <x-input title="休假类型" v-show="true" v-model="forms.holidaytypename" readonly></x-input>
      <x-input title="病假类型" v-show="holidaytype==='B01'" v-model="forms.bjlx" readonly></x-input>
      <x-input title="直系亲属" v-show="holidaytype==='A05'" v-model="forms.zxqs" readonly></x-input>

      <datetime v-model="forms.sdate" format="YYYY-MM-DD" title="开始日期" readonly></datetime>
      <datetime v-model="forms.timea" format="HH:mm" title="开始时间" v-show="isshowsj" readonly></datetime>
      <v-search title="开始日班次" :cdata="bcaList" v-show="isshowbc" v-model="forms.dutya" readonly></v-search>

      <datetime v-model="forms.edate" format="YYYY-MM-DD" title="结束日期" readonly></datetime>
      <v-search title="结束日班次" :cdata="bcbList" v-show="isshowbc" v-model="forms.dutyb" readonly></v-search>
      <datetime v-model="forms.timeb" format="HH:mm" title="结束时间" v-show="isshowsj" readonly></datetime>
      <x-input title="休假天数" v-show="true" v-model="forms.thisdays" readonly></x-input>

      <datetime v-model="forms.acsdate" format="YYYY-MM-DD" title="实际开始日期" aria-disabled="true" readonly></datetime>
      <datetime v-model="forms.actimea" format="HH:mm" title="实际开始时间" v-show="isshowsj" aria-disabled="true" ></datetime>
      <v-search title="实际开始日班次" :cdata="bcaList" v-show="isshowbc" v-model="forms.acdutya" aria-disabled="true"></v-search>

      <datetime v-model="forms.acedate" format="YYYY-MM-DD" title="实际结束日期"></datetime>
      <v-search title="实际结束日班次" :cdata="bcbList" v-show="isshowbc" v-model="forms.acdutyb"></v-search>
      <datetime v-model="forms.actimeb" format="HH:mm" title="实际结束时间" v-show="isshowsj"></datetime>

      <!--<x-input :readonly="true" v-model="forms.thisdays" title="休假天数"></x-input>-->
      <cell title="实际休假天数" v-show="true">{{forms.actualdays}}</cell>
      <x-input title="自然天数" v-show="false" v-model="forms.comdays"></x-input>
      <x-input title="剩余额度(时)" v-show="thisdays" v-model="forms.surplus"></x-input>
      <x-textarea title="请假原因" v-model="readks" placeholder="" :show-counter="false" :rows="3" autosize></x-textarea>
      <x-input title="存休类型" v-show="false" v-model="forms.suebreak"></x-input>
      <x-input title="存休类型" v-show="false" v-model="forms.effecta"></x-input>
      <x-input title="存休类型" v-show="false" v-model="forms.effectb"></x-input>
      <x-input title="存休类型" v-show="false" v-model="forms.enjoy"></x-input>
      <x-input title="存调休天数" v-show="false" v-model="forms.ctxts"></x-input>
      <x-input title="存调休小时数" v-show="false" v-model="forms.ctxxss"></x-input>
      <x-input title="存调休年假天数" v-show="false" v-model="forms.ctxnjts"></x-input>
      <x-input title="年累计事假天数" v-show="false" v-model="forms.ljsjtsy"></x-input>
      <x-input title="月累计事假天数" v-show="false" v-model="forms.ljsjtsm"></x-input>
      <x-input title="已用" v-show="false" v-model="forms.hasuse"></x-input>
    </group>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addReserve(0)" style="color:#00B705">提交</flexbox-item>
      <!--<flexbox-item @click.native="addReserve(1)" style="color:#FF8519">保存</flexbox-item>-->
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
<style scoped lang="less" type="text/less">
  .footerButton {
    padding-bottom: 10px;
    text-align: center;
  }
</style>
<script>
  import {Group, XSwitch, XTextarea, Sticky, Box, XButton, Cell, Flexbox, FlexboxItem, Datetime, XInput, Confirm, TransferDomDirective as TransferDom} from 'vux';
  import vSearch from '@/components/searchChecker';
  import api from 'api';
  import whole from '@/lib/whole'
  // import dataUtils from '../../filters/dataUtils' // 工具类

  export default {
    directives: {
      TransferDom
    },
    components: {
      Group, XSwitch, XTextarea, Sticky, Box, XButton, Cell, Flexbox, FlexboxItem, vSearch, Datetime, XInput, Confirm
    },
    data () {
      return {
        showCon: false,
        forms: {
          actualdays: '',
          holidaytype: '',
          parmasOption: {}
        },
        bcaList: [{'key': 'lower', 'value': '下午'}, {'key': 'all', 'value': '全天'}],
        bcbList: [{'key': 'upper', 'value': '上午'}, {'key': 'all', 'value': '全天'}]
      }
    },
    watch: {
      'forms.acdutyb': {
        handler: function (val, oldval) {
          if (val) {
            this.changeVal();
          }
        },
        deep: true
      },
      'forms.acdutya': {
        handler: function (val, oldval) {
          if (val) {
            this.changeVal();
          }
        },
        deep: true
      },
      'forms.acedate': {
        handler: function (val, oldval) {
          if (val) {
            this.changeVal();
          }
        },
        deep: true
      }
    },
    computed: {
      isshowbc: function () {
        if (this.forms.holidaytype !== 'A02' && this.forms.holidaytype !== 'A11') {
          return true
        } else {
          return false
        }
      },
      isshowsj: function () {
        if (this.forms.holidaytype === 'A02' || this.forms.holidaytype === 'A11') {
          return true
        } else {
          return false
        }
      }
    },
    created() {
      let saveParams = this.$route.query.saveParams;
      if (saveParams !== undefined) {
        this.draftData(saveParams)
      }
      this.getBaseData() // 请求岗位和休假类型
      this.setData() // 填写的时候回退保存值
    },
    methods: {
      changeVal() {
        let _that = this;
          if ((this.forms.holidaytype !== '' && this.forms.acsdate !== '' && this.forms.acedate !== '' && (this.forms.acdutya !== '' || this.forms.acdutyb !== '')) || (this.forms.holidaytype !== '' && this.forms.acsdate !== '' && this.forms.acedate !== '' && this.forms.actimea !== '' && this.forms.actimeb !== '')) {
            let params = {
              mainModel: this.forms
            }
            api.getSjXjtsURL(params, function (res) {
              console.log(res)
              if (res) {
                _that.forms.actualdays = res.data.data.actualdays
              }
            })
            return true
          }
      },
      draftData(saveParams) {
        let params = {
          id: saveParams.id
        }
        let _that = this;
        // var demoArray = [];
        api.getNewLeaveInfoByIdURL(params, function (res) {
          console.log(params);
          if (res) {
            let mainModel = res.data.mainModel;
            console.log(res);
            _that.forms.holidaytype = mainModel.holidaytype;
            _that.forms.sdate = res.data.sdate;
            _that.forms.edate = res.data.edate;
            _that.forms.acsdate = res.data.sdate;
            _that.forms.acedate = res.data.edate;
            _that.forms.timea = res.data.timea;
            _that.forms.timeb = res.data.timeb;
            _that.forms.actimea = res.data.timea;
            _that.forms.actimeb = res.data.timeb;
            _that.forms.readks = mainModel.readks;
            _that.forms.bjlx = mainModel.bjlx;
            _that.forms.surplus = mainModel.surplus;
            _that.forms.suebreak = mainModel.suebreak;
            _that.forms.effecta = mainModel.effecta;
            _that.forms.effectb = mainModel.effectb;
            _that.forms.enjoy = mainModel.enjoy;
            _that.forms.hasuse = mainModel.hasuse;
            _that.forms.dutya = mainModel.dutya;
            _that.forms.dutyb = mainModel.dutyb;
            _that.forms.acdutya = mainModel.dutya;
            _that.forms.acdutyb = mainModel.dutyb;
            _that.forms.holidaytypename = mainModel.holidaytypename;
            _that.forms.leaveappid = mainModel.leaveappid;
            _that.forms.ctxts = res.data.ctxts;
            _that.forms.ctxxss = res.data.ctxxss;
            _that.forms.ctxnjts = res.data.ctxnjts;
            _that.forms.ljsjtsy = res.data.ljsjtsy;
            _that.forms.ljsjtsm = res.data.ljsjtsm;
            _that.forms.thisdays = res.data.thisdays;
            _that.forms.comdays = res.data.comdays;
            _that.forms.thishours = res.data.thishours;
          }
        })
      },
      setData() {
        // this.forms.postid = this.formsInfos.forms.postid;
        this.forms.sdate = this.forms.sdate;
        this.forms.edate = this.forms.edate;
      },
      addReserve(flag) {
        // if (this.forms.postid === '') {
        //   whole.showTop('请选择岗位')
        //   return;
        // }
        if (this.forms.acedate === '') {
          whole.showTop('请选择休假实际结束日期')
          return;
        }
        let parmas = {
          mainModel: this.forms
        }
        this.parmasOption = parmas;
        console.log(parmas)

        if (flag === 0) {
          let _that = this;
          api.getNextAssignNewLeaveBackURL(parmas, function (res) {
            if (res) {
              console.log(res)
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
                _that.$router.go(-1)
              }
            }
          })
        } else if (flag === 1) {
          let _that = this;
          api.getSaveNewLeaveBackURL(parmas, function (res) {
            if (res) {
              if (res.data.code) {
                whole.showTop(res.data.message);
                _that.$router.go(-1)
              } else {
                whole.showTop(res.data.message);
                _that.$router.go(-1)
              }
            }
            console.log(res);
          })
        }
      },
      onConfirm () {
        let _that = this;
        console.log(_that.parmasOption);
        api.getStartNewLeaveBackURL(_that.parmasOption, function (res) {
          if (res) {
            if (res.data.code) {
              whole.showTop(res.data.message);
              setTimeout(() => {
                let dd = window.dd;
                dd.biz.navigation.close({
                  onSuccess: function(result) {
                  },
                  onFail: function(err) {}
                })
              }, 1500)
            } else {
              whole.showTop(res.data.message);
              // _that.$router.go(-1)
            }
          }
        })
      }
    }
  }
</script>
