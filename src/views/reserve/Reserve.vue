<template>
  <div>
    <group title="申请信息" labelWidth="6.5rem" labelMarginRight="1rem">
      <v-search title="选择岗位" :cdata="positionList" v-model="forms.postid"></v-search>
      <v-search title="费用承担公司" :cdata="burkList" v-model="forms.cdbukrs"></v-search>
      <v-search title="费用归集成本中心" :noticeDesc="noticeDesc" :cdata="kostlList" v-model="forms.cdkostls" @on-show="changeBurks"></v-search>
      <!-- <cell v-if="showSelect" title="请选择专项负责人" is-link @click.native="selectPerson">{{m_zxfzrnm}}</cell> -->
      <v-search v-if="showDepart" title="费用所属事业部" :noticeDesc="noticeDesc" :cdata="departments" v-model="forms.businessunitid" @on-show="changeDepart"></v-search>
      <cell v-if="formsData.length > 0" title="汇总">{{byjsum[0].sum}}</cell>
    </group>
    <sticky>
      <box gap="10px 10px">
        <x-button plain type="primary" @click.native="addReserveOption()">添加备用金</x-button>
      </box>
    </sticky>
    <group title="备用金汇总" v-if="formsData.length > 0" style="margin-bottom: 60px;">
      <cell v-for="d in formsData" :key="d.uuid" :title="d.stype.toString()" is-link @click.native="addReserveOption(d)">{{d.fwbas}}</cell>
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
import {Group, Sticky, Box, XButton, Scroller, Cell, Flexbox, FlexboxItem, Confirm, TransferDomDirective as TransferDom} from 'vux';
import vSearch from '@/components/searchChecker';
import api from 'api';
import ding from '@/lib/ding'
import whole from '@/lib/whole'
import {mapGetters} from 'vuex'
import dataUtils from '../../filters/dataUtils' // 工具类

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Sticky, Box, XButton, Scroller, Cell, Flexbox, FlexboxItem, vSearch, Confirm
  },
  data () {
    return {
      forms: {
        postid: '',
        cdbukrs: '',
        cdkostls: '',
        businessunitid: ''
      },
      showCon: false,
      optionP: true,
      message: '',
      id: '',
      positionList: [],
      burkList: [],
      kostlList: [],
      departments: [],
      parmasOption: {},
      m_zxfzrid: '',
      m_zxfzrnm: '',
      showSelectOption: false,
      showDepartOption: false
    }
  },
  computed: {
    ...mapGetters({
      formsData: 'getReserveFroms'
      // formsInfos: 'getReserveInfos'
    }),
    noticeDesc() {
      let desc = '请选择'
      if (this.forms.postid === '') {
        desc = '请选择岗位'
      } else if (this.forms.cdbukrs === '') {
        desc = '请选择费用承担公司'
      }
      return desc
    },
    byjsum: function () {
      let baseType = [{type: 'byj', field: 'fwbas'}];
      return dataUtils.getSummary(this.formsData, baseType)
    },
    showSelect: function () {
      let option = false
      this.formsData.map(function (item) {
        if (item.stype.toString() === '专项') {
          option = true
        }
      });
      this.showSelectOption = option;
      return option;
    },
    showDepart: function () {
      let _that = this;
      for (let i = 0; i < this.formsData.length; i++) {
        if (this.formsData[i].stype === '专项') {
          let params = {
            postid: _that.forms.postid
          }
          api.getIsTempOrg(params, function (res) {
            if (res.data.code) {
              if (res.data.data.isTemp) {
                _that.optionP = false;
              } else {
                _that.optionP = true;
              }
            }
          })
        }
      }
      this.showDepartOption = this.optionP;
      return this.optionP;
    }
  },
  created() {
    console.log(this.formsData);
    let saveParams = this.$route.query.saveParams;
    if (saveParams) {
      this.$store.dispatch('clearReserve')
      this.draftData(saveParams)
    } else {
      this.$store.dispatch('clearReserve')
      this.validateUserData();
    }
    // let flag = this.$route.query.flag;
    // if (flag === 'save') {
    //   this.$store.dispatch('clearReserve')
    //   console.log('save');
    //   this.validateUserData();
    // }
    this.getBaseData() // 请求部门和费用承担公司
    // this.setData() // 填写的时候回退保存值
    if (this.forms.postid !== '' && this.forms.cdbukrs !== '') {
      this.changeBurks(this.forms.postid, this.forms.cdbukrs)
      this.changeDepart(this.forms.postid, this.forms.cdbukrs)
    }
  },
  methods: {
    validateUserData() {
      let params = {
        vfiled: 'lifnr'
      }
      api.getvalidateUserBaseInfoURL(params, function (res) {
        if (res) {
          if (res.data.passFlag) {
          } else {
            whole.showTop(res.data.message);
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
    },
    draftData(saveParams) {
      let params = {
        appid: saveParams.appid,
        draftType: saveParams.draftType
      }
      let _that = this;
      api.getDraftDataByIdURL(params, function (res) {
        if (res) {
          let draftlistData = res.data.data.draftlist;
          _that.forms.postid = draftlistData.depositApp.postid;
          _that.forms.cdbukrs = draftlistData.depositApp.cdbukrs;
          _that.forms.cdkostls = draftlistData.depositApp.cdkostls;
          _that.forms.businessunitid = draftlistData.depositApp.businessunitid;
          _that.id = draftlistData.depositApp.id;
          draftlistData.resegs.map(function (item) {
            item.type = 'byj'
            item.field = 'fwbas'
            _that.$store.dispatch('addReserve', item)
          });
          _that.changeBurks(_that.forms.postid, _that.forms.cdbukrs)
          _that.changeDepart(_that.forms.postid, _that.forms.cdbukrs)
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
      if (this.forms.postid > 0) {
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
      } else {
        whole.showTop('请选择岗位')
      }
    },
    selectPerson() {
      let _that = this;
      let dd = window.dd;
      dd.ready(function () {
              dd.biz.contact.complexPicker({
                title: '选择人员并提交',
                corpId: ding.getItemInLocation().corpId || ding.CORPID,
                multiple: true,
                limitTips: '请选择要提交给的人员',
                maxUsers: 1,
                appId: 126759727,
                permissionType: 'GLOBAL',
                responseUserOnly: false,
                onSuccess: function (result) {
                  console.log(result);
                  if (result.users.length > 0) {
                    let ddid = result.users[0].emplId
                    _that.m_zxfzrnm = result.users[0].name;
                    let cparams = {
                      ddid: [ddid]
                    }
                    api.getMPostidByDdid(cparams, function (res) {
                      if (res.data.data && res.data.data.error !== undefined) {
                        whole.showTop('无法获取此人的岗位，请联系HR人员');
                        return;
                      }
                      let beAsigners = res.data.data.postids
                      _that.m_zxfzrid = 'S' + beAsigners;
                    });
                  }
                },
                onFail: function (err) {
                  console.log(err)
                }
              });
            });
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
      if (this.showDepartOption) {
        if (this.forms.businessunitid === '') {
          whole.showTop('请选择费用所属事业部')
          return;
        }
      }
      if (this.showSelectOption) {
        if (this.m_zxfzrnm === '') {
          whole.showTop('请选择专项负责人')
          return;
        }
      }
      var cdbukrsname = dataUtils.getDescValue(this.burkList, this.forms.cdbukrs);
      var cdkostlsname = dataUtils.getDescValue(this.kostlList, this.forms.cdkostls);
      var businessunitname = dataUtils.getDescValue(this.departments, this.forms.businessunitid);

      var demoArray = [];
      this.formsData.map(function (item) {
        let demo = {};
        for (var v in item) {
          if (v === 'buzei') {
            demo['buzei'] = item['buzei']
          } else if (v === 'dmbtr') {
            demo['dmbtr'] = item['dmbtr']
          } else if (v === 'fwbas') {
            demo['fwbas'] = item['fwbas']
          } else if (item[v] instanceof Array) {
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
          id: this.id,
          appda: new Date().getTime(),
          postid: this.forms.postid,
          cdbukrs: this.forms.cdbukrs,
          cdbukrsname: cdbukrsname,
          cdkostls: this.forms.cdkostls,
          cdkostlsname: cdkostlsname,
          businessunitid: this.forms.businessunitid,
          businessunitname: businessunitname,
          m_zxfzrnm: this.m_zxfzrnm,
          m_zxfzrid: this.m_zxfzrid
        },
        resegs: demoArray
      }

      this.parmasOption = parmas;

      console.log(parmas);

      if (flag === 0) {
          let _that = this;
          api.getNextassigneeDepositWFURL(parmas, function (res) {
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
//                _that.$store.dispatch('clearReserve')
//                setTimeout(() => {
//                  let dd = window.dd;
//                  dd.biz.navigation.close({
//                    onSuccess: function(result) {
//                    },
//                    onFail: function(err) {}
//                  })
//                }, 1500)
              }
            }
          })
      } else if (flag === 1) {
        let _that = this;
        api.getSaveDepositResegsURL(parmas, function (res) {
          if (res) {
            if (res.data.code) {
              whole.showTop(res.data.message);
              _that.$store.dispatch('clearReserve')
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
//              _that.$store.dispatch('clearReserve')
//              setTimeout(() => {
//                let dd = window.dd;
//                dd.biz.navigation.close({
//                  onSuccess: function(result) {
//                  },
//                  onFail: function(err) {}
//                })
//              }, 1500)
            }
          }
          console.log(res);
        })
      }
    },
    onConfirm () {
      let _that = this;
      console.log(_that.parmasOption);
      api.getStartDepositWFURL(_that.parmasOption, function (res) {
        if (res) {
          if (res.data.code) {
            whole.showTop(res.data.message);
            _that.$store.dispatch('clearReserve')
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
//            _that.$store.dispatch('clearReserve')
//            setTimeout(() => {
//              let dd = window.dd;
//              dd.biz.navigation.close({
//                onSuccess: function(result) {
//                },
//                onFail: function(err) {}
//              })
//            }, 1500)
          }
        }
      })
    }
  }
}
</script>
