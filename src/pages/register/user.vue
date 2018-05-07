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
				<el-checkbox v-model="agreeRule"><small>我已阅读并同意中威的<a href="javasrcipt:,;" @click="dialogVisible = true"><u>《用户注册协议》</u></a></small></el-checkbox>

				<el-button type="primary" @click="submitForm" class="register-btn button">立即注册</el-button>

			</el-form>
		</div>

		<el-dialog title="用户注册协议" :visible.sync="dialogVisible" width="60%">
			<div class="pad0_30">
				<p>本协议由您与惠州市中威酒业有限公司共同缔结，本协议具有合同效力。</p>
				<p>本协议中协议双方合称协议方，惠州市中威酒业有限公司在协议中亦称为"中威网"。(域名为www.cwhisky.com）</p>
				<p><strong>一、 协议内容及签署</strong></p>
				<p>1.本协议内容包括协议正文及所有中威网已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。除另行明确声明外，任何中威网提供的服务均受本协议约束。</p>
				<p>2.您承诺接受并遵守本协议的约定。如果您不同意本协议的约定，您应立即停止注册程序或停止使用中威网网络平台。</p>
				<p>3.中威网有权根据需要不时地制订、修改本协议及/或各类规则，并以网站公示的方式进行公告，不再单独通知您。变更后的协议和规则一经在网站公布后，立即自动生效。如您不同意相关变更，应当立即停止使用中威网网络平台。您继续使用的，即表示您接受经修订的协议和规定。</p>
				<p><strong>二、 注册</strong></p>
				<p>1.注册者资格</p>
				<p>您确认，在您完成注册程序时，您应当是年满18周岁（自然人），具备完全民事权利能力、完全民事行为能力和能独立承担民事责任的自然人、法人或其他合法组织。若您不具备前述主体资格，则您及您的监护人应承担因此而导致的一切后果，且中威网有权注销（永久冻结）您的账户，并向您及您的监护人索偿。</p>
				<p>2.账户</p>
				<p>在您签署本协议，完成会员注册程序，依本服务注册表提示提供、维持并更新您本人正确、最新及完整的资料。若您提供任何错误或不实的资料，中威网有权暂停或终止您的帐号，并拒绝您使用本服务之全部或一部分。</p>
				<p>3.中威网有权删除任何文章及拒绝任何人士发表文章，同时亦有不删除文章的权利。</p>
				<p>4.中威网有主观性删文即停止会员使用会员权益，注册会员不得异议。</p>
				<p>5.会员同意授权中威网发送电子报及短信做为讯息传递。</p>
				<p><strong>三、会员帐号、密码及安全</strong></p>
				<p>完成本服务的登记程序之后，您将收到一个密码及帐号，您注册的电子信箱将收到一个认证信。维持密码、帐号及身份证字号的机密安全，是您的责任。利用该密码及帐号及身份证字号所进行的一切行为，您将负完全的责任。您了解并同意以下事项：您的密码或帐号遭到盗用或有其他任何安全问题发生时，您将立即通知中威网。 于每次登陆完毕，请结束您的帐号使用。</p>
				<p><strong>四、注册会员的义务及承诺</strong></p>
				<p>您承诺绝不为任何非法目的或以任何非法方式使用中威网提供的服务，并承诺遵守中华人民共和国相关法规及一切使用网络之国际惯例。您若是中华人民共和国以外的使用者，您了解并同意遵守所属国家或地域之法律。您同意并保证不得利用本服务从事侵害他人权益或违法之行为，包括：</p>
				<p>1.公布或传送任何诽谤、侮辱、具威胁性、攻击性、不雅、猥亵、不实、违反公共秩序或善良风俗或其他不法之文字、图片或任何形式的档案。</p>
				<p>2.侵害他人名誉、隐私权、营业秘密、商标权、著作权、专利权、其他知识产权及其他权利。</p>
				<p>3.违反依法律或契约所应负之保密义务。 </p>
				<p>4.冒用他人名义使用本服务。</p>
				<p>5.传输或散佈电脑病毒。</p>
				<p>6.其他中威网有正当理由认为不适当之行为得依实际执行情形，增加、修改或终止相关活动，并选择最适方式告知会员。</p>
				<p>发生下列情形之一时，中威有权可以停止、中断提供服务：</p>
				<p>1.中威网网站电子通信设备进行必要之保养及施工时。</p>
				<p>2.发生突发性之电子通信设备故障时。</p>
				<p>3.中威网站申请之电子通信服务被停止，无法提供服务时。</p>
				<p>4.由于天灾等不可抗力之因素致使中威网站无法提供服务时。</p>
				<p><strong>五、广告</strong></p>
				<p>您在中威网上浏览到的所有广告内容、文字与图片之说明、展示样品或其他销售资讯，均由各该广告商、产品与服务的供应商所设计与提出。您对于广告之正确性与可信度应自行斟酌与判断。中威网仅接受委托予以刊登，不对前述广告负担保责任。</p>
				<p><strong>六、 知识产权的保护</strong></p>
				<p>中威网所使用之软体或程式、网站上所有内容，包括著作、图片、档案、资讯、资料、网站架构、网站画面的安排、网页设计，均由中威网或其他权利人依法拥有其知识产权，包括商标权、专利权、著作权、商业秘密与专有技术等。任何人不得迳自使用、修改、复制、公开播送、改作、散布、发行、公开发表、进行还原工程、解编或反向组译。若您欲引用或转载前述软体、程式或网站内容，必须依法取得中威网或其他权利人的事前书面同意。尊重知识产权是您应尽的义务，如有违反，您应对中威网负损害赔偿责任（包括诉讼费用及律师费用等）。</p>
				<p><strong>七、隐私权政策</strong></p>
				<p>您在中威网进行注册、浏览、下单购物、评价、参加活动及发表论坛文章等行为时，涉及您真实姓名/名称、通信地址、联系电话、电子邮箱、订单详情、评价或反馈、投诉内容等信息的，本站有权从完成交易、提供配送、售后及客户服务、开展活动、完成良好的客户体验等多种角度予以收集，并将对其中涉及个人隐私信息予以严格保密，除非得到您的授权、或为履行强行性法律义务（如国家机关指令）、或按照您的需求为您提高更良好的合作、本注册协议或其他条款另有约定外，本站不会向外界披露您的隐私信息。</p>
				<p>本站会通过用户注册的邮箱为用户发送中威网相关产品及活动信息，如不想继续订阅接收，可通过邮件页面的退订按钮实现退订。</p>
				<p>如您需更改您在本站注册的手机、邮箱等个人隐私信息，可在用户中心自行修改或通过以下方式联系我们进行修改：</p>
				<p>中威网客服电话：400-830-5299</p>
				<p>中威网客服邮箱：service@cwhisky.com</p>
				<p><strong>八、法律适用、管辖与其它</strong></p>
				<p>1.本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，如无相关法律规定的，则应参照通用商业惯例和行业惯例。</p>
				<p>2.因本协议产生之争议，应依照中华人民共和国法律予以处理，如协商解决不成，任何一方可向惠州仲裁委员会申请仲裁。</p>
			</div>
			<h5 style="margin-top:10px;">提示：本《中威网网用户注册协议》中约定有关争议管辖应提交中威网注册地人民法院。</h5>
		</el-dialog>
	</div>
</div>
</template>
<script>
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
						validator: checkLogin,
						trigger: 'blur'
					},
					{
						min: 3,
						max: 12,
						message: '长度在 3 到 12 个字符',
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
	mounted() {},
	components: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('css/common.less');
</style>
