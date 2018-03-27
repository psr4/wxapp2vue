<template>
    <page>
        <div class='warpper'>      <div class='bi_title'>        <div class='title_boom'>天羽币</div>      </div>      <div class='list'>         <div class='li' v-for="(item,index) in list" :key="index">           <navigator :url="'record?id='+(item.id)">            <img src='/image/img/bi.png'></img>            <div class='name'>{{item.id6}}</div>          </navigator>        </div>        <!-- <view class='li'>           <navigator url='record'>            <image src='/image/img/bi.png'></image>            <view class='name'>2451</view>          </navigator>        </view>        <view class='li'>           <navigator url='record'>            <image src='/image/img/bi.png'></image>            <view class='name'>2451</view>          </navigator>        </view>        <view class='li'>           <navigator url='record'>            <image src='/image/img/bi.png'></image>            <view class='name'>2451</view>          </navigator>        </view> -->      </div>  </div>
    </page>
</template>
<script>
    import {Page,getApp,wx} from '@/common/js/Weapp'
    var util = require('../../utils/util.js')

var app = getApp()
const pageData = Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var _this = this 
    util.getAjaxData('allTymoney',{}).then(res=>{
       _this.setData({list:res.data})
    })
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
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../common/style/page.scss';

/* .warpper .title{
  font-size: 15px;
  line-height: 42px;
  background: #F0F5F9;
  padding: 0 10px;
} */
.list{
  display: flex;

}
.list .li{
  flex: 0 0 25%;
  padding:10px 0;
  text-align: center;

}

.list .li img{
  width: 60px;
  height: 60px;
}
.list .li .name{
  color: #666;
  margin-top: 6px;
}
.bi_title{
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding: 10px; 
}
</style>