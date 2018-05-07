<template>
<div class="mattersConcerned">
	<div class="returnBackGoods">
		<perHeader></perHeader>
		<div class="container">
			<el-row :gutter="20">
				<el-col :span="4">
					<leftBar :navNum="'41'" :leftIndex="['4']"></leftBar>
				</el-col>
				<el-col :span="20">
					<div class="help_right">
						<h3>退换货政策</h3>
						<p><span class="font-red">注：</span>该退换货政策仅适用于中威网商城区所购商品。</p>
						<div class="garyBg">退换货承诺</div>
						<p>中威网承诺：自您签收商品之日起7日内，为您提供退换货服务！</p>
						<div class="garyBg">退换货方式</div>
						<p>如签收后酒水有破、漏、损情况；请将订单号及问题酒水照片发至客服中心或发邮件至<b>service@cwhisky.com</b>;客服24小时内联系为您办理，请保持手机畅通。如有疑问，请拨打中威网客服中心电话400-830-5299人工咨询。</p>
						<div class="garyBg">退换货须知</div>
						<p>1、客户签收时应当场开箱验货，核对酒品种类、数量、规格、赠品、金额是否与订单一致，确认无误后再签收，若有问题，请及时拨打中威网客服热线400-830-5299沟通解决。</p>
						<p>2、在商品无任何问题情况下，自实际收到货物日期起7日内（老酒因生产和保存已有较长时间，外观品相等显陈旧，与新品有差异且无可比性，因此，不适用于7天无理由退换货），只要未使用且包装完好无损，可全额退货，运费需要您自行承担。</p>
						<p>3、客户办理退换货业务时，要求退换酒品包装完整且酒瓶未开启；酒品所附赠品和发票齐全且保存完好，如有开具发票，请将发票一同退回。如丢失发票的，不予办理退换货。</p>
						<p>4、请按客服人员提供的指定退换货地址进行退换货。为确保您的商品安全返回并能尽快收到退款，请您安全包装。</p>
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
	name: 'returnBackGoods',
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
