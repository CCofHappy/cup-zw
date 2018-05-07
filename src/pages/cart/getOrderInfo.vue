<template>
<div class="getOrderInfo">
	<cwHeader></cwHeader>
	<loadError v-if="loadError"></loadError>
	<div v-else>
		<newAddress ref="newAddress" @refresh="refresh"></newAddress>
		<newInvoice ref="newInvoice" @defaultInvoice="defaultInvoice"></newInvoice>
		<div class="container">
			<!-- <el-steps :space="300" :active="2" finish-status="success" class="box box-center" :align-center="true">
				<el-step title="1、我的购物车"></el-step>
				<el-step title="2、核对订单信息"></el-step>
				<el-step title="3、提交订单"></el-step>
			</el-steps> -->

			<div class="container-title box box-between box-align-center">
				<div>请选择收货地址</div>
				<div class="address-btn-box box text-center">
					<span class="button" @click="openNewAddress">
						+ 添加收货地址
					</span>&nbsp;&nbsp;&nbsp;&nbsp;
					<router-link to="/bXlBZHJlc3NMaXN0" target="_blank">管理收货地址</router-link> &nbsp;&nbsp;&nbsp;&nbsp;
				</div>
			</div>
			<div class="container-address">
				<el-row>
					<el-col :span="6" v-for="(item,index) in addressList">
						<div class="addr-item button" :class="{active:selectedAddr == index}" @click="chooseAddr(index)" v-show="index<=maxAddr">
							<div class="addr-item-tit">收货人：{{item.consignee}}</div>
							<div class="addr-item-text box">
								<el-row>
									<el-col :span="1">
										<icon name="location" scale="2" class="icon"></icon>
									</el-col>
									<el-col :span="23" class="text-overflow-more text-overflow-two">&nbsp;&nbsp;{{item.province+item.addr}}</el-col>
								</el-row>
							</div>
							<div class="text-right">{{item.phone}}</div>
						</div>
					</el-col>
				</el-row>
				<div class="more" v-if="addressList.length>8">
					<a href="javascript:void(0);" @click="getMoreAddress()">
					<span  v-if="maxAddr==7">更多收货地址<i class="el-icon-d-arrow-right"></i></span>
					<span  v-else>收起收货地址<i class="el-icon-d-arrow-left"></i></span>
				  </a>
				</div>
			</div>

			<div class="container-title">确认订单信息</div>
			<div class="order">
				<!-- <el-row class="order-title text-center">
					<el-col :span="13">商品信息</el-col>
					<el-col :span="4">单价(元)</el-col>
					<el-col :span="3">数量(瓶)</el-col>
					<el-col :span="4">小计(元)</el-col>
				</el-row> -->
				<el-row class="order-item box box-center" v-for="item in orderItems">
					<el-col :span="13" class="text-left">
						<el-row>
							<el-col :span="6" class="box box-center img-box">
								<img v-lazy="item.image?item.image:item.imageUrl" class="goodsImg1" width="100%">
							</el-col>
							<el-col :span="12" class="box box-just box-justify-center">
								<div class="enName">{{item.enName}}</div>
								<div><span class="text-color-help" v-if="item.isShared == 1">【分享瓶】</span>{{item.fullName}}</div>
							</el-col>
							<el-col :span="6" class="box box-center">
								<div>酒精度：{{item.alcoholStrength}}<br><br>净含量：{{item.volumn}}</div>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="4" class="box box-just box-center">
						<div>￥{{item.price.toFixed(2)}}</div>
					</el-col>
					<el-col :span="3" class="box box-center">{{item.count?item.count:item.quantity}}</el-col>
					<el-col :span="4" class="box box-center">
						<small>￥</small> {{parseFloat((item.count?item.count:item.quantity) * item.price).toFixed(2)}}
					</el-col>
				</el-row>
			</div>

			<div class="container-title">备注信息</div>
			<div class="memo-box">
				<el-input type="textarea" :rows="5" placeholder="请输入订单备注内容" v-model="memo">
				</el-input>
			</div>

			<div class="container-title">发票信息 <span class="text-color-help">开企业抬头发票须填写纳税人识别号，以免影响报销</span></div>
			<div class="invoice-box">是否需要开具发票：
				<el-radio class="radio" v-model="isNeedInvoice" label="1" @change="getInvoice(false)">不需要</el-radio>
				<el-radio class="radio" v-model="isNeedInvoice" label="2" @change="getInvoice(true)">需要</el-radio>
			</div>

			<div class="invoice-box" v-if="showTicketBtn == true">
				<span v-if="invoiceInfo">
	            	<span v-if="invoiceInfo.type==1">电子发票</span>
				<span v-if="invoiceInfo.type==2">普通发票</span>
				<span v-if="invoiceInfo.type==3">增值税发票</span> &nbsp;&nbsp;&nbsp;&nbsp;
				<span>{{invoiceInfo.name}}</span>
				</span>
				<span class="text-color-help" v-else>您还没有选择发票信息</span>
				<a href="javascript:void(0);" @click="openNewInvoice"><u>点击编辑</u></a>
			</div>


			<div class="text-right toolbar">
				合计金额：<span class="sum"><small>￥</small>{{parseFloat(orderMax).toFixed(2)}}</span>&nbsp;
				<el-button type="primary" @click="orderSubmit">
					<div class="button">提交订单</div>
				</el-button>
			</div>
		</div>
	</div>
	<cwFooter></cwFooter>
</div>
</template>

<script>
import cwHeader from '@/components/header/header'
import cwFooter from '@/components/footer/footer'
import newAddress from '@/components/newAddress/newAddress'
import newInvoice from '@/components/newInvoice/newInvoice'
export default {
	name: 'getOrderInfo',
	data() {
		return {
			selectedAddr: 0,
			loadError: false,
			addressList: [],
			orderItems: [],
			isNeedInvoice: '1',
			invoiceInfo: "",
			showTicketBtn: false,
			dialogFormVisible: false,
			maxAddr: 7,
			invoiceSeq: "",
			orderMax: 0,
			memo:"",
		}
	},
	components: {
		cwHeader,
		cwFooter,
		newAddress,
		newInvoice,
	},
	methods: {
		initData: function() {
			let that = this;
			that.util.returnLogin(that);
			if (sessionStorage.orderSubmitInfo) {
				let info = JSON.parse(sessionStorage.orderSubmitInfo),
					maxPrice = 0;
				for (var i in info) {
					maxPrice += ((info[i].count ? info[i].count : info[i].quantity) * info[i].price);
				}
				that.orderItems = info;
				that.orderMax = maxPrice;

				let params = {
					apiUrl: that.config.mallApi + "center/address/list?size=20&current=1",
					apiMethod: "get",
				}
				that.ajaxData(params, function(res) { //获取收货地址信息
					if (res.data.code == "0000") {
						that.addressList = res.data.data.records;
					} else {
						that.loadError = true;
					}
				})

				let invoiceParams = { //获取默认发票
					apiUrl: that.config.mallApi + "order/invoice/default",
					apiMethod: "get",
				}
				that.ajaxData(invoiceParams, function(res) {
					if (res.data.code = "0000") {
						let data = res.data.data;
						if (data) {
							that.invoiceInfo = {
								name: data.invoiceHeadContent,
								type: data.invoiceType,
								invoiceSeq: data.invoiceSeq,
							};
							that.$refs.newInvoice.defaultInvoice = that.invoiceInfo;
						}
					} else {
						console.log(res.data.message);
					}
				})
			} else {
				that.loadError = true;
			}
		},
		//选择
		chooseAddr: function(index) {
			this.selectedAddr = index;
		},
		getMoreAddress: function() {
			this.maxAddr = this.maxAddr == 7 ? 10000 : 7;
		},
		getInvoice: function(item) {
			this.showTicketBtn = item;
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		defaultInvoice() {
			this.invoiceInfo = {
				name: this.$refs.newInvoice.defaultInvoice.name,
				type: this.$refs.newInvoice.defaultInvoice.type,
				invoiceSeq: this.$refs.newInvoice.defaultInvoice.invoiceSeq,
			};
		},
		//打开新增收货地址表格
		openNewAddress() {
			this.$refs.newAddress.dialogFormVisible = true;
		},
		openNewInvoice() {
			this.$refs.newInvoice.dialogFormVisible = true;
			this.$refs.newInvoice.openFirst = true;
		},
		refresh(){
			this.initData();
			this.selectedAddr=1;
		},
		orderSubmit() {
			let that = this;
			if (that.isNeedInvoice == 2 && !that.invoiceInfo.invoiceSeq) {
				that.$notify.error({
					message: "请选择发票"
				});
				return;
			}
			if (that.addressList.length != 0) {
				let addressId = that.addressList[that.selectedAddr].deliveryAddrSeq;
				let data = {
					addressId: addressId,
					goods: [],
					invoiceSeq: "",
					memo: that.memo?that.memo:'无',
					type: that.$route.query.type,
				}
				for (var i in that.orderItems) {
					data.goods[i] = {
						productDetailId: that.orderItems[i].detailId ? that.orderItems[i].detailId : that.orderItems[i].productDetailId,
						productId: that.orderItems[i].id ? that.orderItems[i].id : that.orderItems[i].productId,
						quantity: that.orderItems[i].count ? that.orderItems[i].count : that.orderItems[i].quantity,
					}
				}
				if (that.isNeedInvoice == 2) {
					data.invoiceSeq = that.invoiceInfo.invoiceSeq
				}
				that.$ajax({
					method: "post",
					url: that.config.mallApi + "order/submit",
					headers: {
						'Content-type': 'application/json;charset=UTF-8',
						'Authentication': that.util.getCookie('token')
					},
					data: data,
				}).then(res => {
					if (res.data.code == "0000") {
						that.$notify.success({
							message: "提交成功！"
						});
						this.$router.push('/Y2hvc2VQYXk?id=' + res.data.data);
					} else if (res.data.code == "1303") {
						that.$notify.error({
							message: "商品库存不足！"
						})
					} else {
						that.$notify.error({
							message: res.data.message
						})
					}
				}).catch(err => {
					console.log(err)
				})
			} else {
				that.$notify.error({
					message: "请选择收货地址！"
				});
			}
		}
	},
	mounted() {
		this.initData();
	}
}
</script>

<style lang="less" scoped>
@import url('css/getOrderInfo.less');
</style>
