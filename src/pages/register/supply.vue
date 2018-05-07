<template>
<div class="register-content supply">
	<div class="register-detail">
		<h1 class="text-center">注册</h1>
		<div class="register-form">
			<el-form :model="supplyForm" :rules="rules" ref="supplyForm" status-icon>
				<h4 class="form-title">
					账户基本信息
				</h4>
				<el-form-item prop="name">
					<el-input v-model="supplyForm.name" placeholder="请输入用户名">
						<template slot="prepend">用&nbsp;&nbsp;户&nbsp;&nbsp;名</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="supplyForm.password" placeholder="请输入密码">
						<template slot="prepend">密&nbsp;&nbsp;&nbsp;&nbsp;码</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="passwordSc">
					<el-input v-model="supplyForm.passwordSc" placeholder="请再次输入密码">
						<template slot="prepend">确认密码</template>
					</el-input>
				</el-form-item>

				<h4 class="form-title">
					联系人信息
				</h4>
				<el-form-item prop="contactName">
					<el-input v-model="supplyForm.contactName" placeholder="请输入联系人姓名">
						<template slot="prepend">联系人姓名</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="contactTel">
					<el-input v-model="supplyForm.contactTel" placeholder="请输入联系人电话">
						<template slot="prepend">联系人电话</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="tel">
					<el-input v-model="supplyForm.tel" placeholder="请输入您的手机号码">
						<template slot="prepend">手机号码</template>
					</el-input>
				</el-form-item>
				<el-row :gutter="10" class="telCode-box">
					<el-col :span="18">
						<el-form-item prop="telCode" class="telCode">
							<el-input v-model="supplyForm.telCode" placeholder="请输入手机验证码">
								<template slot="prepend">手机验证码</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<div class="code-btn button">获取验证码</div>
					</el-col>
				</el-row>
				<el-form-item prop="referralCode">
					<el-input v-model="supplyForm.referralCode" placeholder="请输入您的推荐码">
						<template slot="prepend">推&nbsp;荐&nbsp;码</template>
					</el-input>
				</el-form-item>

				<h4 class="form-title">
					公司信息
				</h4>
				<el-form-item prop="companyName">
					<el-input v-model="supplyForm.companyName" placeholder="工商局注册时的全称">
						<template slot="prepend">公司名称</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="taxesCode">
					<el-input v-model="supplyForm.taxesCode" placeholder="请输入纳税人识别号">
						<template slot="prepend">纳税人识别号</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="bank" class="bank">
					<div class="el-input-group__prepend">
						开&nbsp;户&nbsp;行
					</div>
					<el-select v-model="supplyForm.bank" placeholder="请选择">
						<el-option v-for="item in bankOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="bankId">
					<el-input v-model="supplyForm.bankId" placeholder="请输入开户账号">
						<template slot="prepend">开户行账号</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="companyAddress">
					<el-input v-model="supplyForm.companyAddress" placeholder="请输入详细地址">
						<template slot="prepend">公司地址</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="companyImg">
					<el-upload action="#" :file-list="supplyForm.companyImg">
						<el-button>上传营业执照</el-button>
					</el-upload>
				</el-form-item>
				<!-- <el-form-item label="组织机构代码：" prop="companyId">
					<el-input v-model="supplyForm.bankId" placeholder="请输入组织机构代码"></el-input>
				</el-form-item>
				<el-form-item label="机构代码证：" prop="companyIdImg">
					<el-upload action="#" :file-list="supplyForm.companyImg">
						<el-button>上传机构代码证</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="开户许可证：" prop="openIdImg">
					<el-upload action="#" :file-list="supplyForm.companyImg">
						<el-button>上传开户许可证</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="证明文件：" prop="proveImg">
					<el-upload action="#" :file-list="supplyForm.companyImg">
						<el-button>上传证明文件</el-button>
					</el-upload>
				</el-form-item> -->
				<el-checkbox class="purchaser" v-model="agreeRule"><small>我已阅读并同意中威的《用户注册协议》</small></el-checkbox>
				<el-button type="primary" class="register-btn button">立即注册</el-button>
			</el-form>
			<div class="tips">
				<small>服务须知：我们的审核时限为24小时(工作日)，遇法定节假日顺延。如有疑问，请拨打企业专享热线：400-026-0000。</small>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	name: 'supply',
	data() {
		return {
			agreeRule: true,
			supplyForm: {
				name: '',
				password: '',
				passwordSc: '',
				referralCode: '',
				tel: '',
				telCode: '',
				contactName: '',
				contactTel: '',
				companyName: '',
				taxesCode: '',
				bank: '',
				bankId: '',
				companyArea: [],
				companyAddress: '',
				companyId: '',
				companyImg: [],
				companyIdImg: [],
				openIdImg: [],
				proveImg: [],
			},
			rules: {
				name: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					},
					{
						min: 3,
						max: 10,
						message: '长度在 3 到 10 个字符',
						trigger: 'blur'
					}
				],
				password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 20,
						message: '长度在 6 到 20 个字符',
						trigger: 'blur'
					}
				],
				passwordSc: [{
						required: true,
						message: '确认密码不能为空',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 5,
						message: '长度在 6 到 20 个字符',
						trigger: 'blur'
					}
				],
				tel: [{
						required: true,
						message: '手机号码不能为空',
						trigger: 'blur'
					},
					{
						min: 11,
						max: 11,
						message: '长度为 11 个字符',
						trigger: 'blur'
					}
				],
				telCode: [{
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
				contactName: [{
					required: true,
					message: '联系人姓名不能为空',
					trigger: 'blur'
				}, ],
				contactTel: [{
						required: true,
						message: '联系人手机号码不能为空',
						trigger: 'blur'
					},
					{
						min: 11,
						max: 11,
						message: '长度为 11 个字符',
						trigger: 'blur'
					}
				],
				companyName: [{
					required: true,
					message: '公司名称不能为空',
					trigger: 'blur'
				}, ],
				taxesCode: [{
					required: true,
					message: '纳税人识别号不能为空',
					trigger: 'blur'
				}, ],
				bank: [{
					required: true,
					message: '请选择开户银行',
					trigger: 'blur'
				}, ],
				bankId: [{
					required: true,
					message: '开户账号不能为空',
					trigger: 'blur'
				}, ],
				companyAddress: [{
					required: true,
					message: '公司地址不能为空',
					trigger: 'blur'
				}, ],
				companyId: [{
					required: true,
					message: '组织机构代码不能为空',
					trigger: 'blur'
				}, ],
				companyImg: [{
					required: true,
					message: '清上传营业执照',
					trigger: 'blur'
				}, ],
				companyIdImg: [{
					required: true,
					message: '清上传机构代码证',
					trigger: 'blur'
				}, ],
				openIdImg: [{
					required: true,
					message: '清上传开户许可证',
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
			areaOptions: [{
				value: '1',
				label: '广东',
				children: [{
					value: '11',
					label: '广州',
					children: [{
						value: '111',
						label: '天河'
					}, {
						value: '112',
						label: '体育西'
					}]
				}, {
					value: '12',
					label: '惠州',
					children: [{
						value: '121',
						label: '惠城区'
					}, {
						value: '122',
						label: '江北'
					}]
				}]
			}, {
				value: '2',
				label: '广东',
				children: [{
					value: '21',
					label: '广州',
					children: [{
						value: '211',
						label: '天河'
					}, {
						value: '212',
						label: '体育西'
					}]
				}, {
					value: '22',
					label: '惠州',
					children: [{
						value: '221',
						label: '惠城区'
					}, {
						value: '222',
						label: '江北'
					}]
				}]
			}],
		}
	},
	methods: {},
	components: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('css/common.less');

</style>
