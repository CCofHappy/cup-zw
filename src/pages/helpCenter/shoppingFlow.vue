<template>
<div class="mattersConcerned">
    <div class="shoppingFlow">
        <perHeader></perHeader>
        <div class="container">
            <helpTop></helpTop>
            <el-row :gutter="20">
                <el-col :span="4">
                    <leftBar :navNum="'14'" :leftIndex="['1']"></leftBar>
                </el-col>
                <el-col :span="20">
                    <div class="help_right">
                        <h3>威士忌商城购物流程</h3>
                        <p><h4>一、挑选您喜欢的威士忌</h4></p>
                        <p>1.您可以通过分类导航查看商品分类并找到您想要购买的商品。</p>
                        <p class="img-box"><img src="../../img/helpCenter/shoppingFlow1.jpg" width="100%"/></p>
                        <p><h4>二、加入购物车</h4></p>
                        <p>1.在您想要购买的详情页点击“加入购物车”，商品会添加到您的购物车中，您可以继续挑选商品。您也可以点击“立即抢购”，马上结算商品。</p>
                        <p class="img-box"><img src="../../img/helpCenter/shoppingFlow2.jpg" width="100%"/></p>
                        <p>2.购物车商品</p>
                        <p>1) 在购物车中，系统默认每件商品的订购数量为1件，如果您想购买多件商品，可修改购买数量。</p>
                        <p>2) 在购物车中，您可以将商品选择删除，或可以进行清空购物车的操作，重新挑选。</p>
                        <p class="img-box"><img src="../../img/helpCenter/shoppingFlow3.jpg" width="100%"/></p>
                        <p>4) 购物车页面下方的商品依次为：为您推荐的相关商品，若有您需要的商品，点击“放入购物车”即可。</p>
                        <p class="img-box"><img src="../../img/helpCenter/shoppingFlow4.jpg" width="100%"/></p>
                        <p><span class="font-red">*温馨提示：</span></p>
                        <p>1.商品价格会随着市场行情调整，当您看中某款商品时，请及时入手吧。</p>
                        <p>2.账户登录状态下放入购物车的商品，更换电脑后仍可看到购物车中的商品；账户未登录状态下放入购物车的商品，更换电脑后将无法看到购物车中的商品。</p>
                        <p><h4>三、确认购买</h4></p>
                        <p>当您挑选好需购买的商品后，点击购物车的“立即结算”按钮跳转至订单信息页面。</p>
                        <p class="img-box"><img src="../../img/helpCenter/shoppingFlow5.jpg" width="100%"/></p>
                        <h4>四、填写订单信息</h4>
                        <p>1.填写收货人信息：收货人姓名，地址及电话等信息，并点击确认收货地址。</p>
                        <p>请填写正确完整的收货人姓名、收货人联系方式、详细的收货地址和邮编，否则将会影响您订单的处理或配送。您可以进入“我的中威网-账户管理”设置默认收货地址，保存成功后，再购买下单时，可以直接选择使用。</p>
                        <p class="img-box"><img src="../../img/helpCenter/shoppingFlow6.jpg" width="100%"/></p>
                        <p>2.开具发票：填写正确的发票抬头、发票内容为商品明细并确认发票信息。</p>
                        <p class="font-red">*注：订单变成已完成后您联系客服进行补开。</p>
                        <p class="img-box"><img src="../../img/helpCenter/shoppingFlow7.jpg" width="100%"/></p>
                        <p><h4>五、  提交订单</h4></p>
                        <p>1.以上信息核实无误后，请点击“提交订单”，系统生成一个订单号，提示您已经成功提交订单。</p>
                        <p>2.订单提交成功后，您可以登陆“我的账户-订单中心 ”管理订单信息。</p>
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
    name: 'shoppingFlow',
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
