<template>
  <div>
    <group title="申请信息">
      <popup-picker title="选择部门" :data="positionList" :columns="1" v-model="forms.department" show-name></popup-picker>
      <popup-picker title="费用承担公司" :data="burksList" :columns="1" v-model="forms.burks" show-name></popup-picker>
      <popup-picker title="费用归集成本中心" :data="kostlList" v-model="forms.kostl" :columns="1" show-name  @on-show="changeBurks"></popup-picker>
      <x-switch title="是否提高标准" :value-map="['0', '1']" v-model="stringCheck"></x-switch>
      <x-textarea v-show="stringCheck === '1'" title="提高标准原因" v-model="stringValue" placeholder="请输入提高标准原因" :show-counter="false" :rows="3" autosize></x-textarea>
    </group>
    <group title="出发日期">
      <datetime v-model="value" @on-change="change" title="选择日期" clear-text="清除" @on-clear="clearDate"></datetime>
    </group>
    <sticky>
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addBusinessTrip">添加出差申请明细</x-button>
      </box>
    </sticky>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addReserve" style="color:#00B705">提交</flexbox-item>
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>
<script>

import {Group, PopupPicker, XSwitch, XTextarea, Sticky, Box, XButton, Datetime, FlexboxItem, Flexbox} from 'vux'
import api from 'api' // 接口
import dataUtils from '../../filters/dataUtils' // 工具类
import whole from '@/lib/whole' // 封装组件库

export default {

  components: {
    Group, PopupPicker, XSwitch, XTextarea, Sticky, Box, XButton, Datetime, FlexboxItem, Flexbox
  },

  data () {
    return {
      value: '',
      stringCheck: '0',
      stringValue: '',
      isShow: false,
      forms: {
        department: [],
        burks: [],
        kostl: []
      },
      positionList: [],
      burksList: [],
      kostlList: []
    }
  },

  watch: {
    positionList: function (val) {
      this.forms.department[0] = val[0].value
    },
    burksList: function (val) {
      this.forms.burks[0] = val[0].value
    }
  },

  created() {
    // this.setData() // 填写的时候回退保存值
    this.getBaseData() // 请求部门和费用承担公司
  },

  methods: {
    getBaseData() {
      let _that = this;
      api.getPosition(function (res) {
        if (res) {
          _that.positionList = dataUtils.getListValue(res.positionlist) // 转换可识别的样式
          _that.burksList = dataUtils.getListValue(res.bukrlist) // 转换可识别的样式
        }
      })
    },
    changeBurks() {
    if (this.forms.department.length > 0 && this.forms.burks > 0) {
      let postid = this.forms.department[0];
      let bukrs = this.forms.burks[0];
      let _that = this;
      api.getKostal(postid, bukrs, function (res) {
        if (res) {
          _that.kostlList = dataUtils.getListValue(res.kostlrulist) // 转换可识别的样式
        }
      })
      } else {
        whole.showTop('请选择费用承担公司')
        return false
      }
    },
    addReserve () {
      console.log(this.stringCheck + '------' + this.stringValue);
      console.log(this.forms.department);
      console.log(this.forms.burks);
    },
    addBusinessTrip () {
      this.$router.push({path: '/addBusinessTrip'})
    },
    saveReserve () {
      console.log('保存')
    },
    change (value) {
      console.log('change', value)
    },
    clearDate (value) {
      this.value = ''
      console.log('clear ok')
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
