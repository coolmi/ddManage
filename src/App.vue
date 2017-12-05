<template>
  <div id="app">
    <router-view></router-view>
    <div v-show="showLoad">
      <div class="mask_transparent"></div>
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="showPopTop" position="top" :show-mask="false">
        <div class="position-vertical">
          {{showPopMessage}}
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {TransferDom, Popup} from 'vux'
  import {mapState} from 'vuex'
  import store from '../src/store'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Popup
    },
    computed: mapState({
      topMessage: state => state.loading.topMessage,
      showTopMessage: state => state.loading.showTopMessage,
      isLoading: state => state.loading.isLoading
    }),
    watch: {
      showTopMessage: function (val, oldVal) {
        if (val && !oldVal) {
          this.showPopTop = true;
          this.showPopMessage = this.topMessage;
        } else {
          this.showPopTop = false;
        }
      },
      showPopTop(val) {
        if (val) {
          setTimeout(() => {
            store.dispatch('showTopMessage', false);
            this.showPopTop = false
          }, 1800)
        }
      },
      isLoading: function (val, oldVal) {
        if (val && !oldVal) {
          this.showLoad = true;
        } else {
          this.showLoad = false;
        }
      }
    },
    data() {
      return {
        showPopTop: false,
        showLoad: false,
        showPopMessage: ''
      }
    }
  }
</script>

<style>
  @import 'styles/reset.less';

  html, body {
    width: 100%;
    heigth: 100%
  }

  body {
    background-color: #F2F2F2;
    line-height: 1.6;
    font-size: 16px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding-top: constant(safe-area-inset-top);
    padding-left: constant(safe-area-inset-left);
    padding-right: constant(safe-area-inset-right);
    padding-bottom: 10px;
  }

  .position-vertical {
    background-color: #38ADFF;
    color: #fff;
    text-align: center;
    padding: 15px;
  }

  .mask_transparent {
    position: fixed;
    z-index: 5000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.0001);
  }

  .sk-cube-grid {
    position: absolute;
    top: 35%;
    left: 50%;
    margin-left: -30px;
    width: 60px;
    height: 60px;
    text-align: center;
  }

  .sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: #38ADFF;
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  }

  .sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  .sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }

  .sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  @-webkit-keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
  }

  @keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }
    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
  }
</style>
