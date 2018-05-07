<template>
<div class="wxPay">
	<perHeader></perHeader>
	<loadError v-if="loadError"></loadError>
	<div class="container" v-else>
		<div class="box box-between">
			<div>订单提交成功，请尽快付款！订单号：{{orderInfo.orderNo}}</div>
			<div class="price-box">
				应付金额 <b>{{orderInfo.feeStr}}</b> 元<br>
				 <router-link :to="{ name: 'orderDetail', query:{ id: orderId} }">订单详情</router-link>
			</div>
		</div>
		<div class="wx-content-box">
			<div class="wx-title">
				微信支付
			</div>
			<div class="box box-between">
				<div class="qart-box box box-center">
					<div>
						<div class="box box-center">
							<vue-q-art :config="qartConfig" :downloadButton="downloadButton" v-if="wxLoad"></vue-q-art>
							<p class="text-center" style="margin-bottom:20px;" v-else>
								{{loadTips}}
							</p>
						</div>
						<div class="qart-tips-box text-center">
							请使用微信扫一扫<br>
							扫描二维码支付
						</div>
					</div>
				</div>
				<div class="">
					<img src="/static/img/wx-img.png">
				</div>
			</div>
			<div class="wx-bottom">
				<router-link class="box box-between" :to="{ path: '/Y2hvc2VQYXk', query: {id:orderId}}"><i><</i><p>选择其他支付方式</p></router-link>
			</div>
		</div>
	</div>
	<perFooter></perFooter>
</div>
</template>

<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
export default {
	name: 'chosePay',
	data() {
		return {
			loadError:false,
			orderId:this.$route.query.orderId,
			orderInfo:"",
			qartConfig: {
	            value: '',
	            imagePath: require('@/img/code-seize.jpg'),
	            filter: '',
				size: 50000,
	        },
			timeId:'',
	        downloadButton: false,
			wxLoad:false,
			loadTips: "二维码加载中..."
		}
	},
	components: {
		perHeader,
		perFooter,
	},
	methods: {
		initData: function() {
			let that = this;
			that.util.returnLogin(that);
			let params = {
				apiUrl: that.config.mallApi+"order/detail/"+that.$route.query.orderId,
				apiMethod: 'get',
			}
			that.ajaxData(params, function(res) {
				if (res.data.code="0000") {
					that.orderInfo = res.data.data;
					let data = {
						orderNo: res.data.data.orderNo
					}
					that.$ajax({
						method: "post",
						url: that.config.mallApi + "weixin/h5Pay",
						headers: {
							'Authentication': that.util.getCookie('token')
						},
						data: data,
					}).then(res => {
						that.qartConfig.value = res.data;
						that.wxLoad = res.data?true:false;
						if (res.data) {
							let timeId = setInterval(function(){
								let ispayParams = {
									apiUrl: that.config.mallApi + "order/ispay/" + that.orderInfo.orderNo,
									apiMethod: 'get',
								}
								that.ajaxData(ispayParams, function(res) {//订单详情
									if (res.data.code=="0000") {
										if(res.data.data==1){
											that.$router.push('/cGF5U3VjY2Vzcw?orderId='+that.orderInfo.id);
										}
									}else {
										console.log(res.data.message);
									}
								})
							},3000)
							that.timeId = timeId;
						}else {
							that.loadTips = "二维码加载失败";
						}
					}).catch(err => {
						alert(err.message+',请稍后再试');
					})
				}else {
					that.loadError=true;
				}
			})
		},
	},
	mounted() {
		this.initData();
	},
	destroyed(){
		clearInterval(this.timeId);
	}
}
</script>

<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('css/chosePay.less');
</style>
