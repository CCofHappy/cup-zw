<template>
<div class="myGoods">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>我的商品</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row :gutter="20">
			<el-col :span="4">
				<leftBar :navNum="tabIndex"></leftBar>
			</el-col>
			<el-col :span="20">
				<div class="myGoods-container">
					<el-row class="search-box box box-align-center">
						<el-col :span="10">
							商品名称：&nbsp;&nbsp;<input v-model="name"></input>
						</el-col>
						<el-col :span="6" class="text-left">状态：
							<el-select v-model="stateIndex" placeholder="请选择">
								<el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="6" class="text-left">上传时间：
							<el-select v-model="timeIndex" placeholder="请选择">
								<el-option v-for="item in time" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="2">
							<div class="search-btn button" @click="initData">
								搜索
							</div>
						</el-col>
					</el-row>
					<LoadError v-if="loadError"></LoadError>
					<NoData :message="'没有相关的商品'" v-else-if="goodsTotal==0"></NoData>
					<div class="goods-list" v-else>
						<el-row class="text-center goods-title">
							<el-col :span="3">商品图片</el-col>
							<el-col :span="3">商品名称</el-col>
							<el-col :span="3">单价(￥)</el-col>
							<el-col :span="3">库存数</el-col>
							<el-col :span="3">状态</el-col>
							<el-col :span="4">录入时间</el-col>
							<el-col :span="5">操作</el-col>
						</el-row>
						<el-row class="text-center goods-box box box-align-center" v-for="(item,index) in goodsList">
							<el-col :span="3" class="box-center box">
								<div class="img-box">
									<img v-lazy="item.image" class="goodsImg1">
								</div>
							</el-col>
							<el-col :span="3">
								<p class="">{{item.fullName}}</p>
							</el-col>
							<el-col :span="3">
								<p class="">{{item.primeCost}}</p>
							</el-col>
							<el-col :span="3">
								<p class="">{{item.total}}</p>
							</el-col>
							<el-col :span="3">
								<p class="" v-if="item.state==-1">审核不通过</p>
								<p class="" v-if="item.state==0">未提交</p>
								<p class="" v-if="item.state==1">待审核</p>
								<p class="" v-if="item.state==2">审核通过</p>
								<p class="" v-if="item.state==4">已上架</p>
								<p class="" v-if="item.state==5">已下架</p>
							</el-col>
							<el-col :span="4">
								<p class="">{{forDate(item.createTime)}}</p>
							</el-col>
							<el-col :span="5" class="box box-center goods-btn-box">
								<div class="button" v-if="item.state==2" @click="upLine(item.productId)">上架</div>
								<div class="button" v-if="item.state==4" @click="offLine(item.productId)">下架</div>
								<router-link class="button" :to="{ name: 'handAdd', query: {id:item.productId} }" v-if="item.state!=4">修改</router-link>
								<div class="button" v-if="item.state!=4" @click="delGoods(item.productId)">删除</div>
							</el-col>
						</el-row>
					</div>
					<div class="text-right" v-if="goodsTotal>count">
						<el-pagination layout="prev, pager, next" :total="goodsTotal" :page-size="count" :current-page="page" @current-change="changePage"></el-pagination>
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
	name: 'myGoods',
	data() {
		return {
			loadError: false,
			tabIndex: '',
			name:'',
			state: [{
				value: '-1',
				label: '审核不通过'
			}, {
				value: '0',
				label: '未提交'
			}, {
				value: '1',
				label: '待审核'
			}, {
				value: '2',
				label: '审核通过'
			}, {
				value: '4',
				label: '已上架'
			}, {
				value: '5',
				label: '下架'
			}],
			time: [{
				value: '1',
				label: '近一个月'
			},{
				value: '2',
				label: '近三个月'
			}, {
				value: '3',
				label: '今年内订单'
			}, {
				value: '',
				label: '全部'
			}],
			stateIndex: '',
			timeIndex: '',
			page: 1,
			count: 1,
			goodsList:[],
			goodsTotal: 1,
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
		initData: function() {
			let params = {
				apiUrl: this.config.mallApi + "supplier/goods",
				current: this.page,
				size: 10,
				state: this.stateIndex,
				dateType: this.timeIndex,
				name:this.name,
			};
			this.ajaxData(params, (res) =>{
				if (res.data.code=="0000") {
					this.goodsList = res.data.data.records;
					this.goodsTotal = res.data.data.total;
				}else {
					this.loadError = true;
				}
			})
		},
		changePage: function (e) {
			this.page = e;
			this.initData();
		},
		forDate: function(e){
			return this.util.forDate(e,"yyyy-MM-dd hh:mm");
		},
		upLine:function (e) { //上架商品
			let params = {
				apiUrl: this.config.mallApi + "supplier/goods/upLine/"+e,
			};
			this.ajaxData(params, (res) =>{
				if (res.data.code=="0000") {
					this.$notify.success({
						message: '上架成功！',
					});
					this.initData();
				}else {
					this.$notify.error({
						message: res.data.message,
					});
				}
			})
		},
		offLine:function (e) { //下架商品
			let params = {
				apiUrl: this.config.mallApi + "supplier/goods/offLine/"+e,
			};
			this.ajaxData(params, (res) =>{
				if (res.data.code=="0000") {
					this.$notify.success({
						message: '下架成功！',
					});
					this.initData();
				}else {
					this.$notify.error({
						message: res.data.message,
					});
				}
			})
		},
		delGoods:function (e) { //删除商品
			let params = {
				apiUrl: this.config.mallApi + "supplier/goods/delete/"+e,
			};
			this.ajaxData(params, (res) =>{
				if (res.data.code=="0000") {
					this.$notify.success({
						message: '删除成功！',
					});
					this.initData();
				}else {
					this.$notify.error({
						message: res.data.message,
					});
				}
			})
		}
	},
	mounted() {
		this.tabIndex = this.$route.query.tabIndex || 1;
		this.initData();

		this.util.deleteCookie('test')
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('css/order.less');
@import url('css/purchase.less');
</style>

<!-- 调整elementUI样式 -->
<style lang="less">
.myGoods{
	.myGoods-container{
		.el-select{
			width: 150px;
			input{
				line-height:45px;
				height: 45px;
				border-radius: 0;
				border: 1px solid #bebebe;
			}
		}
	}
}
</style>
