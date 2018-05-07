<template>
<div class="loadError box box-just box-center">
    <img src="../../img/load-error.png"/>
    <div>数据加载失败，请重试</div>
    <el-button plain @click="reloadData">重新加载</el-button>
</div>
</template>
<script>
export default {
    name: 'loadError',
    data() {
        return {}
    },
    methods:{
        reloadData:function(){
            history.go(0);
        }
    }
}
</script>
<style lang="less" scoped>
.loadError{
	height: 400px;
	width: 100%;
    img{
        width: 70px;
    }
    div{
        margin: 15px 0 20px;
    }
}
</style>
