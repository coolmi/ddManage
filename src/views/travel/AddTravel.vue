<template>
  <div>
    <group labelWidth="6.5rem" gutter="0" labelMarginRight="1rem" value-align="left">
      <selector title="类型" placeholder="请选择" :options="depList" v-model="formsData.cclx"></selector>
      <v-city title="出发城市" v-model="formsData.cfcity"></v-city>
      <v-city title="到达城市" v-model="formsData.ddcity"></v-city>
      <cell v-show="false"></cell>
      <!--<cell @click.native="checkCity('endCity')" value-align="left" title="到达城市" is-link>{{endCity}}</cell>-->
      <!--<transition :name="showCity?'slide':'slide_back'">-->
        <!--<v-city-->
          <!--v-show="showCity"-->
          <!--:Tcity="Tcity">-->
        <!--</v-city>-->
      <!--</transition>-->
      <datetime title="出发日期" placeholder="请选择" valueTextAlign="left" v-model="formsData.cfrq"></datetime>
      <datetime title="到达日期" placeholder="请选择" valueTextAlign="left" v-model="formsData.ddrq"></datetime>
      <selector title="交通方式" placeholder="请选择" direction="right" :options="depList" v-model="formsData.jtfs"></selector>
      <selector title="是否签约宾馆" placeholder="请选择" direction="right" :options="depList" v-model="formsData.sfqy"></selector>
      <x-textarea title="工作内容" placeholder="请填写" v-model="formsData.gznr"></x-textarea>
      <x-input v-show="false" v-model="formsData.uuid"></x-input>
    </group>
    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addTravel" style="color:#00B705">继续添加</flexbox-item>
      <flexbox-item @click.native="saveTravel" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { XTextarea, XInput, PopupPicker, Group, Datetime, Flexbox, FlexboxItem, Selector, Cell } from 'vux'
  import vCity from '@/components/checkCity';
  import dataUtils from '../../filters/dataUtils'
  import { mapGetters } from 'vuex';

  export default {
    components: {
      XTextarea, XInput, PopupPicker, Group, Datetime, Flexbox, FlexboxItem, Selector, Cell, vCity
    },
    data() {
      return {
        formsData: {
          cclx: '',
          cfrq: '',
          ddrq: '',
          jtfs: '',
          sfqy: '',
          gznr: '',
          uuid: '',
          cfcity: '',
          ddcity: ''
        },
        aa: '123',
        depList: [
          {
            value: '系统开发科',
            key: '123'
          },
          {
            value: '系统开发科1',
            key: '1231'
          }
        ],
        Tcity: '北京'
      }
    },
    computed: {
      ...mapGetters({
        showCity: 'showCity',
        startCity: 'startCity',
        endCity: 'endCity'
      }),
      dxyjje: function () {
        return dataUtils.money2dx(this.formsData.yjje)
      }
    },
    created() {
      let formsData = this.$route.query.formsData
      this.formsData = JSON.parse(formsData)
    },
    methods: {
      addTravel() {
        this.$store.dispatch('addTravel', this.formsData)
        this.formsData = {}
      },
      saveTravel() {
        console.log(this.formsData.cfcity)
        console.log(this.formsData.ddcity)
      },
      checkCity(val) {
        this.$store.dispatch('changeCityState', {
          name: 'showCity',
          newVal: true
        });
        this.Tcity = val;
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../../node_modules/vux/src/styles/1px.less';
  .footerButton {
    text-align: center;
  }
</style>
