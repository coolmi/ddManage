<template>
  <div>
    <div style="margin-bottom: 60px">
      <group title="选择类型">
        <checker v-model="checker" class="checkerDiv" default-item-class="checker-item"
                 selected-item-class="checker-item-selected">
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
        <v-search title="交通方式" :cdata="trafficWaysList" v-model="formsData1.stype"></v-search>
        <v-search title="交通类型" :cdata="trafficTypeList" v-model="formsData1.mtype"></v-search>
        <datetime v-model="formsData1.sdate" :start-date="systemDate" title="出发日期"></datetime>
        <datetime v-model="formsData1.edate" :start-date="systemDate" title="到达日期"></datetime>
        <v-search title="出发地" :cdata="tripPlace" :columns="1" v-model="formsData1.saddr" show-name></v-search>
        <v-search title="到达地" :cdata="tripPlace" :columns="1" v-model="formsData1.eaddr" show-name></v-search>
        <v-search title="币种" :cdata="currencyList" v-model="formsData1.waers" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" type="number" v-model="formsData1.wrbtr"></x-input>
        <cell v-show="originalCurrency1" v-if="currencyFlag === '1'">{{originalCurrency1}}</cell>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData1.kursf"></x-input>
        <x-input title="金额" read v-model="amount" @on-blur="changeAmount"></x-input>
        <cell v-if="cbFlag === '1'"><font color="#FF0000">超额{{Excessive}}</font></cell>
        <x-input title="项目号" readonly v-model="formsData1.conam"></x-input>
        <x-input title="超标事由" v-if="cbFlag === '1'" v-model="formsData1.ulrea"></x-input>
        <x-input title="说明"  v-model="formsData1.smemoltrad"></x-input>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData1.uuid"></x-input>
      </group>
      <group v-if="checker === '2'" :title="typeObj[checker]">
        <div>
          <v-search title="交通方式" :cdata="trafficWaysList" v-model="formsData2.stypec"></v-search>
          <v-search title="交通类型" :cdata="trafficTypeList" v-model="formsData2.mtypec"></v-search>
          <datetime v-model="formsData1.sdatec" :start-date="systemDate" title="出发日期"></datetime>
          <v-search title="币种" :cdata="currencyList" v-model="formsData2.waersc" @on-hide="getProtypeInfo"></v-search>
          <x-input title="原币金额" v-if="currencyFlag === '1'" type="number" v-model="formsData2.wrbtrc"></x-input>
          <cell v-show="originalCurrency2" v-if="currencyFlag === '1'">{{originalCurrency2}}</cell>
          <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData2.kursfc"></x-input>
          <x-input title="金额" read v-model="amount2" @on-blur="changeAmount"></x-input>
          <cell v-if="cbFlag === '1'"><font color="#FF0000">超额{{Excessive}}</font></cell>
          <v-search title="出发地" :cdata="tripPlace" :columns="1" v-model="formsData2.saddrc" show-name></v-search>
          <v-search title="到达地" :cdata="tripPlace" :columns="1" v-model="formsData2.eaddrc" show-name></v-search>
          <x-input title="项目号" readonly v-model="formsData2.colnrc"></x-input>
          <x-input title="超标事由" v-if="cbFlag === '1'" readonly v-model="formsData2.ulreac"></x-input>
          <x-input title="说明"  v-model="formsData2.smemoc"></x-input>
          <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData2.uuid"></x-input>
        </div>
      </group>
      <group v-if="checker === '3'" :title="typeObj[checker]">
        <v-search title="办公费用类型" :cdata="OffTypeList" v-model="formsData3.stypeo"></v-search>
        <datetime v-model="formsData3.sdateo" :start-date="systemDate" title="日期"></datetime>
        <v-search title="币种" :cdata="currencyList" v-model="formsData3.waerso" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" type="number" v-model="formsData3.wrbtro"></x-input>
        <cell v-show="originalCurrency3">{{originalCurrency3}}</cell>
        <x-input title="汇率"  v-if="currencyFlag === '1'" type="number" v-model="formsData3.kursfo"></x-input>
        <x-input title="总金额" read v-model="amount3"></x-input>
        <x-input title="项目号" readonly v-model="formsData3.conamo"></x-input>
        <x-input title="事由" v-model="formsData3.smemoo"></x-input>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData3.uuid"></x-input>
      </group>
      <group v-if="checker === '4'" :title="typeObj[checker]">
        <v-search title="餐费类型" :cdata="mealsList" v-model="formsData4.meals"></v-search>
        <datetime v-model="formsData4.startda" :start-date="systemDate" title="日期"></datetime>
        <v-search title="币种" :cdata="currencyList" v-model="formsData4.currency" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" type="number" v-model="formsData4.originalCurrency"></x-input>
        <cell v-show="originalCurrency4">{{originalCurrency4}}</cell>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData4.rate"></x-input>
        <x-input title="总金额" read v-model="amount4"></x-input>
        <x-input title="项目号" readonly v-model="formsData4.itemNo"></x-input>
        <x-input title="用餐原因" v-model="formsData4.reason"></x-input>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData4.uuid"></x-input>
      </group>
      <group v-if="checker === '5'" :title="typeObj[checker]">
        <v-search title="住宿类型" :cdata="zslxList" v-model="formsData5.zslx"></v-search>
        <v-search title="酒店地点" :cdata="tripPlace" v-model="formsData5.jddd"></v-search>
        <datetime v-model="formsData5.rzdate" :start-date="systemDate" title="入住日期"></datetime>
        <datetime v-model="formsData5.tfdate" :start-date="systemDate" title="退房日期"></datetime>
        <v-search title="币种" :cdata="currencyList" v-model="formsData5.bz" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" placeholder="请填写原币金额" :max=9 v-model="formsData5.ybje"></x-input>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData5.hl"></x-input>
        <x-input title="住宿金额"  read placeholder="请填写住宿金额" :max=9 v-model="amount5"></x-input>
        <x-input title="项目号" readonly v-model="formsData5.itemNo"></x-input>
        <x-input title="餐补" readonly v-model="formsData5.cb"></x-input>
        <x-input title="扣除餐补"  v-if="currencyFlag === '0'" readonly v-model="formsData5.kccb"></x-input>
        <x-textarea title="住宿原因" v-model="formsData5.zsyy"></x-textarea>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData5.uuid"></x-input>
      </group>
      <group v-if="checker === '6'" :title="typeObj[checker]">
        <v-search title="培训类型" :cdata="zslxList" v-model="formsData6.zslx"></v-search>
        <v-search title="书籍/课程名称" :cdata="tripPlace" v-model="formsData6.jddd"></v-search>
        <v-search title="币种" :cdata="currencyList" v-model="formsData6.bz" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" placeholder="请填写原币金额" :max=9 v-model="formsData6.ybje"></x-input>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData6.hl"></x-input>
        <x-input title="金额"  read placeholder="请填写住宿金额" :max=9 v-model="amount6"></x-input>
        <x-input title="项目号" readonly v-model="formsData6.itemNo"></x-input>
        <x-input title="培训申请单号" readonly v-model="formsData6.bzlist"></x-input>
        <x-textarea title="培训说明" v-model="formsData6.zsyy"></x-textarea>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData6.uuid"></x-input>
      </group>
      <group v-if="checker === '7'" :title="typeObj[checker]">
        <v-search title="通讯类型" :cdata="txlxList" v-model="formsData7.txlx"></v-search>
        <v-search title="月份" :cdata="yfList" v-model="formsData7.yf"></v-search>
        <v-search title="币种" :cdata="currencyList" v-model="formsData7.bz" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" placeholder="请填写原币金额" :max=9 v-model="formsData7.ybje"></x-input>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData7.hl"></x-input>
        <x-input title="金额"  read placeholder="请填写住宿金额" :max=9 v-model="amount7"></x-input>
        <x-input title="项目号" readonly v-model="formsData7.itemNo"></x-input>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData7.uuid"></x-input>
      </group>
      <group v-if="checker === '8'" :title="typeObj[checker]">
        <v-search title="礼品费类型" :cdata="lplxList" v-model="formsData8.txlx"></v-search>
        <datetime v-model="formsData8.rzdate" :start-date="systemDate" title="发生日期"></datetime>
        <v-search title="币种" :cdata="currencyList" v-model="formsData8.bz" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" placeholder="请填写原币金额" :max=9 v-model="formsData8.ybje"></x-input>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData8.hl"></x-input>
        <x-input title="金额"  read placeholder="请填写住宿金额" :max=9 v-model="amount8"></x-input>
        <x-input title="项目号" readonly v-model="formsData8.itemNo"></x-input>
        <x-textarea title="事由" v-model="formsData8.zsyy"></x-textarea>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData8.uuid"></x-input>
      </group>
      <group v-if="checker === '9'" :title="typeObj[checker]">
        <x-input title="电子发票号"  v-model="formsData9.invoiceNumber"></x-input>
        <x-input title="链接"  v-model="formsData9.invoiceLink"></x-input>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData9.uuid"></x-input>
      </group>
      <group v-if="checker === '10'" :title="typeObj[checker]"></group>

    </div>
    <flexbox class="footerButton">
      <!--<flexbox-item class="vux-1px-r" @click.native="addReserve" style="color:#00B705">继续添加</flexbox-item>-->
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
  import whole from '@/lib/whole' // 封装组件库
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
      XTextarea,
      XInput,
      PopupPicker,
      Group,
      Datetime,
      Flexbox,
      FlexboxItem,
      Selector,
      Cell,
      Checker,
      Scroller,
      CheckerItem,
      vSearch
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
          stype: '',
          mtype: '',
          sdate: moment().format('YYYY-MM-DD'),
          edate: moment().format('YYYY-MM-DD'),
          saddr: '',
          eaddr: '',
          waers: '',
          wrbtr: '',
          kursf: '',
          conam: '',
          travel: '',
          ulrea: '',
          smemoltrad: '',
          uuid: ''
        },
        formsData2: {
          stypec: '',
          mtypec: '',
          sdatec: moment().format('YYYY-MM-DD'),
          saddrc: '',
          eaddrc: '',
          waersc: '',
          wrbtrc: '',
          kursfc: '',
          conamc: '',
          travelc: '',
          ulreac: '',
          smemoc: '',
          uuid: ''
        },
        formsData3: {
          stypeo: '',
          sdateo: moment().format('YYYY-MM-DD'),
          wrbtro: '',
          kursfo: '',
          waerso: '',
          conamo: '',
          smemoo: '',
          uuid: ''
        },
        formsData4: {
          reason: '',
          itemNo: '',
          startda: moment().format('YYYY-MM-DD'),
          currency: '',
          originalCurrency: '',
          rate: '',
          meals: ''
        },
        formsData5: {
          reason: '',
          itemNo: '',
          startda: moment().format('YYYY-MM-DD'),
          currency: '',
          originalCurrency: '',
          rate: '',
          meals: ''
        },
        formsData6: {
          reason: '',
          itemNo: '',
          startda: moment().format('YYYY-MM-DD'),
          currency: '',
          originalCurrency: '',
          rate: '',
          zslx: ''
        },
        formsData7: {
          reason: '',
          itemNo: '',
          currency: '',
          originalCurrency: '',
          rate: ''
        },
        formsData8: {
          invoiceNumber: '',
          invoiceLink: ''
        },
        formsData9: {
          reason: '',
          itemNo: '',
          currency: '',
          originalCurrency: '',
          rate: ''
        },
        itemNoList: [],
        personList: [],
        causeList: [],
        mealsList: [],
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
        OffTypeList: [],
        zslxList: [],
        pxlxList: [],
        bzlist: [],
        currencyFlag: '0',
        read: '',
        protype: '',
        postid: '',
        cbFlag: '0',
        Excessive: '',
        yfList: [
          {
            value: '1-月',
            key: '1'
          },
          {
            value: '2-月',
            key: '2'
          },
          {
            value: '3-月',
            key: '3'
          },
          {
            value: '4-月',
            key: '4'
          },
          {
            value: '5-月',
            key: '5'
          },
          {
            value: '6-月',
            key: '6'
          },
          {
            value: '7-月',
            key: '7'
          },
          {
            value: '8-月',
            key: '8'
          },
          {
            value: '9-月',
            key: '9'
          },
          {
            value: '10-月',
            key: '10'
          },
          {
            value: '11-月',
            key: '11'
          },
          {
            value: '12-月',
            key: '12'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        statePersonReimInfos: 'getPersonReimInfos'
      }),
    originalCurrency1: function () {
      return dataUtils.money2dx(this.formsData1.wrbtr)
    },
    amount: function () {
      return this.formsData1.wrbtr * this.formsData1.kursf.substr(0, 6)
    },
    originalCurrency2: function () {
      return dataUtils.money2dx(this.formsData2.wrbtrc)
    },
    amount2: function () {
      return this.formsData2.wrbtrc * this.formsData2.kursfc.substr(0, 6)
    },
    originalCurrency3: function () {
      return dataUtils.money2dx(this.formsData3.wrbtro)
    },
    amount3: function () {
      return this.formsData3.wrbtro * this.formsData3.kursfo.substr(0, 6)
    },
    originalCurrency4: function () {
      return dataUtils.money2dx(this.formsData4.originalCurrency)
    },
    amount4: function () {
      return this.formsData4.originalCurrency * this.formsData4.rate.substr(0, 6)
    },
    originalCurrency5: function () {
      return dataUtils.money2dx(this.formsData5.originalCurrency)
    },
    amount5: function () {
      return this.formsData5.originalCurrency * this.formsData5.rate.substr(0, 6)
    },
    originalCurrency6: function () {
      return dataUtils.money2dx(this.formsData6.originalCurrency)
    },
    amount6: function () {
      return this.formsData6.originalCurrency * this.formsData6.rate.substr(0, 6)
    },
    originalCurrency7: function () {
      return dataUtils.money2dx(this.formsData7.originalCurrency)
    },
    amount7: function () {
      return this.formsData7.originalCurrency * this.formsData7.rate.substr(0, 6)
    },
    originalCurrency8: function () {
      return dataUtils.money2dx(this.formsData8.originalCurrency)
    },
    amount8: function () {
      return this.formsData8.originalCurrency * this.formsData8.rate.substr(0, 6)
    }
  },
  watch: {
    checker: function (val) {
      this.getBaseData()
    }
  },
  created() {
    // let formsData = JSON.stringify(this.$route.query.formsData.forms.burks)
    this.show = this.$route.query.formsData.forms.rbstype
    this.burks = this.$route.query.formsData.forms.burks
    this.rspType = this.$route.query.formsData.forms.rbstype
    this.kostl = this.$route.query.formsData.forms.kostl
    this.protype = this.$route.query.formsData.forms.protype
    this.postid = this.$route.query.formsData.forms.postid
    this.getBaseData()
  },
  methods: {
    getBaseData() {
      if (this.checker === '1') {
        this.currencyFlag = '0'
        this.formsData1.kursf = '1'
        this.mtype_class = '20'
        this.mtype = this.show === '0' ? '21' : '22'
        let fsparam = {
          bukrs: this.burks,
          stkey: this.mtype_class
        }
        let lxparam = {
          bukrs: this.burks,
          stkey: this.mtype
        }
        let typaram = {
          bukrs: this.burks
        }
        let _that = this;
        api.getPersonReimBaseData(fsparam, lxparam, typaram, function (res) {
          _that.trafficWaysList = res[0].waerslist
          _that.trafficTypeList = res[1].waerslist
          _that.tripPlace = res[2].cityList
          _that.currencyList = res[3].waerslist
         // _that.taxList = res[4].taxCodeList
        })
      }
      if (this.checker === '2') {
        this.currencyFlag = '0'
        this.formsData2.kursfc = '1'
        this.mtype_class = '40'
        this.mtype = this.show === '0' ? '23' : '24'
        let fsparam = {
          bukrs: this.burks,
          stkey: this.mtype_class
        }
        let lxparam = {
          bukrs: this.burks,
          stkey: this.mtype
        }
        let typaram = {
          bukrs: this.burks
        }
        let _that = this;
        api.getPersonReimBaseData(fsparam, lxparam, typaram, function (res) {
          _that.trafficWaysList = res[0].waerslist
          _that.trafficTypeList = res[1].waerslist
          _that.tripPlace = res[2].cityList
          _that.currencyList = res[3].waerslist
          _that.taxList = res[4].taxCodeList
        })
      }
      if (this.checker === '3') {
        this.currencyFlag = '0'
        this.formsData3.kursfo = '1'
        this.mtype_class = '25'
        let fsparam = {
          bukrs: this.burks,
          stkey: this.mtype_class
        }
        let typaram = {
          bukrs: this.burks
        }
        let _that = this;
        api.getOfficePersonReimBaseData(fsparam, typaram, function (res) {
          _that.OffTypeList = res[0].waerslist
          _that.currencyList = res[1].waerslist
          _that.taxList = res[2].taxCodeList
        })
      }
      if (this.checker === '4') {
        this.currencyFlag = '0'
        this.formsData4.rate = '1'
        this.mtype = this.show === '0' ? '26' : '27'
        let fsparam = {
          bukrs: this.burks,
          stkey: this.mtype
        }
        let typaram = {
          bukrs: this.burks
        }
        let _that = this;
        api.getOfficePersonReimBaseData(fsparam, typaram, function (res) {
          _that.mealsList = res[0].waerslist
          _that.currencyList = res[1].waerslist
          _that.taxList = res[2].taxCodeList
        })
      }
      if (this.checker === '5') {
        this.currencyFlag = '0'
        this.formsData5.rate = '1'
        this.mtype = this.show === '0' ? '28' : '29'
        let fsparam = {
          bukrs: this.burks,
          stkey: this.mtype
        }
        let typaram = {
          bukrs: this.burks
        }
        let _that = this;
        api.getOfficePersonReimBaseData(fsparam, typaram, function (res) {
          _that.zslxList = res[0].waerslist
          _that.currencyList = res[1].waerslist
          _that.taxList = res[2].taxCodeList
          _that.tripPlace = res[3].cityList
        })
      }
      if (this.checker === '6') {
        this.currencyFlag = '0'
        this.formsData6.rate = '1'
        this.mtype_class = '30'
        let fsparam = {
          bukrs: this.burks,
          stkey: this.mtype_class
        }
        let typaram = {
          bukrs: this.burks
        }
        let _that = this;
        api.getOfficePersonReimBaseData(fsparam, typaram, function (res) {
          _that.pxlxList = res[0].waerslist
          _that.currencyList = res[1].waerslist
        })
      }
      if (this.checker === '7') {
        this.currencyFlag = '0'
        this.formsData7.rate = '1'
        this.mtype_class = '31'
        let fsparam = {
          bukrs: this.burks,
          stkey: this.mtype_class
        }
        let typaram = {
          bukrs: this.burks
        }
        let _that = this;
        api.getOfficePersonReimBaseData(fsparam, typaram, function (res) {
          _that.txlxList = res[0].waerslist
          _that.currencyList = res[1].waerslist
        })
      }
      if (this.checker === '8') {
        this.currencyFlag = '0'
        this.formsData8.rate = '1'
        this.mtype_class = '32'
        let fsparam = {
          bukrs: this.burks,
          stkey: this.mtype_class
        }
        let typaram = {
          bukrs: this.burks
        }
        let _that = this;
        api.getOfficePersonReimBaseData(fsparam, typaram, function (res) {
          _that.lplxList = res[0].waerslist
          _that.currencyList = res[1].waerslist
        })
      }
    },
    getProtypeInfo() {
      if (this.checker === '1') {
        this.cbFlag = '0'
        this.formsData1.kursf = ''
        if (this.formsData1.waers === 'CNY') {
          this.currencyFlag = '0'
          this.formsData1.kursf = '1'
        }
        if (this.formsData1.waers !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
        let params = {
          mtype_class: this.mtype,
          mtype: this.formsData1.mtype,
          bukrs: this.burks,
          abroadis: this.currencyFlag,
          kostl: this.kostl,
          postid: this.postid
        }
         let _that = this;
        if (this.protype === '通用项目') {
          api.getColdconamList(params, function (res) {
              _that.formsData1.colnr = res[0].kstar + '-' + res[0].kstarval
          })
        }
        if (this.protype === '专项项目') {
          api.getColdconamzList(params, function (res) {
              _that.formsData1.colnr = res[0].kstar + '-' + res[0].kstarval
          })
        }
      }
      if (this.checker === '2') {
        this.formsData2.kursfc = ''
        if (this.formsData2.waersc === 'CNY') {
          this.currencyFlag = '0'
          this.formsData2.kursfc = '1'
        }
        if (this.formsData2.waersc !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
        let params = {
          mtype_class: this.mtype,
          mtype: this.formsData1.mtype,
          bukrs: this.burks,
          abroadis: this.currencyFlag,
          kostl: this.kostl
        }
        let _that = this
        if (this.protype === '通用项目') {
          api.getColdconamList(params, function (res) {
            if (res[0].colnrList[0] !== '') {
              _that.formsData2.colnrc = res[0].colnrList.kstar + '-' + res[0].colnrList.kstarval
            }
          })
        }
        if (this.protype === '专项项目') {
          api.getColdconamzList(params, function (res) {
            _that.formsData2.colnrc = res[0].kstar + '-' + res[0].kstarval
          })
        }
      }
      if (this.checker === '3') {
        this.formsData3.kursfo = ''
        if (this.formsData3.waerso === 'CNY') {
          this.currencyFlag = '0'
          this.formsData3.kursfo = '1'
        }
        if (this.formsData3.waerso !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
        let params = {
          mtype_class: this.mtype_class,
          mtype: this.formsData3.stypeo,
          bukrs: this.burks,
          abroadis: this.currencyFlag,
          kostl: this.kostl
        }
         let _that = this;
        if (this.protype === '通用项目') {
          api.getColdconamList(params, function (res) {
            _that.formsData3.colnro = res[0].kstar + '-' + res[0].kstarval
          })
        }
        if (this.protype === '专项项目') {
          api.getColdconamzList(params, function (res) {
            _that.formsData3.colnro = res[0].kstar + '-' + res[0].kstarval
          })
        }
      }
      if (this.checker === '4') {
        this.formsData4.rate = ''
        if (this.formsData4.currency === 'CNY') {
          this.currencyFlag = '0'
          this.formsData4.rate = '1'
        }
        if (this.formsData4.currency !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
        let params = {
          mtype_class: this.mtype,
          mtype: this.formsData4.meals,
          bukrs: this.burks,
          abroadis: this.currencyFlag,
          kostl: this.kostl
        }
         let _that = this;
        if (this.protype === '通用项目') {
          api.getColdconamList(params, function (res) {
            _that.formsData4.itemNo = res[0].kstar + '-' + res[0].kstarval
          })
        }
        if (this.protype === '专项项目') {
          api.getColdconamzList(params, function (res) {
            _that.formsData4.itemNo = res[0].kstar + '-' + res[0].kstarval
          })
        }
      }
      if (this.checker === '5') {
        this.formsData5.rate = ''
        if (this.formsData5.currency === 'CNY') {
          this.currencyFlag = '0'
          this.formsData5.rate = '1'
        }
        if (this.formsData5.currency !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
        let params = {
          mtype_class: this.mtype,
          mtype: this.formsData5.zslx,
          bukrs: this.burks,
          abroadis: this.currencyFlag,
          kostl: this.kostl
        }
         let _that = this;
        if (this.protype === '通用项目') {
          api.getColdconamList(params, function (res) {
            _that.formsData5.itemNo = res[0].kstar + '-' + res[0].kstarval
          })
        }
        if (this.protype === '专项项目') {
          api.getColdconamzList(params, function (res) {
            _that.formsData5.itemNo = res[0].kstar + '-' + res[0].kstarval
          })
        }
      }
      if (this.checker === '6') {
        this.formsData6.rate = ''
        if (this.formsData6.currency === 'CNY') {
          this.currencyFlag = '0'
          this.formsData6.rate = '1'
        }
        if (this.formsData6.currency !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
        let params = {
          mtype_class: this.mtype_class,
          mtype: this.formsData6.zslx,
          bukrs: this.burks,
          abroadis: this.currencyFlag,
          kostl: this.kostl
        }
         let _that = this;
        if (this.protype === '通用项目') {
          api.getColdconamList(params, function (res) {
            _that.formsData6.itemNo = res[0].kstar + '-' + res[0].kstarval
          })
        }
        if (this.protype === '专项项目') {
          api.getColdconamzList(params, function (res) {
            _that.formsData6.itemNo = res[0].kstar + '-' + res[0].kstarval
          })
        }
      }
      if (this.checker === '7') {
        this.formsData7.rate = ''
        if (this.formsData7.currency === 'CNY') {
          this.currencyFlag = '0'
          this.formsData7.rate = '1'
        }
        if (this.formsData7.currency !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
      }
      if (this.checker === '8') {
        this.formsData8.rate = ''
        if (this.formsData8.currency === 'CNY') {
          this.currencyFlag = '0'
          this.formsData8.rate = '1'
        }
        if (this.formsData8.currency !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
      }
     /*  if (this.formsData2.currency === 'CNY') {
        this.currencyFlag = '0'
        this.formsData1.rate = '1'
      }
      if (this.formsData2.currency !== 'CNY') {
        this.currencyFlag = '1'
        this.read = 'readonly'
      }
      if (this.formsData3.currency === 'CNY') {
        this.currencyFlag = '0'
        this.formsData1.rate = '1'
      }
      if (this.formsData3.currency !== 'CNY') {
        this.currencyFlag = '1'
        this.read = 'readonly'
      } */
    },
    // 校验金额是否超标
    changeAmount(value) {
      let params = {
        mtype_class: this.mtype_class,
        mtype: this.mtype,
        bukrs: this.burks,
        abroadis: this.currencyFlag,
        money: value,
        postid: this.postid
      }
      let _that = this
      api.getOverproofLtrad(params, function (res) {
        if (res[0] !== '') {
         _that.Excessive = res[0].ulfee
          _that.cbFlag = '1'
        }
      })
    },
    saveReserve() {
    //  var transmode = dataUtils.getDescValue(this.tripTraffic, this.formsData.transmodeId)
      if (this.checker === '1') {
        if (this.formsData1.stype === '') {
          whole.showTop('请选择交通方式')
          return;
        }
        if (this.formsData1.mtype === '') {
          whole.showTop('请选择交通类型')
          return;
        }
        if (this.formsData1.sdate.length === 0) {
          whole.showTop('请选择出发日期')
          return;
        }
        if (this.formsData1.edate.length === 0) {
          whole.showTop('请选择到达日期')
          return;
        } else {
          if (moment(this.formsData1.sdate).isBefore(this.formsData1.edate)) {
            whole.showTop('到达日期不能小于结束日期')
            return;
          }
        }
        if (this.formsData1.saddr === '') {
          whole.showTop('请选择出发地点')
          return;
        }
        if (this.formsData1.eaddr === '') {
          whole.showTop('请选择到达地点')
          return;
        }
        if (this.formsData1.waers !== 'CNY') {
          if (this.formsData1.wrbtr === '') {
            whole.showTop('请选填写原币金额')
            return;
          }
          if (this.formsData1.kursf === '') {
            whole.showTop('请选填写汇率')
            return;
          }
        }
        if (this.formsData1.waers === '') {
          whole.showTop('请选择交通币种')
          return;
        }
        /* if (this.formsData1.dmbtr === '') {
          whole.showTop('请填写总金额')
          return;
        } */
        alert(JSON.stringify(this.checker))
        let formsData = {
          stype: this.formsData1.stype,
          mtype: this.formsData1.mtype,
          sdate: this.formsData1.sdate,
          edate: this.formsData1.edate,
          saddr: this.formsData1.saddr,
          eaddr: this.formsData1.eaddr,
          waers: this.formsData1.waers,
          wrbtr: this.formsData1.wrbtr,
          kursf: this.formsData1.kursf,
          conam: this.formsData1.conam,
          travel: this.formsData1.travel,
          ulrea: this.formsData1.ulrea,
          smemoltrad: this.formsData1.smemoltrad,
         // dmbtr: this.amount,
          uuid: this.formsData1.uuid
        }
        console.log(formsData)
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
        this.$router.go(-1)
      }
      if (this.checker === '2') {
        if (this.formsData1.stypec === '') {
          whole.showTop('请选择交通方式')
          return;
        }
        if (this.formsData2.mtypec === '') {
          whole.showTop('请选择交通类型')
          return;
        }
        if (this.formsData2.sdatec.length === 0) {
          whole.showTop('请选择出发日期')
          return;
        }
        if (this.formsData2.saddrc === '') {
          whole.showTop('请选择出发地点')
          return;
        }
        if (this.formsData2.eaddrc === '') {
          whole.showTop('请选择到达地点')
          return;
        }
        if (this.formsData2.waersc !== 'CNY') {
          if (this.formsData2.wrbtrc === '') {
            whole.showTop('请选填写原币金额')
            return;
          }
          if (this.formsData2.kursfc === '') {
            whole.showTop('请选填写汇率')
            return;
          }
        }
        if (this.formsData2.waersc === '') {
          whole.showTop('请选择交通币种')
          return;
        }
        /* if (this.formsData2.dmbtrc === '') {
          whole.showTop('请填写总金额')
          return;
        } */
        alert(JSON.stringify(this.checker))
        let formsData = {
          stypec: this.formsData2.stypec,
          mtypec: this.formsData2.mtypec,
          sdatec: this.formsData2.sdatec,
          saddrc: this.formsData2.saddrc,
          eaddrc: this.formsData2.eaddrc,
          waersc: this.formsData2.waersc,
          wrbtrc: this.formsData2.wrbtrc,
          kursfc: this.formsData2.kursfc,
          conamc: this.formsData2.conamc,
          travelc: this.formsData2.travelc,
          ulreac: this.formsData2.ulreac,
          smemc: this.formsData2.smemoc,
          // dmbtr: this.amount,
          uuid: this.formsData2.uuid
        }
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
        this.$router.go(-1)
      }
      if (this.checker === '3') {
        if (this.formsData3.stypeo === '') {
          whole.showTop('请选择办公类型')
          return;
        }
        if (this.formsData3.sdateo.length === 0) {
          whole.showTop('请选择日期')
          return;
        }

        if (this.formsData3.waerso !== 'CNY') {
          if (this.formsData3.wrbtro === '') {
            whole.showTop('请选填写原币金额')
            return;
          }
          if (this.formsData3.kursfo === '') {
            whole.showTop('请选填写汇率')
            return;
          }
        }
        if (this.formsData3.waerso === '') {
          whole.showTop('请选择币种')
          return;
        }
        /* if (this.formsData1.dmbtr === '') {
         whole.showTop('请填写总金额')
         return;
         } */
        alert(JSON.stringify(this.checker))
        let formsData = {
          stypeo: this.formsData3.stypeo,
          sdateo: this.formsData3.sdateo,
          waerso: this.formsData3.waerso,
          wrbtro: this.formsData3.wrbtro,
          kursfo: this.formsData3.kursfo,
          conamo: this.formsData3.conamo,
          smemoo: this.formsData3.smemoo,
          // dmbtr: this.amount,
          uuid: this.formsData3.uuid
        }
        console.log(formsData)
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
        this.$router.go(-1)
      }
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

  .contentGroup {
    margin-bottom: 50px;
  }

  .footerButton {
    padding-bottom: 10px;
    text-align: center;
  }
</style>
