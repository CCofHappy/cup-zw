<template>
<div class="limitGoods">
	<cwHeader></cwHeader>
	<div class="mid-header container text-center">
		<h1>CHINA WHISKY</h1>
	</div>
	<div class="container">
		<div class="header-img"><img src="../../img/seize/banner-s4.jpg"></div>

		<LoadError v-if="loadError"></LoadError>
		<div class="goods-box" v-else>
			<el-row :gutter="10">
				<el-col :span="8" v-for="(item, index) in limitGoods">
					<limitGood :itemData="item" :nowTime="nowTime"></limitGood>
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
			limitGoods:[],
			loadError:false,
			page: 1,
			nowTime: 0,
		}
	},
	components: {
		cwHeader,
		cwFooter,
		limitGood,
	},
	methods:{
		initData(){
			var params = { //首页数据查询接口参数
				apiUrl: this.config.mallApi + "goods/list/buying/all",
				size: 10,
				current: this.page,
			}
			this.ajaxData(params, (res)=> {
				if (res.data.code=="0000") {
					this.limitGoods = res.data.data.records;
					this.nowTime = Date.parse(new Date());
				}else {
					this.loadError = true;
				}
			})
		}
	},
	mounted() {
		this.initData();
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
.goods-box {
    padding: 30px 0;
}
</style>
