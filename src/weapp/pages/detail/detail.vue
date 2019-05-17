<template>
    <div class="page">
        <div class="picture">     <swiper autoplay="true">         <swiper-item :key="index" v-for="(item,index) in img">             <img mode="aspectFit" :src="(item.url)" :data-src="(item.url)" @click="previewimage"></img>         </swiper-item>     </swiper> </div>  <div class="information">     <div class="title">{{item.title}}</div>     <div class="jiage">         <!--view> <image mode='widthFix' src="/image/img/tip.png"></image></view>         <text class="unit"></text>         <view class="yuanjia">原价： <text class="yuanvalue">￥{{item.marketprice}}</text></view>         <view class="yuanjia">双十一狂欢价：<text class="value">￥{{item.price}}</text-->         <div class="yuanjia">价格：             <span class="value">￥{{item.price}}</span>         </div>      </div> </div>   <!--view class="kuang">     <view class="bianahao">{{item.intro}}</view> </view-->  <!--view class="kuang" bindtap="addcoupon">     <i class="iconfont icon-youhuiquan"></i>     <view class="youhuiquan">领取优惠券</view>     <i class="iconfont icon-return1"></i> </view-->  <!-- 展示优惠券 --> <!--view class="showcoupon {{coupon?'active':''}}">     <view class="touming" bindtap="addcoupon"></view>     <view class="coupons">         <view class="title">店铺优惠券</view>         <view class="coupon  {{item.hasget==1?'':'active'}}" wx:for="{{discount}}" wx:key="*this">             <view class="info">                 <view class="value"><text>￥</text>{{item.price}}</view>                 <view class="manjian">                     {{item.type == 1?'现金券':'订单满'+item.usable+'元可使用'}}                 </view>                 <view class="time">{{item.sykssj}}-{{item.syjssj}}</view>             </view>             <view class="lingqu" bindtap="{{item.hasget==1?'':'receive'}}" data-id="{{item.id}}" data-index="{{index}}">                 {{item.hasget==1?'领取成功':'立即领取'}}             </view>         </view>         <view class="complete" bindtap="addcoupon">完成</view>     </view> </view-->   <!--view class="shuliang">     <view class="shuxing line">         <view class="name">库存</view>         <view class="zhi">{{item.goods_stock}}</view>     </view>     <view class="shuxing line">         <view class="name">销量</view>         <view class="zhi">{{item.buy_num}}</view>     </view>     <view class="shuxing">         <view class="name">运费</view>         <view class="zhi">{{item.free==1?'包邮':'不包邮'}}</view>     </view> </view>  <view class="kuang">     <i class="iconfont"></i>     <view class="youhuiquan" bindtap="showinfo">宝贝详情</view>     <i class="iconfont icon-return1 {{show?'active':''}}"></i> </view-->  <div class="info">     <div src="../../wxParse/wxParse.wxml" import="1" />     <wxParse is="wxParse" :data="({wxParseData:article.nodes})" v-if="(show)" /> </div>  <div style="height:60px;"></div>   <div class="cartbar">     <ul>         <li class="tubiao">             <myurl block="1" url="/pages/index/index" open-type="switchTab">                 <div class="icon">                     <img src="/image/img/home.png"></img>                 </div>                 <div class="title">首页</div>             </myurl>         </li>         <li class="tubiao">             <myurl block="1" url="/pages/cart/cart" open-type="switchTab">                 <div class="icon">                     <img src="/image/img/cart.png"></img>                 </div>                 <div class="title">购物车</div>             </myurl>         </li>         <li class="button">             <myurl block="1" data-method="cart" @click="buy">                 <button class="jiaru">加入购物车</button>             </myurl>         </li>         <li class="button">             <myurl block="1" data-method="buy" @click="buy">                 <button class="buy">立即购买</button>             </myurl>         </li>     </ul> </div>   <div :class="('cart-wrapper '+(buy?'active':''))" @click.stop="hidebuy">     <div class="cart" @click.stop="test">         <div class="goods">             <div class="img">                 <img :src="(item.img)"></img>             </div>             <div class="info">                 <div class="price">￥{{item.price}}</div>                 <!--view class="desc"> 库存 :{{item.goods_stock}} {{item.is_xiangou==1?'限购:'+item.xiangou_num:''}}</view-->             </div>         </div>         <div class="num">             <div class="label">                 数量             </div>             <div class="control">                 <myurl class="buy_btn iconfont icon-sub" block="1" data-id="sub" @click="changenum">-</myurl>                 <input class="input" type="tel" :value="(nownum)" @keyDown="numinput"></input>                 <myurl class="buy_btn iconfont icon-add" block="1" data-id="add" @click="changenum">+</myurl>             </div>         </div>         <div class="btn">             <myurl block="1" data-id="add" @click="addcart">                 <button>确认</button>             </myurl>         </div>     </div> </div> <button open-type="contact" class="kfbtn">     <span>联 系 客 服 </span> </button> 
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
        buy:0,
		cart: [],
		money: 0.00,
		coupon: false,
        nownum:1
	},
	onLoad: function (options) {
		var me = this;
		var cart = wx.getStorageSync('cart');
		var nownum = 1;
		if (cart) {
			for (var i = 0; i < cart.length; i++) {
				if (cart[i].id === options.id) {
					nownum = cart[i].num;
				}
			}
		} else {
			cart = [];
		}
		util.getAjaxData("item", { id: options.id }, function (res) {
			if (!res.data.data.item.id) {
				wx.showModal({
					title: '读取失败',
					content: "未找到对应商品!",
					success: function (res) {
						wx.navigateBack()
					}
				})
			} else {
				me.setData({
					nowprice: res.data.data.item.price,
					item: res.data.data.item,
					img: res.data.data.img,
					attr: res.data.data.attr,
					attr1: res.data.data.attr1,
					id: options.id,
					cartcount: cart.length,
					nownum: nownum,
					cart: cart,
					discount: res.data.data.discount,
					titlebar: {
						title: res.data.data.item.title,
						back: 1
					}
				})
				WxParse.wxParse('article', 'html', res.data.data.item.info, me, 0);
			}
		});
	},
	receive(e) {
		var id = e.currentTarget.dataset.id;
		var index = e.currentTarget.dataset.index;
		var me = this;
		util.getAjaxData("disget", { id: id }, function (res) {
			if(res.data.msg == "success"){
				var discount = me.data.discount ;
				discount[index].hasget = 1;
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
		if (e.detail.value == ""){
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
    changenum(e){
        var method = e.currentTarget.dataset.id;
        var nownum = this.data.nownum;
        if(method == "sub" && nownum > 1){
            nownum--;
        }else if (method == "add" ){
            if(this.data.item.is_xianggou == 1){
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
    test(){

    },
    hidebuy() {
        this.setData({
            buy: 0
        })
    },
    buy(e){
        var method = e.currentTarget.dataset.method;
        this.setData({
            method:method,
            buy:1
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
			if (attr1[i].id == id) {
				this.setData({
					nowprice: parseFloat(this.data.item.price) + parseFloat(attr1[i].attr_value)
				})
			}
		}
	},
	addcart: function (data) {
		var goodsinfo = [{
			id: this.data.item.id,
			pic: this.data.img[0].url,
			title: this.data.item.title,
			price: this.data.nowprice,
			pingyou: this.data.item.pingyou,
			kuaidi: this.data.item.kuaidi,
			ems: this.data.item.ems,
			free: this.data.item.free,
			num: this.data.nownum,
			is_xiangou: this.data.item.is_xiangou,
			xiangou_num: this.data.item.xiangou_num,
            cate_id :this.data.item.cate_id
		}];
		var value = this.data.cart;
		var itemindex = -1;
		for (var i = 0; i < value.length; i++) {
			if (value[i].id == goodsinfo[0].id ) {
				var itemindex = i;
			}
		}
		if (itemindex == -1) {
			value = value.concat(goodsinfo);
		} else {
            value[itemindex] = goodsinfo[0];
        }
        wx.setStorageSync('cart', value);
        if (this.data.method == "cart"){
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
		this.onLoad();
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
    height: rpx(750);
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
    color: #ef2f72;
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
	font-size:12px;
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
    flex: 0 0 20%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}

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
}

.cartbar ul li .icon {
    flex: 0 0 24px;
}

.cartbar ul li .icon, .cartbar ul li .icon img {
    width: 24px;
    height: 24px;
    margin: 2px auto;
}

.cartbar ul li .title {
    font-size: 12px;
    line-height: 24px;
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

.cart-wrapper .cart .num .control button {
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    width: 32px;
    margin: 0;
    border-radius: 0px;
    border: solid 1px #ccc;
    box-sizing: border-box;
}

.cart-wrapper .cart .num .control button::after {
    display: none;
}

.cart-wrapper .cart .btn button::after {
    display: none;
}

.cart-wrapper .cart .btn button {
    border-radius: 0px;
    background: #ef2f72;
    height: 42px;
    line-height: 42px;
    font-size: 12px;
    color: white;
}

</style>