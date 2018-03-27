var util = require('../../utils/util.js')
var app = getApp()
// pages/stock/control.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.scene = this.options.scene;
    console.log(options)
    let ty_id = this.options.ty_id
    // 先进行登陆
    util.login(this).then(res=>{
        wx.showModal({
          title: '天羽币',
          content: '每枚天羽币都独一无二，与天结缘羽化而生',
          cancelText:"帮他挖矿",
          confirmText:"我要挖矿",
          success(e){
            console.log(e)
            if (!e.confirm){
                //点击我要助力之后
                util.getAjaxData('mining', { ty_id }).then(result => {
                  //进行信息处理
                  console.log(result)
                  wx.showModal({
                    title: '提示',
                    content: result.msg,
                    showCancel:false,
                    success(){
                      wx.redirectTo({
                        url: '/pages/stock/stock',
                      })
                    },
                    fail(){
                      wx.redirectTo({
                        url: '/pages/index/index',
                      })
                    }
                  })
               
                })
            }else{
             //点击我要创造之后 
              util.getAjaxData('createMining', {}).then(result=>{
                console.log(result)
                wx.showModal({
                  title: '提示',
                  content: result.msg,
                  showCancel: false,
                  success() {
                    wx.redirectTo({
                      url: '/pages/stock/stock',
                    })
                  },
                  fail() {
                    wx.redirectTo({
                      url: '/pages/index/index',
                    })
                  }
                })
              })
            }
            

          
          },
          fail(){
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }

        })
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})