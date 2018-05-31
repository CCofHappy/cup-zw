<template>
<div class="handAdd">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>新增商品</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftBar :navNum="tabIndex"></leftBar>
			</el-col>
			<el-col :span="20">
				<div class="handAdd-container">
					<div class="handAdd-nav box box-between">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item>新增商品</el-breadcrumb-item>
							<el-breadcrumb-item>手动录入</el-breadcrumb-item>
						</el-breadcrumb>
						<div class="button" @click="$router.back(-1)">
							返回
						</div>
					</div>
					<div class="form-box">
						<el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="120px">
							<el-form-item prop="image" label="商品图片：" class="upload">
								<el-upload class="goods-uploader" list-type="picture" :action="uploadUrl" :show-file-list="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="removeImage">
									<img v-if="goodsForm.image" :src="goodsForm.image" class="goods-img">
									<i v-else class="el-icon-plus goods-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-row>
								<el-col :span="8">
									<el-form-item prop="fullName" label="商品全称：">
										<el-input v-model="goodsForm.fullName">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="enName" label="英文名：">
										<el-input v-model="goodsForm.enName">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="price" label="商品单价：">
										<el-input v-model="goodsForm.price" maxlength="10">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="brandId" label="品 牌：">
										<el-select v-model="goodsForm.brandId" filterable placeholder="请选择">
											<el-option v-for="item in brandsList" :key="item.id" :label="item.name" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="specificationValueId" label="净 含 量：">
										<el-select v-model="goodsForm.specificationValueId" placeholder="请选择" @change="changeVolumn">
											<el-option v-for="item in volumnList" :key="item.id" :label="item.name" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="alcoholStrength" label="酒 精 度：">
										<el-input v-model="goodsForm.alcoholStrength" maxlength="5">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="bucketType" label="木桶类型：">
										<el-input v-model="goodsForm.bucketType">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="productType" label="类 别：">
										<el-select v-model="goodsForm.productType" placeholder="请选择">
											<el-option v-for="item in productTypeList" :key="item.id" :label="item.name" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="bucketCode" label="木桶编号：">
										<el-input v-model="goodsForm.bucketCode">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="series" label="系 列：">
										<el-input v-model="goodsForm.series">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="bottler" label="装 瓶 厂：">
										<el-select v-model="goodsForm.bottler" placeholder="请选择">
											<el-option v-for="item in bottlerList" :key="item.id" :label="item.name" :value="item.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="bottlerNumber" label="装瓶数量：">
										<el-input v-model="goodsForm.bottlerNumber">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="distillTime" label="蒸馏时间：">
										<el-date-picker v-model="goodsForm.distillTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="bottlingTime" label="装瓶时间：">
										<el-date-picker v-model="goodsForm.bottlingTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="total" label="库存数量：">
										<el-input v-model="goodsForm.total" maxlength="10">
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item prop="tastRecord" label="品酒记录：">
								<el-input type="textarea" :rows="8" placeholder="" v-model="goodsForm.tastRecord">
								</el-input>
							</el-form-item>
							<el-form-item prop="memo" label="备 注：">
								<el-input type="textarea" :rows="5" placeholder="" v-model="goodsForm.memo">
								</el-input>
							</el-form-item>
							<div class="box box-center">
								<el-button type="primary" class="register-btn button" @click="submitGoods(0)">保存</el-button>
								<el-button type="primary" class="register-btn button" @click="submitGoods(1)">提交审核</el-button>
							</div>
						</el-form>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
	<perFooter></perFooter>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftBar from './leftBar'
export default {
	name: 'handAdd',
	data() {
		return {
			loadError: false,
			tabIndex: '1',
			goodsInfo: "",
			uploadUrl: this.config.commonApi + "common/core/uploadObject2OSS", //上传地址
			saveId: "",
			bottlerList: [],
			brandsList: [],
			volumnList: [],
			productTypeList: [],
			goodsForm: {
				image: '',
				fullName: '',
				enName: '',
				price: '',
				brandId: '',
				specificationValueId: '',
				specificationValue: '',
				alcoholStrength: '',
				bucketType: '',
				productType: '',
				bucketCode: '',
				series: '',
				bottler: '',
				bottlerNumber: '',
				distillTime: '',
				bottlingTime: '',
				total: '',
				tastRecord: '',
				memo: '',
			},
			rules: {
				image: [{
					required: true,
					message: '请上传商品图片',
					trigger: 'blur'
				}],
				fullName: [{
					required: true,
					message: '商品名不能为空',
					trigger: 'blur'
				}],
				enName: [{
					required: true,
					message: '英文名不能为空',
					trigger: 'blur'
				}],
				price: [{
					required: true,
					message: '单价不能为空',
					trigger: 'blur'
				}],
				brandId: [{
					required: true,
					message: '请选择商品品牌',
					trigger: 'blur'
				}],
				specificationValueId: [{
					required: true,
					message: '净含量不能为空',
					trigger: 'blur'
				}],
				alcoholStrength: [{
					required: true,
					message: '酒精度不能为空',
					trigger: 'blur'
				}],
				bucketType: [{
					required: true,
					message: '商品名不能为空',
					trigger: 'blur'
				}],
				productType: [{
					required: true,
					message: '请选择商品类别',
					trigger: 'blur'
				}],
				bucketCode: [{
					required: true,
					message: '木桶编号不能为空',
					trigger: 'blur'
				}],
				series: [{
					required: true,
					message: '商品系列不能为空',
					trigger: 'blur'
				}],
				bottler: [{
					required: true,
					message: '请选择装瓶厂',
					trigger: 'blur'
				}],
				bottlerNumber: [{
					required: true,
					message: '装瓶数量不能为空',
					trigger: 'blur'
				}],
				distillTime: [{
					required: true,
					message: '请选择蒸馏时间',
					trigger: 'blur'
				}],
				bottlingTime: [{
					required: true,
					message: '请选择装瓶时间',
					trigger: 'blur'
				}],
				total: [{
					required: true,
					message: '库存数量不能为空',
					trigger: 'blur'
				}],
				tastRecord: [{
					required: true,
					message: '品酒记录不能为空',
					trigger: 'blur'
				}],
			}
		}
	},
	components: {
		perHeader,
		leftBar,
		perFooter
	},
	watch: {
		'$route' (to, from) {
			this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : 1;
			this.saveId = this.$route.query.id || '';
		},
	},
	methods: {
		initData() {
			let params = {
				apiUrl: this.config.mallApi + "supplier/goods/save/pre",
				apiMethod: 'get',
			}
			this.ajaxData(params, (res) => {
				if (res.data.code == "0000") {
					this.bottlerList = res.data.data.bottler;
					this.brandsList = res.data.data.brands;
					this.volumnList = res.data.data.volumn;
					this.productTypeList = res.data.data.productType;
				}
			})
			if (this.saveId) {
				let params = {
					apiUrl: this.config.mallApi + "supplier/goods/detail/" + this.saveId,
					apiMethod: 'get',
				}
				this.ajaxData(params, (res) => {
					if (res.data.code == "0000") {
						for (let i in this.goodsForm) {
							for (let k in res.data.data) {
								if (i == k) {
									this.goodsForm[i] = res.data.data[k]
								}
							}
						}
					}
				})
			}
		},
		//上传成功回调
		handleAvatarSuccess(res, file) {
			if (res.code == "0000") {
				this.goodsForm.image = res.data;
			}
		},
		//上传图片
		beforeAvatarUpload(file) {
			const isLt3M = file.size / 1024 / 1024 < 3;
			if (!isLt3M) {
				this.$notify.error('上传的图片大小不能超过3MB!');
				return false;
			}
			return isLt3M;
		},
		//删除上传图片
		removeImage(file, fileList) {
			let removeData = file.response.data;
			let imgList = this.goodsForm.image;
			for (let i = 0; i < imgList.length; i++) {
				if (imgList[i] == removeData) imgList.splice(i, 1);
			}
		},
		changeVolumn: function(e) {
			for (var i = 0; i < this.volumnList.length; i++) {
				if (this.volumnList[i].id == e) this.goodsForm.specificationValue = this.volumnList[i].name;
			}
		},
		submitGoods(e) {
			this.$refs['goodsForm'].validate((valid) => {
				if (valid) {
					var params = this.goodsForm;
					params.apiUrl = this.config.mallApi + "supplier/goods/save";
					params.type = e;
					params.details = {
						total: params.total,
						price: params.price,
						specificationId: 31,
						specificationName: "净含量",
						specificationValueId: params.specificationValueId,
						specificationValue: params.specificationValue
					}
					this.ajaxData(params, (res) => {
						if (res.data.code == "0000") {
							let message = "保存成功，已保存的数据，可在我的商品中查看。";
							e == 1 ? message = "提交审核成功，中威网将在2个工作日内审核完毕。" : '';
							this.$confirm(message,{
								confirmButtonText: '确定',
								showCancelButton: false,
								center: true
							}).then(() => {
							}).catch(() => {});
						} else {
							this.$message.error(res.data.message);
						}
					})
				} else {
					return false;
				}
			});
		},
	},
	mounted() {
		this.tabIndex = this.$route.query.tabIndex || 1;
		this.saveId = this.$route.query.id || '';
		this.initData()
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('css/order.less');
@import url('css/purchase.less');
</style>

<style lang="less">
//调整elementUI样式
.handAdd {
    .handAdd-container {
        .upload .el-form-item__label {
            line-height: 140px;
            height: 140px;
        }
        .el-date-editor.el-input {
            width: auto;
        }
		.el-textarea__inner{
			border-color: #eaeaea;
		}
    }
}
</style>
