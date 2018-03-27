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
        status: 0,
        model: true,
        form: {},
  },
    onLoad: function (options) {
        util.contactInit(this)

        console.log(app.globalData.userInfo);
        this.setData({
            avatarUrl: app.globalData.userInfo.avatarUrl,
            nickName: app.globalData.userInfo.nickName,
            userInfo: app.globalData.user
        });
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
    changepwd() {
        util.getAjaxData("changepwd", this.data.form, function (res) {
            wx.showModal({
                title: '提示',
                content: res.data.data
            })
        }, 'POST');
    },
    changetab: function (data) {
        this.setData({
            status: data.currentTarget.dataset.status
        })

    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: util.onShareAppMessage
})