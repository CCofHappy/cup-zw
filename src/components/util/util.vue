<!-- 公共方法 -->
<script type="text/javascript">
const util = {
	setCookie: function(name, value, days) { //存储cookie
		let d = new Date;
		let ds = days || 0.5;
		let vs = value;
		d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * ds);
		if (typeof value == 'object') vs = JSON.stringify(value)
		window.document.cookie = name + "=" + vs + ";path=/;expires=" + d.toGMTString();
	},

	getCookie: function(name) { //获取cookie
		let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		let vs = v ? v[2] : null;
		if (typeof vs == 'string') {
	        try {
	            let obj = JSON.parse(vs);
	            if(typeof obj == 'object' && obj ){
	                return obj;
	            }else{
	                return vs;
	            }
	        } catch(e) {
	            return vs;
	        }
    	}
	},

	deleteCookie: function(name) { //清除cookie
		this.setCookie(name, '', -1);
	},

	sendCode: function(that, params) { //发送验证码
		let _this = this;
		that.$ajax.post(that.config.commonApi + "common/core/phoneCode", params)
			.then(function(res) {
				if (res.data.code == "0000") {
					that.sendMessage = true;
					_this.sendCountDown(that);
				} else {
					that.$message.error(res.data.message);
				}
			})
			.catch(err => console.log(err));
	},

	sendCountDown: function(that) { //发送验证码倒计时
		if (that.codeTime == 0) {
			that.codeTime = 60;
			that.sendMessage = false;
			return;
		} else {
			that.codeTime = that.codeTime - 1;
		}
		setTimeout(function() {
			sendCountDown(that);
		}, 1000)
	},

	checkTel: function(tel) {
		if (/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(tel)) {
			return false;
		} else {
			return true;
		}
	},

	checkPhone: function(phone) {
		if (/^0\d{2,3}-?\d{7,8}$/.test(phone)) {
			return false;
		} else {
			return true;
		}
	},

	checkEmail: function(email) {
		let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		if (reg.test(email)) {
			return false;
		} else {
			return true;
		}
	},

	formatDate: function(date, fmt) {
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		};
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + '';
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
			}
		}
		return fmt;
	},

	//时间戳转变日期时间
	forDate: function(time, type) { //time:时间戳 ; type: 字符串 "yyyy-MM-dd hh:mm:ss" 转化的格式
		let date = new Date(time);
		return this.formatDate(date, type);
	},

	getRandom: function(arr, count) { //从arr随机选取count个元素
		let shuffled = arr.slice(0),
			i = arr.length,
			min = i - count,
			temp, index;
		while (i-- > min) {
			index = Math.floor((i + 1) * Math.random());
			temp = shuffled[index];
			shuffled[index] = shuffled[i];
			shuffled[i] = temp;
		}
		return shuffled.slice(min);
	},

	//检测token，判断是否登录，不存在跳转到登录页面
	returnLogin: function(that) {
		if (!this.getCookie('customerInfo')) {
			that.$router.push('/bG9naW4');
		}
	},
}

export default util;
</script>
