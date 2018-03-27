var util = require('../../utils/util.js')

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    util.getAjaxData('rank',{}).then(
      res=>{
        _this.setData({...res.data})
        console.log(_this.data)
      }
    )
  },
  changetab(e) {
    var tab = e.currentTarget.dataset.tab;
    this.setData({
      tab: tab
    })
  },

  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})