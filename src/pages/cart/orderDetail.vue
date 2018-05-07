<template>
<div class="orderDetail">
	<perHeader></perHeader>
	<div class="container">
		<div class="top-nav">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/cGVyc29uYWwvbXlPcmRlcg' }">我的订单</el-breadcrumb-item>
			  <el-breadcrumb-item>订单详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<NoData :message="'订单不存在'" v-if="unFindOrder"></NoData>
		<div v-else>
			<div class="order-state-box">
				<div v-if="orderDetail && orderDetail.orderStatus==1">
					<div class="box box-align-center box-between">
						<div class="box box-align-center">
							<div class="wait-order-num">
								<p class="order-num">订单号：{{orderDetail.orderNo}}</p>
								<span>剩余时间：<span class="font-red">{{countTime[0]}} 分 {{countTime[1]}} 秒</span></span>
							</div>
							<h2 class="font-dark-red">待付款</h2>
						</div>
						<div class="text-color-help font-12 margin-valign-10">
							<router-link :to="{ path: '/Y2hvc2VQYXk', query: {id:orderDetail.id} }">
								<el-button type="primary">立即支付</el-button>
							</router-link>
						</div>
					</div>
				</div>
				<div v-if="orderDetail && orderDetail.orderStatus==2" class="box box-align-center">
					<p class="order-num">订单号：{{orderDetail.orderNo}}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h2 class="font-dark-red">待发货</h2>
				</div>
				<div v-if="orderDetail && orderDetail.orderStatus==5">
					<div class="box box-align-center">
						<div class="wait-order-num">
							<p class="order-num">订单号：{{orderDetail.orderNo}}</p>
							<span v-if="orderDetail.closeMode == 1">关闭原因：用户手动取消订单。</span>
							<span v-else>关闭原因：逾期系统自动关闭订单。</span>
						</div>
						<h2 class="font-dark-red">已关闭</h2>
					</div>
				</div>
				<div v-if="orderDetail && (orderDetail.orderStatus==3 || orderDetail.orderStatus==4)">
					<div class="order-state">
						<div v-if="orderDetail && orderDetail.orderStatus==3" class="box box-align-center">
							<p class="order-num">订单号：{{orderDetail.orderNo}}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h2 class="font-dark-red">待收货</h2>
						</div>
						<div v-if="orderDetail && orderDetail.orderStatus==4" class="box box-align-center">
							<p class="order-num">订单号：{{orderDetail.orderNo}}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h2 class="font-dark-red">已完成</h2>
						</div>
					</div>
					<div class="logistics-detail box" v-if="orderDetail && logisticsInfo.info">
						<div>
							物流公司：{{logisticsInfo.info.name}}
						</div>
						<div>
							物流单号：{{logisticsInfo.info.trackingNo}}
						</div>
					</div>
					<div class="logistics-detail box" v-else>
						<div>
							物流公司：暂无
						</div>
						<div>
							物流单号：暂无
						</div>
					</div>
				</div>
				<div class="logistics-step" v-if="orderDetail && logisticsInfo.data">
					<div class="step-box box" v-for="(item,index) in logisticsInfo.data" :class="{active:index==0}" v-if="index<5">
						<div class="time">{{item.time}}</div>
						<div class="detail">{{item.context}}</div>
					</div>
				</div>
			</div>
			<div class="info-box" v-if="orderDetail">
				<div class="title"><b>收货人信息</b></div>
				<div class="info">
					<span class="text-color-help">收货人：</span>{{orderDetail.consignee}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span class="text-color-help">收货地址：</span>{{orderDetail.address}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span class="text-color-help">联系电话：</span>{{orderDetail.phone}}
				</div>
			</div>

			<div class="info-box" v-if="orderDetail.invoiceSeq">
				<div class="title"><b>发票信息</b></div>
				<div class="info invoice-info" v-if="orderDetail.invoice.invoiceType==3">
					<p>
						<label><span class="text-color-help">发票类型：</span>增值税发票</label>
						<label><span class="text-color-help">单位名称：</span>{{orderDetail.invoice.invoiceHeadContent}}</label>
						<label><span class="text-color-help">注册地址：</span>{{orderDetail.invoice.detail.registAddress}}</label>
						<label><span class="text-color-help">注册电话：</span>{{orderDetail.invoice.detail.registPhone}}</label>
					</p>
					<p>
						<label><span class="text-color-help">纳税人识别号：</span>{{orderDetail.invoice.identificationNumber}}</label>
						<label><span class="text-color-help">开户银行：</span>{{orderDetail.invoice.detail.bankName}}</label>
						<label><span class="text-color-help">银行账号：</span>{{orderDetail.invoice.detail.bankAccount}}</label>
					</p>
					<p>
						<label><span class="text-color-help">收票人姓名：</span>{{orderDetail.invoice.detail.customerName}}</label>
						<label><span class="text-color-help">收票人手机：</span>{{orderDetail.invoice.detail.customerPhone}}</label>
						<label><span class="text-color-help">收票人地址：</span>{{orderDetail.invoice.detail.customerAddress}}</label>
					</p>
				</div>
				<div class="info invoice-info" v-if="orderDetail.invoice.invoiceType==2">
					<p v-if="orderDetail.invoice.invoiceHeadType==1">
						<label><span class="text-color-help">发票类型：</span>单位-普通发票</span></label>
						<label><span class="text-color-help">单位名称：</span>{{orderDetail.invoice.invoiceHeadContent}}</label>
						<label><span class="text-color-help">纳税人识别号：</span>{{orderDetail.invoice.identificationNumber}}</label>
					</p>
					<p v-if="orderDetail.invoice.invoiceHeadType==2">
						<label><span class="text-color-help">发票类型：</span>个人-普通发票</span></label>
					</p>
				</div>
				<div class="info invoice-info" v-if="orderDetail.invoice.invoiceType==1">
					<p v-if="orderDetail.invoice.invoiceHeadType==1">
						<label><span class="text-color-help">发票类型：</span>单位-电子发票</label>
						<label><span class="text-color-help">单位名称：</span>{{orderDetail.invoice.invoiceHeadContent}}</label>
						<label><span class="text-color-help">手机号：</span>{{orderDetail.invoice.phone}}</label>
						<label><span class="text-color-help">邮箱：</span>{{orderDetail.invoice.email}}</label>
					</p>
					<p v-if="orderDetail.invoice.invoiceHeadType==2">
						<label><span class="text-color-help">发票类型：</span>个人-电子发票</label>
						<label><span class="text-color-help">手机号：</span>{{orderDetail.invoice.phone}}</label>
						<label><span class="text-color-help">邮箱：</span>{{orderDetail.invoice.email}}</label>
					</p>
				</div>
			</div>
			<div class="goods-list-box">
				<div class="title">商品信息</div>
				<!-- <el-row class="title text-color-help">
					<el-col :span="9">商品名称</el-col>
					<el-col :span="9">商品详情</el-col>
					<el-col :span="3">单价（元）</el-col>
					<el-col :span="3">数量（瓶）</el-col>
				</el-row> -->
				<el-row class="goods" v-for="item in orderDetail.items">
					<el-col :span="10">
						<div class="box box-align-center">
							<div class="img-box">
								<img v-lazy="item.imageUrl">
							</div>
							<div>
								<p><span class="text-color-help" v-if="item.isShared == 1">【分享瓶】</span><b>{{item.enName}}</b></p>
								<br>
								<p class="text-color-help"><small>{{item.fullName}}</small></p>
							</div>
						</div>
					</el-col>
					<el-col :span="8" class="box box-center">
						<div class="detail-box">
							<div>商品编号：{{item.productCode}}</div>
							<div>品牌：{{item.brandName}}</div>
							<div>原产地：{{item.sourceArea}}</div>
							<div>类型：{{item.productType}}</div>
							<div>净含量：{{item.volumn}}</div>
							<div>酒精度：{{item.alcoholStrength}}</div>
						</div>
					</el-col>
					<el-col :span="3" class="box box-center">
						<div class="text-center">
							<p class="price">{{item.priceStr}}</p>
							<!-- <p class="cost-price text-color-help">{{item.alcoholStrength}}</p> -->
						</div>
					</el-col>
					<el-col :span="3" class="box box-center">
						{{item.quantity}}
					</el-col>
				</el-row>
			</div>
			<div class="goods-price">
				商品总额：<span class="font-dark-red"><small>￥</small>{{orderDetail.feeStr}}</span>
			</div>
		</div>
	</div>
	<!-- <div class="recommend-box" v-if="recommendsInfo">
		<div class="container white-bg">
			<div class="recommend-title-box">
				<div class="recommend-title">相关推荐</div>
			</div>
			<div class="recommend-content">
				<proList :goodsList="recommendsInfo" @refresh="initData"></proList>
			</div>
		</div>
	</div> -->
	<perFooter></perFooter>
</div>
</template>

<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import proList from '@/components/product/proList'
export default {
	name: 'orderDetail',
	data() {
		return {
			orderDetail:"",
			logisticsInfo:"",
			countTimeId:"",
			countTime: ['--','--'],
			unFindOrder:false,
		}
	},
	components: {
		perHeader,
		perFooter,
		proList,
	},
	methods: {
		initData(){
			let that = this;
			that.util.returnLogin(that);
			let params = {
				apiUrl: that.config.mallApi + "order/detail/" + that.$route.query.id,
				apiMethod: "get",
			}
			that.ajaxData(params, function(res) {//订单详情
				if (res.data.code=="0000") {
					that.orderDetail = res.data.data;
					let time = res.data.data.expireTime?res.data.data.expireTime:0;
					if (res.data.data.orderStatus==1) {
						let countTimeId = setInterval(function () {
							that.countTimeId = countTimeId;
							if(time>0){
								let minute = Math.floor(time / 60);
								let second = Math.floor(time % 60);
								that.countTime = [minute,second]
								time = time-1;
							}else {
								that.initData();
								clearInterval(countTimeId);
							}
						},1000);
					}
				}else{
					that.unFindOrder=true;
				}
			})

			let logisticsParams = {
				apiUrl: that.config.mallApi + "order/logistics/" + that.$route.query.id,
				apiMethod: "get",
			}
			that.ajaxData(logisticsParams, function(res) {//物流详情
				if (res.data.code=="0000") {
					that.logisticsInfo = res.data.data;
				}
			})
		},
		forDate: function(e){
			return this.util.forDate(e,"yyyy-MM-dd hh:mm:ss")
		}
	},
	mounted(){
		this.initData();
	},
	destroyed(){
		clearInterval(this.countTimeId);
	}
}
</script>

<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('../../components/product/recommend.less'); //引入相关推荐样式
@import url('css/orderDetail.less');
</style>
