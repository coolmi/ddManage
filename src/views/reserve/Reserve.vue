<template>
  <div>
    <group title="申请信息">
      <v-search title="选择岗位" :cdata="positionList" v-model="forms.postid"></v-search>
      <v-search title="费用承担公司" :cdata="burkList" v-model="forms.cdbukrs"></v-search>
      <v-search title="费用归集成本中心" :noticeDesc="noticeDesc" :cdata="kostlList" v-model="forms.cdkostls" @on-show="changeBurks"></v-search>
      <v-search title="费用所属事业部" :noticeDesc="noticeDesc" :cdata="departments" v-model="forms.businessunitid" @on-show="changeDepart"></v-search>
    </group>
    <sticky>
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addReserveOption()">添加备用金</x-button>
      </box>
    </sticky>
    <group title="备用金汇总" v-if="formsData.length > 0" style="margin-bottom: 60px;">
      <cell v-for="d in formsData" :key="d.uuid" :title="d.stype.toString()" is-link @click.native="addReserveOption(d)">{{d}}</cell>
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
import {Group, Sticky, Box, XButton, Scroller, Cell, Flexbox, FlexboxItem} from 'vux';
import vSearch from '@/components/searchChecker';
import api from 'api';
import whole from '@/lib/whole'
import {mapGetters} from 'vuex'
import dataUtils from '../../filters/dataUtils' // 工具类

export default {
  components: {
    Group, Sticky, Box, XButton, Scroller, Cell, Flexbox, FlexboxItem, vSearch
  },
  data () {
    return {
      forms: {
        postid: '',
        cdbukrs: '',
        cdkostls: '',
        businessunitid: ''
      },
      positionList: [],
      burkList: [],
      kostlList: [],
      departments: []
    }
  },
  computed: {
    ...mapGetters({
      formsData: 'getReserveFroms',
      formsInfos: 'getReserveInfos'
    }),
    noticeDesc() {
      let desc = '请选择'
      if (this.forms.postid === '') {
        desc = '请选择岗位'
      } else if (this.forms.cdbukrs === '') {
        desc = '请选择费用承担公司'
      }
      return desc
    }
  },
  created() {
    this.getBaseData() // 请求部门和费用承担公司
    this.setData() // 填写的时候回退保存值
    if (this.forms.postid !== '' && this.forms.cdbukrs !== '') {
      this.changeBurks(this.forms.postid, this.forms.cdbukrs)
      this.changeDepart(this.forms.postid, this.forms.cdbukrs)
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
      this.forms.cdbukrs = this.formsInfos.forms.cdbukrs;
      this.forms.cdkostls = this.formsInfos.forms.cdkostls;
      this.forms.businessunitid = this.formsInfos.forms.businessunitid;
    },
    changeBurks(postid, bukrs) {
      if (this.forms.postid !== '' && this.forms.cdbukrs !== '') {
        postid = this.forms.postid;
        bukrs = this.forms.cdbukrs;
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
    changeDepart(postid, bukrs) {
      if (this.forms.postid !== '' && this.forms.cdbukrs !== '') {
        postid = this.forms.postid;
        bukrs = this.forms.cdbukrs;
        let params = {
          bukrs: bukrs
        }
        let _that = this;
        api.getBusinessDepartment(params, function (res) {
          if (res) {
            _that.departments = res.data.data.departments
          }
        })
      }
    },
    addReserveOption (data = {}) {
      if (this.forms.cdbukrs > 0) {
        let info = {
          forms: this.forms
        }
        this.$store.dispatch('addReserveInfo', info)

        let formsDemo = {};
        formsDemo = {
          bukrs: this.forms.cdbukrs,
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
      if (this.forms.cdbukrs === '') {
        whole.showTop('请选择费用承担中心')
        return;
      }
      if (this.forms.cdkostls === '') {
        whole.showTop('请选择费用归集成本中心')
        return;
      }
      if (this.forms.businessunitid === '') {
        whole.showTop('费用所属事业部')
        return;
      }
      var cdbukrsname = dataUtils.getDescValue(this.burkList, this.forms.cdbukrs);
      var cdkostlsname = dataUtils.getDescValue(this.kostlList, this.forms.cdkostls);
      var businessunitname = dataUtils.getDescValue(this.departments, this.forms.businessunitid);

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
          cdbukrs: this.forms.cdbukrs,
          cdbukrsname: cdbukrsname,
          cdkostls: this.forms.cdkostls,
          cdkostlsname: cdkostlsname,
          businessunitid: this.forms.businessunitid,
          businessunitname: businessunitname
        },
        resegs: demoArray
      }

      console.log(parmas);

      if (flag === 0) {
          let _that = this;
          api.getStartDepositWFURL(parmas, function (res) {
            if (res) {
              if (res.data.code) {
                whole.showTop(res.data.message);
                _that.$router.go(-1)
              } else {
                whole.showTop(res.data.message);
                _that.$router.go(-1)
              }
            }
          })
      } else if (flag === 1) {
        let _that = this;
        api.getSaveDepositResegsURL(parmas, function (res) {
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
    }
  }
}
</script>
