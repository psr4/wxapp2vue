<template>
    <div class="page">
        <!--pages/account/account.wxml--> <div src="/template/common.wxml" import="1" />  <div class="account" :style="('background: url('+(img)+') no-repeat;')">   <img src="/image/img/balance.png"></img>   <!-- <i class="iconfont icon-qian"></i> -->   <div class="yue">我的余额</div>   <div class="balance">{{user.user_account}}</div> </div>  <div class="service">   <div class="info">     <navigator url="/pages/recharge/recharge">     <div class="chongzhi"><i class="iconfont icon-chongzhi"></i>充值</div>     </navigator>   </div>   <div class="info">    <navigator url="/pages/withdraw/withdraw">       <div class="tixian"><i class="iconfont icon-tixian"></i>提现</div>     </navigator>   </div> </div>  <div class="btnlist">   <navigator url="/pages/accountdetail/accountdetail" class="list">     <div class="mingxi"><i class="iconfont icon-jiaoyijilu"></i>账单明细</div>     <i class="iconfont icon-return1"></i>   </navigator> </div> <div class="zuixinjilu">  </div> <tabbar is="tabbar"></tabbar> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
var util = require('../../utils/util.js')
var app = getApp()
const pageData = Page({
  data: {
      img:""
  },
  onLoad: function (options) {
    this.setData({
        user: app.globalData.user ,
        img: util.host +"/temp/account.jpg",
    })
  },
  onPullDownRefresh: function () {
      this.onShow();
      wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../common/style/page.scss';
/* pages/account/account.wxss */
.page{
  background: #f8f7f7;
}
.account{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: rpx(20) 0;
}
.account  img{
  width: rpx(80);
  height: rpx(80);
}
.account .yue{
  color: #f0f0f0;
}
.account .balance{
  color: #fff;
  font-size: rpx(54);
  line-height: rpx(120);
}

.service{
  display: flex;
  background: #fff;
  box-shadow: 0 0 rpx(8) #bbb;
  /* justify-content: space-around; */
  text-align: center;
  padding: rpx(40) 0;
}
.service .info{
  flex: 1;
  border-right:rpx(1) solid #bbb;
  display: flex;
   justify-content: center; 
}
.service .info:last-child{
  border: none;
}
.service .info .iconfont{
  font-size: rpx(42);
  margin-right: rpx(20);
}
.service .info .chongzhi,.service .info .tixian{
  line-height: rpx(42);
}
.service .info .icon-chongzhi{
  color: #ff6600;
}
.service .info .icon-tixian{
  color: #05b319;
}

.btnlist .list {
  line-height: rpx(80);
  margin: rpx(20) 0;
  padding: 0 rpx(30);
  display: flex;
  justify-content: space-between;
  background: #fff;
}

.btnlist .list:last-child {
  border-bottom: 0px;
}

.btnlist .mingxi .icon-jiaoyijilu{
  font-size: rpx(32);
  margin-right: rpx(10);
}
.icon-return1 {
  font-size: rpx(26);
  color: #bbb;
}
</style>