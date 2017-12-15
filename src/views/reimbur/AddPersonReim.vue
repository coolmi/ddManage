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
        <x-input title="项目号" readonly v-model="formsData1.colnr"></x-input>
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
          <x-input title="金额" read v-model="amount2" @on-blur="changeAmountC"></x-input>
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
        <v-search title="税码" v-if="pFlag === '1' && currencyFlag === '0'" :cdata="purchoList" v-model="formsData3.purcho" ></v-search>
        <x-input title="项目号" readonly v-model="formsData3.colnro"></x-input>
        <x-input title="事由" v-model="formsData3.smemoo"></x-input>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData3.uuid"></x-input>
      </group>
      <group v-if="checker === '4'" :title="typeObj[checker]">
        <v-search title="餐费类型" :cdata="mealsList" v-model="formsData4.stypem"></v-search>
        <datetime v-model="formsData4.sdatem" :start-date="systemDate" title="日期"></datetime>
        <v-search title="币种" :cdata="currencyList" v-model="formsData4.waersm" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" type="number" v-model="formsData4.wrbtrm"></x-input>
        <cell v-show="originalCurrency4">{{originalCurrency4}}</cell>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData4.kursfm"></x-input>
        <x-input title="总金额" read v-model="amount4"></x-input>
        <x-input title="项目号" readonly v-model="formsData4.colnrm"></x-input>
        <x-input title="用餐原因" v-model="formsData4.smemom"></x-input>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData4.uuid"></x-input>
      </group>
      <group v-if="checker === '5'" :title="typeObj[checker]">
        <v-search title="住宿类型" :cdata="zslxList" v-model="formsData5.stypeh"></v-search>
        <v-search title="酒店地点" :cdata="tripPlace" v-model="formsData5.saddrh"></v-search>
        <datetime v-model="formsData5.sdateh" :start-date="systemDate" title="入住日期"></datetime>
        <datetime v-model="formsData5.edateh" :start-date="systemDate" title="退房日期"></datetime>
        <v-search title="币种" :cdata="currencyList" v-model="formsData5.waersh" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" placeholder="请填写原币金额" :max=9 v-model="formsData5.wrbtrh"></x-input>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData5.kursfh"></x-input>
        <x-input title="住宿金额"  read placeholder="请填写住宿金额" :max=9 v-model="amount5" @on-blur="changeAmountZ"></x-input>
        <cell v-if="cbFlag === '1'"><font color="#FF0000">超额{{Excessive}}</font></cell>
        <x-input title="项目号" readonly v-model="formsData5.colnrh"></x-input>
        <x-input title="餐补"  v-model="formsData5.mealsuph" @on-blur="changeAmountCE"></x-input>
        <cell v-if="cbceFlag === '1'"><font color="#FF0000">超额{{ExcessiveCb}}</font></cell>
        <x-input title="扣除餐补"  v-if="currencyFlag === '0'" readonly v-model="formsData5.demealh"></x-input>
        <x-textarea title="住宿原因" v-model="formsData5.smemoh"></x-textarea>
        <x-textarea title="超额原因" v-if="cbceFlag === '1'" v-model="formsData5.ulreah"></x-textarea>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData5.uuid"></x-input>
      </group>
      <group v-if="checker === '6'" :title="typeObj[checker]">
        <v-search title="培训类型" :cdata="pxlxList" v-model="formsData6.stypet"></v-search>
        <v-search title="书籍/课程名称" :cdata="tripPlace" v-model="formsData6.traint"></v-search>
        <v-search title="币种" :cdata="currencyList" v-model="formsData6.waerst" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" placeholder="请填写原币金额" :max=9 v-model="formsData6.wrbtrt"></x-input>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData6.kursft"></x-input>
        <x-input title="金额"  read placeholder="请填写住宿金额" :max=9 v-model="amount6"></x-input>
        <v-search title="税码" v-if="pFlag === '1' && currencyFlag === '0'" :cdata="purchoList" v-model="formsData6.purcht" ></v-search>
        <x-input title="项目号" readonly v-model="formsData6.colnrt"></x-input>
        <x-input title="培训申请单号" readonly v-model="formsData6.tnlnrt"></x-input>
        <x-textarea title="培训说明" v-model="formsData6.smemot"></x-textarea>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData6.uuid"></x-input>
      </group>
      <group v-if="checker === '7'" :title="typeObj[checker]">
        <v-search title="通讯类型" :cdata="txlxList" v-model="formsData7.stypee"></v-search>
        <v-search title="月份" :cdata="yfList" v-model="formsData7.sdatee"></v-search>
        <v-search title="币种" :cdata="currencyList" v-model="formsData7.waerse" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" placeholder="请填写原币金额" :max=9 v-model="formsData7.wrbtre"></x-input>
        <cell v-show="originalCurrency7" v-if="currencyFlag === '1'">{{originalCurrency7}}</cell>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData7.kursfe"></x-input>
        <x-input title="金额"  read placeholder="请填写住宿金额" :max=9 v-model="amount7" @on-blur="feeAmount" ></x-input>
        <cell v-if="cbFlag === '1'"><font color="#FF0000">超额{{Excessive}}</font></cell>
        <x-input title="项目号" readonly v-model="formsData7.colnre"></x-input>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData7.uuid"></x-input>
      </group>
      <group v-if="checker === '8'" :title="typeObj[checker]">
        <v-search title="礼品费类型" :cdata="lplxList" v-model="formsData8.stypeg"></v-search>
        <datetime v-model="formsData8.sdateg" :start-date="systemDate" title="发生日期"></datetime>
        <v-search title="币种" :cdata="currencyList" v-model="formsData8.waersg" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" placeholder="请填写原币金额" :max=9 v-model="formsData8.wrbtrg"></x-input>
        <cell v-show="originalCurrency8" v-if="currencyFlag === '1'">{{originalCurrency8}}</cell>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData8.kursfg"></x-input>
        <x-input title="金额"  read placeholder="请填写住宿金额" :max=9 v-model="amount8"></x-input>
        <x-input title="项目号" readonly v-model="formsData8.colnrg"></x-input>
        <x-textarea title="事由" v-model="formsData8.ulreag"></x-textarea>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData8.uuid"></x-input>
      </group>
      <group v-if="checker === '9'" :title="typeObj[checker]">
        <x-input title="电子发票号"  v-model="formsData9.electronicnum"></x-input>
        <x-input title="链接"  v-model="formsData9.linkv"></x-input>
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
          colnr: '',
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
          colnrc: '',
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
          colnro: '',
          purcho: '',
          smemoo: '',
          uuid: ''
        },
        formsData4: {
          stypem: '',
          colnrm: '',
          sdatem: moment().format('YYYY-MM-DD'),
          waersm: '',
          wrbtrm: '',
          kursfm: '',
          smemom: '',
          uuid: ''
        },
        formsData5: {
          stypeh: '',
          itemNo: '',
          sdateh: moment().format('YYYY-MM-DD'),
          edateh: moment().format('YYYY-MM-DD'),
          saddrh: '',
          waersh: '',
          wrbtrh: '',
          kursfh: '',
          colnrh: '',
          mealsuph: '',
          demealh: '',
          smemoh: '',
          ulreah: '',
          uuid: ''
        },
        formsData6: {
          stypet: '',
          traint: '',
          waerst: '',
          wrbtrt: '',
          kursft: '',
          purcht: '',
          colnrt: '',
          tnlnrt: '',
          smemot: '',
          uuid: ''
        },
        formsData7: {
          stypee: '',
          sdatee: moment().format('YYYY-MM-DD'),
          waerse: '',
          wrbtre: '',
          kursfe: '',
          colnre: '',
          uuid: ''
//          feeAmount: ''
        },
        formsData8: {
          stypeg: '',
          sdateg: moment().format('YYYY-MM-DD'),
          waersg: '',
          wrbtrg: '',
          kursfg: '',
          dmbtrg: '',
          colnrg: '',
          smemg: '',
          uuid: '',
          ulreag: ''
        },
        formsData9: {
          linkv: '',
          electronicnum: '',
          uuid: ''
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
        txlxList: [],
        lplxList: [],
        currencyFlag: '0',
        read: '',
        protype: '',
        postid: '',
        cbFlag: '0',
        cbceFlag: '0',
        Excessive: '',
        ExcessiveCb: '',
        purchoList: '',
        pFlag: '0',
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
      return dataUtils.money2dx(this.formsData4.wrbtrm)
    },
    amount4: function () {
      return this.formsData4.wrbtrm * this.formsData4.kursfm.substr(0, 6)
    },
    originalCurrency5: function () {
      return dataUtils.money2dx(this.formsData5.wrbtrh)
    },
    amount5: function () {
      return this.formsData5.wrbtrh * this.formsData5.kursfh.substr(0, 6)
    },
    originalCurrency6: function () {
      return dataUtils.money2dx(this.formsData6.wrbtrt)
    },
    amount6: function () {
      return this.formsData6.wrbtrt * this.formsData6.kursft.substr(0, 6)
    },
    originalCurrency7: function () {
      return dataUtils.money2dx(this.formsData7.wrbtre)
    },
    amount7: function () {
      return this.formsData7.wrbtre * this.formsData7.kursfe.substr(0, 6)
    },
    originalCurrency8: function () {
      return dataUtils.money2dx(this.formsData8.wrbtrg)
    },
    amount8: function () {
      return this.formsData8.wrbtrg * this.formsData8.kursfg.substr(0, 6)
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
        this.formsData4.kursfm = '1'
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
        this.formsData5.kursfh = '1'
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
        this.formsData6.kursft = '1'
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
    getTaxInfo() {
      let _that = this
      let sparams = {
        burks: this.burks
      }
      api.getTaxCodeList(sparams, function (res) {
        if (res[0].isTaxPayer) {
          _that.purchoList = res.data.taxCodeList
          _that.pFlag = '1'
        }
      })
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
        this.getTaxInfo()
      }
      if (this.checker === '4') {
        this.formsData4.kursfm = ''
        if (this.formsData4.waersm === 'CNY') {
          this.currencyFlag = '0'
          this.formsData4.kursfm = '1'
        }
        if (this.formsData4.waersm !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
        let params = {
          mtype_class: this.mtype,
          mtype: this.formsData4.stypem,
          bukrs: this.burks,
          abroadis: this.currencyFlag,
          kostl: this.kostl
        }
         let _that = this;
        if (this.protype === '通用项目') {
          api.getColdconamList(params, function (res) {
            _that.formsData4.colnrm = res[0].kstar + '-' + res[0].kstarval
          })
        }
        if (this.protype === '专项项目') {
          api.getColdconamzList(params, function (res) {
            _that.formsData4.colnrm = res[0].kstar + '-' + res[0].kstarval
          })
        }
      }
      if (this.checker === '5') {
        this.formsData5.kursfh = ''
        if (this.formsData5.waersh === 'CNY') {
          this.currencyFlag = '0'
          this.formsData5.kursfh = '1'
        }
        if (this.formsData5.waersh !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
        let params = {
          mtype_class: this.mtype,
          mtype: this.formsData5.stypeh,
          bukrs: this.burks,
          abroadis: this.currencyFlag,
          kostl: this.kostl
        }
         let _that = this;
        if (this.protype === '通用项目') {
          api.getColdconamList(params, function (res) {
            _that.formsData5.colnrh = res[0].kstar + '-' + res[0].kstarval
          })
        }
        if (this.protype === '专项项目') {
          api.getColdconamzList(params, function (res) {
            _that.formsData5.colnrh = res[0].kstar + '-' + res[0].kstarval
          })
        }
      }
      if (this.checker === '6') {
        this.formsData6.kursft = ''
        if (this.formsData6.waerst === 'CNY') {
          this.currencyFlag = '0'
          this.formsData6.kursft = '1'
        }
        if (this.formsData6.waerst !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
        let params = {
          mtype_class: this.mtype_class,
          mtype: this.formsData6.stypet,
          bukrs: this.burks,
          abroadis: this.currencyFlag,
          kostl: this.kostl
        }
         let _that = this;
        if (this.protype === '通用项目') {
          api.getColdconamList(params, function (res) {
            _that.formsData6.colnrt = res[0].kstar + '-' + res[0].kstarval
          })
        }
        if (this.protype === '专项项目') {
          api.getColdconamzList(params, function (res) {
            _that.formsData6.colnrt = res[0].kstar + '-' + res[0].kstarval
          })
        }
        this.getTaxInfo()
      }
      if (this.checker === '7') {
        this.cbFlag = '0'
        this.formsData7.kursfe = ''
        if (this.formsData7.waerse === 'CNY') {
          this.currencyFlag = '0'
          this.formsData7.kursfe = '1'
        }
        if (this.formsData7.waerse !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
        let params = {
          mtype_class: this.mtype,
          mtype: this.formsData7.mtype,
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
      if (this.checker === '8') {
        this.cbFlag = '0'
        this.formsData8.kursfg = ''
        if (this.formsData8.waersg === 'CNY') {
          this.currencyFlag = '0'
          this.formsData8.kursfg = '1'
        }
        if (this.formsData8.waersg !== 'CNY') {
          this.currencyFlag = '1'
          this.read = 'readonly'
        }
      }
    },
    // 校验金额是否超标长途交通
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
      if (this.show === '0') {
        api.getOverproofLtrad(params, function (res) {
          if (res[0] !== '') {
            _that.Excessive = res[0].ulfee
            _that.cbFlag = '1'
          }
        })
      }
    },
    // 城市交通
    changeAmountC(value) {
      let params = {
        mtype_class: this.mtype_class,
        bukrs: this.burks,
        abroadis: this.currencyFlag,
        money: value,
        postid: this.postid
      }
      let _that = this
      if (this.show === '0') {
        api.getOverproofCitytrad(params, function (res) {
          if (res[0] !== '') {
            _that.Excessive = res[0].ulfee
            _that.cbFlag = '1'
          }
        })
      }
    },
    // 住宿机餐补超额验证
    changeAmountZ(value) {
      if (this.protype === '通用项目') {
        this.protype = '0'
      } else {
        this.protype = '1'
      }
      let params = {
        mtype_class: this.mtype,
        bukrs: this.burks,
        abroadis: this.currencyFlag,
        money: value,
        postid: this.postid,
        cleval: this.formsData5.saddrh,
        toadress: this.formsData5.saddrh,
        sdateh: this.formsData5.sdateh,
        edateh: this.formsData5.edateh,
        protype: this.protype
      }
      let _that = this
      if (this.show === '0') {
        api.getMealAllwance(params, function (res) {
          _that.formsData5.mealsuph = res[0].dmbtr
          _that.formsData5.demealh = res[0].demealh
          if (res[1].ulfee > 0) {
            _that.Excessive = res[1].ulfee
            _that.cbFlag = '1'
          }
        })
      }
    },
    // 餐补超额验证
    changeAmountCE(value) {
      if (this.protype === '通用项目') {
        this.protype = '0'
      } else {
        this.protype = '1'
      }
      let params = {
        mtype_class: this.mtype,
        bukrs: this.burks,
        abroadis: this.currencyFlag,
        money: value,
        postid: this.postid,
        cleval: this.formsData5.saddrh,
        toadress: this.formsData5.saddrh,
        sdateh: this.formsData5.sdateh,
        edateh: this.formsData5.edateh,
        protype: this.protype
      }
      let _that = this
      if (this.show === '0') {
        api.getOverproofMealFee(params, function (res) {
          if (res[0].ulfee > 0) {
            _that.ExcessiveCb = res[0].ulfee
            _that.cbceFlag = '1'
          }
        })
      }
    },
    feeAmount(value) {
      let params = {
        mtype_class: this.mtype_class,
        mtype: this.mtype,
        abroadis: this.currencyFlag,
        bukrs: this.burks,
        money: value,
        postid: this.postid
      }
      alert(JSON.stringify(params))
     // let _that = this
      api.getOverproofTelnet(params, function (res) {
        alert(JSON.stringify(res[0]))
        if (res[0] !== '') {}
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
          whole.showTop('请选择币种')
          return;
        }
        /* if (this.formsData1.dmbtr === '') {
          whole.showTop('请填写总金额')
          return;
        } */
        let ltrad = {
          type: '1',
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
        console.log(ltrad)
        this.$store.dispatch('addPersonReim', ltrad)
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
        let citytrad = {
          type: '2',
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
        this.$store.dispatch('addPersonReim', citytrad)
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
        let officecost = {
          type: '3',
          stypeo: this.formsData3.stypeo,
          sdateo: this.formsData3.sdateo,
          purcho: this.formsData3.purcho,
          waerso: this.formsData3.waerso,
          wrbtro: this.formsData3.wrbtro,
          kursfo: this.formsData3.kursfo,
          conamo: this.formsData3.conamo,
          smemoo: this.formsData3.smemoo,
          // dmbtr: this.amount,
          uuid: this.formsData3.uuid
        }
        console.log(officecost)
        this.$store.dispatch('addPersonReim', officecost)
        console.log('保存')
        this.$router.go(-1)
      }
      if (this.checker === '4') {
        if (this.formsData4.stypem === '') {
          whole.showTop('请选择餐费类型')
          return;
        }
        if (this.formsData4.sdatem.length === 0) {
          whole.showTop('请选择日期')
          return;
        }

        if (this.formsData4.waersm !== 'CNY') {
          if (this.formsData4.wrbtrm === '') {
            whole.showTop('请选填写原币金额')
            return;
          }
          if (this.formsData4.kursfm === '') {
            whole.showTop('请选填写汇率')
            return;
          }
        }
        if (this.formsData4.waersm === '') {
          whole.showTop('请选择币种')
          return;
        }
        /* if (this.formsData1.dmbtr === '') {
         whole.showTop('请填写总金额')
         return;
         } */
        let mealfee = {
          type: '4',
          stypem: this.formsData4.stypem,
          sdatem: this.formsData4.sdatem,
          waersm: this.formsData4.waersm,
          wrbtrm: this.formsData4.wrbtrm,
          kursfm: this.formsData4.kursfm,
          conamm: this.formsData4.conamm,
          smemom: this.formsData4.smemom,
          // dmbtr: this.amount,
          uuid: this.formsData4.uuid
        }
        console.log(mealfee)
        this.$store.dispatch('addPersonReim', mealfee)
        console.log('保存')
        this.$router.go(-1)
      }
      if (this.checker === '5') {
        if (this.formsData5.stypeh === '') {
          whole.showTop('请选择住宿类型')
          return;
        }
        if (this.formsData5.sdateh.length === 0) {
          whole.showTop('请选择日期')
          return;
        }
        if (this.formsData5.edateh.length === 0) {
          whole.showTop('请选择到达日期')
          return;
        } else {
          if (moment(this.formsData5.sdateh).isBefore(this.formsData5.edateh)) {
            whole.showTop('到达日期不能小于结束日期')
            return;
          }
        }

        if (this.formsData5.waersh !== 'CNY') {
          if (this.formsData5.wrbtrh === '') {
            whole.showTop('请选填写原币金额')
            return;
          }
          if (this.formsData5.kursfh === '') {
            whole.showTop('请选填写汇率')
            return;
          }
        }
        if (this.formsData5.waersh === '') {
          whole.showTop('请选择币种')
          return;
        }
        /* if (this.formsData1.dmbtr === '') {
         whole.showTop('请填写总金额')
         return;
         } */
        let hotelexpense = {
          type: '5',
          stypeh: this.formsData5.stypeh,
          sdateh: this.formsData5.sdateh,
          edateh: this.formsData5.edateh,
          saddrh: this.formsData5.saddrh,
          waersh: this.formsData5.waersh,
          wrbtrh: this.formsData5.wrbtrh,
          kursfh: this.formsData5.kursfh,
          colnrh: this.formsData5.colnrh,
          smemoh: this.formsData5.smemoh,
          ulreah: this.formsData5.ulreah,
          // dmbtr: this.amount,
          uuid: this.formsData5.uuid
        }
        console.log(hotelexpense)
        this.$store.dispatch('addPersonReim', hotelexpense)
        console.log('保存')
        this.$router.go(-1)
      }
      if (this.checker === '6') {
        if (this.formsData6.stypet === '') {
          whole.showTop('请选择培训类型')
          return;
        }
        if (this.formsData6.traint === '') {
          whole.showTop('请选填写书籍／课程名称')
          return;
        }
        if (this.formsData6.waerst !== 'CNY') {
          if (this.formsData6.wrbtrt === '') {
            whole.showTop('请选填写原币金额')
            return;
          }
          if (this.formsData6.kursft === '') {
            whole.showTop('请选填写汇率')
            return;
          }
        }
        if (this.formsData6.waerst === '') {
          whole.showTop('请选择币种')
          return;
        }
        /* if (this.formsData1.dmbtr === '') {
         whole.showTop('请填写总金额')
         return;
         } */
        let train = {
          type: '6',
          stypet: this.formsData6.stypet,
          traint: this.formsData6.traint,
          waerst: this.formsData6.waerst,
          wrbtrt: this.formsData6.wrbtrt,
          kursft: this.formsData6.kursft,
          purcht: this.formsData6.purcht,
          colnrt: this.formsData6.colnrt,
          tnlnrt: this.formsData6.tnlnrt,
          smemot: this.formsData6.smemot,
          // dmbtr: this.amount,
          uuid: this.formsData6.uuid
        }
        console.log(train)
        this.$store.dispatch('addPersonReim', train)
        console.log('保存')
        this.$router.go(-1)
      }
      if (this.checker === '7') {
        if (this.formsData7.stypee === '') {
          whole.showTop('请选择通讯类型')
          return;
        }
        if (this.formsData7.sdatee === '') {
          whole.showTop('请选择月份')
          return;
        }
        if (this.formsData7.waerse !== 'CNY') {
          if (this.formsData7.wrbtre === '') {
            whole.showTop('请选填写原币金额')
            return;
          }
          if (this.formsData7.kursfe === '') {
            whole.showTop('请选填写汇率')
            return;
          }
        }
        alert(JSON.stringify(this.checker))
        let formsData = {
          stypee: this.formsData7.stypee,
          sdatee: this.formsData7.sdatee,
          waerse: this.formsData7.waerse,
          wrbtre: this.formsData7.wrbtre,
          kursfe: this.formsData7.kursfe,
          colnre: this.formsData7.colnre,
          uuid: this.formsData7.uuid
        }
        console.log(formsData)
        alert(JSON.stringify(formsData))
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
        this.$router.go(-1)
      }
      if (this.checker === '8') {
        if (this.formsData8.stypeg === '') {
          whole.showTop('请选择礼品费用类型')
          return;
        }
        if (this.formsData8.sdateg.length === 0) {
          whole.showTop('请选择日期')
          return;
        }

        if (this.formsData8.waersg !== 'CNY') {
          if (this.formsData8.wrbtrg === '') {
            whole.showTop('请选填写原币金额')
            return;
          }
          if (this.formsData8.kursfg === '') {
            whole.showTop('请选填写汇率')
            return;
          }
        }
        if (this.formsData8.waersg === '') {
          whole.showTop('请选择币种')
          return;
        }
        if (this.formsData8.ulreag === '') {
          whole.showTop('请填写事由')
          return;
        }
        alert(JSON.stringify(this.checker))
        let formsData = {
          stypeg: this.formsData8.stypeg,
          sdateg: this.formsData8.sdateg,
          waersg: this.formsData8.waersg,
          wrbtrg: this.formsData8.wrbtrg,
          kursfg: this.formsData8.kursfg,
          dmbtrg: this.formsData8.dmbtrg,
          colnrg: this.formsData8.colnrg,
          ulreag: this.formsData8.ulreag,
          smemg: this.formsData8.smemg,
          uuid: this.formsData8.uuid
        }
        console.log(formsData)
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
        this.$router.go(-1)
      }
      if (this.checker === '9') {
        if (this.formsData9.electronicnum === '') {
          whole.showTop('请填写电子发票号')
          return;
        }
        if (this.formsData9.linkv === '') {
          whole.showTop('请填写链接')
          return;
        }
        alert(JSON.stringify(this.checker))
        let formsData = {
          electronicnum: this.formsData9.electronicnum,
          linkv: this.formsData9.linkv,
          uuid: this.formsData9.uuid
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
