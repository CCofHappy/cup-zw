<template>
<div class="goodsDetail">
	<cwHeader ref="cwHeader"></cwHeader>
	<LoadError v-if="loadError"></LoadError>
	<noData :message="'该商品已下架'" v-else-if="!onLoad && (!goodsInfo || goodsInfo.state==5)"></noData>
	<div class="container" v-else>
		<div class="top-nav">
			<div class="nav-title">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  <el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path: '/bmV3R29vZHM' }" v-if="pageType==2">新酒发布</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path: '/cHJpemVHb29kcw' }" v-else-if="pageType==3">获奖商品</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path: '/YWxsR29vZHM' }" v-else>中威酒窖</el-breadcrumb-item>
				  <el-breadcrumb-item>{{goodsInfo.fullName}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="goodsDetail-box box">
			<div class="left-box">
				<div class="cn-title">{{goodsInfo.fullName}}</div>
				<div class="en-title">{{goodsInfo.enName}}</div>
				<div class="detail-box">
					<el-row v-if="prizesInfo.length">
						<el-col :span="8">
							<div class="detail-title light  button" v-bind:class="{active: detailNav==1}" @click="changeNav(1)">商品详情</div>
						</el-col>
						<el-col :span="8">
							<div class="detail-title button" v-bind:class="{active: detailNav==2}" @click="changeNav(2)">商品描述</div>
						</el-col>
						<el-col :span="8">
							<div class="detail-title light button" v-bind:class="{active: detailNav==3}" @click="changeNav(3)">获奖信息</div>
						</el-col>
					</el-row>
					<!--无获奖记录时去掉获奖信息tab-->
					<el-row v-else>
						<el-col :span="12">
							<div class="detail-title light  button" v-bind:class="{active: detailNav==1}" @click="changeNav(1)">商品详情</div>
						</el-col>
						<el-col :span="12">
							<div class="detail-title button" v-bind:class="{active: detailNav==2}" @click="changeNav(2)">商品描述</div>
						</el-col>
					</el-row>
					<div class="detail-content content-box" v-bind:class="{active: detailNav==1}">
						<div class="logo-box">
							<img v-lazy="goodsInfo.brandIcon">
						</div>
						<div class="box box-between">
							<div class="text-overflow">品牌：{{goodsInfo.brandName}}</div>
						</div>
						<div class="text-box box">
							<div class="text-overflow">净含量：{{goodsInfo.volumn}}</div>
						</div>
						<div class="text-box box">
							<div class="text-overflow">酒精度：{{goodsInfo.alcoholStrength}}</div>
						</div>
						<div class="text-box box">
							<div>商品编号：{{goodsInfo.code}}</div>
						</div>
						<!-- <div class="text-box box">
							<div class="half">蒸馏厂：{{goodsInfo.categoryLv2Name}}</div>
						</div> -->
						<div class="text-box box box-between">
							<div class="text-overflow">类型：{{goodsInfo.productType}}</div>
						</div>
						<div class="text-box box box-between">
							<el-tooltip class="item" effect="dark" :content="goodsInfo.series" placement="right">
						      	<div class="text-overflow">系列：{{goodsInfo.series}}</div>
						    </el-tooltip>
						</div>
						<div class="text-box box box-between">
							<div class="text-overflow">装瓶厂：{{goodsInfo.bottler}}</div>
						</div>
						<div class="text-box box box-between">
							<div class="half">蒸馏年份：{{goodsInfo.distillTime}}</div>
							<div class="half">装瓶年份：{{goodsInfo.bottlingTime}}</div>
						</div>
						<div class="text-box box box-between">
							<div class="half">装瓶数量：{{goodsInfo.bottlerNumber || 0}}瓶</div>
						</div>
						<div class="text-box box">
							<div class="text-overflow">木桶编号：{{goodsInfo.bucketCode}}</div>
						</div>
						<div class="text-box box">
							<el-tooltip class="item" effect="dark" :content="goodsInfo.bucketType" placement="right">
						      	<div class="text-overflow">木桶类型：{{goodsInfo.bucketType}}</div>
						    </el-tooltip>
						</div>
						<div class="text-box box">
							<div class="text-overflow" v-if="goodsInfo.categoryLv2Name">原产地：{{goodsInfo.categoryLv1Name}}-{{goodsInfo.categoryLv2Name}}</div>
							<div class="text-overflow" v-else>原产地：{{goodsInfo.categoryLv1Name}}</div>
						</div>
					</div>
					<div class="describe-content content-box" v-bind:class="{active: detailNav==2}">
						<div class="text-box">描述：
							<div v-html="goodsInfo.introduction">
							</div>
						</div>
						<div class="text-box">品酒：
							<div v-html="goodsInfo.tastRecord">
							</div>
						</div>
					</div>
					<div class="prize-content content-box" v-bind:class="{active: detailNav==3}">
						<div class="prize-box" v-for="item in prizesInfo">
							<div class="prize-title box box-align-center">
								<div class="prize-icon box box-align-center">
									<img v-lazy="item.icon">
								</div>
								<p class="text-overflow-more text-overflow-two">{{item.chName}}</p>
							</div>
							<div class="text-box text-overflow-more text-overflow-three">{{item.introductions}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mid-box">
				<div class="material-box">
					<swiper :options="materialrOption" class="material-swiper">
						<swiper-slide class="box box-center" v-for="item in flavorsInfo">
							<div>
								{{item.flavorName}}
								<div class="img-box">
									<img v-lazy="item.flavorIcon">
								</div>
							</div>
						</swiper-slide>
					</swiper>
				</div>
				<div class="goods-img-box">
					<div>
						<swiper :options="goodsOption" ref="goodsSwiper" class="goods-swiper">
							<!-- slides -->
							<swiper-slide class="box box-center" v-for="item in nowVolumesInfo.imgs">
								<img v-lazy="item.url" width="100%">
							</swiper-slide>
						</swiper>
					</div>
				</div>
				<div class="goods-img-nav">
					<swiper :options="navOption" class="nav-swiper">
						<!-- slides -->
						<swiper-slide class="box box-center" v-for="(item, index) in nowVolumesInfo.imgs">
							<img v-bind:src="item.url" width="100%" @click="changeImage(index)">
						</swiper-slide>
					</swiper>
					<div class="swiper-button-prev box box-center" slot="button-prev">
						<icon name="arrow-left" scale="2.5" class="icon"></icon>
					</div>
					<div class="swiper-button-next box box-center" slot="button-next">
						<icon name="arrow-right" scale="2.5" class="icon"></icon>
					</div>
				</div>
			</div>
			<div class="right-box">
				<div class="price-box" v-if="nowVolumesInfo && nowPriceStr > 0">
					中威价：<span class="price"><small>￥</small>{{nowPriceStr}}</span>
				</div>
				<div class="price-box" v-else>
					中威价：<span class="price">暂无报价</span>
				</div>
				<div class="quality-box">
					<div class="title">可选规格</div>
					<div class="quality-chose">
						<div class="chose-box button" v-for="(item, index) in volumesInfo" :class="{active:index==volumesNum}" @click="choangeVolumes(index)" v-if="item.isShared==0">
							{{item.specificationValue}}
						</div>
					</div>
				</div>
				<div class="share-box" v-if="shareInfo">
					<div class="title">分享瓶</div>
					<div class="content-box box box-align-center">
						<div class="chose-box button" :class="{active:volumesNum =='share'}" @click="choangeVolumes('share')">
							规格：{{shareInfo[0].specificationValue}}
						</div>
					</div>
				</div>
				<div class="count-box">
					<div class="title">可选数量</div>
					<div class="chose-count-box box">
						<button class="chose-btn box box-center button" @click="choangeCount(0)" :disabled="goodsCount<2">
		                	<icon name="minus" scale="1.5" class="icon"></icon>
		                </button>
						<input name="goodsCount" type="number" @change="inputCount" v-model.number="goodsCount" :disabled="nowVolumesInfo.total<=0">
						<button class="chose-btn box box-center button" @click="choangeCount(1)" :disabled="goodsCount==nowVolumesInfo.total">
                			<icon name="add" scale="1.5" class="icon"></icon>
              			</button>
					</div>
					<div class="text-color-help">库存：{{nowTotal>0?nowTotal:0}} 件</div>
				</div>
				<div class="btns-box box" v-if="nowVolumesInfo.total>0">
					<div class="sold-btn box box-center button" @click="sellNow">立即购买</div>
					<div class="shop-card-btn box box-center button" @click="addToCart">放入购物车</div>
				</div>
				<div class="btns-box box box-between" v-if="nowVolumesInfo.total<=0">
					<!-- <div class="sold-btn box box-center button">已售罄</div> -->
					<el-button type="info" plain disabled size="medium">已售罄</el-button>
				</div>
				<div class="care-btn box box-align-center button" @click="addToFocus()" v-if="!goodsData.isFlavor">
					<icon name="heart" scale="2" class="icon"></icon>加入我的关注
				</div>
				<div class="care-btn box box-align-center button" @click="addToFocus()" v-else>
					<icon name="heart2" scale="2" class="icon"></icon>已关注商品
				</div>
			</div>
		</div>
	</div>
	<div class="recommend-box" v-if="recommendsInfo">
		<div class="container white-bg">
			<div class="recommend-title-box">
				<div class="recommend-title">相关推荐<span>RELEVANT RECOMMENDATIONS</span></div>
			</div>
			<div class="recommend-content">
				<proList :recommend="1" :goodsList="recommendsInfo" @refresh="initData"></proList>
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
	name: 'goodsDetail',
	data() {
		return {
			loadError: false,
			detailNav: 1,
			materialrOption: {
				// swiper optionss 所有的配置同swiper官方api配置
				loop: false,
				slidesPerView: 5,
				spaceBetween: 15,
				slidesPerGroup : 1,
			},
			goodsOption: {
				// swiper optionss 所有的配置同swiper官方api配置
				width: 500,
			},
			navOption: {
				// swiper optionss 所有的配置同swiper官方api配置
				loop: false,
				slidesPerView: 5,
				prevButton: '.swiper-button-prev',
				nextButton: '.swiper-button-next',
			},
			nowPriceStr:"",
			nowTotal:"",
			goodsData:"",
			goodsCount: 1,
			goodsInfo: "",
			volumesInfo: "",
			nowVolumesInfo: "",
			volumesNum: 0,
			prizesInfo: "",
			flavorsInfo: "",
			recommendsInfo: "",
			shareInfo: "",
			pageType:"",
			onLoad:true,
		}
	},
	watch: {　　
		goodsCount(curVal, oldVal) {
			var _this = this;
			_this.goodsCount = parseInt(curVal);
			if (parseInt(curVal) != curVal && parseInt(curVal)== 0) {
				_this.goodsCount = oldVal;
			}else if(parseInt(curVal)>_this.nowVolumesInfo.total) {
				_this.goodsCount = _this.nowVolumesInfo.total>0?_this.nowVolumesInfo.total:1;//库存大于0时取最大库存 否则就是默认1
			}
		},
	},
	components: {
		cwHeader,
		proList,
		cwFooter,
	},
	//定义这个sweiper对象
	computed: {
		swiper() {
			return this.$refs.goodsSwiper.swiper;
		},
	},
	mounted() {
		this.initData();
		this.pageType = this.$route.query.type;
	},
	methods: {
		initData: function() {
			let that = this;
			let cusSeq = that.util.getCookie("customerSeq")?that.util.getCookie("customerSeq"):0;
			let params = {
				apiUrl:this.config.mallApi + "goods/detail/" + cusSeq + "/" + that.$route.query.id,
				apiMethod:'get',
			}
			that.ajaxData(params,function(res){
				if (res.data.code == "0000") {
					let data = res.data.data;
					that.onLoad = false;
					if(data){
						that.goodsData = data;
						that.goodsInfo = data.info;
						that.prizesInfo = data.prizes;
						that.flavorsInfo = data.flavors;
						var newArr = [];
						for(var i in data.recommends){//相关推荐只展示4只酒
							if(i<4){
								newArr.push(data.recommends[i]);
							}
						}
						that.recommendsInfo = newArr;
						that.materialrOption.slidesPerView = data.flavors.length>4?5:data.flavors.length;
						if (data.volumes.length > 0) {
							let arr = data.volumes;
							for (var i = 0; i < data.volumes.length; i++) {
								if (data.volumes[i].isShared == 1) {
									that.shareInfo = arr.splice(i, 1);
								}
							}
							that.volumesInfo = arr;
							that.nowVolumesInfo = that.volumesInfo[0]?that.volumesInfo[0]:that.shareInfo;
							that.nowPriceStr = that.nowVolumesInfo.priceStr;
							that.nowTotal = that.nowVolumesInfo.total;
							that.goodsCount = that.nowVolumesInfo.total>0?1:0;
						}
					}
				} else {
					that.loadError = true;
				}
			})
		},
		//切换商品详情
		changeNav: function(e) {
			this.detailNav = e;
		},
		//切换商品图片
		changeImage: function(e) {
			this.swiper.slideTo(e, 1000, false);
		},
		//选择购买数量
		choangeCount: function(e) {
			if (e == 0) {
				this.goodsCount = this.goodsCount - 1;
			} else {
				this.goodsCount = this.goodsCount + 1;
			}
		},
		//选择商品规格
		choangeVolumes: function(e) {
			if (e != 'share') {
				this.volumesNum = e;
				this.nowVolumesInfo = this.volumesInfo[e];
				this.nowPriceStr = this.volumesInfo[e].priceStr;
				this.nowTotal= this.volumesInfo[e].total;
			} else {
				this.volumesNum = 'share';
				this.nowPriceStr = this.shareInfo[0].priceStr;
				this.nowTotal= this.shareInfo[0].total;
			}
			this.goodsCount = this.nowVolumesInfo.total>0?1:0;
		},
		//放入购物车
		addToCart: function() {
			let that = this;
			if (!that.nowVolumesInfo.id) {
				that.$notify({
					type: 'error',
					message: '请选择规格'
				});
				return;
			}
			if (that.goodsCount<=0) {
				that.$notify({
					type: 'error',
					message: '商品数量不正确'
				});
				return;
			}
			if (that.util.getCookie('token')) {
				let params = {
					apiUrl:that.config.mallApi + "shopping/cart/add",
					productId: that.goodsInfo.id,
					productDetailId: that.volumesNum == 'share' ? that.shareInfo[0].id : that.nowVolumesInfo.id,
					count: that.goodsCount,
				}
				that.ajaxData(params,function(res){
					if (res.data.code == "0000") {
						that.$notify({
							type: 'success',
							message: '成功加入购物车'
						});
						that.$refs.cwHeader.shopCart();
					} else {
						that.$notify({
							type: 'error',
							message: '操作失败'
						});
					}
				})
			} else {
				that.$notify({
					type: 'error',
					message: '请先登录！'
				});
				that.$router.push('/bG9naW4?goodsId='+ that.$route.query.id);
			}
		},
		//立即购买
		sellNow: function(){
			let that = this;
			if (that.goodsCount<=0) {
				that.$notify({
					type: 'error',
					message: '购买数量不能为0'
				});
				return;
			}
			if (that.util.getCookie('token')) {
				let data = [{
					alcoholStrength:that.goodsInfo.alcoholStrength,
					count:that.goodsCount,
					detailId:that.nowVolumesInfo.id,
					enName:that.goodsInfo.enName,
					fullName:that.goodsInfo.fullName,
					id:that.goodsInfo.id,
					image:that.nowVolumesInfo.imgs.length>0?that.nowVolumesInfo.imgs[0].url:that.goodsInfo.image,
					price:that.nowVolumesInfo.price,
					totalPrice:that.nowVolumesInfo.price*that.goodsCount,
					volumn: that.nowVolumesInfo.specificationValue,
					isShared: that.nowVolumesInfo.isShared,
				}];
				sessionStorage.orderSubmitInfo=JSON.stringify(data);
				this.$router.push('/Z2V0T3JkZXJJbmZv?type=1');
			}else {
				that.$notify({
					type: 'error',
					message: '请先登录！'
				});
				that.$router.push('/bG9naW4?goodsId='+ that.$route.query.id);
			}
		},
		inputCount(){
			this.goodsCount = this.goodsCount>0?this.goodsCount:1;
		},
		//关注商品
		addToFocus: function() {
			let that = this;
			if (that.util.getCookie('token')) {
				let care = that.goodsData.isFlavor ? 0 : 1;
				that.$ajax({
					method: "get",
					url: that.config.mallApi + "center/favorit/set/" + that.goodsInfo.id + "/" + care,
					headers: {
						'Content-type': 'application/json;charset=UTF-8',
						'Authentication': that.util.getCookie('token')
					},
					data: {}
				}).then(function(res) {
					if (res.data.code == "0000") {
						let message = that.goodsData.isFlavor ? '已取消关注' : '关注成功';
						that.$notify({
							type: 'success',
							message: message
						});
						that.initData();
					} else {
						that.$notify({
							type: 'error',
							message: res.data.message
						});
					}
				}).catch(function(err) {
					that.$notify({
						type: 'error',
						message: '操作失败'
					});
					console.log(err);
				})
			} else {
				this.$confirm('是否进入登录页面?', '您还没登录账号', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$router.push('/bG9naW4?goodsId='+ that.$route.query.id);
				}).catch(() => {});
			}
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('../../components/product/recommend.less'); //引入相关推荐样式
@import url('goodsDetail.less');
</style>
