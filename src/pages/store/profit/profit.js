let util = require('../../../utils/util.js')
Page({
	data: {},
	onLoad: function (options) {
		util.getAjaxData('store', {}).then((res) => {
			if (res.msg == "ok") {
				this.setData({
					store: res.data.store,
					total: res.data.total,
					day: res.data.day
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
	onPullDownRefresh: function () {
		this.onLoad();
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage
})