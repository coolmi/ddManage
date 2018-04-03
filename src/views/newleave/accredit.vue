<template>
  <div>
    <group title="工作授权表单">
      <x-textarea title="工作事项" placeholder="请填写工作事项" :rows="3" autosize></x-textarea>
      <cell title="授权人姓名" is-link @click.native="selectPerson">{{infos.users}}</cell>
      <x-input title="ITCODE" readonly v-model="infos.itCode" text-align="right"></x-input>
      <x-input title="授权人联系方式" v-model="infos.phone" text-align="right"></x-input>

      <datetime v-model="bdate.sdate" format="YYYY-MM-DD" title="开始日期" @on-confirm="getSdate"></datetime>
      <datetime v-model="bdate.edate" format="YYYY-MM-DD" title="结束日期" @on-change="getEdate"></datetime>


      <x-textarea title="业务通知人" @click.native="getConnect" v-model="busUser.username" :rows="3" name="业务通知人" autosize></x-textarea>
      <x-textarea title="业务通知人ITCODE" v-model="busUser.userItcode" :rows="3" name="业务通知人ITCODE" autosize></x-textarea>
    </group>
    <!--<flexbox class="footerButton">-->
      <!--<flexbox-item class="vux-1px-r" @click.native="addReserve(0)" style="color:#00B705">提交</flexbox-item>-->
      <!--&lt;!&ndash;<flexbox-item @click.native="addReserve(1)" style="color:#FF8519">保存</flexbox-item>&ndash;&gt;-->
    <!--</flexbox>-->
  </div>
</template>

<script>
  import {Group, DatetimeRange, Cell, XInput, Datetime, XTextarea} from 'vux'
  // import whole from '@/lib/whole'
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
          phone: ''
        },
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
      XTextarea
    },
    created() {},
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
            startWithDepartmentId: -1,
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
            startWithDepartmentId: -1,
            onSuccess: function (result) {
              if (result.users.length > 0) {
                let ddids = result.users[0].emplId
                _that.infos.users = result.users[0].name
                api.getUserInfoDdid(ddids, res => {
                  // alert(JSON.stringify(res.data.itcode))
                  // if (res.data.code === true) {
                    _that.infos.itCode = res.data.itcode
                    _that.infos.phone = res.data.telephone
                  // }
                })
              }
            },
            onFail: function (err) {
              console.log(err)
              alert('失败')
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
      getSdate () {
        let _that = this
        // alert(_that.bdate.sdate)
        if (_that.bdate.sdate !== '') {
          alert(_that.bdate.sdate)
        } else {
          _that.bdate.sdate = _that.bdate.sdate
          alert(_that.bdate.sdate)
        }
        alert(_that.bdate.sdate)
      },
      getEdate () {
        alert(this.bdate.edate)
      }
    }
  }
</script>

<style>

</style>
