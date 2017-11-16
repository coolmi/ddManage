import Vue from 'vue'
import Router from 'vue-router'
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
      component: require('@/views/Home'),
      meta: {title: '首页'}
    },
    {
      path: '/cs',
      component: require('@/views/cs'),
      meta: {title: '测试'}
    },
    {
      path: '/reserve',
      component: require('@/views/reserve/Reserve'),
      meta: {title: '备用金申请'}
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
      path: '/flowEdit',
      component: require('@/views/flow/flowEditContent'),
      meta: {title: '填写'}
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
      path: '*',
      component: require('@/views/error'),
      meta: {
        title: '错误',
        ddConfig: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.ddConfig) { // 如果ddConfig为ture 则进行授权jsAPI
    setDDConfig(to)
  }
  if (!to.meta.pullToRefresh) {
    dd.ui.pullToRefresh.disable()
  }
  typeof to.meta.title !== undefined && setDocumentTitle(to.meta.title) // 设置title

  setLeftBtn(to) // 设置左侧按钮
  setRightBtn(to) // 设置右侧按钮
  next();
});

let setDDConfig = function (to) {
  let path = store.state.ddstate.ddConfigPath || base.baseURL
  ding.jsApiOAuth(path).then((ddconfig) => {
    dd.config(ddconfig)
  }).catch(function (error) {
    ding.alertInfo(DEM.ddConfigInfoError);
  });
}

let setDocumentTitle = function (title) {
  let config = {
    title: title
  }
  dd.ready(function () {
    dd.biz.navigation.setTitle(config);
  });
  dd.error(function (err) {
    console.error('dd setTitle error: ' + window.location.href + JSON.stringify(err));
  });
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

