//index.js
//获取应用实例
var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js')
var app = getApp()
Page({
	data: {
		title: "商城分类",
    needpwd: 0,
    arc:{},
    kfShow:false
  },
	onLoad: function (options) {
    util.contactInit(this);

		var me = this;
    if(options.id){
      util.getAjaxData("arcdata", { id: options.id }, function (res) {
        me.setData({
          needpwd: res.data.data.needpwd,
          arc: res.data.data.arc
        })
        if (options.kfShow == 1) {
          me.setData({ kfShow: false })
        } else {
          me.setData({ kfShow: true })
        }
        WxParse.wxParse('article', 'html', res.data.data.arc.info, me, 5);
      });
    }
    if(options.cate_id){
      util.getAjaxData("arcdata2", { id: options.cate_id }, function (res) {
        me.setData({
          arc: res.data.data.arc,
          kfShow:false
        })
        WxParse.wxParse('article', 'html', res.data.data.arc.info, me, 5);
      });
    }


	},
	submit(e) {
		var pwd = e.detail.value.pwd;
		var me = this;
		util.getAjaxData("arcdata", { id: this.options.id, pwd: pwd }, function (res) {
			me.setData({
				needpwd: res.data.data.needpwd,
				arc: res.data.data.arc
			})
			WxParse.wxParse('article', 'html', res.data.data.arc.info, me, 5);
		});
	},
	onPullDownRefresh: function () {
		this.onLoad();
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage
})
