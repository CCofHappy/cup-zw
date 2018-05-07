<template>
<div class="mattersConcerned">
    <div class="findBackPwd">
        <perHeader></perHeader>
        <div class="container">
        <helpTop></helpTop>
            <el-row :gutter="20">
                <el-col :span="4">
                    <leftBar :navNum="'12'" :leftIndex="['1']"></leftBar>
                </el-col>
                <el-col :span="20">
                    <div class="help_right">
                        <h3>⊙ 如何找回密码</h3>
                        <div>
                            <p><h4>一、登陆找回密码</h4></p>
                            <p>1.在商城登录页面，点击“忘记密码”。</p>
                            <p class="img-box"><img src="../../img/helpCenter/forgetPwd.jpeg" /></p>
                            <p>2.请输入您在登录时使用的用户名/手机号及图形验证码，点击“下一步”。</p>
                            <p class="img-box"><img src="../../img/helpCenter/forgetPwd1.jpeg" /></p>
                            <p>3.提示密码设置成功，操作完成。</p>
                            <p class="img-box"><img src="../../img/helpCenter/forgetPwd2.jpeg" /></p>
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
    name: 'findBackPwd',
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
