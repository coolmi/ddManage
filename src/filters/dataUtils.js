import * as _ from 'underscore'
import whole from '@/lib/whole'

const filterData = function (data = [], dataItem) {
  if (!dataItem.uuid) {
    dataItem.uuid = generateUUID()
  }
  if (data.length > 0) {
    const index = _.findLastIndex(data, {
      uuid: dataItem.uuid
    });
    if (index >= 0) {
      data.splice(index, 1, dataItem);
    } else {
      data.push(dataItem)
    }
  } else {
    if (!(_.isNull(dataItem))) {
      data.push(dataItem)
    }
  }
  return data
};

// 钱数转大写-正则
function money2dx(tag) {
  if (tag) {
    var re = /^[1-9]+[0-9]*]*$/; // 判断字符串是否为数字 判断正整数 /^[1-9]+[0-9]*]*$/
    if (re.test(tag)) {
      let num = tag;

      let strOutput = '';
      let strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
      num += '00';
      let intPos = num.indexOf('.');
      if (intPos >= 0) {
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
      }
      strUnit = strUnit.substr(strUnit.length - num.length);
      for (let i = 0; i < num.length; i++) {
        strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
      }

      return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, '零元')
    } else {
      whole.showTop('请输入正确的金额')
    }
  }
};

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

function formatNumber(value) {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + ',')
}

function getListValue(data, type = 'popup') {
  let list = [];
  if (type === 'popup') {
    _.each(data, function (val) {
      let item = {}
      item.name = val.value
      item.value = val.key
      list.push(item)
    })
  }
  return list
}

// 转换为搜索数据格式
function getListSearchValue(data, type = 'popup') {
  let list = [];
  if (type === 'popup') {
    _.each(data, function (val) {
      let item = {}
      item.title = val.value
      item.key = val.key
      list.push(item)
    })
  }
  return list
}

/**
 * (V-Search)vulue转换描述
 * @param  {[type]} originalData [原始数据]
 * @param  {[type]} selecteddata [选择数据]
 * @return {[type]}              [description]
 */
function getDescValue(originalData, selecteddata) {
  let fieldDesc = '';
  originalData.map(function (item) {
    if (item.key === selecteddata.toString()) {
        fieldDesc = item.value
    }
  });
  return fieldDesc;
}

/**
 * (Pop-Picker)name转换描述
 * @param  {[type]} originalData [原始数据]
 * @param  {[type]} selecteddata [选择数据]
 * @return {[type]}              [description]
 */
function getDescValueP(originalData, selecteddata) {
  let fieldDesc = '';
  originalData.map(function (item) {
    if (item.value === selecteddata.toString()) {
        fieldDesc = item.name
    }
  });
  return fieldDesc;
}

/**
 * 获取汇总数据
 * @param basedata 源数据
 * @param baseType [{type: 'byj', field: 'byjsum'}]
 */
function getSummary(basedata = [], baseType = []) {
  if (basedata.length < 0 || baseType.length < 0) {
    console.log('源数据不完成');
    return;
  }
  let result = []
  let cc = _.chain(baseType).map(
    function (aitem) {
      return _.where(basedata, aitem)
    }
  ).value()
  for (let citem of cc) {
    for (let type of baseType) {
      let obj = {}
      let ff = _.compact(_.map(citem, _.iteratee(type.field)))
      if (ff.length > 0) {
        obj.type = type.type;
        obj.child = ff
        obj.sum = _.reduce(ff, function(memo, num) { return memo + num; }, 0);
        result.push(obj)
      }
    }
  }
  return result
}
export default {filterData, money2dx, generateUUID, formatNumber, getListValue, getListSearchValue, getDescValue, getDescValueP, getSummary}
