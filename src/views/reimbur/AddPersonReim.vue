<template>
  <div>
    <group title="选择类型">
      <checker v-model="checker" class="checkerDiv" default-item-class="checker-item"
               selected-item-class="checker-item-selected" @on-change="changeCheckType">
        <checker-item value="1">{{typeObj[1]}}</checker-item>
        <checker-item value="2">{{typeObj[2]}}</checker-item>
        <checker-item value="3">{{typeObj[3]}}</checker-item>
        <checker-item value="4">{{typeObj[4]}}</checker-item>
        <checker-item value="5">{{typeObj[5]}}</checker-item>
        <checker-item value="6">{{typeObj[6]}}</checker-item>
        <checker-item value="7">{{typeObj[7]}}</checker-item>
        <checker-item value="8">{{typeObj[8]}}</checker-item>
        <checker-item value="9">{{typeObj[9]}}</checker-item>
        <checker-item value="10">{{typeObj[10]}}</checker-item>
      </checker>
    </group>
    <group v-if="checker === '1'" :title="typeObj[checker]">
      <v-search title="交通方式" :cdata="trafficWaysList" v-model="formsData1.trafficWays"></v-search>
      <v-search title="交通类型" :cdata="trafficTypeList" v-model="formsData1.trafficType"></v-search>
      <datetime v-model="formsData1.startda" :start-date="systemDate" title="出发日期"></datetime>
      <datetime v-model="formsData1.endda" :start-date="systemDate" title="到达日期"></datetime>
      <popup-picker title="出发地" :data="tripPlace" :columns="1" v-model="formsData1.splace" show-name></popup-picker>
      <popup-picker title="到达地" :data="tripPlace" :columns="1" v-model="formsData1.eplace" show-name></popup-picker>
      <v-search title="币种"  :cdata="currencyList" v-model="formsData1.currency"></v-search>
      <x-input title="原币金额"   v-model="formsData1.originalCurrency"></x-input>
      <x-input title="汇率"   v-model="formsData1.rate"></x-input>
      <x-input title="金额"  v-model="formsData1.amount"></x-input>
    </group>
    <group v-if="checker === '2'" :title="typeObj[checker]">
      <scroller lock-x scrollbar-y height="400px" ref="scroller">
      <div>
      <!--<v-search title="境内/外" :cdata="overseasList" v-model="formsData1.overseas"></v-search>-->
      <v-search title="交通方式" :cdata="trafficWaysList" v-model="formsData1.trafficWays" ></v-search>
      <v-search title="交通类型" :cdata="trafficTypeList" v-model="formsData1.trafficType"></v-search>
      <datetime v-model="formsData1.startda" :start-date="systemDate" title="出发日期"></datetime>
      <datetime v-model="formsData1.endda" :start-date="systemDate" title="到达日期"></datetime>
      <popup-picker title="出发地" :data="tripPlace" :columns="1" v-model="formsData1.splace" show-name></popup-picker>
      <popup-picker title="到达地" :data="tripPlace" :columns="1" v-model="formsData1.eplace" show-name></popup-picker>
      <x-input title="地点"   v-model="formsData1.assress"></x-input>
      <x-input title="原币金额"   v-model="formsData1.originalCurrency"></x-input>
      <x-input title="汇率"  v-model="formsData1.rate"></x-input>
      <v-search title="币种"  :cdata="currencyList" v-model="formsData1.currency"></v-search>
      <x-input title="金额"  v-model="formsData1.amount"></x-input>
      <!--<v-search title="出差申请单号" v-if="show === '0'" :cdata="travelList" v-model="formsData1.travel" ></v-search>-->
      </div>
        </scroller>
    </group>
    <group v-if="checker === '3'" :title="typeObj[checker]">
      <!--<v-search title="境内/外" :cdata="overseasList" v-model="formsData4.overseas"></v-search>-->
      <v-search title="办公类型" :cdata="OffTypeList" v-model="formsData4.OffType"></v-search>
      <datetime v-model="formsData4.startda" :start-date="systemDate" title="日期"></datetime>
      <x-input title="金额"  v-model="formsData4.amount"></x-input>
      <v-search title="出差申请单号" v-if="show === '0'" :cdata="travelList" v-model="formsData4.travel" ></v-search>
      <x-input title="事由"  v-model="formsData4.matter"></x-input>
    </group>
    <group v-if="checker === '4'" :title="typeObj[checker]">
      <v-search title="餐费类型" :cdata="mealsList" v-model="formsData4.meals"></v-search>
      <datetime v-model="formsData4.startda" :start-date="systemDate" title="日期"></datetime>
      <x-input title="餐馆名称"  v-model="formsData2.restaurant"></x-input>
      <x-input title="金额"  v-model="formsData2.amount"></x-input>
      <v-search title="参加内部人员" :cdata="personList" v-model="formsData2.person"></v-search>
      <v-search title="用餐原因" :cdata="causeList" v-model="formsData2.cause"></v-search>
      <v-search title="出差申请单号" v-if="show === '0'" :cdata="travelList" v-model="formsData2.travel" ></v-search>
    </group>
    <group v-if="checker === '5'" :title="typeObj[checker]"></group>
    <group v-if="checker === '6'" :title="typeObj[checker]"></group>
    <group v-if="checker === '7'" :title="typeObj[checker]"></group>
    <group v-if="checker === '8'" :title="typeObj[checker]"></group>
    <group v-if="checker === '9'" :title="typeObj[checker]"></group>
    <group v-if="checker === '10'" :title="typeObj[checker]"></group>


    <flexbox class="footerButton">
      <flexbox-item class="vux-1px-r" @click.native="addReserve" style="color:#00B705">继续添加</flexbox-item>
      <flexbox-item @click.native="saveReserve" style="color:#FF8519">保存</flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {
    XTextarea,
    XInput,
    PopupPicker,
    Group,
    Datetime,
    Flexbox,
    FlexboxItem,
    Selector,
    Scroller,
    Cell,
    Checker,
    CheckerItem
  } from 'vux'
  import vSearch from '@/components/searchChecker';
  import dataUtils from '../../filters/dataUtils'
  import api from 'api'
  import {mapGetters} from 'vuex'
  import moment from 'moment' // 时间类

  let typeObj = {
    '1': '长途交通',
    '2': '市内交通',
    '3': '办公费用',
    '4': '餐费',
    '5': '住宿及餐补',
    '6': '培训费',
    '7': '通讯费',
    '8': '礼品费',
    '9': '电子发票',
    '10': '汇总'
  }

  export default {
    components: {
      XTextarea, XInput, PopupPicker, Group, Datetime, Flexbox, FlexboxItem, Selector, Cell, Checker, Scroller, CheckerItem, vSearch
    },
    data() {
      return {
        /* overseasList: [{
          key: '0',
          value: '境内'
        }, {
          key: '1',
          value: '境外'
        }], */
        formsData1: {
        //  overseas: '',
          trafficWays: '',
          trafficType: '',
          startda: moment().format('YYYY-MM-DD'),
          endda: moment().format('YYYY-MM-DD'),
          assress: '',
          originalCurrency: '',
          rate: '',
          currency: '',
          amount: '',
          travel: ''
        },
        formsData2: {
         // overseas: '',
          meals: '',
          startda: moment().format('YYYY-MM-DD'),
          restaurant: '',
          amount: '',
          person: '',
          cause: '',
          travel: ''
        },
        personList: [],
        causeList: [],
        mealsList: [],
        formsData4: {
         // overseas: '',
          OffType: '',
          startda: moment().format('YYYY-MM-DD'),
          amount: '',
          matter: ''
        },
        trafficTypeList: [],
        trafficWaysList: [],
        systemDate: moment().format('YYYY-MM-DD'),
        tripPlace: [],
        currencyList: [],
        burks: '',
        rspType: '',
        typeObj: typeObj,
        show: '1',
       // overseas: '0',
        checker: '1',
        mtype_class: '',
        mtype: '',
        travelList: [],
        OffTypeList: [
          {
            value: '客户招待',
            key: '2601'
          },
          {
            value: '会议费',
            key: '2602'
          },
          {
            value: '其他办公费用',
            key: '2603'
          },
          {
            value: '邮寄费',
            key: '2604'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        statePersonReimInfos: 'getPersonReimInfos'
      }),
      dxyjje: function () {
        return dataUtils.money2dx(this.formsData.yjje)
      }
    },
    created() {
      // let formsData = JSON.stringify(this.$route.query.formsData.forms.burks)
      this.show = this.$route.query.formsData.forms.rbstype
      this.burks = this.$route.query.formsData.forms.burks
      this.rspType = this.$route.query.formsData.forms.rbstype
      this.mtype_class = '20'
      if (this.show === '0') {
        this.mtype = '21'
      }
      if (this.show === '1') {
        this.mtype = '22'
      }
      let _that = this
      let params = {
        bukrs: this.burks
      };
      api.getTrafficCitys(params, params, function (res) {
        if (res) {
          _that.tripPlace = res.cityList // 交通方式
          _that.trafficWaysList = res.waerslist // 交通方式
        }
      })
      api.getTrfficType(function (res) {
        if (res.data.code) {
          _that.trafficTypeList = res.data.data.waersList
        }
      })
      let data1 = {
        burks: this.burks,
        stkey: this.mtype_class
      }
      api.getSubMenuList(data1, function (res) {
        alert(JSON.stringify(res))
        if (res.data.code) {
          console.log(JSON.stringify(res))
        }
      })
    this.getBaseData()
    },
    methods: {
      changeCheckType() {
        if (this.checker === '1') {
          this.mtype_class = '20'
          if (this.show === '0') {
            this.mtype = '21'
          }
          if (this.show === '1') {
            this.mtype = '22'
          }
        }
        if (this.checker === '2') {
          this.mtype_class = '40'
          if (this.show === '0') {
            this.mtype = '23'
          }
          if (this.show === '1') {
            this.mtype = '24'
          }
        }
        if (this.checker === '3') {
        }
        if (this.checker === '4') {
          if (this.show === '0') {
            this.mtype_class = '26'
          }
          if (this.show === '1') {
            this.mtype_class = '27'
          }
        }
        if (this.checker === '5') {
          if (this.show === '0') {
            this.mtype_class = '28'
          }
          if (this.show === '1') {
            this.mtype_class = '29'
          }
        }
        if (this.checker === '6') {
          this.mtype_class = '30'
        }
        if (this.checker === '7') {
          this.mtype_class = '31'
        }
        if (this.checker === '8') {
          this.mtype_class = '32'
        }
      },
      getBaseData() {
       // let _that = this
        let data = {
          burks: this.burks
        }
        api.getFundTypeList(data, function (res) {
          if (res.data.code) {
            alert(JSON.stringify(res))
          }
        })
      },
      addPreim() {
//        this.$store.dispatch('addPreim', this.formsData)
//        this.formsData = {}
      },
      saveReserve() {
        console.log(this.formsData)
//        this.$store.dispatch('addPreim', this.formsData)
//        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../../node_modules/vux/src/styles/1px.less';

  .checkerDiv {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
  }

  .checker-item {
    display: flex;
    width: 25%;
    margin: 2px 2px;
    border: 1px solid #ececec;
    padding: 5px 5px;
    text-align: center;
  }

  .checker-item-selected {
    border: 1px solid green;
  }

  .footerButton {
    padding-bottom: 10px;
    text-align: center;
  }
</style>
