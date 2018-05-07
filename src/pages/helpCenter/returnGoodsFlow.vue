<template>
<div class="mattersConcerned">
	<div class="returnGoodsFlow">
		<perHeader></perHeader>
		<div class="container">
			<el-row :gutter="20">
				<el-col :span="4">
					<leftBar :navNum="'42'" :leftIndex="['4']"></leftBar>
				</el-col>
				<el-col :span="20">
					<div class="help_right">
						<h3>退货流程</h3>
						<p>
							<h4>一、 退货流程图</h4></p>
						<p>中威网为您提供了网上申请退货的服务，您只需进入账户中心“我的退换货”自助完成退货的申请。 </p>
						<p class="img-box"><img src="http://pic.secoo.com/imagesNew/featuresPic/r_help/thlc_1.gif?t=20150206" /></p>
						<p>
							<h4>二、 退货范围及周期</h4></p>
						<table width="50%" border="0" cellspacing="0" cellpadding="0" class="table_box">
							<tr>
								<td>办理方式：快递寄回办理退货</td>
								<td>退货范围：所有经客服退货确认的订单</td>
							</tr>
						</table>
						<p>办理周期：预计2个工作日(自中威网收到退货包裹直至退货包裹处理完毕)</p>
						<p><span class="font-red">*</span>注：退货商品寄回后均会进行鉴定，鉴定师确定无损后，我们会全款退还给购买者。 </p>
						<p>
							<h4>三、退货邮寄地址</h4></p>
						<p>退货地址：广东省惠州市惠城区江北华贸金融街12号楼103 中威退货组收<br /><br />电话：400-830-5299 邮编：516000</p>
						<p><span class="font-red">*</span>温馨提示 ：</p>
						<p>1.如在未经客服同意退货申请的情况下，直接将商品寄回网站，网站不承担保管、重新发货、退款责任，必要时网站有权处置滞留商品。</p>
						<p>2.因中威网原因产生的退换货邮寄费用由中威网承担，邮寄退货完成后请联系客服办理，邮寄费用不含保价费用。</p>
						<p>3.中威网的部分商品是由与中威网签约的商家提供的，商家商品的退换货地址请以商家提供的信息为准。</p>
						<p>
							<h4>四、 查询退货处理进程</h4></p>
						<p>1.将鼠标移到中威网首页顶端“个人中心”，选择“我的退换货”。 </p>
						<p class="img-box"><img src="http://pic.secoo.com/imagesNew/featuresPic/r_help/thlc_2.gif" /></p>
						<p>2.在“我的退换货”中点击“查看退货记录”进入退货申请详情，即可查到客服“审核意见”、退货处理进程等信息。 </p>
						<p class="img-box"><img src="http://pic.secoo.com/imagesNew/featuresPic/r_help/thlc_3.gif" /></p>
						<p>
							<h4>五、 退货时的注意事项</h4></p>
						<p>1.快递/邮寄时请认真填写您的姓名、收货地址、订单号、商品名称、退货原因等信息，否则将影响您的退货办理。</p>
						<p>2.如需检验报告的商品,您还需要提供检验报告。</p>
						<p>3.请您在收到商品7天内联系客服申请退货，否则将会影响您的退货办理。</p>
						<p>4.考虑到本站商品的特性，因此暂不支持换货。</p>
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
	name: 'returnGoodsFlow',
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
