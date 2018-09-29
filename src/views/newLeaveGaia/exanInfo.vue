<template>
  <div>
    <group title="考勤详细信息">
      <cell title="班别名称" v-model="obj.param2"></cell>
      <cell title="排班日期" v-model="obj.param3val"></cell>
      <cell title="上班时间" v-model="obj.param12val"></cell>
      <cell title="下班时间" v-model="obj.param13val"></cell>
      <cell title="休息方式" v-model="obj.param5"></cell>
      <cell title="休息开始" v-model="obj.param9val"></cell>
      <cell title="休息结束" v-model="obj.param10val"></cell>
      <cell title="休息时长" v-model="obj.param11"></cell>
      <cell title="打卡次数" v-model="obj.param8"></cell>
      <datetime :readonly="ok" title="请假开始" format="HH:mm" :minute-list="['00', '30']"
                v-model="obj.param6val"></datetime>
      <datetime :readonly="ok" title="请假结束" format="HH:mm" :minute-list="['00', '30']"
                v-model="obj.param7val"></datetime>
      <v-search title="请假班次" :cdata="bclist" v-model="param14" @on-hide="changeval(param14)"></v-search>
      <v-search title="包含休息时间" :cdata="xiulist" v-model="param15"></v-search>
    </group>
    <box class="baocun">
      <x-button text="保存" @click.native="saveinfo" type="primary"></x-button>
    </box>
  </div>
</template>

<script>
  import vSearch from '@/components/searchChecker';
  import whole from '@/lib/whole'
  import dateFormatter from '@/lib/dateFormatter'
  import {Group, DatetimeRange, Cell, XInput, Datetime, XTextarea, XButton, FlexboxItem, Flexbox, Box} from 'vux'

  export default {
    data() {
      return {
        ok: true,
        obj: {
          param2: '',
          param3val: '',
          param12val: '',
          param13val: '',
          param5: '',
          param9val: '',
          param10val: '',
          param11: '',
          param8: '',
          param6val: '',
          param7val: ''
        },
        bclist: [{'key': 'all', 'value': '全天'}, {'key': 'upper', 'value': '上半班次'},
          {'key': 'lower', 'value': '下半班次'}, {'key': 'costom', 'value': '自定义'}],
        xiulist: [{'key': 'yes', 'value': '是'}, {'key': 'no', 'value': '否'}],
        param14: 'all',
        param15: 'yes',
        param6val: '',
        param7val: ''
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
      Flexbox,
      vSearch,
      Box
    },
    created() {
      this.obj = this.$route.query.pjo
      this.param6val = this.$route.query.pj.param6val
      this.param7val = this.$route.query.pj.param7val
    },
    methods: {
      changeval(val) {
        console.log(val)
        if (val === 'costom') {
          this.ok = false
          this.obj.param6val = ''
          this.obj.param7val = ''
        } else {
          this.obj.param6val = this.param6val
          this.obj.param7val = this.param7val
        }
      },
      formatDate (val) {
        let myDate = new Date(val).getTime()
        return dateFormatter.fmtDate(myDate, 'yyyy-MM-dd')
      },
      saveinfo() {
        let _that = this
        if (_that.obj.param6val === '') {
          whole.showTop('请填写请假开始时间')
          return;
        }
        if (_that.obj.param7val === '') {
          whole.showTop('请填写请假结束时间')
          return;
        }
        let formsData = {
          param1: '工作日',
          param1num: '1',
          param2: _that.obj.param2,
          param2num: _that.obj.param2,
          param3: this.formatDate(_that.obj.param3val),
          param4: this.formatDate(_that.obj.param3val),
          param3val: _that.obj.param3val,
          param4val: _that.obj.param3val,
          param5: _that.obj.param5,
          param6val: _that.obj.param6val,
          param7val: _that.obj.param7val,
          param8: _that.obj.param8,
          param9val: _that.obj.param9val,
          param10val: _that.obj.param10val,
          param11: _that.obj.param11,
          param12val: _that.obj.param12val,
          param13val: _that.obj.param13val,
          param14: _that.param14,
          param15: _that.param15,
          param16: '',
          param17: '',
          param18: '8.0',
          param19: ''
        }
        console.log('我是P3--' + formsData.param3)
        this.$store.dispatch('dailyInfo', formsData)
        whole.showTop('保存成功');
        setTimeout(() => {
          this.$router.go(-1)
        }, 1000);
      }
    }
  }
</script>

<style scoped lang='less'>
  @import '~vux/src/styles/1px.less';

  .baocun {
    margin-top: 1.5rem;
  }

</style>
