//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    titlebar: {
      title: "团队订单",
      back: 2
    },
    tabid:1,
    showtabbar: true
  },
  
  onLoad: function (options) {
    util.contactInit(this);
    var me = this;
    util.getAjaxData("tuanUsers", {}, function (res) {
      me.setData({
         users:res.data.data
      })
    }, "POST");
  },
  changtab(e){
    this.setData({
      tabid:e.currentTarget.dataset.id
    })
  },
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})