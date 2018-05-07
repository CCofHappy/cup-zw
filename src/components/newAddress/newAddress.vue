<template>
<div class="newAddress">
	<el-dialog title="添加收货地址" :visible.sync="dialogFormVisible" top="5%" width="650px" @close="resetForm('form')">
		<el-form :model="form" status-icon ref="form" :rules="rules">
			<el-form-item label="收货人：" prop="consignee" :label-width="formLabelWidth" :rules="[
	            { required: true, message: '请输入收货人', trigger: 'blur' },
	            { min: 0, max: 15, message: '不能超过 15 个字符', trigger: 'blur' }
          	]">
				<el-input v-model="form.consignee" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="所在区域：" :label-width="formLabelWidth" class="address-box" :rules="[{ required: true }]">
				<el-row style="width:">
					<el-col :span="7">
						<el-form-item prop="pCode" :rules="[{ required: true, message: '请选择省份' }]">
							<el-select v-model="form.pCode" :value-key="form.pCode" placeholder="省份" @change="provinceChange" ref="province">
								<el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item prop="cCode" :rules="[{ required: true, message: '请选择城市' }]">
							<el-select v-model="form.cCode" :value-key="form.cCode" placeholder="城市" @change="cityChange" ref="city">
								<el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item prop="dCode" :rules="[{ required: true, message: '请选择区域' }]">
							<el-select v-model="form.dCode" :value-key="form.dCode" placeholder="区域" ref="district">
								<el-option v-for="item in districtList" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="详细地址：" prop="addr" :label-width="formLabelWidth" :rules="[
	            { required: true, message: '请输入详细地址', trigger: 'blur' },
	            { min: 0, max: 50, message: '详细地址不能超过50个字', trigger: 'blur' }
          	]">
				<el-input v-model="form.addr" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="手机号码：" prop="phone" :label-width="formLabelWidth">
				<el-input v-model="form.phone" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="备用电话：" prop="consigneeMobile" :label-width="formLabelWidth">
				<el-input v-model="form.consigneeMobile" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="邮箱地址：" prop="email" :label-width="formLabelWidth">
				<el-input v-model="form.email" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="resetForm('form')" size="small">重 置</el-button>
			<el-button type="primary" @click="submitForm('form')" size="small">保存收货地址</el-button>
		</div>
	</el-dialog>
</div>
</template>

<script>
import {areaList} from '@/components/util/area' //引入公共方法
export default {
	name: 'newAddress',
	data() {
		var checkMobile = (rule, value, callback) => {
			if(value){
				if (!this.util.checkTel(value)) return callback();
				return callback(new Error('手机号码不正确'));
			}else {
				return callback();
			}
		}, checkPhone = (rule, value, callback) => {
			if(value){
				if (!this.util.checkTel(value) || !this.util.checkPhone(value)) return callback();
				return callback(new Error('备用电话不正确'));
			}else {
				return callback();
			}
		}, checkEmail = (rule, value, callback) => {
			if(value){
				if (this.util.checkEmail(value)) return callback(new Error('邮箱地址不正确'));
				return callback();
			}else {
				return callback();
			}
		};
		return {
			dialogFormVisible: false,
			provinceList: '',
			cityList: '',
			districtList: '',
			editSeq:'',
			edit: false,
			form: {
				consignee: '',
				pCode: '',
				cCode: '',
				dCode: '',
				addr: '',
				consigneeMobile: '',
				phone: '',
				email: '',
			},
			formLabelWidth: '100px',
			rules:{
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
				consigneeMobile:[{
						validator: checkPhone,
						trigger: 'blur'
					}

				],
				email:[
					{
						min: 0, max: 30,
						message: '邮箱地址不能超过30个字', trigger: 'blur'
			 		},
					{
						validator: checkEmail,
						trigger: 'blur'
					}

				],
			}
		}
	},
	watch: {　　
		dialogFormVisible(curVal, oldVal) {
			if (curVal) {
				let provinceArr = [],
					cityArr = [],
					districArr = [];
				for (var i in areaList[0].kid.areaname) {
					provinceArr[i] = {
						value: areaList[0].kid.areacode[i],
						label: areaList[0].kid.areaname[i],
					}
				}

				for (var k in areaList) {
					if (areaList[k].areacode == this.form.pCode) {
						for (var l in areaList[k].kid.areacode) {
							cityArr[l] = {
								value: areaList[k].kid.areacode[l],
								label: areaList[k].kid.areaname[l],
							}
						}
					}
				}

				for (var k in areaList) {
					if (areaList[k].areacode == this.form.cCode) {
						for (var l in areaList[k].kid.areacode) {
							districArr[l] = {
								value: areaList[k].kid.areacode[l],
								label: areaList[k].kid.areaname[l],
							}
						}
					}
				}

				this.provinceList = provinceArr;
				this.cityList = cityArr;
				this.districtList = districArr;
			}　　
		},
	},
	components: {},
	methods: {
		//提交
		submitForm: function(formName) {
			let that = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let data = that.form;
					data.province=this.$refs.province.selectedLabel+this.$refs.city.selectedLabel+this.$refs.district.selectedLabel;
					let url = "center/address/add"
					if (that.edit) {
						url = "center/address/edit";
						data.deliveryAddrSeq= that.editSeq;
					}
					that.$ajax({
						method: "post",
						url: that.config.mallApi + url,
						headers: {
							"Authentication": that.util.getCookie("token"),
						},
						data: data,
					}).then(function(res) {
						if (res.data.code == "0000") {
							that.$notify({
								type: 'success',
								message: '操作成功'
							});
							that.$emit("refresh");
							that.$refs['form'].resetFields();
							that.dialogFormVisible = false; //验证通过、关闭窗口
						} else if(res.data.code == "1104"){
							that.$notify({
								type: 'error',
								message: '收货地址最多保存20条'
							});
						}else {
							that.$notify({
								type: 'error',
								message: '操作失败'
							});
						}
					}).catch(function(err) {
						that.$notify({
							type: 'error',
							message: '操作失败'
						});
						console.log(err);
					})
				} else {
					return false;
				}
			});
		},
		//重置表单
		resetForm: function(formName) {
			this.$refs[formName].resetFields();
			this.cityList = '';
			this.districtList = '';
			this.form = {
				consignee: '',
				pCode: '',
				cCode: '',
				dCode: '',
				addr: '',
				consigneeMobile: '',
				phone: '',
				email: '',
			};
		},
		//注入地区信息
		provinceChange(e) {
			let arr = [];
			this.form.cCode = "";
			this.form.dCode = "";
			this.form.city = "";
			this.form.district = "";
			this.cityList = "";
			this.districtList = "";
			for (var k in areaList) {
				if (areaList[k].areacode == e) {
					for (var l in areaList[k].kid.areacode) {
						arr[l] = {
							value: areaList[k].kid.areacode[l],
							label: areaList[k].kid.areaname[l],
						}
					}
				}
			}
			this.cityList = arr;
			this.$refs['form'].validateField('cCode');
			this.$refs['form'].validateField('dCode');
		},
		cityChange(e) {
			let arr = [];
			this.form.dCode = "";
			this.form.district = "";
			this.districtList = "";
			for (var k in areaList) {
				if (areaList[k].areacode == e) {
					for (var l in areaList[k].kid.areacode) {
						arr[l] = {
							value: areaList[k].kid.areacode[l],
							label: areaList[k].kid.areaname[l],
						}
					}
				}
			}
			this.districtList = arr;
			this.$refs['form'].validateField('dCode');
		},
	},
	mounted() {},
}
</script>

<style lang="less" scoped>
.el-dialog__title{

}
</style>
