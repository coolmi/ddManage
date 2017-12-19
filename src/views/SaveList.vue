<template>
  <div>
    <group v-if="draftList.length > 0">
      <cell v-for="(item, appid) in draftList" :key="item.appid" :title="item.draftName" :inline-desc="item.appda | dateFormat" is-link @click.native="addBusinessTripOption(item)"></cell>
      <infinite-loading v-if="draftList.length > 0" @infinite="getMoreDraftList">
        <span slot="no-more">没有更多消息了</span>
      </infinite-loading>
    </group>
  </div>
</template>
<style scoped lang="less" type="text/less">
</style>
<script>
import {Group, Cell} from 'vux';
import InfiniteLoading from 'vue-infinite-loading';
import api from 'api' // 接口
import ding from '@/lib/ding'
export default {
  components: {
    Group, Cell, InfiniteLoading
  },
  data() {
    return {
      draftList: [],
      pageNo: 1,
      pageSize: 20
    }
  },
  created() {
    let _that = this;
    this.$navigation.on('back', (to, from) => {
      _that.doNext();
      _that.startPush(); // 启动刷新
    })
    this.doNext();
    this.startPush(); // 启动刷新
  },
  methods: {
    getMoreDraftList($state) {
      let _that = this;
      _that.pageNo++
      let params = {
        pageNo: _that.pageNo,
        pageSize: _that.pageSize
      }
      api.getDraftListURL(params, function (res) {
        if (res) {
          console.log(res.data.data.draftlist);
          if (res.data.data.draftlist.length) {
            _that.draftList = _that.draftList.concat(res.data.data.draftlist)
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      })
    },
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
          pageNo: _that.pageNo,
          pageSize: _that.pageSize
        }
        api.getDraftListURL(params, function (res) {
          if (res) {
            console.log(res.data.data.draftlist);
            _that.draftList = res.data.data.draftlist
          }
        })
        ding.stopPush()
      },
    addBusinessTripOption(data) {
      let saveParams = {
        appid: data.appid,
        draftType: data.draftType
      };
      if (data.draftType === 'travel') {
        this.$router.push({path: '/BusinessTrip', query: {saveParams: saveParams}})
      } else if (data.draftType === 'depositApp') {
        this.$router.push({path: '/Reserve', query: {saveParams: saveParams}})
      }
    }
  }
}
</script>
