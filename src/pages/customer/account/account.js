let QR = require("../../../utils/qrcode.js");
let util = require('../../../utils/util.js');
let app = getApp();
Page({
	data: {
		status: '0',
		list: [],
		page: 0,
		total: 1
	},
	onLoad: function (options) {
		this.getPageData()
	},
	getPageData() {
		const status = this.data.status;
		let data = {
			p: this.data.page,
			status: status
		}
		if (this.data.page >= this.data.total) {
			return;
		}
		wx.getExtConfig({

		})
		util.getAjaxData('store_user_account_log', data).then((res) => {
			if (res.data.list == null) {
				return
			}
			let page = this.data.page
			let list = this.data.list
			let total = this.data.total
			page = res.data.page;
			console.log(list)
			list = list ? list.concat(res.data.list) : res.data.list;
			total = res.data.total;
			this.setData({
				page: page,
				list: list,
				total: total
			})
		})
	},
	onReachBottom() {
		this.getPageData()
	},
	onShareAppMessage: util.onShareAppMessage
})