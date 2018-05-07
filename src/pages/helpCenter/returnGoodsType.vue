<template>
<div class="mattersConcerned">
	<div class="returnGoodsType">
		<perHeader></perHeader>
		<div class="container">
			<el-row :gutter="20">
				<el-col :span="4">
					<leftBar :navNum="'43'" :leftIndex="['4']"></leftBar>
				</el-col>
				<el-col :span="20">
					<div class="help_right">
						<h3>退款方式及时间</h3>
						<p>
							<h4>一、 退款说明</h4></p>
						<p>1、为保证退款的及时性,我们只采取在线原路返回两种退款方式</p>
						<p>当日无法完成退款的情况：</p>
						<p>1) 招行超过限额。</p>
						<p>2) 招行他行卡需要联系客户取得账户的。</p>
						<p>3) 在线支付定金,定金和尾款要分开退的。</p>
						<p>2、普通快递，订单未签收/未送达，订单配送失败后，我们将在商品退回库房且鉴定通过后，为您办理退款手续。</p>
						<p>3、退货：在签收商品7日内（含7日）提交的退货申请且审核通过的订单，我们将在商品退回库房且鉴定通过后，为您办理退款手续。</p>
						<p>4、若订单中使用多种支付方式，退款时将按各种支付方式金额所占订单金额比例进行退款；</p>
						<p class="font-red">*温馨提示：</p>
						<p>1、若您想了解您订单的退款情况，您可通过“我的中威网-账户余额”进行查看。</p>
						<p>2、如您所购买的商品不是中威网导致所造成的，有关退款手续费以及退货运费由买家承担。</p>
						<h4>二、 退款成功提醒</h4>
						<p>中威网将退款申请提交成功后，以短信的方式告知您，请您根据以上到账时间进行查询。</p>
						<p class="font-red">*特别提示：</p>
						<p>1、中国银行的卡的退款时间较长。</p>
						<p>2、信用卡无卡支付退款到账时间7-15天。</p>
						<p>3、为了确保用户资金安全，当您需要把退款转账到指定帐号时，需提前联系客服登记信息，且退款的接受帐号户名必须与订单接收人姓名一致。</p>
					</div>
				</el-col>
			</el-row>
		</div>
		<perFooter></perFooter>
	</div>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftBar from './leftBar'
export default {
	name: 'returnGoodsType',
	data() {
		return {}
	},
	components: {
		perHeader,
		leftBar,
		perFooter
	},
	methods: {}
}
</script>

<style lang="less" scoped>
@import url('css/helpCenter.less');
</style>
