import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{ //地址为空时跳转index页面
			path: '',
			redirect: '/d2Vic2l0ZQ'
		},
		{
			//官网
			name: 'website',
			path: '/d2Vic2l0ZQ',
			component: resolve => require(['../pages/website/website'], resolve),
			children: [],
		},
		{
			//品牌列表
			name: 'brandList',
			path: '/YnJhbmRMaXN0',
			component: resolve => require(['../pages/brandList/brandList'], resolve),
			children: []
		},
		{
			//品牌详情
			name: 'brandDetail',
			path: '/YnJhbmREZXRhaWw',
			component: resolve => require(['../pages/brandDetail/brandDetail'], resolve),
			children: []
		},
		{
			//首页
			name: 'home',
			path: '/aG9tZQ',
			component: resolve => require(['../pages/home/home'], resolve),
			children: []
		},
		{
			//搜索商品
			name: 'search',
			path: '/c2VhcmNo',
			component: resolve => require(['../pages/search/search'], resolve),
			children: []
		},
		{
			//全部商品
			name: 'allGoods',
			path: '/YWxsR29vZHM',
			component: resolve => require(['../pages/allGoods/allGoods'], resolve),
			children: []
		},
		{
			//限时抢购
			name: 'limitGoods',
			path: '/bGltaXRHb29kcw',
			component: resolve => require(['../pages/limitGoods/limitGoods'], resolve),
			children: []
		},
		{
			//新酒发布
			name: 'newGoods',
			path: '/bmV3R29vZHM',
			component: resolve => require(['../pages/newGoods/newGoods'], resolve),
			children: []
		},
		{
			//得奖威士忌
			name: 'prizeGoods',
			path: '/cHJpemVHb29kcw',
			component: resolve => require(['../pages/prizeGoods/prizeGoods'], resolve), //懒加载
			children: []
		},
		{
			//商品详情
			name: 'goodsDetail',
			path: '/Z29vZHNEZXRhaWw',
			component: resolve => require(['../pages/goodsDetail/goodsDetail'], resolve),
			children: []
		},
		{
			//用户登录
			name: 'login',
			path: '/bG9naW4',
			component: resolve => require(['../pages/login/login'], resolve), //懒加载
			children: []
		},
		{
			//忘记密码
			name: 'forgetPassword',
			path: '/Zm9yZ2V0UGFzc3dvcmQ',
			component: resolve => require(['../pages/forgetPassword/forgetPassword'], resolve), //懒加载
			children: []
		},
		{
			//注册
			name: 'register',
			path: '/cmVnaXN0ZXI',
			component: resolve => require(['../pages/register/register'], resolve), //懒加载
			children: [{
					path: '',
					redirect: '/cmVnaXN0ZXI/dXNlcg'
				},
				{
					//普通用户注册
					name: 'registerUser',
					path: 'dXNlcg',
					component: resolve => require(['../pages/register/user'], resolve), //懒加载
				},
				{
					//采购商注册
					name: 'registerPurchaser',
					path: 'cHVyY2hhc2Vy',
					component: resolve => require(['../pages/register/purchaser'], resolve), //懒加载
				},
				{
					//供应商注册
					name: 'registerSupply',
					path: 'c3VwcGx5',
					component: resolve => require(['../pages/register/supply'], resolve), //懒加载
				},
			]
		},
		{
			//购物车
			name: 'shopCart',
			path: '/c2hvcENhcnQ',
			component: resolve => require(['../pages/cart/shopCart'], resolve),
			children: []
		},
		{
			//订单结算
			name: 'getOrderInfo',
			path: '/Z2V0T3JkZXJJbmZv',
			component: resolve => require(['../pages/cart/getOrderInfo'], resolve),
			children: []
		},
		{
			//选择支付方式
			name: 'chosePay',
			path: '/Y2hvc2VQYXk',
			component: resolve => require(['../pages/cart/chosePay'], resolve),
			children: []
		},
		{
			//微信支付
			name: 'wxPay',
			path: '/d3hQYXk',
			component: resolve => require(['../pages/cart/wxPay'], resolve),
			children: []
		},
		{
			//支付成功
			name: 'paySuccess',
			path: '/cGF5U3VjY2Vzcw',
			component: resolve => require(['../pages/cart/paySuccess'], resolve),
			children: []
		},
		{
			//订单详情
			name: "orderDetail",
			path: '/b3JkZXJEZXRhaWw',
			component: resolve => require(['../pages/cart/orderDetail'], resolve),
			children: []
		},
		{
			//物流详情
			name: 'logisticsDetail',
			path: '/bG9naXN0aWNzRGV0YWls',
			component: resolve => require(['../pages/cart/logisticsDetail'], resolve),
			children: []
		},
		{
			//退货退款
			name: 'returnRefund',
			path: '/cmV0dXJuUmVmdW5k',
			component: resolve => require(['../pages/cart/returnRefund'], resolve),
			children: []
		},
		{
			//我的订单
			name: "myOrder",
			path: '/cGVyc29uYWwvbXlPcmRlcg',
			component: resolve => require(['../pages/personal/myOrder'], resolve),
			children: []
		},
		{
			//售后服务
			name: "saleService",
			path: '/c2FsZVNlcnZpY2U',
			component: resolve => require(['../pages/personal/saleService'], resolve),
			children: []
		},
		{
			//申请售后
			name: "applyAfterSale",
			path: '/YXBwbHlBZnRlclNhbGU',
			component: resolve => require(['../pages/personal/applyAfterSale'], resolve),
			children: []
		},
		{
			//我要采购
			name: "myPurchase",
			path: '/bXlQdXJjaGFzZQ',
			component: resolve => require(['../pages/personal/myPurchase'], resolve),
			children: []
		},
		{
			//我的需求单
			name: "myDemand",
			path: '/bXlEZW1hbmQ',
			component: resolve => require(['../pages/personal/myDemand'], resolve),
			children: []
		},
		{
			//我要采购
			name: "myInventory",
			path: '/bXlJbnZlbnRvcnk',
			component: resolve => require(['../pages/personal/myInventory'], resolve),
			children: []
		},
		{
			//我的商品
			name: "myGoods",
			path: '/bXlHb29kcw',
			component: resolve => require(['../pages/personal/myGoods'], resolve),
			children: []
		},
		{
			//新增商品
			name: "addGoods",
			path: '/YWRkR29vZHM',
			component: resolve => require(['../pages/personal/addGoods'], resolve),
			children: []
		},
		{
			//选择录入商品
			name: "choseAdd",
			path: '/Y2hvc2VBZGQ',
			component: resolve => require(['../pages/personal/choseAdd'], resolve),
			children: []
		},
		{
			//手动录入商品
			name: "handAdd",
			path: '/aGFuZEFkZA',
			component: resolve => require(['../pages/personal/handAdd'], resolve),
			children: []
		},
		{
			//我的销售单
			name: "salesSlip",
			path: '/c2FsZXNTbGlw',
			component: resolve => require(['../pages/personal/salesSlip'], resolve),
			children: []
		},
		{
			//个人信息
			name: 'personalInfo',
			path: '/cGVyc29uYWxJbmZv',
			component: resolve => require(['../pages/personal/personalInfo'], resolve),
			children: []
		},
		{
			//账户安全
			name: 'accountSafty',
			path: '/YWNjb3VudFNhZnR5',
			component: resolve => require(['../pages/personal/accountSafty'], resolve),
			children: []
		},
		{
			//收货地址
			name: 'myAddressList',
			path: '/bXlBZHJlc3NMaXN0',
			component: resolve => require(['../pages/personal/myAddressList'], resolve),
			children: []
		},
		{
			//消费记录
			name: 'myConsumeRecord',
			path: '/bXlDb25zdW1lUmVjb3Jk',
			component: resolve => require(['../pages/personal/myConsumeRecord'], resolve),
			children: []
		},
		{
			//我的关注
			name: 'myFocus',
			path: '/bXlhdHRlbnRpb24K',
			component: resolve => require(['../pages/personal/myFocus'], resolve),
			children: []
		},
		{
			//我的浏览历史
			name: 'myHistory',
			path: '/bXlIaXN0b3J5',
			component: resolve => require(['../pages/personal/myHistory'], resolve),
			children: []
		},
		{
			//收益明细
			name: "incomeDetail",
			path: '/aW5jb21lRGV0YWls',
			component: resolve => require(['../pages/personal/incomeDetail'], resolve),
			children: []
		},
		{
			//我的客户
			name: "myCustomer",
			path: '/bXlDdXN0b21lcg',
			component: resolve => require(['../pages/personal/myCustomer'], resolve),
			children: []
		},
		{
			//如何登录与注册
			name: 'loginAndRegister',
			path: '/bG9naW5BbmRSZWdpc3Rlcg',
			component: resolve => require(['../pages/helpCenter/loginAndRegister'], resolve),
			children: []
		},
		{
			//用户注册协议指南
			name: 'newerGuid',
			path: '/bmV3ZXJHdWlk',
			component: resolve => require(['../pages/helpCenter/newerGuid'], resolve),
			children: []
		},
		{
			//找回密码
			name: 'findBackPwd',
			path: '/ZmluZEJhY2tQd2Q=',
			component: resolve => require(['../pages/helpCenter/findBackPwd'], resolve),
			children: []
		},
		{
			//购物流程
			name: 'shoppingFlow',
			path: '/c2hvcHBpbmdGbG93',
			component: resolve => require(['../pages/helpCenter/shoppingFlow'], resolve),
			children: []
		},
		{
			//免责声明
			name: 'disclaimer',
			path: '/ZGlzY2xhaW1lcg==',
			component: resolve => require(['../pages/helpCenter/disclaimer'], resolve),
			children: []
		},
		{
			//在线支付
			name: 'payOnline',
			path: '/cGF5T25saW5l',
			component: resolve => require(['../pages/helpCenter/payOnline'], resolve),
			children: []
		},
		{
			//银行汇款
			name: 'bankPay',
			path: '/YmFua1BheQ',
			component: resolve => require(['../pages/helpCenter/bankPay'], resolve),
			children: []
		},
		{
			//发票说明
			name: 'invoiceIntr',
			path: '/aW52b2ljZUludHI=',
			component: resolve => require(['../pages/helpCenter/invoiceIntr'], resolve),
			children: []
		},
		{
			//配送政策
			name: 'deliveryPolicy',
			path: '/ZGVsaXZlcnlQb2xpY3k=',
			component: resolve => require(['../pages/helpCenter/deliveryPolicy'], resolve),
			children: []
		},
		{
			//配送时间及范围
			name: 'deliveryTime',
			path: '/ZGVsaXZlcnlUaW1l',
			component: resolve => require(['../pages/helpCenter/deliveryTime'], resolve),
			children: []
		},
		{
			//商品验货及验收
			name: 'goodsInspection',
			path: '/Z29vZHNJbnNwZWN0aW9u',
			component: resolve => require(['../pages/helpCenter/goodsInspection'], resolve),
			children: []
		},
		{
			//退货说明
			name: 'returnBackGoods',
			path: '/cmV0dXJuQmFja0dvb2Rz',
			component: resolve => require(['../pages/helpCenter/returnBackGoods'], resolve),
			children: []
		},
		{
			//退货流程
			name: 'returnGoodsFlow',
			path: '/cmV0dXJuR29vZHNGbG93',
			component: resolve => require(['../pages/helpCenter/returnGoodsFlow'], resolve),
			children: []
		},
		{
			//退款方式及时间
			name: 'returnGoodsType',
			path: '/cmV0dXJuR29vZHNUeXBl',
			component: resolve => require(['../pages/helpCenter/returnGoodsType'], resolve),
			children: []
		},
		{
			//常见问题
			name: 'questions',
			path: '/cXVlc3Rpb25z',
			component: resolve => require(['../pages/helpCenter/questions'], resolve),
			children: []
		},
		{
			//关于我们
			name: 'aboutUs',
			path: '/YWJvdXRVcw',
			component: resolve => require(['../pages/helpCenter/aboutUs'], resolve),
			children: []
		},
		{
			//品质保障
			name: 'qualityAssurance',
			path: '/cXVhbGl0eUFzc3VyYW5jZQ',
			component: resolve => require(['../pages/helpCenter/qualityAssurance'], resolve),
			children: []
		},
		{
			//加入我们
			name: 'joinUs',
			path: '/am9pblVz',
			component: resolve => require(['../pages/helpCenter/joinUs'], resolve),
			children: []
		},
		{
			//联系我们
			name: 'contactUs',
			path: '/Y29udGFjdFVz',
			component: resolve => require(['../pages/helpCenter/contactUs'], resolve),
			children: []
		},
		{
			//拍卖法
			name: 'auctionPolicy',
			path: '/YXVjdGlvblBvbGljeQ',
			component: resolve => require(['../pages/helpCenter/auctionPolicy'], resolve),
			children: []
		},
		{
			//送拍须知
			name: 'auctionNotice',
			path: '/YXVjdGlvbk5vdGljZQ',
			component: resolve => require(['../pages/helpCenter/auctionNotice'], resolve),
			children: []
		},
		{
			//拍品征集公告
			name: 'auctionAdvice',
			path: '/YXVjdGlvbkFkdmljZQ',
			component: resolve => require(['../pages/helpCenter/auctionAdvice'], resolve),
			children: []
		},
		//地址无匹配跳转到错误页面
		{
			name: 'error',
			path: '*',
			component: resolve => require(['../pages/error/error'], resolve),
		}
	],
	//跳转新页面回到顶部，前进和后退保持原有滚动距离
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0, y: 0
			}
		}
	}
})
