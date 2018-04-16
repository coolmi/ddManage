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
      <x-input v-model="forms.holidaytypename" title="休假类型名称" v-show="false"></x-input>

      <!--<v-search title="选择岗位" :cdata="positionList" v-model="forms.postid"></v-search>-->
      <v-search title="选择休假类型" :cdata="leavetypelist" v-model="forms.holidaytype"></v-search>
      <v-search title="直系亲属" :cdata="zxqsList" v-show="isshowsaj" v-model="forms.zxqs"></v-search>
      <v-search title="选择病假类型" :cdata="bjlxList" v-show="isshowbj" v-model="forms.bjlx"></v-search>
      <cell v-show="isshowsaj">500公里以内最多休3天</cell>
      <datetime v-model="forms.sdate" format="YYYY-MM-DD" title="开始日期"></datetime>
      <datetime v-model="forms.timea" format="HH:mm" title="开始时间" v-show="isshowsj"></datetime>
      <v-search title="开始日班次" :cdata="bcaList" v-show="isshowbc" v-model="forms.dutya"></v-search>

      <datetime v-model="forms.edate" format="YYYY-MM-DD" title="结束日期"></datetime>
      <v-search title="结束日班次" :cdata="bcbList" v-show="isshowbc" v-model="forms.dutyb"></v-search>
      <datetime v-model="forms.timeb" format="HH:mm" title="结束时间" v-show="isshowsj"></datetime>

      <!--<x-input :readonly="true" v-model="forms.thisdays" title="休假天数"></x-input>-->
      <cell title="休假天数" v-show="thisdays" readonly>{{forms.thisdays}}</cell>
      <cell title="休假时数" v-show="isshowbxj" readonly>{{forms.thishours}}</cell>
      <cell title="自然天数" v-show="false">{{forms.comdays}}</cell>
      <x-textarea title="请假原因" v-model="readks" placeholder="" :show-counter="false" :rows="3" autosize></x-textarea>
      <x-input title="存休类型" v-show="false" v-model="forms.suebreak"></x-input>
      <x-input title="存休类型" v-show="false" v-model="forms.effecta"></x-input>
      <x-input title="存休类型" v-show="false" v-model="forms.effectb"></x-input>
      <x-input title="存调休天数" v-show="false" v-model="forms.ctxts"></x-input>
      <x-input title="存调休小时数" v-show="isshowbxj" v-model="forms.ctxxss"></x-input>
      <x-input title="存调休年假天数" v-show="false" v-model="forms.ctxnjts"></x-input>
      <x-input title="当月已休事假天数" v-show="isshowshj" v-model="forms.ljsjtsm" readonly></x-input>
      <x-input title="当年已休事假天数" v-show="isshowshj" v-model="forms.ljsjtsy" readonly></x-input>
      <x-input title="剩余额度(时)" v-show="isshownj" v-model="forms.surplus" readonly></x-input>
      <x-input title="享有额度(时)" v-show="isshownj" v-model="forms.enjoy" readonly></x-input>
      <x-input title="已用额度(时)" v-show="isshownj" v-model="forms.hasuse" readonly></x-input>

      <x-button type="primary" @click.native="setConnect2()" v-show="btnshow2">填写工作交接表单</x-button>

    </group>

    <group style="margin-bottom: 60px; z-index: -9;">
      <selector v-model="value3" title="填写工作授权" :options="list2" @on-change="showBtn1(val)" v-show="btnshow1"></selector>

      <x-button type="primary" @click.native="setAccredit()" v-show="value3">填写工作授权表单</x-button>
    </group>


    <group title="工作交接表单" v-if="formData.length > 0" style="margin-bottom: 60px;" v-show="btnshow2">
      <cell v-for="d in formData" :key="d.uuid" :title="d.j_gzsx" is-link @click.native="setConnect2(d)">{{d.j_jsrxm  + '    ' + d.j_gzsx}}</cell>
    </group>
    <group title="工作授权表单" v-if="formData2.length > 0" style="margin-bottom: 60px;" v-show="value3">
      <x-textarea v-for="d in formData2" :rows="2" :key="d.uuid" title="工作事项" v-model="d.s_gzsx" is-link @click.native="setAccredit(d)" readonly>{{d.s_gzsx}}</x-textarea>
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
import {Group, Selector, XSwitch, XTextarea, Sticky, Box, XButton, Cell, Flexbox, FlexboxItem, Datetime, XInput, Confirm, TransferDomDirective as TransferDom} from 'vux';
import vSearch from '@/components/searchChecker';
import api from 'api';
import whole from '@/lib/whole'
import dataUtils from '../../filters/dataUtils' // 工具类
import {mapGetters} from 'vuex'
import dingUser from '@/lib/dingUser'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Selector, XSwitch, XTextarea, Sticky, Box, XButton, Cell, Flexbox, FlexboxItem, vSearch, Datetime, XInput, Confirm
  },
  data () {
    return {
      showCon: false,
      forms: {
        // postid: '',
        sdate: '',
        edate: '',
        timea: '',
        timeb: '',
        thisdays: '',
        comdays: '0',
        readks: '',
        bjlx: '短期病假',
        thishours: '',
        surplus: '',
        suebreak: '',
        effecta: '',
        effectb: '',
        enjoy: '',
        ctxts: '',
        ctxxss: '',
        ctxnjts: '',
        ljsjtsy: '',
        ljsjtsm: '',
        hasuse: '',
        dutya: 'all',
        dutyb: 'all',
        message: '',
        gzjjs: {},
        gzsqs: {},
        sq: '',
        holidaytypename: '',
        parmasOption: {}
      },
      // positionList: [],
      leavetypelist: [],
      zxqsList: [{'key': '公公', 'value': '公公'}, {'key': '婆婆', 'value': '婆婆'},
        {'key': '父亲', 'value': '父亲'}, {'key': '母亲', 'value': '母亲'}, {'key': '岳父', 'value': '岳父'},
        {'key': '岳母', 'value': '岳母'}, {'key': '子女', 'value': '子女'}],
      bjlxList: [{'key': '长期病假', 'value': '长期病假'}, {'key': '短期病假', 'value': '短期病假'}],
      bcaList: [{'key': 'lower', 'value': '下午'}, {'key': 'all', 'value': '全天'}, {'key': '', 'value': '空'}],
      bcbList: [{'key': 'upper', 'value': '上午'}, {'key': 'all', 'value': '全天'}, {'key': '', 'value': '空'}],
      list2: [{key: true, value: '是'}, {key: false, value: '否'}],
      value3: false
    }
  },
  computed: {
    ...mapGetters({
      formData: 'getConnectFroms',
      formData2: 'getConnectFroms2',
      path: 'getddConfigPath'
    }),
    addInfo: function () {
      this.forms.gzjjs = this.formData
    },
    thisdays: function () {
      let _that = this;
      if ((this.forms.holidaytype !== 'A02' && this.forms.sdate !== '' && this.forms.edate !== '' && (this.forms.dutya !== '' || this.forms.dutyb !== '')) ||
        (this.forms.holidaytype === 'A02' && this.forms.sdate !== '' && this.forms.edate !== '' && this.forms.timea !== '' && this.forms.timeb !== '')) {
        let params = {
          mainModel: this.forms
        }
        // alert('休假天数：' + this.forms.thisdays)
        // api.getXjtsURL(params, function (res) {
        //   if (res) {
        //     console.log(res.data.data.thisdays)
        //   }
        // })
        api.getKqbcURL(params, function (res) {
          if (res) {
            console.log(res.data.data)
            _that.forms.thisdays = res.data.data.thisdays
            _that.forms.comdays = res.data.data.comdays
            _that.forms.thishours = res.data.data.thishours
            _that.forms.surplus = res.data.data.yuedays
            _that.forms.enjoy = res.data.data.vacdays
            _that.forms.hasuse = res.data.data.usedays
            _that.forms.suebreak = res.data.data.ltypek
            _that.forms.effecta = res.data.data.effs
            _that.forms.effectb = res.data.data.effe
            _that.forms.ctxts = res.data.data.ctxts
            _that.forms.ctxxss = res.data.data.ctxxss
            _that.forms.ctxnjts = res.data.data.ctxnjts
            _that.forms.ljsjtsy = res.data.data.ljsjtsy
            _that.forms.ljsjtsm = res.data.data.ljsjtsm
          }
        })
        return true
      }
    },
    isshowbc: function () {
      if (this.forms.holidaytype !== 'A11') {
        return true
      } else {
        return false
      }
    },
    isshowsj: function () {
      if (this.forms.holidaytype === 'A11') {
        return true
      } else {
        return false
      }
    },
    isshowsaj: function () {
      if (this.forms.holidaytype === 'A05') {
        return true
      } else {
        return false
      }
    },
    isshowbj: function () {
      if (this.forms.holidaytype === 'B01') {
        return true
      } else {
        return false
      }
    },
    isshownj: function () {
      if (this.forms.holidaytype === 'J01') {
        return true
      } else {
        return false
      }
    },
    isshowshj: function () {
      if (this.forms.holidaytype === 'C01') {
        return true
      } else {
        return false
      }
    },
    isshowbxj: function () {
      if (this.forms.holidaytype === 'A02') {
        return true
      } else {
        return false
      }
    },
    btnshow1: function () {
      let _that = this
      // if (_that.forms.thisdays >= 2 && _that.forms.thisdays <= 4 && _that.forms.holidaytype !== 'A04' && _that.forms.holidaytype !== 'A07') {
      //   if (_that.forms.holidaytype !== 'B01' || _that.forms.bjlx !== '长期病假') {
      //     _that.btnshow2 = false
      //     return true
      //   }
      // } else {
      //   return false
      // }
      if (_that.forms.holidaytype === 'J01' || _that.forms.holidaytype === 'C01' || _that.forms.holidaytype === 'A03' || _that.forms.holidaytype === 'A05' || _that.forms.holidaytype === 'A08' || _that.forms.holidaytype === 'A02' || _that.forms.holidaytype === 'B01' && _that.forms.bjlx === '短期病假') {
        if (_that.forms.thisdays >= 2 && _that.forms.thisdays <= 4) {
          _that.btnshow2 = false
          _that.value3 = true
          return true
        }
      } else {
        return false
      }
    },
    btnshow2: function () {
      let _that = this
      if (_that.forms.holidaytype === 'A04' || _that.forms.holidaytype === 'A07' || _that.forms.holidaytype === 'B01' && _that.forms.bjlx === '长期病假') {
        _that.btnshow1 = false
        // _that.showBtn = false
        _that.value3 = false
        whole.showTop('请填写工作交接表单')
        return true
      } else if (_that.forms.holidaytype === 'J01' || _that.forms.holidaytype === 'C01' || _that.forms.holidaytype === 'A03' || _that.forms.holidaytype === 'A05' || _that.forms.holidaytype === 'A08' || _that.forms.holidaytype === 'A02' || _that.forms.holidaytype === 'B01' && _that.forms.bjlx === '短期病假') {
        if (_that.forms.thisdays >= 5) {
          _that.btnshow1 = false
          // _that.showBtn = false
          _that.value3 = false
          whole.showTop('请填写工作交接表单')
          return true
        }
      } else {
        return false
      }
    },
    showBtn1 (val) {
      let _that = this
      if (_that.btnshow1 === true && _that.value3 === true) {
        whole.showTop('请填写工作授权表单')
        return true
      } else if (_that.btnshow1 === false) {
        return false
      } else if (_that.value3 === false) {
        // _that.accreditshow = false
        whole.showTop('请假期间，无工作授权内容')
        return false
      } else {
        return false
      }
    },
    accreditshow () {
      let _that = this
      if (_that.btnshow1 === true) {
        return true
      } else if (_that.value3 === false) {
        return false
      } else {
        return false
      }
    }
  },
  created() {
    let _that = this
    dingUser.getRequestAuthCode(this.path).then((data) => {
      api.getLogin(data, function (res) {
        if (res.data.code) {
          // _that.$store.dispatch('saveLoginStatus', true);
          _that.getBaseData() // 请求岗位和休假类型
          _that.setData() // 填写的时候回退保存值
        } else {
          whole.showTop('获取钉钉免登权限失败')
        }
      })
    })
    // this.getBaseData() // 请求岗位和休假类型
    // this.setData() // 填写的时候回退保存值
    // let _that = this
    // alert(JSON.stringify(_that.formData2))
    // alert(JSON.stringify(_that.formData))
  },
  methods: {
    getBaseData() {
      let _that = this;
      api.getLeaveTypeListURL(function (res) {
        if (res) {
          _that.leavetypelist = res.data.data.leavetypeList
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
      if (this.forms.sdate === '') {
        whole.showTop('请选择休假开始日期')
        return;
      }
      if (this.forms.edate === '') {
        whole.showTop('请选择休假结束日期')
        return;
      }
      var holidaytypename = dataUtils.getDescValue(this.leavetypelist, this.forms.holidaytype);
      this.forms.holidaytypename = holidaytypename
      let _that = this
      _that.forms.gzjjs = _that.formData
      _that.forms.gzsqs = _that.formData2
      _that.forms.sq = _that.value3
//      alert(_that.forms.sq)
      let parmas = {
        mainModel: this.forms
      }
      this.parmasOption = parmas;
      console.log(parmas)
      if (_that.value3 === true && JSON.stringify(parmas.mainModel.gzsqs) === '[]') {
        whole.showTop('请填写工作授权表单')
        return
      }
      if (_that.btnshow2 && JSON.stringify(parmas.mainModel.gzjjs) === '[]') {
        whole.showTop('请填写工作交接表单')
        return
      }
      // alert(_that.value3)
      // alert(JSON.stringify(parmas.mainModel)4)
      // alert(JSON.stringify(parmas.mainModel.gzsqs))
      // alert(JSON.stringify(parmas))
      if (flag === 0) {
          let _that = this;
        // api.getStartNewLeaveURL(parmas, function (res) {
        //   if (res) {
        //     console.log(res)
        //     if (res.status === 200) {
        //       whole.showTop('提交成功');
        //       // _that.$router.go(-1)
        //     }
        //   }
        // })
        api.getNextAssignNewLeaveURL(parmas, function (res) {
          if (res) {
            console.log(res)
            if (res.data.code) {
              if (res.data.message) {
                _that.message = res.data.message;
                _that.showCon = true;
              } else if (res.data.data.error) {
                _that.showCon = false;
                whole.showTop(res.data.data.error);
              }
            } else {
              whole.showTop(res.data.message);
              _that.$router.go(-1)
            }
          }
        })
      } else if (flag === 1) {
        let _that = this;
        api.getSaveNewLeaveURL(parmas, function (res) {
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
      // alert(JSON.stringify(this.forms))
    },
    onConfirm () {
      let _that = this;
      // alert(JSON.stringify(_that.parmasOption));
      api.getStartNewLeaveURL(_that.parmasOption, function (res) {
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
    },
    setConnect2 (data = {}) {
      let formsDemo = {};
      formsDemo = {
        formsData: JSON.stringify(data),
        sdate: this.forms.sdate,
        edate: this.forms.edate
      }
      this.$router.push({path: '/connect', query: {formsDemo: formsDemo}})
    },
    setAccredit (data = {}) {
      let formsDemo = {};
      formsDemo = {
        formsData: JSON.stringify(data),
        sdate: this.forms.sdate,
        edate: this.forms.edate
      }
      // alert(JSON.stringify(formsDemo))
      this.$router.push({path: '/accredit', query: {formsDemo: formsDemo}})
    }
  }
}
</script>
<style>
  .footerButton {
    z-index: 9;
  }
</style>
