<template>
<div class="myAddressList">
	<perHeader></perHeader>

	<div class="container address-list">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>个人中心</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftMenu :navNum='9'></leftMenu>
			</el-col>
			<el-col :span="20">
				<!--消费记录列表-->
				<div class="nav-record-subtitle box box-between box-align-center">
					<p>你已创建 <b>{{addressData.total}}</b> 条收货地址，最多保存 <b>20</b> 条</p>
					<div class="addAddress button" @click="openNewAddress">+ 添加收货地址</div>
				</div>
				<LoadError v-if="loadError"></LoadError>
				<NoData :message="'没有相关收货地址'" v-else-if="addressData.records&&addressData.records.length==0"></NoData>
				<el-row v-else>
					<el-col :span="8" v-for="addr in addressData.records">
						<el-card class="box-card">
							<div class="item name"><b>{{addr.consignee}}</b></div>
							<div class="item"><span class="text-color-help">{{addr.province + addr.addr}}</span></div>
							<div class="item"><span class="text-color-help">{{addr.phone}}</span></div>
							<div class="item btn">
								<span class="defaultBtn" v-on:click="setDefault(addr.deliveryAddrSeq)" v-if="addr.flag == 0">设为默认</span>
								<span class="default" v-else>默认地址</span>
								<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
								<span class="defaultBtn" @click="openEditAddress(addr)">编辑</span>
								<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
								<span class="defaultBtn" @click="removeAddress(addr.deliveryAddrSeq)">删除</span>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<div class="text-right" v-if="(addressData.total)/9>1">
			<el-pagination layout="prev, pager, next" :total="addressData.total?addressData.total:1" :page-size="9" @current-change="changePage"></el-pagination>
		</div>
	</div>
	<newAddress ref="newAddress" @refresh="initData"></newAddress>
	<perFooter></perFooter>
</div>
</template>

<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
//引入新增收货地址
import newAddress from '@/components/newAddress/newAddress'
//引入商品列表模板
import leftMenu from './leftBar.vue'
export default {
	name: 'myAddressList',
	data() {
		return {
			page: 1,
			loadError: false,
			addressData: {},
			form: {
				name: '',
				region: '',
				address: '',
				phone: '',
				phone2: '',
				email: '',
				isDefault: ''
			},
			formLabelWidth: '120px'
		}
	},
	components: {
		perHeader,
		leftMenu,
		newAddress,
		perFooter,
	},
	watch: {
		'$route' (to, from) {
			this.page = parseInt(this.$route.query.page ? this.$route.query.page : 1);
			this.initData();
		}
	},
	methods: {
		initData: function() {
			let that = this;
			that.util.returnLogin(that);
			let params = {
				apiUrl: that.config.mallApi + "center/address/list?size=9&current=" + that.page,
				apiMethod: "get",
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					that.addressData = res.data.data;
				} else {
					that.loadError = true;
				}
			})
		},
		//删除地址
		removeAddress: function(index) {
			this.$confirm('确定要删除该地址吗?', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let that = this;
				let params = {
					apiUrl: that.config.mallApi + "center/address/del/" + index,
					apiMethod: "get",
				}
				that.ajaxData(params,function (res) {
					if (res.data.code == "0000") {
						that.initData();
						that.$notify({
							type: 'success',
							message: '地址删除成功'
						});
					} else {
						that.$notify({
							type: 'error',
							message: res.data.message
						});
					}
				})
			}).catch(() => {});
		},
		//设为默认地址
		setDefault: function(index) {
			let that = this;
			let params = {
				apiUrl: that.config.mallApi + "center/address/default/set/" + index,
				apiMethod: "get",
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					that.initData();
					that.$notify({
						type: 'success',
						message: '设为默认地址成功'
					});
				} else {
					that.$notify({
						type: 'error',
						message: res.data.message
					});
				}
			})
		},
		//打开新增收货地址表格
		openNewAddress() {
			this.$refs.newAddress.dialogFormVisible = true;
			this.$refs.newAddress.edit = false;
		},
		openEditAddress(addr) {
			this.$refs.newAddress.dialogFormVisible = true;
			this.$refs.newAddress.edit = true;
			this.$refs.newAddress.editSeq = addr.deliveryAddrSeq;
			for (var key in addr) {
				this.$refs.newAddress.form[key] = addr[key];
			}
		},
		changePage: function(e) {
			this.$router.push('/bXlBZHJlc3NMaXN0?page=' + e);
		},
	},
	mounted() {
		this.initData();
	}
}
</script>

<style lang="less" scoped>
@import url('css/personal.less');
</style>
