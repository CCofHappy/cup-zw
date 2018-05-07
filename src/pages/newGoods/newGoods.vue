<template>
<div class="newGoods">
	<scrollTop></scrollTop>
	<cwHeader :nav="3"></cwHeader>
	<div class="mid-header container text-center">
		<h1>CHINA WHISKY</h1>
		<!-- <div class="search-box">
			<el-input placeholder="">
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div> -->
	</div>
	<div class="goods-nav">
		<div class="container">
			<div class="header-img" v-if=""><img v-bind:src="banner"></div>
			<div class="region-chose box">
				<div class="title">
					分&nbsp;&nbsp;&nbsp;&nbsp;类：
				</div>
				<div class="chose-button box box-align-center">
					<div class="button" @click="choseCategory()"  :class="{active:!categoryId}">全部</div>
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
					<div class="button" :class="{active:!brandId}"  @click="choseBrandId()">全部</div>
					<div class="button" v-for="(item,index) in brandList" v-if="index<max" @click="choseBrandId(item)" :class="{active:brandId==item.id}">{{item.name}}</div>
					<div class="button more" v-if="brandList && brandList.length>30 && max==30" @click="checkMore(1)">查看更多></div>
					<div class="button more" v-if="brandList && brandList.length>30 && max!=30" @click="checkMore(0)">收起更多<</div>
				</div>
			</div>
			<div class="ml-chose box">
				<div class="title">
					时&nbsp;&nbsp;&nbsp;&nbsp;间：
				</div>
				<div class="chose-button box">
					<div class="button" @click="choseDate(0)" :class="{active:dateType==0}">全部</div>
					<div class="button" @click="choseDate(1)" :class="{active:dateType==1}">最近一个月</div>
					<div class="button" @click="choseDate(2)" :class="{active:dateType==2}">近三个月</div>
					<div class="button" @click="choseDate(3)" :class="{active:dateType==3}">近半年</div>
				</div>
			</div>
		</div>
	</div>
	<div class="goods-box">
		<div class="container page-box" v-if="!loadError && newGoodsData && newGoodsData.records.total>10">
			<div class="block fl-right">
				<el-pagination layout="prev, pager, next" :page-size="10" :total="newGoodsData.total" :current-page="page" @current-change="changePage">
				</el-pagination>
			</div>
		</div>
		<div class="container">
			<LoadError v-if="loadError"></LoadError>
			<NoData :message="'没有符合条件的新酒'" v-else-if="newGoodsData.records&&newGoodsData.records.length==0"></NoData>
			<el-row v-else>
				<el-col :span="12" v-for="item in newGoodsData.records">
					<div class="good-box box">
						<div class="img-box box box-center">
							<img :src="item.image">
						</div>
						<div class="detail-box">
							<div class="title-box">
								<div class="title text-overflow-more text-overflow-two">{{item.enName}}</div>
								<div class="title cn text-overflow-more text-overflow-two">{{item.fullName}}</div>
							</div>
							<div class="small-box box">
								<div>
									容量： {{item.volumn}}
								</div>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<div>
									酒精度： {{item.alcoholStrength}}
								</div>
							</div>
							<div class="price-box">{{ item.priceStr==0 ? '暂无' : '￥'+item.priceStr}}</div>
							<router-link :to="'/Z29vZHNEZXRhaWw?type=2&id='+item.id" class="box" target="_blank">
								<div class="stock-box box box-center" v-if="item.stock==0">暂时缺货</div>
								<div class="stock-box buy box box-center" v-else>立即购买</div>
							</router-link>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="container page-box" v-if="!loadError&&newGoodsData&&newGoodsData.records.total>10">
			<div class="block fl-right">
				<el-pagination layout="prev, pager, next" :page-size="10" :total="newGoodsData.total" :current-page="page" @current-change="changePage">
				</el-pagination>
			</div>
		</div>
	</div>
	<cwFooter></cwFooter>
</div>
</template>
<script>
import cwHeader from '@/components/header/header'
import cwFooter from '@/components/footer/footer'
export default {
	name: 'newGoods',
	data() {
		return {
			newGoodsData: '',
			banner: '',
			loadError: false,
			categoryList: [],
			regionList: [],
			brandList: [],
			volumeList: [],
			categoryId: '',
			regionId: '',
			brandId: '',
			dateType: 0,
			page:1,
			max: 30,
		}
	},
	components: {
		cwHeader,
		cwFooter,
	},
	watch: {
		'$route' (to, from) {
			this.brandId = this.$route.query.brandId;
			this.categoryId = this.$route.query.categoryId;
			this.regionId = this.$route.query.regionId;
			this.dateType = this.$route.query.dateType;
			this.page = parseInt(this.$route.query.page || 1);
			this.initData();
		},
	},
	methods: {
		initData: function() {
			let that = this;
			that.loadGoods();
			let params = {
				apiUrl: that.config.mallApi + "dbcenter/findAllCategory" ,
			}
			that.ajaxData(params,function (res) {
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
				let categoryParams = {
					apiUrl: that.config.mallApi + "dbcenter/getCategoryFindaBrand?category=" + that.categoryId,
					apiMethod: "get",
				}
				that.ajaxData(categoryParams,function (res) {
					that.brandList = res.data;
				})
			} else {
				let brandParams = {
					apiUrl: that.config.mallApi + "dbcenter/getBrand" ,
					apiMethod: "get",
				}
				that.ajaxData(brandParams,function (res) {
					that.brandList = res.data;
				})
			}

		},
		loadGoods:function () {
			let that = this;
			let params = {
				apiUrl: that.config.mallApi + "goods/list/new",
				brandId: that.brandId,
				categoryId: this.regionId?this.regionId:that.categoryId,
				current: that.page,
				dateType: that.dateType,
				size: 16,
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					let data = res.data.data;
					let banner = ''
					for (var i = 0; i < data.images.length; i++) {
						if (data.images[i].type==1) {
							banner = data.images[i].moduleImgUrl
						}
					}
					that.newGoodsData = data.page;
					that.banner = banner;
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
				dateType: this.dateType,
				page: this.page,
			}
			this.$router.push({
				path: "/bmV3R29vZHM",
				query: data
			})
		},
		choseRegion:function (item) {
			let data = {
				brandId: this.brandId,
				categoryId: this.categoryId,
				regionId: item?item.id:'',
				dateType: this.dateType,
				page: this.page,
			}
			this.$router.push({
				path: "/bmV3R29vZHM",
				query: data
			})
		},
		choseBrandId: function(item) {
			let data = {
				brandId: item?item.id:'',
				categoryId: this.categoryId,
				regionId: this.regionId,
				dateType: this.dateType,
				page: this.page,
			}
			this.$router.push({
				path: "/bmV3R29vZHM",
				query: data
			})
		},
		choseDate: function(item) {
			let data = {
				brandId: this.brandId,
				categoryId: this.categoryId,
				regionId: this.regionId,
				dateType: item,
				page: this.page,
			}
			this.$router.push({
				path: "/bmV3R29vZHM",
				query: data
			})
		},
		changePage(item) {
			let data = {
				brandId: this.brandId,
				categoryId: this.categoryId,
				regionId: this.regionId,
				dateType: this.dateType,
				page: item,
			}
			this.$router.push({
				path: "/bmV3R29vZHM",
				query: data
			})
		},
		checkMore: function (e) {
			this.max = e==1? 10000:30;
		},
	},
	mounted() {
		this.brandId = this.$route.query.brandId;
		this.categoryId = this.$route.query.categoryId;
		this.regionId = this.$route.query.regionId;
		this.dateType = this.$route.query.dateType;
		this.page = parseInt(this.$route.query.page || 1);
		this.initData();
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('newGoods.less');
</style>
