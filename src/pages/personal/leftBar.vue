<template>
<div class="leftBar text-center">
	<div class="user-box">
		<div class="avatar" :style="{backgroundImage: 'url(' + customerInfo.imgUrl + ')' }" v-if="customerInfo.imgUrl">
		</div>
		<div class="avatar" :style="{backgroundImage: 'url(/static/img/head-icon.png)' }" v-else>
		</div>
		<div class="user-name">
			{{customerInfo.customerName || '--'}}
		</div>
		<div class="user-level">
			{{customerInfo.rankName || '--'}}
		</div>
	</div>
	<div class="title-box" v-bind:class="{ active: navNum<7}">
		<b>订单中心</b>
	</div>
	<router-link :to="{ name: 'myOrder', query:{page:1, tabIndex: 1} }">
		<div class="line-box" v-bind:class="{ active: navNum==1}">
			全部订单
		</div>
	</router-link>
	<router-link :to="{ name: 'myOrder', query:{page:1, tabIndex: 2}  }">
		<div class="line-box" v-bind:class="{ active: navNum==2}">
			待付款
		</div>
	</router-link>
	<router-link :to="{ name: 'myOrder', query:{page:1, tabIndex: 3}  }">
		<div class="line-box" v-bind:class="{ active: navNum==3}">待收货
		</div>
	</router-link>
	<router-link :to="{ name: 'myOrder', query:{page:1, tabIndex: 4}  }">
		<div class="line-box" v-bind:class="{ active: navNum==4}">已完成
		</div>
	</router-link>
	<div class="line-box" v-bind:class="{ active: navNum==5}">
		<router-link :to="{ name: 'myOrder', query:{page:1, tabIndex: 5}  }">已取消</router-link>
	</div>
	<div class="line-box" v-bind:class="{ active: navNum==6}">
		<router-link :to="{ name: 'saleService', query:{page:1, tabIndex: 6}  }">售后服务</router-link>
	</div>

	<div class="title-box" v-bind:class="{ active:  navNum>14}">
		<b>采购管理</b>
	</div>
	<router-link :to="{ name: 'myPurchase', query:{page:1, tabIndex: 15}  }">
		<div class="line-box" v-bind:class="{ active: navNum==15}">我要采购
		</div>
	</router-link>
	<router-link :to="{ name: 'myDemand', query:{page:1, tabIndex: 16}  }">
		<div class="line-box" v-bind:class="{ active: navNum==16}">我的需求单
		</div>
	</router-link>
	<router-link :to="{ name: 'myInventory', query:{page:1, tabIndex: 17} }">
		<div class="line-box" v-bind:class="{ active: navNum==17}">我的清单
		</div>
	</router-link>

	<div class="title-box" v-bind:class="{ active:  navNum>17}">
		<b>商品管理</b>
	</div>
	<router-link :to="{ name: 'myGoods', query:{page:1, tabIndex: 18}  }">
		<div class="line-box" v-bind:class="{ active: navNum==18}">我的商品
		</div>
	</router-link>
	<router-link :to="{ name: 'addGoods', query:{page:1, tabIndex: 19}  }">
		<div class="line-box" v-bind:class="{ active: navNum==19}">新增商品
		</div>
	</router-link>

	<div class="title-box" v-bind:class="{ active:  navNum>19}">
		<b>我的销售单</b>
	</div>
	<router-link :to="{ name: 'salesSlip', query:{page:1, tabIndex: 20}  }">
		<div class="line-box" v-bind:class="{ active: navNum==20}">待发货
		</div>
	</router-link>
	<router-link :to="{ name: 'salesSlip', query:{page:1, tabIndex: 21}  }">
		<div class="line-box" v-bind:class="{ active: navNum==21}">待结算
		</div>
	</router-link>
	<router-link :to="{ name: 'salesSlip', query:{page:1, tabIndex: 22} }">
		<div class="line-box" v-bind:class="{ active: navNum==22}">已完成
		</div>
	</router-link>

	<div class="title-box" v-bind:class="{ active: navNum>6 && navNum<11}">
		<b>我的设置</b>
	</div>
	<router-link to="/cGVyc29uYWxJbmZv">
		<div class="line-box" v-bind:class="{ active: navNum==7}">个人信息
		</div>
	</router-link>
	<router-link to="/YWNjb3VudFNhZnR5">
		<div class="line-box" v-bind:class="{ active: navNum==8}">账户安全
		</div>
	</router-link>
	<router-link to="/bXlBZHJlc3NMaXN0">
		<div class="line-box" v-bind:class="{ active: navNum==9}">收货地址
		</div>
	</router-link>
	<router-link to="/bXlDb25zdW1lUmVjb3Jk">
		<div class="line-box" v-bind:class="{ active: navNum==10}">消费记录
		</div>
	</router-link>
	<div class="title-box" v-bind:class="{ active: navNum>10}">
		<b>其他信息</b>
	</div>
	<router-link to="/bXlhdHRlbnRpb24K">
		<div class="line-box" v-bind:class="{ active: navNum==11}">我的关注
		</div>
	</router-link>
	<router-link to="/bXlIaXN0b3J5">
		<div class="line-box" v-bind:class="{ active: navNum==12}">浏览历史
		</div>
	</router-link>

	<!-- <div class="title-box" v-bind:class="{ active: navNum>12}">
		<b>业务中心</b>
	</div>
	<router-link :to="{ name: 'incomeDetail', query:{page:1, tabIndex: 13} }">
		<div class="line-box" v-bind:class="{ active: navNum==13}">收益明细
		</div>
	</router-link>
	<router-link :to="{ name: 'myCustomer', query:{page:1, tabIndex: 14} }">
		<div class="line-box" v-bind:class="{ active: navNum==14}">我的客户
		</div>
	</router-link> -->
</div>
</template>

<script>
export default {
	name: 'leftBar',
	props: ["navNum"],
	data() {
		return {
			customerInfo: {},
		}
	},
	methods: {
		initData() {
			this.util.returnLogin(this);
			let params = {
				apiUrl: this.config.mallApi + "center/profile/detail",
				apiMethod: 'get',
			}
			this.ajaxData(params,(res)=>{//请求个人基础信息
				if (res.data.code == "0000") {
					let data = res.data.data;
					this.customerInfo = data;
				}
			})
		},
	},
	mounted() {
		this.initData();
	}
}
</script>
<style lang="less" scoped>
@import url('css/leftBar.less');
</style>
