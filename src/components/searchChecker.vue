<template>
  <!--<div class="vux-cell-box">-->
  <!--<div class="weui-cell vux-tap-active weui-cell_access" @click="checkSearch">-->
  <!--<div class="weui-cell__hd">-->
  <!--<slot name="title" label-class="weui-label" :label-style="labelStyles" :label-title="title">-->
  <!--<label class="weui-label" :class="labelClass" :style="labelStyles" v-if="title" v-html="title"></label>-->
  <!--</slot>-->
  <!--</div>-->
  <!--<div class="weui-cell__ft" style="{textAlign: valueTextAlign}">{{currentName}}</div>-->
  <!--</div>-->
  <!--</div>-->
  <div class="vux-cell-box">
    <div class="weui-cell vux-tap-active weui-cell_access vux-cell-align-left">
      <div class="weui-cell__hd"></div>
      <div class="vux-cell-bd">
        <p>
          <label class="vux-label" style="width: 6.5rem; margin-right: 1rem;">{{title}}</label>
        </p>
        <span class="vux-label-desc">{{desc}}</span>
      </div>
      <div class="weui-cell__ft vux-cell-primary vux-cell-align-left" @click="checkSearch()" style="color: #151515"
           v-if="valueName">{{valueName}}
      </div>
      <div class="weui-cell__ft vux-cell-primary vux-cell-align-left" @click="checkSearch()" v-else-if="currentName">
        {{currentName, 10 | subTitle}}
      </div>
      <div v-show="showSearch">
        <transition :name="showSearch?'slide':'slide_back'">
          <section style="z-index:12100">
            <search
              @result-click="resultClick"
              @on-change="getResult"
              :results="results"
              v-model="searchValue"
              ref="search"
              @on-focus="onFocus"
              @on-cancel="onCancel">
              <div slot="default" style="padding: 10px">点击选择</div>
              <p slot="left" @click="showSearch = false"
                 style="margin-right: 5px; margin-top: 3px; pading: 18px; border: 1px solid #38ADFF; border-radius: 20%">
                关闭</p>
            </search>
            <scroller lock-x v-show="showlist" height="-70">
              <div style="height: 100%">
                <span v-show="cdata.length <= 0">{{noticeDesc}}</span>
                <radio :options="cdata" v-model="checkerValue" @on-change="radioChange"></radio>
              </div>
            </scroller>
          </section>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import {Search, Group, Cell, XButton, Scroller, Radio} from 'vux'
  import * as _ from 'underscore'

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      cdata: {
        type: Array,
        default: []
      },
      value: {
        type: String,
        default: ''
      },
      noticeDesc: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showSearch: false,
        showlist: true,
        results: [],
        currentValue: '',
        searchValue: '',
        checkerValue: ''
      }
    },
    computed: {
      valueName: function () {
        this.checkerValue = this.value
        let index = _.findLastIndex(this.cdata, {
          key: this.value
        })
        if (index >= 0) {
          return this.cdata[index].value
        } else {
          return ''
        }
      },
      currentName: function () {
        return this.cdata.length === 0 ? (this.noticeDesc !== '' ? this.noticeDesc : '暂无数据') : '请选择'
      }
    },
    watch: {
      showSearch(val) {
        if (val) {
          this.$emit('on-show')
        } else {
          this.$emit('on-hide')
        }
      }
    },
    components: {
      Search,
      Group,
      Cell,
      XButton,
      Scroller,
      Radio
    },
    methods: {
      checkSearch() {
        this.showSearch = true;
      },
      radioChange(value, label) {
        let item = {
          title: label,
          key: value
        }
        this.resultClick(item);
      },
      resultClick(item) {
        this.searchValue = ''
        this.aaName = item.title
        this.currentValue = item.key
        this.checkerValue = this.currentValue;
        this.$emit('input', this.currentValue)
        this.showSearch = false;
        this.showlist = true;
      },
      getResult(val) {
        this.results = val ? getResult(this.cdata, this.searchValue) : []
        this.showlist = false
      },
      onFocus() {
        this.showlist = false
      },
      onCancel() {
        this.showlist = true
      }
    },
    filters: {
      subTitle(str = '', len = 15) {
        if (str.length > len) {
          return str.substr(0, len) + '...'
        }
        return str
      }
    }
  }

  function getResult(obj, val) {
    let valueobj = _.findLastIndex(obj, {
      value: val
    })

    let keyobj = _.findLastIndex(obj, {
      key: val
    })

    let result = []
    let resultobj = {}
    if (valueobj >= 0) {
      resultobj.key = obj[valueobj].key
      resultobj.title = obj[valueobj].value
      result.push(resultobj)
    } else if (keyobj >= 0) {
      resultobj.key = obj[keyobj].key
      resultobj.title = obj[keyobj].value
      result.push(resultobj)
    }
    return result
  }
</script>
<style scoped type="text/less" lang="less">
  section {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    background: #fff;
    ul {
      list-style: none;
      .mint-cell {
        border-bottom: 1px solid #ddd;
      }
      .city-cell {
        line-height: 2.5rem /* 116/108 */;
        border-bottom: 1px solid #ddd;
        padding: 0 10px;
        font-size: 16px;
        position: relative;
        span {
          float: left;
          position: absolute;
          left: 20%;
          color: #7f7f7f;
          font-size: 14px;
        }
      }
    }
  }

  .hot-city {
    padding: .2222rem /* 24/108 */ .1852rem /* 20/108 */;
    padding-top: 0;
    background: #f5f5f5;
  }

  .hot-city-cell {
    float: left;
    width: 30%;
    line-height: 2rem /* 90/108 */;
    text-align: center;
    margin-right: .1852rem /* 20/108 */;
    margin-bottom: .2222rem /* 24/108 */;
    border: 1px solid #e3e3e3;
    background: #fff;
    font-size: 16px;
    &.active {
      border-color: #fcca7e;
    }
    &.current-place i {
      color: #fcca7e;
      margin-left: -8px;
    }
  }

  .search-back {
    position: absolute;
    top: 0;
    left: 10px;
    background-color: transparent;
    border: 0;
    box-shadow: none;
    color: inherit;
    display: inline-block;
    padding: 0;
    font-size: inherit;
    z-index: 101;
    i {
      font-size: 20px;
      color: #fff;
    }
  }

  .vux-cell-box {
    position: relative;
  }

  .vux-cell-box:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    left: 15px;
  }

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
    &:first-child {
      &:before {
        display: none;
      }
    }
  }

  .collapseCell .weui-cell {
    &:first-child {
      &:before {
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
