//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        titlebar: {
            title: "订单详情",
            back: 2
        },
        showtabbar: true
  },
  
    onLoad: function (options) {
      util.contactInit(this);
        var me = this;
        util.getAjaxData("detailinfo", { id: options.id }, function (res) {
            if (!res.data.data.id) {
                wx.showModal({
                    title: '读取失败',
                    content: "未找到对应订单!",
                    success: function (res) {
                        wx.navigateTo({
                            url: '/pages/detail/detail',
                        })
                    }
                })
            }
            me.setData({
                item: res.data.data
            });
        }, "POST")
    },
    onPullDownRefresh: function () {
        this.onLoad();
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: util.onShareAppMessage
})