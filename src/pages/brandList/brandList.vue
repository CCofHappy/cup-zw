<template>
<div class="brandList">
	<div class="top-nav">
		<div class="container box box-between box-align-center">
			<div class="logo-box">
				<img src="../../img/web-logo.png">
			</div>
			<ul class="nav-box box">
				<li>
					<router-link to="/aG9tZQ">商城</router-link>
				</li>
				<li>
					<router-link to="/d2Vic2l0ZQ">拍卖</router-link>
				</li>
				<li>
					<router-link to="/d2Vic2l0ZQ">分享·论坛</router-link>
				</li>
				<li>
					<router-link to="/d2Vic2l0ZQ">品牌</router-link>
				</li>
				<li>
					<router-link to="/d2Vic2l0ZQ">资讯</router-link>
				</li>
				<li>
					<router-link to="/d2Vic2l0ZQ">客户端</router-link>
				</li>
			</ul>
		</div>
	</div>
	<div class="brandList-box container">
		<div class="search-box">
			<el-input placeholder="" :value="inputSearch" v-model="inputSearch">
				<el-button slot="append" icon="el-icon-search" @click="searcSend"></el-button>
			</el-input>
		</div>
		<div class="nav-box">
			<div class="nav-title">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/d2Vic2l0ZQ' }">中威网</el-breadcrumb-item>
					<el-breadcrumb-item>全部品牌</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="brandList-banner">
			<img src="../../img/background/prodet.jpg">
		</div>
		<div class="brand-classify box box-center" v-if="!searchMode">
			<div class="classify-btn button" :class="{ active:classifyType==-1}" @click="classifyType=-1">
				全部
			</div>
			<div class="classify-btn button" :class="{ active:classifyType==item.id}" @click="classifyType=item.id" v-for="(item,index) in categoryList">
				{{item.name}}
			</div>
		</div>
		<div class="brands-box text-center">
			<LoadError v-if="loadError"></LoadError>
			<NoData :message="'没有符合条件的品牌'" v-else-if="brandList.records&&brandList.records.length==0"></NoData>
			<el-row :gutter="30" v-else>
				<el-col :span="6" v-for="(item,index) in brandList.records">
					<router-link :to="{ path: '/YnJhbmREZXRhaWw', query: {id:item.id}} " target="_blank">
						<div class="brand-box">
							<div class="logo-box box box-center">
								<img v-lazy="item.logo">
							</div>
							<div class="brand-text">
								<p class="text-overflow">{{item.enName}}</p>
								<p class="text-overflow">{{item.enName!=item.name?item.name:""}}</p>
							</div>
						</div>
					</router-link>
				</el-col>
			</el-row>
		</div>
		<div class="text-center page-box">
			<el-pagination layout="prev, pager, next" :page-size="16" :total="brandList.total" :current-page="page" @current-change="changePage" v-if="brandList&&brandList.total>16">
			</el-pagination>
		</div>
	</div>
	<cwFooter></cwFooter>
</div>
</template>

<script>
import cwFooter from '@/components/footer/footer'
export default {
	name: 'home',
	data() {
		return {
			classifyType: "",
			loadError: false,
			categoryList: "",
			brandList: "",
			page: 1,
			inputSearch: "",
			searchMode: false,
		}
	},
	components: {
		cwFooter,
	},
	watch: {　　
		classifyType(curVal, oldVal) {
			var that = this;
			var categoryId = curVal == -1 ? "" : curVal;
			that.page = 1
			var data = {
				"categoryId": categoryId,
				"current": 1,
				"size": 16
			}
			that.brandData(data)
		},
	},
	methods: {
		initData: function() {
			let that = this;
			that.classifyType = -1;
			let params = {
				apiUrl: that.config.mallApi + "dbcenter/findAllCategory",
			}
			that.ajaxData(params, function(res) {
				if (res.data.code == "0000") {
					that.categoryList = res.data.data;
				} else {
					that.loadError = true;
					console.log(res.data.message);
				}
			})
		},
		brandData: function(data) {
			let that = this;
			let params = data
			params.apiUrl = this.config.mallApi + "dbcenter/queryBrandByCategory";
			that.ajaxData(params, function(res) {
				if (res.data.code == "0000") {
					that.brandList = res.data.data;
					that.searchMode = false;
				} else {
					that.loadError = true;
					console.log(res.data.message);
				}
			})
		},
		changePage: function(e) {
			let that = this;
			let categoryId = that.classifyType == -1 ? "" : that.classifyType;
			let data = {
				"current": e,
				"size": 16
			};
			if (that.searchMode) {
				data.name = that.inputSearch;
				that.searchData(data)
			} else {
				data.categoryId = categoryId;
				that.brandData(data)
			}
		},
		searcSend: function() {
			if (this.inputSearch.trim()) {
				let data = {
					"name": this.inputSearch,
					"current": 1,
					"size": 16
				}
				this.searchData(data)
			} else {
				let data = {
					"categoryId": "",
					"current": 1,
					"size": 16
				}
				this.brandData(data)
			}
		},
		searchData(data) {
			let that = this;
			let params = data;
			params.apiUrl = that.config.mallApi + "dbcenter/selectBrandByName";

			that.ajaxData(params, function(res) {
				if (res.data.code == "0000") {
					that.brandList = res.data.data;
					that.searchMode = true;
				} else {
					that.loadError = true;
					console.log(res.data.message);
				}
			})
		}
	},
	mounted() {
		this.initData();
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('../website/website.less');
@import url('brandList.less');
</style>
