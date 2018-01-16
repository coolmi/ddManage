<template>
  <div class="flow_list_card" :class="{animated: animated, bounceInRight: animated}" @click="clickCard">
    <!--fadeInRight bounceInRight-->
    <div :class="iconType"></div>
    <div :class="[{flow_list_card_hd_bottom: header && header.title}, flowlistcardhd]" v-if="header && header.title" v-html="header.title">
    </div>
    <slot name="header"></slot>
    <div v-show="!show" :class="{animated: animated, bounceInRight: animated}">
      <slot name="content"></slot>
      <div class="flow_list_card_ft_left" v-if="footer && footer.ltitle" v-html="footer.ltitle"></div>
      <div class="flow_list_card_ft_right" v-if="footer && footer.title" v-html="footer.title"></div>
      <div class="flow_list_card_ft">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FlowListCard',
    props: {
      header: Object,
      footer: Object,
      iconType: {
        type: String,
        default() {
          return ''
        }
      },
      animated: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        show: this.animated,
        flowlistcardhd: 'flow_list_card_hd'
      }
    },
    methods: {
      clickCard() {
        if (this.animated) {
          this.show = !this.show
        }
        this.$emit('on-click-card')
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  .flow_list_card {
    border: 1px;
    border-radius: .5rem;
    background-color: #ffffff;
    margin: 1rem 1rem;
    position: relative;
    overflow: hidden;
    box-shadow: 1px 2px 1px #E0DFEC;
  }

  .flow_list_card_hd {
    padding: 14px 15px 10px;
    /*color: #ffffff;*/
    /*background-color: #B19AF6;*/
    font-size: 15px;
    display: flex;
  }

  .flow_list_card_hd_bottom {
    border-bottom: 1px solid #CDCDCD;
  }

  .flow_list_card_content {
    padding: 14px 15px 10px;
    min-height: .8rem;
    color: #9E9DA3;
    font-size: 13px;
  }

  .flow_list_card_content_top {
    border-top: 1px solid #CDCDCD;
  }

  .flow_list_card_ft {
    /*display: flex;*/
    /*display: -webkit-flex;*/
    /*justify-content: space-between;*/
  }

  .flow_list_card_ft_left {
    /*flex: 1;*/
    width: 90%;
    text-align: left;
    margin: 2px 5% 10px;
    color: #806DF7;
    font-size: 13px;
    /*font-style: italic;*/
  }

  .flow_list_card_ft_right {
    flex: 1;
    text-align: right;
    padding: 118px 15px 10px;
    color: #806DF7;
    font-size: 13px;
    font-style: italic;
  }

  .ysp {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 39px;
    height: 39px;
    background-image: url('/static/images/ysp.png');
    background-size: cover;
  }
</style>
