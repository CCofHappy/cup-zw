<template>
<div class="cwfooter">
	<div class="footer-mid">
		<el-row class="container box box-align-center">
			<el-col :span="3">
				<img class="logo" src="../../img/logo-bt.png" width="90%">
			</el-col>
			<el-col :span="13">
				<el-row class="text-center">
					<el-col :span="4">
						<h4>新手入门</h4>
						<ul>
							<li>
								<router-link to="/bmV3ZXJHdWlk" target="_blank">注册协议</router-link>
							</li>
							<li>
								<router-link to="/c2hvcHBpbmdGbG93" target="_blank">购物流程</router-link>
							</li>
							<li>
								<router-link to="/cXVlc3Rpb25z">常见问题</router-link>
							</li>
						</ul>
					</el-col>
					<el-col :span="4">
						<h4>拍卖指南</h4>
						<ul>
							<li>
								<router-link to="/ZGVsaXZlcnlQb2xpY3k=" target="_blank">配送费用</router-link>
							</li>
							<li>
								<router-link to="/ZGVsaXZlcnlUaW1l" target="_blank">配送时间</router-link>
							</li>
							<li>
								<router-link to="/Z29vZHNJbnNwZWN0aW9u" target="_blank">配送安全</router-link>
							</li>
						</ul>
					</el-col>
					<el-col :span="4">
						<h4>支付方式</h4>
						<ul>
							<!-- <li>
			                  	<router-link to="/cGF5T25saW5l" target="_blank">中威钱包支付</router-link>
			                </li> -->
							<li>
								<router-link to="/cGF5T25saW5l" target="_blank">在线支付</router-link>
							</li>
							<li>
								<router-link to="/YmFua1BheQ" target="_blank">线下支付</router-link>
							</li>
							<li>
								<router-link to="/aW52b2ljZUludHI=" target="_blank">发票说明</router-link>
							</li>
						</ul>
					</el-col>
					<el-col :span="4">
						<h4>配送说明</h4>
						<ul>
							<li>
								<router-link to="/ZGVsaXZlcnlQb2xpY3k=" target="_blank">配送费用</router-link>
							</li>
							<li>
								<router-link to="/ZGVsaXZlcnlUaW1l" target="_blank">配送时间</router-link>
							</li>
							<li>
								<router-link to="/Z29vZHNJbnNwZWN0aW9u" target="_blank">配送安全</router-link>
							</li>
						</ul>
					</el-col>
					<el-col :span="4">
						<h4>售后服务</h4>
						<ul>
							<li>
								<router-link to="/cXVhbGl0eUFzc3VyYW5jZQ==" target="_blank">品质保障</router-link>
							</li>
							<li>
								<router-link to="/cXVhbGl0eUFzc3VyYW5jZQ==" target="_blank">退换货政策</router-link>
							</li>
						</ul>
					</el-col>
					<el-col :span="4">
						<h4>关于我们</h4>
						<ul>
							<li>
								<router-link to="/YWJvdXRVcw==?id=1" target="_blank">公司简介</router-link>
							</li>
							<li>
								<router-link to="/YWJvdXRVcw==?id=2" target="_blank">招贤纳士</router-link>
							</li>
							<li>
								<router-link to="/YWJvdXRVcw==?id=3" target="_blank">联系方式</router-link>
							</li>
						</ul>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="8">
				<el-row class="text-center">
					<el-col :span="8">
						<img class="ios-code" src="../../img/wxcode.png" width="75%">
						<p>小程序拍卖</p>
					</el-col>
					<el-col :span="8">
						<img class="ios-code" src="../../img/ios.png" width="75%">
						<p>中威网APP</p>
					</el-col>
					<el-col :span="8">
						<img class="ios-code" src="../../img/wxcode.png" width="75%">
						<p>微信公众号</p>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
	<div class="footer-bottom">
		<div class="container">
			<p>Copyright © 2017 china whisky Inc. 保留所有权利 | 粤工商备P131712010165</p>
		</div>
	</div>
</div>
</template>


<script>
export default {
	name: 'cwfooter',
	data() {
		return {}
	},
	methods: {
		goWWW: function() {
			console.log(1223);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
.cwfooter {
	background: white;
	border-top: 1px solid #d8d8d8;
    .footer-mid {
        padding: 40px 0;
        h4 {
			color: #000;
            margin-bottom: 10px;
            font-size: 13px;
            font-weight: normal;
        }
        ul li {
            margin-bottom: 5px;
            a {
                font-size: 12px;
                color: #656565;
                transition: all 0.5s ease 0s;
            }
            a:hover {
                padding-left: 10px;
                color: @pale-red;
            }
        }
        .el-col-4 {
            text-align: center;
            .ios-code {
                width: 126px;
                margin-bottom: 5px;
            }
        }
    }
    .footer-bottom {
        height: 32px;
        color: #000;
        line-height: 32px;
        text-align: center;
        padding-bottom: 50px;
    }
}
</style>
