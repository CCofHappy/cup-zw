<template>
<div class="myOrder">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>我的订单</el-breadcrumb-item>
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
							<el-select v-model="selectedIndex" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="14"></el-col>
					</el-row>
					<LoadError v-if="loadError"></LoadError>
					<NoData :message="'没有查询到相关订单'" v-else-if="orderData.records&&orderData.records.length==0"></NoData>
					<!--表内容-->
					<div class="order-list" v-else v-for="order in orderData.records">
						<div class="order-title box box-between box-align-center">
							<div class="box-flex text-color-help"><span>订单号：{{order.orderNo}}</span>&nbsp;&nbsp;&nbsp;&nbsp;下单时间：{{forDate(order.createDate)}}</div>
							<div class="font-dark-red" v-if="order.orderStatus == 1">待付款</div>
							<div class="font-dark-red" v-if="order.orderStatus == 2">待发货</div>
							<div class="font-dark-red" v-if="order.orderStatus == 3">待收货</div>
							<div class="font-dark-red" v-if="order.orderStatus == 4">已完成</div>
							<div class="font-dark-red" v-if="order.orderStatus == 5">已取消</div>
						</div>
						<div class="order-content">
							<el-row class="text-center box box-center order-row" >
								<el-col :span='21'>
									<el-row class="text-center box box-center order-item" v-for="goods in order.items">
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
									<div>
										<div><small class="text-color-help"><router-link :to="{ path: '/b3JkZXJEZXRhaWw', query: {id:order.id}}" target="_blank">订单详情</router-link></small></div>
									</div>
								</el-col>
							</el-row>
						</div>
						<div class="order-tools box box-between box-align-center">
							<div>
								共有 {{order.total}} 件商品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合计：<span class="order-price">￥{{order.feeStr}}</span>
							</div>
							<div>
								<div class="box" v-if="order.orderStatus  == 1">
									<router-link :to="{ path: '/Y2hvc2VQYXk', query: {id:order.id} }" target="_blank" class="text-color-help">立即付款</router-link>
									<div class="text-color-help button" @click="cancelOrder(order.id)">取消订单</div>
								</div>
								<div v-if="order.orderStatus  == 2">
									<router-link to="/bG9naXN0aWNzRGV0YWls" class="text-color-help">查看物流</router-link>
								</div>
								<div class="box" v-if="order.orderStatus  == 3">
									<div class="text-color-help button" @click="receipt(order.id)">确认收货</div>
									<router-link :to="{ path: '/bG9naXN0aWNzRGV0YWls', query: {id:order.id}}" target="_blank" class="text-color-help">查看物流</router-link>
								</div>
								<div class="box" v-if="order.orderStatus  == 4">
									<div class="text-color-help button" @click="buyAgain(order.items)">再次购买</div>
									<router-link :to="{ path: '/bG9naXN0aWNzRGV0YWls', query: {id:order.id}}" target="_blank" class="text-color-help">查看物流</router-link>
								</div>
								<div class="box" v-if="order.orderStatus  == 5">
									<div class="add-shop-cart button">加入购物车</div>
									<div class="text-color-help button" @click="delOrder(order.id)">删除订单</div>
								</div>
							</div>
						</div>
					</div>

				</div>

				<!--分页器-->
				<div class="text-right" v-if="(orderData.total)/10>1">
					<el-pagination layout="prev, pager, next" :total="orderData.total?orderData.total:1" :page-size="10" @current-change="changePage" :current-page="page">
					</el-pagination>
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
	name: 'myOrder',
	data() {
		return {
			loadError: false,
			orderData: {},
			options: [{
				value: '1',
				label: '近三个月订单'
			}, {
				value: '2',
				label: '今年内订单'
			}, {
				value: '0',
				label: '全部'
			}],
			selectedIndex: '1',
			tabIndex: '1',
			page:1,
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
			this.initData();
		},
		selectedIndex(curVal, oldVal) {
			if(curVal!=oldVal){
				this.$router.push("/cGVyc29uYWwvbXlPcmRlcg?page=1&term=" + curVal + "&tabIndex=" + this.tabIndex)
			}
		}
	},
	methods: {
		initData: function() {
			let that = this;
			that.util.returnLogin(that);
			that.page = parseInt(that.$route.query.page ? that.$route.query.page : 1);
			let orderApi = "";
			let type = that.$route.query.tabIndex?that.$route.query.tabIndex:1
			switch (parseInt(type)) {
				case 1:
					orderApi = "all"
					break;
				case 2:
					orderApi = "pay"
					break;
				case 3:
					orderApi = "shipment"
					break;
				case 4:
					orderApi = "complete"
					break;
				default:
					orderApi = "close"
			}
			let params = {
				apiUrl: that.config.mallApi + "order/list/" + orderApi + "?size=10&current=" + that.page +"&term=" +that.selectedIndex ,
				apiMethod: "get",
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					that.orderData = res.data.data;
				} else {
					that.loadError = true;
				}
			})
		},
		//取消订单
		cancelOrder: function (id) {
			this.$confirm('确定要取消该订单吗?', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let that = this;
				let params = {
					apiUrl: that.config.mallApi+"order/cancel/"+id,
				}
				that.ajaxData(params,function (res) {
					if (res.data.code=="0000") {
						that.$notify.success({
							message: '取消成功！'
						});
						if (that.$route.query.page!=1) {
							that.$router.push("/cGVyc29uYWwvbXlPcmRlcg?page=1")
						}else {
							that.initData()
						}
					}else {
						this.$notify({
							type: 'error',
							title: res.data.message,
						});
					}
				})
			}).catch(() => {
			});
		},
		//删除订单
		delOrder: function(id) {
			this.$confirm('确定要删除该订单吗?', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let that = this;
				let params = {
					apiUrl: that.config.mallApi+"order/delete/"+id,
				}
				that.ajaxData(params,function (res) {
					if (res.data.code=="0000") {
						that.$notify.success({
							message: '删除成功！'
						});
						if (that.$route.query.page!=1) {
							that.$router.push("/cGVyc29uYWwvbXlPcmRlcg?page=1")
						}else {
							that.initData()
						}
					}else {
						this.$notify.error({
							message: res.data.message,
						});
					}
				})
			}).catch(() => {});
		},
		//确认收货
		receipt(id){
			this.$confirm('确定已收到货吗?', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let that = this;
				let params = {
					apiUrl: that.config.mallApi+"order/receipt/"+id,
					apiMethod:"get",
				}
				that.ajaxData(params,function (res) {
					if (res.data.code=="0000") {
						this.$notify({
							type: 'success',
							message: '操作成功',
						});
						if (that.$route.query.page!=1) {
							that.$router.push("/cGVyc29uYWwvbXlPcmRlcg?page=1")
						}else {
							that.initData()
						}
					}else {
						this.$notify({
							type: 'error',
							message: res.data.message,
						});
					}
				})
			}).catch(() => {});
		},
		//再次购买
		buyAgain: function(goods){
			let that = this;
			let data = goods;
			sessionStorage.orderSubmitInfo=JSON.stringify(data);
			this.$router.push('/Z2V0T3JkZXJJbmZv?type=1');
		},
		//加入购物车
		addShopCart: function(e){
			let params = {
				apiUrl:that.config.mallApi + "shopping/cart/add",
				productId: e.id,
				productDetailId: e.id,
				count: e.goodsCount,
			}
			// that.ajaxData(params,function(res){
			// 	if (res.data.code == "0000") {
			// 		that.$notify({
			// 			type: 'success',
			// 			message: '成功加入购物车'
			// 		});
			// 		that.$refs.cwHeader.shopCart();
			// 	} else {
			// 		that.$notify({
			// 			type: 'error',
			// 			message: '操作失败'
			// 		});
			// 	}
			// })
		},
		changePage: function(e) {
			let data = {
				page: e,
				term: this.$route.query.term?this.$route.query.term:1,
				tabIndex: this.$route.query.tabIndex?this.$route.query.tabIndex:1,
			}
			this.$router.push({
				path: "/cGVyc29uYWwvbXlPcmRlcg",
				query: data
			})
		},
		forDate: function(e){
			return this.util.forDate(e,"yyyy-MM-dd")
		}
	},
	mounted() {
		this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : 1;
		this.initData();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('css/order.less');
</style>
