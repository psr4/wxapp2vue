//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
	data: {
		titlebar: {
			title: "订单中心",
			back: 2
		},
		showtabbar: true,
		status: 0,
    detail: []
  },
  
	onLoad: function (options) {
    util.contactInit(this);
		if (options.status > 0) {
			this.setData({
				status: options.status
			})
		}
		this.loadDetail()
	},
	loadDetail: function () {
		var me = this;
		util.getAjaxData("reserver_order", {}, function (res) {
			me.setData({
				list: res.data.data.list
			})
		}, "POST");
	},
	qrcode(e){
		var id = e.currentTarget.dataset.id;
		var url = util.getAjaxUrl("reserverqrcode") + "?token=" + wx.getStorageSync('token')+"&id="+id
		this.setData({
			url:url,
			showqrcode:true
		})
	},
	hide(e){
		this.setData({
			showqrcode:false
		})
	},
	onPullDownRefresh: function () {
		this.loadDetail();
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage,
	previewimage: util.previewimage
})