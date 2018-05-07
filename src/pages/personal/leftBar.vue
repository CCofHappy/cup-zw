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
						that.customerInfo = data;
					}
				})
				.catch(err => console.log(err));
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
