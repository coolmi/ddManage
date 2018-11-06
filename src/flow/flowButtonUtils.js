export function setFlowButton(taskAuth) {
  if (typeof taskAuth !== 'undefined' && taskAuth !== null) {
    let result = {};
    let btnArr = [];
    let isAssignee = taskAuth.isAssignee;
    let isCandidate = taskAuth.isCandidate;
    let isDelegateTo = taskAuth.isDelegateTo;
    let isJoinlySign = taskAuth.isJoinlySign;
    let isDelegate = taskAuth.isDelegate;
    let suspensionState = taskAuth.suspensionState;
    let isMulti = taskAuth.isMulti;
    let determine = taskAuth.determine;
    let isOwner = taskAuth.isOwner;
    let issignning = taskAuth.issignning;
    let isusevoid = taskAuth.isusevoid;
    let isusebackto = taskAuth.isusebackto;
    let issignningA = '0';
    // 此处pc端用的是true or false 2018年05月09日13:26:58 by zbm
    let issignplushandleA = false;
    // let issignplushandleA = '0';
    if (issignning) issignningA = '1'
    if (!issignning && isAssignee) issignplushandleA = true
    // if (!issignning && isAssignee) issignplushandleA = '1'
    if (suspensionState === 1) {
      if (isOwner || isAssignee) {
        if (issignning) {
          // false：加签 true:非加签
          // 非加签
          if (isDelegate) {
            // 发送过转办
            if (isDelegateTo) {
              // btnstr = btnstr + '<input id=\'btn_handle_save\' type=\'button\' value=\'保存\' onclick=\'dofunc('btn_handle_save')\'/>';
              btnArr.push('tj', 'th')
              // 转办
              if (determine === 0) {
                // assignee或owner为岗位的节点才能转办
                btnArr.push('zb')
              }

              if (isMulti && isJoinlySign) {
                // 多实例节点--加签
                btnArr.push('jq')
              }

              if (isusevoid === undefined || isusevoid === true) {
                // 作废按钮
                // btnstr = btnstr + '<input id=\'btn_handle_void\' type=\'button\' value=\'作废\' onclick=\'dofunc('btn_handle_void')\'/>';
              }
              if (isusebackto !== 'undefined' && isusebackto === true) {
                // 驳回选关按钮
                // btnstr = btnstr + '<input id=\'btn_handle_backtoKey\' type=\'button\' value=\'驳回\' onclick=\'dofunc('btn_handle_backtoKey')\'/>';
              }
            }
          } else {
            btnArr.push('tj', 'th')

            // 未发送过转办

            // 转办
            if (determine === 0) {
              // assignee或owner为岗位的节点才能转办
              btnArr.push('zb')
            }
            if (isMulti && isJoinlySign) {
              // 多实例节点
              btnArr.push('jq')
            }

            if (isusevoid === undefined || isusevoid === true) {
              // 作废按钮
              // btnstr = btnstr + '<input id=\'btn_handle_void\' type=\'button\' value=\'作废\' onclick=\'dofunc('btn_handle_void')\'/>';
            }
            if (isusebackto !== 'undefined' && isusebackto === true) {
              // 驳回选关按钮
              // btnstr = btnstr + '<input id=\'btn_handle_backtoKey\' type=\'button\' value=\'驳回\' onclick=\'dofunc('btn_handle_backtoKey')\'/>';
            }
          }
        } else {
          // 加签
          if (isAssignee) {
            result.isjiaqian = true;
            // 加签时，只有办理人才能提交
            btnArr.push('tj')
          }
        }
      }

      if (isCandidate) {
        btnArr.push('qs')
      } else {
      }
    } else if (suspensionState === 2) {
      btnArr.push('other')
    } else if (suspensionState === 3) {
      btnArr.push('other')
    }
    result.btnArr = btnArr;
    result.issignningA = issignningA;
    result.issignplushandleA = issignplushandleA;
    return result;
  }
}
// {
//   "isSuitableOrsign": false,// true非会签 false会签
//   "isusevoid": false,//作废按钮
//   "isNew": true,
//   "btn_handle_back_jump": false,//驳回选环节
//   "isEnd": false,// 流程是否结束
//   "ishandlesumit": true,//办理提交按钮
//   "ishandleback": true,//退回按钮
//   "isusebackto": false,//任意跳转按钮
//   "ishandlesave": true,//办理保存按钮
//   "issignplushandle": false,//当前是否是加签环节
//   "isAssignee": false,
//   "isCirculate": true,//传阅按钮
//   "isOwner": true,
//   "isCandidate": false,//签收
//   "issignplus": true,//加签按钮
//   "isdelegate": true,//转办按钮
//   "isuseprint": false//打印按钮
// }
// is
// "btn_handle_back_jump": false,////驳回选环节
//   "isCandidate": false,//签收
//   "isCirculate": true,//传阅按钮
//   "isEnd": false,// 流程是否结束
//   "isSuitableOrsign": false,// true非会签 false会签
//   "isdelegate": true,//转办按钮
//   "ishandleback": true,//退回按钮
//   "ishandlesave": true,//办理保存按钮
//   "ishandlesumit": true,//办理提交按钮
//   "issignplus": true,//加签按钮
//   "issignplushandle": false,//当前是否是加签环节
//   "isusebackto": false,//任意跳转按钮
//   "isuseprint": false,//打印按钮
//   "isusevoid": false//作废按钮
export function setNewFlowButton(taskAuth) {
  if (typeof taskAuth !== 'undefined' && taskAuth !== null) {
    let result = {};
    let btnArr = [];
    let issignningA = taskAuth.issignplushandle ? '1' : '0';
    let issignplushandleA = taskAuth.issignplushandle;
    if (taskAuth.ishandlesumit) {
      btnArr.push('tj')
    }
    if (taskAuth.ishandleback) {
      btnArr.push('th')
    }
    if (taskAuth.issignplus) {
      btnArr.push('jq')
    }
    if (taskAuth.isdelegate) {
      btnArr.push('zb')
    }
    if (taskAuth.isCandidate) {
      btnArr.push('qs')
    }
    if (taskAuth.isSuitableOrsign) {
      btnArr.push('hq')
    }
    if (taskAuth.isCirculate) {
      btnArr.push('cy')
    }
    if (taskAuth.isusevoid) {
      btnArr.push('zf')
    }
    result.btnHandleBackJump = taskAuth.btn_handle_back_jump;
    result.btnArr = btnArr;
    result.issignningA = issignningA;
    result.issignplushandleA = issignplushandleA;
    return result;
  }
}

export default {
  setNewFlowButton,
  setFlowButton
}
