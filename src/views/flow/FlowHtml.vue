<template>
  <div class="content">
    <div v-html="htmlVal.value"></div>
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

