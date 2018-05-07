<template>
<div class="personalInfo">
	<perHeader ref="perHeader"></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>个人中心</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftMenu :navNum='7'></leftMenu>
			</el-col>
			<el-col :span="20">
				<!--个人资料信息表单-->
				<div class="personal-container">
					<el-form ref="customerInfo" :model="customerInfo" label-width="100px" label-position="left">
						<el-row class="personal-info box">
							<el-col :span="3">
								<el-upload :action="uploadUrl" :show-file-list="false" :headers="imgHeaders" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
									<div class="avatar" :style="{backgroundImage: 'url(' + customerInfo.imgUrl + ')' }" v-if="customerInfo.imgUrl">
									</div>
									<div class="avatar" :style="{backgroundImage: 'url(/static/img/head-icon.png)' }" v-else>
									</div>
								</el-upload>
							</el-col>
							<el-col :span="21">
								<div class="box user-name-box">
									<span class="text-color-help">用户名：</span><b>{{customerInfo.customerName || '--'}}</b>
									<span class="text-color-help">会员级别：</span><b>{{customerInfo.rankName || '--'}}</b>
									<span class="text-color-help">会员类型：</span><b>{{customerInfo.roleName || '--'}}</b>
								</div>
								<el-form-item label="性别：" class="user-sex-box">
									<el-radio-group v-model="customerInfo.sex" fill="#360a2b">
										<el-radio :label="1">男</el-radio>
										<el-radio :label="0">女</el-radio>
										<el-radio :label="2">保密</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="生日：" class="user-birth-box">
									<el-date-picker v-model="customerInfo.customerBirthday" type="date" placeholder="请选择您的生日" :value="customerInfo.customerBirthday" align="center">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-form-item label="兴趣爱好：" class="personal-info">
							<div class="text-color-help">请选择您感兴趣的品牌，我们将给您最精准的推荐</div>
							<a href="javascript:void(0);" class="hobby-item" v-for="(item,index) in brandList" :key="item.id" @click="choseBrand(index,item)" :class="{active: item.chose==1}">
								{{item.name}}
								<span class="triangle"></span>
							</a>
						</el-form-item>

						<br><br><br>
						<div class="box box-center">
							<div class="save-btn text-center button" @click="savePersonlInfo">保存修改信息</div>
						</div>
					</el-form>
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
import leftMenu from './leftBar.vue'
export default {
	name: 'personalInfo',
	data() {
		return {
			customerInfo: {},
			customerNameEdit: true,
			customerBirthday: "",
			imageUrl: '',
			uploadUrl: this.config.commonApi + "common/core/uploadObject2OSS", //上传地址
			imgHeaders: {
				'Accept': "application/json, text/plain, */*",
				'Authentication': this.util.getCookie('token') //上传地址添加头部token
			},
			brandList: [],
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
			that.$ajax({ //请求个人基础信息
					method: "get",
					url: that.config.mallApi + "center/profile/detail",
					headers: {
						'Content-type': 'application/json;charset=UTF-8',
						'Authentication': that.util.getCookie('token')
					},
					data: {},
				}).then(function(res) {
					if (res.data.code == "0000") {
						let data = res.data.data;
						data.sex = data.sex == null ? 2 : data.sex;
						// if (data.customerBirthday) {
						// 	data.customerBirthday = that.util.forDate(data.customerBirthday, 'yyyy-MM-dd');
						// }
						that.customerInfo = data;
						let interests = data.interests,
							num = data.interests.length;
						fetch(that.config.dataApi + "getBrand") //请求品牌
							.then(res => res.json())
							.then(data => {
								if (num > 0) {
									let extraArr = that.util.getRandom(data, 20 - num)
									for (var i in interests){
										for (var k in extraArr){
											if (extraArr[k].id == interests[i].id) {
												extraArr.splice(k,1)
											}
										}
									}
									that.brandList = interests.concat(extraArr);
									for (var i = 0;i<num;i++){
										that.brandList[i].chose=1;
									}
								} else {
									that.brandList = that.util.getRandom(data, 20);
								}
							})
							.catch(function(err) {
								console.log('oops! error:', err.message)
							})
					}
				})
				.catch(err => console.log(err));
		},
		//上传图片
		handleAvatarSuccess(res, file) {
			let that = this;
			if (res.code == "0000") {
				let data = {
					imgUrl: res.data
				}
				that.$ajax({
						method: "get",
						url: that.config.mallApi + "center/profile/imgedit?imgUrl=" + res.data,
						headers: {
							'Content-type': 'application/json;charset=UTF-8',
							'Authentication': that.util.getCookie('token')
						},
						data: data,
					}).then(function(res) {
						if (res.data.code == "0000") {
							that.$notify.success({
								message: '头像修改成功！'
							});
							that.customerInfo.imgUrl = data.imgUrl;
						} else {
							that.$notify.error({
								message: res.data.message
							});
						}
					})
					.catch(err => console.log(err));
			}
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 3;
			if (!isJPG) {
				this.$notify.error('上传的头像只支持JPG格式!');
				return false;
			}
			if (!isLt2M) {
				this.$notify.error('上传的头像大小不能超过3MB!');
				return false;
			}
			return isJPG && isLt2M;
		},
		choseBrand: function(index, item) {
			let value = this.brandList[index];
			value.chose = value.chose == 1 ? 0 : 1;
			this.$set(this.brandList, index, value);
			let arr = this.customerInfo.interests ? this.customerInfo.interests : [];
			if (value.chose == 0) {
				for (var i in arr) {
					if (arr[i].id == item.id) {
						arr.splice(i, 1);
						this.customerInfo.interests = arr;
					}
				}
			} else {
				let data = {
					name: item.name,
					id: item.id
				};
				arr.push(data);
				this.customerInfo.interests = arr;
			}
		},
		savePersonlInfo() { //保存修改个人信息
			let that = this;
			let info = this.customerInfo;
			let data = {
				"customerName": info.customerName,
				"sex": info.sex == null ? 2 : info.sex,
				"customerBirthday": Date.parse(info.customerBirthday),
				"interests": info.interests
			};
			if (data.customerName) {
				this.$ajax({
					method: "post",
					url: that.config.mallApi + "center/profile/edit",
					headers: {
						'Authentication': that.util.getCookie('token')
					},
					data: data,
				}).then(function(res) {
					if (res.data.code == "0000") {
						that.$notify.success({
							message: '保存成功！'
						});
						that.util.setCookie('customerName', data.customerName);
						that.$refs.perHeader.customerInfo.customerName = data.customerName;
						that.customerNameEdit = true;
						that.initData();
					} else {
						that.$notify.error({
							message: res.data.message
						});
					}
				}).catch(err => {
					console.log(err);
					that.$notify.error({
						message: res.data.message
					});
				})
			}
		},
		openEdit() {
			this.customerNameEdit = false;
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
