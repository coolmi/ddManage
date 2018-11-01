<template>
  <div>
    <div
    class="weui-cells__title"
    v-if="title"
    :style="cleanStyle({
      color: titleColor
    })"
    v-html="title"></div>
    <slot name="title"></slot>
    <div
    class="weui-cells"
    :class="{
      'vux-no-group-title': !title,
      'vux-cells-no-bottom-borders': !showGroupBottomBorders,
      'vux-cells-no-top-borders': !showGroupTopBorders
    }"
    :style="cleanStyle({
      marginTop: typeof gutter === 'number' ? (gutter + 'px') : gutter
    })">
      <slot name="after-title"></slot>
      <slot></slot>
    </div>
    <div
    class="weui-cells__title vux-group-footer-title"
    v-if="footerTitle"
    :style="cleanStyle({
      color: footerTitleColor
    })"
    v-html="footerTitle"></div>
  </div>
</template>

<script>
import cleanStyle from './clean-style'

export default {
  name: 'group',
  methods: {
    cleanStyle
  },
  props: {
      showGroupBottomBorders: {
          type: Boolean,
          default: true
      },
      showGroupTopBorders: {
          type: Boolean,
          default: true
      },
    title: String,
    titleColor: String,
    labelWidth: String,
    labelAlign: String,
    labelMarginRight: String,
    gutter: [String, Number],
    footerTitle: String,
    footerTitleColor: String
  }
}
</script>

<style lang="less">
  @import "../../styles/weui/widget/weui_cell/weui_access.less";
  @import '../../styles/weui/widget/weui_cell/weui_cell_global.less';
  @import '../../styles/blank.less';

.vux-no-group-title {
  margin-top: @group-title-margin-top;
}
  .weui-cells.vux-cells-no-bottom-borders {
    &:after {
     display: none;
   }
  }

  .weui-cells.vux-cells-no-top-borders {
  &:before {
     display: none;
   }
  }

.vux-group-footer-title.weui-cells__title {
  margin-top: @group-footer-title-margin-top;
  margin-bottom: @group-footer-title-margin-bottom;
  padding-top: 0;
  font-size: 12px;
}

/* global config for group items */
.vux-cell-value {
  color: @cell-value-color;
}
.vux-cell-placeholder {
  color: @cell-placeholder-color;
}
</style>
