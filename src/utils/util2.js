// var host = "http://qzsc.com";
var host = "http://qzsq.huangxiaoyong.com/";
// var host = "https://qzsq.qztywl.com"
function formatTime(date) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()

	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}
function getAjaxUrl(model) {
	return host + "/index.php/Api2-" + model + ".html";
}
function getAjaxData(model, data, func_s = false, method = "GET") {
	return new Promise((resolve, reject) => {
		var app = getApp();
		app.loading = 1;
		wx.showNavigationBarLoading();
		var url = getAjaxUrl(model);
		data.token = app.globalData.token;//wx.getStorageSync('token');
		wx.request({
			url: url,
			data: data,
			method: method,
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: function (res) {
				app.loading = 0;
        if (res.data.status == 0) {
					wx.hideNavigationBarLoading();
					app.globalData.login = false;
					login().then(() => {
            console.log(data)
						return getAjaxData(model, data, func_s, method);
					})
				} else {
					wx.hideNavigationBarLoading();
					if (typeof func_s === "function") {
						func_s(res);
					}
          resolve(res.data);
				}
			}, fail: function () {
				wx.hideNavigationBarLoading();
				return getAjaxData(model, data, func_s, method);
			}
		})
	})
}

function onShareAppMessage(e) {
	var app = getApp();
	var option = "?scene=" + app.globalData.user.id;
	for (var i in this.options) {
		option += "&" + i + "=" + this.options[i];
	}
	var indexurl = this.route + option;
	//var indexurl = "/pages/index/index?scene=" + app.globalData.user.id;
	var title;
	if (this.data.titlebar) {
		title = this.data.titlebar.title + "-";
	} else if (this.data.title) {
		title = this.data.title + "-";
	} else {
		title = app.globalData.title;
	}
	console.log(indexurl);
	return {
		title: title + app.globalData.title,
		path: indexurl
	}
}
function pay(data, fun_s) {
	getAjaxData("pay", data, function (res) {
		if (res.data.data.status) {
			wx.requestPayment({
				'timeStamp': res.data.data.api.timeStamp + "",
				'nonceStr': res.data.data.api.nonceStr + "",
				'package': res.data.data.api.package + "",
				'signType': 'MD5',
				'paySign': res.data.data.api.paySign + "",
				'success': function (res) {
					fun_s(res);
				},
				'fail': function (res) {
					console.log(res);
				}
			})
		} else {
			fun_s(res);
		}
	}, "POST")
}
function getUserInfo() {
	return new Promise((resolve, reject) => {
		let userInfo = {
			nickName: '小程序会员',
			avatarUrl: '/Tpl/home/jdred/Style/images/user.png'
		}
		wx.getUserInfo({
			success: function (res) {
				userInfo = {
					...userInfo,
					...res.userInfo
				}
				resolve(userInfo)
			},
			fail: function (res) {
				resolve(userInfo)
			}
		})
	})
}
function login(me, scene = wx.getStorageSync('scene')) {
	if (!me) {
		var me = getApp();
	}
	return new Promise((resolve, reject) => {
		getUserInfo().then((userInfo) => {
			wx.login({
				success: function (res) {
					getAjaxData("login", { code: res.code, scene: scene, ...userInfo }, function (result) {
						if (!result.data.data.error) {
							wx.setStorageSync('token', result.data.data.token);
							me.globalData = {
								...me.globalData,
								...result.data.data,
								login: true,
								userInfo: userInfo
							}
							console.log(me.globalData)
							resolve()
						} else {
              wx.setStorageSync('token', "");
              console.log(reject)
              reject(new Error());
							wx.showModal({
								title: '登录失败',
								content: result.data.data.msg,
								success: function (res2) {
									wx.switchTab({
										url: '/pages/index/index',
									})
								}
							})

						}
					}, "POST")
				}
			})
		})
	})
}
function previewimage(e) {
	wx.previewImage({
		urls: [e.currentTarget.dataset.src]
	})
}
function parse_str(e) {
	var preg = new RegExp(/&[^=]*=[^&]*/, "g");
	var array = []
	var data;
	while (data = preg.exec("&" + e)) {
		array.push(data[0].substring(1));
	}
	var obj = {};
	if (array.length > 0) {
		var npreg = new RegExp(/([^=]*)=([^&]*)/);
		for (var i = 0; i < array.length; i++) {
			var d = npreg.exec(array[i]);
			obj[d[1]] = d[2];
		}
		return obj;
	} else {
		return false;
	}
}
/**
 * 初始化联系客服
 */
function contactInit(_this, contaction = false) {
	_this.contact = contact
	_this.setData({
		contaction
	});
}

function contact() {
	this.setData({
		contaction: !this.data.contaction
	});
}
/**
 * 通过定位获取经纬度
 */
function getLocation(fn) {
	wx.getLocation({
		type: 'gcj02',
		success: function (res) {
			const lat = res.latitude
			const lng = res.longitude
			fn({ lat, lng })
		}, fail: rs => {

			wx.authorize({
				scope: 'scope.userLocation',
				success: res => {
					wx.showToast("请下拉刷新！")
				},
				fail: res => {
					console.log('授权失败')
					console.log(res)
				}

			})
		}
	})
}

module.exports = {
	host,
	getAjaxUrl,
	getAjaxData,
	formatTime,
	onShareAppMessage,
	previewimage,
	pay,
	login,
	parse_str,
	contactInit,
	getLocation
}
