import ding from '@/lib/ding'
import APILIST from '@/api/apiBase'
import api from 'api'
import whole from '@/lib/whole';

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
  let dd = window.dd;
  let fujianUrl = APILIST.openDingfile_url + '?docmentafrescoid=' + params.docmentafrescoid + '&docmentafresconame=' + params.docmentafresconame + '&ispdf=' + params.ispdf;
  api.getDocument(fujianUrl, function (res) {
    dd.ready(function () {
      console.log(res)
      if (res.data && res.data.mediaId !== undefined && res.data.mediaId) {
        dd.biz.cspace.saveFile({
          corpId: ding.CORPID,
          url: res.data.mediaId,
          name: params.docmentafresconame,
          onSuccess: function (data) {
            console.log(data)
            let fname = data.data[0].fileName
            let index = fname.lastIndexOf('.');
            let type = fname.substr(index + 1, fname.length);
            dd.biz.cspace.preview({
              corpId: ding.CORPID,
              spaceId: data.data[0].spaceId,
              fileId: data.data[0].fileId,
              fileName: fname,
              fileSize: data.data[0].fileSize,
              fileType: type,
              onSuccess: function () {
                // 无，直接在native显示文件详细信息
              },
              onFail: function (err) {
                whole.showTop('预览失败')
                // 无，直接在native页面显示具体的错误
              }
            });
          },
          onFail: function (err) {
            window.alert(JSON.stringify(err));
          }
        });
      }
    })
  })
    // router.push({path: '/flowPdf', query: {params: JSON.stringify(params)}})
}

export default {
  openFj,
  openPdforDown
}
