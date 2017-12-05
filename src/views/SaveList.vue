<template>
  <div>
    <group v-if="draftList.length > 0">
      <cell v-for="(item, appid) in draftList" :key="item.appid" :title="item.draftName" :inline-desc="item.appda | dateFormat" is-link @click.native="addBusinessTripOption(item)"></cell>
    </group>
  </div>
</template>
<style scoped lang="less" type="text/less">
</style>
<script>
import {Group, Cell} from 'vux';
import api from 'api' // 接口
import ding from '@/lib/ding'
export default {
  components: {
    Group, Cell
  },
  data() {
    return {
      draftList: []
    }
  },
  created() {
    // this.draftList = [{'appda': 1510848000000, 'appid': 8551, 'draftName': '员工出差申请', 'draftType': 'travel'},
    // {'appda': 1510848000000, 'appid': 8550, 'draftName': '员工出差申请', 'draftType': 'travel'}]
    this.doNext();
    this.startPush(); // 启动刷新
  },
  methods: {
    startPush() {
      let dd = window.dd;
      let _that = this;
      dd.ready(function () {
        dd.ui.pullToRefresh.enable({
          onSuccess: function () {
            _that.doNext(_that.index);
            console.log('onSuccess');
          },
          onFail: function () {
            console.log('onFail');
          }
        })
      })
    },
    doNext() {
        let _that = this;
        let params = {
          draftType: '',
          pageNo: 1,
          pageSize: 20
        }
        api.getDraftListURL(params, function (res) {
          if (res) {
            var demoArray = [];
            res.data.data.draftlist.map(function (item) {
              let demo = {};
              for (var v in item) {
                if (item[v] === 'travel') {
                  demo[v] = '员工出差申请'
                } else {
                  demo[v] = item[v]
                }
              }
              demoArray.push(demo)
            })
            console.log(demoArray);
            _that.draftList = res.data.data.draftlist
          }
        })
        ding.stopPush()
      },
    addBusinessTripOption(data) {
      console.log(data);
    }
  }
}
</script>
