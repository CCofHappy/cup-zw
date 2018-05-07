<template>
<div class="forgetPassword">
	<cwHeader></cwHeader>
	<!-- <header>
		<div class="container">
			<div class="logo box box-align-center">
				<router-link to="/aG9tZQ">
					<img src="../../img/logo.png">
				</router-link>
				<div class="title">威 士 忌 商 城</div>
			</div>
		</div>
	</header> -->
	<div class="forget-content">
		<div class="container">
			<el-steps finish-status="success" :align-center="true" :active="active" align-center :space="350">
				<el-step title="填写账户名"></el-step>
				<el-step title="验证身份"></el-step>
				<el-step title="设置新密码"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>
			<div class="forget-box">
				<div class="check-box" v-if="active===0">
					<div class="input-box box box-align-center">
						<span class="input-title">用户名：</span><input type="text" name="user" v-model="customerLogin" placeholder="用户名/手机号码"><span class="required">*</span>
					</div>
					<div class="input-box box box-align-center">
						<span class="input-title">验证码：</span><input type="text" name="code" v-model="webCode" placeholder="输入验证码"><span class="required">*</span>
						<img v-bind:src="codeBackground" class="button code-img" @click="changeCodeImg">
						<div>
							<p class="text-color-help text-center">看不清？</p>
							<p class="button font-red" @click="changeCodeImg">换一张</p>
						</div>
					</div>
				</div>
				<div class="check-box password" v-if="active===1">
					<div class="input-box box box-align-center">
						<span class="input-title">用户名：</span><span>{{customerName}}</span>
					</div>
					<div class="input-box box box-align-center">
						<span class="input-title">手机号码：</span><span>{{customerMobileStr}}</span>
					</div>
					<div class="input-box box box-align-center">
						<span class="input-title">手机验证码：</span>
						<input type="text" name="tel-code" v-model="telCode" placeholder="请输入手机验证码">
						<span class="required">*</span>
						<div class="code-btn button" @click="sendCode" v-show="!sendMessage" style="color:#942C15;">获取验证码</div>
						<div class="code-btn disabled" v-show="sendMessage">重新获取({{codeTime}}s)</div>
					</div>
				</div>
				<div class="check-box" v-if="active===2">
					<el-form :model="passwordForm" status-icon ref="passwordForm" :rules="rules" label-width="120px">
						<el-form-item label="新登录密码：" prop="customerPwd">
							<el-input type="password" v-model="passwordForm.customerPwd"></el-input>
						</el-form-item>
						<el-form-item label="确认密码：" prop="confirmPassword">
							<el-input type="password" v-model="passwordForm.confirmPassword"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div class="check-box" v-if="active===3">
					<h1 class="pw-success box box-center"><icon name="tick-green" scale="4"></icon>&nbsp;恭喜您设置成功，请妥善保存您的密码</h1>
					<router-link to="/bG9naW4" class="jump-login">立即登录</router-link>
				</div>
				<div class="box next-button-box" v-if="active!==3">
					<div class="button next-button" @click="submitNext">提 交</div>
					<div class="return-btn button" @click="goToHome">返回登录</div>
				</div>
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
	name: 'forgetPassword',
	data() {
		var checkPwd = (rule, value, callback) => {
			if (value.indexOf(" ")>=0) {
				return callback(new Error('密码不能含有空格!'));
			} else {
				callback();
			}
		},
		checkConfirmPwd = (rule, value, callback) => {
			if (value == this.passwordForm.customerPwd) {
				callback();
			} else {
				return callback(new Error('两次输入密码不一致!'));
			}
		};
		return {
			active: 0,
			codeBackground: "",
			customerLogin: "",
			webCode: "",
			customerName: "",
			customerMobile: "",
			customerMobileStr: "",
			telCode: "",
			sendMessage: false,
			codeTime: 60,
			passwordForm: {
				customerPwd: '',
				confirmPassword: '',
			},
			rules: {
				customerPwd: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 20,
						message: '长度在 6 到 20 个字符',
						trigger: 'blur'
					},
					{
						validator: checkPwd,
						trigger: 'blur'
					},
				],
				confirmPassword: [{
						required: true,
						message: '请输入确认密码',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 20,
						message: '长度在 6 到 20 个字符',
						trigger: 'blur'
					},
					{
						validator: checkConfirmPwd,
						trigger: 'blur'
					},
				],
			}
		}
	},
	components: {
		cwHeader,
		cwFooter,
	},
	methods: {
		submitNext() {
			let that = this;
			let active = that.active;
			switch (active) {
				case 0:
					if (that.customerLogin && that.webCode) {
						let params = {
							apiUrl: this.config.mallApi + "auth/forgetpwd/validateNameOrPhone?loginOrMobile=" + that.customerLogin + "&webCode=" + that.webCode,
							apiMethod: 'get',
						}
						that.ajaxData(params, function(res) {//订单详情
							if (res.data.code == "0000") {
								that.customerName = res.data.data.customerName;
								that.customerMobile = res.data.data.customerMobile;
								that.customerMobileStr = res.data.data.customerMobileStr;
								that.active++;
							} else {
								that.webCode = "";
								that.customerPwd = "";
								that.changeCodeImg();
								that.$message.error(res.data.message);
							}
						})
					} else {
						that.$message.error("必填信息不能为空")
					}
					break;
				case 1:
					if (that.telCode) {
						let params = {
							apiUrl: that.config.mallApi + "auth/forgetpwd/checksms?customerMobile=" + that.customerMobile + "&smsCode=" + that.telCode,
							apiMethod: 'get',
						}
						that.ajaxData(params, function(res) {//订单详情
							if (res.data.code == "0000") {
								that.active++;
							} else {
								that.telCode = "";
								that.$message.error(res.data.message);
							}
						})
					} else {
						that.$message.error("手机验证码不能为空")
					}
					break;
				case 2:
					this.$refs['passwordForm'].validate((valid) => {
						if (valid) {
							let data= that.passwordForm;
							let params = {
								apiUrl:  this.config.mallApi + "auth/forgetpwd/reset",
								apiMethod: 'get',
								customerMobile: that.customerMobile,
								customerPwd: that.md5(data.customerPwd),
								confirmPassword: that.md5(data.confirmPassword)
							}
							that.ajaxData(params, function(res) {//订单详情
								if (res.data.code == "0000") {
									that.active++;
								} else {
									that.customerPwd = "";
									that.confirmPassword = "";
									that.$message.error(res.data.message);
								}
							})
						} else {
							return false;
						}
					});
					break;
				default:

			}
		},
		changeCodeImg: function() { //刷新验证码
			let num = new Date().getTime();
			this.codeBackground = this.config.commonApi + "common/core/webCode?" + num;
		},
		sendCode: function () { //发手机验证码
			let that = this;
			let params = {
				"phone": that.customerMobile,
				"type": 2,
			}
			that.util.sendCode(that, params)
		},
		goToHome: function () {
			this.$router.push('/bG9naW4');
		}
	},
	mounted() {
		this.codeBackground = this.config.commonApi + "common/core/webCode";
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('./forgetPassword.less');
</style>
