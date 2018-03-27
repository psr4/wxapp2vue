// pages/dopay/dopay.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    model: '1',
    option: {
      id: 72
    }
  },
  
  onLoad: function (options) {
    util.contactInit(this);
    var id = options.id;
    var me = this;
    util.getAjaxData("paydetail", { id: id }, function (res) {
      me.setData({
        user: res.data.data.user,
        order: res.data.data.order,
        option: options
      })
    }, "POST")
  },
  bindChange1(e) {
	  console.log(e.detail.value[0]);
    this.setData({
      model: e.detail.value[0]
    })
  },
   pay() {
    var me = this;
    util.pay({ method: "detail", id: this.data.option.id, model: this.data.model }, function (res) {
      if (me.data.model == 0) {
        if (res.data.msg == "ok") {
          wx.showToast({
            title: res.data.data,
          })
		  wx.redirectTo({
			  url: '/pages/order/order',
		  })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.data,
            success() {
				wx.redirectTo({
                url: '/pages/account/account',
              })
            }
          })
        }
      } else {
        if (res.errMsg == "requestPayment:ok") {
          wx.showToast({
            title: "支付成功!",
          })
		  wx.redirectTo({
              url: '/pages/order/order',
          })
        }
      }
    });
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})
