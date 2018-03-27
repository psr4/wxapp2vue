let util = require('../../utils/util.js')
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    util.getAjaxData("quotes", {}).then(data => {
      console.log(data)
      _this.setData({ ...data.data })
      console.log(_this.data)
    })
  },
  changeTap(e) {
    
    var tab = e.currentTarget.dataset.tab;
    if(tab == this.data.tab){
      tab = -1
    }
    this.setData({
      tab
    })
  },
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})