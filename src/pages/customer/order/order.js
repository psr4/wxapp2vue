let QR = require("../../../utils/qrcode.js");
let util = require('../../../utils/util.js');
let app = getApp();
Page({
	data: {
		status: '0',
		list: {

		},
		page: {

		},
		total: {

		}
	},
	onLoad: function (options) {
		this.getPageData()
	},
	changeTab(e) {
		let status = e.currentTarget.dataset.status;
		this.setData({
			status: status
		})
		this.getPageData()
	},
	getPageData() {
		const status = this.data.status;
		let data = {
			p: this.data.page[status],
			status: status
		}
		if (this.data.page[status] >= this.data.total[status]) {
			return;
		}
		util.getAjaxData('store_user_order', data).then((res) => {
			if (res.data.list == null) {
				return
			}
			let page = this.data.page
			let list = this.data.list
			let total = this.data.total
			page[status] = res.data.page;
			console.log(list[status])
			list[status] = list[status] ? list[status].concat(res.data.list) : res.data.list;
			total[status] = res.data.total;
			console.log({
				page: page,
				list: list,
				total: total
			})
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