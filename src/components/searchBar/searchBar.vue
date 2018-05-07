<template>
<div class="searchBar">
	<el-input placeholder="" :value="inputSearch" v-model="inputSearch">
		<el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
	</el-input>
</div>
</template>

<script>
export default {
	name: 'searchBar',
	data() {
		return {
			inputSearch: "",
		}
	},
	methods: {
		searchClick: function(e) {
			if (this.inputSearch.replace(/(^\s*)|(\s*$)/g, "")) {
				this.$router.push('/c2VhcmNo?page=1&value=' + this.inputSearch + "&date=" + Date.parse(new Date()));
			}
		},
	},
	mounted() {

	},
	beforeDestroy() {

	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
.searchBar{
	position: absolute;
	top: 0;
	right: 0;
}
</style>
