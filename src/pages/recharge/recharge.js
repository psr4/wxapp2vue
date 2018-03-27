//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        titlebar: {
            title: "账户中心",
            back: 2
        },
        showtabbar: true
  },
    onLoad: function (options) {
      util.contactInit(this)
    },
    cz(e) {
        var me = this;
        util.pay({ method: "charge", money: e.detail.value.money }, function (res) {
            console.log(res);
            if (res.data.msg == "no") {
                wx.showModal({
                    title: '提示',
                    content: res.data.data,
                })
            } else {
                if (res.errMsg == "requestPayment:ok") {
                    wx.showToast({
                        title: "支付成功!",
                    })
                    wx.navigateTo({
                        url: '/pages/detail/detail',
                    })
                }
            }
        });
    },
    onPullDownRefresh: function () {
        this.loadDetail();
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: util.onShareAppMessage
})