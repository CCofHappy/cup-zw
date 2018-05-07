<template>
<div class="myHistory">
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
				<leftMenu :navNum='12'></leftMenu>
			</el-col>
			<el-col :span="20">
				<LoadError v-if="loadError"></LoadError>
				<NoData :message="'您还没有浏览历史'" v-else-if="historyData && historyData.records.length==0"></NoData>
				<div class="history-item" v-else>
					<div v-for="(item,index) in historyData.records" v-if="item.goodLists.length>0">
						<div class="nav-his-subtitle">
							<span class="date">{{item.date}}</span>
							<a href="javascipt:,;"><span @click="removeHistoryDay(item.date)" class="text-color-help" >删除</span></a>
						</div>
						<!--商品列表-->
						<div class="goods-box">
							<el-row :gutter="26">
								<el-col :span="6" v-for="(item,index) in historyData.records[index].goodLists">
									<div class="good-box">
										<router-link :to="{ path: '/Z29vZHNEZXRhaWw', query: {id:item.id}}" target="_blank">
											<div class="img-box">
												<img v-lazy="item.image" width="100%">
											</div>
										</router-link>
										<div class="text-box">
											<div class="title-cn text-overflow text-center">
												{{item.fullName}}
											</div>
											<div class="title-en text-overflow text-color-help text-center">
												<small>{{item.enName}}</small>
											</div>
											<div class="price-box text-center">
												<div class="price"><small>￥</small>{{item.price}}</div>
												<div class="detail">({{item.volumn}} / {{item.proof}})</div>
											</div>

											<!--工具箱-->
											<div class="good-box-tool" v-if="item.state!=5">
												<!-- <div @click="addToFocus">
													<icon name="heart2" scale="2.1" class="icon button"></icon>
												</div> -->
												<div @click="removeHistory(item.userTrackSeq)">
													<icon name="trash" scale="2.1" class="icon button"></icon>
												</div>
											</div>

											<!--遮罩-->
											<div class="good-status box box-center box-just" v-if="item.state==5">
												<span class="good-status-txt">已下架</span>
												<a href="javascipt:,;" @click="removeHistory(item.userTrackSeq)">删除</a>
											</div>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
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
import leftMenu from './leftBar.vue'
export default {
	name: 'myHistory',
	data() {
		return {
			loadError:false,
			historyData:"",
		}
	},
	components: {
		perHeader,
		leftMenu,
		perFooter,
	},
	methods: {
		initData: function() {
			let that =this;
			that.util.returnLogin(that);
			let params = {
				apiUrl: that.config.mallApi+"center/look/list?current=1&size=10",
				apiMethod: "get",
			}
			that.ajaxData(params,function (res) {
				if (res.data.code="0000") {
					that.historyData = res.data.data;
				}else {
					that.loadError=true;
				}
			})
		},
		removeHistoryDay: function(date) {
			let that = this;
			let params = {
				apiUrl: that.config.mallApi+"center/look/del/date/"+date,
				apiMethod: "get",
			}
			that.ajaxData(params,function (res) {
				if (res.data.code="0000") {
					this.$notify({
						type: 'success',
						message: '删除成功'
					});
					that.initData()
				}else {
					this.$notify({
						type: 'success',
						message: res.data.message
					});
				}
			})
		},
		removeHistory: function(id) {
			let that = this;
			let params = {
				apiUrl: that.config.mallApi+"center/look/del/ids/"+id,
				apiMethod: "get",
			}
			that.ajaxData(params,function (res) {
				if (res.data.code="0000") {
					this.$notify({
						type: 'success',
						message: '删除成功'
					});
					that.initData()
				}else {
					this.$notify({
						type: 'success',
						message: res.data.message
					});
				}
			})
		}
	},
	mounted(){
		this.initData();
	}
}
</script>

<style lang="less" scoped>
@import url('css/myHistory.less');
</style>
