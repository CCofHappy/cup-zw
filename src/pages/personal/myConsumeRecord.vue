<template>
<div class="myFocus">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>个人中心</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftMenu :navNum='10'></leftMenu>
			</el-col>
			<el-col :span="20">
				<!--消费记录列表-->
				<div class="nav-record-subtitle">
					<h5><span class="date">近一年的消费金额</span><span class="price">￥{{consumeRecord.consumeMoney || '0.00'}} </span><small>元</small></h5>
					<LoadError v-if="loadError"></LoadError>
					<el-table :data="recordsData" class="width: 100%" empty-text="没有相关消费记录" v-else>
						<el-table-column prop="consumeTime" label="时间"></el-table-column>
						<el-table-column prop="orderNo" label="订单号"></el-table-column>
						<!-- <el-table-column prop="reduceAmount" label="消费额减扣"></el-table-column> -->
						<el-table-column prop="consumeAmount" label="消费额"></el-table-column>
						<el-table-column prop="remark" label="备注"></el-table-column>
					</el-table>
				</div>
			</el-col>
		</el-row>
		<div class="text-right" v-if="consumeRecord.consumePage && consumeRecord.consumePage.total>1">
			<el-pagination layout="prev, pager, next" :total="consumeRecord.consumePage.total?consumeRecord.consumePage.total:1" @current-change="changePage"></el-pagination>
		</div>
	</div>
	<perFooter></perFooter>
</div>
</template>

<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
//引入商品列表模板
import leftMenu from './leftBar.vue'
export default {
	name: 'myFocus',
	data() {
		return {
			page: 1,
			loadError: false,
			consumeRecord: [],
			recordsData:[],
		}
	},
	components: {
		perHeader,
		leftMenu,
		perFooter,
	},
	watch: {
		'$route' (to, from) {
			this.page = parseInt(this.$route.query.page ? this.$route.query.page : 1);
			this.initData();
		}
	},
	methods: {
		initData() {
			let that = this;
			that.util.returnLogin(that);
			let params = {
				apiUrl: this.config.mallApi + 'center/consume/list?current='+ that.page +'&size=10',
				apiMethod: "get",
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					that.consumeRecord = res.data.data;
					that.recordsData = res.data.data.consumePage.records;
				} else {
					that.loadError = true;
				}
			})
		},
		changePage: function(e) {
			this.$router.push('/bXlDb25zdW1lUmVjb3Jk?page=' + e);
		},
	},
	mounted() {
		this.initData();
	}
}
</script>

<style lang="less" scoped>
@import url('css/personal.less');
</style>
