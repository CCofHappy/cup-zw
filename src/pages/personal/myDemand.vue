<template>
<div class="saleService">
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
	name: 'saleService',
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
			let that = this;
			that.util.returnLogin(that);
			that.page = parseInt(that.$route.query.page ? that.$route.query.page : 1);
			let orderApi = "";
			let type = that.$route.query.tabIndex ? that.$route.query.tabIndex : 1;
			let params = {
				apiUrl: that.config.mallApi + "order/list/all?size=10&current=" + that.page + "&term=" + that.selectedIndex,
				apiMethod: "get",
			}
			that.ajaxData(params, function(res) {
				if (res.data.code == "0000") {
					that.orderData = res.data.data;
				} else {
					that.loadError = true;
				}
			})
		},
		choseSaleType: function (e) {
			this.saleType = e;
		},
		changePage: function(e) {
			let data = {
				page: e,
				term: this.$route.query.term ? this.$route.query.term : 1,
				tabIndex: this.$route.query.tabIndex ? this.$route.query.tabIndex : 1,
			}
			this.$router.push({
				path: "/cGVyc29uYWwvbXlPcmRlcg",
				query: data
			})
		},
		forDate: function(e) {
			return this.util.forDate(e, "yyyy-MM-dd")
		}
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
</style>
