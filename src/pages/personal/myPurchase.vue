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
				<div class="myPurchase-container">
					<el-row class="search-box box box-align-center">
						<el-col :span="11" class="box-flex">
							商品种类：&nbsp;&nbsp;<input></input>
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
					<div class="myPurchase-list">
						<el-row class="text-center title">
							<el-col :span="3">商品图片</el-col>
							<el-col :span="3">商品名称</el-col>
							<el-col :span="3">酒精度(%)</el-col>
							<el-col :span="3">容量(ml)</el-col>
							<el-col :span="3">采购价(¥)</el-col>
							<el-col :span="5">数量</el-col>
							<el-col :span="4">操作</el-col>
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
	name: 'myPurchase',
	data() {
		return {
			loadError: false,
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
			this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : 1;
		},
	},
	methods: {
	},
	mounted() {
		this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : 1
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('css/order.less');
@import url('css/purchase.less');

</style>
