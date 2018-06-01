<template>
<div class="applyAfterSale">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name: 'saleService', query:{page:1, tabIndex: 6} }">售后服务</el-breadcrumb-item>
				<el-breadcrumb-item>申请售后</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="apply-content">
			<div class="apply-process box">
				<div class="apply-process-step box box-center" :class="{ active: step>0 }">
					<span class="step-num">1</span>申请退货退款
				</div>
				<div class="apply-process-step box box-center" :class="{ active: step>1 }">
					<span class="step-num">2</span>申请处理中
				</div>
				<div class="apply-process-step box box-center" :class="{ active: step>2 }">
					<span class="step-num">3</span>买家退货
				</div>
				<div class="apply-process-step box box-center" :class="{ active: step>3 }">
					<span class="step-num">4</span>退货完毕
				</div>
			</div>

			<div class="step-box" v-if="step==1">
				<LoadError v-if="loadError"></LoadError>
				<el-form :model="saleForm" :rules="rules" ref="saleForm" label-width="120px" v-else>
					<el-form-item label="服务类型：" prop="serviceType">
						<div class="label-box box">
							<div class="label-btn button" @click="saleForm.serviceType=1" :class="{active: saleForm.serviceType==1}">退货退款</div>
							<div class="label-btn button" @click="saleForm.serviceType=2" :class="{active: saleForm.serviceType==2}">仅退款</div>
						</div>
					</el-form-item>
					<el-form-item label="退款原因：" prop="reason">
						<el-select v-model="saleForm.reason" placeholder="请选择退款原因">
							<el-option label="不喜欢" value="不喜欢"></el-option>
							<el-option label="买错了" value="买错了"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="退款金额：" prop="price">
						<el-input v-model="saleForm.price" class="w140" readonly="true"></el-input>
					</el-form-item>
					<el-form-item label="退款数量：" prop="count">
						<el-input v-model="saleForm.count" @change="countChange" class="w140"></el-input>
					</el-form-item>
					<el-form-item label="退款说明：" prop="issureDesc">
						<el-input type="textarea" :rows="4" v-model="saleForm.explain"></el-input>
					</el-form-item>
					<el-form-item label="上传凭证：" prop="saleImg">
						<el-upload :limit="5" class="update-pic" list-type="picture-card" :action="uploadUrl" :before-upload="beforeAvatarUpload"
						:on-success="handleAvatarSuccess" :on-remove="removeImage" :on-exceed="toMaxTips">
							<img v-for="(item,index) in saleForm.images" :src="item.src">
							<i class="el-icon-plus goods-uploader-icon"></i>
							<small class="update-tips">最多可上传5张凭证</small>
						</el-upload>
						<small>请提供实物图片（包含条形码），以便您的退款或退货申请顺利通过审核。</small>
						<el-dialog>
							<img width="100%">
						</el-dialog>
					</el-form-item>
					<el-button type="primary" @click="submitForm" class="apply-btn button">提交申请</el-button>
				</el-form>
			</div>
			<div class="step-box two" v-if="step==2">
				<h5>您的申请已提交，正在处理中。</h5>
				<p>中威网将在三个工作日内处理您的申请，请耐心等待。</p>
				<el-button type="primary" class="apply-btn button" @click="step=3">撤销申请</el-button>
				<div class="apply-goods-box">
					<p>退款商品</p>
					<el-row class="text-center title">
						<el-col :span="11">商品</el-col>
						<el-col :span="4">售价(元)</el-col>
						<el-col :span="4">数量</el-col>
						<el-col :span="5">总计</el-col>
					</el-row>
					<div class="apply-goods">
						<el-row class="box box-center ">
							<el-col :span="11">
								<div class="box box-align-center">
									<div class="img-box box-center box">
										<img v-lazy="" class="goodsImg1">
									</div>
									<div>
										<h4>Ben Nevis 63 Years Old 1926 Single Malt Scotch Whisky</h4>
										<p class="titke-cn">班尼富63年 1926 单一麦芽苏格兰威士忌</p>
									</div>
								</div>
							</el-col>
							<el-col :span="4" class="text-center">14000</el-col>
							<el-col :span="4" class="text-center">20</el-col>
							<el-col :span="5" class="text-center">280000</el-col>
						</el-row>
					</div>
				</div>
			</div>
			<div class="step-box three" v-if="step==3">
				<h5>您的申请已提交，正在处理中。</h5>
				<p>您的售后申请已通过审核，请在7天内将货品退回并填写物流单号，逾期将自动关闭该售后申请。</p>
				<p class="address">退货地址：广东省惠州市惠城区江北文昌一路华贸金融街12号楼103 李小姐 400-830-5299</p>
				<el-form :model="returnForm" :rules="returnRules" ref="saleForm" label-width="120px">
					<el-form-item label="物流公司：" prop="name">
						<el-input v-model="returnForm.name"></el-input>
					</el-form-item>
					<el-form-item label="物流单号：" prop="number">
						<el-input v-model="returnForm.number"></el-input>
					</el-form-item>
					<el-form-item label="联系电话：" prop="tel">
						<el-input v-model="returnForm.tel"></el-input>
					</el-form-item>
					<el-form-item label="备注：" prop="remarks">
						<el-input type="textarea" :rows="4" v-model="returnForm.remarks"></el-input>
					</el-form-item>
					<el-button type="primary" @click="submitReturn" class="apply-btn button">确认提交</el-button>
				</el-form>
			</div>
			<div class="step-box" v-if="step==4">
				<div class="box">
					<icon name="tick-black" scale="8" class="icon"></icon>
					<div class="success-text">
						<h5>退款成功</h5>
						<small>款项已退至您中威钱包，请注意查收。</small>
					</div>
				</div>
			</div>
		</div>
	</div>
	<perFooter></perFooter>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
export default {
	name: 'applyAfterSale',
	data() {
		return {
			loadError: false,
			orderDetail: "",
			step: 1,
			uploadUrl: this.config.commonApi + "common/core/uploadObject2OSS", //上传地址
			saleForm: {
				serviceType: 1,
				reason: "",
				count: 1,
				price: '',
				issureDesc: '',
				images: [],
			},
			returnForm: {
				name: '',
				number: '',
				tel: '',
				remarks: '',
			},
			rules: {
				serviceType: [{
					required: true,
				}],
				reason: [{
					required: true,
					message: '请选择退款原因',
					trigger: 'blur'
				}],
				price: [{
					required: true,
				}],
				count: [{
					required: true,
					message: '数量不能为空',
					trigger: 'blur'
				}],
			},
			returnRules: {
				name: [{
					required: true,
				}],
				number: [{
					required: true,
				}],
				tel: [{
					required: true,
				}]

			}
		}
	},
	components: {
		perHeader,
		perFooter
	},
	watch: {

	},
	methods: {
		initData(){
			let params = {
				apiUrl: this.config.mallApi + "sales/applyPre/" + this.$route.query.id,
				apiMethod: "get",
			}
			this.ajaxData(params, (res) => {
				if (res.data.code == "0000") {
					this.orderDetail = res.data.data;
					this.saleForm.price = res.data.data.priceStr;
				} else {
					this.loadError = true;
				}
			})
		},
		submitForm(e){
			this.$refs['saleForm'].validate((valid) => {
				if (valid) {
					var params = this.saleForm;
					if(params.images.length<1){
						this.$notify.error('请上传凭证图片');
					}
					params.apiUrl.orderItemId = this.orderDetail.id;
    				params.apiUrl.orderId = this.orderDetail.id,
					params.apiUrl = this.config.mallApi + "sales/apply";
					this.ajaxData(params, (res) => {
						if (res.data.code == "0000") {

						} else {

						}
					})
				} else {
					return false;
				}
			});
		},
		submitReturn(e){
			this.step += 1;
		},
		countChange(e){
			let reg = /^[0-9]*[1-9][0-9]*$/;
			if (!reg.test(e)) {
				this.saleForm.count=Math.trunc(e);
			}
			this.saleForm.price = (this.saleForm.count*this.orderDetail.price).toFixed(2);
		},
		//上传成功回调
		handleAvatarSuccess(res, file) {
			if (res.code == "0000") {
				this.saleForm.images.push(res.data);
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
			let imgList = this.saleForm.images;
			for (let i = 0; i < imgList.length; i++) {
				if (imgList[i] == removeData) imgList.splice(i, 1);
			}
		},
		toMaxTips(e){
			this.$notify.error('最多可上传5张凭证!');
		}
	},
	mounted() {
		this.initData();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('css/order.less');
@import url('css/saleService.less');
</style>

<style lang="less">
.applyAfterSale {
    .el-form-item__content {
        .w140.el-input {
            width: 140px;
        }
		.el-upload-list__item-status-label{
			background: #000;
			box-shadow: none;
		}
    }
}
</style>
