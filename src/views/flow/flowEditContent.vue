<template>
  <div>
    <div v-for="item in flowParams.EDITARR_" :key="item.id">
      <template v-if="item.component === 'textarea'">
        <group :title="item.title">
          <x-textarea v-model="item.nvalue" :title="item.title"></x-textarea>
        </group>
      </template>
      <template v-else-if="item.component === 'checkbox'">
        <group :title="item.title">
          <checker v-model="item.nvalue" type="checkbox" default-item-class="checker-item"
                   selected-item-class="checker-item-selected">
            <checker-item :value="opt" v-for="(opt, index) in item.options" :key="index">{{opt.value}}</checker-item>
            </checker-item>
          </checker>
        </group>
      </template>
      <template v-else-if="item.component === 'radio'">
        <group :title="item.title">
          <checker v-model="item.nvalue" default-item-class="checker-item"
                   selected-item-class="checker-item-selected">
            <checker-item :value="opt" v-for="(opt, index) in item.options" :key="index">{{opt.value}}</checker-item>
            </checker-item>
          </checker>
        </group>
      </template>
      <template v-else-if="item.component === 'select'">
        <group :title="item.title">
          <selector :title="item.title" :options="item.options" placeholder="请选择" v-model="item.nvalue"></selector>
          <!--<checker v-model="item.nvalue" type="checkbox" default-item-class="checker-item"-->
                   <!--selected-item-class="checker-item-selected">-->
            <!--<checker-item :value="opt" v-for="(opt, index) in item.options" :key="index">{{opt.value}}</checker-item>-->
            <!--</checker-item>-->
          </checker>
        </group>
      </template>

      <template v-else-if="item.component === 'text'">
        <group :title="item.title">
          <x-input :title="item.title" text-align="right" v-model="item.nvalue"></x-input>
        </group>
      </template>

      <template v-else-if="item.component === 'person'">
        <group :title="item.title">
          <x-input :title="item.title" text-align="right" v-model="item.nvalue" @on-focus="checkPer(item)"></x-input>
        </group>
      </template>

      <template v-else-if="item.component === 'date1' || item.component === 'date'">
        <group :title="item.title">
          <datetime :title="item.title" v-model="item.nvalue"></datetime>
        </group>
      </template>
    </div>
    <box gap="10px 10px">
      <x-button plain type="primary" @click.native="saveEditInfo">完成填写</x-button>
    </box>
  </div>
</template>

<script>
  import {Checker, CheckerItem, XInput, Group, XButton, XTextarea, Box, Datetime, Selector, Cell} from 'vux'
  import whole from '@/lib/whole'
  import * as _ from 'underscore'
  import ding from '@/lib/ding'
  import api from 'api'

  export default {
    components: {
      Box,
      Checker,
      CheckerItem,
      XInput,
      XButton,
      Group,
      XTextarea,
      Datetime,
      Selector,
      Cell
    },
    data() {
      return {
        flowParams: {}, // 流程信息
        btype: '',
        flag: '',
        selectPerson: '',
        userInfo: []
      }
    },
    created() {
      let data = JSON.parse(this.$route.query.flowParams);
      for (let d of data.EDITARR_) {
        if (d.forSelectPerson) {
          d.component = 'person'
        }
        d.nvalue = d.value || ''
        if (d.component === 'checkbox' || d.component === 'radio') {
          let arr = []
          for (let o of d.options) {
            if (o.value !== '') {
              let aa = {};
              aa.key = o.value;
              aa.value = o.text || o.title;
              arr.push(aa)
            }
          }
          d.options = arr;
        }
        if (d.component === 'select') {
          let arr = []
          for (let o of d.options) {
            if (o.value !== '') {
              let aa = {};
              aa.key = o.value;
              aa.value = o.title || o.text;
              arr.push(aa)
            }
          }
          d.options = arr;
        }
      }
      this.flowParams = data;

      this.btype = this.$route.query.btype;
      this.flag = this.$route.query.flag;
      this.zin = this.$route.query.zin;
      this.selectPerson = this.$route.query.selectPerson;
    },
    methods: {
      // 选择人员
      checkPer(item) {
        let pickedUsers = [];
        for (let u of this.userInfo) {
          pickedUsers.push(u.emplId);
        }
        let _that = this;
        let dd = window.dd;
        let limitTips = '请选择相关人员'
        dd.ready(function () {
          dd.biz.contact.complexPicker({
            title: '选择人员',
            corpId: ding.CORPID,
            multiple: true,
            limitTips: limitTips,
            maxUsers: 1,
            pickedUsers: pickedUsers,
            appId: 126759727,
            permissionType: 'GLOBAL',
            responseUserOnly: false,
            onSuccess: function (result) {
              if (result.users.length > 0) {
                item.title = result.users[0].name
                let params = {
                  ddid: [result.users[0].emplId]
                }
                api.getMPostidByDdid(params, function (res) {
                  if (res.data.data && res.data.data.error !== undefined) {
                    whole.showTop('无法获取此人的岗位，请联系HR人员');
                    return;
                  }
                  let beAsigners = res.data.data.postids
                  item.nvalue = beAsigners
                });
              } else {
                _that.userInfo = [];
              }
            },
            onFail: function (err) {
              if (err.errorMessage) {
                whole.showTop('获取钉钉权限失败，请退回上一页面重新进入');
              }
            }
          });
        });
        dd.error(function (err) {
          /**
           {
              message:"错误信息",//message信息会展示出钉钉服务端生成签名使用的参数，请和您生成签名的参数作对比，找出错误的参数
              errorCode:"错误码"
           }
           **/
          console.log('dd ding error: ' + window.location.href + JSON.stringify(err));
        });
      },
      saveEditInfo() {
        let arr = [];
        for (let d of this.flowParams.EDITARR_) {
          if (d.validation && d.validation.required && d.nvalue === '') {
            whole.showTop('请填写' + d.title);
            return;
          } else {
            let aa = {}
            aa.name = d.name;
            aa.value = d.nvalue;
            arr.push(aa)
          }
        }
        let obj = {};
        _.map(arr, function (item) {
          if (typeof item.value === 'object') {
            let val = _.map(item.value, _.iteratee('key'));
            obj[item.name] = val.toString();
          } else {
            obj[item.name] = item.value
          }
        })
        this.flowParams.editArr = obj;
        let _that = this;
        this.$router.push({
          path: '/flowIdea',
          query: {btype: this.btype, flowParams: _that.flowParams, selectPerson: _that.selectPerson, flag: _that.flag, zin: _that.zin, fromPath: 'edit'}
        })
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  .checker-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
    margin: 3px 5px;
  }

  .checker-item-selected {
    background: #ffffff url(/static/images/active.png) no-repeat right bottom;
    border: 1px solid @theme-color;
  }
</style>
