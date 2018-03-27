<template>
    <page>
        <!--pages/recommend/recommend.wxml-->  <div src="/template/common.wxml" import="1" />    <div class="goodsitem">    <div class="title">      <i class="iconfont icon-renqituijian"></i> 人气推荐    </div>    <ul class="items">      <li class="item" @click="iteminfo" >          <div class="pic">            <img src="http://kod.qztywl.com/temp/LH004.png"></img>          </div>          <div class="desc">            <div class="name">兰花水感透白水分乳液</div>            <div class="price">¥109</div>            <div class="amount">88人付款</div>          </div>          <div class="class">护肤</div>      </li>    </ul>  </div>     <contact is="contact" :data="contaction"></contact>     <tabbar is="tabbar"></tabbar>
    </page>
</template>
<script>
    import {Page,getApp,wx} from '@/common/js/Weapp'
    // pages/recommend/recommend.js
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
    util.contactInit(this)

  },
  iteminfo: function (data) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + data.currentTarget.dataset.id
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
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../common/style/page.scss';
/* pages/recommend/recommend.wxss */

.goodsitem {
  background: white;
}
.goodsitem .iconfont{
  font-size: rpx(32);
  color: #ef2f72;
}
.goodsitem .title {
  padding: rpx(20) rpx(40);
  box-shadow: 0px rpx(1) rpx(8) #bbb;
}

.items {
  display: flex;
  flex-flow: wrap;
  align-items: center;
}

.items .item {
  flex: 0 0 100%;
  display: flex;
  border-bottom: solid rpx(1) #f0f0f0;
}

.items .item .pic {
  flex: 0 0 rpx(160);
}

.items .item .pic img {
  width: rpx(150);
  margin: rpx(10);
  height: rpx(150);
}

.items .item .desc {
  flex: 1;
  padding: rpx(10);
}

.items .item .desc .name {
  font-size: rpx(26);
  /* margin: rpx(8) 0; */
  line-height: rpx(54);
}
.items .item .desc .info{
  display: flex;
  margin-top:rpx(10);
  align-items: flex-end;
}
.items .item .class {
  font-size: rpx(26);
  padding: rpx(10);
  line-height: rpx(54);
  color: #bbb;
  flex: 0 0 10%;
}

.items .item .desc .price {
  font-size: rpx(28);
  color: #ef2f72;
  margin-right: rpx(20);
  line-height: rpx(56);
}
.items .item .desc .amount {
   font-size: rpx(22); 
  color: #bbb;
}

</style>