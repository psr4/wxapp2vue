<template>
    <page>
        <div src="/template/common.wxml" import="1"/>    <div class='title'>入驻人员</div>  <div class='bor20'></div>  <div class='ul'>    <div class='li' v-for="(item,index) in users" :key="index">      <img :src="item.headimgurl"></img>      <div class='name'>{{item.nickname}}</div>        <div class='add_time'>{{item.tuan_add_time}}</div>    </div>     </div>  <!-- <view class="tabbtn">    <view class="btn1 {{tabid==1?'active':''}}" bindtap="changtab" data-id="1">已完成订单</view>    <view class="btn2 {{tabid==2?'active':''}}" bindtap="changtab" data-id="2">未完成订单</view>  </view>      <view class="userlist" style="{{tabid==2?'display:none;':''}}">    <view class="list" wx:for="{{u1}}" wx:key="u1">        <view class="userinfo">          <view class="nickname" style="font-size:10px;">订单号:{{item.orderSn}}</view>        </view>        <view class="userinfo">          <view class="nickname"  style="color:red;">{{item.intro}}</view>        </view>        <view class="userinfo">          <view class="nickname"   style="color:red;">分成金额:{{item.order_fcprice}}</view>          <view class="nickname"  style="font-size:10px;">{{item.addtime}}</view>        </view>    </view>  </view>  <view class="userlist" style="{{tabid==1?'display:none;':''}}">    <view class="list" wx:for="{{u2}}" wx:key="u2">        <view class="userinfo">          <view class="nickname">订单号:{{item.orderSn}}</view>        </view>        <view class="userinfo">          <view class="nickname" style="color:red;">{{item.intro}}</view>        </view>        <view class="userinfo">          <view class="nickname" style="color:red;">分成金额:{{item.order_fcprice}}</view>          <view class="nickname">{{item.addtime}}</view>        </view>    </view>  </view> -->  <div />   <!-- <template is="contact" data='{{contaction}}'></template>  -->
    </page>
</template>
<script>
    import {Page,getApp,wx} from '@/common/js/Weapp'
    //index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
const pageData = Page({
  data: {
    titlebar: {
      title: "团队订单",
      back: 2
    },
    tabid:1,
    showtabbar: true
  },
  
  onLoad: function (options) {
    util.contactInit(this);
    var me = this;
    util.getAjaxData("tuanUsers", {}, function (res) {
      me.setData({
         users:res.data.data
      })
    }, "POST");
  },
  changtab(e){
    this.setData({
      tabid:e.currentTarget.dataset.id
    })
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
@import '../../common/style/page.scss';
 /* .tabbtn{    
  display: flex;
  width:200px;
  margin:10px auto;
}
.tabbtn .btn1,.tabbtn .btn2{
  flex:1;
  text-align: center;
  width:100px;
  line-height: 30px;
  font-size:12px;
  color:#EF2F72;
  border: solid 1px  #EF2F72;
}
.tabbtn .active{
  background: #EF2F72;
  color:white;
}

.tabbtn .btn1{
  border-radius:5px 0 0 5px;
}
.tabbtn .btn2{
  border-radius: 0 5px 5px 0;
}

.userlist .list{
  width:80%;
  margin:0 auto;
  background: white;
  border-bottom:solid 1px #ddd;
  padding:10px;
  border-top:solid 1px #EF2F72;
}
.userlist .list:first-child{
  border-radius:5px 5px 0 0 ;
}
.userlist .list:last-child{
  border-bottom:0px;
  border-radius:0 0 5px 5px;
}

.userlist .list .headimg img{
  width:40px;
  height: 40px;
  border-radius:40px;
  background: red;
  margin:10px;
}
.userlist .list .userinfo{
  display: flex;
}
.userlist .list .userinfo .nickname{
  font-size: 12px;
  line-height: 20px ;
  flex:1;
}
.userlist .list .userinfo .regtime{
  font-size:12px;
  color:red;
}  */
.title{
  font-size: 16px;
  line-height: 48px;
  color: #333;
  text-align: center;
}
.ul{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: rpx(30) auto;
}
.ul .li{
  flex: 0 0 25%;
  text-align: center;
  padding-bottom: rpx(20);
}
.ul .li img{
  width: rpx(130);
  height: rpx(130);
  border-radius: rpx(65);
  margin: 0 auto;
}
.ul .li .name{
  color: #999;
}
.add_time{
  color: #E09142;
}
</style>