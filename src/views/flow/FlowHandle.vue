<template>
  <div>
    <div class="content">
      <!--<sticky>-->
      <flow-list-card> <!--@on-click-card="openPerInfoPage"-->
        <div slot="header" class="flow_list_card_hd flow_list_card_hd_bottom">
          <div class="flow_list_card_hd_left">
            <span>{{contentdata.name}}<span style="font-size: .85rem; padding: 0 6px">{{flowParams.khcontent}}</span></span>
          </div>
          <!--<div class="flow_list_card_hd_right">-->
          <!--<span>NO.{{contentdata.APPID_}}</span>-->
          <!--</div>-->
        </div>
        <div slot="content" class="flow_list_card_content" v-if="contentdata.nachn" @click="openPerInfoPage">
          <div class="flow_list_card_content_a" @click="openPerInfoPage">
            <div class="flow_list_card_content_div">
              <div>姓名</div>
              <div class="flow_list_card_content_li_span">{{contentdata.nachn}}</div>
            </div>
            <div class="flow_list_card_content_div" v-if="contentdata.stext">
              <div>岗位</div>
              <div class="flow_list_card_content_li_span">{{contentdata.stext}}</div>
            </div>
            <div class="flow_list_card_content_div" v-if="contentdata.APPDA_">
              <div>申请日期</div>
              <div class="flow_list_card_content_li_span">{{contentdata.APPDA_}}</div>
            </div>
          </div>
        </div>
        <div slot="footer">
          <div class="flow_list_card_ft_left">
            <div class="timeline" @click="openHistory(flowHistory)" v-if="cardHistoryData.length > 1">
              <ul>
                <li class="timeline-item">
                  <div class="timeline-item-color timeline-item-head"><i
                    class="timeline-item-checked weui-icon weui_icon_success_no_circle weui-icon-success-no-circle"></i>
                  </div>
                  <div class="timeline-item-tail" style=""></div>
                  <div class="timeline-item-content">
                    <p @click="openHistory(flowHistory)">上一环节：{{cardHistoryData[1].content, 20 | subTitle}}</p>
                    <p class="recent">{{cardHistoryData[1].message, 20 | subTitle}}</p>
                    <!--style="border-bottom: 1px dashed rebeccapurple"-->
                  </div>
                </li>
                <li class="timeline-item">
                  <div class="timeline-item-color timeline-item-head timeline-item-head-first"><i
                    class="timeline-item-checked weui-icon weui_icon_success_no_circle weui-icon-success-no-circle"
                    style="display: none;"></i></div>
                  <div class="timeline-item-tail" style="display: none;"></div>
                  <div class="timeline-item-content">
                    <p @click="openHistory(flowHistory)">{{cardHistoryData[0].content, 20 | subTitle}}</p>
                  </div>
                </li>
              </ul>
            </div>
            <p v-else-if="cardHistoryData.length = 1" @click="openHistory(flowHistory)" style="padding-bottom: 6px;"><span><img src="static/images/je.png" width="13" height="13"
                                                            style="padding-top: 5px; padding-right: 2px"></span>{{(flowHistory.current_task
              ? flowHistory.current_task : '当前节点：审批中'), 20 | subTitle}}</p>
            <div v-if="cardHistoryData.length > 0"
                 @click="openHistory(flowHistory)"
                 style="text-align: center; padding:5px 0; margin-bottom: 5px; color: #A0A0A0; border: 1px dashed #ECECEC">点击查看详细审批记录 ></div>
            <p @click="openFjList" v-if="!showLeftPop"><span><img src="static/images/fj.png" width="12" height="12"
                                              style="padding-right: 2px; margin-top: 12px;"></span>{{flowFiles.length
              !== 0 ? '附件个数：' + flowFiles.length : '无附件'}}</p>
            <p @click="showLeftPop = false" v-else >
              <span>
                <img src="static/images/fj.png" width="12" height="12"
                         style="padding-right: 2px; margin-top: 12px;">
              </span>
              隐藏附件
            </p>
          </div>
        </div>
        <!--<div slot="footer" @click="openHistory(flowHistory)">-->
        <!--<div class="flow_list_card_ft_left">-->
        <!--<p>{{(flowHistory.current_task ? flowHistory.current_task : '当前节点：审批中'), 15 | subTitle}}</p>-->
        <!--</div>-->
        <!--</div>-->
      </flow-list-card>
      <!--</sticky>-->
      <!--附件列表-->
      <group v-show="showLeftPop">
          <cell VHidden @click.native="openFj(file)" v-for="(file, index) in flowFiles" :key="index"
                :title="(index + 1) + ': ' + file.filename" is-link></cell>
          <!--<flow-child-card VHidden @click.native="openFj(file)" v-for="(file, index) in flowFiles" :key="index"-->
                           <!--:title="(index + 1) + ': ' + file.filename">-->
            <!--&lt;!&ndash;{{file.filename, 10 | subTitle}}&ndash;&gt;-->
          <!--</flow-child-card>-->
      </group>
      <!--循环列表-->
      <flow-content :contentdata="contentdata"></flow-content>
    </div>
    <flow-button :buttonArr="buttonArr" :zin="zin" :flowParams="flowParams" :handleInfos="handleInfos"
                 v-show="showButton"></flow-button>

    <div v-transfer-dom>
      <popup v-model="showRightPop" position="right" width="76%">
        <flow-history-content :historyData="historyData"></flow-history-content>
      </popup>
    </div>
  </div>
</template>

<script>
  import FlowListCard from 'comp/FlowListCard'
  import FlowChildCard from 'comp/FlowChildCard'
  import {TransferDom, Group, Cell, Popup, Timeline, TimelineItem, Sticky} from 'vux'
  import FlowButton from 'comp/FlowButton';
  import FlowContent from 'comp/FlowContent';
  import FlowHistoryContent from 'comp/FlowHistoryContent';
  import flowRU from '@/flow/flowResponseUtils'
  import FDUtils from '@/flow/flowDataUtils';
  import FBtnUtils from '@/flow/flowButtonUtils';
  import FSM from '@/flow/flowShowMsg'
  import FFEU from '@/flow/flowFilesEventUtils'
  import ding from '@/lib/ding'
  import dingUser from '@/lib/dingUser'
  import api from 'api'
  import whole from '@/lib/whole'

  export default {
    directives: {
      TransferDom
    },
    components: {
      FlowListCard,
      FlowChildCard,
      Popup,
      Timeline,
      TimelineItem,
      FlowButton,
      FlowContent,
      FlowHistoryContent,
      Group,
      Cell,
      Sticky
    },
    data() {
      return {
        showButton: true,
        showLeftPop: false,
        showRightPop: false,
        buttonArr: [],
        flowParams: {},
        handleInfos: {},
        flowdata: {},
        contentdata: {},
        historyData: [],
        cardHistoryData: [],
        flowFilesData: [],
        flowFiles: [],
        flowHistory: [],
        userid: '',
        zin: ''
      };
    },
    beforeRouteEnter(to, from, next) {
      var reg = new RegExp('(^|&)' + 'zin' + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r !== null) {
        dingUser.getRequestAuthCode(window.location.href).then((data) => {
          api.getLogin(data, function (res) {
            if (res.data.code) {
              if (!(from.path.indexOf('/flowIdea') >= 0) && !(from.path.indexOf('/flowDetails') >= 0) && !(from.path.indexOf('/flowEdit') >= 0) && !(from.path.indexOf('/flowPdf') >= 0)) { // 只有在列表进来的时候才会判断此流程是否有效，为了防止从flowIdea, flowDetails页面返回到此页的多余判断
                whole.busy()
                api.getHandleInfo(to.query.flowParams, function (res) {
                  whole.leave()
                  if (res.data && (typeof res.data === 'string') && res.data.indexOf('<!DOCTYPE html>') >= 0) {
                    let dd = window.dd
                    dd.device.notification.confirm({
                      message: '没有相应的任务,该任务可能已办理完,请到已办理列表中查看',
                      title: '提示',
                      buttonLabels: ['待办列表'], // , '返回上层'
                      onSuccess: function(result) {
                        if (result.buttonIndex === 0) {
                          let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code')
                          window.location.href = 'dingtalk://dingtalkclient/page/link?url=' + encodeURI('http://dingtalk.gmkholdings.com?dingtalk_code=' + dingtalkCode + '&lzlindex=1')
                        } else if (result.buttonIndex === 1) {
                          dd.biz.navigation.close({
                            onSuccess: function(result) {
                            },
                            onFail: function(err) {}
                          })
                        }
                      },
                      onFail: function(err) {}
                    });
                    return
                  }
                  if (flowRU.doViewResponse(res.data)) {
                    if (!res.data.flag) {
                      let dd = window.dd
                      dd.device.notification.confirm({
                        message: '没有相应的任务,该任务可能已办理完,请到已办理列表中查看',
                        title: '提示',
                        buttonLabels: ['待办列表'],
                        onSuccess: function(result) {
                          if (result.buttonIndex === 0) {
                            let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code')
                            window.location.href = 'dingtalk://dingtalkclient/page/link?url=' + encodeURI('http://dingtalk.gmkholdings.com?dingtalk_code=' + dingtalkCode + '&lzlindex=1')
                          } else if (result.buttonIndex === 1) {
                            dd.biz.navigation.close({
                              onSuccess: function(result) {
                              },
                              onFail: function(err) {}
                            })
                          }
                        },
                        onFail: function(err) {}
                      });
                    } else {
                      next(vm => {
                        vm._data.zin = 'zin'
                      })
                    }
                  } else {
                    next(false)
                  }
                })
              } else {
                next()
              }
            } else {
              whole.showTop('获取钉钉免登权限失败')
              next(false)
            }
          })
        })
      } else {
        if (!(from.path.indexOf('/flowIdea') >= 0) && !(from.path.indexOf('/flowDetails') >= 0) && !(from.path.indexOf('/flowEdit') >= 0) && !(from.path.indexOf('/flowPdf') >= 0)) { // 只有在列表进来的时候才会判断此流程是否有效，为了防止从flowIdea, flowDetails页面返回到此页的多余判断
          whole.busy()
          api.getHandleInfo(to.query.flowParams, function (res) {
            whole.leave()
            if (flowRU.doViewResponse(res.data)) {
              next()
            } else {
              next(false)
            }
          })
        } else {
          next()
        }
      }
    },
    created() {
//      this.setRightMenu();
      let flowParams = JSON.parse(this.$route.query.flowParams);
      this.flowParams = flowParams;
      this.getRouteHandleInfo(this.flowParams)
//      this.getAuthor();
    },
    watch: {
//      '$route'() {
//        console.log(123)
//        this.getRouteHandleInfo(this.flowParams)
//      },
      showRightPop(val) {
        if (!val) {
//          this.setRightMenu();
          let config = {
            show: true,
            text: '更多'
          }
          ding.setRight(config)
        }
      }
    },
    methods: {
      getAuthor() {
        let flowParams = this.flowParams;
        let _that = this;
        api.getAuthor(flowParams, function (authorRes) {
          // 按钮处理
          let buttonData = authorRes.data;
          if (buttonData.taskAuth) {
            let result = FBtnUtils.setFlowButton(buttonData.taskAuth);
            _that.buttonArr = result.btnArr;
            _that.flowParams.isjiaqian_ = !!result.isjiaqian // 按钮事件中用
            _that.flowParams.issignningA_ = result.issignningA // 按钮事件中用
            _that.flowParams.issignplushandleA = result.issignplushandleA // 按钮事件中用
          }
        })
      },
      // 获取流程信息
      getRouteHandleInfo(flowParams) {
        let _that = this;
        api.getHandleInfo(flowParams, function (res) {
          let data = res.data;
          if (typeof data === 'string') {
            // eslint-disable-next-line
            data = eval('(' + data + ')');
          }
          let flowdata = FDUtils.getFlowData(data); // 流程数据再处理
          _that.flowParams.ID_ = flowdata.ID_ // 按钮事件中用
          _that.flowParams.EDITARR_ = flowdata.EDITARR_ // 按钮事件中用 补填的字段
          _that.flowParams.APPID_ = flowdata.APPID_ // 按钮事件中用
          _that.flowParams.POSTID_ = flowdata.POSTID_ // 按钮事件中用
          _that.flowParams.APPDA_ = flowdata.APPDA_ // 按钮事件中用
          _that.handleInfos = flowdata
          // result fail
          if (flowdata.result && flowdata.result === 'success') {
            _that.contentdata = flowdata;
            _that.flowFiles = flowdata.files || [];
            _that.flowParams.selectPerson_ = flowdata.selectPerson // 按钮事件中用
            if (flowdata.commentMust) {
              _that.flowParams.commentMustable_ = flowdata.commentMust;
            }
            if (flowdata.commentMustMsg) {
              _that.flowParams.commentMustMsg_ = flowdata.commentMustMsg || '此环节意见必填';
            }
            api.getAuthor(flowParams, function (authorRes) {
              // 按钮处理
              let buttonData = authorRes.data;
              if (buttonData.taskAuth) {
                let result = FBtnUtils.setFlowButton(buttonData.taskAuth);
                _that.buttonArr = result.btnArr;
                _that.flowParams.isjiaqian_ = !!result.isjiaqian // 按钮事件中用
                _that.flowParams.issignningA_ = result.issignningA // 按钮事件中用
                _that.flowParams.issignplushandleA = result.issignplushandleA // 按钮事件中用
              }
            })
            _that.getDingUserInfo(flowdata.PERNR_)
            _that.getHistory();
            _that.getFlowFiles();
            // PC端审批
            if (flowdata.handleOnPC) {
              whole.showTop(FSM.handleOnPC)
              _that.showButton = false;
              return;
            }
          } else if (!flowdata.result) {
            let errInfo = flowdata.error || flowdata.err;
            _that.alertInfoAndGoBack(errInfo)
          } else if (flowdata.result === 'fail') {
            _that.alertInfoAndGoBack(FSM.flowOpenWait)
            return;
          } else {
            _that.alertInfoAndGoBack(FSM.flowOpenWait)
          }
        })
      },
      // 信息提示
      alertInfoAndGoBack(info) {
        whole.showTop(info);
      },
      // 设置右上角按钮
      setRightMenu() {
        let _that = this;
        let config = {
          backgroundColor: '#B19AF6',
          textColor: '#B19AF6',
          items: [
            {
              'id': '1',
//              'iconId': 'file',
              'text': '附件'
            },
            {
              'id': '2',
//              'iconId': 'time',
              'text': '记录'
            }
          ],
          onSuccess: function (data) {
            if (data.id === '1') { // 附件
              let params = {
                bussinessKey: _that.flowParams.BUSINESS_KEY_,
                NAME_: _that.flowParams.NAME_,
                processDefinitionKey: _that.flowParams.KEY_
              }
              api.getFlowFiles(params, function (res) {
                let data = res.data;
                if (data.error || data.err) {
                  whole.showTop(data.error || data.err)
                } else if (data.files.length <= 0) {
                  whole.showTop('暂无附件')
                } else {
                  let params = {
                    docmentafrescoid: data.files[0].afrescoid,
                    docmentafresconame: data.files[0].filename
                  }
                  api.openFlowFile(params, function (res) {
//                    console.log(res.data)
                  })
                  _that.flowFilesData = data.files;
                }
              })
            } else if (data.id === '2') { // 记录
              let params = {
                proc_inst_id: _that.flowParams.PROC_INST_ID_,
                postid: _that.flowParams.POSTID_,
                appda: _that.flowParams.APPDA_,
                NAME_: _that.flowParams.NAME_,
                KEY_: _that.flowParams.KEY_
              }
              api.getHistory(params, function (res) {
                let data = res.data;
                if (data.error || data.err) {
                  whole.showTop(data.error || data.err)
                } else {
                  _that.showRightPop = true;
                  let historyData = FDUtils.getFlowHistoryData(data)
                  _that.historyData = historyData
                  let config = {
                    show: true,
                    control: true,
                    text: '关闭记录',
                    onSuccess: function (data) {
                      _that.showRightPop = false;
                      _that.setRightMenu();
                    }
                  }
                  ding.setRight(config)
                }
              })
            }
          },
          onFail: function (err) {
          }
        }
        ding.setRightMenu(config)
      },
      // 打开钉钉人员page
      openPerInfoPage() {
        let dd = window.dd;
        let _that = this;
        dd.ready(function () {
          dd.biz.util.open({
            name: 'profile',
            params: {
              id: _that.userid,
              corpId: ding.CORPID
            },
            onSuccess: function () {
            },
            onFail: function (err) {
              console.log(err)
            }
          });
        })
      },
      // 根据pernr获取订单userid
      getDingUserInfo(pernr) {
        let _that = this;
        api.getDingUserInfo(pernr, function (res) {
          const userid = res.data.userid
          _that.userid = userid
        })
      },
      // 获取流程审批记录
      getHistory() {
        let _that = this;
        let params = {
          proc_inst_id: _that.flowParams.PROC_INST_ID_,
          postid: _that.flowParams.POSTID_,
          appda: _that.flowParams.APPDA_,
          NAME_: _that.flowParams.NAME_,
          KEY_: _that.flowParams.KEY_
        }
        api.getHistory(params, function (res) {
          let data = res.data;
          _that.flowHistory = data;
          let historyData = FDUtils.getFlowHistoryData(data)
          _that.cardHistoryData = historyData
        })
      },
      // 获取流程附件
      getFlowFiles() {
        let _that = this;
        let params = {
          bussinessKey: _that.flowParams.BUSINESS_KEY_,
          NAME_: _that.flowParams.NAME_,
          processDefinitionKey: _that.flowParams.KEY_
        }
        api.getFlowFiles(params, function (res) {
          let data = res.data;
          if (data.error || data.err) {
            whole.showTop(data.error || data.err)
          } else if (data.files.length <= 0) {
//            whole.showTop('暂无附件')
          } else {
            _that.flowFiles = data.files || [];
          }
        })
      },
      // 打开流程审批记录
      openHistory(data) {
        let _that = this;
        if (data.error || data.err) {
          whole.showTop(data.error || data.err)
        } else {
          this.showRightPop = true;
          let historyData = FDUtils.getFlowHistoryData(data)
          this.historyData = historyData
          let config = {
            show: true,
            control: true,
            text: '关闭记录',
            onSuccess: function (data) {
              _that.showRightPop = false;
              let config = {
                show: true,
                text: '更多'
              }
              ding.setRight(config)
            }
          }
          ding.setRight(config)
        }
      },
      // 打开附件列表
      openFjList() {
        if (this.flowFiles.length !== 0) {
          this.showLeftPop = true
        }
      },
      // 打开附件
      openFj(file) {
        FFEU.openFj(file)
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../styles/timeline.less';
  .text_span {
    text-align: center;
  }

  .center {
    padding-bottom: 60px;
  }

  .flow_list_card_content_a {
    display: flex;
  }

  .flow_list_card_content_b {
    display: flex;
  }

  .flow_list_card_content_div {
    flex: 1;
    .text_span
  }

  .flow_list_card_content_li_span {
    color: @theme-color;
    padding-top: 5px;
    .text_span
  }

  .flow_list_card_hd_left {
    flex: 1;
    text-align: left;
  }

  .flow_list_card_hd_right span {
    font-size: .7rem;
    color: @theme-color;
  }

  .itemTitle {
    margin-top: @item-title-margin-top;
    margin-bottom: @item-title-margin-bottom;
    padding-left: @itemGapH;
    padding-right: @itemGapH;
    color: @theme-color;
    font-size: @cell-tips-font-size;
  }
</style>
