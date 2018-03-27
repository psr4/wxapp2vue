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
    showtabbar: true,
    model: false,
    form: {}
  },
  
  onLoad: function (options) {
    util.contactInit(this);
  },
  switch(e) {
    var form = this.data.form;
    form['model'] = e.detail.value

    this.setData({
      form: form,
      model: e.detail.value
    })

  },
  bindKeyInput(e) {
    var form = this.data.form;
    form[e.currentTarget.dataset.name] = e.detail.value
    this.setData({
      form: form
    })
    console.log(form);
  },
  tx() {
    util.getAjaxData("account_tx", this.data.form, function (res) {
      wx.showModal({
        title: '提示',
        content: res.data.data
      })
    }, 'POST');
  },
  onPullDownRefresh: function () {
    this.loadDetail();
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})