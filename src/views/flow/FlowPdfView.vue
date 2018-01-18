<!--<template>-->
  <!--<div>-->
    <!--<canvas :id="'theCanvas' + n" v-for="n in num" :key="n" style="width: 100%; display: block"></canvas>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import pdf from 'vue-pdf'-->
  <!--import APILIST from '@/api/apiBase'-->
  <!--import baseConfig from '@/api/baseConfig'-->

  <!--var pdfjsLib = require('pdfjs-dist');-->
  <!--var pdfjsWorker = require('pdfjs-dist/build/pdf.worker');-->

  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--page: 1,-->
        <!--num: 0-->
      <!--}-->
    <!--},-->
    <!--components: {-->
      <!--pdf-->
    <!--},-->
    <!--created() {-->
      <!--let params = JSON.parse(this.$route.query.params)-->
<!--//      this.openPdf(params)-->
      <!--if (params.viewstatus === 0 || params.viewstatus === '0') {-->
        <!--params.ispdf = true-->
        <!--this.openPdf(params)-->
      <!--} else {-->
        <!--params.ispdf = false-->
        <!--this.openPdf(params)-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--openPdf(params) {-->
        <!--let _that = this;-->
        <!--let fujianUrl = baseConfig.baseURL + APILIST.openfile_url + '?docmentafrescoid=' + params.docmentafrescoid + '&docmentafresconame=' + params.docmentafresconame + '&ispdf=' + params.ispdf;-->
        <!--console.log(fujianUrl)-->
        <!--pdfjsLib.PDFJS.workerSrc = pdfjsWorker;-->
        <!--var loadingTask = pdfjsLib.getDocument(fujianUrl);-->
        <!--loadingTask.promise.then(function (pdfDocument) {-->
          <!--// Request a first page-->
          <!--const num = pdfDocument.pdfInfo.numPages-->
          <!--_that.num = pdfDocument.pdfInfo.numPages-->
          <!--for (let i = 0; i <= num; i++) {-->
            <!--pdfDocument.getPage(i).then(function (pdfPage) {-->
              <!--// Display page on the existing canvas with 100% scale.-->
              <!--var viewport = pdfPage.getViewport(1.0);-->
              <!--var canvas = document.getElementById('theCanvas' + i);-->
              <!--canvas.width = viewport.width;-->
              <!--canvas.height = viewport.height;-->
              <!--var ctx = canvas.getContext('2d');-->
              <!--pdfPage.render({-->
                <!--canvasContext: ctx,-->
                <!--viewport: viewport-->
              <!--});-->
            <!--});-->
          <!--}-->
        <!--}).catch(function (reason) {-->
          <!--console.error('Error: ' + reason);-->
        <!--});-->
      <!--},-->
      <!--downPdf(params) {-->
        <!--window.location.href = baseConfig.baseURL + APILIST.openfile_url + '?docmentafrescoid=' + params.docmentafrescoid + '&docmentafresconame=' + params.docmentafresconame-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style scoped lang="less" type="text/less">-->
  <!--.text_span {-->
    <!--text-align: center;-->
  <!--}-->

  <!--.center {-->
    <!--padding-bottom: 60px;-->
  <!--}-->

  <!--.flow_list_card_content_a {-->
    <!--display: flex;-->
  <!--}-->

  <!--.flow_list_card_content_b {-->
    <!--display: flex;-->
  <!--}-->

  <!--.flow_list_card_content_div {-->
    <!--flex: 1;-->
    <!--.text_span-->
  <!--}-->

  <!--.flow_list_card_content_li_span {-->
    <!--color: @theme-color;-->
    <!--padding-top: 5px;-->
    <!--.text_span-->
  <!--}-->

  <!--.flow_list_card_hd_left {-->
    <!--flex: 1;-->
    <!--text-align: left;-->
  <!--}-->

  <!--.flow_list_card_hd_right span {-->
    <!--font-size: .7rem;-->
    <!--color: @theme-color;-->
  <!--}-->

  <!--.itemTitle {-->
    <!--margin-top: @item-title-margin-top;-->
    <!--margin-bottom: @item-title-margin-bottom;-->
    <!--padding-left: @itemGapH;-->
    <!--padding-right: @itemGapH;-->
    <!--color: @theme-color;-->
    <!--font-size: @cell-tips-font-size;-->
  <!--}-->
<!--</style>-->
