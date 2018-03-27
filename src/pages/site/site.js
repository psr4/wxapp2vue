// pages/product/product.js
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js')
var app = getApp()
Page({
	data: {
		select: {},
		nownum: 1,
    show: 0
  },
 
	onLoad: function (options) {
    util.contactInit(this);
		util.getAjaxData("reserver", this.options, (res) => {
			if (!res.data.data.item.id) {
				wx.showModal({
					title: '读取失败',
					content: "未找到对应商品!",
					success: function (res) {
						wx.navigateBack()
					}
				})
			} else {
				this.setData({
					item: res.data.data.item,
					detail: res.data.data.detail,
					price: res.data.data.item.price,
					page: res.data.data.page,
					p: 1
				})
				WxParse.wxParse('article', 'html', res.data.data.item.info, this, 0);
			}
		});
	},
	onReachBottom() {
		this.loadDetail();
	},
	loadDetail() {
		if (!this.data.loading) {
			this.setData({
				loading: true
			})
			var me = this;
			var p = this.data.p + 1;
			if (p <= parseInt(this.data.page)) {
				util.getAjaxData("reserver", { p: p, method: "order" }, function (res) {
					me.setData({
						detail: me.data.detail.concat(res.data.data.detail),
						p: p,
						page: res.data.data.page,
						loading: false
					})
				});
			}
		}
	},
	choose(e) {
		var index = e.currentTarget.dataset.index;
		var key = e.currentTarget.dataset.key;
		var text = e.currentTarget.dataset.text;
		var select = this.data.select;
		select["data" + index] = key;
		this.setData({
			select: select
		})
	},
	buy(e) {
		var method = e.currentTarget.dataset.method;
		this.setData({
			method: method,
			buy: 1
		})
	},
	changenum(e) {
		var method = e.currentTarget.dataset.id;
		var nownum = this.data.nownum;
		if (method == "sub" && nownum > 1) {
			nownum--;
		} else if (method == "add") {
			nownum++;
		}
		var price = parseInt(nownum) * parseFloat(this.data.item.price);

		this.setData({
			nownum: nownum,
			price: price.toFixed(2)
		})
	},
	showwrapper(e) {
		var show = !this.data.show;
		console.log(show);
		this.setData({
			show: show
		})
	},
	formSubmit(e) {
		var data = e.detail.value;
		var select = this.data.select;
		for (var i in select) {
			data[i] = select[i]
		}
		var diydata = this.data.item.diydata;
		for (var i = 0; i < diydata.length; i++) {
			if ((!data["data" + i] || data["data" + i] === "") && data["data" + i] !== 0 && diydata[i].require == "required") {
				wx.showModal({
					title: '提示',
					showCancel: false,
					content: '请填写' + diydata[i].name,
				})
				return;
			}
		}
		data.num = this.data.nownum;
		data.id = this.options.id;
		util.getAjaxData("reserver_pay", data, (res) => {
			if (res.data.msg == "no") {
				wx.showModal({
					title: '提示',
					showCancel: false,
					content: res.data.data,
				})
			} else if (res.data.msg == "pay") {
				wx.requestPayment({
					'timeStamp': res.data.data.api.timeStamp + "",
					'nonceStr': res.data.data.api.nonceStr + "",
					'package': res.data.data.api.package + "",
					'signType': 'MD5',
					'paySign': res.data.data.api.paySign + "",
					'success': function (res) {
						wx.showModal({
							title: '提示',
							content: '支付成功!',
							showCancel: false,
							success() {
								wx.redirectTo({
									url: 'order',
								})
							}
						})
					},
					'fail': function (res) {
						wx.showModal({
							title: '提示',
							content: '支付失败!',
							success() {
								wx.redirectTo({
									url: 'order',
								})
							}
						})
					}
				})
			} else if (res.data.msg == "ok") {
				wx.showModal({
					title: '提示',
					content: res.data.data,
					success() {
						wx.redirectTo({
							url: 'order',
						})
					}
				})
			}
		}, "post");
	},
	onPullDownRefresh: function () {
		this.onLoad();
		this.setDate({
			address: app.globalData.defaultaddress
		})
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage,
	previewimage: util.previewimage
})
