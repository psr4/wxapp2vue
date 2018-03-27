//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    showtabbar: true
  },
  onShow: function () {
    const _left = wx.getStorageSync('_left')
    const _top = wx.getStorageSync('_top')
    if (_left) {
      this.setData({ _left, _top })
    }
  },
  onLoad: function (options) {
    util.contactInit(this);
    var me = this;
    util.getAjaxData("group", {}, function (res) {
      me.setData({
        group: res.data.data
      })
    }, "POST");
  },
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})