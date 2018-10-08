<template>
  <div>
  </div>
</template>

<script>
  import api from 'api';

  export default {
    data() {
      return {
      }
    },
    components: {
    },
    created() {
      this.getKey()
    },
    methods: {
      getKey () {
        let _that = this
        api.getltype(function (res) {
          if (res.data.code) {
            console.log(res);
            let ltype = res.data.data.ltype
            if (ltype === '1') {
              console.log(ltype)
              _that.$router.push({path: '/newLeaveGaia', query: {obj: ltype}})
            }
            if (ltype === '0' || ltype === '3') {
              _that.$router.push({path: '/newLeavexfx', query: {obj: ltype}})
            }
          }
        });
      }
    }
  }
</script>

<style scoped lang='less'>
  @import '~vux/src/styles/1px.less';


</style>
