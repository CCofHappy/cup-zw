<template>
<div class="limitGoods">
	<cwHeader></cwHeader>
	<div class="mid-header container text-center">
		<h1>CHINA WHISKY</h1>
	</div>
	<div class="container">
		<div class="header-img"><img src="../../img/seize/banner-s4.jpg"></div>
		<div class="goods-box">
			<el-row :gutter="10">
				<el-col :span="8">
					<limitGood></limitGood>
				</el-col>
				<el-col :span="8">
					<limitGood></limitGood>
				</el-col>
				<el-col :span="8">
					<limitGood></limitGood>
				</el-col>
				<el-col :span="8">
					<limitGood></limitGood>
				</el-col>
				<el-col :span="8">
					<limitGood></limitGood>
				</el-col>
				<el-col :span="8">
					<limitGood></limitGood>
				</el-col>
			</el-row>
		</div>
	</div>
	<cwFooter></cwFooter>
</div>
</template>

<script>
import cwHeader from '@/components/header/header'
import cwFooter from '@/components/footer/footer'
import limitGood from '@/components/limitGood/limitGood'
export default {
	name: 'limitGoods',
	data() {
		return {
			nav: 1,
		}
	},
	components: {
		cwHeader,
		cwFooter,
		limitGood,
	},
	mounted() {

	},
	beforeDestroy() {

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
@import url('../home/home.less'); //引入less变量
.good-box {
    margin-bottom: 60px;
}
.header-img {
    height: 200px;
    overflow: hidden;

    img {
        width: 100%;
    }
}
.goods-box{
	padding: 30px 0;
}

</style>
