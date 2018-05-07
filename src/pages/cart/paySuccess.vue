<template>
<div class="paySuccess">
	<perHeader></perHeader>
	<div class="container pay-success-content">
		<div class="box">
			<div class="left-box">
				<div>
					<icon name="tick-green" scale="6" class="icon"></icon>
				</div>
				<div class="green-blod">
					支付成功！<br>
					我们会尽快为您处理
				</div>
				<div class="jump-line">
					<router-link :to="{name:'orderDetail', query:{id:orderDetail.id}}">查看订单状态</router-link>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<router-link to="/YWxsR29vZHM">继续逛逛</router-link>
				</div>
			</div>
			<div class="right-box box-center box">
				订单号：{{orderDetail.orderNo}}<br>
				支付金额：{{orderDetail.fee}}元
			</div>
		</div>
		<div class="tip-box">
			重要提醒：不要点击陌生链接，不泄露银行卡和验证码信息，谨防诈骗！
		</div>
	</div>
	<perFooter></perFooter>
</div>
</template>

<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
export default {
	name: 'paySuccess',
	data() {
		return {
			orderDetail:"",
		}
	},
	components: {
		perHeader,
		perFooter,
	},
	methods: {
		initData(){
			let that = this;
			let params = {
				apiUrl: that.config.mallApi + "order/detail/" + that.$route.query.orderId,
				apiMethod: "get",
			}
			that.ajaxData(params, function(res) {
				if (res.data.code="0000") {
					that.orderDetail = res.data.data;
				}
			})
		}
	},
	mounted() {
		this.initData();
	}
}
</script>

<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('css/paySuccess.less');
</style>
