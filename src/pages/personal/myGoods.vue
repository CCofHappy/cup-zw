<template>
<div class="myGoods">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>我的商品</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftBar :navNum="tabIndex"></leftBar>
			</el-col>
			<el-col :span="20">
				<div class="myGoods-container">
					<el-row class="search-box box box-align-center">
						<el-col :span="11" class="box-flex">
							商品名称：&nbsp;&nbsp;<input></input>
						</el-col>
						<el-col :span="11" class="box-flex">
							品牌：&nbsp;&nbsp;<input></input>
						</el-col>
						<el-col :span="2">
							<div class="search-btn">
								搜索
							</div>
						</el-col>
					</el-row>
					<div class="goods-list">
						<el-row class="text-center goods-title">
							<el-col :span="3">商品图片</el-col>
							<el-col :span="3">商品名称</el-col>
							<el-col :span="3">酒精度(%)</el-col>
							<el-col :span="3">容量(ml)</el-col>
							<el-col :span="3">采购价(¥)</el-col>
							<el-col :span="5">数量</el-col>
							<el-col :span="4">操作</el-col>
						</el-row>
						<el-row class="text-center goods-box box box-align-center">
							<el-col :span="3" class="box-center box">
								<div class="img-box">
									<img v-lazy="" class="goodsImg1">
								</div>
							</el-col>
							<el-col :span="3">
								<p class="">麦卡伦18年麦卡伦18年麦卡伦18年麦卡伦18年</p>
							</el-col>
							<el-col :span="3">
								<p class="">45%</p>
							</el-col>
							<el-col :span="3">
								<p class="">700</p>
							</el-col>
							<el-col :span="3">
								<p class="">319</p>
							</el-col>
							<el-col :span="5">
								<div class="box box-center">
									<button class="chose-btn box box-center button">
					                	<icon name="minus" scale="1.5" class="icon"></icon>
					                </button>
									<input class="chose-count" type="number" :disabled="false" v-model="count">
									<button class="chose-btn box box-center button">
			                			<icon name="add" scale="1.5" class="icon"></icon>
			              			</button>
								</div>
							</el-col>
							<el-col :span="4">
								<div class="button">
									加入清单
								</div>
							</el-col>
						</el-row>
						<el-row class="text-center goods-box box box-align-center">
							<el-col :span="3" class="box-center box">
								<div class="img-box">
									<img v-lazy="" class="goodsImg1">
								</div>
							</el-col>
							<el-col :span="3">
								<p class="">麦卡伦18年麦卡伦18年麦卡伦18年麦卡伦18年</p>
							</el-col>
							<el-col :span="3">
								<p class="">45%</p>
							</el-col>
							<el-col :span="3">
								<p class="">700</p>
							</el-col>
							<el-col :span="3">
								<p class="">319</p>
							</el-col>
							<el-col :span="5">
								<div class="box box-center">
									<button class="chose-btn box box-center button">
					                	<icon name="minus" scale="1.5" class="icon"></icon>
					                </button>
									<input class="chose-count" type="number" :disabled="false" v-model="count">
									<button class="chose-btn box box-center button">
			                			<icon name="add" scale="1.5" class="icon"></icon>
			              			</button>
								</div>
							</el-col>
							<el-col :span="4">
								<div class="button">
									加入清单
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
	name: 'myGoods',
	data() {
		return {
			loadError: false,
			tabIndex: '1',
			page: 1,
			count: 1,
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
			let params = {
				apiUrl: this.config.mallApi + "buyer/goods/search",
				apiMethod: "post",
				name: "",
				brandName: "",
				current: 1,
				size: 10,
			};
			this.ajaxData(params, function(res) {
				console.log(res)
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
