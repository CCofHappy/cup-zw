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
						<el-form :model="goodsForm" :rules="rules" ref="goodsForm"  label-width="120px">
							<el-form-item prop="customerName" label="商品图片：" class="upload">
								<el-upload :action="uploadUrl" :show-file-list="false">
									<div class="goodsImg" :style="{backgroundImage: 'url(' + goodsInfo.imgUrl + ')' }" v-if="goodsInfo.imgUrl">
									</div>
									<div class="goodsImg nothing" v-else>
									</div>
								</el-upload>
							</el-form-item>
							<el-row>
								<el-col :span="16">
									<el-form-item prop="fullName" label="商品全称：">
										<el-input v-model="goodsForm.fullName">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="price" label="商品单价：">
										<el-input v-model="goodsForm.price">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="brandId" label="品 牌：">
										<el-input v-model="goodsForm.brandId">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="specificationValue" label="净 含 量：">
										<el-input v-model="goodsForm.specificationValue">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="alcoholStrength" label="酒 精 度：">
										<el-input v-model="goodsForm.alcoholStrength">
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
										<el-input v-model="goodsForm.productType">
										</el-input>
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
										<el-input v-model="goodsForm.bottler">
										</el-input>
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
										<el-input v-model="goodsForm.customerName">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="bottlingTime" label="装瓶时间：">
										<el-input v-model="goodsForm.customerName">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item prop="total" label="库存数量：">
										<el-input v-model="goodsForm.total">
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item prop="pinjiu" label="品酒记录：">
								<el-input type="textarea" :rows="8" placeholder="">
								</el-input>
							</el-form-item>
							<el-form-item prop="beizhu" label="备 注：">
								<el-input type="textarea" :rows="5" placeholder="">
								</el-input>
							</el-form-item>

							<div class="box box-center">
								<el-button type="primary" class="register-btn button">保存</el-button>
								<el-button type="primary" class="register-btn button">提交审核</el-button>
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
			goodsForm:{
				customerName:'',
			},
			rules:{
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
				],
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
		},
	},
	methods: {

	},
	mounted() {
		this.tabIndex = this.$route.query.tabIndex || 1;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('css/order.less');
@import url('css/purchase.less');
</style>

<style lang="less">//调整elementUI样式
.handAdd{
	.handAdd-container{
		.el-form-item.upload {
			.el-form-item__label{
				line-height: 142px;
				height: 142px;
			}
		}
	}
}
</style>
