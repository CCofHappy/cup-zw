<template>
<div class="salesSlip">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>我的销售单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftBar :navNum="tabIndex"></leftBar>
			</el-col>
			<el-col :span="20">
				<div class="order-container order">
					<!--表头-->
					<el-row class="order-tit box box-align-center">
						<el-col :span="9" class="text-left">下单时间：
							<el-select v-model="selectedIndex" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="14"></el-col>
					</el-row>
					<LoadError v-if="loadError"></LoadError>
					<NoData :message="'没有查询到相关订单'" v-else-if="orderData.records&&orderData.records.length==0"></NoData>
					<!--表内容-->
					<div class="order-list" v-else v-for="order in orderData.records">
						<div class="order-title box box-between box-align-center">
							<div class="box-flex">订单号：{{order.orderNo}}&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-color-help">下单时间：{{forDate(order.createDate)}}</span></div>
							<div class="font-dark-red" v-if="order.orderStatus == 1">待付款</div>
							<div class="font-dark-red" v-if="order.orderStatus == 2">待发货</div>
							<div class="font-dark-red" v-if="order.orderStatus == 3">待收货</div>
							<div class="font-dark-red" v-if="order.orderStatus == 4">已完成</div>
							<div class="font-dark-red" v-if="order.orderStatus == 5">已取消</div>
						</div>
						<div class="order-content">
							<el-row class="text-center box box-center order-row">
								<el-col :span='21'>
									<el-row class="text-center box box-center order-item" v-for="goods in order.items">
										<el-col :span="14" class="text-left">
											<div class="box box-align-center">
												<div class="img-box box-center box">
													<router-link :to="{ path: '/Z29vZHNEZXRhaWw', query: {id:goods.productId}}">
														<img v-lazy="goods.imageUrl" class="goodsImg1">
													</router-link>
												</div>
												<div>
													<router-link :to="{ path: '/Z29vZHNEZXRhaWw', query: {id:goods.productId}}">
														<h4>{{goods.enName}}</h4>
													</router-link>
													<p class="titke-cn">{{goods.fullName}}</p>
													<p class="text-color-help">酒精度：{{goods.alcoholStrength}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;净含量：{{goods.volumn}}</p>
												</div>
											</div>
										</el-col>
										<el-col :span="5"><small>￥</small>{{goods.priceStr}}</el-col>
										<el-col :span="5">x{{goods.quantity}}</el-col>
									</el-row>
								</el-col>
								<el-col :span="3" class="box box-center">
									<div>
										<div><small class="text-color-help"><router-link :to="{ name: 'orderDetail', query: {id:order.id,from:'supply'}}" target="_blank">订单详情</router-link></small></div>
									</div>
								</el-col>
							</el-row>
						</div>
						<div class="order-tools box box-between box-align-center">
							<div>
								共有 {{order.total}} 件商品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合计：<span class="order-price">￥{{order.feeStr}}</span>
							</div>
							<div>
								<div class="box" v-if="order.orderStatus==2">
									<div class="text-color-help button" @click="sendOpen(order.id)">立即发货</div>
								</div>
								<div class="box" v-else>
									<router-link :to="{ name: 'logisticsDetail', query:{id:order.id,from:'supply'} }" class="text-color-help">查看物流</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--分页器-->
				<div class="text-right" v-if="(orderData.total)/10>1">
					<el-pagination layout="prev, pager, next" :total="orderData.total?orderData.total:1" :page-size="10" @current-change="changePage" :current-page="page">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
		<el-dialog :visible.sync="dialogFormVisible" width="700px">
			<h5>需开具发票</h5>
			<el-row>
				<el-col :span="12">
					<p><span>单位名称：</span>{{sendData.consignee}}</p>
				</el-col>
				<el-col :span="12">
					<p><span>注册电话：</span>{{sendData.phone}}</p>
				</el-col>
				<el-col :span="12">
					<p><span>注册地址：</span>{{sendData.address}}</p>
				</el-col>
				<el-col :span="12">
					<p><span>纳税人识别号：</span>{{sendData.invoice?sendData.invoice.identificationNumber:'暂缺'}}</p>
				</el-col>
				<el-col :span="12">
					<p><span>开户银行：</span>暂缺</p>
				</el-col>
				<el-col :span="12">
					<p><span>银行账号：</span>暂缺</p>
				</el-col>
			</el-row>
			<h5>中威网收货地址</h5>
			<el-row>
				<el-col :span="12">
					<p><span>收货人：</span>{{sendData.consignee}}</p>
				</el-col>
				<el-col :span="12">
					<p><span>电话：</span>{{sendData.consignee}}</p>
				</el-col>
				<el-col :span="24">
					<p><span>收货地址：</span>{{sendData.consignee}}</p>
				</el-col>
			</el-row>
			<h5>填写物流信息</h5>
			<el-form :model="sendForm" label-width="90px">
				<el-form-item prop="corpId" label="物流公司：">
					<el-select v-model="sendForm.corpId" filterable placeholder="请选择">
						<el-option v-for="item in sendData.deliveryCorpModels" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="trackingNo" label="物流单号：">
					<el-input v-model="sendForm.trackingNo"></el-input>
				</el-form-item>
			</el-form>
			<div class="box box-center">
				<el-button type="primary" @click="sendGoods">确认发货</el-button>
			</div>
		</el-dialog>
	</div>
	<perFooter></perFooter>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftBar from './leftBar'
export default {
	name: 'salesSlip',
	data() {
		return {
			loadError: false,
			orderData: {},
			sendData: {},
			options: [{
				value: '1',
				label: '近三个月订单'
			}, {
				value: '2',
				label: '今年内订单'
			}, {
				value: '0',
				label: '全部'
			}],
			selectedIndex: '1',
			tabIndex: '1',
			page: 1,
			count: 10,
			dialogFormVisible: false,
			sendForm: {
				corpId: "",
				trackingNo: "",
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
			this.initData();
		},
		selectedIndex(curVal, oldVal) {
			if (curVal != oldVal) {
				this.$router.push({
					name: 'salesSlip',
					query: {
						page: 1,
						term: curVal,
						tabIndex: this.tabIndex
					}
				});
			}
		}
	},
	methods: {
		initData() {
			let that = this;
			that.util.returnLogin(that);
			that.page = parseInt(that.$route.query.page ? that.$route.query.page : 1);
			let orderApi = "",
				type = that.$route.query.tabIndex ? that.$route.query.tabIndex : 1,
				url = "supplier/order/shipment";
			if (this.tabIndex == 21) {
				url = "supplier/order/income";
			} else if (this.tabIndex == 22) {
				url = "supplier/order/settlement";
			} else if (this.tabIndex == 22) {
				url = "supplier/order/complete";
			}
			let params = {
				apiUrl: that.config.mallApi + url + "?size=" + this.count + "&current=" + that.page + "&term=" + that.selectedIndex,
				apiMethod: "get",
			}
			that.ajaxData(params, function(res) {
				if (res.data.code == "0000") {
					that.orderData = res.data.data;
				} else {
					that.loadError = true;
				}
			})
		},
		changePage(e) {
			let data = {
				page: e,
				term: this.$route.query.term ? this.$route.query.term : 1,
				tabIndex: this.$route.query.tabIndex ? this.$route.query.tabIndex : 1,
			}
			this.$router.push({
				path: "/cGVyc29uYWwvbXlPcmRlcg",
				query: data
			})
		},
		forDate(e) {
			return this.util.forDate(e, "yyyy-MM-dd")
		},
		sendOpen(id) {
			let params = {
				apiUrl: this.config.mallApi + "supplier/send/" + id,
				apiMethod: "get"
			}
			this.ajaxData(params, (res) => {
				if (res.data.code == "0000") {
					this.dialogFormVisible = true;
					this.sendData = res.data.data;
					this.sendForm =  { //提交完毕清空数据
						corpId: "",
						trackingNo: "",
					};
				} else {
					this.$notify.error(res.data.message)
				}
			})
		},
		sendGoods() {
			if (!this.sendForm.trackingNo || !this.sendForm.corpId) {
				this.$notify.error("请完善发货信息")
				return;
			}
			let params = {
				apiUrl: this.config.mallApi + "supplier/send",
				orderId: this.sendData.id,
				trackingNo: this.sendForm.trackingNo,
				corpId: this.sendForm.corpId,
			}
			this.ajaxData(params, (res) => {
				if (res.data.code == "0000") {
					this.$notify.success("发货成功！");
					this.dialogFormVisible = false;
				} else {
					this.$notify.error(res.data.message)
				}
			})
		}
	},
	mounted() {
		this.tabIndex = this.$route.query.tabIndex ? this.$route.query.tabIndex : 1;
		this.initData();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('css/order.less');
</style>
<style lang="less">
.salesSlip {
    .el-dialog {
        .el-dialog__header {
            padding: 0;
            border-bottom: none;
        }
        .el-dialog__body {
            padding-top: 10px;
            h5 {
                font-size: 16px;
                color: #000;
                padding: 15px 0;
                border-bottom: 1px solid #f2f2f2;
                margin-bottom: 10px;
            }
            .el-col {
                p {
                    font-size: 14px;
                    color: #000;
                    line-height: 3;
                    span {
                        color: #979797;
                    }
                }
            }
            .el-form {
                .el-form-item__label {
                    font-size: 14px;
                    color: #000;
                    text-align: left;
                }
                .el-form-item__content {
                    width: 217px;
                }
            }
        }
    }
}
</style>
