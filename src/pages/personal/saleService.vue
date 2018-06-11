<template>
<div class="saleService">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>售后服务</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftBar :navNum="tabIndex"></leftBar>
			</el-col>
			<el-col :span="20">
				<div class="order-container order">
					<!--表头-->
					<el-row class="order-tit box box-center">
						<el-col :span="9" class="text-left">下单时间：
							<el-select v-model="selectedIndex" placeholder="请选择" @change="initData()">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="14">
							<div class="fl-right box box-align-center">
								<div class="button" :class="{ active:saleType==0 }" @click="choseSaleType(0)">申请售后</div>
								<div class="button" :class="{ active:saleType==1 }" @click="choseSaleType(1)">申请记录</div>
							</div>
						</el-col>
					</el-row>
					<div class="sale-server-box" v-if="saleType==0">
						<LoadError v-if="loadError"></LoadError>
						<NoData :message="'没有查询到相关订单'" v-else-if="orderData.records&&orderData.records.length==0"></NoData>
						<!--表内容-->
						<div class="order-list" v-else v-for="order,index in orderData.records" :key="index">
							<div class="order-title box box-between box-align-center">
								<div class="box-flex">订单号：{{order.orderNo}}&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-color-help">下单时间：{{forDate(order.createDate)}}</span></div>
								<div class="font-dark-red" v-if="order.orderStatus == 1">待付款</div>
								<div class="font-dark-red" v-if="order.orderStatus == 2">待发货</div>
								<div class="font-dark-red" v-if="order.orderStatus == 3">待收货</div>
								<div class="font-dark-red" v-if="order.orderStatus == 4">已完成</div>
								<div class="font-dark-red" v-if="order.orderStatus == 5">已取消</div>
							</div>
							<div class="order-content">
								<el-row class="text-center box box-center order-row" v-for="goods,index in order.items" :key="index">
									<el-col :span='21'>
										<el-row class="text-center box box-center order-item">
											<el-col :span="14" class="text-left">
												<div class="box box-align-center">
													<div class="img-box box-center box">
														<router-link :to="{ path: '/Z29vZHNEZXRhaWw', query: {id:goods.productId}}">
															<img v-lazy="goods.imageUrl" class="goodsImg1">
														</router-link>
													</div>
													<div>
														<router-link :to="{ path: '/Z29vZHNEZXRhaWw', query: {id:goods.productId}}">
															<h4><small class="text-color-help" v-if="goods.isShared == 1">【分享瓶】</small>{{goods.enName}}</h4>
														</router-link>
														<p class="titke-cn">{{goods.fullName}}</p>
														<p class="text-color-help">酒精度：{{goods.alcoholStrength}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;净含量：{{goods.volumn}}</p>
													</div>
												</div>
											</el-col>
											<el-col :span="5"><small>￥</small>{{goods.priceStr}}</el-col>
											<el-col :span="5">x{{goods.quantity}}</el-col>
										</el-row>
									</el-col>
									<el-col :span="3" class="box box-center">
										<router-link :to="{ name: 'applyAfterSale',  query: {id:goods.id } }" class="text-color-help">
											申请售后
										</router-link>
									</el-col>
								</el-row>
							</div>
						</div>
						<!--分页器-->
						<div class="text-right" v-if="(orderData.total)/10>1">
							<el-pagination layout="prev, pager, next" :total="orderData.total?orderData.total:1" :page-size="10" @current-change="changePage" :current-page="page">
							</el-pagination>
						</div>
					</div>
					<div class="sale-server-box" v-else>
						<LoadError v-if="loadError"></LoadError>
						<NoData :message="'没有查询到相关订单'" v-else-if="saleData.records&&saleData.records.length==0"></NoData>
						<!--表内容-->
						<div class="order-list" v-else v-for="item,index in saleData.records" :key="index">
							<div class="order-title box box-between box-align-center">
								<div class="box-flex">服务单号：{{item.serviceNo}}&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-color-help">申请时间：{{forDate(item.applyTime)}}</span></div>
								<div class="font-dark-red" v-if="item.serviceType == 1">退款退货</div>
								<div class="font-dark-red" v-if="item.serviceType == 2">退款</div>
							</div>
							<div class="order-content">
								<el-row class="text-center box box-center order-row">
									<el-col :span='21'>
										<el-row class="text-center box box-center order-item">
											<el-col :span="14" class="text-left">
												<div class="box box-align-center">
													<div class="img-box box-center box">
														<router-link :to="{ name: 'applyAfterSale', query: {id:item.id,type:'service'}}">
															<img v-lazy="item.image" class="goodsImg1">
														</router-link>
													</div>
													<router-link :to="{ name: 'applyAfterSale', query: {id:item.id,type:'service'}}">
														<h4><small class="text-color-help" v-if="item.isShared == 1">【分享瓶】</small>{{item.enName}}</h4>
														<p class="titke-cn">{{item.chName}}</p>
														<p class="text-color-help">酒精度：{{item.alcoholStrength}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;净含量：{{item.volumn}}</p>
													</router-link>
												</div>
											</el-col>
											<el-col :span="5"><small>￥</small>{{item.price}}</el-col>
											<el-col :span="5">x{{item.returnCount}}</el-col>
										</el-row>
									</el-col>
									<el-col :span="3" class="box box-center">
										<div class="" v-if="item.status < 0">已取消</div>
										<div class="" v-if="item.status == 0||item.status == 2">待审核</div>
										<div class="" v-if="item.status == 1">退货中</div>
										<div class="" v-if="item.status == 3">审核失败</div>
										<div class="" v-if="item.status == 4">审核失败</div>
										<div class="" v-if="item.status == 5">已完成</div>
									</el-col>
								</el-row>
							</div>
						</div>
						<!--分页器-->
						<div class="text-right" v-if="(saleData.total)/10>1">
							<el-pagination layout="prev, pager, next" :total="saleData.total?saleData.total:1" :page-size="10" @current-change="changePage" :current-page="page">
							</el-pagination>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
	<perFooter></perFooter>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftBar from './leftBar'
export default {
	name: 'saleService',
	data() {
		return {
			loadError: false,
			orderData: {},
			saleData: {},
			options: [{
				value: '1',
				label: '近一个月'
			}, {
				value: '2',
				label: '近三个月'
			}, {
				value: '3',
				label: '近半年'
			}],
			selectedIndex: '1',
			saleType: 0,
			tabIndex: '1',
			page: 1,
			salePage: 1,
		}
	},
	components: {
		perHeader,
		leftBar,
		perFooter
	},
	watch: {
		'$route' (to, from) {
			this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : 1;
			this.saleType = this.$route.query.type ? this.$route.query.type : 0;
			this.initData();
		},
	},
	methods: {
		initData() {
			this.util.returnLogin(this);
			let orderApi = "";
			let params = {
				apiUrl: this.config.mallApi + "sales/serviceList",
				current: this.page,
				size: 10,
				searchType: this.selectedIndex,
			}
			if (this.saleType == 1) {
				params.apiUrl = this.config.mallApi + "sales/list";
				params.current = this.salePage;
			}
			this.ajaxData(params, (res) => {
				if (this.saleType == 0) {
					if (res.data.code == "0000") {
						this.orderData = res.data.data;
					} else {
						this.loadError = true;
					}
				} else {
					if (res.data.code == "0000") {
						this.saleData = res.data.data;
					} else {
						this.loadError = true;
					}
				}

			})
		},
		choseSaleType(e) {
			this.$router.push({
				name: "saleService",
				query: {
					page: 1,
					tabIndex: 6,
					type: e
				}
			});
		},
		changePage(e) {
			if (this.saleType == 0) {
				this.page = e;
			} else {
				this.salePage = e;
			}
		},
		forDate(e) {
			return this.util.forDate(e, "yyyy-MM-dd hh:mm:ss");
		}
	},
	mounted() {
		this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : 1;
		this.saleType = this.$route.query.type ? this.$route.query.type : 0;
		this.initData();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('css/order.less');
</style>
