//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        titlebar: {
            title: "订单中心",
            back: 2
        },
        showtabbar: true,
        status: 0,
        detail: []
  },
  
    onLoad: function (options) {
      util.contactInit(this);
        if (options.status > 0) {
            this.setData({
                status: options.status
            })
        }
        this.loadDetail()
    },
    loadDetail: function () {
        var me = this;
        util.getAjaxData("detail", {}, function (res) {
            me.setData({
                detail: res.data.data
            })
        }, "POST");

    },
    changetap: function (data) {
        this.setData({
            status: data.currentTarget.dataset.status
        })
    },
    controller: function (data) {
        var list = [
            ["查看订单"],
            ["查看订单", "取消订单", "去付款"],
            ["查看订单", "申请退款"],
            ["查看订单", "申请退款", "确认收货"],
            ["查看订单"],
            ["查看订单"],
            ["查看订单", "取消退款"],
            ["查看订单"]
        ];
        var me = this;
        var status = data.currentTarget.dataset.status;
        wx.showActionSheet({
            itemList: list[status],
            success: function (res) {
                if (res.tapIndex == 0) {
                    console.log("查看订单");
                    wx.navigateTo({
                        url: '/pages/orderinfo/orderinfo?id=' + data.currentTarget.dataset.id,
                    })
                } else if ((status == 2 || status == 3) && res.tapIndex == 1) {
                    console.log("申请退款");
                    util.getAjaxData("detail_C", { id: data.currentTarget.dataset.id, method: "refund" }, function (res) {
                        me.loadDetail();
                    }, "POST");
                } else if (status == 6 && res.tapIndex == 1) {
                    console.log("取消退款");
                    util.getAjaxData("detail_C", { id: data.currentTarget.dataset.id, method: "refund1" }, function (res) {
                        me.loadDetail();
                    }, "POST");
                } else if (status == 1 && res.tapIndex == 1) {
                    console.log("取消订单");
                    var closemsg = ["改选其他商品", "改选其他配送方式", "改选其他卖家", "其他原因"];
                    wx.showActionSheet({
                        itemList: closemsg,
                        success: function (res) {
                            util.getAjaxData("detail_C", { id: data.currentTarget.dataset.id, method: "cancel", msg: closemsg[res.tapIndex] }, function (res) {
                                me.loadDetail();
                            }, "POST");
                        }
                    })
                } else if (status == 1 && res.tapIndex == 2) {
                    console.log("付款");
                    wx.navigateTo({
                        url: '/pages/dopay/dopay?id=' + data.currentTarget.dataset.rid,
                    })
                } else if (status == 3 && res.tapIndex == 2) {
                    console.log("确认");
                    util.getAjaxData("detail_C", { id: data.currentTarget.dataset.id, method: "ok" }, function (res) {
                        me.loadDetail();
                    }, "POST");
                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },
    onPullDownRefresh: function () {
        this.loadDetail();
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: util.onShareAppMessage
})