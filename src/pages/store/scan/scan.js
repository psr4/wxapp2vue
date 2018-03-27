let util = require('../../../utils/util.js')
Page({
	data: {
		username: ""
	},
	onLoad: function (options) {
		util.getAjaxData('storeScan', {}).then((res) => {
			if (res.msg == 'ok') {
				this.setData({
					store: res.data
				})
			} else {
				wx.showModal({
					title: '提示',
					content: res.data,
					showCancel: false,
					success() {
						wx.switchTab({
							url: '/pages/my/my',
						})
					}
				})
			}
		});
	},
	scan() {
		wx.scanCode({
			success: (e) => {
				util.getAjaxData('customer', { data: e.result }).then((res) => {
					if (res.msg == "ok") {
						this.setData({
							customer: res.data
						})
					} else {
						wx.showModal({
							title: '提示',
							content: res.data,
							showCancel: false
						})
					}
				})
			}
		})
	},
	submit(e) {
		if (this.ajax) {
			return;
		}
		const price = e.detail.value.price;
		const username = e.detail.value.username;
		if (/^[0-9]+(\.[0-9]{1,2})?$/.test(price) && parseFloat(price) >= 0.01) {
			this.ajax = true;
			util.getAjaxData("store_pay", {
				username: username,
				money: price
			}).then((res) => {
				this.ajax = false;
				wx.showModal({
					title: '提示',
					showCancel: false,
					content: res.data
				})
			})
		} else {
			wx.showModal({
				title: '提示',
				showCancel: false,
				content: "输入的金额有误!"
			})
		}
	},
	onPullDownRefresh: function () {
		this.onLoad();
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage
})