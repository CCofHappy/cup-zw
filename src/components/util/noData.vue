<template>
<div class="noData box box-just box-center">
    <img src="../../img/no-data.png"/>
	<div class="text-color-help">{{message}}</div>
</div>
</template>
<script>
export default {
    name: 'noData',
    props: ["message"],
    data() {
        return {}
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.noData{
	height: 400px;
	width: 100%;
    img{
        width: 50px;
        margin-bottom: 10px;
    }
}
</style>
