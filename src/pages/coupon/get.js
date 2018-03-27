var util = require('../../utils/util.js')
var app = getApp()
Page({
	data: {
		titlebar: {
			title: "商品详情",
			back: 1
		},
		discount: []
  },
  
	onLoad: function (options) {
    util.contactInit(this);
		var me =this
        util.getAjaxData("dislist", {}, function (res) {
			me.setData({
				discount: res.data.data
			})
		});
	},
	receive(e) {
		var id = e.currentTarget.dataset.id;
		var me = this;
		util.getAjaxData("disget", { id: id }, function (res) {
            wx.showModal({
                title: '提示',
                content: res.data.data,
                success() {
                    if (res.data.msg == "success") {
                        me.onLoad();
                    }
                }
            })
		});
	},
	onPullDownRefresh: function () {
		this.onLoad();
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage,
	previewimage: util.previewimage
})
