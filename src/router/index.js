import Vue from 'vue'
import Router from 'vue-router'
// import api from 'api'
// import whole from '@/lib/whole'
// import dingUser from '@/lib/dingUser'
import store from '@/store'
import base from '@/api/baseConfig'
import ding from '@/lib/ding'
import DEM from '@/lib/dingErrMessage'

Vue.use(Router)
let dd = window.dd;
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: require('@/views/Home')
      // meta: {title: ''}
    },
    {
      path: '/cs',
      component: require('@/views/cs'),
      meta: {title: '测试'}
    },
    {
      path: '/saveList',
      component: require('@/views/saveList'),
      meta: {title: '申请保存列表'}
    },
    {
      path: '/newLeave',
      component: require('@/views/newleave/NewLeave'),
      meta: {title: '员工休假申请'}
    },
    {
      path: '/accredit',
      component: require('@/views/newleave/accredit'),
      meta: {title: '工作授权表单'}
    },
    {
      path: '/connect',
      component: require('@/views/newleave/toConnect'),
      meta: {title: '工作交接表单'}
    },
    {
      path: '/newLeaveBackList',
      component: require('@/views/newleaveback/NewLeaveBackList'),
      meta: {title: '员工提前中止休假申请列表'}
    },
    {
      path: '/newLeaveBack',
      component: require('@/views/newleaveback/NewLeaveBack'),
      meta: {title: '员工提前中止休假申请'}
    },
    {
      path: '/overTime',
      component: require('@/views/overtime/OverTime'),
      meta: {title: '员工值班申请'}
    },
    {
      path: '/businessTrip',
      component: require('@/views/businessTrip/BusinessTrip'),
      meta: {title: '员工出差申请'}
    },
    {
      path: '/AddBusinessTrip',
      component: require('@/views/businessTrip/AddBusinessTrip'),
      meta: {title: '出差申请明细'}
    },
    {
      path: '/pbInfo',
      component: require('@/views/businessTrip/pbInfo'),
      meta: {title: '排班信息'}
    },
    {
      path: '/reserve',
      component: require('@/views/reserve/Reserve'),
      meta: {title: '备用金申请', ddConfig: true}
    },
    {
      path: '/addReserve',
      component: require('@/views/reserve/AddReserve'),
      meta: {title: '添加备用金'}
    },
    {
      path: '/travel',
      component: require('@/views/travel/Travel'),
      meta: {title: '出差申请'}
    },
    {
      path: '/addTravel',
      component: require('@/views/travel/AddTravel'),
      meta: {title: '添加明细'}
    },
    {
      path: '/preim',
      component: require('@/views/reimbur/PersonReim'),
      meta: {title: '个人报销'}
    },
    {
      path: '/addPreim',
      component: require('@/views/reimbur/AddPersonReim'),
      meta: {title: '添加报销明细'}
    },
    {
      path: '/db',
      component: require('@/views/flow/DbList'),
      meta: {title: '列表', pullToRefresh: true}
    },
    {
      path: '/flowHandle',
      component: require('@/views/flow/FlowHandle'),
      meta: {title: '详情', ddConfig: true}
    },
    {
      path: '/flowQuery',
      component: require('@/views/flow/FlowQuery'),
      meta: {title: '查看', ddConfig: true}
    },
    {
      path: '/flowDetails',
      component: require('@/views/flow/flowDetails'),
      meta: {title: '明细'}
    },
    {
      path: '/flowHtml',
      component: require('@/views/flow/flowHtml'),
      meta: {title: '详细信息'}
    },
    {
      path: '/flowEdit',
      component: require('@/views/flow/flowEditContent'),
      meta: {title: '填写', ddConfig: true}
    },
    {
      path: '/flowIdea',
      component: require('@/views/flow/FlowWriteIdea'),
      meta: {title: '审批意见', ddConfig: true}
    },
    {
      path: '/flowPdf',
      component: require('@/views/flow/flowPdfView'),
      meta: {title: '预览', ddConfig: true}
    },
    {
      path: '/about',
      component: require('@/views/other/about'),
      meta: {title: '关于'}
    },
    {
      path: '/newFunc',
      component: require('@/views/other/newFunc'),
      meta: {title: '新功能介绍'}
    },
    {
      path: '/error',
      component: require('@/views/error'),
      meta: {
        title: '错误',
        ddConfig: true
      }
    },
    {
      path: '/asd',
      component: require('@/views/draggable/draggable'),
      meta: {title: '新凤祥工作台'}
    },
    {
      path: '/itops',
      component: require('@/views/ITops/itops'),
      meta: {title: 'IT运维派单申请'}
    },
    {
      path: '/myFlow',
      name: 'myFlow',
      component: require('@/views/flow/myFlow'),
      children: [
        {
          path: '/',
          name: 'myFlowList',
          component: require('@/views/flow/myFlowList')
        },
        {
          path: 'selected',
          name: 'selectedFlag',
          component: require('@/views/flow/selectedFlag')
        },
        {
          path: 'sd',
          name: 'selectedDate',
          component: require('@/views/flow/selectedDate')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
// else if ((to.fullPath === '/flowHandle' || to.fullPath === '/flowQuery') && !getRequestAuthCode()) {
//     next(false)
//   }
  if (dd.version === null && to.fullPath.indexOf('/cs') < 0) {
    // window.alert('请在钉钉手机端打开')
    // next(false)
    next()
  } else {
    if (to.meta.ddConfig) { // 如果ddConfig为ture 则进行授权jsAPI
      setDDConfig(to)
    }
    if (!to.meta.pullToRefresh) {
      dd.ui.pullToRefresh.disable()
    }
    typeof to.meta.title !== undefined && setDocumentTitle(to.meta.title) // 设置title

    if (to.meta.leftBtn) {
      setLeftBtn(to) // 设置左侧按钮
    }
    if (to.meta.rightBtn) {
      setRightBtn(to) // 设置右侧按钮
    }
    next();
  }
});

let setDDConfig = function (to) {
  let path = store.state.ddstate.ddConfigPath || base.baseURL
  ding.jsApiOAuth(path).then((ddconfig) => {
    dd.config(ddconfig)
  }).catch(function (error) {
    ding.alertInfo(DEM.ddConfigInfoError);
  });
}

// let getRequestAuthCode = function () {
//   let path = store.state.ddstate.ddConfigPath || base.baseURL
//   let result = true
//   dingUser.getRequestAuthCode(path).then((data) => {
//     api.getLogin(data, function (res) {
//       if (res.data.code) {
//         result = true
//       } else {
//         whole.showTop('获取钉钉免登权限失败')
//         result = false
//       }
//     })
//   })
//   return result;
// }

let setDocumentTitle = function (title) {
  if (title !== undefined) {
    let config = {
      title: title
    }
    dd.ready(function () {
      dd.biz.navigation.setTitle(config);
    });
    dd.error(function (err) {
      console.error('dd setTitle error: ' + window.location.href + JSON.stringify(err));
    });
  }
};

let setLeftBtn = function (to) {
  let config = {
    text: '返回'
  }
  let leftConfig = to.meta.leftBtn || config;
  dd.ready(function () {
    dd.biz.navigation.setLeft(leftConfig);
  });
  dd.error(function (err) {
    console.error('dd setLeftBtn error: ' + window.location.href + JSON.stringify(err));
  });
};

let setRightBtn = function (to) {
  let config = {
    text: '更多'
  }
  let rightConfig = to.meta.rightBtn || config;
  dd.ready(function () {
    dd.biz.navigation.setRight(rightConfig);
  });
  dd.error(function (err) {
    console.error('dd setRightBtn error: ' + window.location.href + JSON.stringify(err));
  });
};

export default router;
