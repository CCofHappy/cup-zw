<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    //启动项目就请求获取服务时间戳，供其他页面组件使用
    // if (!window.serverTime) {
    //   window.serverTime=1;
    //   this.$ajax.post(this.config.rootPath+"auction/getServerTime")
    //   .then(function(m){
    //       window.serverTime = m.data.data;
    //       setInterval(function () {
    //         window.serverTime+=1000;
    //       },1000)
    //   })
    //   .catch(m=>console.log(m));
    // }
  },
}
</script>
<style>
</style>
