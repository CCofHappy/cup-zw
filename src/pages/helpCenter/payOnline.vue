<template>
<div class="mattersConcerned">
	<div class="payOnline">
	    <perHeader></perHeader>
	    <div class="container">
	        <helpTop></helpTop>
	        <el-row :gutter="20">
	            <el-col :span="4">
	                <leftBar :navNum="'22'" :leftIndex="['2']"></leftBar>
	            </el-col>
	            <el-col :span="20">
	                <div class="help_right">
	                    <h3>在线支付</h3>
	                    <p><h4>一、在线支付平台</h4></p>
	                    <p>中国银联银行卡在线支付网关支持国内18家银行的借记卡和信用卡：工商银行、农业银行、中国银行、建设银行、交通银行、招商银行、兴业银行、浦发银行、广东发展银行、中信银行、民生银行、中国邮政、东亚银行、南京银行、渤海银行、中国光大银行、华夏银行、深圳发展银行。</p>
						<p><div class="font-red">支付宝账号：chinawhisky@hotmail.com</div></p>
	                    <p><h4>二、支付平台详情介绍</h4></p>
	                    <p class="img-box"><img src="http://pic.secoo.com/imagesNew/featuresPic/r_help/zxzf.gif" width="100%" /></p>
						<p><h4>三、银行卡的开通</h4></p>
	                    <p>因各地银行政策不同，建议您在网上支付前拨打所在地银行电话，咨询该行可供网上支付的银行卡种类及开通手续。</p>
						<p><h4>四、支付金额上限</h4></p>
	                    <p>目前各银行对于网上支付均有一定金额的限制，由于各银行政策不同，建议您在申请网上支付功能时向银行咨询相关事宜。</p>
						<p><h4>五、到款时间</h4></p>
	                    <p>网上支付均是支付成功即到账。若由于网络故障导致您已支付成功的订单未改变订单状态，请您联系我们的客服人员为您解决 客服热线：400-830-5299</p>
						<p><div class="font-red">*温馨提示：商品加入购物车后请您及时付款，我们以付款先后顺序为您安排发货，否则我们将不会保留您的订单。</div></p>
					</div>
	            </el-col>
	        </el-row>
	    </div>
	    <perFooter></perFooter>
	</div>
</div>
</template>
<script>
import perHeader from '@/components/header/header'
import perFooter from '@/components/footer/footer'
import leftBar from './leftBar'
import helpTop from './helpTop'
export default {
    name: 'payOnline',
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
