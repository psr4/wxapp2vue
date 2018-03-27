//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    titlebar: {
      title: "我的专属二维码",
      back: 2
    },
    showtabbar: true
  },
  
  onLoad: function (options) {
    util.contactInit(this);
    const token = wx.getStorageSync('token')
    console.log(token)
    this.setData({
      url: util.getAjaxUrl("getqrcode") + "?token=" + token
    })
  },
  view (){
    wx.previewImage({
      current: this.data.url,
      urls: [this.data.url] 
    })
  },
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})