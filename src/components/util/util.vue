<!-- 公共方法 -->
<script type="text/javascript">
// countDown: function(time) {//倒计时
// 	var p = time - window.serverTime,
// 		u = 1000,
// 		w = u * 60,
// 		m = w * 60;
// 	if (p > 0) {
// 		var z = Math.floor(p / m),
// 			r = Math.floor((p % m) / w),
// 			x = Math.floor((p % w) / u);
// 		z = (String(z).length >= 2) ? z : "0" + z;
// 		r = (String(r).length >= 2) ? r : "0" + r;
// 		x = (String(x).length >= 2) ? x : "0" + x;
// 		var arr = {
// 			hour: z,
// 			minute: r,
// 			second: x,
// 		}
// 		return arr;
// 	} else {
// 		return false;
// 	}
// };

function setCookie(name, value, days) { //存储cookie
	var d = new Date;
	var days = days ? days : 0.5;
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
	window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
};

function getCookie(name) { //获取cookie
	var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
};

function deleteCookie(name) { //清除cookie
	this.setCookie(name, '', -1);
};

function sendCode(that,params) {//发送验证码
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
}

function sendCountDown(that) { //发送验证码倒计时
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
}

function checkTel(tel){
	if(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(tel)){
		return false;
	}else {
		return true;
	}
}

function checkPhone(phone){
	if(/^0\d{2,3}-?\d{7,8}$/.test(phone)){
		return false;
	}else {
		return true;
	}
}

function checkEmail(email){
	let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(reg.test(email)){
		return false;
	}else {
		return true;
	}
}

function formatDate (date, fmt) {
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
};

//时间戳转变日期时间
function forDate(time,type) {//time:时间戳 ; type: 字符串 "yyyy-MM-dd hh:mm:ss" 转化的格式
    var date = new Date(time);
	return this.formatDate(date, type);
};

function getRandom(arr, count) {//从arr随机选取count个元素
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
};

//检测token，判断是否登录，不存在跳转到登录页面
function returnLogin(that){
	if (!this.getCookie('token')) {
		that.$router.push('/bG9naW4');
	}
}

export default {
	setCookie,
	getCookie,
	deleteCookie,
	sendCode,
	sendCountDown,
	checkTel,
	checkPhone,
	checkEmail,
	formatDate,
	forDate,
	getRandom,
	returnLogin,
}
</script>
