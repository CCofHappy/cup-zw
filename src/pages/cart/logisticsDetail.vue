<template>
<div class="logisticsDetail">
	<perHeader></perHeader>
	<div class="container">
		<div class="top-nav">
			<router-link to="/aG9tZQ"><b>首页</b></router-link> >
			<router-link to="/cGVyc29uYWwvbXlPcmRlcg"><b>我的订单</b></router-link> > 查看物流
		</div>
		<div class="logistics-img-box">
			<div class="box box-between">
				<div class="img-box active">
					<img src="../../img/icon/logistics-1.png">
					<b>待揽件</b>
				</div>
				<div class="img-box" :class="{active:logisticsInfo.state==1||logisticsInfo.state==3}">
					<img src="../../img/icon/logistics-3.png">
					<b>已揽件</b>
				</div>
				<div class="img-box" :class="{active:logisticsInfo.state==0||logisticsInfo.state==3}">
					<img src="../../img/icon/logistics-2.png">
					<b>运输中</b>
				</div>
				<div class="img-box" :class="{active:logisticsInfo.state==3}">
					<img src="../../img/icon/logistics-4.png">
					<b>已签收</b>
				</div>
			</div>
		</div>
		<div class="order-state-box">
			<div class="order-state box box-align-center">
				<b v-if="logisticsInfo.state==3">您的货物已签收。</b>
				<b v-else-if="logisticsInfo.state==0">您的货物正在运输中。</b>
				<b v-else-if="logisticsInfo.state==1">您的货物已揽件，正在等待运输。</b>
				<b v-else="">您的货物已打包出库，正在等待快递揽件。</b>
			</div>
			<div class="logistics-detail box">
				<div>
					物流公司：{{logisticsInfo&&logisticsInfo.info.name?logisticsInfo.info.name:'暂无'}}
				</div>
				<div>
					物流单号：{{logisticsInfo&&logisticsInfo.info.trackingNo?logisticsInfo.info.trackingNo:'暂无'}}
				</div>
			</div>
			<div class="logistics-step">
				<div class="step-box active box" v-for="(item,index) in logisticsInfo.data" :class="{active:index==0}">
					<div class="time">{{item.time}}</div>
					<div class="detail">{{item.context}}</div>
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="recommend-box">
      <div class="container white-bg">
        <div class="recommend-title-box">
          <div class="recommend-title">
            相关推荐
          </div>
        </div>
        <div class="recommend-content">
          <proList :needPages="false" :count="4"></proList>
        </div>
      </div>
    </div> -->
	<perFooter></perFooter>
</div>
</template>

<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import proList from '@/components/product/proList'
export default {
	name: 'logisticsDetail',
	data() {
		return {
			logisticsInfo:"",
		}
	},
	components: {
		perHeader,
		perFooter,
		proList,
	},
	methods: {
		initData(){
			let that = this;
			that.util.returnLogin(that);
			let params = {
				apiUrl: that.config.mallApi + "order/logistics/" + that.$route.query.id,
				apiMethod: "get",
			}
			that.ajaxData(params, function(res) {
				if (res.data.code="0000") {
					that.logisticsInfo = res.data.data;
				}
			})
		},
	},
	mounted (){
		this.initData();
	}
}
</script>

<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('../../components/product/recommend.less'); //引入相关推荐样式
@import url('css/orderDetail.less');
@import url('css/logisticsDetail.less');
</style>
