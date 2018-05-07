<template>
<div class="contactUs">
    <perHeader></perHeader>
    <div class="container">
        <el-row :gutter="20">
            <el-col :span="4">
                <leftBar :navNum="'54'" :leftIndex="['5']"></leftBar>
            </el-col>
            <el-col :span="20">
                <div class="help_right">
                    <h4>公司名称：</h4><p class="mt30">惠州市中威酒业有限公司</p>
					<br>
					<h4>公司地址: </h4><p class="mt30">广东省惠州市惠城区江北华贸金融街12号楼103</p>
					<br>
					<h4>联系我们：</h4>
					<p class="mt30">投诉及建议：service@cwhisky.com</p>
					<p class="mt30">客服热线：400-830-5299</p>
					<p class="mt30">工作时间：09:00-18:00</p>
                </div>
            </el-col>
        </el-row>
    </div>
    <perFooter></perFooter>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftBar from './leftBar'
export default {
    name: 'contactUs',
    data() {
        return {}
    },
    components: {
        perHeader,
        leftBar,
        perFooter
    },
    methods:{}
}
</script>

<style lang="less" scoped>
@import url('css/helpCenter.less');
</style>
