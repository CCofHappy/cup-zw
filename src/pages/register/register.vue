<template>
<div class="register-box">
	<cwHeader></cwHeader>
	<!-- <div class="container">
		<div class="register-classify">
			<div class="register-btn" :class="{active:type==1}" @click="type=1">
				<router-link to="/cmVnaXN0ZXI/dXNlcg" class="box box-align-center">
					<icon name="arrow-right2" scale="2" v-show="type==1"></icon>普通用户注册
				</router-link>
			</div>
			<div class="register-btn" :class="{active:type==2}" @click="type=2">
				<router-link to="/cmVnaXN0ZXI/c3VwcGx5" class="box box-align-center">
					<icon name="arrow-right2" scale="2" v-show="type==2"></icon>供应商注册
				</router-link>
			</div>
			<div class="register-btn" :class="{active:type==3}" @click="type=3">
				<router-link to="/cmVnaXN0ZXI/cHVyY2hhc2Vy" class="box box-align-center">
					<icon name="arrow-right2" scale="2" v-show="type==3"></icon>采购商注册
				</router-link>
			</div>
		</div>
	</div> -->
	<router-view></router-view>
	<cwFooter></cwFooter>
</div>
</template>
<script>
import cwHeader from '@/components/header/header'
import cwFooter from '@/components/footer/footer'
export default {
	name: 'register',
	data() {
		return {
			type: 1,
		}
	},
	methods: {},
	mounted() {},
	components: {
		cwHeader,
		cwFooter,
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
.register-box .container {
    position: relative;
}
.register-classify {
    position: absolute;
    top: 160px;
    left: 160px;
    font-size: 16px;
    color: #656565;
    .register-btn {
        margin: 40px 0;
        &.active {
            color: #000;
        }
    }
}
</style>
