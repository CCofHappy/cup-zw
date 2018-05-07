<template>
<div class="chosePay">
	<cwHeader></cwHeader>
	<loadError v-if="loadError"></loadError>
	<div class="container" v-else>
		<div class="pay-top">
			<div class="tips box box-align-center">
				<icon name="tick-green" scale="4" class="icon"></icon><b>订单提交成功，现在只差最后一步啦！</b>
			</div>
			<div class="time text-color-darklight">
				请您在提交订单后 <span class="font-dark-red">{{countTime}}</span> 内完成支付，否则订单会自动取消！
			</div>
			<div class="goods-box">
				<el-row class="goods-detail box box-center" v-for="item in orderInfo.items">
					<el-col :span="4">
						<div class="img-box">
							<img v-bind:src="item.imageUrl">
						</div>
					</el-col>
					<el-col :span="20">
						<h4 class="en"><small class="text-color-help" v-if="item.isShared == 1">【分享瓶】</small>{{item.enName}}</h4>
						<div class="cn">
							<small>{{item.fullName}}</small>
						</div>
						<div class="en"><small>酒精度：{{item.alcoholStrength}}&nbsp;净含量：{{item.volumn}}</small></div>
						<div class="en"><small>售价：￥{{parseFloat(item.price).toFixed(2)}}</small></div>
						<div class="en"><small>购买数量：x{{item.quantity}}</small></div>
					</el-col>
				</el-row>
			</div>
			<div class="address-box text-color-darklight">
				收货地址：{{orderInfo.address}} , 收货人：{{orderInfo.consignee}} , 手机号码：{{orderInfo.phone}}
			</div>
			<div class="memo text-color-help">备注信息：{{orderInfo.memo}}</div>
		</div>
		<div class="pay-bottom">
			<div class="pay-price">支付金额： <b class="font-dark-red"><small>￥</small>{{orderInfo.feeStr}}</b></div>
			<div class="pay-type-box">
				<el-radio-group v-model="payType" class="box">
					<el-radio :label="1">
						<img class="btn-img" src="../../img/icon/Alipay.png" :class="{ active: payType==1}">
					</el-radio>
					<el-radio :label="2">
						<img class="btn-img" src="../../img/icon/WeChat.png" :class="{ active: payType==2}">
						<!-- <div class="code-img-box" :hidden="codeImgClose || payType!=2">
							<vue-q-art :config="qartConfig" :downloadButton="downloadButton"></vue-q-art>
						</div> -->
					</el-radio>
					<el-radio :label="3">
						<img class="btn-img" src="../../img/icon/UnionPay.png" :class="{ active: payType==3}">
					</el-radio>
				</el-radio-group>
			</div>
			<div class="pay-btn button" @click="payNow">立即支付</div>

		</div>
	</div>
	<cwFooter></cwFooter>
</div>
</template>

<script>
import cwHeader from '@/components/header/header'
import cwFooter from '@/components/footer/footer'
export default {
	name: 'chosePay',
	data() {
		return {
			payType: 1,
			loadError:false,
			orderInfo:"",
			codeImgClose:true,
			qartConfig: {
	            value: '',
	            imagePath: require('@/img/code-seize.jpg'),
	            filter: '',
				size: 50000
	        },
	        downloadButton: false,
			timeId:'',
			countTime:  "-- 分 -- 秒",
			countTimeId:'',
		}
	},
	components: {
		cwHeader,
		cwFooter,
	},
	methods: {
		initData: function() {
			let that = this;
			that.util.returnLogin(that);
			let params = {
				apiUrl: that.config.mallApi+"order/detail/"+that.$route.query.id,
				apiMethod: "get",
			}
			that.ajaxData(params, function(res) {
				if (res.data.code="0000") {
					that.orderInfo = res.data.data;
					let time = res.data.data.expireTime?res.data.data.expireTime:0;
					let countTimeId = setInterval(function () {
						that.countTimeId = countTimeId
						if(time>0){
							let minute = Math.floor(time / 60);
							let second = Math.floor(time % 60);
							that.countTime = minute + " 分 " + second +" 秒"
							time = time-1;
						}else {
							that.$router.push('/cGVyc29uYWwvbXlPcmRlcg');
							clearInterval(that.countTimeId);
						}
					},1000);
				}else {
					that.loadError=true
				}
			})
		},
		payNow: function() {
			let that = this,parUrl = "alipay/payment";
			let params = {
				apiMethod: "post",
				orderNo: that.orderInfo.orderNo
			}
			parUrl = that.payType==2? "weixin/h5Pay":parUrl;
			parUrl = that.payType==3? "unionpay/consume":parUrl;
			if(that.payType==2){
				that.$router.push('/d3hQYXk?orderId='+that.orderInfo.id);
			}else {
				params.apiUrl = that.config.mallApi + parUrl
				that.ajaxData(params, function(res) {
					const div = document.createElement('div');
                    div.innerHTML = res.data;
                    document.body.appendChild(div);
					let formName = that.payType==1?'punchout_form':'pay_form';
					document.forms[formName].submit();
				})
			}
		}
	},
	mounted() {
		this.initData();
	},
	destroyed(){
		clearInterval(this.countTimeId);
	}
}
</script>

<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('css/chosePay.less');
</style>
