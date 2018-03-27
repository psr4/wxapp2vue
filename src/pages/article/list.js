//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        title: "品牌中心",
        list:[]
  },
    onShow() {
      const _left = wx.getStorageSync('_left')
      const _top = wx.getStorageSync('_top')
      if (_left) {
        this.setData({ _left, _top })
      }
    },
    onLoad: function (options) {
      util.contactInit(this);
        var me = this;
        util.getAjaxData("article", {}, function (res) {
            me.setData({
                list: res.data.data.arc,
            })
        });
    },
    onPullDownRefresh: function () {
        this.onLoad();
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: util.onShareAppMessage
})