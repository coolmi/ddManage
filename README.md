# dding

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 目录说明
``` bash

# api 接口
1. api.js 所有接口请求
2. apiBase.js 流程有关接口地址
3. axiosConfig.js 网络请求配置
4. baseConfig.js 网络请求地址
5. whole.js 框架信息提示

# flow 流程所用js
1. flowDataUtils.js 流程数据处理
2. flowButtonNames.js 流程按钮名称设定
3. flowButtonUtils.js 流程按钮显示
4. flowShowMsg.js 流程信息提示
5. flowFilesEventUtils.js 流程附件事件
6. flowGetListUtils.js 组装获取列表所需的参数
7. flowResponseUtils 关于获取流程数据后处理错误的一些方式

# lib 第三方js 主要为钉钉所用的
1. ding.js 钉钉jsAPI封装
2. dateFormatter.js 日期处理
3. dingErrMessage.js 钉钉config错误提示
4. dingUser.js 钉钉免登
5. dingApiConfig 钉钉需要config的API的配置 true: 进行config； false：不进行
6. RavenConfig 监控

# components 组件
# filters vue过滤方法
# router 路由+钉钉配置
# store vuex
# styles css
# views 页面
# static 静态资源
```
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
