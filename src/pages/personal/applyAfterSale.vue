<template>
<div class="applyAfterSale">
	<perHeader></perHeader>
	<div class="container">
		<div class="nav-title">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/aG9tZQ' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name: 'saleService', query:{page:1, tabIndex: 6} }">售后服务</el-breadcrumb-item>
				<el-breadcrumb-item>申请售后</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="apply-content">
			<div class="apply-process box">
				<div class="apply-process-step box box-center" :class="{ active: step>0 }">
					<span class="step-num">1</span>申请退货退款
				</div>
				<div class="apply-process-step box box-center" :class="{ active: step>1 }">
					<span class="step-num">2</span>申请处理中
				</div>
				<div class="apply-process-step box box-center" :class="{ active: step>2 }">
					<span class="step-num">3</span>买家退货
				</div>
				<div class="apply-process-step box box-center" :class="{ active: step>3 }">
					<span class="step-num">4</span>退货完毕
				</div>
			</div>

			<div class="step-box" v-if="step==1">
				1
			</div>
			<div class="step-box" v-if="step==2">
				2
			</div>
			<div class="step-box" v-if="step==3">
				3
			</div>
			<div class="step-box" v-if="step==4">
				4
			</div>
		</div>
	</div>
	<perFooter></perFooter>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
export default {
	name: 'applyAfterSale',
	data() {
		return {
			step:1,
		}
	},
	components: {
		perHeader,
		perFooter
	},
	watch: {

	},
	methods: {

	},
	mounted() {
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('css/order.less');
@import url('css/saleService.less');
</style>
