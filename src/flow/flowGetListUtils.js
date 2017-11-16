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
  let flowParams = {
    KEY_: key,
    NAME_: name,
    TASK_ID_: taskId,
    PROC_INST_ID_: procInstId,
    BUSINESS_KEY_: businessKey
  }
  return flowParams
};

function getSqzList(item) {
  let key = item.KEY_ || item.key_;
  let name = item.PROCDEFNAME_ || item.procdefname_;
  let procInstId = item.PROC_INST_ID_ || item.proc_inst_id_;
  let businessKey = item.BUSINESS_KEY_ || item.business_key_;
  let flowParams = {
    KEY_: key,
    NAME_: name,
    PROC_INST_ID_: procInstId,
    flowid: businessKey,
    BUSINESS_KEY_: businessKey
  }
  return flowParams
};

function getYblList(item) {
  let key = item.KEY_ || item.key_;
  let name = item.PROCDEFNAME_ || item.procdefname_;
  let title = item.NAME_ || item.name_;
  let procInstId = item.PROC_INST_ID_ || item.proc_inst_id_;
  let businessKey = item.BUSINESS_KEY_ || item.business_key_;
  let flowParams = {
    KEY_: key,
    NAME_: name,
    PROC_INST_ID_: procInstId,
    flowid: businessKey,
    BUSINESS_KEY_: businessKey,
    title: title
  }
  return flowParams
};

function getYjsist(item) {
  let key = item.KEY_ || item.key_;
  let name = item.PROCDEFNAME_ || item.procdefname_;
  let procInstId = item.PROC_INST_ID_ || item.proc_inst_id_;
  let businessKey = item.BUSINESS_KEY_ || item.business_key_;
  let flowParams = {
    KEY_: key,
    NAME_: name,
    PROC_INST_ID_: procInstId,
    flowid: businessKey,
    BUSINESS_KEY_: businessKey
  }
  return flowParams
};

export default {
  getList
}
