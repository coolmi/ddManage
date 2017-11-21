<template>
  <div>
    <div
      class="weui-cell"
      :class="{
      'vux-tap-active': isLink || !!link,
      'weui-cell_access': isLink || !!link,
      'vux-cell-no-border-intent': !borderIntent,
      'vux-cell-disabled': disabled
    }"
      @click="onClick">
      <div class="weui-cell__hd">
        <slot name="icon"></slot>
      </div>
      <div class="vux-cell-bd" :class="{'vux-cell-primary': primary === 'title' && valueAlign !== 'left'}">
        <p>
          <label class="vux-label" style="width: 9rem; text-align: left; margin-right: 0.2rem;" :class="labelClass" v-if="title || hasTitleSlot">
            <slot name="title">{{ title }}</slot>
          </label>
          <slot name="after-title"></slot>
        </p>
      </div>
      <div class="weui-cell__ft_xfx" :class="valueClass">
        <slot name="value"></slot>
        <slot>{{ value }}</slot>
        <i class="weui-loading" v-if="isLoading"></i>
      </div>
      <slot name="child"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cell',
    props: {
      labelWidth: String,
      labelAlign: String,
      labelMarginRight: String,
      gutter: [String, Number],
      title: [String, Number],
      value: [String, Number, Array],
      isLink: Boolean,
      isLoading: Boolean,
      inlineDesc: [String, Number],
      primary: {
        type: String,
        default: 'title'
      },
      link: [String, Object],
      valueAlign: [String, Boolean, Number],
      borderIntent: {
        type: Boolean,
        default: true
      },
      disabled: Boolean,
      arrowDirection: String // down or up
    },
    beforeMount() {
      this.hasTitleSlot = !!this.$slots.title
    },
    computed: {
      valueClass() {
        return {
          'vux-cell-primary': this.primary === 'content' || this.valueAlign === 'left',
          'vux-cell-align-left': this.valueAlign === 'left',
          'vux-cell-arrow-transition': !!this.arrowDirection,
          'vux-cell-arrow-up': this.arrowDirection === 'up',
          'vux-cell-arrow-down': this.arrowDirection === 'down'
        }
      },
      labelClass() {
        return {
          'vux-cell-justify': this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify'
        }
      }
    },
    methods: {
      getLabelStyles() {
        return {
          width: this.$parent.labelWidth || this.$parent.$parent.labelWidth,
          textAlign: this.$parent.labelAlign || this.$parent.$parent.labelAlign,
          marginRight: this.$parent.labelMarginRight || this.$parent.$parent.labelMarginRight
        }
      },
      onClick() {
        !this.disabled && this.$router.push(this.link)
      }
    },
    data() {
      return {
        hasTitleSlot: false
      }
    }
  }
</script>

<style lang="less" scoped type="text/less">
  @import '../styles/variable';

  .weui-cells {
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 17px;
    overflow: hidden;
    position: relative;
  }

  .weui-cells:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
     -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
     -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .weui-cells:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
     -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
     -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .vux-no-group-title {
    margin-top: @group-title-margin-top;
  }

  /* global config for group items */
  .vux-cell-value {
    color: @cell-value-color;
  }

  .vux-cell-placeholder {
    color: @cell-placeholder-color;
  }

  .weui-cell {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
     -webkit-box-align: center;
     -ms-flex-align: center;
    align-items: center;
  }

  .weui-cell {
    &:first-child{
      &:before{
        display: none;
      }
    }
  }
  .collapseCell .weui-cell {
    &:first-child{
      &:before{
        display: none;
      }
    }
  }

  .vux-cell-primary {
    flex: 1;
  }

  .vux-label {
    display: block;
    word-wrap: break-word;
    word-break: break-all;
  }

  /*.weui-cell :before {*/
    /*content: " ";*/
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*height: 1px;*/
    /*border-top: 1px solid #D9D9D9;*/
    /*color: #D9D9D9;*/
    /*-webkit-transform-origin: 0 0;*/
    /*transform-origin: 0 0;*/
    /*-webkit-transform: scaleY(0.5);*/
    /*transform: scaleY(0.5);*/
    /*left: 15px;*/
  /*}*/

  .weui-cell__ft_xfx {
    text-align: right;
    color: #999999;
  }

  .weui-cell__ft_xfx .weui-loading {
    display: block;
  }

  .weui-cell__ft_xfx.vux-cell-align-left {
    text-align: left;
  }

  .weui-cell.vux-cell-no-border-intent:before {
    left: 0;
  }

  .weui-cell_access {
     -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    color: inherit;
  }
  .weui-cell_access .weui-cell__ft_xfx.vux-cell-arrow-down:after {
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg);
  }

  .weui-cell_access .weui-cell__ft_xfx.vux-cell-arrow-up:after {
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-90deg);
  }

  .weui-cell_access .weui-cell__ft_xfx:after {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
     -webkit-transform: matrix(.71, .71, -.71, .71, 0, 0);
    transform: matrix(.71, .71, -.71, .71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 10px;
  }

  .vux-cell-arrow-transition:after {
    transition: transform 300ms;
  }

  .vux-cell-disabled {
    .vux-label {
      color: #b2b2b2;
    }
    &.weui-cell_access .weui-cell__ft_xfx:after {
      border-color: @cell-disabled-arrow-color;
    }
  }
</style>
