<template>
  <div>
    <group title="基本信息" label-width="7.5rem" value-align="left">
      <v-search title="选择部门" :cdata="positionList" v-model="personReimInfos.department"></v-search>
      <v-search title="费用承担公司" :cdata="bukrsList" v-model="personReimInfos.bukrs"></v-search>
      <v-search title="费用归集成本中心" :noticeDesc="noticeDesc" :cdata="kostlList" v-model="personReimInfos.kostl" @on-show="changeBukrs"></v-search>
      <x-input title="附件数"></x-input>
      <x-textarea title="说明"></x-textarea>
    </group>
    <sticky :offset="50">
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addPreim()">添加报销单</x-button>
      </box>
    </sticky>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addPreim" style="color:#00B705">提交</flexbox-item>
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {Box, XButton, PopupPicker, XInput, XTextarea, Group, Cell, FlexboxItem, Flexbox, Sticky} from 'vux'
  import vSearch from '@/components/searchChecker';
  import dataUtils from '@/filters/dataUtils'
  import api from 'api'
  import {mapGetters} from 'vuex'
  import * as _ from 'underscore'

  export default {
    components: {
      Box, XButton, PopupPicker, XInput, XTextarea, Group, Cell, FlexboxItem, Flexbox, Sticky, vSearch
    },
    data() {
      return {
        personReimInfos: {
          department: '',
          bukrs: '',
          kostl: ''
        },
        positionList: [],
        bukrsList: [],
        kostlList: []
      }
    },
    computed: {
      ...mapGetters({
        stateformsDatas: 'getPersonReimFroms',
        statePersonReimInfos: 'getPersonReimInfos'
      }),
      noticeDesc() {
        let desc = '请选择'
        if (this.personReimInfos.department === '') {
          desc = '请选择岗位'
        } else if (this.personReimInfos.department === '') {
          desc = '请选择公司'
        }
        return desc;
      }
    },
    created() {
      this.personReimInfos = _.isEmpty(this.statePersonReimInfos) ? this.personReimInfos : this.statePersonReimInfos
      this.getBaseData()
    },
    methods: {
      getBaseData() {
        let _that = this;
        api.getPosition(function (res) {
          if (res) {
            _that.positionList = res.positionlist // 转换可识别的样式
            _that.bukrsList = res.bukrlist // 转换可识别的样式
          }
        })
      },
      changeBukrs() {
        let postid = this.personReimInfos.department;
        let bukrs = this.personReimInfos.bukrs;
        if (bukrs !== '' && postid !== '') {
          let params = {
            postid: postid,
            bukrs: bukrs
          }
          let _that = this;
          api.getKostal(params, function (res) {
            if (res.data.code && res.data.data) {
              _that.kostlList = res.data.data.kostlrulist
            } else {
              _that.noticeDesc = '获取接口出错'
            }
          })
        }
      },
      addPreim() {
        this.$store.dispatch('addPersonReimInfo', this.personReimInfos)
        this.$router.push({path: '/addPreim'})
      },
      saveReserve() {
        console.log(dataUtils.getSummary())
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  .footerButton {
    padding-bottom: 10px;
    text-align: center;
  }
</style>
