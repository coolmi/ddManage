<template>
  <div>
    <group title="申请信息">
      <x-input v-model="holidaytypenames" title="休假类型名称" v-show="false"></x-input>
      <v-search title="员工假期类型" :cdata="leavetypelist" v-model="forms.holidaytype" @change.native="changeHoliday"></v-search>
      <cell title="已休累计天数" v-show="showbj" v-model="forms.ljalreadybjts"></cell>
      <cell title="运行中天数" v-show="showbj" v-model="forms.ljrunbjts"></cell>
      <cell title="当月已休事假天数" v-show="showshj" v-model="forms.ljsjtsm"></cell>
      <cell title="当年已休事假天数" v-show="showshj" v-model="forms.ljsjtsy"></cell>
      <x-input title="目的地" v-show="showsaj" v-model="forms.destion" text-align="right"></x-input>
      <v-search title="直系亲属" :cdata="zxqsList" v-show="showsaj" v-model="forms.zxqs"></v-search>
      <datetime v-model="forms.sdate" format="YYYY-MM-DD" title="开始日期"></datetime>
      <datetime v-model="forms.edate" format="YYYY-MM-DD" title="结束日期"></datetime>
      <x-input readonly v-model="forms.countdayval" title="休假天数" text-align="right"></x-input>
      <datetime title="开始时间" format="HH:mm" v-show="showcj" v-model="forms.kssj"></datetime>
      <datetime title="结束时间" format="HH:mm" v-show="showcj" v-model="forms.jssj"></datetime>

      <cell title="享有额度(时)" v-show="showbxj" v-model="forms.enjoy"></cell>
      <cell title="已用额度(时)" v-show="showbxj" v-model="forms.hasuse"></cell>
      <cell title="剩余额度(时)" v-show="showbxj" v-model="forms.surplus"></cell>
      <x-textarea title="请假原因" v-model="forms.leavereason" placeholder="" :show-counter="false" :rows="3" autosize></x-textarea>
      <x-button type="primary" @click.native="getAttInfo()" v-show="forms.btninfo" style="margin-bottom: 50px;">获取考勤信息</x-button>
    </group>
    <group title="考勤信息列表" style="margin-bottom: 60px;" v-show="iskaoqin">
      <cell v-for="kqobj in forms.suss" :key="kqobj.id" :title="kqobj.param3val" is-link @click.native="toDetail(kqobj)"></cell>
    </group>

    <group style="margin-bottom: 60px; z-index: -9;" v-show="showauthor">
      <x-button type="primary" @click.native="Toauthor()">填写工作授权表单</x-button>
    </group>

    <group style="margin-bottom: 60px; z-index: -9;" v-show="showhand">
      <x-button type="primary" @click.native="Tohand()">填写工作交接表单</x-button>
    </group>

    <group title="工作授权表单" v-if="formData2.length > 0" style="margin-bottom: 60px;" v-show="showauthor">
      <x-textarea v-for="d in formData2" :rows="2" :key="d.uuid" title="工作事项" v-model="d.s_gzsx" is-link @click.native="Toauthor(d)" readonly>{{d.s_gzsx}}</x-textarea>
    </group>
    <group title="工作交接表单" v-if="formData.length > 0" style="margin-bottom: 60px;" v-show="showhand">
      <cell v-for="d in formData" :key="d.uuid" :title="d.j_gzsx" is-link @click.native="Tohand(d)">{{d.j_jsrxm  + '    ' + d.j_gzsx}}</cell>
    </group>

    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addReserve(0)" style="color:#00B705">提交</flexbox-item>
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
<script>
  import {
    Group,
    Selector,
    XSwitch,
    XTextarea,
    Sticky,
    Box,
    XButton,
    Cell,
    Flexbox,
    FlexboxItem,
    Datetime,
    XInput,
    Confirm,
    TransferDomDirective as TransferDom
  } from 'vux';
  import vSearch from '@/components/searchChecker';
  import api from 'api';
  import dateFormatter from '@/lib/dateFormatter'
  import whole from '@/lib/whole'
  import {mapGetters} from 'vuex'
  import dingUser from '@/lib/dingUser'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      Selector,
      XSwitch,
      XTextarea,
      Sticky,
      Box,
      XButton,
      Cell,
      Flexbox,
      FlexboxItem,
      vSearch,
      Datetime,
      XInput,
      Confirm
    },
    data() {
      return {
        showCon: false,
        iskaoqin: false,
        ishand: false,
        isauthor: false,
        forms: {
          ltype: '',
          holidaytypename: '',
          ljalreadybjts: '',
          ljrunbjts: '',
          ljsjtsm: '',
          ljsjtsy: '',
          destion: '',
          zxqs: '',
          sdate: '',
          edate: '',
          countdayval: '',
          kssj: '',
          jssj: '',
          enjoy: '',
          hasuse: '',
          surplus: '',
          leavereason: '',
          btninfo: true,
          message: '',
          suss: [],
          leaveinfos: [],
          gzjjs: {},
          gzsqs: {},
          sq: '',
          parmasOption: {}
        },
        leavetypelist: [],
        zxqsList: [{'key': '公公', 'value': '公公'}, {'key': '婆婆', 'value': '婆婆'},
          {'key': '父亲', 'value': '父亲'}, {'key': '母亲', 'value': '母亲'}, {'key': '岳父', 'value': '岳父'},
          {'key': '岳母', 'value': '岳母'}, {'key': '子女', 'value': '子女'}],
        savekaoqinlist: []
      }
    },
    computed: {
          ...mapGetters({
            formData: 'getConnectFroms',
            formData2: 'getConnectFroms2',
            path: 'getddConfigPath',
            getkaoqininfos: 'getdailyInfos'
      }),
      // 补休假、年假
      showbxj: function () {
        if (this.forms.holidaytype === 'A02' || this.forms.holidaytype === 'J01') {
          return true
        } else {
          return false
        }
      },
      // 事假
      showshj: function () {
        if (this.forms.holidaytype === 'C01') {
          return true
        } else {
          return false
        }
      },
      // 病假
      showbj: function () {
        if (this.forms.holidaytype === 'B01') {
          return true
        } else {
          return false
        }
      },
      // 产假、哺乳假、工伤假
      showcj: function () {
        let _that = this;
        if (this.forms.holidaytype === 'A04' || this.forms.holidaytype === 'A11' || this.forms.holidaytype === 'A07') {
          let holidaytype = this.forms.holidaytype
          let sdate = this.forms.sdate
          let edate = this.forms.edate
          _that.$store.dispatch('clearReserves', _that.getkaoqininfos)
          api.getKaoQinURL(holidaytype, sdate, edate, function (res) {
            console.log('产假等原始考勤数据:');
            console.log(res);
            if (res.data.code) {
              _that.forms.suss = res.data.data.suss
              console.log('产假等从考勤拿的suss:')
              console.log(_that.forms.suss)
              if (res.data.data.suss !== undefined) {
                if (res.data.data.suss.length > 0) {
                  _that.forms.countdayval = _that.forms.suss.length
                }
              } else {
                _that.forms.countdayval = ''
                _that.iskaoqin = false
                whole.showTop('当前没有考勤信息!')
              }
              if (res.data.data.error !== undefined && res.data.data.error.length !== 0) {
                whole.showTop(res.data.data.error)
              }
            }
          })
          this.forms.btninfo = false
          this.iskaoqin = false
          return true
        } else {
          this.forms.btninfo = true
          return false
        }
      },
      // 丧假
      showsaj: function () {
        if (this.forms.holidaytype === 'A05') {
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
      // 授权表单
      showauthor: {
        get () {
          let _that = this
          if (_that.forms.holidaytype !== undefined) {
            if (_that.forms.holidaytype === 'A04' || _that.forms.holidaytype === 'A07' || _that.forms.holidaytype === 'A11') {
              return false
            } else {
              if (_that.forms.countdayval >= 2 && _that.forms.countdayval <= 4) {
                _that.showhand = false
                whole.showTop('请填写工作授权表单')
                return true
              }
            }
          }
        },
        set (val) {
          this.isauthor = val
        }
      },
      // 交接表单
      showhand: {
        get () {
          let _that = this
          if (_that.forms.holidaytype !== undefined) {
            if (_that.forms.holidaytype === 'A04' || _that.forms.holidaytype === 'A07' || _that.forms.holidaytype === 'A11') {
              _that.showauthor = false
              whole.showTop('请填写工作交接表单')
              return true
            }
            if (_that.forms.holidaytype === 'A02' || _that.forms.holidaytype === 'A03' || _that.forms.holidaytype === 'A05' || _that.forms.holidaytype === 'A08' || _that.forms.holidaytype === 'A12' || _that.forms.holidaytype === 'C01' || _that.forms.holidaytype === 'J01' || _that.forms.holidaytype === 'B01') {
              if (_that.forms.countdayval >= 5) {
                _that.showauthor = false
                whole.showTop('请填写工作交接表单')
                return true
              } else {
                return false
              }
            }
          }
        },
        set (val) {
          this.ishand = val
        }
      }
    },
    created() {
      let _that = this
      dingUser.getRequestAuthCode(this.path).then((data) => {
        api.getLogin(data, function (res) {
          if (res.data.code) {
            _that.getBaseData() // 请求岗位和休假类型
          } else {
            whole.showTop('获取钉钉免登权限失败')
          }
        })
      })
      _that.forms.ltype = this.$route.query.obj
    },
    methods: {
      // 获取请假类型
      getBaseData() {
        let _that = this;
        api.getLeaveTypeListURL(function (res) {
          // console.log(res);
          if (res) {
            _that.leavetypelist = res.data.data.leavetypeList
          }
        })
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
      // 格式化时间
      formatDate (val) {
        let myDate = new Date(val).getTime()
        return dateFormatter.fmtDate(myDate, 'yyyy-MM-dd')
      },
      // 提交
      addReserve(flag) {
        if (this.forms.sdate === '') {
          whole.showTop('请选择休假开始日期')
          return;
        }
        if (this.forms.edate === '') {
          whole.showTop('请选择休假结束日期')
          return;
        }
        if (this.forms.countdayval === '') {
          whole.showTop('请选填写休假天数')
          return;
        }
        let _that = this
        let str = JSON.stringify(_that.getkaoqininfos)
        if (JSON.parse(str).length === 0) {
          _that.savekaoqinlist = []
          _that.forms.suss.forEach(function (item) {
            let kaoqinobj = {
              param1: '工作日',
              param1num: '1',
              param2: item.param2,
              param2num: item.param2num,
              param3: _that.formatDate(item.param3val),
              param4: _that.formatDate(item.param3val),
              param3val: item.param3val,
              param4val: item.param4val,
              param5: item.param5,
              param6val: item.param6val,
              param7val: item.param7val,
              param8: item.param8,
              param9val: item.param9val,
              param10val: item.param10val,
              param11: item.param11,
              param12val: item.param12val,
              param13val: item.param13val,
              param14: 'all',    // 请假班次
              param15: 'yes',  // 包含休息时间
              param16: '',
              param17: '',
              param18: '8.0',
              param19: ''
            }
            _that.savekaoqinlist.push(kaoqinobj)
          })
          console.log('循环填入数组:')
          console.log(_that.savekaoqinlist)
          let kaojson = JSON.stringify(_that.savekaoqinlist)
          _that.forms.leaveinfos = JSON.parse(kaojson)
        } else {
          if (JSON.parse(str).length !== _that.forms.suss.length) {
            whole.showTop('考勤信息不全或重复，请重新获取考勤信息！')
            return
          }
          if (JSON.parse(str).length === _that.forms.suss.length) {
            _that.forms.leaveinfos = JSON.parse(str)
            console.log('从缓存中拿:')
            console.log(_that.forms.leaveinfos)
          }
        }
        if (_that.forms.holidaytype === 'A04' || _that.forms.holidaytype === 'A07' || _that.forms.holidaytype === 'A11') {
          _that.forms.gzjjs = _that.formData
          _that.forms.gzsqs = []
          _that.showauthor = false
        }
        if (_that.forms.holidaytype === 'A02' || _that.forms.holidaytype === 'A03' || _that.forms.holidaytype === 'A05' || _that.forms.holidaytype === 'A08' || _that.forms.holidaytype === 'A12' || _that.forms.holidaytype === 'C01' || _that.forms.holidaytype === 'J01' || _that.forms.holidaytype === 'B01') {
          if (_that.forms.countdayval === 1) {
            _that.forms.gzsqs = []
            _that.showauthor = false
            _that.forms.gzjjs = []
            _that.showhand = false
          }
          if (_that.forms.countdayval >= 2 && _that.forms.countdayval <= 4) {
            _that.forms.gzsqs = _that.formData2
            _that.forms.gzjjs = []
            _that.showhand = false
          }
          if (_that.forms.countdayval >= 5) {
            _that.forms.gzjjs = _that.formData
            _that.forms.gzsqs = []
            _that.showauthor = false
          }
        }
        _that.forms.sq = _that.showauthor
        let parmas = {
          mainModel: this.forms
        }
        // 授权表单和交接表单的提交
        if (_that.showauthor === true && JSON.stringify(parmas.mainModel.gzsqs) === '[]') {
          whole.showTop('请填写工作授权表单')
          return
        }
        if (_that.showhand && JSON.stringify(parmas.mainModel.gzjjs) === '[]') {
          whole.showTop('请填写工作交接表单')
          return
        }
        this.parmasOption = parmas;
        console.log('mainmodel数据:')
        console.log(parmas)
        if (flag === 0) {
          let _that = this;
          api.getNextAssignNewLeaveURL(parmas, function (res) {
            if (res) {
              if (res.data.code) {
                if (res.data.message) {
                  _that.forms.message = res.data.message;
                  _that.showCon = true;
                } else if (res.data.data.error) {
                  _that.showCon = false;
                  whole.showTop(res.data.data.error);
                }
              } else {
                whole.showTop(res.data.message);
              }
            }
          })
        } else if (flag === 1) {
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
          })
        }
      },
      // 提交提示节点信息
      onConfirm() {
        let _that = this;
        api.getStartNewLeaveURL(_that.parmasOption, function (res) {
          if (res) {
            if (res.data.code) {
              whole.showTop(res.data.message);
              setTimeout(() => {
                let dd = window.dd;
                dd.biz.navigation.close({
                  onSuccess: function (result) {
                  },
                  onFail: function (err) {
                  }
                })
              }, 1500)
            } else {
              whole.showTop(res.data.message);
              _that.$router.go(-1)
            }
          }
        })
      },
      // 改变假期初始化数据
      changeHoliday () {
        this.forms.ljalreadybjts = ''
        this.forms.ljrunbjts = ''
        this.forms.ljsjtsm = ''
        this.forms.ljsjtsy = ''
        this.forms.zxqs = ''
        this.forms.sdate = ''
        this.forms.edate = ''
        this.forms.countdayval = ''
        this.forms.kssj = ''
        this.forms.jssj = ''
        this.forms.enjoy = ''
        this.forms.hasuse = ''
        this.forms.surplus = ''
        this.forms.leavereason = ''
        this.iskaoqin = false
        this.showhand = false
        this.showauthor = false
      },
      // 获取考勤信息
      getAttInfo() {
        let _that = this;
        let holidaytype = this.forms.holidaytype
        let sdate = this.forms.sdate
        let edate = this.forms.edate
        _that.$store.dispatch('clearReserves', _that.getkaoqininfos)
        api.getKaoQinURL(holidaytype, sdate, edate, function (res) {
          console.log('原始考勤数据:');
          console.log(res);
          if (res.data.code) {
            _that.forms.ljsjtsm = res.data.data.ljsjtsm;
            _that.forms.ljsjtsy = res.data.data.ljsjtsy;
            _that.forms.surplus = res.data.data.yuedays
            _that.forms.enjoy = res.data.data.vacdays
            _that.forms.hasuse = res.data.data.usedays
            _that.forms.suss = res.data.data.suss
            console.log('从考勤拿的suss:')
            console.log(_that.forms.suss)
            if (res.data.data.suss !== undefined) {
              if (res.data.data.suss.length > 0) {
                _that.forms.countdayval = _that.forms.suss.length
                _that.iskaoqin = true
              } else {
                _that.forms.countdayval = ''
                _that.iskaoqin = false
              }
            } else {
              _that.forms.countdayval = ''
              _that.iskaoqin = false
              whole.showTop('当前没有考勤信息!')
            }
            if (res.data.data.error !== undefined && res.data.data.error.length !== 0) {
              whole.showTop(res.data.data.error)
            }
          }
        })
        if (holidaytype === 'B01') {
          api.getYxljts(holidaytype, function (res) {
            console.log('累计:');
            console.log(res);
            _that.forms.ljalreadybjts = res.data.data.ljxjtsy
          })
          api.getYxzts(holidaytype, function (res) {
            console.log('运行:');
            console.log(res);
            _that.forms.ljrunbjts = res.data.data.ljxjtsy
          })
        }
      },
      // 考勤信息详情跳转
      toDetail (val) {
        this.$router.push({path: '/exanInfo', query: {pjo: val}})
      },
      // 授权表单跳转
      Toauthor(data = {}) {
        let formsDemo = {};
        formsDemo = {
          formsData: JSON.stringify(data),
          sdate: this.forms.sdate,
          edate: this.forms.edate
        }
        this.$router.push({path: '/authorization', query: {formsDemo: formsDemo}})
      },
      // 交接表单跳转
      Tohand(data = {}) {
        let formsDemo = {};
        formsDemo = {
          formsData: JSON.stringify(data),
          sdate: this.forms.sdate,
          edate: this.forms.edate
        }
        this.$router.push({path: '/handover', query: {formsDemo: formsDemo}})
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .footerButton {
    padding-bottom: 10px;
    text-align: center;
  }
  .footerButton {
    z-index: 9;
  }
</style>
