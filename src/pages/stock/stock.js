var util = require('../../utils/util.js')

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "商城首页",
    banner: [],
  },
  // url 跳转
  goto(e){
    let url = e.detail.url
    if(url){
      wx.navigateTo({
        url,
      })
    }else{
      wx.showToast({
        title: '稍等再试哟',
        icon: "loading"
      })
    }
   
  },
  // 
  gotoArticle(e){
    let id = e.detail.id
    
    if(id){
      wx.navigateTo({
        url: '/pages/article/article?cate_id=' + id,
      })
    }else{
      wx.showToast({
        title: '稍等再试哟',
        icon:"loading"
      })
    }
  
  },
  /**
   * 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow(){
    let _this = this
    util.getAjaxData("stock", {}).then(data => {
      _this.setData({ ...data.data })
      console.log(_this.data)
    })
  },

  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})