<template>
<div class="allGoods">
	<scrollTop></scrollTop>
	<cwHeader :nav="2"></cwHeader>
	<div class="mid-header container text-center">
		<h1>CHINA WHISKY</h1>
		<searchBar></searchBar>
	</div>
	<div class="goods-nav">
		<div class="container">
			<div class="header-img"><img src="../../img/seize/banner-s4.jpg"></div>
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
					<div class="button more" v-if="brandList && brandList.length>30 && max!=30" @click="checkMore(0)">收起更多</div>
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
	</div>
	<div class="goods-box">
		<div class="container">
			<div class="text-right" style="margin-bottom:30px;" v-if="goodsData.total>goodsData.size">
				<el-pagination layout="prev, pager, next" :total="goodsData.total?goodsData.total:1" :page-size="16" :current-page="page" @current-change="changePage"></el-pagination>
			</div>
			<LoadError v-if="loadError"></LoadError>
			<NoData :message="'没有符合条件的商品'" v-else-if="goodsData.records&&goodsData.records.length==0"></NoData>
			<proList v-else :goodsList="goodsData.records" @refresh="initData"></proList>
			<div class="text-right" v-if="goodsData.total>goodsData.size">
				<el-pagination layout="prev, pager, next" :total="goodsData.total?goodsData.total:1" :page-size="16" :current-page="page" @current-change="changePage"></el-pagination>
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
import searchBar from '@/components/searchBar/searchBar'

export default {
	name: 'allGoods',
	data() {
		return {
			goodsData: {},
			loadError: false,
			page: 1,
			categoryId: '',
			regionId: '',
			brandId: '',
			volumeValueId: '',
			categoryList: [],
			regionList: [],
			brandList: [],
			volumeList: [],
			max: 30,
		}
	},
	components: {
		cwHeader,
		proList,
		cwFooter,
		searchBar,
	},
	watch: {
		'$route' (to, from) {
			this.brandId = this.$route.query.brandId;
			this.categoryId = this.$route.query.categoryId;
			this.regionId = this.$route.query.regionId;
			this.volumeValueId = this.$route.query.volumeValueId;
			this.page = parseInt(this.$route.query.page || 1);
			this.initData();
		},
	},
	methods: {
		initData: function() {
			let that = this;
			that.loadGoods();
			let categoryParams = {
				apiUrl: that.config.mallApi + "dbcenter/findAllCategory",
			}
			that.ajaxData(categoryParams, function(res) {
				if (res.data.code == "0000") {
					let data = res.data.data
					that.categoryList = data;
					if (that.categoryId) {
						for (var i = 0; i < data.length; i++) {
							if (data[i].id == that.categoryId){
								that.regionList = data[i].children;
							}
						}
					}
				} else {
					console.log(res.data.message);
				}
			})

			if (that.categoryId) { //请求品牌
				let brandParams = {
					apiUrl: that.config.mallApi + "dbcenter/getCategoryFindaBrand?category=" + that.categoryId,
					apiMethod: 'get',
				}
				that.ajaxData(brandParams, function(res) {
					that.brandList = res.data;
				})
			} else {
				let brandParams = {
					apiUrl: that.config.mallApi + "dbcenter/getBrand",
					apiMethod: 'get',
				}
				that.ajaxData(brandParams, function(res) {
					that.brandList = res.data;
				})
			}

			let volumeParams = {
				apiUrl: that.config.mallApi + "dbcenter/productGoodsVolumeList",
				apiMethod: 'get',
			}
			that.ajaxData(volumeParams, function(res) {
				that.volumeList = res.data;
			})
		},
		loadGoods: function() {
			let that = this;
			let params = {
				apiUrl: that.config.mallApi + "goods/list/all",
				brandId: that.brandId,
				categoryId: this.regionId ? this.regionId : that.categoryId,
				volumeValueId: that.volumeValueId,
				current: that.page,
				customerSeq: that.util.getCookie('customerSeq'),
				size: 16,
			}
			that.ajaxData(params, function(res) {
				if (res.data.code == "0000") {
					var data = res.data.data;
					that.goodsData = data;
				} else {
					that.loadError = true;
				}
			})
		},
		choseCategory: function(item) {
			let data = {
				brandId: this.brandId,
				categoryId: item?item.id:'',
				regionId: '',
				volumeValueId: this.volumeValueId,
				page: this.page,
			}
			this.$router.push({
				path: "/YWxsR29vZHM",
				query: data
			})
		},
		choseRegion: function(item) {
			let data = {
				brandId: this.brandId,
				categoryId: this.categoryId,
				regionId: item?item.id:'',
				volumeValueId: this.volumeValueId,
				page: this.page,
			}
			this.$router.push({
				path: "/YWxsR29vZHM",
				query: data
			})
		},
		choseBrandId: function(item) {
			let data = {
				brandId: item?item.id:'',
				categoryId: this.categoryId,
				regionId: this.regionId,
				volumeValueId: this.volumeValueId,
				page: this.page,
			}
			this.$router.push({
				path: "/YWxsR29vZHM",
				query: data
			})
		},
		choseVolumeId: function(item) {
			let data = {
				brandId: this.brandId,
				categoryId: this.categoryId,
				regionId: this.regionId,
				volumeValueId: item?item.id:'',
				page: this.page || 1,
			}
			this.$router.push({
				path: "/YWxsR29vZHM",
				query: data
			})
		},
		changePage(item) {
			let data = {
				brandId: this.brandId,
				categoryId: this.categoryId,
				regionId: this.regionId,
				volumeValueId: this.volumeValueId,
				page: item,
			}
			this.$router.push({
				path: "/YWxsR29vZHM",
				query: data
			})
		},
		checkMore: function(e) {
			this.max = e == 1 ? 10000 : 30;
		},
	},
	mounted() {
		this.brandId = this.$route.query.brandId;
		this.categoryId = this.$route.query.categoryId;
		this.regionId = this.$route.query.regionId;
		this.volumeValueId = this.$route.query.volumeValueId;
		this.page = parseInt(this.$route.query.page || 1);
		this.initData();
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('allGoods.less');
</style>
