<template>
  <div class="flow_footer flow_footer_padding vux-1px-t animated slideInUp">
    <flexbox>
      <flexbox-item v-for="(btype, index) in buttonArr" :key="btype" style="margin-left: 0">
        <div class="flow_button" @click="clickButton(btype)">{{fbname.buttonName[btype]}}</div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import fbname from '@/flow/flowButtonNames'
  import {Divider, Flexbox, FlexboxItem} from 'vux'

  export default {
    name: 'FlowButton',
    props: {
      buttonArr: {
        type: Array,
        default() {
          return []
        }
      },
      flowParams: {
        type: Object,
        default() {
          return {}
        }
      },
      handleInfos: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        fbname: {}
      }
    },
    components: {
      Divider,
      Flexbox,
      FlexboxItem
    },
    created() {
      this.fbname = fbname
      let dd = window.dd
      dd.ready(function () {
        dd.device.base.getPhoneInfo({
          onSuccess: function(data) {
            console.log(data)
          },
          onFail: function(err) {}
        });
      })
    },
    methods: {
      clickButton(btype) {
        const flowParams = JSON.stringify(this.flowParams);
        const selectPerson = JSON.stringify(this.flowParams.selectPerson);
        const flag = this.flag;
        let editFlag = this.flowParams.EDITARR_; // 需要补填字段
        if (editFlag.length > 0 && btype === 'tj') {
          this.$router.push({
            path: '/flowEdit',
            query: {btype: btype, flowParams: flowParams, selectPerson: selectPerson, flag: flag}
          })
        } else {
          this.$router.push({
            path: '/flowIdea',
            query: {btype: btype, flowParams: flowParams, selectPerson: selectPerson, flag: flag}
          })
        }
//        this.$emit('on-fb-click')
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';

  .flow_footer {
    width: 100%;
    height: @flow_button_footer_height;
    line-height: @flow_button_footer_height;
    padding-top: 10px;
    padding-bottom: 20px;
    position: fixed;
    bottom: 0;
    background-color: @flow_button_footer_background_color;
  }

  @media only screen and (width: 375px) and (height: 690px) {
    .flow_footer_padding {
      padding-bottom: constant(safe-area-inset-bottom);
    }
  }

  .flow_button {
    text-align: center;
    font-size: @flow_button_font_size;
    color: @flow_button_color;
  }
</style>
