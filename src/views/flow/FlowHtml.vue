<template>
  <div class="content">
    <div v-if="htmlVal.value !== undefined" v-html="htmlVal.value"></div>
    <div v-else>暂无信息</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        htmlVal: ''
      }
    },
    created() {
      this.htmlVal = this.$route.query.htmlVal;
    }
  }
</script>
<style scoped>
  .content {
    padding: 20px;
  }
</style>

