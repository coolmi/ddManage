<template>
  <transition name="fade">
    <div class="category-content">
      <div class="category-title"><span class="status-tips-round"></span><span>状态</span></div>
      <div>
        <ul class="status-option-ul">
          <li class="status-selected">全部</li>
          <li class="">审批完成</li>
          <li class="">审批中</li>
          <li class="">已撤销</li>
        </ul>
      </div>
      <div class="category-title"><span class="status-tips-round-category"></span><span>类型</span></div>
      <div>
        <ul class="status-category-ul">
          <li class="form-selected">全部</li>
          <li class="">请假</li>
          <li class="">出差</li>
          <li class="">外出</li>
          <li class="">加班</li>
          <li class="">报销</li>
          <li class="">物品领用</li>
          <li class="">通用审批</li>
          <li class="">采购</li>
          <li class="">付款</li>
          <li class="">绩效自评</li>
          <li class="">合同审批</li>
          <li class="">立项申请</li>
          <li class="">付款申请</li>
          <li class="">招聘</li>
          <li class="">调岗申请单</li>
          <li class="">离职申请单</li>
          <li class="">备用金申请</li>
          <li class="">用车申请</li>
          <li class="">用印申请</li>
          <li class="">转正</li>
          <li class="">离职</li>
          <li class="">补卡申请</li>
          <li class="">换班</li>
          <li class="">费用支出申请</li>
          <li class="">充值申请</li>
          <li class="">费用申请</li>
          <li class="">费用报销</li>
          <li class="">测试</li>
          <li class="">库存调整</li>
          <li class="">出入库管理</li>
        </ul>
      </div>
    </div>
  </transition>

</template>

<script>
</script>

<style scoped lang="less" type="text/less">
  @import '../../styles/pro/selectedFlag';
</style>
