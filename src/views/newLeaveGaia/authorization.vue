<template>
  <div>
    <group title="工作授权表单" style="margin-bottom: 40px;">
      <x-textarea title="工作事项" placeholder="请填写工作事项" :rows="4" autosize v-model="infos.gzsx"></x-textarea>
      <cell title="授权人姓名" is-link @click.native="selectPerson" v-model="infos.users">{{infos.users}}</cell>
      <x-input title="授权人ITCODE" readonly v-model="infos.itCode" text-align="right"></x-input>
      <x-input title="授权人联系电话" v-model="infos.phone" text-align="right"></x-input>

      <datetime v-model="bdate.sdate" format="YYYY-MM-DD" title="开始日期" :end-date="endDate"></datetime>
      <datetime v-model="bdate.edate" format="YYYY-MM-DD" title="结束日期" :start-date="bdate.sdate" :end-date="endDate"></datetime>

      <x-textarea title="业务通知人" @click.native="getConnect" v-model="busUser.username" :rows="4" name="业务通知人" autosize></x-textarea>
      <x-textarea title="业务通知人ITCODE" v-model="busUser.userItcode" :rows="4" name="业务通知人ITCODE" autosize></x-textarea>
      <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="infos.uuid"></x-input>
    </group>
    <flexbox class="footerButton">
      <flexbox-item>
        <x-button type="primary" @click.native="btnSubmit">保存</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {Group, DatetimeRange, Cell, XInput, Datetime, XTextarea, XButton, FlexboxItem, Flexbox} from 'vux'
  import whole from '@/lib/whole'
  import api from 'api'
  import ding from '@/lib/ding'
  // import DEM from '@/lib/dingErrMessage'
  // import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        readonly: true,
        value1: '2018-04-02',
        pickerUsers: [],
        infos: {
          users: '',
          ddids: '',
          itCode: '',
          phone: '',
          gzsx: '',
          pernr: '',
          uuid: ''
        },
        startDate: '',
        endDate: '',
        userInfo: '',
        busUser: {
          username: '',
          userItcode: ''
        },
        ddid: [],
        bdate: {
          sdate: '',
          edate: ''
        }
      }
    },
    components: {
      Group,
      DatetimeRange,
      Cell,
      XInput,
      Datetime,
      XTextarea,
      XButton,
      FlexboxItem,
      Flexbox
    },
    created() {
      let _that = this
      let sdatee = this.$route.query.formsDemo.sdate
      let edatee = this.$route.query.formsDemo.edate
      this.startDate = sdatee
      this.endDate = edatee
      if (this.bdate.sdate === '') {
        this.bdate.sdate = sdatee
      }
      let data = this.$route.query.formsDemo.formsData
      if (data === '{}') {
      } else {
        if (typeof data === 'string') {
          // eslint-disable-next-line
          data = eval('(' + data + ')');
        }
        // alert(JSON.stringify(data))
        _that.infos.gzsx = data.s_gzsx
        _that.infos.users = data.s_sqrxm
        _that.infos.itCode = data.s_sqritcode
        _that.infos.phone = data.s_sqrlxfs
        _that.bdate.sdate = data.s_starttime
        _that.bdate.edate = data.s_endtime
        _that.busUser.username = data.s_ywtzr
        _that.busUser.userItcode = data.s_ywtzritcode
        _that.infos.uuid = data.uuid
      }
    },
    methods: {
      getConnect() {
        let _that = this
        let pickedUsers = [];
        for (let u of _that.userInfo) {
          pickedUsers.push(u.emplId);
        }
        let dd = window.dd;
        dd.ready(function () {
          dd.biz.contact.complexPicker({
            title: '选择人员并提交',
            corpId: ding.getItemInLocation().corpId || ding.CORPID,
            multiple: true,
            limitTips: '超出最大提交人数',
            maxUsers: 10,
            appId: 126759727,
            permissionType: 'GLOBAL',
            responseUserOnly: false,
            startWithDepartmentId: 0,
            onSuccess: function (result) {
              if (result.users.length > 0) {
                _that.busUser.username = '';
                _that.busUser.userItcode = '';
                for (let i = 0; i < result.users.length; i++) {
                  _that.busUser.username += result.users[i].name + ',';
                  _that.ddid.push(result.users[i].emplId);
                }
                if (_that.ddid.length > 0) {
                  for (var i = 0; i < _that.ddid.length; i++) {
                    api.getUserInfoDdid(_that.ddid[i], res => {
                      if (res.data.code) {
                        // alert(JSON.stringify(res.data))
                        _that.busUser.userItcode += res.data.itcode + ',';
                      }
                    })
                  }
                  // _that.busUser.userItcode = _that.busUser.userItcode.replace(/,/g, '   ');
                  _that.busUser.userItcode = _that.busUser.userItcode.substr(0, _that.busUser.userItcode.length - 1)
                  _that.busUser.username = _that.busUser.username.substr(0, _that.busUser.username.length - 1)
                }

                // 传递默认选项
                _that.userInfo = result;
              } else {
                _that.busUser.username = '';
                _that.userInfo = '';
              }
            },
            onFail: function (err) {
              console.log(err)
              alert('失败')
            }
          });
        });
      },
      selectPerson() {
        let _that = this
        let dd = window.dd;
        dd.ready(function () {
          dd.biz.contact.complexPicker({
            title: '选择人员并提交',
            corpId: ding.getItemInLocation().corpId || ding.CORPID,
            multiple: false,
            limitTips: '请选择要提交给的人员',
            maxUsers: 1,
            appId: 126759727,
            permissionType: 'GLOBAL',
            responseUserOnly: false,
            startWithDepartmentId: 0,
            onSuccess: function (result) {
              if (result.users.length > 0) {
                let ddids = result.users[0].emplId
                _that.infos.users = result.users[0].name
                api.getUserInfoDdid(ddids, res => {
                  // alert(JSON.stringify(res.data.itcode))
                  // if (res.data.code === true) {
                  _that.infos.itCode = res.data.itcode
                  _that.infos.phone = res.data.telephone
                  _that.infos.pernr = res.data.pernr
                  // alert(JSON.stringify(res.data))
                  // }
                })
              }
            },
            onFail: function (err) {
              console.log(err)
              whole.showTop('失败')
            }
          });
        });
      },
      strJson () {
        let _that = this;
        if (_that.ddid.length > 0) {
          for (var i = 0; i < _that.ddid.length; i++) {
            api.getUserInfoDdid(_that.ddid[i], res => {
              if (res.data.code) {
                // alert(res.data.itcode)
                _that.busUser.userItcode += res.data.itcode + ',';
              }
            })
          }
          _that.busUser.userItcode = _that.busUser.userItcode.substring(0, _that.busUser.userItcode.length - 1)
        }
      },
      btnSubmit () {
        let _that = this
        if (_that.infos.gzsx === '') {
          whole.showTop('请输入工作事项')
          return
        }
        if (_that.infos.users === '') {
          whole.showTop('请选择授权人')
          return
        }
        if (_that.bdate.sdate === '') {
          whole.showTop('请选择授权开始时间')
          return
        }
        if (_that.bdate.edate === '') {
          whole.showTop('请选择授权结束时间')
          return
        }
        if (_that.busUser.username === '') {
          whole.showTop('请选择业务通知人')
          return
        }
        let formsData = {
          s_gzsx: _that.infos.gzsx,
          s_sqrpernr: _that.infos.pernr,
          s_sqrxm: _that.infos.users,
          s_sqritcode: _that.infos.itCode,
          s_sqrlxfs: _that.infos.phone,
          s_starttime: _that.bdate.sdate,
          s_endtime: _that.bdate.edate,
          s_ywtzr: _that.busUser.username,
          s_ywtzritcode: _that.busUser.userItcode,
          uuid: _that.infos.uuid
        }
        this.$store.dispatch('addAccredit', formsData)
        this.$router.go(-1)
      }
    }
  }
</script>

<style>

</style>
