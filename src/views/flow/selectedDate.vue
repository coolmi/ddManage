<template>
  <transition name="fade">
    <div class="selectDate">
    <span class="selectDateBtn" @click="showDateClick">{{showDate ? '按日期选择' : '按月选择'}}
      <img src="/static/images/hh.png">
    </span>
      <div class="selectDate-showDate">
        {{showDate ? value : begin + ' 至 ' + end}}
      </div>
      <template v-if="showDate">
        <datetime-view v-model="value" ref="datetime" :format="format"></datetime-view>
      </template>
      <template v-if="!showDate">
        <div class="selectDate-group">
          <div class="selectDate-group-date">
            <datetime-view v-model="begin" ref="datetime" :format="formatDate"></datetime-view>
          </div>
          <span class="selectDate-group-span">至</span>
          <div class="selectDate-group-date">
            <datetime-view v-model="end" ref="datetime" :format="formatDate"></datetime-view>
          </div>
        </div>
      </template>
    </div>
  </transition>
</template>

<script>
  import {DatetimeView} from 'vux'
  import dayjs from 'dayjs'
  import { mapGetters } from 'vuex'

  const format = 'YYYY-MM'
  const formatDate = 'YYYY-MM-DD'

  export default {
    components: {
      DatetimeView
    },
    data() {
      return {
        showDate: false,
        value: '',
        begin: '',
        end: '',
        format: format,
        formatDate: formatDate
      }
    },
    computed: {
      ...mapGetters({
        showSelectedMonth: 'getShowSelectedMonth',
        selectedMonthDate: 'getSelectedMonthDateValue',
        selectedBeginDateValue: 'getSelectedBeginDateValue',
        selectedEndDateValue: 'getSelectedEndDateValue'
      })
    },
    watch: {
      value(val) {
        const begin = dayjs(val).startOf('month').format(formatDate)
        const end = dayjs(val).endOf('month').format(formatDate)
        this.$store.dispatch('saveSelectedMonthDateValue', val)
        this.$store.dispatch('saveSelectedBeginDateValue', begin)
        this.$store.dispatch('saveSelectedEndDateValue', end)
      },
      begin(val) {
        this.$store.dispatch('saveSelectedBeginDateValue', val)
      },
      end(val) {
        this.$store.dispatch('saveSelectedEndDateValue', val)
      }
    },
    created() {
      this.value = this.selectedMonthDate
      this.begin = this.selectedBeginDateValue
      this.end = this.selectedEndDateValue
      this.showDate = this.showSelectedMonth
//      this.$store.dispatch('saveSelectedBeginDateValue', dayjs(this.value).startOf('month').format(formatDate))
//      this.$store.dispatch('saveSelectedEndDateValue', dayjs(this.value).endOf('month').format(formatDate))
    },
    methods: {
      showDateClick() {
        this.showDate = !this.showDate
        this.$store.dispatch('showSelectedMonth', this.showDate)
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import "../../styles/pro/selectDate";
</style>
