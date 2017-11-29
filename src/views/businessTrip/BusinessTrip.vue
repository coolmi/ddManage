<template>
  <div>
    <group title="申请信息">
      <popup-picker title="选择岗位" :data="positionList" :columns="1" v-model="forms.postid" show-name></popup-picker>
      <cell title="费用承担公司" is-link @click.native="show1 = true">{{stringDemo}}</cell>
      <popup-picker title="费用归集成本中心" :show.sync="showKostlPopup" :data="kostlList" v-model="forms.m_cbzx" :columns="1" show-name  @on-show="changeBurks"></popup-picker>
      <x-switch title="是否提高标准" :value-map="['0', '1']" v-model="beup"></x-switch>
      <x-textarea v-show="beup === '1'" title="提高标准原因" v-model="reason" placeholder="请输入提高标准原因" :show-counter="false" :rows="3" autosize></x-textarea>
    </group>
    <sticky>
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addBusinessTrip()">添加出差申请明细</x-button>
      </box>
    </sticky>
    <group title="出差申请明细列表" v-if="formsData.length > 0">
      <cell v-for="d in formsData" :key="d.uuid" :title="d.tp[0]" is-link @click.native="addBusinessTrip(d)">{{d}}</cell>
    </group>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addReserve" style="color:#00B705">提交</flexbox-item>
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
    <div v-transfer-dom>
      <popup v-model="show1" position="bottom" max-height="70%">
        <search
          @result-click="resultClick"
          @on-change="getResult"
          :results="burksListS"
          v-model="value"
          position="absolute"
          @on-cancel="onCancel"
          auto-scroll-to-top
          autoFixed
          ref="search"></search>
        <checklist :options="burksList" v-model="forms.m_comp" :max="1" @on-change="change1"></checklist>
      </popup>
    </div>
  </div>
</template>
<script>

import {Group, PopupPicker, XSwitch, XTextarea, Sticky, Cell, Box, XButton, FlexboxItem, Flexbox, TransferDom, Popup, Search, Checklist} from 'vux'
import {mapGetters} from 'vuex'
import api from 'api' // 接口
import dataUtils from '../../filters/dataUtils' // 工具类
import whole from '@/lib/whole' // 封装组件库

var demo = [];
export default {
  directives: {
    TransferDom
  },
  components: {
    Group, PopupPicker, XSwitch, XTextarea, Sticky, Cell, Box, XButton, FlexboxItem, Flexbox, Popup, Search, Checklist
  },

  data () {
    return {
      value: '',
      beup: '0',
      reason: '',
      stringDemo: '',
      isShow: false,
      showKostlPopup: false,
      show1: false,
      forms: {
        postid: [],
        m_comp: [],
        m_cbzx: []
      },
      positionList: [],
      positionListP: [],
      burksList: [],
      burksListS: [],
      kostlList: []
    }
  },

  computed: {
    ...mapGetters({
      formsData: 'getBusinessTripForms'
    })
  },

  watch: {
    positionList: function (val) {
      this.forms.postid[0] = val[0].value
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
          _that.positionList = dataUtils.getListValue(res.positionlist) // PopupPicker格式
          _that.bukrlistP = dataUtils.getListValue(res.bukrlist) // PopupPicker格式
          _that.burksList = res.bukrlist // CheckList格式
          _that.burksListS = dataUtils.getListSearchValue(res.bukrlist) // Search格式
          demo = _that.burksListS;
        }
      })
    },
    changeBurks() {
    if (this.forms.postid.length > 0 && this.forms.m_comp > 0) {
      let postid = this.forms.postid[0];
      let bukrs = this.forms.m_comp[0];
      let params = {
        postid: postid,
        bukrs: bukrs
      }
      let _that = this;
      api.getKostal(params, function (res) {
        if (res) {
          _that.kostlList = dataUtils.getListValue(res.data.kostlrulist) // 转换可识别的样式
        } else {
          this.showKostlPopup = false
        }
      })
      } else {
        whole.showTop('请选择费用承担公司')
        this.showKostlPopup = false
      }
    },
    // 提交
    addReserve () {
      var syspostname = dataUtils.getDescValue(this.positionList, this.forms.postid);

      var m_compnm = dataUtils.getDescValue(this.bukrlistP, this.forms.m_comp);

      var m_cbzxnm = dataUtils.getDescValue(this.kostlList, this.forms.m_cbzx);

      var demoArray = this.formsData;
      demoArray.map(function (item) {
        for (var v in item) {
          if (item[v] instanceof Array) {
            item[v] = item[v].toString()
          }
        }
        demoArray.push(item);
      });
      console.log(demoArray);

      let parmas = {
        travel: {
          appda: new Date().getTime(),
          postid: this.forms.postid.toString(),
          syspostname: syspostname,
          m_comp: this.forms.m_comp.toString(),
          m_compnm: m_compnm,
          m_cbzx: this.forms.m_cbzx.toString(),
          m_cbzxnm: m_cbzxnm,
          beup: this.beup,
          reason: this.reason
        },
        subs: this.formsData
      }
      console.log(parmas);
      // api.getStartTravelWFURL(parmas, function (res) {
      //   if (res) {
      //     if (res.status === 200) {
      //       whole.showTop('提交成功');
      //     }
      //   }
      // })
    },
    addBusinessTrip (data = {}) {
      if (this.forms.m_comp > 0) {
        let formsDemo = {
          bukrs: this.forms.m_comp[0],
          formsData: JSON.stringify(data)
        };
        this.$router.push({path: '/addBusinessTrip', query: {formsDemo: formsDemo}})
      } else {
        whole.showTop('请选择费用承担公司')
      }
    },
    saveReserve () {
      console.log('保存')
    },
    change1 (val, label) {
      this.stringDemo = label.toString();
    },
    resultClick (item) {
      let rs1 = item.key.split();
      this.forms.m_comp = rs1;
      this.show1 = false
    },
    getResult (val) {
      this.burksListS = val ? burksListSC(this.value) : []
    },
    onCancel () {
      console.log('on cancel')
    }
  }
}

function burksListSC (val) {
  let rs = [];
  demo.map(function (item) {
    if (item.key === val) {
      rs.push({
        title: item.title,
        key: item.key
      })
    }
  });
  // console.log(rs);
  return rs;
}
</script>
<style scoped lang="less" type="text/less">
.footerButton {
  padding-bottom: 10px;
  text-align: center;
}
</style>
