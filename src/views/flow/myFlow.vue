<template>
  <div>
    <div class="headerTab">
      <div class="selectDiv">
        <template v-if="!selectedFlag && !selectedDate">
          <span class="selectedSpan" @click="goSelected">筛选
            <div class="triangle"></div>
          </span>
          <span class="selectedSpan" :class="selectedMonthDateValue !== month ? 'checkedSpan' : ''" @click="goSelectedDate">{{showSelectedMonth ? (selectedMonthDateValue === month ? '本月' : selectedMonthDateValue) : selectedBeginDateValue + '至'+ selectedEndDateValue}}
            <div :class="selectedMonthDateValue !== month ? 'checkedTriangle' : 'triangle'"></div>
          </span>
          <!--<span class="selectedSpan" style="float: right; padding-right: 0; color: #38ADFF" @click="goSelectedDate">默认</span>-->
        </template>
        <template v-if="selectedDate || selectedFlag">
          <span class="selectedSpan" style="color: #38ADFF" @click="cancelSelected">取消</span>
          <span class="selectedSpan" style="float: right; padding-right: 0; color: #38ADFF" @click="completeSelected">完成</span>
        </template>
      </div>
    </div>
    <router-view style="margin-top: 40px"></router-view>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import dayjs from 'dayjs'
  const format = 'YYYY-MM'

  export default {
    data () {
      return {
        month: dayjs().format(format)
      }
    },
    computed: {
      ...mapGetters({
        selectedFlag: 'getSelectedFlag',
        selectedDate: 'getSelectedDate',
        showSelectedMonth: 'getShowSelectedMonth', // 显示月份还是日期区间
        selectedMonthDateValue: 'getSelectedMonthDateValue',
        selectedBeginDateValue: 'getSelectedBeginDateValue',
        selectedEndDateValue: 'getSelectedEndDateValue'
      })
    },
    watch: {
      '$route'(to, from) {
        if (to.fullPath === '/myFlow') {
          this.$store.dispatch('selectedFlag', false)
          this.$store.dispatch('selectedDate', false)
        }
      }
    },
    created() {
      this.$store.dispatch('selectedFlag', false)
      this.$store.dispatch('selectedDate', false)
    },
    methods: {
      goSelected() {
        this.$store.dispatch('selectedFlag', true)
        this.$router.push('/myFlow/selected')
      },
      goSelectedDate() {
        this.$store.dispatch('selectedDate', true)
        this.$router.push('/myFlow/sd')
      },
      completeSelected() {
        this.$router.go(-1)
      },
      cancelSelected() {
        this.$store.dispatch('saveSelectedMonthDateValue', this.selectedMonthDateValue)
        this.$store.dispatch('saveSelectedBeginDateValue', this.selectedBeginDateValue)
        this.$store.dispatch('saveSelectedEndDateValue', this.selectedEndDateValue)
        this.$store.dispatch('showSelectedMonth', true)
        this.$store.dispatch('selectedFlag', false)
        this.$store.dispatch('selectedDate', false)
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../styles/pro/myFlow';
</style>
