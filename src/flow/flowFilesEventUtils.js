import ding from '@/lib/ding'
import router from '@/router'
export function openFj(file) {
  let dd = window.dd
  let params = {
    viewstatus: file.viewstatus, // 是否有pdf预览
    docmentafrescoid: file.afrescoid,
    docmentafresconame: file.filename
  }
  dd.device.connection.getNetworkType({
    onSuccess: function (data) {
      if (data.result === 'wifi') {
        openPdforDown(params)
      } else if (data.result === 'none' || data.result === 'none') {
        ding.alertInfo('暂无网络连接')
      } else {
        dd.device.notification.confirm({
          message: '你现在使用的是运营商网络，是否继续操作',
          title: '提示',
          buttonLabels: ['是', '否'],
          onSuccess: function (result) {
            if (result.buttonIndex === 0) {
              openPdforDown(params)
            }
          },
          onFail: function (err) {
          }
        });
      }
    },
    onFail: function (err) {
    }
  });
}

export function openPdforDown(params) {
    router.push({path: '/flowPdf', query: {params: JSON.stringify(params)}})
}

export default {
  openFj,
  openPdforDown
}
