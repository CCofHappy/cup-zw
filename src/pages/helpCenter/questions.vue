<template>
<div class="mattersConcerned">
    <div class="questions">
        <perHeader></perHeader>
        <div class="container">
            <helpTop></helpTop>
            <el-row :gutter="20">
                <el-col :span="4">
                    <leftBar :navNum="'16'" :leftIndex="['1']"></leftBar>
                </el-col>
                <el-col :span="20">
                    <div class="help_right">
                        <div class="title" style="margin-top: 0;">1、问：关于色差？</div>
                        <div class="blockBg">答：中威网所有商品均为实物拍摄，由于光线、像素、个人显示器及个人视觉感观原因，不排除色差的存在。</div>
                        <div class="title">2、问：我用扫码软件扫不出来，这是为什么？</div>
                        <div class="blockBg">答：扫码软件扫描的原理是需要软件开发商收录了这个产品以后，才可以扫描出结果，我们有些产品是新品，软件的开发商没有收录这些产品的条形码（或者二维码），当然扫不出来了，而且各个扫码软件收录的信息也不相同，所以扫码只可以作为参考。</div>
                        <div class="title">3、问：为什么我收的酒瓶盖渗酒？</div>
                        <div class="blockBg">答：酒水在快递运输途中发生少量渗酒属于正常现象，不影响饮用，快递不能始终保持瓶口朝上，再加上偶有在装卸货中遇到问题，故瓶口少量渗酒。（因酒类属特殊商品，为保证货品安全，每瓶酒都采用酒类专用安全包装，以确保在运输途中不会因挤压、碰撞等因素造成破损，目前中威网尚未发生过商品破、漏、损的状况）。</div>
                        <div class="title">4、问：万一我买的酒碎了怎么办？</div>
                        <div class="blockBg">答：万一出现破损，请您尽快将破损照片传给我们客服人员，您可以选择退款，或者要求我们重发，我们核实清楚后，24小时内给您满意的处理结果。如商品是在运输途中破损，中威网承诺24小时内可为您免费补寄1次，倘若再次破损，我们全额退款。</div>
                        <div class="title">5、问：快递送件的时候让我先签收，我要先验货，不然怎么知道有没有问题？</div>
                        <div class="blockBg">答：千万别跟快递纠结，各地的快递素质参差不齐，他们轻而易举就能搞坏您一天的好心情，不要紧，您可以先签收了，然后当着快递员的面打开包装，如果破损请拍照并尽快与我们的客服人员取得联系或直接拒签。</div>
                        <div class="title">6、问：如果在运输途中，赠品漏发和破损怎么办？</div>
                        <div class="blockBg">答：赠品如有漏发、破损，您可提供照片，我们会在您下次购买商品时一起寄出。带来不便，敬请谅解。</div>
                        <div class="title">7、问：我收到的酒标，为什么和以前喝的酒标签不一样？</div>
                        <div class="blockBg">答：因厂家会在没有任何提前通知的情况下更改产品包装或者一些附件，再加上部分产品批次会有不同，中威网商城中的商品图片无法做到实时更新，请以收到的实物为准，对外观要求十分严格的买家，请咨询清楚再拍下商品，详情可咨询客服。</div>
                        <div class="title">8、问：为什么有的酒身上有刮痕？</div>
                        <div class="blockBg">答：某些洋酒瓶身上的刮痕，为国际代码刮痕，而非生产日期，酒的品质不变，请各位知悉。</div>
    					<div class="title">9、问：你们的酒与其它购物网站价格不同，有什么区别吗？</div>
                        <div class="blockBg">答：中威网商城区只从正规渠道采购商品，所有商品必须持有中华人民共和国报关单和卫生证书，以确保出售商品为正品行货。</div>
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
    name: 'questions',
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
