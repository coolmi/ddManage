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
      <datetime v-model="forms.s_date" format="YYYY-MM-DD" title="调班日期"></datetime>
      <datetime v-model="forms.s_starttime" format="HH:mm" title="开始时间"></datetime>
      <datetime v-model="forms.s_endtime" format="HH:mm" title="结束时间"></datetime>
      <v-search title="休息时长" :cdata="xxscList" v-model="forms.s_relex_hours"></v-search>
      <x-textarea title="调班原因" v-model="forms.s_why" placeholder="" :show-counter="false" :rows="3" autosize></x-textarea>
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
import moment from 'moment'
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
        s_date: '',
        s_starttime: '',
        s_endtime: '',
        s_relex_hours: '0',
        s_why: '',
        parmasOption: {}
      },
      systemDate: moment().format('YYYY-MM-DD'),
      systemDate2: moment().format('HH:mm'),
      xxscList: [{'key': '0', 'value': '0'}, {'key': '0.5', 'value': '0.5'}, {'key': '1', 'value': '1'}, {'key': '1.5', 'value': '1.5'}]
    }
  },
  methods: {
    addReserve(flag) {
      if (this.forms.s_date === '') {
        whole.showTop('请选择调班日期')
        return;
      }
      if (this.forms.s_starttime === '') {
        whole.showTop('请选择开始时间')
        return;
      }
      if (this.forms.s_endtime === '') {
        whole.showTop('请选择结束时间')
        return;
      }
      let parmas = {
        mainModel: this.forms
      }
      this.parmasOption = parmas;
      console.log(parmas)

      if (flag === 0) {
        let _that = this;
        api.getNextAssignOverTimeURL(parmas, function (res) {
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
        api.getSaveOverTimeURL(parmas, function (res) {
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
      api.getStartOverTimeURL(_that.parmasOption, function (res) {
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
