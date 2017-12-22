<template>
  <div>
    <group title="申请信息">
      <v-search title="选择岗位" :cdata="positionList" v-model="forms.postid"></v-search>
      <v-search title="费用承担公司" :cdata="burkList" v-model="forms.m_comp"></v-search>
      <v-search title="费用归集成本中心" :noticeDesc="noticeDesc" :cdata="kostlList" v-model="forms.m_cbzx" @on-show="changeBurks"></v-search>
      <!-- <popup-picker title="选择岗位" :data="positionList" :columns="1" v-model="forms.postid" show-name></popup-picker>
      <cell title="费用承担公司" is-link @click.native="show1 = true">{{stringDemo}}</cell> -->
      <x-switch title="是否提高标准" :value-map="['0', '1']" v-model="beup"></x-switch>
      <x-textarea v-show="beupOption" title="提高标准原因" v-model="reason" placeholder="请输入提高标准原因" :show-counter="false" :rows="3" autosize></x-textarea>
    </group>
    <sticky>
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addBusinessTripOption()">添加出差申请明细</x-button>
      </box>
    </sticky>
    <group title="出差申请明细列表" v-if="formsData.length > 0" style="margin-bottom: 60px;">
      <cell v-for="d in formsData" :key="d.uuid" :title="d.tp" is-link @click.native="addBusinessTripOption(d)"></cell>
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
import {Group, XSwitch, XTextarea, Sticky, Box, XButton, Cell, Flexbox, FlexboxItem, Confirm, TransferDomDirective as TransferDom} from 'vux';
import vSearch from '@/components/searchChecker';
import api from 'api';
import whole from '@/lib/whole'
import {mapGetters} from 'vuex'
import dataUtils from '../../filters/dataUtils' // 工具类

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XSwitch, XTextarea, Sticky, Box, XButton, Cell, Flexbox, FlexboxItem, vSearch, Confirm
  },
  data () {
    return {
      forms: {
        postid: '',
        m_comp: '',
        m_cbzx: ''
      },
      showCon: false,
      message: '',
      beup: '0',
      appid: '',
      reason: '',
      positionList: [],
      burkList: [],
      kostlList: [],
      parmasOption: {}
    }
  },
  computed: {
    ...mapGetters({
      formsData: 'getBusinessTripForms'
      // formsInfos: 'getBusinessTripInfos'
    }),
    noticeDesc() {
      let desc = '请选择'
      if (this.forms.postid === '') {
        desc = '请选择岗位'
      } else if (this.forms.m_comp === '') {
        desc = '请选择费用承担公司'
      }
      return desc
    },
    beupOption() {
      return this.beup === '1'
    }
  },
  created() {
    console.log(this.formsData);
    let saveParams = this.$route.query.saveParams;
    if (saveParams) {
      this.$store.dispatch('clearBusinessTrip')
      this.draftData(saveParams)
    } else {
      this.$store.dispatch('clearBusinessTrip')
    }
    // let flag = this.$route.query.flag;
    // if (flag === 'save') {
    //   this.$store.dispatch('clearBusinessTrip')
    // }
    this.getBaseData() // 请求部门和费用承担公司
    // this.setData() // 填写的时候回退保存值
    if (this.forms.postid !== '' && this.forms.m_comp !== '') {
      this.changeBurks(this.forms.postid, this.forms.m_comp)
    }
  },
  methods: {
    draftData(saveParams) {
      let params = {
        appid: saveParams.appid,
        draftType: saveParams.draftType
      }
      let _that = this;
      // var demoArray = [];
      api.getDraftDataByIdURL(params, function (res) {
        if (res) {
          let draftlistData = res.data.data.draftlist;
          console.log(draftlistData);
          _that.forms.postid = draftlistData.travel.postid;
          _that.forms.m_comp = draftlistData.travel.m_comp;
          _that.forms.m_cbzx = draftlistData.travel.m_cbzx;
          _that.beup = draftlistData.travel.beup;
          _that.reason = draftlistData.travel.reason;
          _that.appid = draftlistData.travel.id;
          draftlistData.subs.map(function (item) {
            // console.log(item);
            // let demo = {};
            // for (var v in item) {
            //   if (item['startda']) {
            //     demo['startda'] = item['startda']
            //   } else {
            //     demo[v] = item[v]
            //   }
            // }
            // demoArray.push(demo)
            // console.log(demoArray);

            _that.$store.dispatch('addBusinessTrip', item)
          });
          _that.changeBurks(_that.forms.postid, _that.forms.m_comp)
        }
      })
    },
    getBaseData() {
      let _that = this;
      api.getPosition(function (res) {
        if (res) {
          _that.positionList = res.positionlist
          _that.burkList = res.bukrlist
        }
      })
    },
    // setData() {
    //   this.forms.postid = this.formsInfos.forms.postid;
    //   this.forms.m_comp = this.formsInfos.forms.m_comp;
    //   this.forms.m_cbzx = this.formsInfos.forms.m_cbzx;
    //   this.beup = this.formsInfos.beup;
    //   this.reason = this.formsInfos.reason;
    // },
    changeBurks(postid, bukrs) {
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

      console.log(this.formsData);
      var demoArray = [];
      this.formsData.map(function (item) {
        let demo = {};
        for (var v in item) {
          if (v === 'id') {
            demo['id'] = item['id']
          } else if (v === 'mainkey') {
            demo['mainkey'] = item['mainkey']
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
          id: this.appid,
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

      this.parmasOption = parmas;

      console.log(parmas);

      if (parmas.subs.length < 2) {
        whole.showTop('请完善出差申请明细');
        return;
      } else if (flag === 0) {
          let _that = this;
          api.getNextassigneeTravelWFURL(parmas, function (res) {
            if (res) {
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
                _that.$store.dispatch('clearBusinessTrip')
                setTimeout(() => {
                  let dd = window.dd;
                  dd.biz.navigation.close({
                    onSuccess: function(result) {
                    },
                    onFail: function(err) {}
                  })
                }, 1500)
              }
            }
          })
      } else if (flag === 1) {
        let _that = this;
        api.getSaveTravelURL(parmas, function (res) {
          if (res) {
            if (res.data.code) {
                whole.showTop(res.data.message);
                _that.$store.dispatch('clearBusinessTrip')
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
                _that.$store.dispatch('clearBusinessTrip')
                setTimeout(() => {
                  let dd = window.dd;
                  dd.biz.navigation.close({
                    onSuccess: function(result) {
                    },
                    onFail: function(err) {}
                  })
                }, 1500)
            }
          }
          console.log(res);
        })
      }
    },
    onConfirm () {
      let _that = this;
      console.log(_that.parmasOption);
      api.getStartTravelWFURL(_that.parmasOption, function (res) {
        if (res) {
          if (res.data.code) {
            whole.showTop(res.data.message);
            _that.$store.dispatch('clearBusinessTrip')
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
            _that.$store.dispatch('clearBusinessTrip')
            setTimeout(() => {
              let dd = window.dd;
              dd.biz.navigation.close({
                onSuccess: function(result) {
                },
                onFail: function(err) {}
              })
            }, 1500)
          }
        }
      })
    }
  }
}
</script>
