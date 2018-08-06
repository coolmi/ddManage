<template>
  <div>
    <group title="申请信息" label-width="7rem" label-align="left">
      <v-search label-width="8rem" title="请选择岗位" :cdata="positionList" v-model="dataforms.postid" @on-hide="getProtypeInfo"> </v-search>
      <cell title="申请人信息" is-link :border-intent="false"
            align-item="center"
            after-title="dataforms.submissioname"
            v-model="dataforms.submissioname"
            :arrow-direction="showContent004 ? 'up' : 'down'"
            @click.native="showContent004 = !showContent004">
      </cell>
      <p class="slide" :class="showContent004 ? 'animate': ''">
        <x-input title="提报人姓名" v-model="dataforms.submissioname" text-align="right" readonly> </x-input>
        <x-input title="提报人itcode" v-model="dataforms.itcode" text-align="right" readonly> </x-input>
        <x-input title="电话" v-model="dataforms.tel" text-align="right" readonly> </x-input>
        <x-input title="手机" v-model="dataforms.phone" text-align="right" readonly> </x-input>
        <x-input title="部门" v-model="dataforms.itcodedeptname" text-align="right" readonly> </x-input>
        <x-input title="公司" v-model="dataforms.bukrsname" text-align="right" readonly> </x-input>
      </p>
      <selector title="紧急程度" v-model="dataforms.emerg" :options="list1"></selector>
      <selector title="问题来源类别" v-model="dataforms.problemsource" :options="list2" @on-change="getProblemToyw"></selector>
      <selector title="品牌型号" v-model="dataforms.brandmodel" :options="list6" v-show="mshow2" @on-change="getChange()"> </selector>
      <x-input title="资产类别名称" v-model="dataforms.assetname" v-show="mshow2" readonly> 资产类别名称</x-input>
      <x-input title="技术标识号" v-model="dataforms.technicalnum" v-show="mshow2" readonly> </x-input>
      <x-textarea title="问题描述" v-model="dataforms.semo"> </x-textarea>
    </group>
    <group title="分配运维信息" label-width="7rem" label-align="left" style="margin-bottom: 50px;">
      <cell title="运维工程师" v-model="dataforms.opereng" v-show="mshow2"> </cell>
      <selector title="运维工程师" v-model="dataforms.operengneer" v-show="!mshow2" :options="list3" @on-change="changeOper"></selector>
      <datetime title="期望解决日期" v-model="dataforms.expectdate"> </datetime>
    </group>
    <flexbox class="footerButton" style="z-index: 2;">
      <flexbox-item @click.native="addReserve(0)" style="color:#00B705;">提交</flexbox-item>
      <flexbox-item @click.native="addReserve(1)" style="color:#FF8519;">保存</flexbox-item>
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
        showCon: false,
        dataforms: {
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
          operengneertxt: '',
          opereng: '',
          expectdate: '',
          message: '',
          appda: '',
          parmasOption: {},
          operetel: '',
          outsourc: [
            {key: '否', value: '否'},
            {key: '是', value: '是'}
          ],
          outsourcost: ''
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
        let pros = _that.dataforms.problemsource
        api.getProblems(function (res) {
          let sendlist = res.data.data.sendbaselist
          for (let item in sendlist) {
            if (item === pros) {
              _that.dataforms.problemsourcetxt = sendlist[item]
            }
          }
        })
        if (pros === 'M01') { // 当问题来源为M01时
          _that.mshow2 = true
          _that.dataforms.operengneertxt = ''
        } else { // 当问题来源为其他时
          _that.dataforms.assetname = ''
          _that.dataforms.brandmodel = ''
          _that.dataforms.technicalnum = ''
          _that.mshow2 = false
          this.getYwlist()
        }
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
            _that.getBaseData() // 请求岗位和休假类型
            // _that.setData() // 填写的时候回退保存值
          } else {
            whole.showTop('获取钉钉免登权限失败')
          }
        })
      })
      this.getDate()
      this.getBaseData()
      // this.getUserInfo()
      this.getZclb()
      this.getProblemToyw()
      this.getYwlist()
    },
    methods: {
      getDate() {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        if (month < 10) {
          month = '0' + month
          this.dataforms.appda = year + '-' + month + '-' + day
        } else if (month >= 10) {
          this.dataforms.appda = year + '-' + month + '-' + day
        }
        // alert(this.dataforms.appda)
      },
      getProtypeInfo() {
        let _that = this
        if (this.dataforms.postid) {
          let params = {
            postid: this.dataforms.postid
          }
          api.getBurck1(params, function (res) {
            if (res) {
              // alert(JSON.stringify(res))
              let pid = _that.dataforms.postid
              let appda = _that.dataforms.appda
              // alert(appda)
              _that.getUser(pid, appda)
            }
          })
        }
      },
      // 获取资产类别
      getZclb () {
        let _that = this
        api.getPeritinfo(_that.dataforms.itcode, res => {
          if (res.data.code === true) {
            let peritinfo = res.data.data.peritinfo
            for (let i in peritinfo) {
              let arrstr = peritinfo[i].ppxh.toString()
              _that.list6.push(arrstr)
            }
            _that.dataforms.brandmodel = _that.list6
          }
        })
      },
      // 选择品牌型号
      getChange() {
        let _that = this
        api.getPeritinfo(_that.dataforms.itcode, res => {
          if (res.data.code === true) {
            let peritinfo = res.data.data.peritinfo
            for (let i in peritinfo) {
              if (peritinfo[i].ppxh === _that.dataforms.brandmodel) {
                _that.dataforms.assetname = peritinfo[i].zcms
                _that.dataforms.technicalnum = peritinfo[i].zcbsh
                _that.dataforms.operengneertxt = peritinfo[i].nachn
                _that.dataforms.operengneer = peritinfo[i].ywgly
                _that.dataforms.opereng = _that.dataforms.operengneer + '-' + _that.dataforms.operengneertxt
              }
            }
          }
        })
      },
      // 当不为M01 的时候选择运维工程师
      changeOper() {
        let _that = this
        let list3 = _that.list3
        let operengneer = _that.dataforms.operengneer
        for (let i in list3) {
          if (list3[i].key === operengneer) {
            // 将value赋值给operengneertxt
            _that.dataforms.operengneertxt = list3[i].value
          }
        }
      },
      // 获取用户信息
      // getUserInfo() {
      //   let _that = this
      //   api.getvalidateUserBaseInfoURL(_that.dataforms.postid, res => {
      //     alert(JSON.stringify(res))
      //   })
      // },
      getBaseData () {
        let _that = this
        api.getPosition(function (res) {
          if (res) {
            _that.positionList = res.positionlist
            // alert(JSON.stringify(_that.positionList))
            _that.dataforms.postid = _that.positionList[0].key
            _that.getUser(_that.dataforms.postid, _that.dataforms.appda)
            // alert(_that.dataforms.appda)
          }
        })
      },
      // 获取问题来源
      // getProblemsources () {
      //   let _that = this
      //   api.getProblems(function (res) {
      //     if (res) {
      //       _that.list2 = res.data.data.sendbaselist
      //       let probj = res.data.data.sendbaselist
      //       let arr = []
      //       for (let i in probj) {
      //         let o = {}
      //         o[i] = probj[i]
      //         arr.push(o)
      //         arr.push(probj[i])
      //       }
      //       _that.list2 = arr
      //     }
      //   })
      // },
      // 获取运维工程师
      getYwlist() {
        let _that = this
        api.getYwlist(res => {
          if (res) {
            let ywobj = res.data.data.ywlist
            for (let i in ywobj) {
              let keyboot = i
              if (_that.dataforms.problemsource === keyboot) {
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
        // appda = '2016/06/20'
        api.getUserinfoPostid(pid, appda, res => {
          if (res) {
            let userinfo = res.data.data.commonUserInfo
            // alert(JSON.stringify(res))
            // alert(JSON.stringify(res.data.data.commonUserInfo))
            _that.dataforms.username = userinfo.username
            _that.dataforms.submissioname = userinfo.username + '-' + userinfo.syspostname
            _that.dataforms.itcode = userinfo.userid
            if (userinfo.tel) {
              // 电话
              _that.dataforms.tel = userinfo.tel
            } else {
              _that.dataforms.tel = '无'
            }
            // if (userinfo.phone) {
              _that.dataforms.phone = userinfo.phone
            // }
            _that.dataforms.itcodedeptname = userinfo.sysdeptname
            if (userinfo.butxt) {
              _that.dataforms.bukrsname = userinfo.butxt
            } else if (userinfo.butxt === '') {
              _that.dataforms.bukrsname = '新凤祥控股集团有限责任公司'
            }
          }
        })
      },
      // 提交申请
      addReserve(flag) {
        let _that = this
        if (_that.dataforms.postid === '') {
          whole.showTop('请选择岗位')
          return;
        }
        if (_that.dataforms.problemsource === 'M01' && _that.dataforms.assetname === '') {
          whole.showTop('请选择品牌型号')
          return;
        }
        if (_that.dataforms.semo === '') {
          whole.showTop('请填写问题描述')
          return;
        }
        if (_that.dataforms.problemsource !== 'M01' && _that.dataforms.operengneer === '') {
          whole.showTop('请选择运维工程师')
          return;
        }
        if (_that.dataforms.expectdate === '') {
          whole.showTop('请选择期望解决日期')
          return;
        }
        _that.sendsingle.id = _that.dataforms.postid
        let params1 = {
          postid: _that.dataforms.postid,
          phone: _that.dataforms.phone,
          proc_inst_id: '',
          bukrs: _that.dataforms.bukrs,
          userid: _that.dataforms.itcode,
          syspostname: _that.dataforms.postid,
          appid: '',
          id: '',
          username: _that.dataforms.username,
          sysdeptname: _that.dataforms.itcodedeptname,
          submissioname: _that.dataforms.submissioname,
          itcode: _that.dataforms.itcode,
          itcodedeptname: _that.dataforms.itcodedeptname,
          bukrsname: _that.dataforms.bukrsname,
          problemsource: _that.dataforms.problemsource,
          problemsourcetxt: _that.dataforms.problemsourcetxt,
          assetname: _that.dataforms.assetname,
          technicalnum: _that.dataforms.technicalnum,
          brandmodel: _that.dataforms.brandmodel,
          semo: _that.dataforms.semo,
          operengneer: _that.dataforms.operengneer,
          operengneertxt: _that.dataforms.operengneertxt,
          operetel: _that.dataforms.operetel,
          expectdate: _that.dataforms.expectdate,
          emerg: _that.dataforms.emerg,
          outsourc: '否',
          outsourcost: ''
        }
        let params = {
          sendsingle: params1
        }
        _that.parmasOption = params
        if (flag === 0) {
          api.getNextItopsURL(params, function (res) {
            if (res) {
              if (res.data.code) {
                if (res.data.message) {
                  _that.message = res.data.message;
                  _that.showCon = true
                } else if (res.data.data.error) {
                  _that.showCon = false
                  whole.showTop(res.data.data.error)
                }
              } else {
                whole.showTop(res.data.message)
                _that.$router.go(-1)
              }
            }
          })
        } else if (flag === 1) {
          let _that = this
          api.getSaveItopsBackURL(params, function (res) {
            if (res) {
              if (res.data.code) {
                whole.showTop(res.data.message);
                _that.$router.go(-1)
              } else {
                whole.showTop(res.data.message)
                _that.$router.go(-1)
              }
            }
            console.log(res)
          })
        }
      },
      onConfirm () {
        let _that = this
        api.getStartItopsURL(_that.parmasOption, function (res) {
          if (res) {
            if (res.data.code) {
              whole.showTop(res.data.message);
              setTimeout(() => {
                let dd = window.dd
                dd.biz.navigation.close({
                  onSuccess: function (result) {
                  },
                  onFail: function (err) {
                  }
                })
              }, 1500)
            } else {
              whole.showTop(res.data.message)
            }
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
    height: 265px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
  option{
    display: inline;
    z-index: -1;
  }
</style>
