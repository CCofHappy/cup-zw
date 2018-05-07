<template>
<div class="mattersConcerned">
    <div class="auctionAdvice">
        <perHeader></perHeader>
        <div class="container">
            <helpTop></helpTop>
            <el-row :gutter="20">
                <el-col :span="4">
                    <leftBar :navNum="'63'" :leftIndex="['6']"></leftBar>
                </el-col>
                <el-col :span="20">
                    <div class="help_right">
                        <h3>中威网拍品征集公告</h3>
                        <p>中威网拍卖区是一个公平的单一麦芽威士忌拍卖平台。2017年度网络拍卖专场项目现已全面启动，征集工作随之展开，诚邀各位威士忌爱好者踊跃投递藏品。我们将用心为您服务，期待与您携手并进，共同开启新的征程。</p>
                        
                        <div class="tit"><span>征集范围：</span>单一麦芽威士忌</div>
                        <div class="tit"><span>佣金比例：</span>成交收取5%的佣金，流拍不收取任何费用</div>
                        <div class="tit"><span>征集程序：</span></div>
                        <p>一. 您可提前联络客服详询拍卖专场事宜</p>
                        <p>二. 了解清楚后把拍品寄送到中威网指定地址，并附上拍品详细资料与保留价</p>
                        <p>三. 中威网拍摄工作人员拍照后，由信息录入员将您的拍品信息录入至拍卖区，待你确认上拍后即可等待拍卖，拍品会保留在中威网拍卖库房中直至拍卖结束。</p>

                        <div class="tit"><span>拍卖网址：</span>www.cwhisky.com</div>
                        <p><span>咨询热线：</span>400-830-5299</p>
                        <p><span>传真：</span>+086-752-2299269</p>
                        <p><span>邮箱：</span>service@cwhisky.com</p>
                        <p><span>邮编：</span>516001</p>
                        <p><span>公司地址：</span>中国广东省惠州市惠城区江北文昌一路华贸金融街12号楼103</p>
                        <!-- <img src="../../img/auction-adv.jpeg" width="40%"> -->
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
    name: 'auctionAdvice',
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
