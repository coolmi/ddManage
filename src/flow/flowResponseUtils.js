import ding from '@/lib/ding'
import api from 'api';
import whole from '@/lib/whole'
import FSM from '@/flow/flowShowMsg'

// 待办
export function getDBList(cb) {
  api.getDBList(function (res) {
    doResponse(res.data, function (page) {
      cb(page)
    })
  })
}

// 申请中
export function getSQZList(cb) {
  api.getSQZList(function (res) {
    doResponse(res.data, function (page) {
      cb(page)
    })
  })
}

// 已办理
export function getYBLList(cb) {
  api.getYBLList(function (res) {
    doResponse(res.data, function (page) {
      cb(page)
    })
  })
}

// 已结束
export function getYJSList(cb) {
  api.getYJSList(function (res) {
    doResponse(res.data, function (page) {
      cb(page)
    })
  })
}

export function doResponse(data, cb) {
  if (data.gmk_status) {
    togmkStatus(data);
    return;
  }
  if (data.error || data.err) {
    togmkStatus(data);
    return;
  }
  if (data.page) {
    cb(data.page)
  }
}

export function doViewResponse(data) {
  if (typeof data === 'string') {
    // eslint-disable-next-line
    data = eval('(' + data + ')');
  }
  if (data.result && data.result === 'success') {
    return true
  } else if (!data.result) {
    let errInfo = data.error || data.err;
    whole.showTop(errInfo)
    return false
  } else if (data.result === 'fail') {
    whole.showTop(FSM.flowOpenWait)
    return false
  } else {
    whole.showTop(FSM.flowOpenWait)
    return false
  }
}

function togmkStatus(data) {
  if (data.gmk_status === 'outtime' || data.gmk_status === 'reload') {
    // session超时
    ding.alertInfo(data.msg);
    return;
  }
  if (data.gmk_status === 'linkfail' || data.gmk_status === 'serverfail' || data.gmk_status === 'params_error') {
    // 服务连接错误
    ding.alertInfo(data.msg);
    return;
  }
  if (data.error || data.err) {
    let errInfo = data.error || data.err;
    ding.alertInfo(errInfo);
    // whole.showTop(errInfo);
  }
}

export default {
  getDBList,
  getSQZList,
  getYBLList,
  getYJSList,
  doResponse,
  doViewResponse
}
