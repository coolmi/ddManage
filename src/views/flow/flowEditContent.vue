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
  import {Checker, CheckerItem, XInput, Group, XButton, XTextarea, Box, Datetime, Selector} from 'vux'
  import whole from '@/lib/whole'
  import * as _ from 'underscore'

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
      Selector
    },
    data() {
      return {
        flowParams: {}, // 流程信息
        btype: '',
        flag: '',
        selectPerson: ''
      }
    },
    created() {
      let data = JSON.parse(this.$route.query.flowParams);
      for (let d of data.EDITARR_) {
        d.nvalue = ''
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
          query: {btype: this.btype, flowParams: _that.flowParams, selectPerson: _that.selectPerson, flag: _that.flag, zin: _that.zin}
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
