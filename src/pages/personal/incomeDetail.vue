<template>
<div class="incomeDetail">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>收益明细</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftMenu :navNum='tabIndex'></leftMenu>
			</el-col>
			<el-col :span="20">
				<div class="box box-align-center">下单时间：
					<el-select v-model="selectedIndex" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="text-center income-table">
					<el-table :data="incomeData" class="width: 100%" empty-text="没有相关消费记录" :header-cell-style="headerStyle" :cell-style="cellStyle">
						<el-table-column prop="name" label="用户名"></el-table-column>
						<el-table-column prop="type" label="品类"></el-table-column>
						<el-table-column prop="count" label="数量(瓶)"></el-table-column>
						<el-table-column prop="price" label="消费金额"></el-table-column>
						<el-table-column prop="income" label="我的收益"></el-table-column>
						<el-table-column prop="state" label="状态"></el-table-column>
					</el-table>
				</div>
			</el-col>
		</el-row>
		<!-- <div class="text-right" v-if="consumeRecord.consumePage && consumeRecord.consumePage.total>1">
			<el-pagination layout="prev, pager, next" :total="consumeRecord.consumePage.total?consumeRecord.consumePage.total:1" @current-change="changePage"></el-pagination>
		</div> -->
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
	name: 'incomeDetail',
	data() {
		return {
			page: 1,
			headerStyle:{ //设置表格表头样式
				'text-align': 'center',
				'font-weight': 'bold',
				'color': '#000',
				'height': '80px',
			},
			cellStyle:{ //设置表格单元格样式
				'height': '60px',
			},
			loadError: false,
			tabIndex: '1',
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
			incomeData:[{name: "孙尚香", type: "班尼富63年", count: "1", price: "￥14000.00",income:"￥1000",state:"待结算"}],
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

			})
		},
		changePage: function(e) {
			this.$router.push('/bXlDb25zdW1lUmVjb3Jk?page=' + e);
		},
	},
	mounted() {
		this.tabIndex = this.$route.query.tabIndex || 1;
		this.initData();
	}
}
</script>

<style lang="less" scoped>
@import url('css/personal.less');
</style>
