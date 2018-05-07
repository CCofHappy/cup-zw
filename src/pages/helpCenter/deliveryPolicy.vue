<template>
<div class="mattersConcerned">
	<div class="deliveryPolicy">
		<perHeader></perHeader>
		<div class="container">
			<helpTop></helpTop>
			<el-row :gutter="20">
				<el-col :span="4">
					<leftBar :navNum="'31'" :leftIndex="['3']"></leftBar>
				</el-col>
				<el-col :span="20">
					<div class="help_right">
						<div class="garyBg top-none">配送费用</div>
						<div class="leftIndent">
							<p>1、中威网商城区全场消费实付金额满人民币300元包邮（除港澳台），实付金额不满人民币300元需加20元运费。 （温馨提示：实付金额指订单除使用返现金额、红包、优惠券及威币时所实际支付的金额）
							</p>
							<p>2、中威网拍卖区所有成交拍品全场包邮。</p>
							<p>3、若您订单时效较急，可联系我们的客服中心为您安排空运，空运所产生的相关费用，由您承担。</p>
						</div>
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
import helpTop from './helpTop'
export default {
	name: 'deliveryPolicy',
	data() {
		return {}
	},
	components: {
		perHeader,
		leftBar,
		perFooter,
		helpTop
	},
	methods: {}
}
</script>

<style lang="less" scoped>
@import url('css/helpCenter.less');
</style>
