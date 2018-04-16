<template>
  <div>
    <group title="填写工作交接表单">
      <x-textarea title="工作事项" placeholder="请填写工作事项" :rows="4" autosize v-model="infos.gzsx"></x-textarea>
      <datetime format="YYYY-MM-DD" title="开始日期" v-model="infos.starttime" :end-date="edate"></datetime>
      <datetime format="YYYY-MM-DD" title="结束日期" v-model="infos.endtime" :start-date="infos.starttime" :end-date="edate"></datetime>
      <cell title="接收姓名" is-link @click.native="selectPerson()"  v-model="infos.jsrxm"></cell>
      <cell title="ITCODE" readonly v-model="infos.jsritcode" text-align="right"></cell>
      <!--<cell title="联系方式" v-model="infos.jsrdh" text-align="right"></cell>-->
      <x-input  title="联系方式" v-model="infos.jsrdh" text-align="right"></x-input>
      <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="infos.uuid"></x-input>
    </group>
    <!--<x-button @click.native="btnSubmit()" type="primary">提交</x-button>-->
    <flexbox class="footerButton">
      <flexbox-item>
        <x-button @click.native="btnSubmit()" type="primary">保存</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {Group, XTextarea, Cell, XInput, Datetime, XButton, FlexboxItem, Flexbox} from 'vux'
  import whole from '@/lib/whole'
  import api from 'api'
  import ding from '@/lib/ding'
  // import DEM from '@/lib/dingErrMessage'
  // import {mapGetters} from 'vuex'
  // import dataUtils from '../../filters/dataUtils' // 工具类
  export default {
    components: {
      Group, XTextarea, Cell, XInput, Datetime, XButton, FlexboxItem, Flexbox
    },
    created () {
      let sdatee = this.$route.query.formsDemo.sdate
      let edatee = this.$route.query.formsDemo.edate
      this.sdate = sdatee
      this.edate = edatee
      if (this.infos.starttime === '') {
        this.infos.starttime = sdatee
      }
      // alert(JSON.stringify(edate))
      let data = this.$route.query.formsDemo.formsData
      if (data === '{}') {
      } else {
        if (typeof data === 'string') {
          // eslint-disable-next-line
          data = eval('(' + data + ')');
        }
        this.infos.gzsx = data.j_gzsx
        this.infos.starttime = data.j_starttime
        this.infos.endtime = data.j_endtime
        this.infos.jsrxm = data.j_jsrxm
        this.infos.jsritcode = data.j_jsritcode
        this.infos.jsrdh = data.j_jsrdh
        this.infos.jsrpernr = data.j_jsrpernr
        this.infos.uuid = data.uuid
      }
    },
    data () {
      return {
        infos: {
          gzsx: '',
          starttime: '',
          endtime: '',
          jsrxm: '',
          jsritcode: '',
          jsrdh: '',
          jsrpernr: '',
          uuid: ''
        },
        sdate: '',
        edate: '',
        btnshow: false,
        flag: false,
        index: Number
      }
    },
    methods: {
      selectPerson() {
        let _that = this
        let dd = window.dd;
        dd.ready(function () {
          dd.biz.contact.complexPicker({
            title: '选择人员并交接工作',
            corpId: ding.getItemInLocation().corpId || ding.CORPID,
            multiple: false,
            limitTips: '请选择要交接的人员',
            maxUsers: 1,
            appId: 126759727,
            permissionType: 'GLOBAL',
            responseUserOnly: false,
            startWithDepartmentId: 0,
            onSuccess: function (result) {
              if (result.users.length > 0) {
                let ddids = result.users[0].emplId
                _that.infos.jsrxm = result.users[0].name
                api.getUserInfoDdid(ddids, res => {
                  if (res.data.code === true) {
                  _that.infos.jsrpernr = res.data.pernr
                  _that.infos.jsritcode = res.data.itcode
                  _that.infos.jsrdh = res.data.telephone
                  }
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
      btnSubmit() {
        let _that = this
        if (_that.infos.gzsx === '') {
          whole.showTop('请填写工作事项')
          return;
        }
        if (_that.infos.starttime === '') {
          whole.showTop('请选择开始日期')
          return;
        }
        if (_that.infos.endtime === '') {
          whole.showTop('请选择结束日期')
          return;
        }
        if (_that.infos.jsrxm === '') {
          whole.showTop('请选择接收人')
          return;
        }
        let formData = {
          j_gzsx: _that.infos.gzsx,
          j_jsrpernr: _that.infos.jsrpernr,
          j_jsrxm: _that.infos.jsrxm,
          j_jsritcode: _that.infos.jsritcode,
          j_jsrdh: _that.infos.jsrdh,
          j_starttime: _that.infos.starttime,
          j_endtime: _that.infos.endtime,
          uuid: _that.infos.uuid,
          index: _that.index
        }
        this.$store.dispatch('addConnect', formData)
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
