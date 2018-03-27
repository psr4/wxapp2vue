//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    titlebar: {
      title: "我的团队",
      back: 2
    },
    tabid:1,
    showtabbar: true
  },
 
  onLoad: function (options) {
    util.contactInit(this);
    var me = this;
    util.getAjaxData("grouplist", {}, function (res) {
      me.setData({
        u1: res.data.data.u1.list,
        u2: res.data.data.u2.list
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