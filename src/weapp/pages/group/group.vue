<template>
    <div class="page">
        <div src="/template/common.wxml" import="1"/>   <navigator url="/pages/grouplist/grouplist" open-type="redirect"> <div class="box">   <div class="title">     <div class="left"><i class="iconfont icon-my"></i>我的推荐</div>     <div class="right"><i class="iconfont icon-down"></i></div>   </div>   <div class="item">     <div class="left"><i class="iconfont icon-friend"></i>我的伙伴</div>     <div class="right">     <span class="round">{{group.u1.num}}人</span>     </div>   </div>   <div class="item">     <div class="left"><i class="iconfont icon-group"></i>我的团队</div>     <div class="right">     <span class="round">{{group.u2.num}}人</span>     </div>   </div> </div> </navigator>  <navigator url="/pages/detaillist/detaillist"  open-type="redirect"> <div class="box">   <div class="title">     <div class="left"><i class="iconfont icon-home"></i>团队订单</div>     <div class="right"><i class="iconfont icon-down"></i></div>   </div>   <div class="item">     <div class="left"><i class="iconfont icon-pay"></i>未完成订单</div>     <div class="right">     <span class="round">{{group.detail_no}}元</span>     </div>   </div>   <div class="item">     <div class="left"><i class="iconfont icon-evaluate"></i>已完成订单</div>     <div class="right">     <span class="round">{{group.detail_ok}}元</span>     </div>   </div> </div> </navigator>  <tabbar is="tabbar" :data="(showtabbar)"></tabbar> 
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
    showtabbar:true
  },
  onLoad: function (options) {
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
  padding:0 10px ;
  border-bottom:solid 1px #ccc;
}
.box .title{
  font-size: 14px;
  line-height: 35px;
  border-bottom:solid 1px #eee;
  display: flex;
}
.box .item{
  font-size: 12px;
  line-height: 35px;
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
.iconfont{
  font-size: 16px;
  width:30px;
  text-align: center;
  display: inline-block;
}
.round{
  background: #EF2F72;
  color:white;
  text-align: center;
  border-radius:50px;
  padding: 4px 8px;
}
</style>