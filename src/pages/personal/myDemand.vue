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
					<div class="order-list">
						<div class="order-title box box-between box-align-center">
							<div>需求单号：8178273817283718&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-color-help">需求单生成时间：2017-12-30  14:20:50</span></div>
							<div class="text-color-help del-btn button">
								删除需求
							</div>
						</div>
						<div class="order-content">
							<el-row class="text-center box box-center order-row">
								<el-col :span='21'>
									<el-row class="text-center box box-center order-item">
										<el-col :span="14" class="text-left">
											<div class="box box-align-center">
												<div class="img-box box-center box">
													<img v-lazy="" class="goodsImg1">
												</div>
												<div>
													<h4>Ben Nevis 63 Years Old 1926 Single Malt Scotch Whisky</h4>
													<p class="titke-cn">班尼富63年 1926 单一麦芽苏格兰威士忌</p>
													<p class="text-color-help">酒精度：12%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;净含量：820ml</p>
												</div>
											</div>
										</el-col>
										<el-col :span="5"><small>￥</small>14000</el-col>
										<el-col :span="5">x11</el-col>
									</el-row>
								</el-col>
								<el-col :span="3" class="box box-center">
									<div class="button">
										加入清单
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
					<div class="order-list">
						<div class="order-title box box-between box-align-center">
							<div>需求单号：8178273817283718&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-color-help">需求单生成时间：2017-12-30  14:20:50</span></div>
							<div class="text-color-help del-btn button">
								删除需求
							</div>
						</div>
						<div class="order-content">
							<el-row class="text-center box box-center order-row">
								<el-col :span='21'>
									<el-row class="text-center box box-center order-item">
										<el-col :span="14" class="text-left">
											<div class="box box-align-center">
												<div class="img-box box-center box">
													<img v-lazy="" class="goodsImg1">
												</div>
												<div>
													<h4>Ben Nevis 63 Years Old 1926 Single Malt Scotch Whisky</h4>
													<p class="titke-cn">班尼富63年 1926 单一麦芽苏格兰威士忌</p>
													<p class="text-color-help">酒精度：12%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;净含量：820ml</p>
												</div>
											</div>
										</el-col>
										<el-col :span="5"><small>￥</small>14000</el-col>
										<el-col :span="5">x11</el-col>
									</el-row>
								</el-col>
								<el-col :span="3" class="box box-center">
									<div class="button wait">
										到货通知
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
	name: 'myDemand',
	data() {
		return {
			loadError: false,
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
			this.initData();
		},
		selectedIndex(curVal, oldVal) {
			if (curVal != oldVal) {
			}
		}
	},
	methods: {
		initData: function() {

		},
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
@import url('css/purchase.less');
</style>
