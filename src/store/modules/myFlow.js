import dayjs from 'dayjs';

const format = 'YYYY-MM'
const formatDate = 'YYYY-MM-DD'

export default {
  state: {
    selectedFlag: false,
    selectedDate: false,
    showSelectedMonth: true,
    monthDate: dayjs().format(format),
    begin: dayjs().startOf('month').format(formatDate),
    end: dayjs().endOf('month').format(formatDate)
  },
  actions: {
    selectedFlag({commit}, status) {
      commit('SELECTED_FLAG', status);
    },
    selectedDate({commit}, status) {
      commit('SELECTED_Date', status);
    },
    showSelectedMonth({commit}, status) {
      commit('showSelectedMonth', status);
    },
    saveSelectedBeginDateValue({commit}, val) {
      commit('saveSelectedBeginDateValue', val);
    },
    saveSelectedEndDateValue({commit}, val) {
      commit('saveSelectedEndDateValue', val);
    },
    saveSelectedMonthDateValue({commit}, val) {
      commit('saveSelectedMonthDateValue', val);
    }
  },
  mutations: {
    'SELECTED_FLAG'(state, status) {
      state.selectedFlag = status;
    },
    'SELECTED_Date'(state, status) {
      state.selectedDate = status;
    },
    'showSelectedMonth'(state, status) {
      state.showSelectedMonth = status;
    },
    'saveSelectedMonthDateValue'(state, val) {
      state.monthDate = val;
    },
    'saveSelectedBeginDateValue'(state, val) {
      state.begin = val;
    },
    'saveSelectedEndDateValue'(state, val) {
      state.end = val;
    }
  },
  getters: {
    getSelectedFlag: state => state.selectedFlag,
    getSelectedDate: state => state.selectedDate,
    getSelectedBeginDateValue: state => state.begin,
    getSelectedEndDateValue: state => state.end,
    getSelectedMonthDateValue: state => state.monthDate,
    getShowSelectedMonth: state => state.showSelectedMonth
  }
}
