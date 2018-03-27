var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
      img:""
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
    this.setData({
        user: app.globalData.user ,
        img: util.host +"/temp/account.jpg",
    })
  },
  onPullDownRefresh: function () {
      this.onShow();
      wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})