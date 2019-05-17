<template>
    <div class="page">
        <div src="/template/common.wxml" import="1" />          <div class="account-wrapper">    <form @submit="cz">      <div class="tip">充值金额:</div>      <input type="text" placeholder="充值金额" name="money" />      <div class="btngroup">        <button type="submit">提交充值</button>      </div>    </form>  </div>     <contact is="contact" :data="(contaction)"></contact>     <tabbar is="tabbar"></tabbar> 
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
        showtabbar: true
  },
    onLoad: function (options) {
      util.contactInit(this)
    },
    cz(e) {
        var me = this;
        util.pay({ method: "charge", money: e.detail.value.money }, function (res) {
            console.log(res);
            if (res.data.msg == "no") {
                wx.showModal({
                    title: '提示',
                    content: res.data.data,
                })
            } else {
                if (res.errMsg == "requestPayment:ok") {
                    wx.showToast({
                        title: "支付成功!",
                    })
                    wx.navigateTo({
                        url: '/pages/detail/detail',
                    })
                }
            }
        });
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
@import '../../../common/style/page.scss';
/* pages/recharge/recharge.wxss */

.page {
  background: #f8f7f7;
}

input{
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