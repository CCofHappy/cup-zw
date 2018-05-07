<template>
<div class="prizeGoods">
	<cwHeader :nav="4"></cwHeader>
	<div class="mid-header container text-center">
		<h1>CHINA WHISKY</h1>
		<!-- <div class="search-box">
			<el-input placeholder="">
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div> -->
	</div>
	<LoadError v-if="loadError"></LoadError>
	<div v-else>
		<div class="header-img container" v-if="banner.images"><img v-bind:src="banner.images[0].moduleImgUrl"></div>
		<div class="container">
			<div class="prize-nav-box box">
				<div class="box-flex" v-for="(item,index) in prizeData">
					<div class="prize-nav button box box-center" v-bind:class="{ active: nav==item.id}" @click="changeNav(item.id)">
						<div>
							<p class="text-overflow-more text-overflow-two">{{item.enName}}</p>
							<p class="cn text-overflow-more text-overflow-one">{{item.chName}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="prize-desc-box" v-show="nav==item.id" v-for="(item,index) in prizeData">
				<div class="prize-title box">
					<div class="img-box">
						<img v-bind:src="item.icon">
					</div>
					<div class="text-box">
						<p class="en">{{item.enName}}</p>
						<p>{{item.chIntroductions}}</p>
					</div>
				</div>
			</div>
			<div class="chose-time-box">
				<el-form>
					<el-form-item label="年份：">
						<el-select v-model="timeForm" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div class="price-sort-box box box-between">
					<div class="button" @click="changrSort(5)" :class="{ active: sort==5}">
						价格从高到低
					</div>
					<div class="button" @click="changrSort(6)" :class="{ active: sort==6}">
						价格从低到高
					</div>
				</div>
			</div>
		</div>
		<LoadError v-if="loadError"></LoadError>
		<NoData :message="'没有符合条件的商品'" v-else-if="prizeList && prizeList.records.length==0"></NoData>
		<div class="prize-goods-box container" v-else>
			<div class="good-box" v-for="(item,index) in prizeList.records">
				<el-row :gutter="40" class="box box-align-center">
					<el-col :span="10">
						<router-link :to="{ path: '/Z29vZHNEZXRhaWw', query: {id:item.id,type:3}}" target="_blank">
							<div class="good-img box box-center">
								<img class="goodsImg1" v-lazy="item.image">
							</div>
						</router-link>
					</el-col>
					<el-col :span="14">
						<div class="brand-icon">
							<img class="goodsImg1" v-lazy="item.logo">
						</div>
						<div class="good-text text-center">
							<h4>{{item.enName}}</h4>
							<h5>{{item.fullName}}</h5>
							<p>{{item.volumn?item.volumn:'暂无'}} / {{item.alcoholStrength?item.alcoholStrength:'暂无'}}</p>
							<p class="price">{{item.price!=0?'￥'+item.price:'暂无'}}</p>
						</div>
						<div class="good-detail">
							<h4 class="text-overflow-more text-overflow-two" v-html="item.introduction?item.introduction:'暂无'">Cask Strength Scotch Whisky Trophy</h4>
							<p v-html="item.tastRecord?item.tastRecord:'暂无'">
							</p>
						</div>
					</el-col>
				</el-row>
			</div>

			<div class="text-center good-page-box" v-if="prizeList.total>10">
				<el-pagination layout="prev, pager, next" :page-size="10" :total="prizeList.total" :current-page="page" @current-change="changePage">
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
const nowYear = new Date().getFullYear();
var yearArr = [];
for (var i = 0; i < 5; i++) {
	yearArr[i] = {
		value: nowYear-i,
		label: nowYear-i,
	}
}
export default {
	name: 'prizeGoods',
	data() {
		return {
			loadError: false,
			banner:"",
			prizeData: "",
			prizeInfos: "",
			options: yearArr,
			bannerImg:'',
			timeForm: nowYear,
			nav: "",
			sort: 5,
			page: 1,
			prizeList:"",
		}
	},
	components: {
		cwHeader,
		cwFooter,
	},
	watch: {　　
		nav(curVal, oldVal) {
			this.loadData();
		},
		timeForm(curVal, oldVal) {
			this.loadData();
		},
	},
	mounted() {
		this.initData();
	},
	methods: {
		changeNav: function(e) {
			let nowYear = new Date().getFullYear();
			this.nav = e;
			this.sort = 5,
			this.page = 1,
			this.timeForm =  nowYear;
		},
		initData: function() {
			let that = this;
			let params={
				apiUrl:this.config.mallApi + "goods/list/awards",
				apiMethod:"get"
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					that.prizeData = res.data.data.awardsModels;
					that.banner = res.data.data.module;
					that.nav = res.data.data.awardsModels[0].id;
				} else {
					that.loadError = true;
					console.log(res.data.message);
				}
			})
		},
		loadData:function(str){
			var that = this;
			let params={
				apiUrl:this.config.mallApi + "goods/awards/" + that.nav +"?current=" + that.page +"&size=10&searchType=" + that.sort +"&years="+ that.timeForm,
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					that.prizeList = res.data.data;
				} else {
					that.loadError = true;
					console.log(res.data.message);
				}
			})
		},
		changrSort: function(e){
			this.sort = e;
			this.loadData();
		},
		changePage:function (e) {
			this.page=e;
			this.loadData();
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('prizeGoods.less'); //引入less变量
</style>
