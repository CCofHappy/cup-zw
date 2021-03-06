import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import md5 from 'js-md5';
import config from './components/config/config' //引入参数文件
import util from './components/util/util' //引入公共方法
import VueLazyload from 'vue-lazyload' //vue图片懒加载插件
import Icon from 'vue-svg-icon/Icon.vue' //引入svg图标
import VueAwesomeSwiper from 'vue-awesome-swiper' //引入swiper滑块插件
import 'swiper/dist/css/swiper.css' //引入swiper滑块样式
import 'element-ui/lib/theme-chalk/index.css' //引入el UI框架的样式
import '!style-loader!css-loader!less-loader!./css/common.less' //公共样式
import '!style-loader!css-loader!less-loader!./css/elReset.less' //重置el UI框架的样式
import 'vue2-animate/dist/vue2-animate.min.css'; //引入animate库
import LoadError from './components/util/loadError.vue'
import NoData from './components/util/noData.vue'
import scrollTop from './components/scrollTop/scrollTop.vue'
import VueQArt from 'vue-qart'

Vue.prototype.util = util;
Vue.prototype.config = config;
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;//promise 的 HTTP 库，主要用于ajax请求
Vue.prototype.md5 = md5;//md5加密
Vue.component('icon', Icon); //svg icon
Vue.component('NoData', NoData); //没有数据的模版组件
Vue.component('LoadError', LoadError); //载入错误的模版组件
Vue.component('scrollTop', scrollTop); //回到顶部模版组件
Vue.component('vue-q-art', VueQArt); //生成二维码模版组件
Vue.use(ElementUI);//配置使用el UI框架的样式
Vue.use(VueAwesomeSwiper);//配置使用swiper滑块插件
Vue.use(VueLazyload, {
	//配置参数，根据实际需要配置
})//图片懒加载配置

//ajax请求数据
Vue.prototype.axios=axios;
Vue.prototype.ajaxData = function(params, cb, errorcb) {
	let customerInfo = this.util.getCookie('customerInfo');
	axios({
		method: params.apiMethod || "POST",
		url: params.apiUrl,
		headers: {
			'Content-type': 'application/json;charset=UTF-8',
			'Authentication': customerInfo?customerInfo.keyCode : "",
		},
		data: params || {},
	})
	.then((res)=> {
		cb&&cb(res);
	})
	.catch((err)=> {
		if (errorcb) {
			errorcb(err)
		}else {
			console.log(err);
		}
	});
};

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})
