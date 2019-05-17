<template>
    <div class="page">
        <div class="picture">      <swiper autoplay="true" >          <swiper-item :key="index" v-for="(item,index) in img">              <img mode="aspectFit" :src="(item.url)" :data-src="(item.url)" @click="previewimage"></img>          </swiper-item>      </swiper>  </div>    <div class="information">      <div class="title">{{item.title}}</div>      <div class="jiage">            <div class="yuanjia">地址：{{item.sheng}}{{item.shi}}{{item.qu}}{{item.detail}}</div>          <div class="yuanjia">距离：{{item.distance}}</div>       </div>   </div>      <div class="info">    <div src="../../wxParse/wxParse.wxml" import="1"/>     <wxParse is="wxParse" :data="({wxParseData:article.nodes})" v-if="(show)"/>  </div>    <div style="height:60px;"></div>      <div class="cartbar">      <ul>          <li class="tubiao">              <navigator url="/pages/index/index" open-type="switchTab">                  <div class="icon">                      <img src="/image/img/home.png"></img>                  </div>                  <div class="title">首页</div>              </navigator>          </li>          <li class="tubiao" @click.stop="call" :data-tel="(item.tel)">                             <div class="icon" >                      <img src="/image/img/tel.png"></img>                  </div>                  <div class="title">一键拨打</div>                    </li>             <li class="tubiao" @click.stop="sall">                      <div class="icon">                      <img src="/image/img/sall.png"></img>                  </div>                  <div class="title">售卖</div>                   </li>             <li class="tubiao" >              <button open-type='contact'>                    <div class="icon" >                        <img src="/image/img/kefu.png"></img>                    </div>                               <div class="title">联系客服</div>                </button>          </li>           <!-- <view class="contact {{isSall?'c-show':''}} isSall " catchtap="isSall">            <image src='{{item.menu_img}}' mode='aspectFit'></image>                 </view> -->        </ul>  </div>     
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js')
var app = getApp()
const pageData = Page({
  data: {
    titlebar: {
      title: "商品详情",
      back: 1
    },
    item: {},
    img: [],
    show: 1,
    isBuy: 0,
    cart: [],
    money: 0.00,
    coupon: false,
    nownum: 1,
    contaction: false,
    isSall: false,
    article: {}
  },
  call(e) {
    console.log(e)
    const phoneNumber = e.currentTarget.dataset.tel
    console.log(phoneNumber)
    wx.makePhoneCall({
      phoneNumber
    })
  },
  contact() {
    this.setData({
      contaction: !this.data.contaction
    });
  },
  sall() {

    wx.previewImage({
      current: this.data.item.menu_img, // 当前显示图片的http链接
      urls: [ this.data.item.menu_img ] // 需要预览的图片http链接列表
    })
    // this.setData({
    //   sall: !this.data.sall
    // });
  },
  onLoad: function (options) {
    this.setData({ options })
    const url = util.getAjaxUrl("getCode")
    this.setData({ url })

    util.contactInit(this);
    var me = this;
    var cart = wx.getStorageSync('cart');
    var nownum = 1;
    if (cart) {
      for (var i = 0; i < cart.length; i++) {
        if (cart[ i ].id === options.id) {
          nownum = cart[ i ].num;
        }
      }
    } else {
      cart = [];
    }

    this.setData({ distance: options.distance });
    util.getLocation(point => {
      util.getAjaxData("item", { lng: point.lng, lat: point.lat, id: options.id }, function (res) {
        if (!res.data.data.item.id) {
          wx.showModal({
            title: '读取失败',
            content: "未找到对应店铺!",
            success: function (res) {
              wx.navigateBack()
            }
          })
        } else {
          me.setData({
            nowprice: res.data.data.item.price,
            item: res.data.data.item,
            img: res.data.data.img,
            // attr: res.data.data.attr,
            // attr1: res.data.data.attr1,
            id: options.id,
            // cartcount: cart.length,
            // nownum: nownum,
            // cart: cart,
            // discount: res.data.data.discount,
            titlebar: {
              title: res.data.data.item.title,
              back: 1
            }
          })
          WxParse.wxParse('article', 'html', res.data.data.item.info, me, 0)
        }
      });
    });
  },
  receive(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var me = this;

    util.getAjaxData("disget", { id: id }, function (res) {
      if (res.data.msg == "success") {
        var discount = me.data.discount;
        discount[ index ].hasget = 1;
        me.setData({
          discount: discount
        })
      }
      wx.showToast({
        icon: res.data.msg,
        title: res.data.data,
      })
    });
  },
  numinput(e) {
    if (e.detail.value == "") {
      return;
    }
    var method = e.currentTarget.dataset.id;
    var nownum = this.data.nownum;
    var newnum = parseInt(e.detail.value);
    if (this.data.item.is_xianggou == 1) {
      if (this.data.item.xiangou_num < newnum) {
        newnum = this.data.item.xiangou_num;
      }
    }
    if (newnum >= 1) {
      this.setData({
        nownum: newnum
      })
    } else {
      this.setData({
        nownum: nownum
      })
    }
  },
  changenum(e) {
    var method = e.currentTarget.dataset.id;
    var nownum = this.data.nownum;
    if (method == "sub" && nownum > 1) {
      nownum--;
    } else if (method == "add") {
      if (this.data.item.is_xianggou == 1) {
        if (this.data.item.xiangou_num > num) {
          nownum++;
        }
      } else {
        nownum++;
      }
    }
    this.setData({
      nownum: nownum
    })
  },
  test() {

  },
  hidebuy() {
    this.setData({
      isBuy: 0
    })
  },
  buy(e) {
    var method = e.currentTarget.dataset.method;
    this.setData({
      method: method,
      isBuy: 1
    })
  },
  addcoupon() {
    this.setData({
      coupon: !this.data.coupon
    })
  },
  return() {
    this.setData({
      showtip: !this.data.showtip
    })
  },
  radioChange(e) {
    var id = e.detail.value;
    for (var i = 0; i < this.data.attr1.length; i++) {
      var attr1 = this.data.attr1;
      if (attr1[ i ].id == id) {
        this.setData({
          nowprice: parseFloat(this.data.item.price) + parseFloat(attr1[ i ].attr_value)
        })
      }
    }
  },
  addcart: function (data) {
    var goodsinfo = [ {
      id: this.data.item.id,
      pic: this.data.img[ 0 ].url,
      title: this.data.item.title,
      price: this.data.nowprice,
      pingyou: this.data.item.pingyou,
      kuaidi: this.data.item.kuaidi,
      ems: this.data.item.ems,
      free: this.data.item.free,
      num: this.data.nownum,
      is_xiangou: this.data.item.is_xiangou,
      xiangou_num: this.data.item.xiangou_num,
      cate_id: this.data.item.cate_id
    } ];
    var value = this.data.cart;
    var itemindex = -1;
    for (var i = 0; i < value.length; i++) {
      if (value[ i ].id == goodsinfo[ 0 ].id) {
        var itemindex = i;
      }
    }
    if (itemindex == -1) {
      value = value.concat(goodsinfo);
    } else {
      value[ itemindex ] = goodsinfo[ 0 ];
    }
    wx.setStorageSync('cart', value);
    if (this.data.method == "cart") {
      wx.switchTab({
        url: '/pages/cart/cart',
      })
    } else if (this.data.method == "buy") {
      wx.setStorageSync('buy', goodsinfo);
      wx.redirectTo({
        url: '/pages/pay/pay',
      })
    }
  },
  showinfo: function () {
    this.setData({
      show: !this.data.show
    })
  },
  onPullDownRefresh: function () {
    this.onLoad(this.data.options)
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage,
  previewimage: util.previewimage
})

    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../common/style/page.scss';
/* pages/detail/detail.wxss */

.picture .slideitem, .picture img {
    width: rpx(750);
    height: rpx(500);
}

.information {
    padding: rpx(40);
   
}

.information .title {
    font-size: rpx(34);
    color: #242424;
    text-align: center;
    font-weight: 600;
}

.information .jiage {
    margin-top: rpx(20);
    align-items: flex-end;
    color: #4a4a4a;
    font-size: rpx(26);
    text-align: center;
}

.information .jiage .value {
    font-size: rpx(36);
    font-weight: bold;
    color: #FF9935;
    margin-right: rpx(40);
}

.information .jiage .unit {
    color: #ef2f72;
}

.kuang {
    box-sizing: border-box;
    display: flex;
    line-height: 1.2;
    background: #f8f7f7;
    padding: 10px rpx(40);
    color: #4a4a4a;
    font-size: rpx(24);
    border-bottom: rpx(1) solid #f4f4f4;
}

.kuang .youhuiquan {
    flex: 0 0 80%;
}
.kuang .iconfont{
    width:16px;
    margin-right:rpx(15);

}
.icon-return1.active{
    transform:rotate(90deg);
}
.kuang .icon-youhuiquan {
    color: #ef2f72;
    margin-right: rpx(15);
}

.kuang .icon-return1 {
    transition: .5s;
    color: #a1a1a1;
    font-size: rpx(28);
}
.jiage img{
	width:rpx(400);
}
.information .jiage {
  color:#FF9935;
	font-size:14px;
	line-height: 20px;
}
.information .jiage .yuanvalue{
	color:#000;
	font-weight: 600;
}
.information .jiage .yuanjia .yuanvalue {
    text-decoration: line-through;
}

.info {
    font-size: 0px;
}

.shuliang {
    display: flex;
    width: 100%;
    text-align: center;
    /* border-top:rpx(1) solid #f4f4f4; */
    border-bottom: rpx(1) solid #f4f4f4;
    padding: rpx(40) 0;
    color: #a1a1a1;
}

.shuliang .shuxing {
    flex: 0 0 30%;
}

.shuliang .line {
    border-right: rpx(1) solid #f4f4f4;
}

.shuliang .shuxing .zhi {
    padding: rpx(10) 0;
}

/* 展示店铺优惠券 */

.showcoupon {
    position: fixed;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    transition: 0.5s;
}

.active {
    top: 0;
}

.showcoupon .touming {
    height: 24%;
    background: rgba(0, 0, 0, 0.9);
}

.showcoupon .coupons {
    height: 76%;
    background: #f8f7f7;
    padding: rpx(20) 0;
    position: relative;
}

.showcoupon .coupons .title {
    text-align: center;
}

.showcoupon .coupons .coupon {
    width: 90%;
    margin: rpx(30) auto;
    background: #bbb;
    border-radius: 0 5px 5px 0;
    display: flex;
    padding: rpx(20) rpx(20);
    align-items: center;
}

.showcoupon .coupons .coupon.active {
    background: #fd5992;
}

.showcoupon .coupons .coupon  .info {
    flex: 1;
    padding-left: rpx(20);
    color: #fff;
    position: relative;
    border-right: dashed 1px #fff;
}

.showcoupon .coupons .coupon  .info::before {
    position: absolute;
    display: block;
    height: 16px;
    width: 16px;
    border-radius: 16px;
    top: -18px;
    right: -8px;
    background: #f8f7f7;
    content: "";
}

.showcoupon .coupons .coupon  .info::after {
    position: absolute;
    display: block;
    height: 16px;
    width: 16px;
    border-radius: 16px;
    bottom: -18px;
    right: -8px;
    background: #f8f7f7;
    content: "";
}

.showcoupon .coupons .coupon  .info .value {
    line-height: rpx(90);
    font-size: rpx(54);
}

.showcoupon .coupons .coupon  .info .value span, .manjian, .time {
    font-size: rpx(20);
    line-height: rpx(30);
}

.showcoupon .coupons .coupon .lingqu {
    flex: 0 0 25%;
    text-align: center;
    color: #fff;
}

.showcoupon .coupons .complete {
    position: absolute;
    width: 100%;
    height: rpx(120);
    background: -webkit-linear-gradient(left, #ef582f, #efa02f);
    bottom: 0;
    left: 0;
    z-index: 100;
    text-align: center;
    font-size: rpx(28);
    line-height: rpx(80);
    color: #fff;
}

/* 购买栏 */

.cartbar {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: rpx(100);
    border-top: 1px solid #f2f2f2;
    background: #fff;
}

.cartbar ul {
    display: flex;
    width: 100%;
    height: 100%;
    text-align: center;
}

.cartbar ul .tubiao {
    flex: 0 0 25%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
/* 
.cartbar ul .button {
    flex: 0 0 30%;
}

.cartbar ul .button button {
    width: 100%;
    height: 100%;
    font-size: rpx(30);
    line-height: rpx(100);
    color: #fff;
    border-radius: 0;
    border: none;
}

.cartbar ul .button .jiaru {
    background: -webkit-linear-gradient(left, #ef582f, #efa02f);
}

.cartbar ul .button .buy {
    background: #ef2f72;
} */

.cartbar ul li .icon {
    flex: 0 0 24px;
}

.cartbar ul li .icon, .cartbar ul li .icon img {
    width: 24px;
    height: 24px;
    margin: 0 auto; 
    vertical-align: top;
}

.cartbar ul li .title {
    font-size: 12px;
    line-height: 18px;
    color: #b7b7b7;
}

.cart-wrapper.active {
    top: 0px;
}

.cart-wrapper {
    position: fixed;
    bottom: 0px;
    top: 100%;
    left: 0px;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    transition: 0.5s;
    overflow: hidden;
}

.cart-wrapper .cart {
    background: white;
    bottom: 0px;
    position: absolute;
    left: 0px;
    width: 100%;
}

.cart-wrapper .cart .goods {
    position: relative;
    display: flex;
    border-bottom: solid 1px #ccc;
    padding: 4px 0;
}

.cart-wrapper .cart .goods .img {
    flex: 0 1 80px;
}

.cart-wrapper .cart .goods .img img {
    width: 60px;
    height: 60px;
    position: absolute;
    top: -30px;
    left: 5px;
    border: solid 2px #fff;
    background: white;
}

.cart-wrapper .cart .goods .info {
    flex: 1;
}

.cart-wrapper .cart .goods .info .price  {
    color: #ef2f72;
    font-size: 14px;
}
.cart-wrapper .cart .goods .info .desc{
    color: #999;
    font-size: 14px;
}


.cart-wrapper .cart .num {
    display: flex;
    padding: 10px 0;
}

.cart-wrapper .cart .num .label {
    flex: 1;
    padding: 10px 20px;
    font-size: 16px;
}

.cart-wrapper .cart .num .control {
    padding: 8px;
    display: flex;
    flex: 1;
    line-height: 24px;
}

.cart-wrapper .cart .num .control .input {
    border-top: solid 1px #ccc;
    border-bottom: solid 1px #ccc;
    text-align: center;
    width: 40px;
    box-sizing: border-box;
    height: 24px;
}

/* .cart-wrapper .cart .num .control button {
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    width: 32px;
    margin: 0;
    border-radius: 0px;
    border: solid 1px #ccc;
    box-sizing: border-box;
} */

/* .cart-wrapper .cart .num .control button::after {
    display: none;
} */

/* .cart-wrapper .cart .btn button::after {
    display: none;
} */

/* .cart-wrapper .cart .btn button {
    border-radius: 0px;
    background: #ef2f72;
    height: 42px;
    line-height: 42px;
    font-size: 12px;
    color: white;
} */
.sall{
  overflow: auto;
}
.sall img{
  margin: 0;
  height:90%;
   padding-top:7%;

}


.btn_contact{
  background: transparent;
  border:0px solid transparent;
  position:static;
  padding: 0;

}
.tubiao button{
  padding-top: 0;
  overflow: auto;
  background: transparent;
  font-size: rpx(40);
}
.tubiao button .icon{
  padding-top: 0;
}
.tubiao button img{
  margin-top: 0;
  padding-top: 0;
}
.tubiao button::after{
  display: none;
}
.tubiao .title{
  line-height: rpx(40);
}

.info {
    font-size: 12px;
    padding: 0;
    box-sizing: border-box;
    margin: 10px 0;
}
.info img{
  width: 100%;
}
</style>