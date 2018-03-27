let util = require('../../../utils/util.js')
Page({
	data: {},
	onLoad: function (options) {
		util.getAjaxData('storeScan', {}).then((res) => {
			if (res.msg == "ok") {
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
	submit(e) {
		let price = e.detail.value.price;
		price = parseFloat(price)
		if (price >= 100 || price < 0) {
			wx.showModal({
				title: "提示",
				content: "请确认奖金比例是否正确!",
				showCancel: false
			})
			return;
		}
		
		util.getAjaxData("store_set", { price: price }).then((res) => {
			wx.showModal({
				title: "提示",
				content: res.data,
				showCancel: false
			})
		})
	},
	onPullDownRefresh: function () {
		this.onLoad();
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage
})