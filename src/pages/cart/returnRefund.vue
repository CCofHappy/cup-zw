<template>
  <div class="returnRefund">
    <perHeader></perHeader>
    <div class="container">
      <div class="top-nav">
          首页 > 个人中心 > 退货退款
      </div>
      <div class="return-step-box box box-center">
        <div class="img-box box box-center">
          <div class="step-text text-center box" :class="{active:step> 0}">
            <div class="num">1</div>申请退货退款
          </div>
          <img src="../../img/background/return-active-1.png">
        </div>
        <div class="img-box box box-center">
          <div class="step-text text-center box" :class="{active:step> 1}">
            <div class="num">2</div>中威处理申请
          </div>
          <img src="../../img/background/return-active-2.png" v-if="step > 1">
          <img src="../../img/background/return-1.png" v-else>
        </div>
        <div class="img-box box box-center" v-if="returnGoods">
          <div class="step-text text-center box" :class="{active:step> 2}">
            <div class="num">3</div>买家退货
          </div>
          <img src="../../img/background/return-active-2.png" v-if="step > 2">
          <img src="../../img/background/return-1.png" v-else>
        </div>
        <div class="img-box box box-center">
          <div class="step-text text-center box" :class="{active:step> 3}">
            <div class="num">{{returnGoods?4:3}}</div>退款完毕
          </div>
          <img src="../../img/background/return-active-3.png" v-if="step > 3">
          <img src="../../img/background/return-2.png" v-else>
        </div>
      </div>
      <div class="return-refund-form" v-if="step==1">
        <el-form :model="returnRefundForm" :rules="rules" ref="returnRefundForm" label-width="100px">
          <el-form-item label="服务类型：" prop="type">
            <el-radio-group v-model="returnRefundForm.type" size="small">
              <el-radio label="1" border>仅退款</el-radio>
              <el-radio label="2" border>退款退货</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="退款原因：" prop="reason">
            <el-select v-model="returnRefundForm.reason" placeholder="请选择">
              <el-option label="不喜欢" value="shanghai"></el-option>
              <el-option label="质量太差" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品件数：" prop="count" class="count-input">
            <el-input v-model="returnRefundForm.count"></el-input>
          </el-form-item>
          <el-form-item label="退款金额：" prop="price" class="price-input">
            <el-input v-model="returnRefundForm.price"></el-input>
          </el-form-item>
          <el-form-item label="退款说明：" prop="desc">
            <el-input type="textarea" :rows="4" v-model="returnRefundForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="submit-btn">提交申请</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="return-apply-box" v-if="step==2">
        <div class="big-tips">
          中威已收到您的申请，正在处理中。
        </div>
        <div class="time-tips">
          剩余时间：68小时30分22秒
        </div>
        <div class="small-tips">
          您已成功发起退款申请，中威将在三个工作日内审核您的申请，请耐心等待。
        </div>
        <el-button type="primary" @click="onSubmit" class="submit-btn">撤销申请</el-button>
        <div class="goods-list-box">
          <div class="title">
            退货商品
          </div>
        </div>
      </div>
    </div>
    <perFooter></perFooter>
  </div>
</template>

<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import proList from '@/components/product/proList'
export default {
  name: 'returnRefund',
  data () {
    return {
      returnGoods: true,
      step: 1,
      returnRefundForm:{
        type: '1',
        reason: '',
        count:  '',
        price:  '',
        desc: '',
      },
      rules: {
        type: [
          { required: true },
        ],
        count: [
          { required: true },
        ],
        price: [
          { required: true },
        ],
      }
    }
  },
  components: {
    perHeader,
    perFooter,
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import url('../../css/less-const.less');//引入less变量
@import url('css/returnRelund.less');//引入相关推荐样式
</style>
