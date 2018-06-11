<template>
<div class="myInventory">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>我的清单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftBar :navNum="tabIndex"></leftBar>
			</el-col>
			<el-col :span="20">
				<div class="inventory-container">
					<el-row>
						<el-col :span="2" class="inventory-checkbox box box-center">
							<el-checkbox v-model="checkAll" @change="choseBox('all')">全选</el-checkbox>
						</el-col>
						<el-col :span="22">
						</el-col>
					</el-row>
					<LoadError v-if="loadError"></LoadError>
					<NoData :message="'没有相关的商品'" v-else-if="goodsTotal==0"></NoData>
					<div class="inventory-list" v-else>
						<div class="inventory-goods" v-for="(item,index) in goodsList">
							<el-row class="text-center box box-center">
								<el-col :span="2" class="shop-card-checkbox">
									<el-checkbox-group v-model="choseList">
										<el-checkbox :label="index" text-color="#fff" @change="choseBox" class="label-none"></el-checkbox>
									</el-checkbox-group>
								</el-col>
								<el-col :span='20'>
									<el-row class="text-center box box-center">
										<el-col :span="14" class="text-left">
											<div class="box box-align-center">
												<div class="img-box box-center box">
													<img v-lazy="" class="goodsImg1">
												</div>
												<div>
													<h4>{{item.enName}}</h4>
													<p class="titke-cn">{{item.fullName}}</p>
												</div>
											</div>
										</el-col>
										<el-col :span="5">
											<p>酒精度：{{item.alcoholStrength}}</p>
											<p>净含量：{{item.volumn}}</p>
										</el-col>
										<el-col :span="5"><small>￥</small>{{item.tradePrice}}</el-col>
										<el-col :span="5" class="count-box">
											<div class="box box-center">
												<button class="chose-btn box box-center button" @click="donwCount(item,index)">
								                	<icon name="minus" scale="1.5" class="icon"></icon>
								                </button>
												<input class="chose-count" type="number" v-model="item.number" @change="inputCount(item)">
												<button class="chose-btn box box-center button" @click="upCount(item,index)">
						                			<icon name="add" scale="1.5" class="icon"></icon>
						              			</button>
											</div>
											<span class="overdose" v-if="item.number>item.stock">当前库存{{item.stock}}瓶</span>
										</el-col>
									</el-row>
								</el-col>
								<el-col :span="2" class="box box-center">
									<div class="button" @click="delGoods([item.productDetailId])">
										删除
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
					<div class="settlement-box">
						<el-row>
							<el-col :span="2" class="inventory-checkbox box box-center">
								<el-checkbox v-model="checkAll" @change="choseBox('all')">全选</el-checkbox>
							</el-col>
							<el-col :span="22" class="box box-between box-align-center">
								<div class="button del-btn" @click="delChoseGoods">删除选中商品</div>
								<div class="box box-align-center">
									已选商品&nbsp;&nbsp;<b>{{choseList.length}}</b>&nbsp;&nbsp;件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 总计：
									<span class="settlement-price font-dark-red">￥{{parseFloat(allPrice).toFixed(2)}}</span>
									<div class="button settlement-btn" @click="orderSubmit">去结算</div>
								</div>
							</el-col>
						</el-row>
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
	name: 'myInventory',
	data() {
		return {
			loadError: false,
			checkAll: false,
			tabIndex: '1',
			goodsList: [],
			choseList: [],
			allPrice: 0,
			goodsTotal: 1,
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
			this.tabIndex = this.$route.query.tabIndex || 1;
			this.initData();
		},
		selectedIndex(curVal, oldVal) {
			if (curVal != oldVal) {
				this.$router.push("/cGVyc29uYWwvbXlPcmRlcg?page=1&term=" + curVal + "&tabIndex=" + this.tabIndex)
			}
		},
		choseList(curVal, oldVal) {
			let goods = this.goodsList;
			let all = 0;
			for (var i in curVal) {
				all += goods[curVal[i]].number * goods[curVal[i]].tradePrice;
			}
			this.allPrice = all;
		}
	},
	methods: {
		initData() {
			let params = {
				apiUrl: this.config.mallApi + "buyer/procurement/list",
			}
			this.ajaxData(params, (res) => {
				if (res.data.code == "0000") {
					this.goodsList = res.data.data.items;
					this.goodsTotal = res.data.data.items.length;
				} else {
					this.loadError = true;
				}
			})
		},
		choseBox(e) {
			if (e == 'all') {
				if (this.checkAll) {
					let arr = []
					for (var i in this.goodsList) {
						arr.push(parseInt(i));
					}
					this.choseList = arr;
				} else {
					this.choseList = [];
				}
			} else {
				if (this.choseList.length == this.goodsList.length) {
					this.checkAll = true;
				} else {
					this.checkAll = false;
				}
			}
		},
		donwCount(item, index) {
			item.number > 1 ? item.number-- : '';
			this.$set(this.goodsList, index, item);
			this.saveGoodsCount(item);
		},
		upCount(item, index) {
			item.number = ++item.number;
			this.$set(this.goodsList, index, item);
			this.saveGoodsCount(item);
		},
		inputCount(item) {
			item.number = item.number > 0 ? item.number : 1;
			this.saveGoodsCount(item);
		},
		//修改商品数量
		saveGoodsCount(item) {
			let goods = item;
			if (goods.count == 0) return;
			let params = {
				apiUrl: this.config.mallApi + "buyer/procurementItem/update",
				productDetailId: goods.productDetailId,
				number: goods.number,
			}
			this.ajaxData(params, (res) => {});
		},
		//结算
		orderSubmit() {
			if (this.choseList.length > 0) {
				let params = {
					apiUrl: this.config.mallApi + "buyer/goods/stock",
					productDetailIds: [],
				}
				for (var i = 0; i < this.choseList.length; i++) {
					params.productDetailIds.push(this.goodsList[this.choseList[i]].productDetailId);
				}
				this.ajaxData(params, (res) => {
					if (res.data.code == "0000") {
						let over = false,info = [];
						for (let i = 0; i < this.choseList.length; i++) {
							let goods = this.goodsList[this.choseList[i]]
							let id = goods.productDetailId;
							goods.stock = res.data.data[id];
							info.push(goods)
							if (goods.number > res.data.data[id]) {
								over = true;
							}
						}
						if (over) {
							this.$confirm("您需要采购的商品库存数不足，系统将自动为您余下的需求生成预需求单，以便到货及时通知您。", {
								confirmButtonText: '继续',
								center: true
							}).then(() => {
								sessionStorage.orderSubmitInfo = JSON.stringify(info);
								this.$router.push({name:"getOrderInfo",query:{type:2,from:"inventory"}});
							}).catch(() => {

							});
						} else {
							sessionStorage.orderSubmitInfo = JSON.stringify(info);
							this.$router.push({name:"getOrderInfo",query:{type:2,from:"inventory"}});
						}
					} else {
						this.$notify.error(res.data.message)
					}
				})
			} else {
				this.$notify.error("请选择采购商品")
			}

		},
		//删除选择项
		delChoseGoods() {
			let arr = [];
			for (var i = 0; i < this.choseList.length; i++) {
				arr.push(this.goodsList[this.choseList[i]].productDetailId)
			}
			this.delGoods(arr);
		},
		//删除清掉商品
		delGoods(arr) {
			let params = {
				apiUrl: this.config.mallApi + "buyer/procurementItem/remove",
				productDetailIds: arr,
			}
			this.ajaxData(params, (res) => {
				if (res.data.code == "0000") {
					this.$notify.success({
						message: '删除成功！'
					})
					this.initData();
				} else {
					this.$notify.error({
						message: res.data.message,
					})
				}
			});
		},
	},
	mounted() {
		this.tabIndex = this.$route.query.tabIndex || 1;
		this.initData();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('css/order.less');
@import url('css/purchase.less');
</style>

<style  lang="less">
.myInventory {
    .label-none .el-checkbox__label {
        display: none;
    }
}
</style>
