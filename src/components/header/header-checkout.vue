<template>
<div class="header">
    <header>
        <div class="header-top">
            <div class="container">
                <el-row>
                    <el-col :span="12">纵 享 威 士 忌 的 魅 力</el-col>
                    <el-col :span="12">
                        <div class="header-top-right">
                            <ul class="header-links box box-align-center">
                                <li>
                                    <router-link to="/bG9naW4" v-if="!customerInfo.customerLogin">请登录 </router-link>
                                    <div v-else class="text-overflow" style="width:150px;">您好，<b>{{customerInfo.customerName}}</b></div>
                                </li>
                                <li class="spot"></li>
                                <li>
                                    <router-link to="/cmVnaXN0ZXI" v-if="!customerInfo.customerLogin">免费注册</router-link>
                                    <a class="button" @click="exitLogin" v-else>退出</a>
                                </li>
                                <li class="spot"></li>
                                <li>
                                    <a class="button" @click="enter(0)">我的订单</a>
                                </li>
                                <li class="spot"></li>
                                <li>
                                    <a class="button" @click="enter(1)">个人中心</a>
                                </li>
                                <li class="spot"></li>
                                <li>
                                    <router-link to="/aG9tZQ">联系客服</router-link>
                                </li>
                                <li class="spot"></li>
                                <li>
                                    <router-link to="/aG9tZQ">下载APP</router-link>
                                </li>
                            </ul>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="header-mid">
            <div class="container box box-between box-align-center">
                <div class="box">
                    <div class="logo-box">
						<router-link to="/aG9tZQ"><img class="logo" src="../../img/logo.png"></router-link>
                    </div>&nbsp;
                    <h1 class="box box-center">收银台</h1>
                </div>
                <div class="search-box">
                </div>
            </div>
        </div>
        <div class="header-bottom"></div>
    </header>
</div>
</template>

<script>
export default {
    name: 'header',
    props: ["nav"],
    data() {
        return {
            inputSearch: "",
            customerInfo: {},
        }
    },
    methods: {
        searchClick: function(e) {
            if (this.inputSearch.replace(/(^\s*)|(\s*$)/g, "")) {
                this.$router.push('/c2VhcmNo?value=' + this.inputSearch + "&date=" + Date.parse(new Date()));
            }
        },
        exitLogin: function() {
            this.util.deleteCookie("customerLogin");
            this.util.deleteCookie("customerMobile");
            this.util.deleteCookie("customerName");
            this.util.deleteCookie("customerSeq");
            this.util.deleteCookie("token");
            this.customerInfo = {};
            this.$router.push('/bG9naW4');
        },
        enter: function(e){
            if (this.util.getCookie("customerSeq")) {
                let url = ""
                if (e==0) {
                    url="/cGVyc29uYWwvbXlPcmRlcg";
                }else if(e==1){
                    url="/cGVyc29uYWxJbmZv";
                }else if(e==2){
                    url="/c2hvcENhcnQ"
                }
                this.$router.push(url);
            }else {
                this.$router.push('/bG9naW4');
            }
        }
    },
    mounted() {
        if (this.util.getCookie("customerLogin")) {
            this.customerInfo = {
                customerLogin: this.util.getCookie("customerLogin"),
                customerMobile: this.util.getCookie("customerMobile"),
                customerName: this.util.getCookie("customerName"),
                customerSeq: this.util.getCookie("customerSeq"),
            }
        }
        if (this.$route.query.value) {
            let value = this.$route.query.value.replace(/%20/g, " ");
            this.inputSearch = value;
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../css/less-const.less'); //引入less变量
.logo {
    width: 200px;
}
.header-top {
    background-color: #F5F5F5;
    height: 32px;
    line-height: 32px;
    color: #48414A;
    .header-top-right {
        float: right;
    }
    .header-links {
        li {
            padding: 0 8px;
            a {
                padding: 0 8px;
                color: #48414A;
            }
            &.spot {
                padding: 0;
                height: 4px;
                width: 4px;
                background-color: #B2B2B2;
            }
        }
    }
}
.header-mid {
    padding: 15px 0;
}
.header-bottom {
    background-color: #360A2B;
    height: 2px;
}
</style>
