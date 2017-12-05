<template>
  <div>
    <group title="申请信息">
      <v-search title="选择岗位" :cdata="positionList" v-model="forms.postid"></v-search>
      <v-search title="费用承担公司" :cdata="burkList" v-model="forms.m_comp"></v-search>
      <v-search title="费用归集成本中心" :noticeDesc="noticeDesc" :cdata="kostlList" v-model="forms.m_cbzx" @on-show="changeBurks"></v-search>
      <!-- <v-search title="费用所属事业部" :cdata="burkList" v-model="forms.m_comp"></v-search> -->
    </group>
    <sticky>
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addReserveOption()">添加备用金</x-button>
      </box>
    </sticky>
    <group title="备用金汇总" v-if="formsData.length > 0">
      <cell v-for="d in formsData" :key="d.uuid" :title="d.tp[0]" is-link @click.native="addReserveOption(d)">{{d}}</cell>
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
import {Group, Sticky, Box, XButton, Cell, Flexbox, FlexboxItem} from 'vux';
import vSearch from '@/components/searchChecker';
import api from 'api';
import whole from '@/lib/whole'
import {mapGetters} from 'vuex'
import dataUtils from '../../filters/dataUtils' // 工具类

export default {
  // {"postid":"20042474",
  // "phone":"",
  // "proc_inst_id":"",
  // "bukrs":"2011",
  // "userid":"",
  // "syspostname":"",
  // "appid":"",
  // "id":"",
  // "akostl":" ",
  // "username":" ",
  // "bukrsAkostl":" ",
  // "aktext":" ",
  // "cdkostls":"20112010",
  // "tello":"","sysdeptid":" ",
  // "bukrs1":"",
  // "pernr":"",
  // "sysbusinessunitid":"",
  // "gjahr":"",
  // "cdbukrsname":"财务中心",
  // "businessistrue":false,
  // "sysbusinessunitname":"",
  // "email":"",
  // "bankl":"",
  // "cdbukrs":"1085",
  // "bankn":"",
  // "cdkostlsname":"",
  // "sysdeptname":""}
  components: {
    Group, Sticky, Box, XButton, Cell, Flexbox, FlexboxItem, vSearch
  },
  data () {
    return {
      forms: {
        postid: '',
        m_comp: '',
        m_cbzx: ''
      },
      positionList: [],
      burkList: [],
      kostlList: []
    }
  },
  computed: {
    ...mapGetters({
      formsData: 'getReserveInfos',
      formsInfos: 'getReserveInfos'
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
      console.log(this.formsInfos);
      this.forms.postid = this.formsInfos.forms.postid;
      this.forms.m_comp = this.formsInfos.forms.m_comp;
      this.forms.m_cbzx = this.formsInfos.forms.m_cbzx;
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
        let params1 = {
          bukrs: bukrs
        }
        api.getBusinessDepartment(params1, function (res) {
          if (res) {
            // _that.kostlList = res.data.data.kostlrulist
            console.log(res);
          }
        })
      }
    },
    addReserveOption (data = {}) {
      if (this.forms.m_comp > 0) {
        let info = {
          forms: this.forms
        }
        this.$store.dispatch('addReserveInfo', info)

        let formsDemo = {};
        formsDemo = {
          bukrs: this.forms.m_comp,
          formsData: JSON.stringify(data)
        };

        console.log(formsDemo);

        this.$router.push({path: '/addReserve', query: {formsDemo: formsDemo}})
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
        depositApp: {
          appda: new Date().getTime(),
          postid: this.forms.postid,
          syspostname: syspostname,
          m_comp: this.forms.m_comp,
          m_compnm: m_compnm,
          m_cbzx: this.forms.m_cbzx,
          m_cbzxnm: m_cbzxnm
        },
        subs: demoArray
      }

      console.log(parmas);

      if (flag === 0) {
        console.log('提交');
          // let _that = this;
          // api.getStartTravelWFURL(parmas, function (res) {
          //   if (res) {
          //     if (res.status === 200) {
          //       whole.showTop('提交成功');
          //       _that.$router.go(-1)
          //     }
          //   }
          // })
      } else if (flag === 1) {
        console.log('保存');
        // let _that = this;
        // api.getSaveTravelURL(parmas, function (res) {
        //   if (res) {
        //     if (res.status === 200) {
        //       whole.showTop('保存成功');
        //       _that.$router.go(-1)
        //     }
        //   }
        //   console.log(res);
        // })
      }
    }
  }
}
</script>
