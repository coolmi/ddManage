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
        <v-search title="交通类型" :cdata="trafficTypeList" v-model="formsData1.mtype" @on-hide="getitemnoInfo()"></v-search>
        <datetime v-model="formsData1.sdate" :start-date="systemDate" title="出发日期"></datetime>
        <datetime v-model="formsData1.edate" :start-date="systemDate" title="到达日期"></datetime>
        <v-search title="出发地" :cdata="tripPlace" :columns="1" v-model="formsData1.saddr" show-name></v-search>
        <v-search title="到达地" :cdata="tripPlace" :columns="1" v-model="formsData1.eaddr" show-name></v-search>
        <v-search title="币种" :cdata="currencyList" v-model="formsData1.waers" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" type="number" v-model="formsData1.wrbtr"></x-input>
        <cell v-show="originalCurrency1" v-if="currencyFlag === '1'">{{originalCurrency1}}</cell>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData1.kursf"></x-input>
        <x-input title="金额"  v-if="currencyFlag === '1'" readonly v-model="amount" ></x-input>
        <x-input title="金额" v-if="currencyFlag === '0'" type="number" v-model="formsData1.dmbtr" @on-blur="changeAmount"></x-input>
        <cell v-if="cbFlag === '1'"><font color="#FF0000">超额{{ulfee}}</font></cell>
        <v-search title="项目号" :cdata="colnrList" v-model="formsData1.colnr"></v-search>
        <x-input title="超标事由" v-if="cbFlag === '1'" v-model="formsData1.ulrea"></x-input>
        <x-textarea title="说明"  v-model="formsData1.smemoltrad"></x-textarea>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData1.uuid"></x-input>
      </group>
      <group v-if="checker === '2'" :title="typeObj[checker]">
        <div>
          <v-search title="交通方式" :cdata="trafficWaysList" v-model="formsData2.stypec"></v-search>
          <v-search title="交通类型" :cdata="trafficTypeList" v-model="formsData2.mtypec" @on-hide="getitemnoInfo()"></v-search>
          <datetime v-model="formsData2.sdatec" :start-date="systemDate" title="出发日期"></datetime>
          <v-search title="出发地" :cdata="tripPlace" :columns="1" v-model="formsData2.saddrc" show-name></v-search>
          <v-search title="到达地" :cdata="tripPlace" :columns="1" v-model="formsData2.eaddrc" show-name></v-search>
          <v-search title="币种" :cdata="currencyList" v-model="formsData2.waersc" @on-hide="getProtypeInfo"></v-search>
          <x-input title="原币金额" v-if="currencyFlag === '1'" type="number" v-model="formsData2.wrbtrc"></x-input>
          <cell v-show="originalCurrency2" v-if="currencyFlag === '1'">{{originalCurrency2}}</cell>
          <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData2.kursfc"></x-input>
          <x-input title="金额"  v-if="currencyFlag === '1'" readonly v-model="amount2" @on-blur="changeAmountC"></x-input>
          <x-input title="金额" v-if="currencyFlag === '0'" type="number" v-model="formsData2.dmbtrc" @on-blur="changeAmountC"></x-input>
          <cell v-if="cbFlag === '1'"><font color="#FF0000">超额{{ulfeec}}</font></cell>
          <v-search title="项目号" :cdata="colnrList" v-model="formsData2.colnrc"></v-search>
          <x-input title="超标事由" v-if="cbFlag === '1'"  v-model="formsData2.ulreac"></x-input>
          <x-textarea title="说明"  v-model="formsData2.smemoc"></x-textarea>
          <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData2.uuid"></x-input>
        </div>
      </group>
      <group v-if="checker === '3'" :title="typeObj[checker]">
        <v-search title="办公费用类型" :cdata="OffTypeList" v-model="formsData3.stypeo" @on-hide="getitemnoInfo()"></v-search>
        <datetime v-model="formsData3.sdateo" :start-date="systemDate" title="日期"></datetime>
        <v-search title="币种" :cdata="currencyList" v-model="formsData3.waerso" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" type="number" v-model="formsData3.wrbtro"></x-input>
        <cell v-show="originalCurrency3">{{originalCurrency3}}</cell>
        <x-input title="汇率"  v-if="currencyFlag === '1'" type="number" v-model="formsData3.kursfo"></x-input>
        <x-input title="总金额"  v-if="currencyFlag === '1'" readonly v-model="amount3" ></x-input>
        <x-input title="总金额" v-if="currencyFlag === '0'" type="number" v-model="formsData3.dmbtro"></x-input>
        <v-search title="税码" v-if="pFlag === '1' && currencyFlag === '0'" :cdata="purchoList" v-model="formsData3.purcho" ></v-search>
        <v-search title="项目号" :cdata="colnrList" v-model="formsData3.colnro"></v-search>
        <x-textarea title="事由" v-model="formsData3.smemoo"></x-textarea>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData3.uuid"></x-input>
      </group>
      <group v-if="checker === '4'" :title="typeObj[checker]">
        <v-search title="餐费类型" :cdata="mealsList" v-model="formsData4.stypem" @on-hide="getitemnoInfo()"></v-search>
        <datetime v-model="formsData4.sdatem" :start-date="systemDate" title="日期"></datetime>
        <v-search title="币种" :cdata="currencyList" v-model="formsData4.waersm" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" type="number" v-model="formsData4.wrbtrm"></x-input>
        <cell v-show="originalCurrency4">{{originalCurrency4}}</cell>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData4.kursfm"></x-input>
        <x-input title="总金额"  v-if="currencyFlag === '1'" readonly v-model="amount4" ></x-input>
        <x-input title="总金额" v-if="currencyFlag === '0'" type="number" v-model="formsData4.dmbtrm"></x-input>
        <v-search title="项目号" :cdata="colnrList" v-model="formsData4.colnrm"></v-search>
        <!--<x-input title="项目号" readonly v-model="formsData4.colnrm"></x-input>-->
        <x-textarea title="用餐原因" v-model="formsData4.smemom"></x-textarea>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData4.uuid"></x-input>
      </group>
      <group v-if="checker === '5'" :title="typeObj[checker]">
        <v-search title="住宿类型" :cdata="zslxList" v-model="formsData5.stypeh" @on-hide="getitemnoInfo()"></v-search>
        <v-search title="酒店地点" :cdata="tripPlace" v-model="formsData5.saddrh"></v-search>
        <datetime v-model="formsData5.sdateh" :start-date="systemDate" title="入住日期"></datetime>
        <datetime v-model="formsData5.edateh" :start-date="systemDate" title="退房日期"></datetime>
        <v-search title="币种" :cdata="currencyList" v-model="formsData5.waersh" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" placeholder="请填写原币金额" :max=9 v-model="formsData5.wrbtrh"></x-input>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData5.kursfh"></x-input>
        <v-search title="税码" v-if="pFlag === '1' && currencyFlag === '0'" :cdata="purchoList" v-model="formsData5.purchh" ></v-search>
        <x-input title="总金额"  v-if="currencyFlag === '1'" readonly v-model="amount5" ></x-input>
        <x-input title="总金额" v-if="currencyFlag === '0'" type="number" v-model="formsData5.dmbtrh"  @on-blur="changeAmountZ"></x-input>
        <cell v-if="cbFlag === '1'"><font color="#FF0000">超额{{ulfeeh}}</font></cell>
        <v-search title="项目号" :cdata="colnrList" v-model="formsData5.colnrh"></v-search>
        <x-input title="餐补"  v-model="formsData5.mealsuph" @on-blur="changeAmountCE"></x-input>
        <cell v-if="cbceFlag === '1'"><font color="#FF0000">超额{{ExcessiveCb}}</font></cell>
        <x-input title="扣除餐补"  v-if="currencyFlag === '0'" readonly v-model="formsData5.demealh"></x-input>
        <x-textarea title="住宿原因" v-model="formsData5.smemoh"></x-textarea>
        <x-textarea title="超额原因" v-if="cbFlag === '1'" v-model="formsData5.ulreah"></x-textarea>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData5.uuid"></x-input>
      </group>
      <group v-if="checker === '6'" :title="typeObj[checker]">
        <v-search title="培训类型" :cdata="pxlxList" v-model="formsData6.stypet" @on-hide="getitemnoInfo()"></v-search>
        <x-input title="书籍/课程名称"  v-model="formsData6.traint"></x-input>
        <v-search title="币种" :cdata="currencyList" v-model="formsData6.waerst" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" placeholder="请填写原币金额" :max=9 v-model="formsData6.wrbtrt"></x-input>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData6.kursft"></x-input>
        <x-input title="金额"  v-if="currencyFlag === '1'" readonly v-model="amount6" ></x-input>
        <x-input title="金额" v-if="currencyFlag === '0'" type="number" v-model="formsData6.dmbtrt"></x-input>
        <v-search title="税码" v-if="pFlag === '1' && currencyFlag === '0'" :cdata="purchoList" v-model="formsData6.purcht" ></v-search>
        <v-search title="项目号" :cdata="colnrList" v-model="formsData6.colnrt"></v-search>
        <x-input title="培训申请单号"  v-model="formsData6.tnlnrt"></x-input>
        <x-textarea title="培训说明" v-model="formsData6.smemot"></x-textarea>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData6.uuid"></x-input>
      </group>
      <group v-if="checker === '7'" :title="typeObj[checker]">
        <v-search title="通讯类型" :cdata="txlxList" v-model="formsData7.stypee" @on-hide="getitemnoInfo()"></v-search>
        <v-search title="月份" :cdata="yfList" v-model="formsData7.sdatee"></v-search>
        <v-search title="币种" :cdata="currencyList" v-model="formsData7.waerse" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" placeholder="请填写原币金额" :max=9 v-model="formsData7.wrbtre"></x-input>
        <cell v-show="originalCurrency7" v-if="currencyFlag === '1'">{{originalCurrency7}}</cell>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData7.kursfe"></x-input>
        <x-input title="总金额"  v-if="currencyFlag === '1'" readonly v-model="amount7" ></x-input>
        <x-input title="总金额" v-if="currencyFlag === '0'" type="number" v-model="formsData7.dmbtre" @on-blur="feeAmount"></x-input>
        <cell v-if="cbFlag === '1'"><font color="#FF0000">超额{{ulfeee}}</font></cell>
        <v-search title="项目号" :cdata="colnrList" v-model="formsData7.colnre"></v-search>
        <x-input title="隐藏" placeholder="隐藏" v-show="false" v-model="formsData7.uuid"></x-input>
      </group>
      <group v-if="checker === '8'" :title="typeObj[checker]">
        <v-search title="礼品费类型" :cdata="lplxList" v-model="formsData8.stypeg" @on-hide="getitemnoInfo()"></v-search>
        <datetime v-model="formsData8.sdateg" :start-date="systemDate" title="发生日期"></datetime>
        <v-search title="币种" :cdata="currencyList" v-model="formsData8.waersg" @on-hide="getProtypeInfo"></v-search>
        <x-input title="原币金额" v-if="currencyFlag === '1'" placeholder="请填写原币金额" :max=9 v-model="formsData8.wrbtrg"></x-input>
        <cell v-show="originalCurrency8" v-if="currencyFlag === '1'">{{originalCurrency8}}</cell>
        <x-input title="汇率" v-if="currencyFlag === '1'" type="number" v-model="formsData8.kursfg"></x-input>
        <x-input title="总金额"  v-if="currencyFlag === '1'" readonly v-model="amount8" ></x-input>
        <x-input title="总金额" v-if="currencyFlag === '0'" type="number" v-model="formsData8.dmbtrg"></x-input>
        <v-search title="项目号" :cdata="colnrList" v-model="formsData8.colnrg"></v-search>
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
     <!-- <flexbox-item class="vux-1px-r" @click.native="saveReserve(0)" style="color:#00B705">继续添加</flexbox-item>-->
      <flexbox-item @click.native="saveReserve(1)" style="color:#FF8519">保存</flexbox-item>
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
        formsData: {},
        formsData1: {
          stype: '',
          mtype: '',
          sdate: moment().format('YYYY-MM-DD'),
          edate: moment().format('YYYY-MM-DD'),
          saddr: '',
          eaddr: '',
          waers: 'CNY',
          wrbtr: '',
          kursf: '',
          colnr: '',
          travel: '',
          ulrea: '',
          smemoltrad: '',
          childcolnr: '',
          childconam: '',
          conam: '',
          kstar: '',
          kstarval: '',
          dmbtr: '',
          uuid: ''
        },
        formsData2: {
          stypec: '',
          mtypec: '',
          sdatec: moment().format('YYYY-MM-DD'),
          saddrc: '',
          eaddrc: '',
          waersc: 'CNY',
          wrbtrc: '',
          kursfc: '',
          colnrc: '',
          childcolnrc: '',
          childconamc: '',
          conamc: '',
          kstarc: '',
          travelc: '',
          ulreac: '',
          smemoc: '',
          dmbtrc: '',
          uuid: ''
        },
        formsData3: {
          stypeo: '',
          sdateo: moment().format('YYYY-MM-DD'),
          wrbtro: '',
          kursfo: '',
          waerso: 'CNY',
          colnro: '',
          purcho: '',
          smemoo: '',
          dmbtro: '',
          childcolnro: '',
          conamo: '',
          childconamo: '',
          kstaro: '',
          uuid: ''
        },
        formsData4: {
          stypem: '',
          colnrm: '',
          sdatem: moment().format('YYYY-MM-DD'),
          waersm: 'CNY',
          wrbtrm: '',
          kursfm: '',
          smemom: '',
          dmbtrm: '',
          childcolnrm: '',
          childconamm: '',
          conamm: '',
          kstarm: '',
          uuid: ''
        },
        formsData5: {
          stypeh: '',
          itemNo: '',
          sdateh: moment().format('YYYY-MM-DD'),
          edateh: moment().format('YYYY-MM-DD'),
          saddrh: '',
          waersh: 'CNY',
          purchh: '',
          wrbtrh: '',
          kursfh: '',
          colnrh: '',
          childcolnrh: '',
          childconamh: '',
          conamh: '',
          kstarh: '',
          mealsuph: '',
          demealh: '',
          smemoh: '',
          ulreah: '',
          dmbtrh: '',
          uuid: ''
        },
        subsidyh: '',
        formsData6: {
          stypet: '',
          traint: '',
          waerst: 'CNY',
          wrbtrt: '',
          kursft: '',
          purcht: '',
          colnrt: '',
          tnlnrt: '',
          childcolnrt: '',
          childconamt: '',
          conamt: '',
          kstart: '',
          smemot: '',
          dmbtrt: '',
          uuid: ''
        },
        formsData7: {
          stypee: '',
          sdatee: moment().format('YYYY-MM-DD'),
          waerse: 'CNY',
          wrbtre: '',
          kursfe: '',
          colnre: '',
          childcolnre: '',
          childconame: '',
          coname: '',
          kstare: '',
          dmbtre: '',
          uuid: ''
        },
        formsData8: {
          stypeg: '',
          sdateg: moment().format('YYYY-MM-DD'),
          waersg: 'CNY',
          wrbtrg: '',
          kursfg: '',
          dmbtrg: '',
          colnrg: '',
          childcolnrg: '',
          childconamg: '',
          conamg: '',
          kstarg: '',
          smemg: '',
          uuid: '',
          ulreag: ''
        },
        formsData9: {
          linkv: '',
          electronicnum: '',
          uuid: ''
        },
        colnrList: [],
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
        flag: '0',
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
        aufnr: '',
        ulfee: 0,
        ulfeec: 0,
        ulfeeh: 0,
        ulfeee: 0,
        ExcessiveCb: '',
        purchoList: [],
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
      if (this.currencyFlag === '0') {
        this.formsData1.wrbtr = this.formsData1.dmbtr
        this.formsData1.kursf = '1'
      }
      return this.formsData1.wrbtr * this.formsData1.kursf.substr(0, 6)
    },
    originalCurrency2: function () {
      return dataUtils.money2dx(this.formsData2.wrbtrc)
    },
    amount2: function () {
      if (this.currencyFlag === '0') {
        this.formsData2.wrbtc = this.formsData2.dmbtrc
        this.formsData2.kursfc = '1'
      }
      return this.formsData2.wrbtrc * this.formsData2.kursfc.substr(0, 6)
    },
    originalCurrency3: function () {
      return dataUtils.money2dx(this.formsData3.wrbtro)
    },
    amount3: function () {
      if (this.currencyFlag === '0') {
        this.formsData3.wrbtro = this.formsData3.dmbtro
        this.formsData3.kursfo = '1'
      }
      return this.formsData3.wrbtro * this.formsData3.kursfo.substr(0, 6)
    },
    originalCurrency4: function () {
      return dataUtils.money2dx(this.formsData4.wrbtrm)
    },
    amount4: function () {
      if (this.currencyFlag === '0') {
        this.formsData4.wrbtrm = this.formsData4.dmbtrm
        this.formsData4.kursfm = '1'
      }
      return this.formsData4.wrbtrm * this.formsData4.kursfm.substr(0, 6)
    },
    originalCurrency5: function () {
      return dataUtils.money2dx(this.formsData5.wrbtrh)
    },
    amount5: function () {
      if (this.currencyFlag === '0') {
        this.formsData5.wrbtrh = this.formsData5.dmbtrh
        this.formsData5.kursfh = '1'
      }
      return this.formsData5.wrbtrh * this.formsData5.kursfh.substr(0, 6)
    },
    originalCurrency6: function () {
      return dataUtils.money2dx(this.formsData6.wrbtrt)
    },
    amount6: function () {
      if (this.currencyFlag === '0') {
        this.formsData6.wrbtrt = this.formsData6.dmbtrt
        this.formsData6.kursft = '1'
      }
      return this.formsData6.wrbtrt * this.formsData6.kursft.substr(0, 6)
    },
    originalCurrency7: function () {
      return dataUtils.money2dx(this.formsData7.wrbtre)
    },
    amount7: function () {
      if (this.currencyFlag === '0') {
        this.formsData7.wrbtre = this.formsData7.dmbtre
        this.formsData7.kursfe = '1'
      }
      return this.formsData7.wrbtre * this.formsData7.kursfe.substr(0, 6)
    },
    originalCurrency8: function () {
      return dataUtils.money2dx(this.formsData8.wrbtrg)
    },
    amount8: function () {
      if (this.currencyFlag === '0') {
        this.formsData8.wrbtrg = this.formsData8.dmbtrg
        this.formsData8.kursfg = '1'
      }
      return this.formsData8.wrbtrg * this.formsData8.kursfg.substr(0, 6)
    }
  },
  watch: {
    checker: function (val) {
      this.getBaseData()
    }
  },
  created() {
    let _that = this
    let mtypeClass = ''
    let mtype = ''
    let formsData = this.$route.query.formsData.formsData
    this.show = this.$route.query.formsData.forms.rbstype
    this.burks = this.$route.query.formsData.forms.burks
    this.rspType = this.$route.query.formsData.forms.rbstype
    this.kostl = this.$route.query.formsData.forms.kostl
    this.protype = this.$route.query.formsData.forms.protype
    this.postid = this.$route.query.formsData.forms.postid
    this.aufnr = this.$route.query.formsData.forms.aufnr
    if (JSON.stringify(formsData) !== '"{}"') {
        _that.formsData = JSON.parse(formsData)
      if (_that.formsData.type === '长途交通') {
        _that.formsData1 = _that.formsData
        _that.checker = '1'
      }
      if (_that.formsData.type === '市内交通') {
        _that.formsData2 = _that.formsData
        _that.checker = '2'
      }
      if (_that.formsData.type === '办公费用') {
        _that.formsData3 = _that.formsData
        _that.checker = '3'
      }
      if (_that.formsData.type === '餐费') {
        _that.formsData4 = _that.formsData
        _that.checker = '4'
      }
      if (_that.formsData.type === '住宿及餐补') {
        _that.formsData5 = _that.formsData
        _that.checker = '5'
      }
      if (_that.formsData.type === '培训费') {
        _that.formsData6 = _that.formsData
        _that.checker = '6'
      }
      if (_that.formsData.type === '通讯费') {
        _that.formsData7 = _that.formsData
        _that.checker = '7'
      }
      if (_that.formsData.type === '礼品费') {
        _that.formsData8 = _that.formsData
        _that.checker = '8'
      }
      if (_that.formsData.type === '电子发票') {
        _that.formsData9 = _that.formsData
        _that.checker = '9'
      }
      if (this.checker === '1') {
        mtypeClass = this.mtype
        mtype = this.formsData1.mtype
      }
      if (this.checker === '2') {
        mtypeClass = this.mtype
        mtype = this.formsData2.mtypec
      }
      if (this.checker === '3') {
        mtypeClass = this.mtype_class
        mtype = this.formsData3.stypeo
      }
      if (this.checker === '4') {
        mtypeClass = this.mtype
        mtype = this.formsData4.stypem
      }
      if (this.checker === '5') {
        mtypeClass = this.mtype
        mtype = this.formsData5.stypeh
      }
      if (this.checker === '6') {
        mtypeClass = this.mtype_class
        mtype = this.formsData6.stypet
      }
      if (this.checker === '7') {
        mtypeClass = this.mtype_class
        mtype = this.formsData7.stypee
      }
      if (this.checker === '8') {
        mtypeClass = this.mtype_class
        mtype = this.formsData8.stypeg
      }
      let params = {
        mtype_class: mtypeClass,
        mtype: mtype,
        bukrs: this.burks,
        abroadis: this.currencyFlag,
        kostl: this.kostl,
        postid: this.postid
      }
      if (this.protype === '通用项目') {
        api.getColdconamList(params, function (res) {
            if (_that.checker === '1') {
              if (res[0].childcolnr) {
                _that.formsData1.childcolnr = res[0].childcolnr
                _that.formsData1.childconam = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData1.kstar = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
            if (_that.checker === '2') {
              if (res[0].childcolnr) {
                _that.formsData2.childcolnrc = res[0].childcolnr
                _that.formsData2.childconamc = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData2.kstarc = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
            if (_that.checker === '3') {
              if (res[0].childcolnr) {
                _that.formsData3.childcolnro = res[0].childcolnr
                _that.formsData3.childconamo = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData3.kstaro = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
            if (_that.checker === '4') {
              _that.colnrList = res[0].colnrList
              if (res[0].childcolnr) {
                _that.formsData4.childcolnrm = res[0].childcolnr
                _that.formsData4.childconamm = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData4.kstarm = res[0].kstar
              }
            }
            if (_that.checker === '5') {
              if (res[0].childcolnr) {
                _that.formsData5.childcolnrh = res[0].childcolnr
                _that.formsData5.childconamh = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData5.kstarh = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
            if (_that.checker === '6') {
              if (res[0].childcolnr) {
                _that.formsData6.childcolnrt = res[0].childcolnr
                _that.formsData6.childconamt = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData6.kstart = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
            if (_that.checker === '7') {
              if (res[0].childcolnr) {
                _that.formsData7.childcolnre = res[0].childcolnr
                _that.formsData7.childconame = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData7.kstare = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
            if (_that.checker === '8') {
              if (res[0].childcolnr) {
                _that.formsData8.childcolnrg = res[0].childcolnr
                _that.formsData8.childconamg = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData8.kstarg = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
        })
      }
      if (this.protype === '专项项目') {
        api.getColdconamzList(params, function (res) {
            if (_that.checker === '1') {
              if (res[0].childcolnr) {
                _that.formsData1.childcolnr = res[0].childcolnr
                _that.formsData1.childconam = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData1.kstar = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
            if (_that.checker === '2') {
              if (res[0].childcolnr) {
                _that.formsData2.childcolnrc = res[0].childcolnr
                _that.formsData2.childconamc = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData2.kstarc = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
            if (_that.checker === '3') {
              if (res[0].childcolnr) {
                _that.formsData3.childcolnro = res[0].childcolnr
                _that.formsData3.childconamo = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData3.kstaro = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
            if (_that.checker === '4') {
              _that.colnrList = res[0].colnrList
              if (res[0].childcolnr) {
                _that.formsData4.childcolnrm = res[0].childcolnr
                _that.formsData4.childconamm = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData4.kstarm = res[0].kstar
              }
            }
            if (_that.checker === '5') {
              if (res[0].childcolnr) {
                _that.formsData5.childcolnrh = res[0].childcolnr
                _that.formsData5.childconamh = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData5.kstarh = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
            if (_that.checker === '6') {
              if (res[0].childcolnr) {
                _that.formsData6.childcolnrt = res[0].childcolnr
                _that.formsData6.childconamt = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData6.kstart = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
            if (_that.checker === '7') {
              if (res[0].childcolnr) {
                _that.formsData7.childcolnre = res[0].childcolnr
                _that.formsData7.childconame = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData7.kstare = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
            if (_that.checker === '8') {
              if (res[0].childcolnr) {
                _that.formsData8.childcolnrg = res[0].childcolnr
                _that.formsData8.childconamg = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData8.kstarg = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
            }
        })
      }
    }
    this.getBaseData()
  },
  methods: {
    getBaseData() {
      if (this.checker === '1') {
        if (this.formsData1.waers !== '') {
          if (this.formsData1.waers === 'CNY') {
            this.currencyFlag = '0'
            this.formsData1.kursf = '1'
            this.getProtypeInfo()
          } else {
            this.currencyFlag = '1'
          }
        } else {
          this.currencyFlag = '0'
          this.cbFlag = '0'
        }
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
        if (this.formsData2.waersc !== '') {
          if (this.formsData2.waersc === 'CNY') {
            this.currencyFlag = '0'
            this.formsData2.kursfc = '1'
            this.getProtypeInfo()
          } else {
            this.currencyFlag = '1'
          }
        } else {
          this.currencyFlag = '0'
          this.cbFlag = '0'
        }
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
        if (this.formsData3.waerso !== '') {
          if (this.formsData3.waerso === 'CNY') {
            this.currencyFlag = '0'
            this.formsData3.kursfo = '1'
            this.getProtypeInfo()
           // this.pFlag = '1'
          } else {
            this.currencyFlag = '1'
          }
        } else {
          this.currencyFlag = '0'
          this.cbFlag = '0'
        }
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
        if (this.formsData4.waersm !== '') {
          if (this.formsData4.waersm === 'CNY') {
            this.currencyFlag = '0'
            this.formsData4.kursfm = '1'
            this.getProtypeInfo()
          } else {
            this.currencyFlag = '1'
          }
        } else {
          this.currencyFlag = '0'
          this.cbFlag = '0'
        }
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
        if (this.formsData5.waersh !== '') {
          if (this.formsData5.waersh === 'CNY') {
            this.currencyFlag = '0'
            this.formsData5.kursfh = '1'
            this.getProtypeInfo()
          } else {
            this.currencyFlag = '1'
          }
        } else {
          this.currencyFlag = '0'
          this.cbFlag = '0'
        }
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
        if (this.formsData6.waerst !== '') {
          if (this.formsData6.waerst === 'CNY') {
            this.currencyFlag = '0'
            this.formsData6.kursft = '1'
            this.getProtypeInfo()
          } else {
            this.currencyFlag = '1'
          }
        } else {
          this.currencyFlag = '0'
          this.cbFlag = '0'
        }
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
        if (this.formsData7.waerse !== '') {
          if (this.formsData7.waerse === 'CNY') {
            this.currencyFlag = '0'
            this.formsData7.kursfe = '1'
            this.getProtypeInfo()
          } else {
            this.currencyFlag = '1'
          }
        } else {
          this.currencyFlag = '0'
          this.cbFlag = '0'
        }
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
        if (this.formsData8.waersg !== '') {
          if (this.formsData8.waersg === 'CNY') {
            this.currencyFlag = '0'
            this.formsData8.kursfg = '1'
            this.getProtypeInfo()
          } else {
            this.currencyFlag = '1'
          }
        } else {
          this.currencyFlag = '0'
          this.cbFlag = '0'
        }
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
  /*  getTaxInfo() {
      let _that = this
      let sparams = {
        burks: this.burks
      }
      api.getTaxCodeList(sparams, function (res) {
        alert(JSON.stringify(res))
        if (res[0].isTaxPayer) {
          _that.purchoList = res.data.taxCodeList
          _that.pFlag = '1'
        }
      })
    }, */
    // 获取项目号
    getitemnoInfo() {
      let mtypeClass = ''
      let mtype = ''
      if (this.checker === '1') {
        mtypeClass = this.mtype
        mtype = this.formsData1.mtype
      }
      if (this.checker === '2') {
        mtypeClass = this.mtype
        mtype = this.formsData2.mtypec
      }
      if (this.checker === '3') {
        mtypeClass = this.mtype_class
        mtype = this.formsData3.stypeo
      }
      if (this.checker === '4') {
        mtypeClass = this.mtype
        mtype = this.formsData4.stypem
      }
      if (this.checker === '5') {
        mtypeClass = this.mtype
        mtype = this.formsData5.stypeh
      }
      if (this.checker === '6') {
        mtypeClass = this.mtype_class
        mtype = this.formsData6.stypet
      }
      if (this.checker === '7') {
        mtypeClass = this.mtype_class
        mtype = this.formsData7.stypee
      }
      if (this.checker === '8') {
        mtypeClass = this.mtype_class
        mtype = this.formsData8.stypeg
      }
      let params = {
        mtype_class: mtypeClass,
        mtype: mtype,
        bukrs: this.burks,
        abroadis: this.currencyFlag,
        kostl: this.kostl,
        postid: this.postid
      }
      let _that = this;
      if (this.protype === '通用项目') {
        api.getColdconamList(params, function (res) {
          if (res[0].kstar) {
            if (_that.checker === '1') {
              if (res[0].childcolnr) {
                _that.formsData1.childcolnr = res[0].childcolnr
                _that.formsData1.childconam = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData1.kstar = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData1.colnr = _that.colnrList[0].key
              }
            }
            if (_that.checker === '2') {
              if (res[0].childcolnr) {
                _that.formsData2.childcolnrc = res[0].childcolnr
                _that.formsData2.childconamc = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData2.kstarc = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData2.colnrc = _that.colnrList[0].key
              }
            }
            if (_that.checker === '3') {
              if (res[0].childcolnr) {
                _that.formsData3.childcolnro = res[0].childcolnr
                _that.formsData3.childconamo = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData3.kstaro = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData3.colnro = _that.colnrList[0].key
              }
            }
            if (_that.checker === '4') {
              _that.colnrList = res[0].colnrList
              if (res[0].childcolnr) {
                _that.formsData4.childcolnrm = res[0].childcolnr
                _that.formsData4.childconamm = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData4.kstarm = res[0].kstar
              }
              if (_that.colnrList.length === 1) {
                _that.formsData4.colnrm = _that.colnrList[0].key
              }
            }
            if (_that.checker === '5') {
              if (res[0].childcolnr) {
                _that.formsData5.childcolnrh = res[0].childcolnr
                _that.formsData5.childconamh = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData5.kstarh = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData5.colnrh = _that.colnrList[0].key
              }
            }
            if (_that.checker === '6') {
              if (res[0].childcolnr) {
                _that.formsData6.childcolnrt = res[0].childcolnr
                _that.formsData6.childconamt = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData6.kstart = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData6.colnrt = _that.colnrList[0].key
              }
            }
            if (_that.checker === '7') {
              if (res[0].childcolnr) {
                _that.formsData7.childcolnre = res[0].childcolnr
                _that.formsData7.childconame = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData7.kstare = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData7.colnre = _that.colnrList[0].key
              }
            }
            if (_that.checker === '8') {
              if (res[0].childcolnr) {
                _that.formsData8.childcolnrg = res[0].childcolnr
                _that.formsData8.childconamg = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData8.kstarg = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData8.colnrg = _that.colnrList[0].key
              }
            }
          }
        })
      }
      if (this.protype === '专项项目') {
        api.getColdconamzList(params, function (res) {
          if (res[0].kstar) {
            if (_that.checker === '1') {
              if (res[0].childcolnr) {
                _that.formsData1.childcolnr = res[0].childcolnr
                _that.formsData1.childconam = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData1.kstar = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData1.colnr = _that.colnrList[0].key
              }
            }
            if (_that.checker === '2') {
              if (res[0].childcolnr) {
                _that.formsData2.childcolnrc = res[0].childcolnr
                _that.formsData2.childconamc = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData2.kstarc = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData2.colnrc = _that.colnrList[0].key
              }
            }
            if (_that.checker === '3') {
              if (res[0].childcolnr) {
                _that.formsData3.childcolnro = res[0].childcolnr
                _that.formsData3.childconamo = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData3.kstaro = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData3.colnro = _that.colnrList[0].key
              }
            }
            if (_that.checker === '4') {
              _that.colnrList = res[0].colnrList
              if (res[0].childcolnr) {
                _that.formsData4.childcolnrm = res[0].childcolnr
                _that.formsData4.childconamm = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData4.kstarm = res[0].kstar
              }
              if (_that.colnrList.length === 1) {
                _that.formsData4.colnrm = _that.colnrList[0].key
              }
            }
            if (_that.checker === '5') {
              if (res[0].childcolnr) {
                _that.formsData5.childcolnrh = res[0].childcolnr
                _that.formsData5.childconamh = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData5.kstarh = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData5.colnrh = _that.colnrList[0].key
              }
            }
            if (_that.checker === '6') {
              if (res[0].childcolnr) {
                _that.formsData6.childcolnrt = res[0].childcolnr
                _that.formsData6.childconamt = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData6.kstart = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData6.colnrt = _that.colnrList[0].key
              }
            }
            if (_that.checker === '7') {
              if (res[0].childcolnr) {
                _that.formsData7.childcolnre = res[0].childcolnr
                _that.formsData7.childconame = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData7.kstare = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData7.colnre = _that.colnrList[0].key
              }
            }
            if (_that.checker === '8') {
              if (res[0].childcolnr) {
                _that.formsData8.childcolnrg = res[0].childcolnr
                _that.formsData8.childconamg = res[0].childconam
              }
              if (res[0].kstar) {
                _that.formsData8.kstarg = res[0].kstar
              }
              _that.colnrList = res[0].colnrList
              if (_that.colnrList.length === 1) {
                _that.formsData8.colnrg = _that.colnrList[0].key
              }
            }
          }
        })
      }
    },
    getProtypeInfo() {
      let _that = this
      let sparams = {
        burks: this.burks
      }
      if (this.checker === '1') {
        this.cbFlag = '0'
        this.formsData1.kursf = ''
        if (this.formsData1.waers === 'CNY') {
          this.currencyFlag = '0'
          this.formsData1.kursf = '1'
        }
        if (this.formsData1.waers !== 'CNY') {
          this.currencyFlag = '1'
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
        }
        api.getTaxCodeList(sparams, function (res) {
          if (res[0].isTaxPayer) {
            _that.purchoList = res.data.taxCodeList
            _that.pFlag = '1'
          }
        })
      }
      if (this.checker === '4') {
        this.formsData4.kursfm = ''
        if (this.formsData4.waersm === 'CNY') {
          this.currencyFlag = '0'
          this.formsData4.kursfm = '1'
        }
        if (this.formsData4.waersm !== 'CNY') {
          this.currencyFlag = '1'
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
        api.getTaxCodeList(sparams, function (res) {
          if (res[0].isTaxPayer) {
            _that.purchoList = res.data.taxCodeList
            _that.pFlag = '1'
          }
        })
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
        api.getTaxCodeList(sparams, function (res) {
          if (res[0].isTaxPayer) {
            _that.purchoList = res.data.taxCodeList
            _that.pFlag = '1'
          }
        })
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
            _that.ulfee = res[0].ulfee
            _that.cbFlag = '1'
            _that.flag = '1'
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
            _that.ulfeec = res[0].ulfee
            _that.cbFlag = '1'
            _that.flag = '1'
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
            _that.ulfeeh = res[1].ulfee
             _that.subsidyh = res[1].dmbtr
            _that.cbFlag = '1'
            _that.flag = '1'
          }
        })
      }
    },
    // 餐补超额验证
    changeAmountCE(value) {
      if (this.show === '0') {
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
        api.getOverproofMealFee(params, function (res) {
          if (res[0].ulfee > 0) {
            _that.ExcessiveCb = res[0].ulfee
            _that.cbceFlag = '1'
          }
        })
      }
    },
    feeAmount(value) {
      if (this.show === '0') {
        let params = {
          mtype_class: this.mtype_class,
          mtype: this.mtype,
          bukrs: this.burks,
          money: value,
          postid: this.postid
        }
         let _that = this
        api.getOverproofTelnet(params, function (res) {
          if (res[0] !== '') {
            _that.ulfeee = res[0].ulfee
            _that.cbFlag = '1'
            _that.flag = '1'
          }
        })
      }
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
        if (this.cbFlag === '1') {
          if (this.formsData1.ulrea === '') {
            whole.showTop('请选填写超标事由')
            return;
          }
        }
        if (this.formsData1.colnr === '') {
          whole.showTop('请选择项目号')
          return;
        }
        if (this.formsData1.smemoltrad === '') {
          whole.showTop('请填写说明')
          return;
        }
        if (this.currencyFlag === '0') {
          this.formsData1.wrbtr = this.formsData1.dmbtr
        }
        var conam = dataUtils.getDescValue(this.colnrList, this.formsData1.colnr);
        let formsData = {
          type: '长途交通',
          stype: this.formsData1.stype,
          mtype: this.formsData1.mtype,
          sdate: this.formsData1.sdate,
          edate: this.formsData1.edate,
          saddr: this.formsData1.saddr,
          eaddr: this.formsData1.eaddr,
          waers: this.formsData1.waers,
          wrbtr: this.formsData1.wrbtr,
          kursf: this.formsData1.kursf,
          conam: conam,
          travel: this.formsData1.travel,
          ulrea: this.formsData1.ulrea,
          smemoltrad: this.formsData1.smemoltrad,
          dmbtr: this.amount,
          uuid: this.formsData1.uuid,
            buzei: '',
            aufnrl: this.aufnr,
            appid: '',
            abroadis: this.show,
            colnr: this.formsData1.colnr,
            kuname: '',
            place: '',
            trlnr: '',
            budgetmonthl: '',
            budgetyearl: '',
            childcolnr: this.formsData1.childcolnr,
            childconam: this.formsData1.childconam,
            kstar: this.formsData1.kstar,
          //  kstarval: this.formsData1.kstarval,
            ename: '',
            ulfee: this.ulfee,
            agree: this.flag
        }
       // console.log(ltrad)
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
      //  this.$router.go(-1)
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
        if (this.cbFlag === '1') {
          if (this.formsData2.ulreac === '') {
            whole.showTop('请填写超标事由')
            return;
          }
        }
        if (this.formsData2.colnrc === '') {
          whole.showTop('请选择项目号')
          return;
        }
        if (this.formsData2.smemoc === '') {
          whole.showTop('请填写说明')
          return;
        }
        /* if (this.formsData2.dmbtrc === '') {
          whole.showTop('请填写总金额')
          return;
        } */
        if (this.currencyFlag === '0') {
          this.formsData2.wrbtrc = this.formsData2.dmbtrc
        }
        var conamc = dataUtils.getDescValue(this.colnrList, this.formsData2.colnrc);
        let formsData = {
          type: '市内交通',
          stypec: this.formsData2.stypec,
          mtypec: this.formsData2.mtypec,
          sdatec: this.formsData2.sdatec,
          saddrc: this.formsData2.saddrc,
          eaddrc: this.formsData2.eaddrc,
          waersc: this.formsData2.waersc,
          wrbtrc: this.formsData2.wrbtrc,
          kursfc: this.formsData2.kursfc,
          conamc: conamc,
          ulreac: this.formsData2.ulreac,
          smemc: this.formsData2.smemoc,
          dmbtrc: this.amount2,
          uuid: this.formsData2.uuid,
          childconamc: this.formsData2.childconamc,
          appid: '',
          colnrc: this.formsData2.colnrc,
          childcolnrc: this.formsData2.childcolnrc,
          abroadisc: this.show,
          trlnrc: '',
          aufnrc: this.aufnr,
          kstarc: this.formsData2.kstarc,
          budgetyearc: '',
          kunamec: '',
          enamec: '',
          ulfeec: this.ulfeec,
          agreec: this.flag,
          tcode: '',
          budgetmonthc: ''
        }
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
      //  this.$router.go(-1)
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
        if (this.formsData3.colnro === '') {
          whole.showTop('请选择项目号')
          return;
        }
        if (this.currencyFlag === '0') {
          this.formsData3.wrbtro = this.formsData3.dmbtro
        }
        var conamo = dataUtils.getDescValue(this.colnrList, this.formsData3.colnro);
        let formsData = {
          type: '办公费用',
          stypeo: this.formsData3.stypeo,
          sdateo: this.formsData3.sdateo,
          purcho: this.formsData3.purcho,
          waerso: this.formsData3.waerso,
          wrbtro: this.formsData3.wrbtro,
          kursfo: this.formsData3.kursfo,
          conamo: conamo,
          smemoo: this.formsData3.smemoo,
          colnro: this.formsData3.colnro,
          dmbtro: this.amount3,
          uuid: this.formsData3.uuid,
          aufnro: this.aufnr,
          appid: '',
          trlnro: '',
          ulfeeo: 0,
          agreeo: '',
          ulreao: '',
          budgetmontho: '',
          enameo: '',
          provider: '',
          budgetyearo: '',
          abroadiso: this.show,
          kunameo: '',
          childconamo: this.formsData3.childconamo,
          kstaro: this.formsData3.kstaro,
          childcolnro: this.formsData3.childcolnro
        }
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
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
        if (this.formsData4.colnrm === '') {
          whole.showTop('请选择项目号')
          return;
        }
        /* if (this.formsData1.dmbtr === '') {
         whole.showTop('请填写总金额')
         return;
         } */
        if (this.currencyFlag === '0') {
          this.formsData4.wrbtrm = this.formsData4.dmbtrm
        }
        var conamm = dataUtils.getDescValue(this.colnrList, this.formsData4.colnrm);
        let formsData = {
          type: '餐费',
          stypem: this.formsData4.stypem,
          sdatem: this.formsData4.sdatem,
          waersm: this.formsData4.waersm,
          wrbtrm: this.formsData4.wrbtrm,
          kursfm: this.formsData4.kursfm,
          conamm: conamm,
          smemom: this.formsData4.smemom,
          colnrm: this.formsData4.colnrm,
          dmbtrm: this.amount4,
          uuid: this.formsData4.uuid,
          childconamm: this.formsData4.childconamm,
          eaterym: '',
          aufnrm: this.aufnr,
          saddrm: '',
          kstarm: this.formsData4.kstarm,
          appid: '',
          trlnrm: '',
          agreem: this.flag,
          ulfeem: 0,
          budgetmonthm: '',
          enamem: '',
          budgetyearm: '',
          abroadism: this.show,
          ulream: '',
          kunamem: '',
          childcolnrm: this.formsData4.childcolnrm
        }
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
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
        if (this.cbFlag === '1') {
          if (this.formsData5.ulreah === '') {
            whole.showTop('请选填写超标事由')
            return;
          }
        }
        if (this.formsData5.colnrh === '') {
          whole.showTop('请选择项目号')
          return;
        }
        if (this.formsData5.smemoh === '') {
          whole.showTop('请填写住宿原因')
          return;
        }
        /* if (this.formsData1.dmbtr === '') {
         whole.showTop('请填写总金额')
         return;
         } */
        if (this.currencyFlag === '0') {
          this.formsData5.wrbtrh = this.formsData5.dmbtrh
        }
        var conamh = dataUtils.getDescValue(this.colnrList, this.formsData5.colnrh);
        let formsData = {
          type: '住宿及餐补',
          stypeh: this.formsData5.stypeh,
          sdateh: this.formsData5.sdateh,
          edateh: this.formsData5.edateh,
          saddrh: this.formsData5.saddrh,
          waersh: this.formsData5.waersh,
          wrbtrh: this.formsData5.wrbtrh,
          kursfh: this.formsData5.kursfh,
          conamh: conamh,
          colnrh: this.formsData5.colnrh,
          smemoh: this.formsData5.smemoh,
          ulreah: this.formsData5.ulreah,
          dmbtrh: this.amount5,
          uuid: this.formsData5.uuid,
          aufnrh: this.aufnr,
          subsidyh: this.subsidyh,
          mulfeeh: this.ExcessiveCb,
          appid: '',
          mealsuph: this.formsData5.mealsuph,
          purchh: '',
          trlnrh: '',
          enameh: '',
          agreeh: '',
          placeh: '',
          subsidysum: 0,
          budgetyearh: '',
          childcolnrh: this.formsData5.childcolnrh,
          kunameh: '',
          purchductionh: 0,
          hotelh: '',
          childconamh: this.formsData5.childconamh,
          demealh: this.formsData5.demealh,
          kstarh: this.formsData5.kstarh,
          abroadish: this.show,
          ulfeeh: this.ulfeeh,
          toadress: '',
          budgetmonthh: ''
        }
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
      //  this.$router.go(-1)
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
        if (this.formsData6.colnrt === '') {
          whole.showTop('请选择项目号')
          return;
        }
        /* if (this.formsData1.dmbtr === '') {
         whole.showTop('请填写总金额')
         return;
         } */
        if (this.currencyFlag === '0') {
          this.formsData6.wrbtrt = this.formsData6.dmbtrt
        }
        var conamt = dataUtils.getDescValue(this.colnrList, this.formsData6.colnrt);
        let formsData = {
          type: '培训费',
          stypet: this.formsData6.stypet,
          traint: this.formsData6.traint,
          waerst: this.formsData6.waerst,
          wrbtrt: this.formsData6.wrbtrt,
          kursft: this.formsData6.kursft,
          purcht: this.formsData6.purcht,
          colnrt: this.formsData6.colnrt,
          tnlnrt: this.formsData6.tnlnrt,
          smemot: this.formsData6.smemot,
          dmbtrt: this.amount6,
          conamt: conamt,
          uuid: this.formsData6.uuid,
          appid: '',
          purchductiont: 0,
          kstart: this.formsData6.kstart,
          aufnrt: this.aufnr,
          ulfeet: 0,
          abroadist: this.show,
          ulreat: '',
          trlnrt: '',
          budgetmontht: '',
          budgetyeart: '',
          childconamt: this.formsData6.childconamt,
          childcolnrt: this.formsData6.childcolnrt
        }
       // console.log(train)
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
      //  this.$router.go(-1)
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
        if (this.formsData7.colnre === '') {
          whole.showTop('请选择项目号')
          return;
        }
        if (this.currencyFlag === '0') {
          this.formsData7.wrbtre = this.formsData7.dmbtre
        }
        var coname = dataUtils.getDescValue(this.colnrList, this.formsData7.colnre);
        let formsData = {
          type: '通讯费',
          stypee: this.formsData7.stypee,
          sdatee: this.formsData7.sdatee,
          waerse: this.formsData7.waerse,
          wrbtre: this.formsData7.wrbtre,
          kursfe: this.formsData7.kursfe,
          colnre: this.formsData7.colnre,
          dmbtre: this.amount7,
          uuid: this.formsData7.uuid,
          appid: '',
          childcolnre: this.formsData7.childcolnre,
          childconame: this.formsData7.childconame,
          abroadise: this.show,
          kstare: this.formsData7.kstare,
          aufnre: this.aufnr,
          agreee: this.flag,
          budgetyeare: '',
          ulfeee: this.ulfeee,
          ulreae: '',
          budgetmonthe: '',
          coname: coname
        }
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
      //  this.$router.go(-1)
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
        if (this.formsData8.colnrg === '') {
          whole.showTop('请选择项目号')
          return;
        }
        if (this.currencyFlag === '0') {
          this.formsData8.wrbtrg = this.formsData8.dmbtrg
        }
        var conamg = dataUtils.getDescValue(this.colnrList, this.formsData8.colnrg);
        let formsData = {
          type: '礼品费',
          stypeg: this.formsData8.stypeg,
          sdateg: this.formsData8.sdateg,
          waersg: this.formsData8.waersg,
          wrbtrg: this.formsData8.wrbtrg,
          kursfg: this.formsData8.kursfg,
          colnrg: this.formsData8.colnrg,
          ulreag: this.formsData8.ulreag,
          smemg: this.formsData8.smemg,
          dmbtrg: this.amount8,
          uuid: this.formsData8.uuid,
          aufnrg: this.aufnr,
          appid: '',
          childcolnrg: this.formsData8.childcolnrg,
          childconamg: this.formsData8.childconamg,
          kstarg: this.formsData8.kstarg,
          abroadisg: this.show,
          trlnrg: '',
          agreeg: this.flag,
          budgetyearg: '',
          ulfeeg: 0,
          enameg: '',
          conamg: conamg,
          kunameg: '',
          budgetmonthg: ''
        }
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
      //  this.$router.go(-1)
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
        let formsData = {
          type: '电子发票',
          electronicnum: this.formsData9.electronicnum,
          linkv: this.formsData9.linkv,
          uuid: this.formsData9.uuid
        }
        this.$store.dispatch('addPersonReim', formsData)
        console.log('保存')
      }
        this.$router.go(-1)
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
