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
							商品名称：&nbsp;&nbsp;<input></input>
						</el-col>
						<el-col :span="7">
							品牌：&nbsp;&nbsp;<input></input>
						</el-col>
						<el-col :span="7">
							酒龄：&nbsp;&nbsp;<input></input>
						</el-col>
						<el-col :span="2">
							<div class="search-btn">
								搜索
							</div>
						</el-col>
					</el-row>
					<div class="goods-list">
						<el-row class="text-center goods-title">
							<el-col :span="2">商品编号</el-col>
							<el-col :span="2">商品图片</el-col>
							<el-col :span="3">商品名称</el-col>
							<el-col :span="2">价格(￥)</el-col>
							<el-col :span="2">品牌</el-col>
							<el-col :span="2">系列</el-col>
							<el-col :span="3">蒸馏时间</el-col>
							<el-col :span="3">木桶类型</el-col>
							<el-col :span="3">装瓶时间</el-col>
							<el-col :span="2">操作</el-col>
						</el-row>
						<el-row class="text-center goods-box box box-align-center">
							<el-col :span="2">
								<p class="">GS21234</p>
							</el-col>
							<el-col :span="2" class="box-center box">
								<div class="img-box">
									<img v-lazy="" class="goodsImg1">
								</div>
							</el-col>
							<el-col :span="3">
								<p class="">麦卡伦18年麦卡伦18年麦卡伦18年麦卡伦18年</p>
							</el-col>
							<el-col :span="2">
								<p class="">233%</p>
							</el-col>
							<el-col :span="2">
								<p class="">麦卡伦</p>
							</el-col>
							<el-col :span="2">
								<p class="">璀璨</p>
							</el-col>
							<el-col :span="3">
								<p class="">雪莉桶</p>
							</el-col>
							<el-col :span="3">
								<p class="">1992-09-09</p>
							</el-col>
							<el-col :span="3">
								<p class="">1992-09-09</p>
							</el-col>
							<el-col :span="2" class="box box-center">
								<div class="button add-btn">选择</div>
							</el-col>
						</el-row>
						<el-row class="text-center goods-box box box-align-center">
							<el-col :span="2">
								<p class="">GS21234</p>
							</el-col>
							<el-col :span="2" class="box-center box">
								<div class="img-box">
									<img v-lazy="" class="goodsImg1">
								</div>
							</el-col>
							<el-col :span="3">
								<p class="">麦卡伦18年麦卡伦18年麦卡伦18年麦卡伦18年</p>
							</el-col>
							<el-col :span="2">
								<p class="">233%</p>
							</el-col>
							<el-col :span="2">
								<p class="">麦卡伦</p>
							</el-col>
							<el-col :span="2">
								<p class="">璀璨</p>
							</el-col>
							<el-col :span="3">
								<p class="">雪莉桶</p>
							</el-col>
							<el-col :span="3">
								<p class="">1992-09-09</p>
							</el-col>
							<el-col :span="3">
								<p class="">1992-09-09</p>
							</el-col>
							<el-col :span="2" class="box box-center">
								<div class="button add-btn">选择</div>
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
	name: 'addGoods',
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
