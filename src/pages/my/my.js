//index.js
//获取应用实例
var util = require('../../utils/util.js')

var app = getApp()
Page({
    data: {
        title: "个人中心",
        user: {}
        
    },
 
    onShow: function () {
      const _left = wx.getStorageSync('_left')
      const _top = wx.getStorageSync('_top')
      if (_left) {
        this.setData({ _left, _top })
      }
      
      util.contactInit(this);
        var me = this;
        util.getAjaxData("my", { }, function (res) {
            app.globalData.user = res.data.data;
            app.globalData.telephone = res.data.data.telephone;
            app.globalData.myInit = true
            me.setData({
                ads:res.data.data.ad.content,
                avatarUrl: app.globalData.userInfo.avatarUrl,
                nickName: app.globalData.userInfo.nickName,
                username:res.data.data.username,
                level:res.data.data.level,
                user: res.data.data,
                ty_show:res.data.data.ty_show
            })
        }, "POST");
    },
    call(){
        wx.makePhoneCall({
            phoneNumber: app.globalData.telephone,
        })
    },
    onPullDownRefresh: function () {
        this.onShow();
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: util.onShareAppMessage
})