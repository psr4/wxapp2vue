  let commonWeapp = require('@/common/js/Weapp') 
  let wx = commonWeapp.wx
  let getApp = commonWeapp.getApp
  let App = commonWeapp.App
  let Page = commonWeapp.Page
// var host = "https://ol.qztywl.com";
var host = "https://ol.50i8a.cn"

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
	return host + "/index.php/Api1-" + model + ".html";
}
function getAjaxData(model, data, func_s, method = "GET") {
	var app = getApp();
	if (app.globalData.login !== true && model != "login") {
		login().then(() => {
			getAjaxData(model, data, func_s, method);
		});
		return;
	}
	app.loading = 1;
	wx.showLoading({
		title: '加载中',
		mask: true
	})
	var url = getAjaxUrl(model);
	wx.request({
		url: url,
		data: data,
		method: method,
		header: Object.assign({
			"Content-Type": "application/x-www-form-urlencoded"
		}, app.globalData.token ? {
			'Cookie': 'PHPSESSID=' + app.globalData.token
		} : {}),
		success: function (res) {
			app.loading = 0;
			if (res.data.token) {
				app.globalData.token = res.data.token
			}
			if (res.data.status == 0) {
				wx.hideLoading();
				app.globalData.login = false;
				login().then(() => {
					getAjaxData(model, data, func_s, method);
				})
			} else {
				wx.hideLoading();
				func_s(res);
			}
		}, fail: function () {
			wx.hideLoading();
			getAjaxData(model, data, func_s, method);
		}
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

function login() {
	var me = getApp();
	var scene = wx.getStorageSync('scene')
	return new Promise((resolve, reject) => {
		wx.login({
			success: function (res) {
				getAjaxData("login", { code: res.code, scene: scene }, function (result) {
					const canGet = wx.canIUse('getUserInfo')
					me.globalData.login = true;
					me.globalData.user = result.data.data.user;

					if (result.data.data.needLogin) {
						if (canGet) {
							wx.getUserInfo({
								success: function (res) {
									updateUserInfo(res, me).then(() => {
										resolve()
									});
								},
								fail: function () {
									wx.navigateTo({
										url: '/pages/login/login',
									})
								}
							})
						} else {
							wx.navigateTo({
								url: '/pages/login/login',
							})
						}
					} else {
						resolve()
					}
				}, "POST")
			}
		})
	})
}
function updateUserInfo(res, app) {
	return new Promise((resolve, reject) => {
		if (res.encryptedData) {
			res.userInfo.encryptedData = res.encryptedData;
			res.userInfo.iv = res.iv;
			getAjaxData("userinfo", res.userInfo, function (res) {
				getApp().globalData.user = res.data.data.user
				resolve()
			}, "POST");
		}
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
	updateUserInfo
}
