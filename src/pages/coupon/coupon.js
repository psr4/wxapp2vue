var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        status: 1,
        model: true,
        form: {}
  },
  
    onLoad: function (options) {
      util.contactInit(this)
        var me = this;
        var buy = wx.getStorageSync("buy");
        this.setData({
            method: options.method
        })
        util.getAjaxData("mydis", {}, function (res) {

            var carts = wx.getStorageSync('buy');
            var totalmoney = 0;
            for (var i = 0; i < carts.length; i++) {
                totalmoney += carts[i].price * carts[i].num;
            }
            var discount = res.data.data.dis;
            if (options.method == "choose") {
                for (var i = 0; i < discount.length; i++) {
                    for (var l = 0; l < buy.length; l++) {
                        if (discount[i].type == 1 ||
                            (discount[i].type == 2 && discount[i].usable <= totalmoney)
                        ) {
                            for (var m = 0; m < discount[i].cate.length; m++) {
                                if (buy[i] && buy[i].cate_id == discount[i].cate[m]) {
                                    discount[i]['canuse'] = 1;
                                }
                            }
                            for (var m = 0; m < discount[i].ids.length; m++) {
                                if (buy[i] && buy[i].id == discount[i].ids[m]) {
                                    discount[i]['canuse'] = 1;
                                }
                            }
                        }
                    }
                }
            }
            me.setData({
                discount: discount
            })
        }, "POST");
    },
    choose(e) {
        var index = e.currentTarget.dataset.index;
        app.globalData.discount = this.data.discount[index];
        wx.navigateBack();
    },
    switch(e) {
        var form = this.data.form;
        form['model'] = e.detail.value

        this.setData({
            form: form,
            model: e.detail.value
        })
    },
    changetab: function (data) {
        this.setData({
            status: data.currentTarget.dataset.status
        })

    },
    onPullDownRefresh: function () {
        this.onLoad();
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: util.onShareAppMessage,
    previewimage: util.previewimage
})