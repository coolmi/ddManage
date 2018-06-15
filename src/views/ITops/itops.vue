<template>
  <div>
    <group title="申请信息">
      <v-search title="请选择岗位" :cdata="positionList" v-model="forms.postid" @on-hide="getProtypeInfo"> </v-search>
      <cell title="申请人信息" is-link :border-intent="false"
            v-model="forms.username"
            :arrow-direction="showContent004 ? 'up' : 'down'"
            @click.native="showContent004 = !showContent004"> </cell>
      <p class="slide" :class="showContent004 ? 'animate': ''">
        <x-input title="提报人姓名" v-model="forms.submissioname" text-align="right"> </x-input>
        <x-input title="提报人itcode" v-model="forms.itcode" text-align="right"> </x-input>
        <x-input title="电话" v-model="forms.tel" text-align="right"> </x-input>
        <x-input title="手机" v-model="forms.phone" text-align="right"> </x-input>
        <x-input title="部门" v-model="forms.itcodedeptname" text-align="right"> </x-input>
        <x-input title="公司" v-model="forms.bukrsname" text-align="right"> </x-input>
      </p>
      <selector title="紧急程度" v-model="forms.emerg" :options="list1"></selector>
      <selector title="问题来源类别" v-model="forms.problemsource" :options="list2" @on-change="getProblemToyw"></selector>
      <selector title="品牌型号" v-model="list6" :options="list6" v-show="mshow2" @on-change="getChange()"> </selector>
      <x-input title="资产类别名称" v-model="forms.brandmodel" v-show="mshow2"> </x-input>
      <x-input title="技术标识号" v-model="forms.technicalnum" v-show="mshow2"> </x-input>
      <x-textarea title="问题描述" v-model="forms.semo"> </x-textarea>
    </group>
    <group title="分配运维信息" style="margin-bottom: 50px;">
      <selector title="运维的工程师" v-model="forms.operengneer" v-show="!mshow2" :options="list3"></selector>
      <cell title="运维的工程师" v-model="forms.operengneer" v-show="mshow2" :options="list3"></cell>
      <datetime title="期望解决日期" v-model="forms.expectdate"> </datetime>
    </group>
    <flexbox class="footerButton" style="z-index: 2;">
      <!--<x-button type="primary" @click="addReserve()">提交</x-button>-->
      <flexbox-item class="vux-1px-r" @click.native="addReserve()" style="color:#00B705; z-index: 9999;">提交</flexbox-item>
    </flexbox>
    <!--<div v-transfer-dom>
      <confirm
        v-model="showCon"
        :close-on-confirm="true"
        title="提示"
        @on-confirm="onConfirm">
        <p style="text-align:center;">{{message}}</p>
      </confirm>
    </div>-->
  </div>
</template>

<script>
  import {Group, Selector, XSwitch, XTextarea, Sticky, Box, XButton, Cell, Flexbox, FlexboxItem, Datetime, XInput, Confirm, TransferDomDirective as TransferDom} from 'vux';
  import vSearch from '@/components/searchChecker';
  import api from 'api'
  import whole from '@/lib/whole'
  import dingUser from '@/lib/dingUser'
  import {mapGetters} from 'vuex'
  // import * as _ from 'underscore'
  // import ding from '@/lib/ding'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Group, Selector, XSwitch, XTextarea, Sticky, Box, XButton, Cell, Flexbox, FlexboxItem, Datetime, XInput, Confirm, vSearch
    },
    data () {
      return {
        forms: {
          postid: '',
          username: '',
          submissioname: '',
          itcode: '',
          tel: '',
          phone: '',
          itcodedeptname: '',
          bukrsname: '',
          emerg: '低',
          problemsource: 'M01',
          assetname: '',
          brandmodel: '',
          technicalnum: '',
          semo: '',
          operengneer: '',
          expectdate: '',
          appda: new Date().toLocaleDateString()
        },
        positionList: [],
        burkList: [],
        showContent004: false,
        mshow2: true,
        list1: [
          {key: '低', value: '低'},
          {key: '中', value: '中'},
          {key: '高', value: '高'}
        ],
         list2: [
          {key: 'M02', value: '安防监控(视频监控/门禁、一卡通/多媒体显示等)'},
          {key: 'M01', value: '终端管理(电脑/手机/打印机等)'},
          {key: 'root', value: '数据中心(数据中心/系统应用等)'},
          {key: 'M03', value: '协同办公(IP电话/视频/电话会议/邮箱/Connections等)'},
          {key: 'M04', value: 'MES系统运维(生产实时/数模在线/能源/资金系统等等)'},
          {key: 'M05', value: '网络(网络接入问题//等)'}
        ],
        list6: [],
        list5: [],
        list3: [],
        sendsingle: {
          id: ''
        }
      }
    },
    computed: {
      // 选择问题来源类别
      getProblemToyw() {
        let _that = this
        if (_that.forms.problemsource === 'M01') { // 当问题来源为M01时
          _that.mshow2 = true
        } else { // 当问题来源为其他时
          _that.forms.assetname = ''
          _that.forms.brandmodel = ''
          _that.forms.technicalnum = ''
          _that.mshow2 = false
        }
        // api.get*** 此处为获取运维工程师的请求接口
        this.getYwlist()
      },
      ...mapGetters({
        path: 'getddConfigPath'
      })
    },
    created() {
      let _that = this
      dingUser.getRequestAuthCode(this.path).then((data) => {
        api.getLogin(data, function (res) {
          if (res.data.code) {
            // _that.$store.dispatch('saveLoginStatus', true);
            _that.getBaseData() // 请求岗位和休假类型
            // _that.setData() // 填写的时候回退保存值
          } else {
            whole.showTop('获取钉钉免登权限失败')
          }
        })
      })
      // this.getUserInfo()
      this.getBaseData()
      this.getUserInfo()
      this.getZclb()
      // this.getProblemsources()
      this.getProblemToyw()
      this.getYwlist()
    },
    methods: {
      getProtypeInfo() {
        let _that = this
        if (this.forms.postid) {
          let params = {
            postid: this.forms.postid
          }
          api.getBurck1(params, function (res) {
            // alert(JSON.stringify(res))
            if (res) {
              // alert(JSON.stringify(res.data.data.bukrlist))
              // alert(JSON.stringify(_that.forms.postid))
              // _that.burkList = res.data.data.burkList
              // alert(JSON.stringify(_that.burkList))
              alert(res)
              let pid = _that.forms.postid
              let appda = _that.forms.appda
              _that.getUser(pid, appda)
            }
          })
        }
      },
      getZclb () {
        let _that = this
        api.getPeritinfo(_that.forms.itcode, res => {
          if (res.data.code === true) {
            let peritinfo = res.data.data.peritinfo
            for (let i in peritinfo) {
              // // _that.list6 = arrstr.split(',')
              // // _that.list6.add(peritinfo[i].ppxh)
              // _that.list6.push(peritinfo[i].ppxh)
              let arrstr = peritinfo[i].ppxh.toString()
              _that.list6.push(arrstr)
            }
            // alert(_that.list6)
            // alert(typeof _that.list6)
            // alert(JSON.stringify(_that.list6))
          }
        })
      },
      getChange() {
        let _that = this
        api.getPeritinfo(_that.forms.itcode, res => {
          if (res.data.code === true) {
            let peritinfo = res.data.data.peritinfo
            // alert(JSON.stringify(peritinfo))
            for (let i in peritinfo) {
              if (peritinfo[i].ppxh === _that.list6) {
                _that.forms.brandmodel = peritinfo[i].zcms
                _that.forms.technicalnum = peritinfo[i].zcbsh
                _that.forms.operengneer = peritinfo[i].nachn
              }
            }
            // alert(JSON.stringify(_that.forms))
          }
        })
      },
      // 获取用户信息
      getUserInfo() {
        let _that = this
        api.getvalidateUserBaseInfoURL(_that.forms.postid, res => {
          // alert(JSON.stringify(res.data))
        })
      },
      getBaseData () {
        let _that = this
        api.getPosition(function (res) {
          if (res) {
            // alert(JSON.stringify(res))
            _that.positionList = res.positionlist
            // alert(JSON.stringify(_that.positionList))
          }
        })
      },
      // 获取问题来源
      getProblemsources () {
        let _that = this
        api.getProblems(function (res) {
          if (res) {
             // alert(JSON.stringify(res.data.data.sendbaselist))
            _that.list2 = res.data.data.sendbaselist
            // alert(JSON.stringify(_that.list2))
            let probj = res.data.data.sendbaselist
            let arr = []
            for (let i in probj) {
              let o = {}
              o[i] = probj[i]
              arr.push(o)
              arr.push(probj[i])
            }
            _that.list2 = arr
            // alert(JSON.stringify(_that.list2[0]))
            // let probj = res.data.data.sendbaselist
            // let arr1 = _.keys(probj)
            // alert(JSON.stringify(probj))
          }
        })
      },
      // 获取运维工程师
      getYwlist() {
        let _that = this
        api.getYwlist(res => {
          if (res) {
            // alert(JSON.stringify(res.data.data.ywlist))
            let ywobj = res.data.data.ywlist
            for (let i in ywobj) {
              let keyboot = i
              if (_that.forms.problemsource === keyboot) {
                  let result = [];
                  for (let key in ywobj[i]) {
                    result.push({
                      key: key,
                      value: ywobj[i][key]
                    });
                  }
                  _that.list3 = result;
              }
              }
          }
        })
      },
      // 选择之后获取用户信息
      getUser(pid, appda) {
        let _that = this
        // let ids = _that.forms.postid
        // alert(pid)
        api.getUserinfoPostid(pid, appda, res => {
          // alert(JSON.stringify(res))
          let userinfo = res.data.data.commonUserInfo
          alert(JSON.stringify(userinfo))
          _that.forms.username = userinfo.username
          _that.forms.submissioname = userinfo.username + '-' + userinfo.syspostname
          _that.forms.itcode = userinfo.userid
          if (userinfo.tel) {
            _that.forms.tel = userinfo.tel
          } else {
            _that.forms.tel = '无'
          }
          _that.forms.phone = userinfo.phone
          _that.forms.itcodedeptname = userinfo.sysdeptname
          if (userinfo.butxt) {
            _that.forms.bukrsname = userinfo.butxt
          } else if (userinfo.butxt === '') {
            _that.forms.bukrsname = '新凤祥控股集团有限责任公司'
          }
        })
      },
      // 提交申请
      addReserve() {
        let _that = this
        if (_that.forms.postid === '') {
          whole.showTop('请选择岗位')
          return;
        }
        if (_that.list6 === '') {
          whole.showTop('请选择品牌型号')
          return;
        }
        if (_that.forms.semo === '') {
          whole.showTop('请填写问题描述')
          return;
        }
        if (_that.forms.problemsource !== 'M01' && _that.forms.operengneer === '') {
          whole.showTop('请选择运维工程师')
          return;
        }
        if (_that.forms.expectdate === '') {
          whole.showTop('请选择期望解决日期')
        }
        alert(JSON.stringify(_that.forms))
        _that.sendsingle.id = _that.forms.postid
        // let params1 = {
        //   postid: _that.forms.postid,
        //   phone: _that.forms.phone,
        //   proc_inst_id: '',
        //   bukrs: _that.forms.bukrs,
        //   userid: _that.forms.itcode,
        //   syspostname: _that.forms.postid,
        //   appid: '',
        //   id: '',
        //   username: _that.forms.username,
        //   sysdeptname: _that.forms.itcodedeptname
        // }
        // let params = {
        //   sendsingle: params1
        // }
        api.getSaveItopsBackURL(_that.forms, function (res) {
          if (res) {
            alert(res)
          } else {
            alert('error')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .footerButton{
    padding-bottom: 5px;
    text-align: center;
  }
  .slide{
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate{
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
  option{
    display: inline;
    z-index: -1;
  }
</style>
