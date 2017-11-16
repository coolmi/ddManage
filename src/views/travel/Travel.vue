<template>
  <div>
    <group title="基本信息">
      <popup-picker readonly="true" title="是否出国" :data="depList" v-model="forms.department" :columns="3" show-name></popup-picker>
      <popup-picker readonly="true" title="出差类型" :data="depList" v-model="forms.department" :columns="3" show-name></popup-picker>
      <popup-picker readonly="true" title="选择部门" :data="depList" v-model="forms.department" :columns="3" show-name></popup-picker>
      <x-input title="是否提高标准"></x-input>
    </group>
    <sticky :offset="50">
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addTravel()">添加出差明细</x-button>
      </box>
    </sticky>
    <group title="备用金列表" v-if="formsData.length > 0">
      <cell v-for="d in formsData" :key="d.uuid" :title="d.cfrq" is-link @click.native="addTravel(d)"></cell>
    </group>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addTravel" style="color:#00B705">提交</flexbox-item>
      <flexbox-item @click.native="saveTravel" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {Box, XButton, PopupPicker, Group, Cell, FlexboxItem, Flexbox, Sticky, XInput} from 'vux'
  import { mapGetters } from 'vuex';
  import * as _ from 'underscore'

  export default {
    components: {
      Box, XButton, PopupPicker, Group, Cell, FlexboxItem, Flexbox, Sticky, XInput
    },
    data() {
      return {
        forms: {
          department: []
        },
        depList: [
          {
            name: '系统开发科',
            value: '123'
          },
          {
            name: '系统开发科1',
            value: '1231'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        formsData: 'getTravelFroms',
        infos: 'getTravelInfos',
        showCity: 'showCity',
        startCity: 'startCity',
        endCity: 'endCity'
      })
    },
    created() {
      this.setData()
    },
    methods: {
      addTravel(data = {}) {
        let info = {
          department: this.forms.department[0]
        }
        this.$store.dispatch('addTravelInfo', info)
        this.$router.push({path: '/addTravel', query: {formsData: JSON.stringify(data)}})
      },
      setData() {
        let forms = this._data.forms;
        let _that = this;
        Object.keys(forms).forEach(key => {
          if (_.isArray(_that.forms[key])) {
            _that.forms[key][0] = _that.infos[key]
          } else {
            _that.forms[key] = _that.infos[key]
          }
        })
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  .footerButton {
    text-align: center;
  }
</style>
