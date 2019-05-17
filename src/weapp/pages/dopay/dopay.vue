<template>
    <div class="page">
        <!--pages/dopay/dopay.wxml--> <div src="/template/common.wxml" import="1"/>  <div class="box">  <div class="line">您的订单已成功生成，选择您想用的支付方式进行支付</div>  <div class="line">订单编号：<span class="red">{{order.orderId}}</span></div>  <div class="line">订单总价：<span class="red">¥{{order.order_sumPrice}}</span></div>  <div class="line">会员余额：<span class="red">{{user.user_account}}</span></div> </div>  <div class="select">  <picker :range="( ['余额支付','微信支付'] )" @change="bindChange1">  <div class="items">付款方式:{{model==='0'?'余额支付':'微信支付'}}</div>  </picker>  <!--picker-view class="select" indicator-style="height:30px;" bindchange="bindChange1">     <picker-view-column>       <view class="items">余额支付</view>       <view class="items">微信支付</view>     </picker-view-column>   </picker-view-->     <button class="pay" @click="pay">确认支付</button> </div> <div class="box">    <div class="tips">您可以在<navigator url="/pages/detail/detail" class="red"> 我的订单 </navigator>中查看或取消您的订单。</div>   <div class="tips">如果您现在不方便支付，可以随后到<navigator url="/pages/detail/detail" class="red"> 我的订单 </navigator>完成支付，我们会在48小时内为您保留未支付的订单。</div> </div> <tabbar is="tabbar" :data="(showtabbar)"></tabbar>  
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
// pages/dopay/dopay.js
var util = require('../../utils/util.js')
var app = getApp()
const pageData = Page({
  data: {
    model: '1',
    option: {
      id: 72
    }
  },
  onLoad: function (options) {
    var id = options.id;
    var me = this;
    util.getAjaxData("paydetail", { id: id }, function (res) {
      me.setData({
        user: res.data.data.user,
        order: res.data.data.order,
        option: options
      })
    }, "POST")
  },
  bindChange1(e) {
	  console.log(e.detail.value[0]);
    this.setData({
      model: e.detail.value[0]
    })
  },
   pay() {
    var me = this;
    util.pay({ method: "detail", id: this.data.option.id, model: this.data.model }, function (res) {
      if (me.data.model == 0) {
        if (res.data.msg == "ok") {
          wx.showToast({
            title: res.data.data,
          })
		  wx.redirectTo({
			  url: '/pages/order/order',
		  })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.data,
            success() {
				wx.redirectTo({
                url: '/pages/account/account',
              })
            }
          })
        }
      } else {
        if (res.errMsg == "requestPayment:ok") {
          wx.showToast({
            title: "支付成功!",
          })
		  wx.redirectTo({
              url: '/pages/order/order',
          })
        }
      }
    });
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
/* pages/dopay/dopay.wxss */

.box {
    background: white;
    padding: 5px 10px;
    margin-bottom: 10px;
    box-shadow: 0 0 4px #ccc;
}

.box .line {
    font-size: 14px;
    line-height: 20px;
}

.box .tips {
    font-size: 12px;
    line-height: 20px;
}

.box .red {
    display: inline-block;
    color: black;
}

button {
    background: #ef2f72;
    color: white;
    height: 40px;
    line-height: 40px;
    margin: 10px 0;
    border-radius: 3px;
}

.select {
    display: inline-block;
    width: 90%;
    margin: 0 5%;
    height: 80px;
    line-height: 30px;
    text-align: center;
}

.select .items {
    font-size: 16px;
    box-shadow: 0 0 4px #ccc;
}

</style>