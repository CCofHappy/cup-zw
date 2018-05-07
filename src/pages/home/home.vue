<template>
<div class="home">
	<scrollTop></scrollTop>
	<cwHeader :nav="1"></cwHeader>
	<div class="mid-header container text-center">
		<h1>CHINA WHISKY</h1>
		<searchBar></searchBar>
	</div>
	<div class="banner">
		<swiper :options="swiperOption" ref="mySwiper" class="banner-swiper">
			<!-- slides -->
			<swiper-slide v-for="item in banner" class="box box-center">
				<router-link :to="'/Z29vZHNEZXRhaWw?id='+item.productId" v-if="item.redirectMethod==2">
					<img v-bind:src="item.image">
				</router-link>
				<div v-else>
					<img v-bind:src="item.image">
				</div>
			</swiper-slide>
			<div class="swiper-button-prev box box-center" slot="button-prev">
				<icon name="arrow-left" scale="10" class="icon"></icon>
			</div>
			<div class="swiper-button-next box box-center" slot="button-next">
				<icon name="arrow-right" scale="10" class="icon"></icon>
			</div>
		</swiper>
	</div>
	<div class="limit-goods">
		<div class="container">
			<div class="goods-title">
				<h4>限时抢购<span>FLASH SALE</span>
				<router-link :to="'/bGltaXRHb29kcw'" class="fl-right box box-center">
					<div>更多</div><icon name="arrow-right2" scale="2"></icon>
				</router-link>
			</h4>
			</div>
			<el-row :gutter="10" class="goods-box">
				<el-col :span="8">
					<limitGood></limitGood>
				</el-col>
				<el-col :span="8">
					<limitGood></limitGood>
				</el-col>
				<el-col :span="8">
					<limitGood></limitGood>
				</el-col>
			</el-row>
		</div>
	</div>
	<div class="new-goods">
		<div class="container">
			<div class="goods-title">
				<h4>新酒发布<span>NEW WINE</span></h4>
			</div>
			<div class="goods-box box" v-if="newGoods && newGoods.images.length>0">
				<div class="left-box">
					<router-link :to="'/Z29vZHNEZXRhaWw?type=2&id='+newGoods.images[0].productId"  v-if="newGoods.images[0].productId" target="_blank">
						<img v-lazy="newGoods.images[0].moduleImgUrl">
					</router-link>
					<div v-else>
						<img v-lazy="newGoods.images[0].moduleImgUrl">
					</div>
				</div>
				<div class="right-box">
					<div class="top-box" v-if="newGoods && newGoods.images.length>1">
						<router-link :to="'/Z29vZHNEZXRhaWw?type=2&id='+newGoods.images[1].productId"  v-if="newGoods.images[1].productId" target="_blank">
							<img v-lazy="newGoods.images[1].moduleImgUrl">
						</router-link>
						<div v-else>
							<img v-lazy="newGoods.images[1].moduleImgUrl">
						</div>
					</div>
					<div class="bottom-box" v-if="newGoods && newGoods.images.length>2">
						<router-link :to="'/Z29vZHNEZXRhaWw?type=2&id='+newGoods.images[2].productId" v-if="newGoods.images[2].productId" target="_blank">
							<img v-lazy="newGoods.images[2].moduleImgUrl">
						</router-link>
						<div v-else>
							<img v-lazy="newGoods.images[2].moduleImgUrl">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="prize-goods" id="archer">
		<div class="container">
			<div class="goods-title">
				<h4>得奖产品<span>THE WINNING</span></h4>
			</div>
			<el-row :gutter="26" class="goods-box" v-if="prizeGoods">
				<el-col :span="8" v-for="(item, index) in prizeGoods.goods" v-if="index<3">
					<div class="good-box">
						<div class="img-box" ref="priczeImgBox" :style="{height: priczeImgHeight}">
							<img v-lazy="item.image">
						</div>
						<div class="text-box">
							<div class="title-en text-overflow text-center">
								{{item.enName}}
							</div>
							<div class="title-cn text-overflow text-center">
								{{item.fullName}}
							</div>
							<div class="price-box text-center">
								<div class="price" v-if="item.priceStr>0"><small>￥</small>{{item.priceStr}}</div>
								<div class="price" v-else>暂无报价</div>
							</div>
							<div class="buy-btn text-center">
								<router-link :to="'/Z29vZHNEZXRhaWw?type=1&id='+item.id" target="_blank">立即购买</router-link>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>

	<div class="prize-goods" id="archer">
		<div class="container" v-if="hotGoods&&hotGoods.length>0">
			<div class="goods-title">
				<h4>热门产品<span>HOT PRODUCTS</span></h4>
			</div>
			<el-row :gutter="26" class="goods-box">
				<el-col :span="6" v-for="(item, index) in hotGoods" v-if="index<8">
					<div class="good-box">
						<div class="img-box price-img">
							<img v-bind:src="item.image">
						</div>
						<div class="text-box">
							<div class="title-en text-overflow text-center">
								{{item.enName}}
							</div>
							<div class="title-cn text-overflow text-center">
								{{item.fullName}}
							</div>
							<div class="price-box text-center">
								<div class="price" v-if="item.priceStr>0"><small>￥</small>{{item.priceStr}}</div>
								<div class="price" v-else>暂无报价</div>
							</div>
							<div class="buy-btn text-center">
								<router-link :to="'/Z29vZHNEZXRhaWw?type=1&id='+item.id" target="_blank">立即购买</router-link>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="container top-box img-box" v-if="adv.length>0">
			<img v-lazy="adv[0].image">
		</div>
	</div>
	<cwFooter></cwFooter>
</div>
</template>

<script>
import cwHeader from '@/components/header/header'
import cwFooter from '@/components/footer/footer'
import limitGood from '@/components/limitGood/limitGood'
import searchBar from '@/components/searchBar/searchBar'
export default {
	name: 'home',
	data() {
		return {
			swiperOption: {
				// swiper optionss 所有的配置同swiper官方api配置
				autoplay: 5000,
				loop: true,
				autoHeight: true,
				prevButton: '.swiper-button-prev',
				nextButton: '.swiper-button-next',
			},
			banner: [],
			adv: [],
			newGoods: "",
			prizeGoods: "",
			hotGoods: "",
			priczeImgHeight: "auto",
		}
	},
	components: {
		cwHeader,
		cwFooter,
		limitGood,
		searchBar,
	},
	methods: {
		// countDownFn:function () {
		//   var that = this;
		//   var id = setInterval(function(){
		//     for (var i = 0; i < that.dataTime.length; i++) {
		//       that.$set(that.countDown, i , that.util.countDown(that.dataTime[i]));
		//     }
		//   },1000)
		//   if (!window.countDownID) {
		//     window.countDownID=[];
		//   }
		//   window.countDownID.push(id);
		// },
		initData: function() {
			let that = this;
			var params = {
				apiMethod:"get",
				apiUrl: that.config.mallApi+"goods/list/home",
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					let bannerArr = [];
					let advArr = [];
					for (let i in res.data.data.advs) {
						if (res.data.data.advs[i].adPositionId==1)bannerArr.push(res.data.data.advs[i]);
						if (res.data.data.advs[i].adPositionId==2)advArr.push(res.data.data.advs[i]);
					}
					that.hotGoods = res.data.data.hotGoods;
					that.banner = bannerArr;
					that.adv = advArr;
					for (let i in res.data.data.modules) {
						let type = res.data.data.modules[i].moduleType;
						if (type == 2) {
							that.newGoods = res.data.data.modules[i];
							for (var k in res.data.data.modules[i].images) {
								if (res.data.data.modules[i].images[k].type == 1) {
									that.newGoods.images.splice(k, 1);
									that.newGoods.bannerImg = res.data.data.modules[i].images[k];
								}
							}
						} else if (type == 3) {
							that.prizeGoods = res.data.data.modules[i];
							for (var k in res.data.data.modules[i].images) {
								if (res.data.data.modules[i].images[k].type == 1) {
									that.prizeGoods.bannerImg = res.data.data.modules[i].images[k];
								}
							}
						}
					}
					that.$nextTick(function(){
						that.priczeImgHeight = that.$refs.priczeImgBox[0].offsetWidth + 'px';
		            })
				} else {
					console.log(res.data.message)
				}
			},'get')
		}
	},
	mounted() {
		this.initData();
	},
	beforeDestroy() {

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('home.less');
</style>
