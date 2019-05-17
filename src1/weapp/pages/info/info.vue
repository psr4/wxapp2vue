<template>
    <div class="page">
        <!--pages/info/info.wxml-->  <div src="/template/common.wxml" import="1"/>  <!--   <view class="tab">  <view class="item {{status == 0?'active':''}} clearbor" data-status="0" bindtap="changetab">我的资料</view>  <view class="item {{status == 1?'active':''}}" data-status="1" bindtap="changetab">修改密码</view>  </view> -->      <div class="box" v-if="(status == 0 )">    <div class="list">      <div class="title">昵称:</div>      <div class="content">{{nickName}}</div>    </div>    <div class="list">      <div class="title">头像:</div>      <div class="content"><img :src="(avatarUrl)"></img></div>    </div>    <div class="list">      <div class="title">帐号:</div>      <div class="content">{{userInfo.username}}</div>    </div>    <div class="list">      <div class="title">等级:</div>      <div class="content">{{userInfo.level}}</div>    </div>    <div class="list">      <div class="title">地区:</div>      <div class="content">{{userInfo.province}} {{userInfo.city}}</div>    </div>  </div>    <div class="account-wrapper" v-if="(status == 1)">    <!--view class="tip">原密码:</view>      <input type="text" placeholder="请填写您的原密码" data-name="oldpassword" bindinput="bindKeyInput" password/>    <view class="tip">新密码:</view>      <input type="text" placeholder="输入新密码，不修改请留空" data-name="newpassword" bindinput="bindKeyInput" password/-->    <div class="tip">原支付密码:</div>      <input type="text" placeholder="请输入您的原支付密码，首次更改留空" data-name="oldpaypwd" password=1 @keyDown="bindKeyInput">    <div class="tip">新支付密码:</div>      <input type="text" placeholder="输入支付新密码" data-name="newpaypwd" password=1 @keyDown="bindKeyInput">      <div class="btngroup">       <button @click="changepwd">修改</button>      </div>    </div>    <div/>   <!-- <template is="contact" data="{{contaction}}"></template>  -->    <tabbar is="tabbar" :data="(showtabbar)"></tabbar>   
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
    titlebar: {
      title: "账户中心",
      back: 2
    },
    showtabbar: true,
    status: 0,
    model: true,
    form: {},
    avatarUrl: "",
    nickName: "",
    userInfo: ""
  },
  onLoad: function (options) {
    util.contactInit(this)

    console.log(app.globalData.userInfo);
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName,
      userInfo: app.globalData.user
    });
  },
  switch(e) {
    var form = this.data.form;
    form[ 'model' ] = e.detail.value

    this.setData({
      form: form,
      model: e.detail.value
    })

  },
  bindKeyInput(e) {
    var form = this.data.form;
    form[ e.currentTarget.dataset.name ] = e.detail.value
    this.setData({
      form: form
    })
    console.log(form);
  },
  changepwd() {
    util.getAjaxData("changepwd", this.data.form, function (res) {
      wx.showModal({
        title: '提示',
        content: res.data.data
      })
    }, 'POST');
  },
  changetab: function (data) {
    this.setData({
      status: data.currentTarget.dataset.status
    })

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../common/style/page.scss';
/* pages/info/info.wxss */

.tab{
  background: white;
  display: flex;
  box-shadow: 0 0 4px #ddd;
}
.tab .item{
  flex:1;
  text-align: center;
  line-height: 40px;
  border-left:solid 1px #ddd;
}
.tab .active{
  color:#FF9935;
}
.tab .item.clearbor{
  border: none;
}
.box{
  margin: 10px 0;
  background: white;
}
.tips{
  text-align: center;
  padding: 20px 0;
}
.box .item{
  display: flex;
  border-bottom:solid 1px #ddd;
  padding:10px;
  font-size: 12px;
  color:#666;
}
.box .item .left{
  flex:1;
}
.box .item .right{
  flex: 0 0 20%;
  text-align:right;
}
.box .item .right .money{
  color:red;
  font-size:14px;
  font-weight: 600;
}
input,.body-view{
  padding:4px 10px;
  font-size: 14px;
  background: white;
  margin:10px 0;
  border:solid 1px #ccc;
  border-radius:3px;
}
/* button{
  height: 35px;
  line-height: 35px;
  background: #FF9935;
  color:#fff;
  border-radius: 3px;
  margin:10px 0;
} */
.btngroup{
  height: 20px;
}
.tip{
  font-size:14px;
  color:#666;
}
.account-wrapper{
  padding: 40px 20px;

}

.box .list {
  display: flex;
  line-height: 35px;
  font-size: 14px;
}
.box .list .title{
  flex:0 0 30%;
  text-align: center;
}
.box .list .content{
  flex:1;
}

.box .list .content img{
  height: 40px;
  width: 40px;
}
</style>