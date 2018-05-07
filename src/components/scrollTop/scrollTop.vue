<template>
<div class="scrollTop box box-center button" v-on:click="scrollTop" v-show="scrolled">
	<icon name="scroll-top" scale="2"></icon>
</div>
</template>

<script>
export default {
	name: 'scrollTop',
	data() {
		return {
			scrolled: false
		}
	},
	methods: {
		scrollTop() {
			// document.documentElement.scrollTop = 0;	//旧版返回顶部没有动画效果
			let scrollToptimer = setInterval(function(){
				let top = document.body.scrollTop || document.documentElement.scrollTop;
				let speed = top / 4;
				if (document.body.scrollTop != 0) {
					document.body.scrollTop -= speed;
				} else {
					document.documentElement.scrollTop -= speed;
				}
				if (top == 0) {
					clearInterval(scrollToptimer)
				}
			},20)
		},
		handleScroll() {
			this.scrolled = window.scrollY > 300;
		}
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.handleScroll);
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
.scrollTop {
    position: fixed;
    bottom: 40px;
    right: 40px;
    color: #fff;
    background: @base-black;
    padding: 10px;
    border: 1px solid #fff;
    z-index: 1000000;
}
</style>
