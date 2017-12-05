<template>
  <div>
    <group title="申请信息">
      <v-search title="选择岗位" :cdata="positionList" v-model="forms.postid"></v-search>
      <v-search title="费用承担公司" :cdata="burkList" v-model="forms.m_comp"></v-search>
      <v-search title="费用归集成本中心" :noticeDesc="noticeDesc" :cdata="kostlList" v-model="forms.m_cbzx" @on-show="changeBurks"></v-search>
      <!-- <popup-picker title="选择岗位" :data="positionList" :columns="1" v-model="forms.postid" show-name></popup-picker>
      <cell title="费用承担公司" is-link @click.native="show1 = true">{{stringDemo}}</cell> -->
      <x-switch title="是否提高标准" :value-map="['0', '1']" v-model="beup"></x-switch>
      <x-textarea v-show="beup === '1'" title="提高标准原因" v-model="reason" placeholder="请输入提高标准原因" :show-counter="false" :rows="3" autosize></x-textarea>
    </group>
    <sticky>
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addBusinessTripOption()">添加出差申请明细</x-button>
      </box>
    </sticky>
    <group title="出差申请明细列表" v-if="formsData.length > 0">
      <cell v-for="d in formsData" :key="d.uuid" :title="d.tp[0]" is-link @click.native="addBusinessTripOption(d)">{{d}}</cell>
    </group>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addReserve(0)" style="color:#00B705">提交</flexbox-item>
      <flexbox-item @click.native="addReserve(1)" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>
<style scoped lang="less" type="text/less">
.footerButton {
  padding-bottom: 10px;
  text-align: center;
}
</style>
<script>
import {Group, XSwitch, XTextarea, Sticky, Box, XButton, Cell, Flexbox, FlexboxItem} from 'vux';
import vSearch from '@/components/searchChecker';
import api from 'api';
import whole from '@/lib/whole'
import {mapGetters} from 'vuex'
import dataUtils from '../../filters/dataUtils' // 工具类

export default {
  components: {
    Group, XSwitch, XTextarea, Sticky, Box, XButton, Cell, Flexbox, FlexboxItem, vSearch
  },
  data () {
    return {
      forms: {
        postid: '',
        m_comp: '',
        m_cbzx: ''
      },
      beup: '0',
      reason: '',
      positionList: [],
      burkList: [],
      kostlList: []
    }
  },
  computed: {
    ...mapGetters({
      formsData: 'getBusinessTripForms',
      formsInfos: 'getBusinessTripInfos'
    }),
    noticeDesc() {
      let desc = '请选择'
      if (this.forms.postid === '') {
        desc = '请选择岗位'
      } else if (this.forms.m_comp === '') {
        desc = '请选择费用承担公司'
      }
      return desc
    }
  },
  created() {
    this.getBaseData() // 请求部门和费用承担公司
    this.setData() // 填写的时候回退保存值
    if (this.forms.postid !== '' && this.forms.m_comp !== '') {
      this.changeBurks(this.forms.postid, this.forms.m_comp)
    }
  },
  methods: {
    getBaseData() {
      let _that = this;
      api.getPosition(function (res) {
        if (res) {
          _that.positionList = res.positionlist
          _that.burkList = res.bukrlist
        }
      })
    },
    setData() {
      this.forms.postid = this.formsInfos.forms.postid;
      this.forms.m_comp = this.formsInfos.forms.m_comp;
      this.forms.m_cbzx = this.formsInfos.forms.m_cbzx;
      this.beup = this.formsInfos.beup;
      this.reason = this.formsInfos.reason;
    },
    changeBurks(postid, bukrs) {
      if (this.forms.postid !== '' && this.forms.m_comp !== '') {
        postid = this.forms.postid;
        bukrs = this.forms.m_comp;
        let params = {
          postid: postid,
          bukrs: bukrs
        }
        let _that = this;
        api.getKostal(params, function (res) {
          if (res) {
            _that.kostlList = res.data.data.kostlrulist
          }
        })
      }
    },
    addBusinessTripOption (data = {}) {
      if (this.forms.m_comp > 0) {
        let info = {
          forms: this.forms,
          beup: this.beup,
          reason: this.reason
        }
        this.$store.dispatch('addBusinessTripInfo', info)

        let formsDemo = {};
        if (data.tp === undefined) {
          if (this.formsData.length === 0) {
            formsDemo = {
              bukrs: this.forms.m_comp,
              flag: 0,
              formsData: JSON.stringify(data)
            };
          } else if (this.formsData.length === 1) {
            formsDemo = {
              bukrs: this.forms.m_comp,
              flag: 1,
              formsData: JSON.stringify(data)
            };
          } else if (this.formsData.length === 2) {
            whole.showTop('已完善出差申请明细，无需再次添加')
            return;
          }
        } else {
          formsDemo = {
            bukrs: this.forms.m_comp,
            flag: 0,
            formsData: JSON.stringify(data)
          };
        }

        this.$router.push({path: '/addBusinessTrip', query: {formsDemo: formsDemo}})
      } else {
        whole.showTop('请选择费用承担公司')
      }
    },
    addReserve(flag) {
      if (this.forms.postid === '') {
        whole.showTop('请选择岗位')
        return;
      }
      if (this.forms.m_comp === '') {
        whole.showTop('请选择费用承担中心')
        return;
      }
      if (this.forms.m_cbzx === '') {
        whole.showTop('请选择费用归集成本中心')
        return;
      }
      if (this.beup === '1') {
        if (this.reason === '') {
          whole.showTop('请填写提高标准原因')
          return;
        }
      }
      var syspostname = dataUtils.getDescValue(this.positionList, this.forms.postid);
      var m_compnm = dataUtils.getDescValue(this.burkList, this.forms.m_comp);
      var m_cbzxnm = dataUtils.getDescValue(this.kostlList, this.forms.m_cbzx);

      var demoArray = [];
      this.formsData.map(function (item) {
        let demo = {};
        for (var v in item) {
          if (item[v] instanceof Array) {
            demo[v] = item[v].toString()
          } else if (item[v].match(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)) {
            demo[v] = new Date(item[v].replace(/-/g, '/')).getTime()
          } else {
            demo[v] = item[v]
          }
        }
        demoArray.push(demo)
      });

      let parmas = {
        travel: {
          appda: new Date().getTime(),
          postid: this.forms.postid,
          syspostname: syspostname,
          m_comp: this.forms.m_comp,
          m_compnm: m_compnm,
          m_cbzx: this.forms.m_cbzx,
          m_cbzxnm: m_cbzxnm,
          beup: this.beup,
          reason: this.reason
        },
        subs: demoArray
      }

      if (parmas.subs.length < 2) {
        whole.showTop('请完善出差申请明细');
        return;
      } else if (flag === 0) {
          let _that = this;
          api.getStartTravelWFURL(parmas, function (res) {
            if (res) {
              if (res.status === 200) {
                whole.showTop('提交成功');
                _that.$router.go(-1)
              }
            }
          })
      } else if (flag === 1) {
        let _that = this;
        api.getSaveTravelURL(parmas, function (res) {
          if (res) {
            if (res.status === 200) {
              whole.showTop('保存成功');
              _that.$router.go(-1)
            }
          }
          console.log(res);
        })
      }
    }
  }
}
</script>
