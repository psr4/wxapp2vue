<template>
    <div class="page">
        <div src="/template/common.wxml" import="1"/>        <div class="box">         <div class="title">        <div class="left"><i class="iconfont icon-my"></i>我的推荐</div>        <div class="right"><i class="iconfont icon-down"></i></div>      </div>      <navigator url="/pages/grouplist/grouplist" >    <div class="clearbor item">         <div class="left"><i class="iconfont icon-friend"></i>我的团队</div>      <div class="right"><i class="iconfont icon-return1"></i>      <!-- <text class="round">{{group.u1.num}}人</text> -->      </div>         </div>     </navigator>    <!-- <view class=" item">      <view class="left"><i class="iconfont icon-group"></i>我的团队</view>      <view class="right">      <text class="round">{{group.u2.num}}人</text>      </view>    </view> -->  </div>    <div class='bor-gray'></div>    <div class="box" v-if="(group.is_show==1)">       <div class="title">        <div class="left"><i class="iconfont icon-home"></i>商家团</div>        <div class="right"><i class="iconfont icon-down"></i></div>      </div>    <navigator url="/pages/detaillist/detaillist"  >      <div class="item">                <div class="left"><i class="iconfont icon-pay"></i>商家排位</div>          <div class="right">          <!-- {{group.detail_no}}  -->          <i class="iconfont icon-return1"></i>          <!-- <text class="round">位</text> -->          </div>      </div>    </navigator>    <div class="item">      <div class="left"><i class="iconfont icon-evaluate"></i>奖金</div>      <div class="right">{{group.jinner}}      <span class="round">元</span>      </div>    </div>  </div>      <div left="(_left)" top="(_top)"/>   <!-- <template is="contact" data='{{contaction}}'></template>  -->    <tabbar is="tabbar" :data="(showtabbar)"></tabbar> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
const pageData = Page({
  data: {
    showtabbar: true,
    group: {},
  },
  onShow: function () {
    const _left = wx.getStorageSync('_left')
    const _top = wx.getStorageSync('_top')
    if (_left) {
      this.setData({ _left, _top })
    }
  },
  onLoad: function (options) {
    util.contactInit(this);
    var me = this;
    util.getAjaxData("group", {}, function (res) {
      me.setData({
        group: res.data.data
      })
    }, "POST");
  },
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../common/style/page.scss';
.box{
  background: white;
  padding:0 rpx(30) ;
}
.box .title{
  font-size: 14px;
  line-height: 46px;
  border-bottom:solid 1px #eee;
  display: flex;
}
.box .item{
  font-size: 12px;
  line-height: 46px;
  border-bottom:solid 1px #eee;
  display: flex;
}
.box .left{
  flex :1;
}
.box .right{
  flex:2;
  text-align: right;
}
.round{
  background: #FF9935;
  color:white;
  text-align: center;
  border-radius:50px;
  padding: 4px 6px;
}
</style>