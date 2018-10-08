// let flowData = require('@/data/gmkrule.json');
import dateFormatter from '@/lib/dateFormatter';
import * as _ from 'underscore';

let childCompFlag = [
  'text',
  'textarea',
  'radio',
  'checkbox',
  'select',
  'hidden',
  'label',
  'date',
  'date1',
  'comma_concat',
  'table_form',
  'table_ccmx',
  'table'
]
let data = {
  PERNR_: '',
  APPID_: '',
  POSTID_: '',
  APPDA_: '',
  ID_: '',
  EDITARR_: [],
  flowData: [],
  FLOWSHOW: [],
  showContent: false,
  fileparam: {
    filename: '',
    fileurl: ''
  },
  fileUrls: []
}
export function getFlowData(flowData) {
  data.flowData = flowData.forms
  data.EDITARR_ = [];
  data.FLOWSHOW = [];
  data.fileUrls = [];
  if (flowData.forms) {
    for (let sub of flowData.forms) {
      if (sub.showLinkage && sub.showLinkage.length > 0) {
        ifHidden(sub)
      }
      sub.showContent = false;
      //  forms的第一层一定是 subComponents,所以此处的判断可以去掉  by zbm 2018-06-21 14:20:56
      if (sub.subComponents) {
        let subComp = sub.subComponents
        getSubComponents(subComp);
      } else {
        if (sub.name === 'pernr' && sub.component === 'hidden') {
          data.PERNR_ = sub.value
        }
        if (sub.name === 'appid') {
          data.APPID_ = sub.value
        }
        if (sub.name === 'postid') {
          data.POSTID_ = sub.value
        }
        if (sub.name === 'appda') {
          data.APPDA_ = dateFormatter.fmtDate(sub.value, 'yyyy-MM-dd') || ''
        }
        if (sub.name === 'id' && sub.component === 'hidden' && sub.title === '') {
          data.ID_ = sub.value || ''
        }
        if (sub.flowshow) {
          data.FLOWSHOW.push(sub)
        }
        sub.title = sub.title || sub.title1;
        let subcomp = sub.component
        if (childCompFlag.indexOf(subcomp) >= 0) { // 匹配需要解析的组件名，没有定义的不需要匹配
          if (subcomp === 'radio') { // radio
            if (sub.options) {
              for (let subOption of sub.options) {
                if (sub.value === subOption.value) {
                  sub.nvalue = subOption.title || subOption.text
                }
              }
            } else {
              sub.nvalue = sub.value
            }
          } else if (subcomp === 'select' || subcomp === 'checkbox') { // select
            if (sub.options) {
              for (let selectSubOption of sub.options) {
                if (sub.value === selectSubOption.value) {
                  sub.nvalue = selectSubOption.text || selectSubOption.title
                }
              }
            } else {
              sub.nvalue = sub.value
            }
          } else if (subcomp.indexOf('date') >= 0) {
            sub.nvalue = dateFormatter.fmtDate(sub.value, sub.dateFormat)
          } else if (subcomp === 'label') {
            sub.nvalue = sub.label;
          } else if (subcomp === 'text') {
            let valueStr = sub.value;
            // 此处需要增加对应的 events事件
            //  此处判断是否有events events 为打开预览文件的标志，将数据保存到列表中，
            if (sub.events) {
              /**
               *  events 中有viewOther openUrl openHtml openDocument  openHtmlContent
               *  其中最常用的是 openDocument和 openUrl
               */
              //
              if (sub.events.eventType === 'openUrl') {
                data.fileparam.filename = sub.value;
                data.fileparam.fileurl = sub.events.openUrl;
                flowData.fileUrls.push(data.fileparam);
              } else if (sub.events.eventType === 'openDocument') {
                data.fileparam.filename = sub.value;
                data.fileparam.afrescoid = sub.events.afrescoid;
                flowData.fileUrls.push(data.fileparam);
              } else if (sub.events.eventType === 'openHtml') {
                // TODO
              } else if (sub.events.eventType === 'openHtmlContent') {
                // TODO
              }
            }
            if (sub.datatype === 'money') {
              valueStr = fixMoney(sub.value) || 0;
            } else if (sub.datatype === 'money2dx') {
              valueStr = money2dx(sub.value) || 0;
            }
            sub.nvalue = valueStr;
          } else if (subcomp === 'comma_concat') {
            if (sub.options) {
              for (let commaSubOption of sub.options) {
                let nvalue = ''
                if (sub.value === commaSubOption.value) {
                  nvalue += commaSubOption.text + ',';
                  sub.nvalue = nvalue.substr(0, nvalue.length - 1);
                }
              }
            } else {
              sub.nvalue = sub.value;
            }
          } else if (subcomp === 'table_form') {
            sub.ntableForms = [];
            flowData.forms.SHOWLZL = true
            if (sub.tableForms.length === 1) {
              flowData.forms.SHOWLZL = false;
            }
            for (let tableIndex = 1, tabLength = sub.tableForms.length; tableIndex < tabLength; tableIndex++) {
              getSubComponents(sub.tableForms[tableIndex])
              let rows = sub.tableForms[tableIndex];
              let titleIndex = sub.titleIndex || 0;
              let lTitleIndex = titleIndex;
              let rTitleIndex = titleIndex;
              if (sub.lTitleIndex !== undefined && sub.lTitleIndex !== null) {
                lTitleIndex = sub.lTitleIndex;
              }
              if (sub.rTitleIndex !== undefined && sub.rTitleIndex !== null) {
                rTitleIndex = sub.rTitleIndex;
              }

              let title = ''
              if (lTitleIndex === rTitleIndex) {
                title = rows[lTitleIndex].title || rows[lTitleIndex].title1
              } else {
                title = getValueSwitchType(rows[lTitleIndex]);
              }
              let aa = {};
              aa.nchildtableForms = rows;
              aa.title = title;
              aa.nvalue = getValueSwitchType(rows[rTitleIndex]);
              // sub.tableForms[tableIndex].title = title;
              // sub.tableForms[tableIndex].showCollapse = false;
              // sub.tableForms[tableIndex].nvalue = getValueSwitchType(rows[rTitleIndex]);
              // sub.tableForms[tableIndex].nchildtableForms = rows
              sub.ntableForms.push(sub.tableForms[tableIndex])
            }
          } else if (subcomp === 'table') {
            sub.ntableForms = [];
            flowData.forms.SHOWLZL = true
            if (sub.tableForms.length === 1) {
              flowData.forms.SHOWLZL = false;
            }
            for (let tableIndex = 1, tabLength = sub.cells.length; tableIndex < tabLength; tableIndex++) {
              getSubComponents(sub.cells[tableIndex])
              let rows = sub.cells[tableIndex];
              let titleIndex = sub.titleIndex || 0;
              let lTitleIndex = titleIndex;
              let rTitleIndex = titleIndex;
              if (sub.lTitleIndex !== undefined && sub.lTitleIndex !== null) {
                lTitleIndex = sub.lTitleIndex;
              }
              if (sub.rTitleIndex !== undefined && sub.rTitleIndex !== null) {
                rTitleIndex = sub.rTitleIndex;
              }

              let title = ''
              if (lTitleIndex === rTitleIndex) {
                title = rows[lTitleIndex].title || rows[lTitleIndex].title1
              } else {
                title = getValueSwitchType(rows[lTitleIndex]);
              }
              let aa = {};
              aa.nchildtableForms = rows;
              aa.title = title;
              aa.nvalue = getValueSwitchType(rows[rTitleIndex]);
              // sub.cells[tableIndex]['title'] = title;
              // sub.cells[tableIndex].showCollapse = false;
              // sub.cells[tableIndex].nvalue = getValueSwitchType(rows[rTitleIndex]);
              // sub.cells[tableIndex].nchildtableForms = rows
              sub.ntableForms.push(aa)
            }
          } else if (subcomp === 'table_ccmx') {
            sub.ntableForms = [];
            sub.title = '明细信息'
            for (let tableIndex = 1, tabLength = sub.tableForms.length; tableIndex < tabLength; tableIndex++) {
              getSubComponents(sub.tableForms[tableIndex])
              let rows = sub.tableForms[tableIndex];
              let titleIndexS = rows.titleIndex_s || 2;
              let titleIndexE = rows.titleIndex_e || 3;
              let title = `${rows[titleIndexS].value} --> ${rows[titleIndexE].value}`
              sub.tableForms[tableIndex].title = title;
              sub.ntableForms.push(sub.tableForms[tableIndex])
            }
          }
        }
      }
      if (sub.editable && sub.component !== 'hidden') {
        data.EDITARR_.push(sub)
      }
    }
  }
  flowData.ID_ = data.ID_
  flowData.PERNR_ = data.PERNR_
  flowData.APPID_ = data.APPID_
  flowData.POSTID_ = data.POSTID_
  flowData.APPDA_ = data.APPDA_
  flowData.EDITARR_ = data.EDITARR_
  flowData.FLOWSHOW = data.FLOWSHOW
  flowData.fileUrls = data.fileUrls;
  return flowData;
}

function getSubComponents(subData) {
  for (let sub of subData) {
    if (sub.showLinkage && sub.showLinkage.length > 0) {
      ifHidden(sub)
    }
    if (sub.subComponents) {
      let subComp = sub.subComponents
      getSubComponents(subComp);
    } else {
      if (sub.flowshow) {
        data.FLOWSHOW.push(sub)
      }
      if (sub.name === 'pernr' && sub.component === 'hidden') {
        data.PERNR_ = sub.value
      }
      if (sub.name === 'appid') {
        data.APPID_ = sub.value
      }
      if (sub.name === 'postid') {
        data.POSTID_ = sub.value
      }
      if (sub.name === 'appda') {
        data.APPDA_ = dateFormatter.fmtDate(sub.value, 'yyyy-MM-dd') || ''
      }
      if (sub.name === 'id' && sub.component === 'hidden' && sub.title === '') {
        data.ID_ = sub.value || ''
      }
      sub.title = sub.title || sub.title1;
      let subcomp = sub.component
      if (childCompFlag.indexOf(subcomp) >= 0) { // 匹配需要解析的组件名，没有定义的不需要匹配
        if (subcomp === 'radio') { // radio
          if (sub.options) {
            for (let subOption of sub.options) {
              if (sub.value === subOption.value) {
                sub.nvalue = subOption.title || subOption.text
              }
            }
          } else {
            sub.nvalue = sub.value
          }
        } else if (subcomp === 'select' || subcomp === 'checkbox') { // select
          if (sub.options) {
            for (let selectSubOption of sub.options) {
              if (sub.value === selectSubOption.value) {
                sub.nvalue = selectSubOption.text || selectSubOption.title
              }
            }
          } else {
            sub.nvalue = sub.value
          }
        } else if (subcomp.indexOf('date') >= 0) {
          sub.nvalue = dateFormatter.fmtDate(sub.value, sub.dateFormat)
        } else if (subcomp === 'label') {
          sub.nvalue = sub.label;
        } else if (subcomp === 'text') {
          let valueStr = sub.value;
          //  此处判断是否有events events 为打开预览文件的标志，将数据保存到列表中，
          if (sub.events) {
            /**
             *  events 中有viewOther openUrl openHtml openDocument  openHtmlContent
             *  其中最常用的是 openDocument和 openUrl
             */
            data.fileparam = {}
            if (sub.events.eventType === 'openUrl') {
              data.fileparam.filename = sub.value;
              data.fileparam.fileurl = sub.events.openUrl;
            } else if (sub.events.eventType === 'openDocument') {
              // TODO
              data.fileparam.filename = sub.value;
              data.fileparam.afrescoid = sub.events.afrescoid;
            } else if (sub.events.eventType === 'openHtml') {
              // TODO
            } else if (sub.events.eventType === 'openHtmlContent') {
              // TODO
            }
            data.fileUrls.push(data.fileparam);
          }
          if (sub.datatype === 'money') {
            valueStr = fixMoney(sub.value) || 0;
          } else if (sub.datatype === 'money2dx') {
            valueStr = money2dx(sub.value) || 0;
          }
          sub.nvalue = valueStr;
        } else if (subcomp === 'comma_concat') {
          let commaValue = trimSepeter(sub.value, ',')
          if (sub.options) {
            let nvalue = ''
            for (let commaSubOption of sub.options) {
              let commaValueArr = commaValue.split(',')
              for (let cvalue of commaValueArr) {
                if (cvalue === commaSubOption.value) {
                  nvalue += commaSubOption.text + ',';
                  sub.nvalue = nvalue.substr(0, nvalue.length - 1);
                }
              }
            }
          } else {
            sub.nvalue = sub.value;
          }
        } else if (subcomp === 'table_form') {
          sub.ntableForms = [];
          subData.SHOWLZL = true
          if (sub.tableForms.length === 1) {
            subData.SHOWLZL = false;
          }
          for (let tableIndex = 1, tabLength = sub.tableForms.length; tableIndex < tabLength; tableIndex++) {
            getSubComponents(sub.tableForms[tableIndex])
            let rows = sub.tableForms[tableIndex];
            let titleIndex = sub.titleIndex || 0;
            let lTitleIndex = titleIndex;
            let rTitleIndex = titleIndex;
            if (sub.lTitleIndex !== undefined && sub.lTitleIndex !== null) {
              lTitleIndex = sub.lTitleIndex;
            }
            if (sub.rTitleIndex !== undefined && sub.rTitleIndex !== null) {
              rTitleIndex = sub.rTitleIndex;
            }

            let title = ''
            if (lTitleIndex === rTitleIndex) {
              title = rows[lTitleIndex].title || rows[lTitleIndex].title1
            } else {
              title = getValueSwitchType(rows[lTitleIndex]);
            }
            let aa = {};
            aa.nchildtableForms = rows;
            aa.title = title;
            aa.nvalue = getValueSwitchType(rows[rTitleIndex]);
            // sub.tableForms[tableIndex]['title'] = title;
            // sub.tableForms[tableIndex].showCollapse = false;
            // sub.tableForms[tableIndex].nvalue = getValueSwitchType(rows[rTitleIndex]);
            // sub.tableForms[tableIndex].nchildtableForms = rows
            sub.ntableForms.push(aa)
          }
        } else if (subcomp === 'table') {
          sub.ntableForms = [];
          subData.SHOWLZL = true
          if (sub.cells.length === 1) {
            subData.SHOWLZL = false;
          }
          for (let tableIndex = 1, tabLength = sub.cells.length; tableIndex < tabLength; tableIndex++) {
            getSubComponents(sub.cells[tableIndex])
            let rows = sub.cells[tableIndex];
            let titleIndex = sub.titleIndex || 0;
            let lTitleIndex = titleIndex;
            let rTitleIndex = titleIndex;
            if (sub.lTitleIndex !== undefined && sub.lTitleIndex !== null) {
              lTitleIndex = sub.lTitleIndex;
            }
            if (sub.rTitleIndex !== undefined && sub.rTitleIndex !== null) {
              rTitleIndex = sub.rTitleIndex;
            }

            let title = ''
            if (lTitleIndex === rTitleIndex) {
              title = rows[lTitleIndex].title || rows[lTitleIndex].title1
            } else {
              title = getValueSwitchType(rows[lTitleIndex]);
            }
            let aa = {};
            aa.nchildtableForms = rows;
            aa.title = title;
            aa.nvalue = getValueSwitchType(rows[rTitleIndex]);
            // sub.cells[tableIndex].title = title;
            // sub.cells[tableIndex].showCollapse = false;
            // sub.cells[tableIndex].nvalue = getValueSwitchType(rows[rTitleIndex]);
            // sub.cells[tableIndex].nchildtableForms = rows
            sub.ntableForms.push(aa)
          }
        } else if (subcomp === 'table_ccmx') {
          sub.ntableForms = [];
          for (let tableIndex = 1, tabLength = sub.tableForms.length; tableIndex < tabLength; tableIndex++) {
            getSubComponents(sub.tableForms[tableIndex])
            let rows = sub.tableForms[tableIndex];
            let titleIndexS = rows.titleIndex_s || 2;
            let titleIndexE = rows.titleIndex_e || 3;
            let title = `${rows[titleIndexS].value} --> ${rows[titleIndexE].value}`
            sub.tableForms[tableIndex].title = title;
            sub.tableForms[tableIndex].nchildtableForms = rows
            sub.ntableForms.push(sub.tableForms[tableIndex])
          }
        }
      }
    }
    if (sub.editable && sub.component !== 'hidden') {
      data.EDITARR_.push(sub)
    }
  }
}

function ifHidden(sub) { // 判断含有showLinkage的子项 然后搜索showLinkage的id 为 父类中name 的值 看是否包含
  let subD = data.flowData
  for (let item of sub.showLinkage) {
    let id = item.id
    let val = item.values || item.value
    if (!id || !val) {
      // window.alert(123)
      console.log('获取不到' + id + '或者' + val)
    }
    for (let sitem of subD) {
      let index = _.findLastIndex(sitem.subComponents, {id: id}) // 找到name是【id】在父类中的位置
      // 根据id 搜索而不是根据name 搜索
      if (index !== -1) {
        let subDVal = sitem.subComponents[index].value
        let isHidden = true;
        if (val.indexOf(subDVal) >= 0) { // 是否包含， 包含的话不用隐藏
          isHidden = false
        }
        sub.hidden = isHidden
      }
    }
  }
}
// 钱数转大写-正则
function money2dx(tag) {
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
};

// 格式化金额数字
function fixMoney(money) {
  if (money) {
    var tmpNumber = Number(money);
    if (tmpNumber === 0) {
      return '';
    }
    return Number(money).toFixed(2);
  } else {
    return ''
  }
};

function getValueSwitchType(comObj) {
  let type = comObj.component;
  if (type === 'label') {
    return comObj.label;
  } else if (type === 'radio' || type === 'select') {
    let optionsArray = comObj.options;
    let index;
    for (index = 0; index < optionsArray.length; index++) {
      let tmp = optionsArray[index];
      if (tmp.value === comObj.value) {
        return (typeof tmp.text === 'undefined' || tmp.text === null || tmp.text.length <= 0) ? tmp.title : tmp.text;
      }
    }
  } else {
    if (typeof comObj.datatype !== 'undefined' && comObj.datatype !== null && comObj.datatype.length > 0) {
      if (comObj.datatype === 'money') {
        return Number(comObj.value).toFixed(2);
      }
    }
    return comObj.value;
  }
}

function trimSepeter(str, sep, ssep) {
  if (typeof str === 'undefined' || str === null) {
    return '';
  }
  str = str.trim();
  var strs = str.split(sep);
  str = strs.join(' ');
  str = str.trim();
  strs = str.split(' ');
  if (typeof ssep === 'undefined' || ssep === null) {
    str = strs.join(',');
  } else {
    str = strs.join(ssep);
  }
  return str;
}

export function getFlowHistoryData(historyData) {
  let data = []
  if (historyData.current_task) {
    let dataParam = {}
    dataParam.content = historyData.current_task
    dataParam.totalDuration = historyData.totalDuration || ''
    data.push(dataParam)
  }
  if (historyData.comments) {
    let comments = historyData.comments
    // let tasknames = historyData.tasknames
    let usernames = historyData.usernames
    let positions = historyData.positions
    let signPositions = historyData.signPositions
    let types = historyData.types
    for (let c of comments) {
      let dataParam = {}
      // let taskname = tasknames[c.taskId];
      let typename = types[c.type];
      let user = usernames[c.userId];
      let positionname = positions[c.taskId];
       // 加签环节 不通过taskId取环节名
      if (signPositions[c.id] !== undefined) {
        positionname = signPositions[c.id]
      }
      dataParam.userId = c.userId;
      dataParam.content = `${positionname} - ${user} : ${typename}`
      dataParam.message = c.fullMessage
      dataParam.time = dateFormatter.fmtDate(c.time, 'yyyy-MM-dd hh:mm:ss')
      if (historyData.durations) {
        dataParam.duration = historyData['durations'][c.id]
      }
      data.push(dataParam)
    }
  }
  return data;
}
export default {
  getFlowData,
  getFlowHistoryData,
  ifHidden
}
