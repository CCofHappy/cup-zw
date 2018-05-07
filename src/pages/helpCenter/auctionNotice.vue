<template>
<div class="mattersConcerned">
    <div class="auctionNotice">
        <perHeader></perHeader>
        <div class="container">
        <helpTop></helpTop>
            <el-row :gutter="20">
                <el-col :span="4">
                    <leftBar :navNum="'62'" :leftIndex="['6']"></leftBar>
                </el-col>
                <el-col :span="20">
                    <div class="help_right">
                        <div class="blockBg"><strong>一、来访送拍</strong></div>
                        <div class="textIndent">
                            <p>送拍者可以电话预约后直接携带拍品到我公司洽谈，中威网拍卖部有专业的业务人员接待。</p>
                            <p>工作时间：周一至周五9:30-17:30（若节假日来访，请提前电话预约）</p>
                            <p>公司地址：广东省惠州市惠城区江北华贸金融街12号楼103</p>
                            <p>联系电话：400-830-5299</p>
                        </div>
                        <div class="blockBg"><strong>二、网络送拍</strong></div>
                        <div class="textIndent">
                            <p>送拍者可以将拍品的基本资料在【我要送拍】手工录入，随后将拍品寄往以上公司地址。</p>
                            <p>1、拍品的清晰彩色照片（局部放大图)，每张照片建议不超过1M。</p>
                            <p>2、拍品的详细描述及保留价。</p>
                        </div>
                        <div class="blockBg"><strong>三、费用须知</strong></div>
                        <div class="textIndent">
                            <p>1、拍卖之前我司不收取任何费用。</p>
                            <p>2、拍卖之后：</p>
                            <p>A、若拍品成交，我司会对委托方收取拍品落槌价5%的佣金。</p>
                            <p>B、若拍品流拍，我司不收取您任何费用，原件退还！敬请阁下放心。</p>
                            <div class="title">注意事项：</div>
                            <p>当收藏爱好者对中威网所有送拍的拍品进行鉴定、询价和购买时，如果委托人同意以保留价出售，</p>
                            <p>买卖双方各支付5%的佣金即可成交，后续拍场将不会上拍本件藏品。</p>
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
    name: 'auctionNotice',
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
