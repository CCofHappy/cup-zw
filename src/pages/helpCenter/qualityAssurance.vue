<template>
<div class="mattersConcerned">
	<div class="qualityAssurance">
		<perHeader></perHeader>
		<div class="container">
			<el-row :gutter="20">
				<el-col :span="4">
					<leftBar :navNum="'45'" :leftIndex="['4']"></leftBar>
				</el-col>
				<el-col :span="20">
					<div class="help_right">
						<h3>品质保障：</h3>
						<p>中威网商城保证所有商品都是通过正规进货渠道购进的。如果您在购买商品后发现质量问题，请与客服中心400-830-5299联系，我们将针对您提出的具体问题，作出合适的处理！每一位在中威网商城购物的顾客都可以享有七天无理由退换货的权利。</p>
						<div class="garyBg">以下情况属于商品质量问题:</div>
						<p>1、酒品酒标、瓶盖、瓶塞及酒瓶爆裂等外包装损坏；</p>
						<p>2、酒品出现酒液外流现象；</p>
						<p>3、酒品中发现以假充真、以次充好的。</p>
						<p>保障承诺:每一位在中威网商城区购物的顾客都可以享有"假一罚十"的权利。</p>
						<p>注：如果您认为在商城区购买的商品是假货，并能提供质检机构的证明文件，经确认后，在全额返还商品金额的同时，再以威币的形式返还十倍的商品金额。</p>
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
export default {
	name: 'qualityAssurance',
	data() {
		return {}
	},
	components: {
		perHeader,
		leftBar,
		perFooter
	},
	methods: {}
}
</script>

<style lang="less" scoped>
@import url('css/helpCenter.less');
</style>
