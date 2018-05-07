<template>
<div class="cwheader">
	<div class="fixed-tool-box">
		<div class="fixed-box box box-center button" @click="enter(2)" v-show="shopScrolled">
			<span class="shop-cart-count" v-if="customerInfo.customerLogin"><small>{{cartCount}}</small></span>
			<icon name="shop-cart" scale="2" v-if="cartCount>0"></icon>
			<icon name="shop-cart2" scale="2" v-else></icon>
		</div>
		<div class="fixed-box box box-center button" @mouseenter="enterIcon(1)" @mouseleave="leaveIcon">
			<icon name="QQ" scale="2.5"></icon>
		</div>
		<div class="fixed-box box box-center button" @mouseenter="enterIcon(2)" @mouseleave="leaveIcon">
			<icon name="wx" scale="2.5"></icon>
		</div>
		<div class="fixed-box box box-center button" @mouseenter="enterIcon(3)" @mouseleave="leaveIcon">
			<icon name="tel" scale="2.3"></icon>
		</div>
		<div class="icon-contet" :class="{open:openFixed}" @mouseenter="enterIcon(false)" @mouseleave="leaveIcon">
			<div v-show="fixedType==1" class="box box-center kefu-content">
				<a href="http://wpa.qq.com/msgrd?v=3&uin=3117926582&site=qq&menu=yes" target="_blank">在线客服</a>
			</div>
			<div v-show="fixedType==2" class="box box-center">
                <img class="ios-code" src="../../img/wxService.jpg" width="80%">
			</div>
			<div v-show="fixedType==3" class="box box-center">
				<p>咨询热线：<br>400-830-5299<br><br>客服QQ：<br>3117926582</p>
			</div>
		</div>
	</div>
	<header>
		<div class="topper">
			<div class="container">
				<el-row>
					<el-col :span="12">
						<ul class="box top-left">
							<li class="logo-li">
								<router-link to="/aG9tZQ"><img class="logo" src="../../img/top-logo.png"></router-link>
							</li>
							<li class="box box-align-center">
								<router-link to="/YWxsR29vZHM" :class="{ active: nav==2 }"><b>中威酒窖</b></router-link>
							</li>
							<li class="box box-align-center">
								<router-link to="/bmV3R29vZHM" :class="{ active:nav==3 }"><b>新酒发布</b></router-link>
							</li>
							<li class="box box-align-center">
								<router-link to="/cHJpemVHb29kcw" :class="{ active:nav==4 }"><b>得奖威士忌</b></router-link>
							</li>
						</ul>
					</el-col>
					<el-col :span="12">
						<ul class="box top-right box-align-center" v-if="from!='login'">
							<li class="box box-align-center">
								<router-link to="/bG9naW4" v-if="!customerInfo.customerLogin">注册与登录</router-link>
								<div v-else style="width:150px;">您好，<b class="text-overflow">{{customerInfo.customerName}}
									&nbsp;&nbsp;&nbsp;&nbsp;<span class="button" @click="exitLogin">退出</span></b>
								</div>
							</li>
							<li class="box box-align-center" v-if="customerInfo.customerLogin">
								<router-link to="/cGVyc29uYWxJbmZv" >个人中心</router-link>
							</li>
							<li class="box box-align-center">/</li>
							<li class="box box-align-center button" @click="enter(2)">
								购物车<small class="shop-cart-count" v-show="cartCount!=0">{{cartCount}}</small>
							</li>
							<li class="box box-align-center">/</li>
							<li class="box box-align-center button" @click="enter(3)">我的关注</li>
							<li class="box box-align-center button">/</li>
							<li class="box box-align-center">
								<router-link to="/d2Vic2l0ZQ">返回官网</router-link>
							</li>
						</ul>
					</el-col>
				</el-row>
			</div>
		</div>
	</header>
</div>
</template>

<script>
export default {
	name: 'cwheader',
	props: ["nav","from"],
	data() {
		return {
			customerInfo: {},
			cartCount:0,
			shopScrolled: false,
			openFixed: false,
			fixedType: 1,
		}
	},
	methods: {
		shopCart(){
			let that=this;
			that.$ajax({
				method:"get",
				url:that.config.mallApi+"shopping/cart/detail",
				headers: {
					'Content-type': 'application/json;charset=UTF-8',
					'Authentication': this.util.getCookie('token')
				},
				data: {},
			}).then(res=>{
				if (res.data.code=="0000") {
					that.cartCount=res.data.data.records.length;
				}else {
					console.log(res.data.message);
				}
			}).catch(err=>{
				that.loadError = true;
				console.log(err);
			})
		},
		exitLogin: function() {
			this.util.deleteCookie("customerLogin");
			this.util.deleteCookie("customerMobile");
			this.util.deleteCookie("customerName");
			this.util.deleteCookie("customerSeq");
			this.util.deleteCookie("token");
			this.customerInfo = {};
			this.cartCount = 0;
			this.$router.push('/bG9naW4');
		},
		enter: function(e){
			if (this.util.getCookie("customerSeq")) {
				let url = ""
				if (e==0) {
					url="/cGVyc29uYWwvbXlPcmRlcg";//我的订单
				}else if(e==1){
					url="/cGVyc29uYWxJbmZv";//个人中心
				}else if(e==2){
					url="/c2hvcENhcnQ";//购物车
				}else if(e==3){
					url="/bXlhdHRlbnRpb24K";//我的收藏
				}
				this.$router.push(url);
			}else {
				this.$router.push('/bG9naW4');
			}
		},
		shopScroll() {
			this.shopScrolled = window.scrollY > 100;
		},
		enterIcon(e){
			this.openFixed = true;
			this.fixedType = e?e:this.fixedType ;
		},
		leaveIcon(){
			this.openFixed = false;
		}
	},
	mounted() {
		if (this.util.getCookie("customerLogin")) {
			this.customerInfo = {
				customerLogin: this.util.getCookie("customerLogin"),
				customerMobile: this.util.getCookie("customerMobile"),
				customerName: this.util.getCookie("customerName"),
				customerSeq: this.util.getCookie("customerSeq"),
			}
			this.shopCart();
		}else {
			this.cartCount = 0;
		}
		window.addEventListener('scroll', this.shopScroll);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.shopScroll);
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
.topper {
    background-color: #000;
    height: 70px;
    color: #fff;
	.logo{
		width: 50px;
	}
	.top-left{
		height: 70px;
		li{
			padding: 0 30px;
			&.logo-li{
				padding: 0;
				img{
					margin-top: 10px;
				}
			}
		}
		a{
		 	font-size: 16px;
			&.active{
			 	color: #A82225;
			}
		}
		a:hover{
		 	color: #A82225;
		}
	}
	.top-right{
		justify-content:flex-end;
		height: 70px;
		li{
			font-size: 12px;
			color: #fff;
			padding: 0 10px;
			position: relative;
		}
		.shop-cart-count{
			margin-left: 5px;
			text-align: center;
			background: #A82225;
			padding: 0 6px 1px 4px;
			height: 17px;
			border-radius: 100px;
		}
	}
	a{
		display: block;
		color: #fff;
	}
}

.fixed-tool-box{
	position: fixed;
	bottom: 50%;
	right: 0;
	z-index: 100;
	.fixed-box{
		color: #fff;
		width: 40px;
		height: 40px;
		background: #000;
		&:last-child{
			border-bottom: none;
		}
		.shop-cart-count{
			position: absolute;
			top: -6px;
			right: 0;
			background: #942C15;
			border-radius: 50%;
			color: #fff;
			display: inline-block;
			width: 16px;
			height: 16px;
			line-height: 16px;
			text-align: center;
		}
	}
	.icon-contet{
		width: 120px;
		height: 120px;
		background: #000;
		bottom: 0;
		right: -120px;
		position: absolute;
		z-index: -1;
		transition:all .2s linear;
		color:#fff;
		border-radius: 8px 0 0 8px;
		&.open{
			right: 100%;
		}
		.box{
			width: 100%;
			height: 100%;
		}
		.kefu-content{
			a{
				padding: 8px 15px;
				border: 1px solid #fff;
				border-radius: 5px;
			}
		}
	}
}

</style>
