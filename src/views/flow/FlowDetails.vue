<template>
  <div class="">
    <flow-sub-content :subforms="ctable" flag="details"></flow-sub-content>
  </div>
</template>

<script>
  import FlowSubContent from 'comp/FlowSubContent'

  export default {
    components: {
      FlowSubContent
    },
    data() {
      return {
        title: '',
        ctable: []
      }
    },
    created() {
      this.title = this.$route.query.title;
      let ctable = this.$route.query.ctable
      if (typeof ctable === 'string') {
        this.ctable = JSON.parse(ctable)
      } else {
        this.ctable = ctable
      }
      this.setTitle(this.title)
    },
    methods: {
      setTitle(title) {
        let dd = window.dd;
        let config = {
          title: title
        }
        dd.ready(function () {
          dd.biz.navigation.setTitle(config);
        })
      }
    }
  }
</script>

