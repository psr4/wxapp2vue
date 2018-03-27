var util = require('../../utils/util.js')

var app = getApp()
Page({
	data: {
		status: 0,
		url: '',
		show: false
	},
	onLoad: function (options) {
		let _this = this
		util.getAjaxData('mining_page', {}).then(res => {
			_this.setData({ ...res.data })
			console.log(_this.data)
		})
    console.log(this.data.run_mining)
    let obj = {
      show: false
    }
    if (this.data.url == '') {
      const token = wx.getStorageSync('token')
      obj.url =
        util.getAjaxUrl("getsharecode") +
        "?token=" + token +
        "&ty_id=" + (this.data.run_mining ? this.data.run_mining.id : 0)
    }
    this.setData(obj)
	},
	// 开始挖矿
	bindCreateMining() {
		let _this = this
		util.getAjaxData('createMining', {}).then(res => {
			console.log(res)
			if (res.status == 1) {
        util.getAjaxData('mining', { ty_id:res.data});
				_this.setData({ status: 1 })
			} else {
				wx.showModal({
					title: '提示',
					content: res.msg
				})
			}
		})
	},
	onShow: function () {
		var _this = this
		wx.onAccelerometerChange(function (e) {
			let x = e.x * 10
			let y = e.y * 10
			let z = e.z * 10

			_this.setData({
				x, y, z
			})
			// if (e.x > 1 && e.y > 1) {
			//   wx.showToast({
			//     title: '摇一摇成功',
			//     icon: 'success',
			//     duration: 2000
			//   })
			// }
		})
	},
	showQrcode() {
		let obj = {
			show: true
		}
    this.setData(obj)
	},
	hideQrcode() {
		this.setData({
			show: false
		})
	},
	onPullDownRefresh: function () {
		this.onLoad();
		wx.stopPullDownRefresh()
	},
	//tip mining
	bindShare() {
		let _this = this
		wx.showModal({
			title: '提示',
			content: '请先创建一个天羽币',
			confirmText: "创建",
			success(e) {
				if (e.confirm) {
					_this.bindCreateMining()
				}
			}
		})
	},
	//分享的定义
	onShareAppMessage(e) {

		var option = "?scene=" + app.globalData.user.id;
		var indexurl;
		var title
		if (this.data.status == 1) {
			option += "&ty_id=" + this.data.run_mining.id;
			indexurl = "/pages/stock/control" + option;
			title = "天羽币-助力挖矿";
		} else {
			indexurl = this.route + option;
			if (this.data.titlebar) {
				title = this.data.titlebar.title + "-";
			} else if (this.data.title) {
				title = this.data.title + "-";
			} else {
				title = app.globalData.title;
			}
		}
		console.log(indexurl);
		return {
			title: title,
			path: indexurl
		}
	}
})