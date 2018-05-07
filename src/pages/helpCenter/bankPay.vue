<template>
<div class="mattersConcerned">
	<div class="bankPay">
		<perHeader></perHeader>
		<div class="container">
			<helpTop></helpTop>
			<el-row :gutter="20">
				<el-col :span="4">
					<leftBar :navNum="'23'" :leftIndex="['2']"></leftBar>
				</el-col>
				<el-col :span="20">
					<div class="help_right">
						<h3>银行汇款</h3>
						<p class="font-red">*注：当您通过银行汇完款后，请与我们的客服人员联系，说明您的汇款金额、汇款银行、汇款时间等，以便我们在第一时间处理您的订单，及时为您配送商品。银行汇款订单在下单6 小时后，如我公司未收到汇款，订单将被系统自动取消。</p>
						<p>银行汇款是目前比较有效快捷的支付方式，根据各个银行的情况，相同银行一般为实时到账。异地跨行大约需要2~7个工作日到帐，手续费也各不相同。可通过银行营业网点柜台、自助取款机、网上转账等方式付款。选择银行汇款支付的顾客，请在下单完成后尽快到银行柜台进行汇款，银行汇款订单在下单6 小时后，如我公司未收到汇款，订单将被系统自动取消。前确认，您已经充分阅读、理解并接受本协议的全部内容，一旦您选择本服务，即表示您同意遵循本协议的所有约定。</p>
						<p>全国各地区都可采用此种支付方式，汇款账户信息如下：</p>
						<p>
							<img src="../../img/bank.jpeg" width="80%" />
						</p>
						<p class="font-red">*温馨提示：</p>
						<p>1.当您通过银行汇完款后，请与我们的客服人员联系，说明您的汇款金额、汇款银行、汇款时间等，以便我们在第一时间处理您的订单，及时为您配送商品；</p>
						<p>2.银行汇款需持本人身份证到离您最近的银行办理异地（或同城）汇款业务；</p>
						<p>3.可持银行卡通过自助取款机进行转账操作，如果您的银行账号已开通网上汇款功能，也可以直接在网上进行操作，具体操作方法请参照相应银行官方网站的操作说明。</p>
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
	name: 'bankPay',
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
