<template>
<div class="mattersConcerned">
	<div class="invoiceIntr">
		<perHeader></perHeader>
		<div class="container">
			<helpTop></helpTop>
			<el-row :gutter="20">
				<el-col :span="4">
					<leftBar :navNum="'24'" :leftIndex="['2']"></leftBar>
				</el-col>
				<el-col :span="20">
					<div class="help_right">
						<div class="garyBg top-none">一、如何开具发票？</div>
						<p>1. 若您在中威网订购商品或竞拍拍品，在提交订单前选择“是否需要发票”，并填写相关内容，发票即可随商品一起发出；</p>
						<p>2. 您通过中威网客服中心委托竞拍，竞拍成功后您可将发票信息提供给工作人员，发票将随拍品一起寄出；</p>
						<p>3. 若您通过中威网客服中心订购商品，您可将发票信息提供给工作人员，发票将随商品一起寄出。</p>
						<div class="garyBg">二、开具发票注意事项</div>
						<p>1. 通过中威网商城区订购商品，您可选择开具发票，一个订单对应一张发票，发票将随同商品一起寄出；若您的发票寄送地址和收货地址不一致，中威网将提供一次免费寄送发票的服务；</p>
						<p>2. 中威网商城区提供的发票为酒类专用发票，此发票可用作单位报销使用；</p>
						<p>3. 配送费金额包含在订单发票金额中；</p>
						<p>4. 发票金额不能高于订单金额；</p>
						<p>5. 使用威币、红包、礼品卡、返现金额等支付的部分，不再开具发票；</p>
						<p>6. 发票抬头：个人或公司名称；</p>
						<p>7. 商城区发票内容：酒水或明细；</p>
						<p>8. 您在商城区订货后若不需要开具发票，我们将随商品为您开具“中威网销售单”以使您的售后服务得以保障；</p>
						<p>9. 中威网拍卖区所开发票原则上只针对您所支付的佣金，不包括您所得拍的拍品总价；如竞拍人需开金额发票，则须按法定税率补缴相应税款。</p>
						<div class="garyBg">三、补开、更换发票</div>
						<p>1. 补开发票以当月订单为准，即只可补开当月发票；</p>
						<p>2. 换商城区发票需提供“中威网销售单”或详细的订购信息；</p>
						<p>3. 请您提供正确的发票收件地址，我们会在补开发票后以快递的方式为您寄出，请您注意查收；</p>
						<p>4. 若因客户个人原因导致更换或补开发票，需由客户承担发票快递费用；</p>
						<p>5. 因发票抬头、内容或金额等情形需更换发票时，请您当月及时与中威网客服中心联系确认后，将原发票退回中威网后方予以重开。 </p>
						<p>发票寄至以下地址：广东省惠州市惠城区江北华贸金融街12号楼103 惠州市中威酒业有限公司财务部</p>
						<p>电话：400-830-5299&nbsp;&nbsp;&nbsp;&nbsp;邮编：516001</p>
						<p class="font-red">温馨提示：根据国家税务总局2017年第16号公告规定，自2017年7月1日起，对于购买方为企业的，索取增值税普通发票时，应向销售方提供纳税人识别号或统一社会信用代码。否则取得的未填写“购买方纳税人识别号”信息的增值税普通发票为不符合规定的发票，不得作为税收凭证。</p>
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
	name: 'invoiceIntr',
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
