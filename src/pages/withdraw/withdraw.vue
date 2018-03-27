<template>
    <page>
        <!--pages/withdraw/withdraw.wxml-->  <div src="/template/common.wxml" import="1" />    <div class="account-wrapper">    <div class="tip">手机号码:</div>    <input type="text" placeholder="手机号码" data-name="mobile" @change="bindKeyInput" />    <div class="tip">收款人姓名:</div>    <input type="text" placeholder="收款人姓名" data-name="name" @change="bindKeyInput" />      <!--view class="tip">微信收款:</view>    <view class="body-view">      <switch checked bindchange="switch" />      <block wx:if="{{model}}">        微信收款      </block>      <block wx:else>        银行卡收款      </block>    </view-->    <div class="classname" v-if="!model">      <div class="tip">收款银行:</div>      <input type="text" placeholder="收款银行" data-name="bankuname" @change="bindKeyInput" />      <div class="tip">银行卡号:</div>      <input type="text" placeholder="银行卡号" data-name="bankid" @change="bindKeyInput" />      <div class="tip">开户行:</div>      <input type="text" placeholder="开户行" data-name="bankname" @change="bindKeyInput" />    </div>      <div class="tip">提现金额:</div>    <input type="text" placeholder="提现金额" data-name="money" @change="bindKeyInput" />    <!--view class="tip">支付密码:</view>    <input type="text" placeholder="支付密码" data-name="pwd" bindinput="bindKeyInput" password/-->    <div class="btngroup">      <button @click="tx">申请提现</button>    </div>  </div>       <contact is="contact" :data="contaction"></contact>     <div style="height:0.01rem;"></div>  <tabbar is="tabbar"></tabbar>
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
      title: "账户中心",
      back: 2
    },
    showtabbar: true,
    model: false,
    form: {}
  },
  
  onLoad: function (options) {
    util.contactInit(this);
  },
  switch(e) {
    var form = this.data.form;
    form['model'] = e.detail.value

    this.setData({
      form: form,
      model: e.detail.value
    })

  },
  bindKeyInput(e) {
    var form = this.data.form;
    form[e.currentTarget.dataset.name] = e.detail.value
    this.setData({
      form: form
    })
    console.log(form);
  },
  tx() {
    util.getAjaxData("account_tx", this.data.form, function (res) {
      wx.showModal({
        title: '提示',
        content: res.data.data
      })
    }, 'POST');
  },
  onPullDownRefresh: function () {
    this.loadDetail();
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../common/style/page.scss';
/* pages/withdraw/withdraw.wxss */

page {
  background: #f8f7f7;
}

input,.body-view{
  padding:4px 10px;
  font-size: 14px;
  background: white;
  margin:10px 0;
  border:solid 1px #ccc;
  border-radius:3px;
}
button{
  height: 35px;
  line-height: 35px;
  background: #FF9935;
  color:white;
  border-radius: 3px;
  margin:10px 0;
}
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
</style>