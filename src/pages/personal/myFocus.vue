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
				<leftMenu :navNum='11'></leftMenu>
			</el-col>
			<el-col :span="20">
				<LoadError v-if="loadError"></LoadError>
				<NoData :message="'您还没有关注过任何商品'" v-else-if="ficusData.records && ficusData.records.length==0"></NoData>
				<!--商品列表-->
				<proList v-else :goodsList="ficusData.records" @refresh="initData" :care="true"></proList>
			</el-col>
		</el-row>
		<div class="text-right" v-if="ficusData.total>1">
			<el-pagination layout="prev, pager, next" :total="ficusData.total?ficusData.total:1" :page-size="16" @current-change="changePage"></el-pagination>
		</div>
	</div>
	<perFooter></perFooter>
</div>
</template>

<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
//引入商品列表模板
import proList from '@/components/product/proList'
import leftMenu from './leftBar.vue'
export default {
	name: 'myFocus',
	data() {
		return {
			page: 1,
			loadError: false,
			ficusData: {},
		}
	},
	components: {
		perHeader,
		leftMenu,
		proList,
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
				apiUrl: that.config.mallApi + "center/favorite/list?size=16&current=" + that.page,
				apiMethod: "get",
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					that.ficusData = res.data.data;
				} else {
					that.loadError = true;
				}
			})
		},
		changePage: function(e) {
			this.$router.push('/bXlhdHRlbnRpb24K?page=' + e);
		},
	},
	mounted() {
		this.initData();
	},
}
</script>

<style lang="less" scoped>
@import url('css/personal.less');
.proList {
    padding: 0 0 0 40px;
}


</style>
