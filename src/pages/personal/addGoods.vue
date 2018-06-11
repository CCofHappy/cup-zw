<template>
<div class="addGoods">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>新增商品</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftBar :navNum="tabIndex"></leftBar>
			</el-col>
			<el-col :span="20">
				<div class="addGoods-container">
					<el-row class="search-box box box-align-center">
						<el-col :span="8">
							商品名称：&nbsp;&nbsp;<input v-model="fullName"></input>
						</el-col>
						<el-col :span="7">
							品牌：&nbsp;&nbsp;<input v-model="brand"></input>
						</el-col>
						<el-col :span="7">
							酒龄：&nbsp;&nbsp;<input v-model="storage"></input>
						</el-col>
						<el-col :span="2">
							<div class="search-btn button" @click="initData">
								搜索
							</div>
						</el-col>
					</el-row>
					<div class="no-data text-center" v-if="goodsTotal==0">
						<p>数据中心暂无此商品</p>
						<router-link :to="{ name: 'handAdd', query: {tabIndex: tabIndex} }">手动添加</router-link>
					</div>
					<div class="goods-list" v-else>
						<el-row class="text-center goods-title">
							<el-col :span="3">商品编号</el-col>
							<el-col :span="2">商品图片</el-col>
							<el-col :span="3">商品名称</el-col>
							<el-col :span="2">价格(￥)</el-col>
							<el-col :span="2">品牌</el-col>
							<el-col :span="2">系列</el-col>
							<el-col :span="2">木桶类型</el-col>
							<el-col :span="3">蒸馏时间</el-col>
							<el-col :span="3">装瓶时间</el-col>
							<el-col :span="2">操作</el-col>
						</el-row>
						<el-row class="text-center goods-box box box-align-center" v-for="(item,index) in goodsList" :key="index">
							<el-col :span="3">
								<p class="">{{item.code}}</p>
							</el-col>
							<el-col :span="2" class="box-center box">
								<div class="img-box">
									<img class="goodsImg1" v-lazy="item.image">
								</div>
							</el-col>
							<el-col :span="3">
								<p class="">{{item.fullName}}</p>
							</el-col>
							<el-col :span="2">
								<p class="">233%</p>
							</el-col>
							<el-col :span="2">
								<p class="">{{item.brandName}}</p>
							</el-col>
							<el-col :span="2">
								<p class="">{{item.series||'暂缺'}}</p>
							</el-col>
							<el-col :span="2">
								<p class="">{{item.bucketType}}</p>
							</el-col>
							<el-col :span="3">
								<p class="">{{item.distillTime||'暂缺'}}</p>
							</el-col>
							<el-col :span="3">
								<p class="">{{item.bottlingTime||'暂缺'}}</p>
							</el-col>
							<el-col :span="2" class="box box-center">
								<router-link  class="button add-btn" :to="{ name: 'choseAdd', query: {tabIndex: tabIndex,id:item.productId} }">选择</router-link>
							</el-col>
						</el-row>
					</div>

					<div class="text-right" v-if="goodsTotal>count">
						<el-pagination layout="prev, pager, next" :total="goodsTotal" :page-size="count" :current-page="page" @current-change="changePage"></el-pagination>
					</div>
				</div>
				<div class="addGoods-container" v-if="goodsList.length>0">

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
	name: 'addGoods',
	data() {
		return {
			loadError: false,
			tabIndex: '1',
			page: 1,
			count: 10,
			goodsList:[],
			goodsTotal: 1,
			fullName: "",
			brand: "",
			storage: "",
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
		initData: function() {
			let params={
				apiUrl: this.config.mallApi + "supplier/goods/search",
				current:this.page,
				size:this.count,
				fullName:this.fullName,
				brand:this.brand,
				storage:this.storage,
			}
			this.ajaxData(params, (res)=> {
				if (res.data.code=="0000") {
					this.goodsList = res.data.data.records;
					this.goodsTotal = res.data.data.total;
				}else {
					this.loadError = true;
				}
			})
		},
		searchGoods: function () {
			this.initData();
		},
		changePage: function (e) {
			this.page = e;
			this.initData();
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
