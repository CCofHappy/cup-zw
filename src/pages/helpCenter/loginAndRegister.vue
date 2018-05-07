<template>
<div class="mattersConcerned">
    <div class="loginAndRegister">
        <perHeader></perHeader>
        <div class="container">
            <helpTop></helpTop>
            <el-row :gutter="20">
                <el-col :span="4">
                    <leftBar :navNum="'11'" :leftIndex="['1']"></leftBar>
                </el-col>
                <el-col :span="20">
                    <div class="help_right">
                        <h3>如何登录/注册账户</h3>
                        <div>
                            <p><h4>一、注册成为中威网会员</h4></p>
                            <p>1) 通过首页注册。</p>
                            <br>
                            <p class="img-box"><img src="../../img/helpCenter/register.jpeg" width="100%" /></p>
                            <p>2) 您可通过手机号码进行注册，按照提示填写准确信息，点击提交“立即注册”。</p>
                            <p class="img-box"><img src="../../img/helpCenter/register2.jpeg" style="width:60%"/></p>
                            <!-- <p class="font-red">*注：请务必填写正确有效的邮箱地址，找回密码时需要到邮箱查询新密码邮件。 </p> -->
                            <br>
                            <h4>二、注册完成后，点击威士忌商城首页顶部“登录”正常登录账户即可。</h4>
                            <p class="img-box"><img src="../../img/helpCenter/register.jpeg" width="100%" /></p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
    <perFooter></perFooter>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftBar from './leftBar'
import helpTop from './helpTop'

export default {
    name: 'loginAndRegister',
    data() {
        return {}
    },
    components: {
        perHeader,
        leftBar,
        perFooter,
        helpTop
    },
    methods:{}
}
</script>

<style lang="less" scoped>
@import url('css/helpCenter.less');
</style>
