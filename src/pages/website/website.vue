<template>
<div class="website">
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
					<a href="javascript:void(0)" @click="goAnchor('#auction')">拍卖</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click="goAnchor('#share')">分享·论坛</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click="goAnchor('#brand')">品牌</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click="goAnchor('#news')">资讯</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click="goAnchor('#footer-bar')">客户端</a>
				</li>

			</ul>
		</div>
	</div>
	<div class="banner">
		<swiper :options="swiperOption" ref="mySwiper" class="banner-swiper" :style="'height:'+ clientHeight +';'">
			<swiper-slide class="box box-center">
				<img src="../../img/seize/banner-s1.jpg">
			</swiper-slide>
			<swiper-slide class="box box-center">
				<img src="../../img/seize/banner-s3.jpg">
			</swiper-slide>
			<swiper-slide class="box box-center">
				<img src="../../img/seize/banner-s4.jpg">
			</swiper-slide>
			<swiper-slide class="box box-center">
				<img src="../../img/seize/banner-s8.jpg">
			</swiper-slide>
			<div class="swiper-button-prev box box-center" slot="button-prev">
				<icon name="arrow-left" scale="10" class="icon"></icon>
			</div>
			<div class="swiper-button-next box box-center" slot="button-next">
				<icon name="arrow-right" scale="10" class="icon"></icon>
			</div>
		</swiper>
	</div>
	<div class="auction" id="auction">
		<div class="container">
			<h1 class="title text-center">About <span>China Whisky</span></h1>
			<p class="lead text-center">中国唯一一个专注做单一麦芽威士忌的交流、交易与分享的平台.邀您一起纵享威士忌的魅力<br><em>About China Whisky The only platform that specializes in building a platform for communication, transaction and sharing of single malt whisky in China.</em></p>
			<el-row>
				<el-col class="auction-img-box" :span="10">
					<img src="../../img/seize/WechatIMG51.png">
				</el-col>
				<el-col class="auction-top-right" :span="14">
					<p>坚持以“专注网站，用心服务”为核心价值，以用户需求为宗旨，积极寻求模式创新，不受地域限制，流动性更强，成本更低，交易更便捷的单一麦芽威士忌电商交易平台。</p>
					<p><em>We have always persisted in the core value Best website, Top service. In order to meet the needs of our customers, we endeaver to build a most convenient e-commercial platform for single malt whisky trading, with continuous creativeness, better mobility and lower cost. </em></p>
					<ul class="list-unstyled">
						<li class="box box-align-center">
							<icon name="trigon" scale="2"></icon> 拍卖平台首页 <em>Home Page of the Auction Platform</em></li>
						<li class="box box-align-center">
							<icon name="trigon" scale="2"></icon> 拍品所有品牌分类 <em>Category of Auction Item’s Brands</em></li>
						<li class="box box-align-center">
							<icon name="trigon" scale="2"></icon> 威士忌分享社区 <em>Whisky Sharing Community</em></li>
						<li class="box box-align-center">
							<icon name="trigon" scale="2"></icon> 威士忌资讯与文化 <em>Whisky Info and Culture</em></li>
						<li class="box box-align-center">
							<icon name="trigon" scale="2"></icon> 客户个人中心 <em>Personal Center of Customers</em></li>
					</ul>
				</el-col>
			</el-row>
			<h2>
				<p class="box box-align-center"><icon name="volume" scale="3"></icon> 送拍须知 </p>
				<em>Need to Know about Auction in Cwhisky.com</em>
			</h2>
			<el-row class="auction-bottom">
				<el-col :span="12">
					<p>中威网拍卖区是一个公平公正的单一麦芽威士忌拍卖平台。诚请各位威士忌爱好者踊跃投递藏品。我们将用心为您服务，期待与您携手并进，共同开启新的征程.</p>
					<p><em>Cwhisky.com is a fair and just platform for single malt whisky auction. Herein we warmly welcome all whisky fans to bring your precious collections. We will serve you wholeheartedly. And we look forward to the new journey that we sail along together!</em></p>
					<br>
					<p>征集范围：单一麦芽威士忌<br><em>Auction Item: single matl whisky</em></p>
					<p>佣金比例：成交收取5%的佣金，流拍不收取任何费用。<br><em>Commission: we charge a 5% commission for each successful deal. No fee will be charged for the items unsold.</em></p>
					<br>
					<p>注意事项：<br>当收藏爱好者对中威网所有送拍拍品进行鉴定、询价和购买时，如果委托人同意以保留价出售，买卖双方各支付5%的佣金即可成交，后续拍场将不会上拍本件藏品。<br><em>Notes:If whisky collectors are interested in the items to be auctioned and the consignor agrees to sell on the reserve price, the deal can be made with a charge of 5% commision on each side. The item will skip the auction accordingly.</em></p>
				</el-col>
				<el-col :span="12">
					<el-collapse accordion>
						<el-collapse-item>
							<template slot="title">
						      	一、来访送拍 <em>Send your bottle in perso</em>
						    </template>
							<ul>
								<li>送拍者可以电话预约后直接携带拍品到我公司洽谈，中威网拍卖部有专业的业务人员接待。<br><em>To whom that sends the whisky may make a phone appointment and bring the item directly to our company. We will have professionals to serve you</em></li>
								<li>工作时间：周一至周五9:30-17:30（若节假日来访，请提前电话预约）<br><em>Working Time: 9:30-17:30 from Monday to Friday (Make a phone appointment if you choose to bring your item in holiday)</em></li>
								<li>公司地址：广东省惠州市惠城区江北华贸金融街12号楼103 <br><em>Address: Room 103, No.12 Building, Jiangbei Huamao Financial Street, Wenchang Yi Road, Huicheng District, Huizhou City, Guangdong Province, China</em></li>
								<li>联系电话：400-830-5299</li>
							</ul>
						</el-collapse-item>
						<el-collapse-item>
							<template slot="title">
						      	二、网络送拍 <em>Send your bottle online</em>
						    </template>
							<ul>
								<li>送拍者可以将拍品的基本资料在IOS客户端或微信小程序(威士忌拍卖)【我要送拍】手工录入，随后将拍品寄往以上公司地址。<br><em>You may input basic information of the auction item in 【Send My Auction Item】 and then send it to the address required by the company. </em></li>
								<li>拍品的清晰彩色照片（局部放大图)，每张照片建议不超过1M。<br><em>A high-definition and colorful picture of the auction item (Partial enlarged details).Each picture is suggested to be up to 1M in pixel</em></li>
								<li>拍品的详细描述及保留价。<br><em>Detailed description and reserve price of the auction item</em></li>
							</ul>
						</el-collapse-item>
						<el-collapse-item>
							<template slot="title">
						      	三、上拍拍品费用须知 <em>Need to know about Fee</em>
						    </template>
							<ul>
								<li>拍卖之前我司不收取任何费用。<br><em>Cwhisky shall not charge any fee before the auction.</em></li>
								<li>拍卖之后：<br><em>After the auction：</em>
									<ol>
										<li>若拍品成交，我司会对委托方收取拍品落槌价5%的佣金。<br><em>If the deal is concluded, our company shall require a commission from the consignor at 5% of the hammer price.</em></li>
										<li>若拍品流拍，我司不收取您任何费用，原件退还！敬请阁下放心。<br><em>If the bottle goes unsold, our company won’t charge you of any fee and will return your collection! Don’t worry about it.</em></li>
									</ol>
								</li>
							</ul>
						</el-collapse-item>
					</el-collapse>
				</el-col>
			</el-row>

		</div>
	</div>

	<div class="share" id="share">
		<div class="container">
			<h1 class="text-center">Sharing And Forum</h1>
			<div class="title-icon box text-center">
				<div class="share-icon button" :class="{ active: shareType==1 }" @click="shareType=1">分享</div>
				<div class="bbs-icon button" :class="{ active: shareType==2 }" @click="shareType=2">论坛</div>
			</div>
			<div v-show="shareType==1">
				<div class="share-mid-box">
					<p style="margin-bottom:5px;">中威网分享吧是一个自愿、友好的单一麦芽威士忌分享瓶发布平台，期待你的加入，只和懂你的人分享，越分享越精彩。</p>
					<p>Cwhisky.com share is a voluntary and friendly sharing platform for single malt whisky lovers. We expect your participation in sharing your knowledge and your wonderful experience with those who appreciate you. </p>
				</div>
				<div class="mid-icon-box box box-between">
					<div class="box box-align-center">
						<img src="../../img/seize/tuijian.png" height="100" width="100"> 推荐
					</div>
					<div class="box box-align-center">
						<img src="../../img/seize/xiniang.png" height="100" width="100"> 稀酿
					</div>
					<div class="box box-align-center">
						<img src="../../img/seize/taozhuang.png" height="100" width="100"> 套装
					</div>
					<div class="box box-align-center">
						<img src="../../img/seize/xinjiu.png" height="100" width="100"> 新酒
					</div>
				</div>
			</div>
			<div v-show="shareType==2">
				<div class="share-mid-box">
					<p style="margin-bottom:5px;">中威网论坛是一个威士忌爱好者的交流平台，聚集了优秀品鉴师、收藏家、品牌大使、威士忌资深爱好者，覆盖中国300+城市，在威士忌爱好者群体中具有强大的影响力与号召力。</p>
					<p>Cwhisky.com share is a communication platform for whisky enthusiasts including excellent connoisseurs, collectors, brand embassadors and senior whisky enthusiasts, covering more than 300 cities in China. It has become an influencial and appealing platform for whisky lovers.</p>
				</div>
				<div class="mid-icon-box bottom box box-between">
					<div class="box box-align-center">
						<img src="../../img/seize/jiaoliutie.png" height="100" width="100" > 交流贴
					</div>
					<div class="box box-align-center">
						<img src="../../img/seize/jiupingtie.png" height="100" width="100"> 酒评贴
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="brand" id="brand">
		<div class="container text-center">
			<h1>Whisky Production Areas</h1>
			<h4>介绍威士忌酒厂的品牌故事，全面了解每一个威士忌品牌。</h4>
			<h4>Get to know the story of the whisky distilleries and learn about each brand.</h4>
			<div class="brands-box">
				<el-row :gutter="20">
					<el-col :span="6" v-for="(item,index) in brandList">
						<router-link :to="{ path: '/YnJhbmREZXRhaWw', query: {id:item.id}} "target="_blank">
							<div class="brand-box">
								<div class="img-box box box-center">
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
			<div class="brand-btn">
				<router-link to="/YnJhbmRMaXN0">查看所有品牌</router-link>
			</div>
		</div>
	</div>

	<div class="news" id="news">
		<div class="container">
			<h1 class="text-center">Whisky Information</h1>
			<h4 class="text-center">中威网资讯——推广威士忌文化</h4>
			<h4 class="text-center">The only platform focusing on communication, transaction and sharing of single malt whisky in China</h4>
			<h2><i></i>威新闻 Whiskey News</h2>
			<p>每天更新国内外单一麦芽威士忌界的新闻，让您第一时间获取单一麦芽威士忌的最新资料，更全面详细地了解威士忌市场。</p>
			<p>You can get the news updates of single malt whisky and have the latest information in the whisky market. </p>
			<div class="space"></div>
			<h2><i></i>威知识 Whiskey Knowledge</h2>
			<el-row :gutter="40">
				<el-col :span="6">
					<div class="knowledge-card">
						<h5>威士忌入门</h5>
						<h5 class="en-title">Whisky Introduction</h5>
						<p><icon name="trigon" scale="2"></icon>丰富易懂的威士忌入门知识，让威士忌新手们更容易了解威士忌世界。</p>
						<p>Rich and yet basic knowledge of whisky, easier for whisky novice to learn about the whisky world. </p>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="knowledge-card">
						<h5>威士忌产区及酒厂介绍</h5>
						<h5 class="en-title">Introduction of producing area and distillery</h5>
						<p><icon name="trigon" scale="2"></icon>介绍全球每一家威士忌酒厂的品牌故事，让您更全面的了解每一个威士忌品牌。</p>
						<p>Get to know the brand story of each distillery and understand more about the brands. </p>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="knowledge-card">
						<h5>威士忌蒸馏及风味</h5>
						<h5 class="en-title">Whisky distillation and flavor</h5>
						<p><icon name="trigon" scale="2"></icon>丰富易懂的威士忌入门知识，让威士忌新手们更容易了解威士忌世界。</p>
						<p>The detailed whisky process provides you with a more accurate judgement on tastes, which help find your suitable whisky.</p>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="knowledge-card">
						<h5>威士忌及美食</h5>
						<h5 class="en-title">Whisky and gourmet</h5>
						<p><icon name="trigon" scale="2"></icon>将威士忌与美食搭配在一起，威士忌的风味和各种美食的组合将给您带来意想不到的味蕾的碰撞。</p>
						<p>Going with the right food, the whisky taste will be enhanced which brings an amazing excitment to your taste bud.</p>
					</div>
				</el-col>
			</el-row>
			<h2><i></i>威视频 Whisky video</h2>
			<p>秉承“纵享威士忌的魅力”的品牌口号，邀请威士忌各大酒厂形象大使全方位的录制各个酒厂的品牌历史与威士忌制作工艺以及不同威士忌的口感等相关视频，让每一位中威网用户更便捷地了解威士忌。</p>
			<p>As we have promised in our slogan “enjoy the charm of whisky”, we have tried to get the videos of brand history, distillery process and whisky tasting, which enables our customers to better understand whisky. </p>
		</div>
	</div>
	<div  id="footer-bar">
		<cwFooter></cwFooter>
	</div>
</div>
</template>

<script>
import cwHeader from '@/components/header/header'
import cwFooter from '@/components/footer/footer'
export default {
	name: 'home',
	data() {
		return {
			clientHeight: '600px',
			swiperOption: {
				// swiper optionss 所有的配置同swiper官方api配置
				autoplay: 5000,
				loop: true,
				effect: 'fade',
				prevButton: '.swiper-button-prev',
				nextButton: '.swiper-button-next',
			},
			banner: "",
			newGoods: "",
			prizeGoods: "",
			activeName: '1',
			shareType: 1,
			brandList: "",
		}
	},
	components: {
		cwHeader,
		cwFooter,
	},
	methods: {
		initData:function () {
			let that = this;
			that.$ajax({
				method: 'post',
				url: this.config.mallApi + "dbcenter/queryBrandByRand",
				headers: {
					'Content-type': 'application/json;charset=UTF-8'
				},
				data: {},
			})
			.then(function(res) {
				if (res.data.code == "0000") {
					that.brandList = res.data.data;
				} else {
					that.loadError = true;
					console.log(res.data.message);
				}
			})
			.catch(res => {
				that.loadError = true;
				console.log("服务器异常")
			});
		},
		goAnchor: function(selector) {
			let anchor = this.$el.querySelector(selector);
			let baseValue = document.documentElement.scrollTop;
			let scrollValue = anchor.offsetTop - 105 - baseValue;
			let step = 0;
			let id = setInterval(function () {
				if (step<1) {
					step += 0.04;
					document.documentElement.scrollTop = baseValue + scrollValue*step;
				}else {
					clearInterval(id);
				}
			},20)
		},
	},
	mounted() {
		this.initData();
		this.clientHeight = `${document.documentElement.clientHeight}px`;
		// 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
		const that = this;
		window.onresize = function temp() {
			that.clientHeight = `${document.documentElement.clientHeight}px`;
		};
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('website.less');
</style>
