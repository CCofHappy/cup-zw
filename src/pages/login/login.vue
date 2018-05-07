<template>
<div class="login">
	<cwHeader :from="'login'"></cwHeader>
	<!-- <div class="login-top box box-align-center">
		<div class="container box box-between">
			<div class="logo box box-center">
				<router-link to="/aG9tZQ"><img src="../../img/logo.png"></router-link>
				<div class="title">
					威士忌商城
				</div>
			</div>
		</div>
	</div> -->
	<div class="login-mid box box-center">
		<div class="container">
			<div class="login-box">
				<el-tabs v-model="activeName">
					<!-- <el-tab-pane label="用户名登录" name="user"> -->
					<h2 class="text-center">登录</h2>
					<div class="login-content">
						<el-row>
							<el-col :span="12">
								<div class="login-form-box">
									<el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
										<el-form-item prop="loginOrMobile">
											<el-input v-model="loginForm.loginOrMobile" placeholder="手机号/用户名" @keyup.enter.native="submitForm">
												<i slot="prefix" class="el-input__icon el-icon-phone"></i>
											</el-input>
										</el-form-item>
										<el-form-item prop="customerPwd">
											<el-input type="password" v-model="loginForm.customerPwd" placeholder="密码" @keyup.enter.native="submitForm">
												<i slot="prefix" class="el-input__icon el-icon-view"></i>
											</el-input>
										</el-form-item>
										<el-row>
											<el-col :span="12">
												<el-form-item prop="webCode">
													<el-input v-model="loginForm.webCode" placeholder="验证码" @keyup.enter.native="submitForm">
														<i slot="prefix" class="el-input__icon el-icon-edit-outline"></i>
													</el-input>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<div class="code-img">
													<img v-bind:src="codeBackground" class="button" @click="changeCodeImg">
													<p class="text-color-help text-center button" @click="changeCodeImg">点击刷新</p>
												</div>
											</el-col>
										</el-row>
										<div class="login-button button" @click="submitForm">登录</div>
									</el-form>
									<div class="box box-between">
										<label for="auto-login" class="box box-center text-color-help">
												<input type="checkbox" name="auto-logo" v-model="loginForm.isNoLogin" id="auto-login"><small>十天免登录</small>
											</label>
										<small class="box">
												<router-link to="/Zm9yZ2V0UGFzc3dvcmQ" class="text-color-help">忘记密码？</router-link>
											</small>
									</div>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="register-box">
									<h4>新用户注册</h4>
									<h5>注册成为中威官网用户</h5>

									<ul>
										<li><i></i> 查看订单，追踪物流</li>
										<li><i></i> 第一时间获取最新资讯</li>
										<li><i></i> 个性化您的推荐内容</li>
									</ul>
									<div class="register-btn">
										<router-link to="/cmVnaXN0ZXI" class="box go-login">免费注册</router-link>
									</div>
								</div>
							</el-col>
						</el-row>

					</div>
					<!-- </el-tab-pane> -->
					<!-- <el-tab-pane label="扫二维码登录" name="code">
			      <div class="login-content">
			        <img src="../../img/wapcode.jpg" class="login-code"/>
			      </div>
			    </el-tab-pane> -->
				</el-tabs>
				<!-- <div class="login-other box box-between">
					<div class="box box-center">
						<router-link to="#" class="box weixin-icon">
							<icon name="weixin" scale="2.5" class="icon"></icon>
						</router-link>
						<router-link to="#" class="box weixin-icon">
							<icon name="sina" scale="2.5" class="icon"></icon>
						</router-link>
						<router-link to="#" class="box qq-icon">
							<icon name="QQ" scale="2.5" class="icon"></icon>
						</router-link>
					</div>
					<div class="box box-center text-color-help">
						<small>第三方登陆</small>
					</div>
				</div> -->
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
	name: 'login',
	data() {
		return {
			activeName: "user",
			codeBackground: "",
			loginForm: {
				loginOrMobile: '',
				customerPwd: '',
				webCode: '',
				isNoLogin: false,
			},
			rules: {
				loginOrMobile: [{
						required: true,
						message: '账号不能为空',
						trigger: 'blur'
					},
					{
						min: 3,
						max: 20,
						message: '长度在 3 到 20 个字符',
						trigger: 'blur'
					},
				],
				customerPwd: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					},
					{
						min: 3,
						max: 20,
						message: '长度在 3 到 20 个字符',
						trigger: 'blur'
					}
				],
				webCode: [{
					required: true,
					message: '请输入验证码',
					trigger: 'blur'
				}, ],
			}
		}
	},
	methods: {
		submitForm: function() {
			let that = this;
			that.$refs['loginForm'].validate((valid) => {
				if (valid) {
					var params = that.loginForm;
					params.customerPwd = this.md5(params.customerPwd);
					params.apiUrl = that.config.mallApi + "auth/login/person";
					that.ajaxData(params,function (res) {
						let num = new Date().getTime();
						that.codeBackground = that.config.commonApi + "common/core/webCode?" + num;
						if (res.data.code == "0000") {
							that.$refs['loginForm'].resetFields();
							let data = res.data.data,day = params.isNoLogin ? 10 : 1;
							that.util.setCookie('customerLogin', data.customerLogin, day);
							that.util.setCookie('customerName', data.customerName, day);
							that.util.setCookie('customerSeq', data.customerSeq, day);
							that.util.setCookie('customerMobile', data.customerMobile, day);
							that.util.setCookie('token', data.keyCode, day)
							if (that.$route.query.goodsId) {
								that.$router.push('/Z29vZHNEZXRhaWw?id=' + that.$route.query.goodsId);
							} else {
								that.$router.push('/aG9tZQ');
							}
						} else if (res.data.code == "1120") {
							that.loginForm.webCode = "";
							that.loginForm.customerPwd = "";
							that.changeCodeImg();
							that.$message.error(res.data.message);
						} else {
							that.$refs['loginForm'].resetFields();
							that.$message.error(res.data.message);
						}
					})
				} else {
					return false;
				}
			});
		},
		changeCodeImg: function() {
			let num = new Date().getTime();
			this.codeBackground = this.config.commonApi + "common/core/webCode?" + num;
		},
	},
	mounted() {
		this.changeCodeImg();
	},
	components: {
		cwHeader,
		cwFooter,
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url(login.less);
</style>
