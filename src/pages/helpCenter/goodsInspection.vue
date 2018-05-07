<template>
<div class="mattersConcerned">
	<div class="goodsInspection">
		<perHeader></perHeader>
		<div class="container">
			<helpTop></helpTop>
			<el-row :gutter="20">
				<el-col :span="4">
					<leftBar :navNum="'33'" :leftIndex="['3']"></leftBar>
				</el-col>
				<el-col :span="20">
					<div class="help_right">
						<div class="garyBg top-none">配送安全</div>
						<div class="leftIndent">
							<p>因酒类属特殊商品，为保证货品安全，每瓶酒都采用酒类专用安全包装，以确保在运输途中不会因挤压、碰撞等因素造成破损；如签收时出现破、漏、损情况，<br>请与快递人员当面核实，并对破损进行拍照取证后致电中威网客服热线<b>400-830-5299</b>人工咨询亦或直接拒签</p>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<perFooter></perFooter>
	</div>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftBar from './leftBar'
import helpTop from './helpTop'
export default {
	name: 'goodsInspection',
	data() {
		return {}
	},
	components: {
		perHeader,
		leftBar,
		perFooter,
		helpTop
	},
	methods: {}
}
</script>

<style lang="less" scoped>
@import url('css/helpCenter.less');
</style>
