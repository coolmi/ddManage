<template>
  <div class="b-box">
    <group v-for="(item,index) in list" :key="index" gutter="0" class="b-group" v-show="showCheck">
      <cell title="考勤排班"
            :title="item.number"
            is-link
            :border-intent="false"
            :arrow-direction="item.showContent ? 'up' : 'down'"
            @click.native="item.showContent = !item.showContent"
            :class="item.showContent ? 'b-cell':''"
            class="bcell">
      </cell>
      <div class="slide" :class="item.showContent ? 'animate' : ''">
        <ul class="bul">
          <li class="blist"><span class="bspan1">序号</span><span class="bspan2">{{item.number}}</span></li>
          <li class="blist"><span class="bspan1">排班日期</span><span class="bspan2">{{item.pbdate}}</span></li>
          <li class="blist"><span class="bspan1">班次</span><span class="bspan2">{{item.pbclass}}</span></li>
          <li class="blist"><span class="bspan1">排班类型</span><span class="bspan2">{{item.pbtype}}</span></li>
          <li class="blist"><span class="bspan1">排班开始时间</span><span class="bspan2">{{item.pbstartime}}</span></li>
          <li class="blist"><span class="bspan1">排班结束时间</span><span class="bspan2">{{item.pbendtime}}</span></li>
          <li class="blist"><span class="bspan1">班次时数</span><span class="bspan2">{{item.pbburn}}</span></li>
          <li class="blist"><span class="bspan1">休息方式</span><span class="bspan2">{{item.restype}}</span></li>
          <li class="blist"><span class="bspan1">休息时长</span><span class="bspan2">{{item.restime}}</span></li>
          <li class="blist"><span class="bspan1">休息开始时间</span><span class="bspan2">{{item.reststart}}</span></li>
          <li class="blist"><span class="bspan1">休息结束时间</span><span class="bspan2">{{item.restend}}</span></li>
        </ul>
      </div>
    </group>
  </div>
</template>

<script>
  import { Checklist, Group, Cell } from 'vux'

  export default {
    components: {
      Checklist,
      Group,
      Cell
    },
    data () {
      return {
        showTips: false,
        showCheck: true,
        showbg: false,
        showContent: false,
        list: [
          {
            number: 1,
            pbdate: '2018-01-01',
            pbclass: '休息',
            pbtype: 3,
            pbstartime: '',
            pbendtime: '',
            pbburn: 0.0,
            restype: 0,
            restime: 0.00,
            reststart: '',
            restend: '',
            showContent: false
          },
          {
            number: 2,
            pbdate: '2018-01-02',
            pbclass: '08:00-17:00/B/12:00-13:00',
            pbtype: 1,
            pbstartime: '08:00',
            pbendtime: '17:00',
            pbburn: 8.0,
            restype: 1,
            restime: 1.00,
            reststart: '12:00',
            restend: '13:00',
            showContent: false
          },
          {
            number: 3,
            pbdate: '2018-01-03',
            pbclass: '08:00-17:00/B/12:00-13:00',
            pbtype: 1,
            pbstartime: '08:00',
            pbendtime: '17:00',
            pbburn: 8.0,
            restype: 1,
            restime: 1.00,
            reststart: '12:00',
            restend: '13:00',
            showContent: false
          }
        ]
      }
    },
    methods: {
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
