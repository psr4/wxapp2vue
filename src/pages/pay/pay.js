//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
Page({
	data: {
		titlebar: {
			title: "订单支付",
			back: 1
		},
		address: false,
		num: 0,
		cart: [],
		totalmoney: 0,
		system_num: 0,
		sendprice: 0.00,
		yh: 0.00,
		list: [0],
    yunfei: 0
  },
  
	gopay() {
		var address = this.data.address;
		if (!address) {
			wx.showModal({
				title: '提示',
				content: '请选择收货地址!',
				success() {
					wx.navigateTo({
						url: '/pages/address/address?method=chooseaddress',
					})
				}
			})
		} else {
			var cart = [];
			for (var i = 0; i < this.data.cart.length; i++) {
				var item = {
					num: this.data.cart[i].num,
					id: this.data.cart[i].id
				}
				cart.splice(i, 0, item);
			}
			if (this.data.discount) {
				var discount = this.data.discount.id;
			} else {
				var discount = 0
			}
			util.getAjaxData("gopay", {
				cart: JSON.stringify(cart),
				discount: discount, sendmodel: this.data.sendmodel + 1, ms: this.data.ms, address: app.globalData.defaultaddress.id
			}, function (res) {
				wx.showToast({
					title: res.data.dialog
				})
				if (res.data.msg == "ok") {
					app.globalData.discount = null;
					wx.setStorageSync('buy', []);
					wx.setStorageSync('cart', []);
					if (res.data.data) {
						wx.redirectTo({
							url: '/pages/dopay/dopay?id=' + res.data.data,
						})
					}
				}
			}, "POST")
		}

	},
	textInput(e) {
		this.setData({
			ms: e.detail.value
		})
	},
	bindChange1(e) {
		var num = e.detail.value[0];
		var price;
		if (num === 0) {
			price = this.data.yunfei.pingyou;
		} else if (num === 1) {
			price = this.data.yunfei.kuaidi;
		} else if (num === 2) {
			price = this.data.yunfei.ems;
		}
		this.setData({
			sendprice: price.toFixed(2),
			sendmodel: num
		})
	},
	onLoad(options) {
    util.contactInit(this);
		var me = this;
		util.getAjaxData("initpay", {}, function (res) {
			var enough = parseFloat(res.data.data.enough);
			var express = parseFloat(res.data.data.express);
			var carts = wx.getStorageSync('buy');
			if (carts.length > 0) {
				var totalmoney = 0;
				var yunfei = express;
				for (var i = 0; i < carts.length; i++) {
					totalmoney += carts[i].price * carts[i].num;
				}
				if (totalmoney > enough) {
					console.log(totalmoney);
					yunfei = 0;
				}
				me.setData({
					enough: enough,
					express: express,
					cart: carts,
					yunfei: yunfei,
					totalmoney: totalmoney.toFixed(2)
				})
			} else {
				wx.showModal({
					title: '提示',
					content: '请选择一些商品!',
					success() {
						wx.navigateTo({
							url: '/pages/index/index',
						})
					}
				})
			}
		}, "POST");
	},
	onShow: function () {
		var discount = app.globalData.discount;
		var totalmoney = 0;
		var yh = 0;
		if (discount) {
			console.log(discount);
			yh = parseFloat(discount.price);
		}
		this.setData({
			address: app.globalData.defaultaddress,
			discount: discount,
			yh: yh.toFixed(2)
		})
	},
	onPullDownRefresh: function () {
		this.onShow();
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage
})