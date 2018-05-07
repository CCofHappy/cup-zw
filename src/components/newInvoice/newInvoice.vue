<template>
<div class="newInvoice">
	<!--发票信息 弹出框-->
	<el-dialog title="发票信息" :visible.sync="dialogFormVisible" size="tiny" top="5%" width="600px">
		<el-radio-group v-model="invoiceType" @change="typeChange">
			<el-radio label="2" border>普通发票</el-radio>
			<el-radio label="1" border>电子发票</el-radio>
			<el-radio label="3" border>增值税发票</el-radio>
		</el-radio-group>
		<el-form :model="normalForm" ref="normalForm" label-position="right" class="invoice-form" v-if="invoiceType == 2" :label-width="formLabelWidth" :show-message="true" :inline-message="true">
			<div class="invoice-notice">
				<i class="el-icon-warning"></i> 发票内容由中威网决定，发票由中威网开具并寄出。
			</div>
			<div class="invoice-name">
				<el-form-item v-for="(item, index) in normalForm.invoiceName" label="" :key="item.key" v-if="index>0">
					<el-input v-model="item.value" class="invoice-name-item" :autofocus="autofocus == index" @focus="choseThis(index)" :class="{active:index == autofocus}" placeholder="新增单位发票抬头"></el-input>
					<el-button v-if="autofocus==index" @click.prevent="saveInvoice(index)">保存</el-button>
					<el-button @click.prevent="delInvoice(index)">删除</el-button>
				</el-form-item>
				<el-form-item label="发票抬头：" v-else>
					<el-input v-model="item.value" class="invoice-name-item" readonly @focus="choseThis(index)" :class="{active:index == autofocus}"></el-input>
				</el-form-item>
				<div class="invoice-add-btn">
					<a href="javascript:void(0);" @click="addInvoice()" v-if="normalForm.invoiceName.length==normalInvoice.length+1">新增单位发票</a>
				</div>
				<el-form-item label="纳税人识别号：" v-if="autofocus!=0" :rules="[{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }]">
					<el-input v-model="normalForm.identificationNumber" class="invoice-name-item"></el-input>
				</el-form-item>
			</div>
		</el-form>
		<el-form :model="eleForm" ref="eleForm" label-position="right" class="invoice-form" v-if="invoiceType == 1" :label-width="formLabelWidth" :show-message="true" :inline-message="true" :rules="eleRules">
			<div class="invoice-notice">
				<i class="el-icon-warning"></i> 电子发票是税局认可的有效凭证，其法律效力、基本用途及使用规定同纸质发票， 如需纸质票可自行下载打印。如您本次购买的商品暂未实现电子发票开具，我们将自动更换为普通发票（纸质）同商品一并送达，请您注意查收。
			</div>
			<div class="invoice-name">
				<el-form-item label="发票抬头：">
					<el-input v-model="eleForm.invoiceName" class="invoice-name-item" readonly @focus="choseThis(0)" :class="{active: autofocus==0}"></el-input>
				</el-form-item>
				<el-form-item prop="invoiceHeadContent">
					<el-input v-model="eleForm.invoiceHeadContent" class="invoice-name-item" @focus="choseThis(1)" :class="{active: autofocus==1}" placeholder="新增单位发票抬头"></el-input>
				</el-form-item>

				<el-form-item label="纳税人识别号：" v-if="autofocus!=0" :rules="[{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }]">
					<el-input v-model="eleForm.identificationNumber" class="invoice-name-item"></el-input>
				</el-form-item>
				<div v-if="invoiceType == 1">
					<el-form-item label="手机号码：" prop="phone">
						<el-input v-model="eleForm.phone" class="invoice-name-item"></el-input>
					</el-form-item>
					<el-form-item label="接收邮箱：" prop="email">
						<el-input v-model="eleForm.email" class="invoice-name-item"></el-input>
					</el-form-item>
				</div>
			</div>
		</el-form>
		<el-form :model="addedForm" status-icon ref="addedForm" label-position="right" class="invoice-form" v-if="invoiceType==3" :label-width="formLabelWidth" :show-message="true" :inline-message="true" :rules="addedRules">
			<div class="invoice-notice">
				<i class="el-icon-warning"></i> 我司依法开具发票，如您购买的商品按税法规定属于不得从增值税销项税额中抵扣的项目（例如集体福利或个人消费等），请您选择普通发票。
			</div>
			<div>
				<el-tabs v-model="step">
					<el-tab-pane label="1、公司信息" name="first">
						<el-form-item label="开票方式：" class="invoice-name" :inline-message="true">
							<el-input v-model="addedForm.invoiceMethod" class="invoice-name-item" readonly placeholder="订单完成后开发票"></el-input>
						</el-form-item>
						<el-form-item label="单位名称：" prop="invoiceHeadContent" :rules="[{ required: true, message: '请输入单位名', trigger: 'blur' }]">
							<el-input v-model="addedForm.invoiceHeadContent" class="invoice-name-item"></el-input>
						</el-form-item>
						<el-form-item label="纳税人识别号：" prop="identificationNumber">
							<el-input v-model="addedForm.identificationNumber" class="invoice-name-item"></el-input>
						</el-form-item>
						<el-form-item label="开户银行：" prop="bankName" :rules="[{ required: true, message: '请输入开户银行', trigger: 'blur' }]">
							<el-input v-model="addedForm.bankName" class="invoice-name-item"></el-input>
						</el-form-item>
						<el-form-item label="银行账号：" prop="bankAccount">
							<el-input v-model="addedForm.bankAccount" class="invoice-name-item"></el-input>
						</el-form-item>
						<el-form-item label="注册地址：" prop="registAddress" :rules="[{ required: true, message: '请输入注册地址', trigger: 'blur' }]">
							<el-input v-model="addedForm.registAddress" class="invoice-name-item"></el-input>
						</el-form-item>
						<el-form-item label="注册电话：" prop="registPhone">
							<el-input v-model="addedForm.registPhone" class="invoice-name-item"></el-input>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="2、收票人信息" name="second">
						<el-form-item label="收票人姓名：" class="invoice-name" prop="customerName" :label-width="formLabelWidth" :rules="[{ required: true, message: '请输入收票人姓名：', trigger: 'blur' }]">
							<el-input v-model="addedForm.customerName" class="invoice-name-item"></el-input>
						</el-form-item>
						<el-form-item label="收票人手机：" prop="customerPhone">
							<el-input v-model="addedForm.customerPhone" class="invoice-name-item"></el-input>
						</el-form-item>
						<el-form-item label="收票人地址：" prop="customerAddress" :rules="[{ required: true, message: '请输入收票人地址', trigger: 'blur' }]">
							<el-input v-model="addedForm.customerAddress" class="invoice-name-item"></el-input>
						</el-form-item>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="nextForm()" v-if="step=='first' && invoiceType == '3'">下一页</el-button>
			<el-button type="primary" @click="submitForm()" v-else>保存发票</el-button>
		</div>
	</el-dialog>
</div>
</template>

<script>
export default {
	name: 'newInvoice',
	data() {
		var checkMobile = (rule, value, callback) => {
				if (!this.util.checkTel(value) || !this.util.checkPhone(value)) return callback();
				return callback(new Error('注册电话不正确'));
			},
			checkEmail = (rule, value, callback) => {
				if (this.util.checkEmail(value)) return callback(new Error('邮箱地址不正确'));
				return callback();
			},
			checkNum = (rule, value, callback) => {
				if (!/^\d+$/.test(value)) return callback(new Error('只能输入数字'));
				return callback();
			};
		return {
			dialogFormVisible: false,
			openFirst: false,
			formLabelWidth: '120px',
			autofocus: 0,
			normalInvoice: "",
			eleInvoice: "",
			inputIndex: 0,
			invoiceType: "2",
			defaultInvoice: {},
			norPerInvoice: "",
			normalForm: {
				invoiceName: [{
					value: '个人'
				}, ],
				identificationNumber: '',
			},
			eleForm: {
				invoiceName: '个人',
				email: '',
				phone: '',
				invoiceHeadContent: '',
				identificationNumber: '',
			},
			addedForm: {
				invoiceMethod: '',
				invoiceHeadContent: '',
				identificationNumber: '',
				bankName: '',
				bankAccount: '',
				registPhone: '',
				registAddress: '',
				customerName: '',
				customerPhone: '',
				customerAddress: '',
			},
			//增值税发票 步骤
			step: 'first',
			eleRules: {
				phone: [{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					},
					{
						validator: checkMobile,
						trigger: 'blur'
					}
				],
				email: [{
						required: true,
						message: '请输入邮箱地址',
						trigger: 'blur'
					},
					{
						min: 0,
						max: 30,
						message: '邮箱地址不能超过30个字',
						trigger: 'blur'
					},
					{
						validator: checkEmail,
						trigger: 'blur'
					}
				],
				identificationNumber: [{
						required: true,
						message: '请输入纳税人识别号',
						trigger: 'blur'
					},
					{
						validator: checkNum,
						trigger: 'blur'
					}
				],
			},
			addedRules: {
				registPhone: [{
						required: true,
						message: '请输入注册电话',
						trigger: 'blur'
					},
					{
						validator: checkMobile,
						trigger: 'blur'
					}
				],
				customerPhone: [{
						required: true,
						message: '请输入收票人手机',
						trigger: 'blur'
					},
					{
						validator: checkMobile,
						trigger: 'blur'
					}
				],
				identificationNumber: [{
						required: true,
						message: '请输入纳税人识别号',
						trigger: 'blur'
					},
					{
						validator: checkNum,
						trigger: 'blur'
					}
				],
				bankAccount: [{
						required: true,
						message: '请输入银行账号',
						trigger: 'blur'
					},
					{
						validator: checkNum,
						trigger: 'blur'
					}
				]
			},
		}
	},
	watch: {　　
		dialogFormVisible(curVal, oldVal) {
			if (curVal) {
				let that = this;
				let type = that.defaultInvoice.type ? that.defaultInvoice.type : 2;
				that.initData(type);
			}
		},
	},
	components: {},
	methods: {
		typeChange(e) {
			this.initData(e)
			this.autofocus = 0;
			this.inputIndex = 0;
		},
		initData: function(type) {
			let that = this;
			let params = {
				apiUrl: that.config.mallApi + "order/invoice/list/" + type,
				apiMethod: "get",
			}
			that.ajaxData(params, function(res) {
				if (res.data.code == "0000") {
					let data = res.data.data;
					if (type == 2) {
						that.normalInvoice = [];
						that.normalForm.invoiceName = [{
							value: '个人'
						}, ];
						for (var i in data) {
							if (data[i].invoiceHeadType == 1) {
								that.normalForm.invoiceName.push({
									value: data[i].invoiceHeadContent
								})
								that.normalInvoice.push(data[i]);
							} else {
								that.norPerInvoice = data[i];
							}
						}
					} else if (type == 1) {
						that.eleInvoice = data;
						for (var i in data) {
							if (data[i].invoiceHeadType == 2) {
								that.eleForm.email = data[i].email;
								that.eleForm.phone = data[i].phone;
							} else {
								that.eleForm.invoiceHeadContent = data[i].invoiceHeadContent;
							}
						}
					} else if (type == 3) {
						if (data.length > 0) {
							that.addedForm = {
								invoiceMethod: '订单完成后开发票',
								invoiceHeadContent: data[0].invoiceHeadContent,
								identificationNumber: parseInt(data[0].identificationNumber),
								bankName: data[0].detail.bankName,
								bankAccount: parseInt(data[0].detail.bankAccount),
								registPhone: data[0].detail.registPhone,
								registAddress: data[0].detail.registAddress,
								customerName: data[0].detail.customerName,
								customerPhone: data[0].detail.customerPhone,
								customerAddress: data[0].detail.customerAddress,
								invoiceSeq: data[0].invoiceSeq,
								invoiceHeadType: 1,
							};
						}
					}
					if (JSON.stringify(that.defaultInvoice) != "{}" && that.openFirst) {
						that.invoiceType = that.defaultInvoice.type + "";
						that.autofocus = 0;
						if (that.defaultInvoice.type == 2) {
							for (var i = 0; i < that.normalInvoice.length; i++) {
								if (that.normalInvoice[i].invoiceSeq == that.defaultInvoice.invoiceSeq) {
									that.autofocus = i + 1;
									that.inputIndex = i + 1;
									that.normalForm.identificationNumber = that.normalInvoice[i].identificationNumber;
								}
							}
						} else if (that.defaultInvoice.type == 1) {
							for (var i = 0; i < that.eleInvoice.length; i++) {
								if (that.eleInvoice[i].invoiceSeq == that.defaultInvoice.invoiceSeq) {
									that.autofocus = that.eleInvoice[i].invoiceHeadType == 2 ? 0 : 1;
									that.inputIndex = that.eleInvoice[i].invoiceHeadType == 2 ? 0 : 1;
									that.eleForm.email = that.eleInvoice[i].email;
									that.eleForm.phone = that.eleInvoice[i].phone;
									that.eleForm.identificationNumber = that.eleInvoice[i].identificationNumber;
								}
							}
						}
						that.openFirst = false;
					}
				}
			})
		},
		addInvoice() {
			this.normalForm.invoiceName.push({
				value: ''
			});
			this.autofocus = this.normalForm.invoiceName.length - 1;
			this.normalForm.identificationNumber = "";
		},
		delInvoice(index) {
			let that = this;
			if (that.normalInvoice[index - 1] && that.normalInvoice[index - 1].invoiceSeq) {
				let params = {
					apiUrl:that.config.mallApi + "order/invoice/delete/" + that.normalInvoice[index - 1].invoiceSeq,
				}
				that.ajaxData(params,function(res){
					if (res.data.code = "0000") {
						//this.form.invoiceName.splice(index, 1);
						//删除掉某一条发票记录之后，默认的发票为“个人”
						that.$notify.success({
							message: '删除成功'
						})
						that.initData(that.invoiceType);
						that.defaultInvoice.type = 2;
						that.defaultInvoice.name = '个人';
						that.$emit('defaultInvoice');
					} else {
						that.$notify.error({
							message: res.data.message
						})
					}
				})
			} else {
				let arr = that.normalForm.invoiceName;
				arr.splice(index, 1);
			}
			that.autofocus = 0;
		},
		choseThis(index) {
			this.autofocus = index;
			if (this.invoiceType == 2) {
				if (index > 0 && this.inputIndex != index) {
					this.inputIndex = index;
					if (this.normalInvoice.length >= index) {
						this.normalForm.identificationNumber = this.normalInvoice[index - 1].identificationNumber;
					} else {
						this.normalForm.identificationNumber = "";
					}
				}
			} else if (this.invoiceType == 1 && this.inputIndex != index) {
				this.inputIndex = index;
				this.eleForm.email = '';
				this.eleForm.phone = '';
				this.eleForm.identificationNumber = '';
				if (index != 0) {
					for (var i in this.eleInvoice) {
						if (this.eleInvoice[i].invoiceHeadType == 1) {
							this.eleForm.email = this.eleInvoice[i].email;
							this.eleForm.phone = this.eleInvoice[i].phone;
							this.eleForm.identificationNumber = this.eleInvoice[i].identificationNumber;
						}
					}
				} else {
					for (var i in this.eleInvoice) {
						if (this.eleInvoice[i].invoiceHeadType == 2) {
							this.eleForm.email = this.eleInvoice[i].email;
							this.eleForm.phone = this.eleInvoice[i].phone;
						}
					}
				}
			}
		},
		saveInvoice(index) {
			let that = this;
			if (!that.normalForm.invoiceName[index].value) {
				that.$notify.error({
					message: "单位名不能为空"
				})
				return;
			}
			if (!that.normalForm.identificationNumber) {
				that.$notify.error({
					message: "纳税人识别号不能为空"
				})
				return;
			}else if(!/^\d+$/.test(that.normalForm.identificationNumber)) {
				that.$notify.error({
					message: "纳税人识别号只能输入数字"
				})
				return;
			}
			let params = {
				identificationNumber: that.normalForm.identificationNumber,
				invoiceHeadContent: that.normalForm.invoiceName[index].value,
				invoiceHeadType: 1,
				invoiceType: that.invoiceType,
				invoiceSeq: that.normalInvoice[index - 1] ? that.normalInvoice[index - 1].invoiceSeq : '',
			}

			that.ajaxData(params, function (res) {
				if (res.data.code = "0000") {
					let data = res.data.data;
					if (data.length > 0) {
						for (var i in data) {
							let name = {
								value: data[i].name
							}
							that.invoiceName.push(name)
						}
					};
					that.$notify.success({
						message: "保存成功"
					})
					that.initData(that.invoiceType);
				} else {
					that.$notify.error({
						message: "保存失败"
					})
				}
			})
		},
		nextForm() {
			let lock = true;
			this.$refs['addedForm'].validateField('invoiceHeadContent', (valid) => {
				if (valid) lock = false;
			})
			this.$refs['addedForm'].validateField('identificationNumber', (valid) => {
				if (valid) lock = false;
			})
			this.$refs['addedForm'].validateField('bankName', (valid) => {
				if (valid) lock = false;
			})
			this.$refs['addedForm'].validateField('bankAccount', (valid) => {
				if (valid) lock = false;
			})
			this.$refs['addedForm'].validateField('registAddress', (valid) => {
				if (valid) lock = false;
			})
			this.$refs['addedForm'].validateField('registPhone', (valid) => {
				if (valid) lock = false;
			})
			if (lock) this.step = "second";
		},
		submitForm() {
			let that = this;
			if (that.invoiceType == 1) {
				let form = that.eleForm;
				if (!form.invoiceHeadContent && that.autofocus != 0) {
					that.$notify.error({
						message: "单位名不能为空"
					})
					return;
				} else if (!form.identificationNumber && that.autofocus != 0) {
					that.$notify.error({
						message: "纳税人识别号不能为空"
					})
					return;
				} else if(!/^\d+$/.test(form.identificationNumber) && that.autofocus != 0) {
					that.$notify.error({
						message: "纳税人识别号只能输入数字"
					})
					return;
				} else if (!form.phone) {
					that.$notify.error({
						message: "手机号不能为空"
					})
					return;
				} else if (!form.email) {
					that.$notify.error({
						message: "邮箱不能为空"
					})
					return;
				}
				this.$refs['eleForm'].validate((valid) => {
					if (valid) {
						that.defaultInvoice.type = 1;
						let data = {
							identificationNumber: form.identificationNumber,
							invoiceHeadType: that.autofocus == 0 ? 2 : 1,
							invoiceType: 1,
							phone: form.phone,
							email: form.email,
							apiUrl : that.config.mallApi + "order/invoice/electron/add"
						}
						if (that.autofocus == 0) {
							data.invoiceHeadContent = '个人';
							data.identificationNumber = '';
							for (var i in that.eleInvoice) {
								if (that.eleInvoice[i].invoiceHeadType == 2) {
									data.invoiceSeq = that.eleInvoice[i].invoiceSeq;
								}
							}
						} else {
							data.invoiceHeadContent = form.invoiceHeadContent;
							for (var i in that.eleInvoice) {
								if (that.eleInvoice[i].invoiceHeadType == 1) {
									data.invoiceSeq = that.eleInvoice[i].invoiceSeq;
								}
							}
						}
						that.defaultInvoice.name = data.invoiceHeadContent;
						that.ajaxData(data,function (res) {
							if (res.data.code == "0000") {
								that.defaultInvoice.invoiceSeq = data.invoiceSeq ? data.invoiceSeq : res.data.data;
								that.dialogFormVisible = false;
								that.$emit('defaultInvoice');
							} else {
								that.$notify.error({
									message: res.data.message
								})
							}
						})
					}
				})
			} else if (that.invoiceType == 2) {
				let form = that.normalForm;
				if (!form.invoiceName[that.autofocus].value) {
					that.$notify.error({
						message: "单位名不能为空"
					})
					return;
				} else if (!form.identificationNumber && that.autofocus != 0) {
					that.$notify.error({
						message: "纳税人识别号不能为空"
					})
					return;
				}else if(!/^\d+$/.test(form.identificationNumber)&& that.autofocus != 0) {
					that.$notify.error({
						message: "纳税人识别号只能输入数字"
					})
					return;
				}
				that.defaultInvoice.type = 2;
				let data = {
					identificationNumber: form.identificationNumber,
					invoiceHeadContent: that.autofocus == 0 ? '个人' : form.invoiceName[that.autofocus].value,
					invoiceHeadType: that.autofocus == 0 ? 2 : 1,
					invoiceType: that.invoiceType,
					apiUrl: that.config.mallApi + "order/invoice/general/add"
				}
				if (that.autofocus == 0) {
					that.defaultInvoice.name = '个人';
					data.identificationNumber = '';
					data.invoiceSeq = that.norPerInvoice.invoiceSeq;
				} else {
					that.defaultInvoice.name = form.invoiceHeadContent;
					data.invoiceSeq = that.normalInvoice[that.autofocus - 1] ? that.normalInvoice[that.autofocus - 1].invoiceSeq : '';
				}
				that.defaultInvoice.name = data.invoiceHeadContent;
				that.ajaxData(data, function (res) {
					if (res.data.code == "0000") {
						that.defaultInvoice.invoiceSeq = data.invoiceSeq ? data.invoiceSeq : res.data.data;
						that.dialogFormVisible = false;
						that.$emit('defaultInvoice');
					} else {
						that.$notify.error({
							message: "保存失败"
						})
					}
				})
			} else if (that.invoiceType == 3) {
				let form = that.addedForm;
				form.invoiceType = 3;
				form.invoiceHeadType = 1;
				that.defaultInvoice.type = 3;
				that.defaultInvoice.name = form.invoiceHeadContent;
				this.$refs['addedForm'].validate((valid) => {
					if (valid) {
						form.apiUrl = that.config.mallApi + "order/invoice/vat/add";
						that.ajaxData(form, function (res) {
							if (res.data.code == "0000") {
								that.defaultInvoice.invoiceSeq = form.invoiceSeq ? form.invoiceSeq : res.data.data;
								that.dialogFormVisible = false;
								that.$emit('defaultInvoice');
							} else {
								that.$notify.error({
									message: res.data.message
								})
							}
						})
					}
				})
			}
		}
	},
	mounted() {},
}
</script>

<style lang="less" scoped>
@import url('newInvoice.less');
</style>
