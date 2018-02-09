<template>
  <div class="b-box">
    <group v-for="(item,index) in list" :key="index" gutter="0" class="b-group" v-show="showCheck">
      <cell title="考勤排班"
            :title="item.calendardate"
            is-link
            :border-intent="false"
            :arrow-direction="item.showContent ? 'up' : 'down'"
            @click.native="item.showContent = !item.showContent"
            :class="item.showContent ? 'b-cell':''"
            class="bcell">
      </cell>
      <group v-if="item.showContent" gutter="0">
          <cell title="排班日期">{{item.calendardate}}</cell>
          <cell title="班次">{{item.timeclassname}}</cell>
          <cell title="排班类型">{{item.calendartype}}</cell>
          <cell title="排班开始时间">{{item.timefrom}}</cell>
          <cell title="排班结束时间">{{item.timeto}}</cell>
          <cell title="班次时数">{{item.calhours}}</cell>
          <cell title="休息方式">{{item.timeclassresttype}}</cell>
          <cell title="休息时长">{{item.timeclassresthours}}</cell>
          <cell title="休息开始时间">{{item.timeclassreststarttime}}</cell>
          <cell title="休息结束时间">{{item.timeclassrestendtime}}</cell>
      </group>
    </group>
  </div>
</template>

<script>
  import { Checklist, Group, Cell } from 'vux'
  import api from 'api';
  import whole from '@/lib/whole'
  import dateFormatter from '@/lib/dateFormatter';

  export default {
    components: {
      Checklist,
      Group,
      Cell
    },
    created() {
      this.startdate = dateFormatter.fmtDate(this.$route.query.startdate, 'yyyy-MM-dd')
      this.enddate = dateFormatter.fmtDate(this.$route.query.enddate, 'yyyy-MM-dd')
      this.getPbInfo()
    },
    data () {
      return {
        startdate: '',
        enddate: '',
        showTips: false,
        showCheck: true,
        showbg: false,
        showContent: false,
        list: []
      }
    },
    methods: {
      getPbInfo() {
        let _that = this;
        api.getPbInfo(_that.startdate, _that.enddate, function (res) {
          if (res.data.code) {
            if (res.data.data.message) {
              whole.showTop(res.data.data.message)
            } else {
              for (let item of res.data.data.schedulelist) {
                item.showContent = false
              }
              _that.list = res.data.data.schedulelist
            }
            console.log(res)
          } else {
            whole.showTop('获取排班信息失败')
          }
        })
      },
      showbtn () {
        this.showCheck = true
        this.showTips = false
      },
      change (val, label) {
        console.log('onchange', val, label)
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;padding: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }
  html,body{
    width: 100%;height: 100%;
    font-size: 62.5%;
  }
  .b-box{
    width: 100%;
    height: 100%;
  }
  .bcell{
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
    margin: 0;
  }
  .slide {
    padding: 0;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate{
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
  .bul{
    width: 100%;
    margin-bottom: 5px;
    margin-top: -1px;
  }
  .blist{
    width: 100%;
    height: 30px;
    display: flex;
    margin-left: 10px;
  }
  .blist span{
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .bspan1{
    justify-content: flex-start;
    padding-right: 5px;
    color: #8c8c8c;
    width: 28%;
    position: relative;
    text-align: justify-all;
  }
  .bspan1:after{
    content: '|';
    color: #8c8c8c;
    position: absolute;
    right: 0;
    margin-right: 5px;
  }
  .bspan2{
    justify-content: flex-start;
    padding-left: 5px;
    width: 70%;
    height: 100%;
    text-align: left;
    overflow: hidden;
    border-bottom: 1px dashed #e5e5e5;
  }
  .bimgbox{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 10px;
  }
  .bimgbox img{
    width: 100px;
  }
  .bimgbox p{
    font-size: 10px;
  }
  /*新坑又旧坑*/
  .weui-cells{
    font-size: 14px!important;
  }
  .weui-cells:before{
    content: none!important;
  }
  .weui-cell__bd p {
    font-size: 14px!important;
  }
  .weui-cells_checkbox .weui-icon-checked:before{
    font-size: 14px!important;
  }
  .vux-x-icon {
    fill: #fff;
  }
  .weui-cell{
    /*border-bottom: 1px solid #e5e5e5!important;*/
  }
</style>
