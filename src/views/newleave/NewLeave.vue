<template>
  <div>
    <group title="申请信息">
      <x-input v-model="holidaytypenames" title="休假类型名称" v-show="false"></x-input>

      <v-search title="选择休假类型" :cdata="leavetypelist" v-model="forms.holidaytype" @change.native="changeHoliday"></v-search>
      <v-search title="直系亲属" :cdata="zxqsList" v-show="isshowsaj" v-model="forms.zxqs"></v-search>
      <x-input title="目的地" v-show="isshowsaj" v-model="forms.destion" text-align="right"></x-input>
      <!--<v-search title="选择病假类型" :cdata="bjlxList" v-show="isshowbj" v-model="forms.bjlx"></v-search>-->
      <cell title="已休累计天数" v-show="isshowbj" v-model="forms.ljalreadybjts"></cell>
      <cell title="运行中天数" v-show="isshowbj" v-model="forms.ljrunbjts"></cell>

      <!--<cell v-show="isshowsaj">500公里以内最多休3天</cell>-->
      <cell title="当月已休事假天数" v-show="isshowshj" v-model="forms.ljsjtsm"></cell>
      <cell title="当年已休事假天数" v-show="isshowshj" v-model="forms.ljsjtsy"></cell>

      <datetime v-model="forms.sdate" format="YYYY-MM-DD" title="开始日期"></datetime>
      <datetime v-model="forms.edate" format="YYYY-MM-DD" title="结束日期"></datetime>

      <v-search title="开始日班次" :cdata="bcaList" v-show="isshowbc" v-model="forms.dutya"></v-search>
      <v-search title="结束日班次" :cdata="bcbList" v-show="isshowbc" v-model="forms.dutyb"></v-search>

      <v-search title="休假方式" :cdata="bulist" v-show="isshowbrj" v-model="forms.brjxjlx"></v-search>
      <v-search title="生育胎数" :cdata="butailist" v-show="isshowbrj" v-model="forms.tesl"></v-search>
      <cell title="存调休小时数" v-show="showbrbu" v-model="forms.ctxxss"></cell>
      <datetime v-show="isshowbrj" v-model="forms.effecta" format="YYYY-MM-DD" title="小孩出生日期" @on-change="changetime(forms.effecta)"></datetime>
      <datetime v-show="isshowbrj" v-model="forms.effectb" format="YYYY-MM-DD" title="失效日期"></datetime>

      <datetime v-model="forms.timea" format="HH:mm" title="开始时间" v-show="isshowbrj"></datetime>
      <datetime v-model="forms.timeb" format="HH:mm" title="结束时间" v-show="isshowbrj"></datetime>
      <datetime v-show="showbrj" v-model="forms.timec" format="HH:mm" title="第二次开始时间"></datetime>
      <datetime v-show="showbrj" v-model="forms.timed" format="HH:mm" title="第二次结束时间"></datetime>

      <!--<x-input :readonly="true" v-model="forms.thisdays" title="休假天数"></x-input>-->
      <cell title="休假天数" v-show="thisdayscount" readonly>{{forms.thisdays}}</cell>
      <cell title="休假时数" v-show="showbrbu" v-model="forms.thishours"></cell>

      <cell title="剩余额度(时)" v-show="isshownj" v-model="forms.surplus"></cell>
      <cell title="享有额度(时)" v-show="isshownj" v-model="forms.enjoy"></cell>
      <cell title="已用额度(时)" v-show="isshownj" v-model="forms.hasuse"></cell>

      <x-textarea title="请假原因" v-model="forms.readks" placeholder="" :show-counter="false" :rows="3" autosize></x-textarea>
      <x-button type="primary" @click.native="setConnect2()" v-show="btnshow2">填写工作交接表单</x-button>

    </group>

    <group style="margin-bottom: 60px; z-index: -9;">
      <selector v-model="value3" title="填写工作授权" :options="list2" @on-change="showBtn1" v-show="btnshow1"></selector>

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
        <p style="text-align:center;">{{forms.message}}</p>
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
  import {mapGetters} from 'vuex'
  import dingUser from '@/lib/dingUser'
  // import dateFormatter from '@/lib/dateFormatter'
  // import dataUtils from '../../filters/dataUtils' // 工具类

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
          zxqs: '',
          destion: '',
          ljalreadybjts: '',
          ljrunbjts: '',
          brjxjlx: '1',  // 哺乳假可休假方式
          tesl: '1',   // 生育胎数
          ctxxss: '',  // 可休小时数
          effecta: '',  // 小孩儿出生日期
          effectb: '',  // 小孩失效日期
          timec: '',   // 第二次开始时间
          timed: '',   // 第二次结束时间
          thishours: '',
          surplus: '',
          suebreak: '',
          enjoy: '',
          ctxts: '',
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
        bulist: [{'value': '每天一次', 'key': '1'}, {'value': '每天两次', 'key': '2'}],
        butailist: [{'value': '一胞胎', 'key': '1'}, {'value': '二胞胎', 'key': '2'}, {'value': '三胞胎', 'key': '3'}, {'value': '四胞胎', 'key': '4'}],
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
      thisdayscount: function () {
        let _that = this;
        if ((this.forms.holidaytype !== 'A02' && this.forms.holidaytype !== 'A11' && this.forms.sdate !== '' && this.forms.edate !== '' && (this.forms.dutya !== '' || this.forms.dutyb !== '')) ||
          (this.forms.holidaytype === 'A02' && this.forms.sdate !== '' && this.forms.edate !== '' && this.forms.dutya !== '' && this.forms.dutyb !== '') ||
          (this.forms.holidaytype === 'A11' && this.forms.sdate !== '' && this.forms.edate !== '' && this.forms.timea !== '' && this.forms.timeb !== '')) {
          let params = {
            mainModel: this.forms
          }
          api.getKqbcURL(params, function (res) {
            if (res.data.code) {
              console.log('计算fdfdf:')
              console.log(res.data.data)
              _that.forms.thisdays = res.data.data.thisdays
              _that.forms.comdays = res.data.data.comdays
              _that.forms.thishours = res.data.data.thishours
              _that.forms.surplus = res.data.data.yuedays
              _that.forms.enjoy = res.data.data.vacdays
              _that.forms.hasuse = res.data.data.usedays
              _that.forms.suebreak = res.data.data.ltypek
              // _that.forms.effecta = res.data.data.effs
              // _that.forms.effectb = res.data.data.effe
              _that.forms.ctxts = res.data.data.ctxts
              _that.forms.ctxxss = res.data.data.ctxxss
              _that.forms.ctxnjts = res.data.data.ctxnjts
              _that.forms.ljsjtsy = res.data.data.ljsjtsy
              _that.forms.ljsjtsm = res.data.data.ljsjtsm
            }
          })
          if (this.forms.holidaytype === 'A02' || this.forms.holidaytype === 'A11') {
            return false
          } else {
            return true
          }
        }
        if (this.forms.holidaytype === 'B01') {
          api.getYxljts(this.forms.holidaytype, function (res) {
            _that.forms.ljalreadybjts = res.data.data.ljxjtsy
          })
          api.getYxzts(this.forms.holidaytype, function (res) {
            _that.forms.ljrunbjts = res.data.data.ljxjtsy
          })
        }
        if (this.forms.holidaytype !== 'A02' && this.forms.holidaytype !== 'A11') {
          return true
        } else {
          return false
        }
      },
      // 自动获取假期名字
      holidaytypenames: {
        get () {
          this.forms.holidaytypename = this.getNameByVal(this.leavetypelist, this.forms.holidaytype);
          if (this.forms.holidaytypename === '丧假' || this.forms.holidaytypename === '年假' || this.forms.holidaytypename === '探亲假') {
            whole.showTop('不包含周六、日及法定节假日!')
          }
          if (this.forms.holidaytypename === '丧假') {
            setTimeout(() => {
              whole.showTop('500公里以内最多休3天!')
            }, 2000)
          }
          if (this.forms.holidaytypename === '产假' || this.forms.holidaytypename === '工伤假' || this.forms.holidaytypename === '哺乳假') {
            setTimeout(() => {
              whole.showTop('包含周六、日及法定节假日!')
            }, 2000)
          }
          if (this.forms.holidaytypename === '补休假' || this.forms.holidaytypename === '事假' || this.forms.holidaytypename === '病假' || this.forms.holidaytypename === '婚假' || this.forms.holidaytypename === '陪护假') {
            whole.showTop('包含周六、日及法定节假日!')
          }
          return this.forms.holidaytypename;
        },
        set (val) {
          this.forms.holidaytypename = val;
        }
      },
      // 哺乳假方式
      showbrj: function () {
        if (this.forms.brjxjlx === '2') {
          return true
        } else {
          return false
        }
      },
      // 除了哺乳假之外的假期班次字段
      isshowbc: function () {
        if (this.forms.holidaytype !== 'A11') {
          return true
        } else {
          return false
        }
      },
      // 补休假、哺乳假
      showbrbu: function () {
        if (this.forms.holidaytype === 'A11' || this.forms.holidaytype === 'A02') {
          return true
        } else {
          return false
        }
      },
      // 哺乳假
      isshowbrj: function () {
        if (this.forms.holidaytype === 'A11') {
          return true
        } else {
          return false
        }
      },
      // 丧假
      isshowsaj: function () {
        if (this.forms.holidaytype === 'A05') {
          return true
        } else {
          return false
        }
      },
      // 病假
      isshowbj: function () {
        if (this.forms.holidaytype === 'B01') {
          return true
        } else {
          return false
        }
      },
      // 年假
      isshownj: function () {
        if (this.forms.holidaytype === 'J01') {
          return true
        } else {
          return false
        }
      },
      // 事假
      isshowshj: function () {
        if (this.forms.holidaytype === 'C01') {
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
          console.log(res);
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
      // 通过value值拿name
      getNameByVal (obj, code) {
        let name = '';
        for (let n of obj) {
          if (n.key === code) {
            name = n.value
          }
        }
        return name;
      },
      // 改变假期初始化数据
      changeHoliday () {
        this.forms.sdate = ''
        this.forms.edate = ''
        this.forms.thishours = ''
        this.forms.thisdays = ''
        this.forms.brjxjlx = '1'
        this.showbrj = false
      },
      // 小孩出生日期给失效日期赋值
      changetime (val) {
        console.log(val)
        let date = new Date(val)
        this.forms.effectb = (date.getFullYear() + 1) + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        console.log(this.forms.effectb);
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
        let _that = this
        _that.forms.gzjjs = _that.formData
        _that.forms.gzsqs = _that.formData2
        _that.forms.sq = _that.value3
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
      },
      showBtn1 () {
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
      }
    }
  }
</script>
<style>
  .footerButton {
    z-index: 9;
  }
</style>
