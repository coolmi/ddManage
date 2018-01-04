<template>
  <div>
    <group v-if="backList.length > 0">
      <cell v-for="(item, id) in backList" :key="item.id" :title="item.holidaytypename" :inline-desc="item.appda | dateFormat" is-link @click.native="addNewLeaveBackOption(item)"></cell>
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
      backList: []
    }
  },
  created() {
    // this.backList = [{'appda': 1510848000000, 'appid': 8551, 'draftName': '员工出差申请', 'draftType': 'travel'},
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
          pageNo: 1,
          pageSize: 20
        }
      console.log(params);
        api.getNewLeaveBackListURL(params, function (res) {
          console.log(res.data.backList);
          if (res) {
            console.log(res.data.backList);
            _that.backList = res.data.backList
          }
        })
        ding.stopPush()
      },
    addNewLeaveBackOption(data) {
      let saveParams = {
        id: data.id
      };
      this.$router.push({path: '/newLeaveBack', query: {saveParams: saveParams}})
    }
  }
}
</script>
