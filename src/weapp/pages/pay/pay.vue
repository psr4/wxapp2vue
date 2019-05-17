<template>
    <div class="page">
        <!--pages/pay/pay.wxml--> <div src="/template/common.wxml" import="1" />  <div class="box">     <div class="title">联系人地址</div>     <div class="address" :data-id="(address.id)" v-if="(address)">         <div class="info">{{address.consignee}} ( {{address.mobile}} )</div>         <div class="addr">{{address.sheng}} {{address.shi}} {{address.qu}} {{address.address}}</div>     </div>     <myurl block="1" class="choose" url="/pages/address/address?method=chooseaddress">选择地址</myurl> </div>   <!--view class="box">   <block wx:if="{{yunfei.freesum == 0}}">   <view class="title1">卖家承担运费</view>   </block>   <block wx:elif="{{yunfei.freesum > 0}}"> <view class="title1">选择配送方式:</view>  <picker-view class="select" indicator-style="height: 30px;" value="{{value}}" bindchange="bindChange1">     <picker-view-column>       <view class="items">平邮</view>       <view class="items">快递</view>       <view class="items">EMS</view>     </picker-view-column>   </picker-view>     </block> </view-->  <div class="box">     <div class="title1">给卖家的留言:</div>     <textarea placeholder="选填，可以告诉卖家您对商品的特殊需求，如颜色、尺码等" @keyDown="textInput" /> </div>  <div class="box">     <myurl block="1" url="/pages/coupon/coupon?method=choose">         <div class="title1">             <span> 使用优惠券:      {{discount?discount.name:"选择优惠券"}}</span>         </div>     </myurl> </div>  <div class="box text-right">     <!--view class="tip">满199减50、满399减100（点击“下单完成支付”自动满减）</view-->     <div class="title1">合计:¥{{totalmoney}} + 运费:¥{{yunfei}} - 优惠¥{{yh}}</div>     <div class="title1">=¥{{totalmoney - yh + yunfei}}元</div> </div>  <div class="box" style="text-align: center;">     <myurl block="1" @click="gopay">         <button class="gopay">下单完成支付</button>     </myurl> </div> <div style="height:1.2rem;"></div> <tabbar is="tabbar"></tabbar> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
const pageData = Page({
	data: {
		titlebar: {
			title: "订单支付",
			back: 1
		},
		address: false,
		num: 0,
		cart: [],
		totalmoney: 0,
		system_num: 0,
		sendprice: 0.00,
		yh: 0.00,
		list: [0],
		yunfei: 0
	},
	gopay() {
		var address = this.data.address;
		if (!address) {
			wx.showModal({
				title: '提示',
				content: '请选择收货地址!',
				success() {
					wx.navigateTo({
						url: '/pages/address/address?method=chooseaddress',
					})
				}
			})
		} else {
			var cart = [];
			for (var i = 0; i < this.data.cart.length; i++) {
				var item = {
					num: this.data.cart[i].num,
					id: this.data.cart[i].id
				}
				cart.splice(i, 0, item);
			}
			if (this.data.discount) {
				var discount = this.data.discount.id;
			} else {
				var discount = 0
			}
			util.getAjaxData("gopay", {
				cart: JSON.stringify(cart),
				discount: discount, sendmodel: this.data.sendmodel + 1, ms: this.data.ms, address: app.globalData.defaultaddress.id
			}, function (res) {
				wx.showToast({
					title: res.data.dialog
				})
				if (res.data.msg == "ok") {
					app.globalData.discount = null;
					wx.setStorageSync('buy', []);
					wx.setStorageSync('cart', []);
					if (res.data.data) {
						wx.redirectTo({
							url: '/pages/dopay/dopay?id=' + res.data.data,
						})
					}
				}
			}, "POST")
		}

	},
	textInput(e) {
		this.setData({
			ms: e.detail.value
		})
	},
	bindChange1(e) {
		var num = e.detail.value[0];
		var price;
		if (num === 0) {
			price = this.data.yunfei.pingyou;
		} else if (num === 1) {
			price = this.data.yunfei.kuaidi;
		} else if (num === 2) {
			price = this.data.yunfei.ems;
		}
		this.setData({
			sendprice: price.toFixed(2),
			sendmodel: num
		})
	},
	onLoad(options) {
		var me = this;
		util.getAjaxData("initpay", {}, function (res) {
			var enough = parseFloat(res.data.data.enough);
			var express = parseFloat(res.data.data.express);
			var carts = wx.getStorageSync('buy');
			if (carts.length > 0) {
				var totalmoney = 0;
				var yunfei = express;
				for (var i = 0; i < carts.length; i++) {
					totalmoney += carts[i].price * carts[i].num;
				}
				if (totalmoney > enough) {
					console.log(totalmoney);
					yunfei = 0;
				}
				me.setData({
					enough: enough,
					express: express,
					cart: carts,
					yunfei: yunfei,
					totalmoney: totalmoney.toFixed(2)
				})
			} else {
				wx.showModal({
					title: '提示',
					content: '请选择一些商品!',
					success() {
						wx.navigateTo({
							url: '/pages/index/index',
						})
					}
				})
			}
		}, "POST");
	},
	onShow: function () {
		var discount = app.globalData.discount;
		var totalmoney = 0;
		var yh = 0;
		if (discount) {
			console.log(discount);
			yh = parseFloat(discount.price);
		}
		this.setData({
			address: app.globalData.defaultaddress,
			discount: discount,
			yh: yh.toFixed(2)
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
/* pages/pay/pay.wxss */
.box{
  background: white;
  box-shadow: 0 0 4px #ccc;  
  padding:10px;
  margin-bottom:10px;
}
.box .title{
  font-size:14px;
  padding:10px 0;
  margin:0 20px;
  border-bottom:solid 1px #ddd;
}
.box .address{
  margin:10px 20px;
  font-size:12px;
  line-height:20px;

}
.box .gopay{
  background: #ef2f72;
  color:white;
  border-radius:3px;
  height:36px;
  line-height: 36px;
  width: 90%
}
.box .choose{
  text-align:center;
  font-size:14px;
  padding:8px 20px;
  background:#ccc;
  color:white;
  display:block;
  width:60%;
  margin:10px auto;
  border-radius:3px;

}
.box textarea{
  border:solid 1px #ddd;
  width:90%;
  margin:0 auto;
  height: 60px;
  font-size: 12px;
  padding:8px;
}
.box .title1{
  width:90%;
  margin:10px auto;
  font-size: 14px;
}
.box .tip{
	text-align: center;
	color:#EF2F72;
}
.box .select{
  display: inline-block;
  width:90%;
  margin:0 5%;
  height: 80px;
}
.box .select .items{
  line-height: 30px;
  text-align:center;
  width:90%;
  margin:0 5%;
}
.text-right{
  text-align: right;
}
</style>