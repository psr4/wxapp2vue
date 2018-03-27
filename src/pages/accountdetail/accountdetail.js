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
        p1: 0,
        p2: 0,
        list: [],
        score: []
  },
    onLoad: function (options) {
        util.contactInit(this)
        if (options.status > 0) {
            this.setData({
                status: options.status
            })
        }
        this.loadDetail()
    },
    loadDetail: function (e) {
        if (!this.data.loading) {
            this.setData({
                loading: true
            })
        const _this = this 
      
        util.getAjaxData("acclog", { p1: this.data.p1,type: _this.data.status},
          res=>{
            _this.setData({
              list: _this.data.list.concat(res.data.data.list),
              p1: res.data.data.page_1
            })
        },'POST')
            // var me = this;     
            // util.getAjaxData("account", { p1: this.data.p1, p2: this.data.p2, method: method }, function (res) {
            //     if (method == "acc" || method == "all") {
            //         me.setData({
            //             list: me.data.list.concat(res.data.data.list),
            //             p1: res.data.data.page_1
            //         })
            //     }
            //     if (method == "score" || method == "all") {
            //         me.setData({
            //             score: me.data.score.concat(res.data.data.score),
            //             p2: res.data.data.page_2
            //         })
            //     }

            //     me.setData({
            //         loading: false
            //     })
            // }, 'POST');

        }
    },
    onPullDownRefresh: function () {
        this.loadDetail();
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: util.onShareAppMessage
})