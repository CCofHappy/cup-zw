<template>
<div class="register-content">
	<div class="register-detail">
		<h1 class="text-center">注册</h1>
		<div class="register-form user">
			<el-form :model="userForm" status-icon :rules="rules" ref="userForm">
				<el-form-item prop="customerName">
					<el-input v-model="userForm.customerName" placeholder="请输入用户名" id="userName" @focus="focusEvent" @blur="blurEvent">
						<template slot="prepend">用&nbsp;&nbsp;户&nbsp;&nbsp;名</template>
					</el-input>
					<span class="text-color-help font-12 box box-start" v-if="warningFlag">
						<icon name="warn-gray" scale="1.5"></icon><span>支持中文、字母、数字、“-”、“_”的组合3-6个字符</span>
					</span>
				</el-form-item>
				<el-form-item prop="customerPwd">
					<el-input v-model="userForm.customerPwd" placeholder="请输入密码" type="password">
						<template slot="prepend">密&nbsp;&nbsp;&nbsp;&nbsp;码</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="confirmPassword">
					<el-input v-model="userForm.confirmPassword" placeholder="请再次输入密码" type="password">
						<template slot="prepend">确认密码</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="customerMobile">
					<el-input v-model="userForm.customerMobile" placeholder="请输入您的手机号码">
						<template slot="prepend">手机号码</template>
					</el-input>
				</el-form-item>
				<el-row :gutter="10">
					<el-col :span="18">
						<el-form-item prop="smsCode">
							<el-input v-model="userForm.smsCode" placeholder="请输入手机验证码">
								<template slot="prepend">手机验证码</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<div class="code-btn disabled" v-show="!checkMobile && !sendMessage">获取验证码</div>
						<div class="code-btn button" @click="sendCode" v-show="checkMobile && !sendMessage">获取验证码</div>
						<div class="code-btn disabled" v-show="sendMessage">重新获取({{codeTime}}s)</div>
					</el-col>
				</el-row>
				<el-form-item prop="customerCode">
					<el-input v-model="userForm.customerCode" placeholder="请输入您的推荐码">
						<template slot="prepend">推&nbsp;&nbsp;荐&nbsp;&nbsp;码</template>
					</el-input>
				</el-form-item>
				<el-checkbox v-model="agreeRule"><small>我已阅读并同意中威的<u class="button" @click="dialogVisible = true">《用户注册协议》</u></small></el-checkbox>
				<el-button type="primary" @click="submitForm" class="register-btn button">立即注册</el-button>
				<registerRule :dialogVisible="dialogVisible" @closeDialog="dialogVisible=false;"></registerRule>
			</el-form>
		</div>
	</div>
</div>
</template>
<script>
import registerRule from '@/components/registerRule/registerRule'
export default {
	name: 'register',
	data() {
		var checkLogin = (rule, value, callback) => {
				let that = this;
				if (value) {
					let b = new RegExp("[^a-zA-Z0-9\_\u4e00-\u9fa5]", "i");
					if (b.test(value)) {
						return callback(new Error('用户名含有非法字符'));
					}
					if (value.length > 2 && value.length < 7) {
						let params = {
							apiUrl: this.config.mallApi + "auth/reg/validatename/" + value,
							apiMethod: "get",
						}
						this.ajaxData(params, function(res) {
							if (res.data.code == "0000") {
								callback();
							} else {
								return callback(new Error('用户名已被占用'));
							}
						})
					} else {
						return callback(new Error('长度在 3 到 6 个字符'));
					}
				}
			},
			checkPwd = (rule, value, callback) => {
				if (value.indexOf(" ") >= 0) {
					return callback(new Error('密码不能含有空格!'));
				} else {
					callback();
				}
			},
			checkConfirmPwd = (rule, value, callback) => {
				if (value == this.userForm.customerPwd) {
					callback();
				} else {
					return callback(new Error('两次输入密码不一致!'));
				}
			},
			checkMobile = (rule, value, callback) => {
				let that = this;
				if (value.length == 11) {
					if (that.util.checkTel(value)) return callback(new Error('手机号不正确'));
					let params = {
						apiUrl: that.config.mallApi + "auth/reg/validatephone/" + value,
						apiMethod: "get",
					}
					this.ajaxData(params, function(res) {
						if (res.data.code == "0000") {
							that.checkMobile = true;
							callback();
						} else {
							return callback(new Error('手机号已被占用'));
							that.checkMobile = false;
						}
					})
				}
			};
		return {
			agreeRule: true,
			dialogVisible: false,
			codeTime: 60,
			checkMobile: false,
			sendMessage: false,
			warningFlag: false,
			userForm: {
				customerName: '',
				customerPwd: '',
				confirmPassword: '',
				customerMobile: '',
				smsCode: '',
				customerCode: '',
			},
			rules: {
				customerName: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					},
					{
						min: 3,
						max: 12,
						message: '长度在 3 到 12 个字符',
						trigger: 'blur'
					},
					{
						validator: checkLogin,
						trigger: 'blur'
					},
				],
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
				customerMobile: [{
						required: true,
						message: '手机号码不能为空',
						trigger: 'blur'
					},
					{
						min: 11,
						max: 11,
						message: '长度为 11 个字符',
						trigger: 'blur'
					},
					{
						validator: checkMobile,
						trigger: 'blur'
					},
				],
				smsCode: [{
						required: true,
						message: '手机验证码不能为空',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 6,
						message: '长度在 6 个字符',
						trigger: 'blur'
					}
				],
				customerCode: [{
					min: 0,
					max: 8,
					message: '长度最多 8 个字符',
					trigger: 'blur'
				}],
			}
		}
	},
	components:{
		registerRule,
	},
	methods: {
		focusEvent: function() {
			this.warningFlag = true;
		},
		blurEvent: function() {
			this.warningFlag = false;
		},
		sendCode: function() {
			let that = this;
			that.$refs['userForm'].validateField("customerMobile", (valid) => {
				if (!valid) {
					let params = {
						"phone": that.userForm.customerMobile,
						"type": 1,
					}
					that.util.sendCode(that, params)
				}
			})
		},
		submitForm: function() {
			let that = this;
			if (!this.agreeRule) {
				that.$message.error("请先同意《用户注册协议》");
				return;
			}
			this.$refs['userForm'].validate((valid) => {
				if (valid) {
					var params = this.userForm;
					params.customerType = 2;
					params.customerPwd = that.md5(params.customerPwd.replace(/\s/g, ''));
					params.confirmPassword = that.md5(params.confirmPassword.replace(/\s/g, ''));
					params.apiUrl = this.config.mallApi + "auth/reg/normal";
					params.apiMethod = "post";
					this.ajaxData(params, function(res) {
						if (res.data.code == "0000") {
							that.$message.success("注册成功！");
							setTimeout(function() {
								that.$router.push('/bG9naW4');
							}, 2000)
						} else {
							that.$message.error(res.data.message);
							that.userForm.customerPwd = '';
							that.userForm.confirmPassword = '';
							that.userForm.smsCode = '';
							setTimeout(function() {
								that.$refs['userForm'].validateField("customerPwd");
								that.$refs['userForm'].validateField("confirmPassword");
								that.$refs['userForm'].validateField("smsCode");
							}, 100)
						}
					})
				} else {
					return false;
				}
			});
		},
	},
	mounted() {
	 	this.$emit('childType',1);
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('css/common.less');
</style>
