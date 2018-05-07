<template>
<div class="mattersConcerned">
	<div class="deliveryTime">
		<perHeader></perHeader>
		<div class="container">
			<helpTop></helpTop>
			<el-row :gutter="20">
				<el-col :span="4">
					<leftBar :navNum="'32'" :leftIndex="['3']"></leftBar>
				</el-col>
				<el-col :span="20">
					<div class="help_right">
						<div class="garyBg top-none">配送时间</div>
						<div class="leftIndent">
							<p>1、中威网为保包裹尽快送达，快递公司原则上每天24小时不间断提货，非特殊情况，每一笔订单都将在下单后24小时内发货。</p>
							<p>2、我们默认的配送方式为德邦快递、顺丰速运；如有特殊要求，请及时联络客服中心。</p>
							<p>3、若您订单时效较急，可联络客服中心为您安排空运，空运所产生的相关费用，由您承担。</p>
							<p>4、配送范围以德邦、顺丰的配送范围为主。</p>
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
	name: 'deliveryTime',
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
