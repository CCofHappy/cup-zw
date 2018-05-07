<template>
<div class="search">
	<cwHeader></cwHeader>
	<div class="container">
		<div class="search-input">
			<el-input placeholder="">
				<el-button slot="append">搜索</el-button>
			</el-input>
		</div>

		<div class="search-condition">
			<div class="region-chose box">
				<div class="title">
					分&nbsp;&nbsp;&nbsp;&nbsp;类：
				</div>
				<div class="chose-button box box-align-center">
					<div class="button" @click="choseCategory()" :class="{active:!categoryId}">全部</div>
					<div class="button" v-for="item in categoryList" @click="choseCategory(item)" :class="{active:categoryId==item.id}">{{item.name}}</div>
				</div>
			</div>
			<div class="brand-chose box" v-if="regionList.length>0">
				<div class="title">
					地&nbsp;&nbsp;&nbsp;&nbsp;区：
				</div>
				<div class="chose-button">
					<div class="button" @click="choseRegion()" :class="{active:!regionId}">全部</div>
					<div class="button" v-for="item in regionList" @click="choseRegion(item)" :class="{active:regionId==item.id}">{{item.name}}</div>
				</div>
			</div>
			<div class="brand-chose box">
				<div class="title">
					品&nbsp;&nbsp;&nbsp;&nbsp;牌：
				</div>
				<div class="chose-button">
					<div class="button" :class="{active:!brandId}" @click="choseBrandId()">全部</div>
					<div class="button" v-for="(item,index) in brandList" v-if="index<max" @click="choseBrandId(item)" :class="{active:brandId==item.id}">{{item.name}}</div>
					<div class="button more" v-if="brandList && brandList.length>30 && max==30" @click="checkMore(1)">查看更多></div>
					<div class="button more" v-if="brandList && brandList.length>30 && max!=30" @click="checkMore(0)">收起更多
						<</div>
					</div>
				</div>
				<div class="ml-chose box box-align-center">
					<div class="title">净含量：</div>
					<div class="chose-button">
						<div class="button" :class="{active:!volumeValueId}" @click="choseVolumeId()">全部</div>
						<div class="button" v-for="(item,index) in volumeList" @click="choseVolumeId(item)" :class="{active:volumeValueId==item.id}">{{item.name}}</div>
					</div>
				</div>
			</div>
			<div class="search-bar box">
				<div class="chose-btn button" @click="changeType(0)" :class="{active:searchType==0}">
					默认排序
				</div>
				<div class="chose-btn button price-sort" @click="changeType(5)" :class="{active:searchType==5}">
					价格从高到低
					<i class="el-icon-arrow-down el-icon--right"></i>
				</div>
				<div class="chose-btn button price-sort" @click="changeType(6)" :class="{active:searchType==6}">
					价格从低到高
					<i class="el-icon-arrow-up el-icon--right"></i>
				</div>
			</div>
			<div class="search-goods-box">
				<LoadError v-if="loadError"></LoadError>
				<NoData :message="'没有符合条件的商品'" v-else-if="searchData && searchData.records.length==0"></NoData>
				<proList v-else :goodsList="searchData && searchData.records"></proList>
				<div class="text-right" v-if="searchData.total>16">
					<el-pagination layout="prev, pager, next" :total="searchData.total?searchData.total:1" :page-size="16" @current-change="changePage" :current-page="page"></el-pagination>
				</div>
			</div>
		</div>
		<cwFooter></cwFooter>
	</div>
</template>

<script>
import cwHeader from '@/components/header/header'
import cwFooter from '@/components/footer/footer'
import proList from '@/components/product/proList'
export default {
	name: 'search',
	data() {
		return {
			type: 1,
			loadError: false,
			searchData: "",
			searchType: 0,
			minPrice: '',
			maxPrice: '',
			categoryId: '',
			regionId: '',
			brandId: '',
			volumeValueId: '',
			categoryList: [],
			regionList: [],
			brandList: [],
			volumeList: [],
			max: 30,
			page: 1,
		}
	},
	components: {
		cwHeader,
		proList,
		cwFooter,
	},
	watch: {
		'$route' (to, from) {
			this.loadGoods();
		},
	},
	methods: {
		initData: function() {
			let that = this;
			that.loadGoods();
			that.$ajax({
				method: "post",
				url: that.config.mallApi + "dbcenter/findAllCategory",
				headers: {
					'Content-type': 'application/json;charset=UTF-8',
					'Authentication': that.util.getCookie('token')
				},
				data: {}
			}).then(function(res) {
				that.categoryList = res.data.data;
			}).catch(function(err) {
				console.log(err);
			})

			if (that.categoryId) { //请求品牌
				let params = {
					apiUrl: that.config.mallApi + "dbcenter/getCategoryFindaBrand?category=" + that.categoryId,
					apiMethod: "get",
				}
				that.ajaxData(params, function(res) {
					that.brandList = res.data;
				})
			} else {
				let params = {
					apiUrl: that.config.mallApi + "dbcenter/getBrand",
					apiMethod: "get",
				}
				that.ajaxData(params, function(res) {
					that.brandList = res.data;
				})
			}

			let volumeParams = {
				apiUrl: that.config.mallApi + "dbcenter/productGoodsVolumeList",
				apiMethod: "get",
			}
			that.ajaxData(volumeParams, function(res) {
				that.volumeList = res.data;
			})
		},

		loadGoods: function() {
			let value = this.$route.query.value.replace(/%20/g, " ");
			let that = this;
			let current = that.page;
			let params = {
				apiUrl: that.config.mallApi + "goods/search/all",
				customerSeq: that.util.getCookie('customerSeq') ? that.util.getCookie('customerSeq') : 0,
				name: value,
				current: current,
				searchType: that.searchType,
				size: 16,
				minPrice: that.minPrice,
				maxPrice: that.maxPrice,
				brandId: that.brandId,
				categoryId: that.regionId ? that.regionId : that.categoryId,
				volumeValueId: that.volumeValueId,
			}
			that.searchValue = value;
			that.ajaxData(params, function(res) {
				if (res.data.code == "0000") {
					that.searchData = res.data.data;
				} else {
					that.loadError = true;
				}
			})
		},
		choseCategory: function(item) {
			if (item) {
				this.categoryId = item.id;
				this.regionList = item.children;
			} else {
				this.categoryId = "";
				this.regionList = [];
			}
			this.regionId = "";
			this.page = 1;
			this.loadGoods();
		},
		choseRegion: function(item) {
			if (item) {
				this.regionId = item.id;
			} else {
				this.regionId = "";
			}
			this.page = 1;
			this.loadGoods();
		},
		choseBrandId: function(item) {
			if (item) {
				this.brandId = item.id;
			} else {
				this.brandId = "";
			}
			this.page = 1;
			this.loadGoods();
		},
		choseVolumeId: function(item) {
			if (item) {
				this.volumeValueId = item.id;
			} else {
				this.volumeValueId = "";
			}
			this.page = 1;
			this.loadGoods();
		},
		checkMore: function(e) {
			this.max = e == 1 ? 10000 : 30;
		},
		changeType(e) {
			this.searchType = e;
			this.loadGoods();
		},
		changePage(e) {
			this.page = e;
			this.loadGoods();
		},
	},
	mounted() {
		this.initData();
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('search.less');
</style>
