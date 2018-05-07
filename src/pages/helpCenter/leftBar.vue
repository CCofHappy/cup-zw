<template>
<el-row class="tac">
	<el-col>
		<el-menu :default-openeds="leftIndex" :default-active="navNum" :unique-opened="unique" active-text-color="#C9B26E" class="el-menu-vertical">
			<el-submenu index="1">
				<template slot="title">
					<div class="box box-align-center title-box">
						<img src="../../img/icon/help-Introduction.png">
						<b>新手入门</b>
					</div>
          		</template>
          		<router-link to="/bmV3ZXJHdWlk">
					<el-menu-item index="13">● 注册协议</el-menu-item>
				</router-link>
				<router-link to="/bG9naW5BbmRSZWdpc3Rlcg==">
					<el-menu-item index="11">● 如何登录/注册</el-menu-item>
				</router-link>
				<router-link to="/ZmluZEJhY2tQd2Q=">
					<el-menu-item index="12">● 如何找回密码</el-menu-item>
				</router-link>
				<router-link to="/c2hvcHBpbmdGbG93">
					<el-menu-item index="14">● 购物流程</el-menu-item>
				</router-link>
				<router-link to="/ZGlzY2xhaW1lcg==">
					<el-menu-item index="15">● 免责声明</el-menu-item>
				</router-link>
				<router-link to="/cXVlc3Rpb25z">
					<el-menu-item index="16">● 常见问题</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="6">
				<template slot="title">
					<div class="box box-align-center title-box">
						<img src="../../img/icon/help-auction.png">
						<b>拍卖指南</b>
					</div>
          		</template>
          		<router-link to="/YXVjdGlvblBvbGljeQ==">
					<el-menu-item index="61">● 拍卖法</el-menu-item>
				</router-link>
				<router-link to="/YXVjdGlvbk5vdGljZQ==">
					<el-menu-item index="62">● 送拍须知</el-menu-item>
				</router-link>
				<router-link to="/YXVjdGlvbkFkdmljZQ==">
					<el-menu-item index="63">● 拍卖征集公告</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<div class="box box-align-center title-box">
						<img src="../../img/icon/help-pay.png">
						<b>支付方式</b>
					</div>
          		</template>
				<!-- <el-menu-item index="21">
            	<router-link  to="/cGF5T25saW5l">● 中威钱包支付</router-link>
          		</el-menu-item> -->
				<router-link to="/cGF5T25saW5l">
					<el-menu-item index="22">● 在线支付</el-menu-item>
				</router-link>
				<router-link to="/YmFua1BheQ">
					<el-menu-item index="23">● 银行汇款</el-menu-item>
				</router-link>
				<router-link to="/aW52b2ljZUludHI=">
					<el-menu-item index="24">● 发票说明</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<div class="box box-align-center title-box">
						<img src="../../img/icon/help-distribution.png">
						<b>配送说明</b>
					</div>
				</template>
				<router-link to="/ZGVsaXZlcnlQb2xpY3k=">
					<el-menu-item index="31">● 配送费用</el-menu-item>
				</router-link>
				<router-link to="/ZGVsaXZlcnlUaW1l">
					<el-menu-item index="32">● 配送时间</el-menu-item>
				</router-link>
				<router-link to="/Z29vZHNJbnNwZWN0aW9u">
					<el-menu-item index="33">● 配送安全</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">
					<div class="box box-align-center title-box">
						<img src="../../img/icon/help-service.png">
						<b>售后服务</b>
					</div>
	          	</template>
	          	<router-link to="/cXVhbGl0eUFzc3VyYW5jZQ==">
					<el-menu-item index="45">● 品质保障</el-menu-item>
				</router-link>
				<router-link to="/cmV0dXJuQmFja0dvb2Rz">
					<el-menu-item index="41">● 退换货政策</el-menu-item>
				</router-link>
				<!-- <router-link to="/cmV0dXJuR29vZHNGbG93">
					<el-menu-item index="42">● 退货流程</el-menu-item>
				</router-link> -->
			</el-submenu>
			<!-- <el-submenu index="5">
				<template slot="title">
	            	<i class="el-icon-mobile-phone"></i><b>关于我们</b>
	          	</template>
				<router-link to="/YWJvdXRVcw==">
					<el-menu-item index="51">● 公司简介</el-menu-item>
				</router-link>
				<router-link to="/am9pblVz">
					<el-menu-item index="53">● 招贤纳士</el-menu-item>
				</router-link>
				<router-link to="/Y29udGFjdFVz">
					<el-menu-item index="54">● 联系方式</el-menu-item>
				</router-link>
			</el-submenu> -->
		</el-menu>
	</el-col>
</el-row>
</template>

<script>
export default {
	name: 'leftBar',
	props: ["navNum", 'leftIndex'],
	data() {
		return {
			unique: true
		}
	},
	methods: {}
}
</script>
<style lang="less" scoped>
@import url('css/helpCenter.less');
</style>
