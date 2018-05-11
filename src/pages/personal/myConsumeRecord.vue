<template>
<div class="myConsumeRecord">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>个人中心</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftMenu :navNum='10'></leftMenu>
			</el-col>
			<el-col :span="20">
				<div class="myWallet">
					<el-row class="text-center">
						<el-col :span="6" class="box box-center">
							<div>
								<h5>账户余额：<b class="font-dark-red">￥14000</b></h5>
								<p>提现中的金额：￥ 4000</p>
							</div>
						</el-col>
						<el-col :span="12" class="box box-center">
							<div>
								<p>您提现的金额将在审核通过后的两个工作日到账；</p>
								<p>提现需额外支付0.8%的手续费，手续费最低1元，请知悉。</p>
							</div>
						</el-col>
						<el-col :span="6" class="box box-align-center box-between">
							<div class="button">提现</div>
							<div class="button recharge">充值</div>
						</el-col>
					</el-row>
				</div>
				<!--消费记录列表-->
				<LoadError v-if="loadError"></LoadError>
				<div class="record-table" v-else>
					<div class="box box-between box-align-center record-title">
						<p>交易记录</p>
						<div class="box box-align-center">
							<el-select v-model="selectedIndex" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<el-table :data="recordsData" class="width: 100%" empty-text="没有相关消费记录" :header-cell-style="headerStyle" :cell-style="cellStyle">
						<el-table-column prop="consumeTime" label="时间"></el-table-column>
						<el-table-column prop="orderNo" label="用途"></el-table-column>
						<el-table-column prop="consumeAmount" label="消费额"></el-table-column>
						<el-table-column prop="remark" label="状态"></el-table-column>
					</el-table>
				</div>
			</el-col>
		</el-row>
		<div class="text-right" v-if="consumeRecord.consumePage && consumeRecord.consumePage.total>1">
			<el-pagination layout="prev, pager, next" :total="consumeRecord.consumePage.total?consumeRecord.consumePage.total:1" @current-change="changePage"></el-pagination>
		</div>
	</div>
	<perFooter></perFooter>
</div>
</template>

<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
//引入商品列表模板
import leftMenu from './leftBar.vue'
export default {
	name: 'myConsumeRecord',
	data() {
		return {
			page: 1,
			headerStyle:{ //设置表格表头样式
				'font-weight': 'bold',
				'color': '#000',
				'height': '60px',
			},
			cellStyle:{ //设置表格单元格样式
				'height': '60px',
				'color': '#000',
			},
			options: [{
				value: '1',
				label: '近三个月'
			}, {
				value: '2',
				label: '今年内'
			}, {
				value: '0',
				label: '全部'
			}],
			loadError: false,
			selectedIndex: "1",
			consumeRecord: [],
			recordsData:[],
		}
	},
	components: {
		perHeader,
		leftMenu,
		perFooter,
	},
	watch: {
		'$route' (to, from) {
			this.page = parseInt(this.$route.query.page ? this.$route.query.page : 1);
			this.initData();
		}
	},
	methods: {
		initData() {
			let that = this;
			that.util.returnLogin(that);
			let params = {
				apiUrl: this.config.mallApi + 'center/consume/list?current='+ that.page +'&size=10',
				apiMethod: "get",
			}
			that.ajaxData(params,function (res) {
				if (res.data.code == "0000") {
					that.consumeRecord = res.data.data;
					that.recordsData = res.data.data.consumePage.records;
				} else {
					that.loadError = true;
				}
			})
		},
		changePage: function(e) {
			this.$router.push('/bXlDb25zdW1lUmVjb3Jk?page=' + e);
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
