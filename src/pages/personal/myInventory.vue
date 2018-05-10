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
							<el-checkbox v-model="checkAll"></el-checkbox><span>全选</span>
						</el-col>
						<el-col :span="22">
						</el-col>
					</el-row>
					<div class="inventory-list">
						<div class="inventory-content">
							<el-row class="text-center box box-center">
								<el-col :span="2" class="shop-card-checkbox">
									<el-checkbox text-color="#fff"></el-checkbox>
								</el-col>
								<el-col :span='20'>
									<el-row class="text-center box box-center">
										<el-col :span="14" class="text-left">
											<div class="box box-align-center">
												<div class="img-box box-center box">
													<img v-lazy="" class="goodsImg1">
												</div>
												<div>
													<h4>Ben Nevis 63 Years Old 1926 Single Malt Scotch Whisky</h4>
													<p class="titke-cn">班尼富63年 1926 单一麦芽苏格兰威士忌</p>
												</div>
											</div>
										</el-col>
										<el-col :span="5">
											<p>酒精度：12%</p>
											<p>净含量：820ml</p>
										</el-col>
										<el-col :span="5"><small>￥</small>14000</el-col>
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
									</el-row>
								</el-col>
								<el-col :span="2" class="box box-center">
									<div class="button">
										删除
									</div>
								</el-col>
							</el-row>
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
	name: 'myInventory',
	data() {
		return {
			loadError: false,
			checkAll: false,
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
			this.tabIndex = this.$route.query.tabIndex || 1;
			this.initData();
		},
		selectedIndex(curVal, oldVal) {
			if (curVal != oldVal) {
				this.$router.push("/cGVyc29uYWwvbXlPcmRlcg?page=1&term=" + curVal + "&tabIndex=" + this.tabIndex)
			}
		}
	},
	methods: {
		initData: function() {

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
