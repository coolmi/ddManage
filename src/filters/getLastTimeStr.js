/**
 * Created by lzl on 17/1/23.
 */
const fmtDate = (date, fmt = 'yyyy-MM-dd') => {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};
module.exports = (begda, endda = '', fmt, type = '1') => {
  if (type === '1') {
    const val1 = fmtDate(new Date(begda), fmt);
    if (endda !== '') {
      const val2 = fmtDate(new Date(endda), fmt);
      return val1 + '~' + val2;
    } else {
      return val1
    }
  } else if (type === '2') {
    const val1 = begda.substr(0, 10);
    if (endda !== '') {
      const val2 = endda.substr(0, 10);
      return val1 + '~' + val2;
    } else {
      return val1
    }
  }
};
