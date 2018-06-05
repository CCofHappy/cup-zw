<template>
<div class="register-content purchaser">
	<div class="register-detail">
		<h1 class="text-center">注册</h1>
		<div class="register-form">
			<el-form :model="purchaserForm" :rules="rules" ref="purchaserForm" status-icon>
				<h4 class="form-title">
					账户基本信息
				</h4>
				<el-form-item prop="customerName">
					<el-input v-model="purchaserForm.customerName" placeholder="请输入用户名">
						<template slot="prepend">用&nbsp;&nbsp;户&nbsp;&nbsp;名</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="customerPwd">
					<el-input v-model="purchaserForm.customerPwd" placeholder="请输入密码" type="password">
						<template slot="prepend">密&nbsp;&nbsp;&nbsp;&nbsp;码</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="confirmPassword">
					<el-input v-model="purchaserForm.confirmPassword" placeholder="请再次输入密码" type="password">
						<template slot="prepend">确认密码</template>
					</el-input>
				</el-form-item>


				<h4 class="form-title">
					联系人信息
				</h4>
				<el-form-item prop="realName">
					<el-input v-model="purchaserForm.realName" placeholder="请输入联系人姓名">
						<template slot="prepend">联系人姓名</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="customerMobile">
					<el-input v-model="purchaserForm.customerMobile" placeholder="请输入联系人电话">
						<template slot="prepend">联系人手机号</template>
					</el-input>
				</el-form-item>
				<el-row :gutter="10" class="telCode-box">
					<el-col :span="18">
						<el-form-item prop="smsCode" class="telCode">
							<el-input v-model="purchaserForm.smsCode" placeholder="请输入手机验证码">
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
					<el-input v-model="purchaserForm.customerCode" placeholder="请输入您的推荐码">
						<template slot="prepend">推&nbsp;荐&nbsp;码</template>
					</el-input>
				</el-form-item>

				<h4 class="form-title">
					公司信息
				</h4>
				<el-form-item prop="companyName">
					<el-input v-model="purchaserForm.companyName" placeholder="请输入公司名称">
						<template slot="prepend">公司名称</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="identificationNumber">
					<el-input v-model="purchaserForm.identificationNumber" placeholder="请输入纳税人识别号">
						<template slot="prepend">纳税人识别号</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="bankName" class="bank">
					<div class="el-input-group__prepend">
						开&nbsp;户&nbsp;行
					</div>
					<el-select v-model="purchaserForm.bankName" placeholder="请选择">
						<el-option v-for="item in bankOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="bankCard">
					<el-input v-model="purchaserForm.bankCard" placeholder="请输入开户账号">
						<template slot="prepend">开户账号</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="companyAddressDetail">
					<el-input v-model="purchaserForm.companyAddressDetail" placeholder="请输入详细地址">
						<template slot="prepend">公司地址</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="businessLicenseImg">
					<el-upload list-type="picture" :action="uploadUrl" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="removeImage">
						<el-button>上传营业执照</el-button>
					</el-upload>
				</el-form-item>
				<el-checkbox v-model="agreeRule"><small>我已阅读并同意中威的<u class="button" @click="dialogVisible = true">《用户注册协议》</u></small></el-checkbox>
				<el-button type="primary" class="register-btn button" @click="submitForm">立即注册</el-button>
				<registerRule :dialogVisible="dialogVisible" @closeDialog="dialogVisible=false;"></registerRule>
			</el-form>
			<div class="tips">
				<small>服务须知：我们的审核时限为24小时(工作日)，遇法定节假日顺延。如有疑问，请拨打企业专享热线：400-026-0000。</small>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import registerRule from '@/components/registerRule/registerRule'
export default {
	name: 'purchaser',
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
				if (value == this.purchaserForm.customerPwd) {
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
			sendMessage: false,
			checkMobile: false,
			uploadUrl: this.config.commonApi + "common/core/uploadObject2OSS", //图片上传地址
			purchaserForm: {
				customerName: '',
				customerPwd: '',
				confirmPassword: '',
				realName: '',
				customerMobile: '',
				smsCode: '',
				customerCode: '',
				companyName: '',
				identificationNumber: '',
				bankName: '',
				bankCard: '',
				companyAddressDetail: '',
				businessLicenseImg: [],
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
				realName: [{
					required: true,
					message: '联系人姓名不能为空',
					trigger: 'blur'
				}, ],
				customerMobile: [{
						required: true,
						message: '联系人手机号码不能为空',
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
				companyName: [{
					required: true,
					message: '公司名称不能为空',
					trigger: 'blur'
				}, ],
				identificationNumber: [{
					required: true,
					message: '纳税人识别号不能为空',
					trigger: 'blur'
				}, ],
				bankName: [{
					required: true,
					message: '请选择开户银行',
					trigger: 'blur'
				}, ],
				bankCard: [{
					required: true,
					message: '开户账号不能为空',
					trigger: 'blur'
				}, ],
				companyAddressDetail: [{
					required: true,
					message: '公司地址不能为空',
					trigger: 'blur'
				}, ],
				businessLicenseImg: [{
					required: true,
					message: '清上传营业执照',
					trigger: 'blur'
				}, ],
			},
			bankOptions: [{
				value: '1',
				label: '中国银行'
			}, {
				value: '2',
				label: '工商银行'
			}, {
				value: '3',
				label: '建设银行'
			}, {
				value: '4',
				label: '农业银行'
			}, {
				value: '5',
				label: '交通银行'
			}],
		}
	},
	components:{
		registerRule,
	},
	methods: {
		sendCode: function() {
			this.$refs['purchaserForm'].validateField("customerMobile", (valid) => {
				if (!valid) {
					let params = {
						"phone": this.purchaserForm.customerMobile,
						"type": 1,
					}
					this.util.sendCode(this, params)
				}
			})
		},
		//上传成功回调
		handleAvatarSuccess(res, file) {
			if (res.code == "0000") {
				this.purchaserForm.businessLicenseImg.push(res.data)
			}
		},
		//上传图片
		beforeAvatarUpload(file) {
			const isLt3M = file.size / 1024 / 1024 < 3;
			if (!isLt3M) {
				this.$notify.error('上传的头像大小不能超过3MB!');
				return false;
			}
			return isLt3M;
		},
		//删除上传图片
		removeImage(file,fileList){
			let removeData = file.response.data;
			let imgList = this.purchaserForm.businessLicenseImg;
			for (let i = 0; i < imgList.length; i++) {
				if (imgList[i] == removeData)imgList.splice(i,1);
			}
		},
		submitForm: function() {
			this.$refs['purchaserForm'].validate((valid) => {
				if (valid) {
					var params = this.purchaserForm;
					params.customerType = 2;
					params.customerPwd = this.md5(params.customerPwd.replace(/\s/g, ''));
					params.confirmPassword = this.md5(params.confirmPassword.replace(/\s/g, ''));
					params.apiUrl = this.config.mallApi + "auth/reg/supplier";
					params.apiMethod = "post";
					this.ajaxData(params, (res) =>{
						if (res.data.code == "0000") {
							this.$message.success("提交成功，等待审核");
							setTimeout(()=> {
								this.$router.push('/aG9tZQ');
							}, 1000)
						} else {
							this.$message.error(res.data.message);
							this.purchaserForm.customerPwd = '';
							this.purchaserForm.confirmPassword = '';
							this.purchaserForm.smsCode = '';
							setTimeout(()=> {
								this.$refs['purchaserForm'].validateField("customerPwd");
								this.$refs['purchaserForm'].validateField("confirmPassword");
								this.$refs['purchaserForm'].validateField("smsCode");
							}, 100)
						}
					})
				} else {
					return false;
				}
			});
		},
	},
	mounted(){
	 	this.$emit('childType',3);
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('css/common.less');
</style>
