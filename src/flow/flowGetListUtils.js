// 获取列表所需的参数
export function getList(item, type) {
  if (type === 'db') {
    return getDbList(item)
  } else if (type === 'sqz') {
    return getSqzList(item)
  } else if (type === 'ybl') {
    return getYblList(item)
  } else if (type === 'yjs') {
    return getYjsist(item)
  }
}

function getDbList(item) {
  let key = item.KEY_ || item.key_;
  let name = item.NAME_ || item.name_;
  // let taskDefKey = item.TASK_DEF_KEY_ || item.task_def_key_;
  let taskId = item.TASK_ID_ || item.task_id_;
  let procInstId = item.PROC_INST_ID_ || item.proc_inst_id_;
  let businessKey = item.BUSINESS_KEY_ || item.business_key_;
  let khcontent = getKhContent(item.mytitle || '')
  let flowParams = {
    KEY_: key,
    NAME_: name,
    TASK_ID_: taskId,
    PROC_INST_ID_: procInstId,
    BUSINESS_KEY_: businessKey,
    khcontent: khcontent
  }
  return flowParams
};

function getSqzList(item) {
  let key = item.KEY_ || item.key_;
  let name = item.PROCDEFNAME_ || item.procdefname_;
  let procInstId = item.PROC_INST_ID_ || item.proc_inst_id_;
  let businessKey = item.BUSINESS_KEY_ || item.business_key_;
  let khcontent = getKhContent(item.mytitle || '')
  let flowParams = {
    KEY_: key,
    NAME_: name,
    PROC_INST_ID_: procInstId,
    flowid: businessKey,
    BUSINESS_KEY_: businessKey,
    khcontent: khcontent
  }
  return flowParams
};

function getYblList(item) {
  let key = item.KEY_ || item.key_;
  let name = item.PROCDEFNAME_ || item.procdefname_;
  let title = item.NAME_ || item.name_;
  let procInstId = item.PROC_INST_ID_ || item.proc_inst_id_;
  let businessKey = item.BUSINESS_KEY_ || item.business_key_;
  let khcontent = getKhContent(item.mytitle || '')
  let flowParams = {
    KEY_: key,
    NAME_: name,
    PROC_INST_ID_: procInstId,
    flowid: businessKey,
    BUSINESS_KEY_: businessKey,
    title: title,
    khcontent: khcontent
  }
  return flowParams
};

function getYjsist(item) {
  console.log(item)
  let key = item.KEY_ || item.key_;
  let name = item.PROCDEFNAME_ || item.procdefname_;
  let procInstId = item.PROC_INST_ID_ || item.proc_inst_id_;
  let businessKey = item.BUSINESS_KEY_ || item.business_key_;
  let khcontent = getKhContent(item.mytitle || '')
  let flowParams = {
    KEY_: key,
    NAME_: name,
    PROC_INST_ID_: procInstId,
    flowid: businessKey,
    BUSINESS_KEY_: businessKey,
    khcontent: khcontent
  }
  return flowParams
};

function getKhContent(str) {
  if (str === '') {
    return ''
  } else {
    // 定义正则表达式对象，\表示转义字符,原点表示任意字符，+表示出现次数至少1次，igm表示忽略大小写，且全局匹配
    let pattern = new RegExp('\\((.| )+?\\)', 'igm');
    let res = str.match(pattern)
    return res !== null ? res[0] : ''
  }
}

export default {
  getList
}
