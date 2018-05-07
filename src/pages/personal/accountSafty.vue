<template>
<div class="accountSafty">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>个人中心</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftMenu :navNum='8'></leftMenu>
			</el-col>
			<el-col :span="20">
				<!--账户安全-->
				<el-form :model="safeForm" ref="safeForm" class="safe-from" label-width="120px" :rules="safePwd">
					<el-form-item label="绑定手机号：" prop="customerMobile">
						{{customerInfo.customerMobileStr}}
					</el-form-item>
					<input type="text" style="display:none;">
					<el-form-item label="手机验证码：" prop="smsCode" :rules="[{ required: true, message: '手机验证码不能为空'}]">
						<el-input v-model="safeForm.smsCode" style="width:120px;"></el-input>&nbsp;
						<div class="code-btn button" @click="sendCode(2)" v-show="!sendMessage">获取验证码</div>
						<div class="code-btn disabled" v-show="sendMessage">重新获取({{codeTime}}s)</div>
					</el-form-item>
					<el-form-item label="新登录密码：" prop="customerPwd" :rules="[
						{ required: true, message: '请输入新登录密码'},
						{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
					]">
						<el-input v-model="safeForm.customerPwd" type="password" auto-complete="off"></el-input>
					</el-form-item>

					<el-form-item label="确认新密码：" prop="confirmPwd">
						<el-input v-model="safeForm.confirmPwd" type="password" auto-complete="off"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="submitLogin">确认修改</el-button>
					</el-form-item>
				</el-form>
				<!-- <div class="personal-container">
					<el-tabs value="first" @tab-click="changeTab">
						<el-tab-pane label="登录密码修改" name="first" >

						</el-tab-pane> -->
						<!-- <el-tab-pane label="支付密码修改" name="second">
							<el-form :model="payForm" ref="payForm" class="safe-from" label-width="120px" :rules="payPwd">
								<el-form-item label="绑定手机号：" prop="customerMobile">
									{{customerInfo.customerMobileStr}}
								</el-form-item>
								<input type="text" style="display:none;">
								<el-form-item label="手机校验码：" prop="smsCode" :rules="[{ required: true, message: '手机校验码不能为空'}]">
									<el-input v-model="payForm.smsCode" style="width:120px;"></el-input>&nbsp;
									<div class="code-btn button" @click="sendCode(3)" v-show="!sendMessage">获取手机校验码</div>
									<div class="code-btn disabled" v-show="sendMessage">重新获取({{codeTime}}s)</div>
								</el-form-item>

								<el-form-item label="新支付密码：" prop="tradePwd" :rules="[
		                        	{ required: true, message: '请输入新的支付密码'},
		                        	{ min: 6, max: 6, message: '密码长度只能输入6位', trigger: 'blur' }
		                      	]">
									<el-input v-model="payForm.tradePwd" type="password"></el-input>
								</el-form-item>

								<el-form-item label="确认新密码：" prop="newTradePwd">
									<el-input v-model="payForm.newTradePwd" type="password"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary"  @click="submitPay">确认修改</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane> -->
					<!-- </el-tabs>
				</div> -->
			</el-col>
		</el-row>
	</div>
	<perFooter></perFooter>
</div>
</template>

<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftMenu from './leftBar.vue'
export default {
	name: 'accountSafty',
	data() {
		var checkPwd = (rule, value, callback) => {
			if (value.indexOf(" ")>=0) {
				return callback(new Error('密码不能含有空格!'));
			} else {
				callback();
			}
		},
		checkSafePwd = (rule, value, callback) => {
			if (value == this.safeForm.customerPwd) {
				callback();
			} else {
				return callback(new Error('两次输入密码不一致!'));
			}
		},
		checkPayPwd = (rule, value, callback) => {
			if (value == this.payForm.tradePwd) {
				callback();
			} else {
				return callback(new Error('两次输入密码不一致!'));
			}
		};
		return {
			activeTab: 'first',
			customerInfo: {},
			sendMessage: false,
			codeTime: 60,
			safeForm: {
				customerMobile: '',
				smsCode: '',
				customerPwd: '',
				confirmPwd: ''
			},
			payForm: {
				customerMobile: '',
				smsCode: '',
				tradePwd: '',
				newTradePwd: ''
			},
			safePwd: {
				confirmPwd: [{
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
						validator: checkSafePwd,
						trigger: 'blur'
					},
				],
			},
			payPwd: {
				newTradePwd: [{
						required: true,
						message: '请输入确认密码',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 6,
						message: '密码长度只能输入6位',
						trigger: 'blur'
					},
					{
						validator: checkPayPwd,
						trigger: 'blur'
					},
				],
			}
		}
	},
	components: {
		perHeader,
		leftMenu,
		perFooter,
	},
	methods: {
		initData() {
			let that = this;
			that.util.returnLogin(that);
			let params = {
				apiUrl: that.config.mallApi + "center/profile/detail",
				apiMethod: "get"
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					let data = res.data.data;
					data.sex = data.sex ? data.sex : 2;
					if (data.customerBirthday) {
						data.customerBirthday = that.util.forDate(data.customerBirthday, 'yyyy-MM-dd');
					}
					that.customerInfo = data;
					that.customerMobile = data.customerMobile;
					that.customerMobile = data.customerMobile;
				}
			})
		},
		sendCode: function(e) {
			let params = {
				"phone": this.customerInfo.customerMobile,
				"type": e,
			}
			this.util.sendCode(this, params)
		},
		submitLogin: function() {
			let that = this;
			that.$refs['safeForm'].validate((valid)=>{
				if (valid) {
					let params = that.safeForm;
					params.customerMobile = that.customerMobile;
					params.customerPwd = that.md5(data.customerPwd);
					params.confirmPwd = that.md5(data.confirmPwd);
					params.apiUrl = that.config.mallApi + "center/pwd/edit";
					that.ajaxData(params,function (res) {
						if (res.data.code == "0000") {
							that.$notify({
								type: 'success',
								message: '修改成功'
							});
							that.util.deleteCookie("customerLogin");
							that.util.deleteCookie("customerMobile");
							that.util.deleteCookie("customerName");
							that.util.deleteCookie("customerSeq");
							that.util.deleteCookie("token");
							that.customerInfo = {};
							that.cartCount = 0;
							this.$router.push('/bG9naW4');
						} else {
							that.$notify({
								type: 'error',
								message: res.data.message
							});
							this.$refs['safeForm'].resetFields();
						}
					})
				}
			})
		},
		submitPay: function() {
			let that = this;
			that.$refs['payForm'].validate((valid)=>{
				if (valid) {
					let params = that.payForm;
					params.customerMobile = that.customerMobile;
					params.tradePwd = that.md5(data.tradePwd);
					params.newTradePwd = that.md5(data.newTradePwd);
					params.apiUrl = that.config.mallApi + "center/upadte/tradepwd";
					that.ajaxData(params,function (res) {
						if (res.data.code == "0000") {
							that.$notify({
								type: 'success',
								message: '修改成功'
							});
							that.$refs['payForm'].resetFields();
							that.sendMessage = false;
							that.codeTime = 60;
						} else {
							that.$notify({
								type: 'error',
								message: res.data.message
							});
							this.$refs['payForm'].resetFields();
						}
					})
				}
			})
		},
		changeTab:function (tab, event) {
			if (tab.name!=this.activeTab) {
				this.$refs['safeForm'].resetFields();
				this.$refs['payForm'].resetFields();
				this.sendMessage = false;
				this.codeTime = 60;
				this.activeTab = tab.name;
			}else {
				return;
			}
		}
	},
	mounted() {
		this.initData();
	}
}
</script>

<style lang="less" scoped>
@import url('css/personal.less');
</style>
