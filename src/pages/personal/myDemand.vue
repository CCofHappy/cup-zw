<template>
<div class="myDemand">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>我的需求单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftBar :navNum="tabIndex"></leftBar>
			</el-col>
			<el-col :span="20">
				<div class="demand-container">
					<div class="text-left">下单时间：
						<el-select v-model="selectedIndex" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
					<div class="order-list" v-for="order in orderData">
						<div class="order-title box box-between box-align-center">
							<div>需求单号：{{order.intendNo}}&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-color-help">需求单生成时间：{{order.createTime}}</span></div>
							<div class="text-color-help del-btn button" @click="delOreder(order.intendId)">
								删除需求
							</div>
						</div>
						<div class="order-content" v-for="item in order.items">
							<el-row class="text-center box box-center order-row">
								<el-col :span='20'>
									<el-row class="text-center box box-center order-item">
										<el-col :span="14" class="text-left">
											<div class="box box-align-center">
												<div class="img-box box-center box">
													<img v-lazy="" class="goodsImg1">
												</div>
												<div>
													<h4>{{item.enName}}</h4>
													<p class="titke-cn">{{item.fullName}}</p>
													<p class="text-color-help">酒精度：{{item.alcoholStrength}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;净含量：{{item.volumn}}</p>
												</div>
											</div>
										</el-col>
										<el-col :span="5"><small>￥</small>{{item.tradePrice}}</el-col>
										<el-col :span="5">x{{item.number}}</el-col>
									</el-row>
								</el-col>
								<el-col :span="4" class="box box-center">
									<div class="button" v-if="item.stock>item.number" @click="addList(item)">
										加入清单
									</div>
									<div v-else>
										<div class="button">
											到货通知
										</div>
									</div>
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
	name: 'myDemand',
	data() {
		return {
			loadError: false,
			orderData: {},
			options: [ {
				value: '0',
				label: '全部'
			}, {
				value: '1',
				label: '近一个月订单'
			}, {
				value: '2',
				label: '近三个月订单'
			}, {
				value: '3',
				label: '近半年'
			}],
			selectedIndex: '0',
			tabIndex: '1',
			page: 1,
		}
	},
	components: {
		perHeader,
		leftBar,
		perFooter
	},
	watch: {
		'$route' (to, from) {
			this.initData();
		},
		selectedIndex(curVal, oldVal) {
			if (curVal != oldVal) {
				this.$router.push({
					name: "myDemand",
					query: {
						page: 1,
						term: curVal,
						tabIndex: this.tabIndex
					}
				})
			}
		}
	},
	methods: {
		initData() {
			let params = {
				apiUrl: this.config.mallApi + "buyer/intend/list",
				current: this.page,
				size: 10,
				dateType: this.selectedIndex
			}
			this.ajaxData(params, (res) => {
				if (res.data.code == "0000") {
					this.orderData = res.data.data.records;
				} else {
					console.log(res.data.message);
				}
			})
		},
		delOreder(id) {//删除需求
			this.$confirm("删除后，需求单将无法恢复哦", {
				confirmButtonText: '确定',
				showCancelButton: false,
				center: true
			}).then(() => {
				let params={
					apiUrl: this.config.mallApi + "buyer/intend/remove",
					intendId: id
				}
				this.ajaxData(params,(res)=>{
					if (res.data.code == "0000") {
						this.$notify.success("删除成功");
						this.initData();
					}else {
						this.$notify.error(res.data.message);
					}
				})
			}).catch(() => {

			});
		},
		waitMessae() {
			this.$confirm("当该商品库存充足时，将第一时间以短信的形式通知您。", {
				confirmButtonText: '确定',
				showCancelButton: false,
				center: true
			}).then(() => {

			}).catch(() => {

			});
		},
		changePage(e) {
			let data = {
				page: e,
				term: this.$route.query.term ? this.$route.query.term : 1,
			}
			this.$router.push({
				name: "myDemand",
				query: data
			})
		},
		addList(item){//加入清单
			let params={
				apiUrl:this.config.mallApi + "buyer/intendItem/addTo",
				intendId:item.intendId,
				productDetailId:item.productDetailId
			}
			this.ajaxData(params,(res)=>{
				if (res.data.code == "0000") {
					this.$notify.success("加入成功");
					this.initData();
				}else {
					this.$notify.error(res.data.message);
				}
			})
		},
	},
	mounted() {
		this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : 1;
		this.selectedIndex = this.$route.query.term ? this.$route.query.term : '0';
		this.initData();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('css/order.less');
@import url('css/purchase.less');
</style>
