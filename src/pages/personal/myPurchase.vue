<template>
<div class="myPurchase">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>我的采购单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftBar :navNum="tabIndex"></leftBar>
			</el-col>
			<el-col :span="20">
				<div class="purchase-container">
					<el-row class="search-box box box-align-center">
						<el-col :span="11" class="box-flex">
							商品名称：&nbsp;&nbsp;<input v-model="name"></input>
						</el-col>
						<el-col :span="11" class="box-flex">
							品牌：&nbsp;&nbsp;<input v-model="brandName"></input>
						</el-col>
						<el-col :span="2">
							<div class="search-btn button" @click="initData">搜索</div>
						</el-col>
					</el-row>
					<LoadError v-if="loadError"></LoadError>
					<NoData :message="'没有相关的商品'" v-else-if="goodsTotal==0"></NoData>
					<div class="goods-list" v-else>
						<el-row class="text-center goods-title">
							<el-col :span="3">商品图片</el-col>
							<el-col :span="3">商品名称</el-col>
							<el-col :span="3">酒精度(%)</el-col>
							<el-col :span="3">容量(ml)</el-col>
							<el-col :span="3">采购价(¥)</el-col>
							<el-col :span="5">数量</el-col>
							<el-col :span="4">操作</el-col>
						</el-row>
						<el-row class="text-center goods-box box box-align-center" v-for="(item,index) in goodsList">
							<el-col :span="3" class="box-center box">
								<div class="img-box button" @click="goodsDetail=item;openGoodsDetail=true;">
									<img v-lazy="item.image" class="goodsImg1">
								</div>
							</el-col>
							<el-col :span="3">
								<p class="button" @click="goodsDetail=item;openGoodsDetail=true;">{{item.fullName}}</p>
							</el-col>
							<el-col :span="3">
								<p>{{item.alcoholStrength}}</p>
							</el-col>
							<el-col :span="3">
								<p>{{item.volumn}}</p>
							</el-col>
							<el-col :span="3">
								<p>{{parseInt(item.tradePrice)==0?'暂缺':item.tradePriceStr}}</p>
							</el-col>
							<el-col :span="5">
								<div class="box box-center">
									<button class="chose-btn box box-center button" @click="donwCount(index)">
					                	<icon name="minus" scale="1.5" class="icon"></icon>
					                </button>
									<input class="chose-count" type="number" :disabled="false" v-model="buyCount[index]">
									<button class="chose-btn box box-center button" @click="upCount(index)">
			                			<icon name="add" scale="1.5" class="icon"></icon>
			              			</button>
								</div>
							</el-col>
							<el-col :span="4" class="box box-center">
								<div class="button" @click="addList(item.detailId,index)">
									加入清单
								</div>
							</el-col>
						</el-row>
					</div>
					<div class="text-right" v-if="goodsTotal>count">
						<el-pagination layout="prev, pager, next" :total="goodsTotal" :page-size="count" :current-page="page" @current-change="changePage"></el-pagination>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
	<el-dialog :visible.sync="openGoodsDetail" width="650px" center>
		<div class="goods-detail-box">
			<el-row class="box box-align-center goods-info" :gutter="15">
				<el-col :span="5">
					<div class="img-box">
						<img v-lazy="goodsDetail.image" class="goodsImg1">
					</div>
				</el-col>
				<el-col :span="19">
					<p>{{goodsDetail.fullName}}</p>
					<p>{{goodsDetail.enName}}</p>
				</el-col>
			</el-row>
			<el-row class="detail-list">
				<el-col :span="12">
					<label>品 牌：</label>
					<span>麦卡伦</span>
				</el-col>
				<el-col :span="12">
					<label>产 地：</label>
					<span>苏格兰-高地区</span>
				</el-col>
			</el-row>
			<el-row class="detail-list">
				<el-col :span="12">
					<label>净含量：</label>
					<span>700ml</span>
				</el-col>
				<el-col :span="12">
					<label>酒精度：</label>
					<span>{{goodsDetail.volumn}}</span>
				</el-col>
			</el-row>
			<el-row class="detail-list">
				<el-col :span="12">
					<label>木桶类型：</label>
					<span>雪莉桶</span>
				</el-col>
				<el-col :span="12">
					<label>类 别：</label>
					<span>单一麦芽威士忌</span>
				</el-col>
			</el-row>
			<el-row class="detail-list">
				<el-col :span="12">
					<label>木桶编号：</label>
					<span>1981012</span>
				</el-col>
				<el-col :span="12">
					<label>系 列：</label>
					<span>璀璨系列</span>
				</el-col>
			</el-row>
			<el-row class="detail-list">
				<el-col :span="12">
					<label>装 瓶 厂：</label>
					<span>独立装瓶厂</span>
				</el-col>
				<el-col :span="12">
					<label>装瓶数量：</label>
					<span>500</span>
				</el-col>
			</el-row>
			<el-row class="detail-list">
				<el-col :span="12">
					<label>蒸馏时间：</label>
					<span>1981-09-20</span>
				</el-col>
				<el-col :span="12">
					<label>装瓶时间：</label>
					<span>1991-09-20</span>
				</el-col>
			</el-row>
		</div>
	</el-dialog>
	<perFooter></perFooter>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftBar from './leftBar'
export default {
	name: 'myPurchase',
	data() {
		return {
			loadError: false,
			tabIndex: '1',
			name: '',
			brandName: '',
			goodsList: [],
			buyCount: [],
			goodsTotal: 1,
			count: 10,
			page: 1,
			openGoodsDetail: false,
			goodsDetail: "",
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
		},
	},
	methods: {
		initData() {
			let params = {
				apiUrl: this.config.mallApi + "buyer/goods/search",
				apiMethod: "post",
				name: this.name,
				brandName: this.brandName,
				current: this.page,
				size: this.count,
			};
			this.ajaxData(params, (res) => {
				if (res.data.code == "0000") {
					this.goodsList = res.data.data.records;
					this.goodsTotal = res.data.data.total;
					let buyCount = [];
					for (var i in this.goodsList) {
						buyCount.push(1);
					}
					this.buyCount = buyCount;
				} else {
					this.loadError = true;
				}
			})
		},
		donwCount(index) {
			this.buyCount[index] > 1 ? this.buyCount[index]-- : '';
			this.$set(this.buyCount, index, this.buyCount[index]);

		},
		upCount(index) {
			this.buyCount[index] = this.buyCount[index] + 1;
			this.$set(this.buyCount, index, this.buyCount[index]);
		},
		changePage: function(e) {
			this.page = e;
			this.initData();
		},
		addList(id, index) {
			let params = {
				apiUrl: this.config.mallApi + "buyer/procurementItem/add",
				productDetailId: id,
				number: this.buyCount[index]
			}
			this.ajaxData(params, (res) => {
				if (res.data.code == "0000") {
					this.$notify.success("加入清单成功！");
				} else {
					this.$notify.error(res.data.message);
				}
			})
		}
	},
	mounted() {
		this.tabIndex = this.$route.query.tabIndex || 1;
		this.initData();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('css/order.less');
@import url('css/purchase.less');
</style>

<style lang="less">
.myPurchase {
    .el-dialog__header {
        border-bottom: none;
        position: relative;
        padding: 0;
        .el-dialog__headerbtn {
            background: #000;
            width: 30px;
            height: 30px;
            top: -15px;
            right: -15px;
            border-radius: 50%;
            .el-icon-close {
                color: #fff;
                line-height: 30px;
            }
        }
    }
    .el-dialog__body {
        padding: 30px;
    }
}
</style>
