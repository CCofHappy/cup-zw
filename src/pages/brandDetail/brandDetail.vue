<template>
<div class="brandDetail">
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
	<div class="brandDetail-topper">
		<div class="shadow"></div>
		<div class="container">
			<!-- <div class="search-box">
				<el-input placeholder="">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div> -->
			<div class="nav-box">
				<div class="nav-title">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item :to="{ path: '/d2Vic2l0ZQ' }">中威网</el-breadcrumb-item>
						<el-breadcrumb-item :to="{ path: '/YnJhbmRMaXN0' }">全部品牌</el-breadcrumb-item>
						<el-breadcrumb-item>{{brandInfo.name}}</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
			</div>
			<div class="topper-content">
				<div class="title-box box box-align-center">
					<img v-lazy="brandInfo.logo">
					<h1>{{brandInfo.name}} {{brandInfo.enName!=brandInfo.name?brandInfo.enName:''}}</h1>
				</div>
				<el-row :gutter="30">
					<el-col :span="haveVideo?12:24">
						<div class="topper-text">
							<div v-html="brandInfo.introduction?brandInfo.introduction:'暂无'">
							</div>
						</div>
					</el-col>
					<el-col :span="12" v-if="haveVideo">
						<div class="topper-video">
							<div class="prism-player" id="brandVideo"></div>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
	<div class="brandDetail-goods container">
		<div class="author-box box box-align-center" v-if="brandInfo&&brandInfo.brandPromoter.length>0">
			<div class="author-head">
				<img v-lazy="brandInfo.brandPromoter[0].imgUrl">
			</div>
			<div class="author-text">
				<h4>{{brandInfo.brandPromoter[0].promoterName}} {{brandInfo.brandPromoter[0].promoterEnName}}</h4>
				<p>{{brandInfo.brandPromoter[0].introduce}}</p>
			</div>
		</div>
		<LoadError v-if="loadError"></LoadError>
		<NoData :message="'没有符合条件的品牌'" v-else-if="brandList.records&&brandList.records.length==0"></NoData>
		<div class="goods-list-box">
			<div class="good-box" v-for="(item,index) in brandList.records">
				<el-row :gutter="40" class="box box-align-center">
					<el-col :span="10">
						<div class="good-img box box-center">
							<img v-lazy="item.image">
						</div>
					</el-col>
					<el-col :span="14">
						<div class="good-text text-center">
							<h4>{{item.fullName}}</h4>
							<p>{{item.introduction}}</p>
						</div>
						<div class="btn-box box box-between text-center">
							<div class="buy-btn button">
								<router-link :to="{ path: '/Z29vZHNEZXRhaWw', query: {id:item.id}}" target="_blank">
									点击购买
								</router-link>
							</div>
							<div class="video-btn button" @click="openVideo(item.video)" v-if="item.video&&item.video.videoKey">
								观看视频
							</div>
							<div class="video-btn" v-else>
								暂无视频
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="text-center good-page-box">
				<el-pagination layout="prev, pager, next" :page-size="10" :total="brandList.total" :current-page="page" @current-change="changePage" v-if="brandList.total>10">
				</el-pagination>
			</div>
		</div>
	</div>

	<div class="video-container box box-center" v-show="showVideo" v-bind:style="{  top: nowScroll + 'px' }">
		<div class="video-box">
			<div class="close-btn button" @click="closeVideo">
				<icon name="close" scale="5"></icon>
			</div>
			<div class="prism-player" id="goodsVideo"></div>
		</div>
	</div>
	<cwFooter></cwFooter>
</div>
</template>

<script>
import cwHeader from '@/components/header/header'
import cwFooter from '@/components/footer/footer'
export default {
	name: 'home',
	data() {
		return {
			brandId: "",
			brandInfo: "",
			brandGoods: "",
			brandList: "",
			haveVideo: false,
			showVideo: false,
			showVideoId: "",
			page: 1,
			goodsVideo: "",
			brandVideo: "",
			loadError: false,
			nowScroll: 0,
		}
	},
	components: {
		cwFooter,
	},
	methods: {
		initData: function() {
			let that = this;
			let params = {
				apiUrl: that.config.mallApi + "goods/getBrandInfo/" + that.$route.query.id,
				apiMethod:'get',
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					let data = res.data.data;
					that.brandInfo = data;
					if (data.video.length > 0) {
						that.haveVideo = true;
						that.$ajax({
							method: "get",
							url: that.config.mallApi + "video/getvideoplayauth/" + data.video[0].videoKey,
							headers: {
								'Content-type': 'application/json;charset=UTF-8',
								'Authentication': that.util.getCookie('token')
							},
							data: {}
						}).then(function(res) {
							if (res.data.code == "0000") {
								that.brandVideo = new Aliplayer({
									id: 'brandVideo',
									width: '100%',
									autoplay: false,
									vid: data.video[0].videoKey,
									playauth: res.data.data.playAuth,
									cover: data.video[0].cover,
								}, function(player) {

								});
							}
						}).catch(function(err) {
							console.log(err);
						})
					}
				}
			})
			that.loadListData();
		},
		loadListData: function() {
			let that = this;
			let params = {
				apiUrl: that.config.mallApi + "goods/getBrandGoods",
				brandId: that.$route.query.id,
				current: that.page,
				size: 10
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					that.brandList = res.data.data;
				} else {
					that.loadError = true;
				}
			})
		},
		changePage: function(e) {
			this.page = e;
			document.documentElement.scrollTop = 530;
			this.loadListData();
		},
		openVideo: function(e) {
			let that = this;
			if (!that.showVideo) {
				let params = {
					apiUrl: that.config.mallApi + "goods/getBrandGoods",
					apiMethod: "get",
				}
				that.ajaxData(params,function (res) {
					if (res.data.code == "0000") {
						if (!that.goodsVideo) {
							that.goodsVideo = new Aliplayer({
								id: 'goodsVideo',
								width: '100%',
								vid: e.videoKey,
								playauth: res.data.data.playAuth,
								cover: e.cover,
							}, function(player) {
								that.showVideo = true;
							});
						} else {
							that.goodsVideo.reloaduserPlayInfoAndVidRequestMts(e.videoKey, res.data.data.playAuth)
							that.goodsVideo.on('ready', function(e) {
								that.showVideo = true;
							});
						}
					} else {
						that.$notify.error({
							message: res.data.message
						});
					}
				})
			}
		},
		closeVideo: function() {
			let that = this;
			that.showVideo = false;
			that.goodsVideo.pause();
		},
		scrollCheck: function() {
			this.nowScroll = document.documentElement.scrollTop;

		}
	},
	mounted() {
		this.initData();
		window.addEventListener('scroll', this.scrollCheck);
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('../website/website.less');
@import url('brandDetail.less');
</style>
