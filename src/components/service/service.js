var util = require('../../utils/util.js')
// compnents/service.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    _left:{
      type:"String",
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) { 
      
      } 
    },
    _top:{
      type: "String",
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) {
        
      } 
    }
  },
 
  /**
   * 
   */
  attached(){
    
    const _left = wx.getStorageSync('_left')
    const _top = wx.getStorageSync('_top')
    const width =   wx.getSystemInfoSync().windowWidth  
    const height = wx.getSystemInfoSync().windowHeight 
 
    this.setData({ _left, _top,width,height })
  },
  /**
   * 组件的初始数据
   */
  data: {
    _left:"",
    _top:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    contact() {
      this.setData({
        contaction: !this.data.contaction
      })
    },
    move(e) {
      const move = true
      // console.log(e)
      let _left = e.touches[0].clientX - 15
      let _top = e.touches[0].clientY - 46 
      if(_left<0) _left = 0
      if(_top<0) _top = 0
      if (_left+47 > this.data.width) _left = this.data.width-47
      if (_top+96 > this.data.height) _top = this.data.height - 96
      this.setData({_left,_top,move})
    },
    touchend(e){ 
      const move = false
      this.setData({ move })
      const _left = this.data._left
      const _top = this.data._top

      wx.setStorage({
        key: '_left',
        data: _left,
      })
      wx.setStorage({
        key: '_top',
        data: _top,
      })
    }
  }
})
