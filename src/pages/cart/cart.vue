<template>
    <page>
        <div class="cart">    <div class="title">购物车({{cart.length}})</div>  </div>  <div class="products">    <div class="product" :key="index" v-for="(item,index) in cart">      <div class="kong" @click.stop="check" :data-id="item.id">        <img :src="'/image/img/'+(check[item.id]?'tick':'quan')+'.png'"></img>      </div>      <div class="proimg">        <img :src="item.pic"></img>      </div>      <div class="content">        <div class="protitle">{{item.title}}</div>        <div class="price">￥{{item.price}}</div>      </div>      <div class="shuliang">        <i class="iconfont icon-jian" data-method="sub" :data-id="index" @click="btns_click"></i>        <div class="amount">{{item.num}}</div>        <i class="iconfont icon-jia" data-method="add" :data-id="index" @click="btns_click"></i>      </div>    </div>  </div>  <div class="totalbar">    <div class="tick" >      <img data-id="all" :src="'/image/img/'+(checkall?'tick':'quan')+'.png'" @click.stop="check"></img>      <div class="all" data-id="all" @click.stop="check">全选</div>      <div class="delete" @click.stop="del" >删除</div>    </div>    <div class="total">      <div class="heji">合计：</div>      <div class="value">{{money}}</div>      <div class="totalbtn">        <button class="btn" @click.stop="gopay">结算</button></div>    </div>  </div>            <button open-type="contact" class="kfbtn">  <span>联  系  客  服  </span>  </button>
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
        title: "购物车",
        cart: [],
        money: 0.00,
        check: [],
        checkall: true
    },
    onShow: function (options) {
        var cart = wx.getStorageSync('cart');
        var nownum = 0;
        var check = this.data.check;
        if (cart) {
            for (var i = 0; i < cart.length; i++) {
                check[cart[i].id] = true;
            }
            this.setData({
                cart: cart,
                check: check,
                checkall: true
            })
            this.calc();
        }
    },
    check(e) {
        var id = e.currentTarget.dataset.id;
        var check = this.data.check;
        var checkall = this.data.checkall;
        if (id == "all") {
            checkall = !checkall;
            for (var i = 0; i < this.data.cart.length; i++) {
                check[this.data.cart[i].id] = checkall;
            }
        } else {
            check[id] = !check[id];
            if (!check[id]) {
                checkall = false;
            } else {
                var checkall = true;
                for (var i = 0; i < this.data.cart.length; i++) {
                    if (!check[this.data.cart[i].id]) {
                        checkall = false;
                    }
                }
            }
        }
        this.setData({
            check: check,
            checkall: checkall
        });
        this.calc();
    },
    del() {
        var cart = this.data.cart;
        var check = this.data.check;
        var buy = [];
        for (var i = 0; i < cart.length; i++) {
            if (check[cart[i].id]) {
                cart.splice(i, 1);
            }
        }
        this.setData({
            cart: cart
        })
        this.calc();
        wx.setStorageSync('cart', this.data.cart);
    },
    btns_click: function (data) {
        var id = data.currentTarget.dataset.id;
        var method = data.currentTarget.dataset.method;
        var cart = this.data.cart;
        if (method == "add") {
            if (cart[id].is_xiangou == 1 && cart[id].xiangou_num < cart[id].num + 1) {
                wx.showToast({
                    title: '该商品限购' + cart[id].xiangou_num + '!',
                })
            } else {
                cart[id].num++;
            }
        } else if (method == "sub" && cart[id].num > 1) {
            cart[id].num--;
        }
        this.setData({
            cart: cart
        })
        this.calc();
        wx.setStorageSync('cart', this.data.cart);
    },
    calc() {
        var cart = this.data.cart;
        var money = 0;
        var count = 0;
        var check = this.data.check;
        for (var i = 0; i < cart.length; i++) {
            if (check[cart[i].id]) {
                money += cart[i].num * cart[i].price;
                count += cart[i].num;
            }
        }
        this.setData({
            money: money.toFixed(2),
            count: count
        })
    },
    gopay() {
        if (this.data.count > 0) {
            var cart = this.data.cart;
            var check = this.data.check;
            var buy = [];
            for (var i = 0; i < cart.length; i++) {
                if (check[cart[i].id]) {
                    buy = buy.concat([cart[i]]);
                }
            }
            wx.setStorageSync('buy', buy);
            wx.navigateTo({
                url: '/pages/pay/pay',
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '请至少购买一种商品!',
            })
        }
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
@import '../../common/style/page.scss';
.cart{
  display: flex;
  height: rpx(90);
  width:100%;
  padding: 0 rpx(30); 
  align-items: center;
  box-shadow: 0 rpx(1) rpx(5) #dedede;
  box-sizing: border-box;
}
.cart .title{
  margin: 0 auto;
}


.product{
  display:flex;
  width: 100%;
  height: rpx(200); 
  align-items:center; 
  padding: 0 rpx(30);
  border-bottom:rpx(10) solid #dedede;
}
.product .kong img{
  width:rpx(38);
  height: rpx(38);
}
.product .proimg {
  margin:0 rpx(20);
}
.product .proimg img{
  width: rpx(140);
  height: rpx(140);
}
.product .content{
  flex: 0 0 36%;
  align-items:flex-start;
}
.product .content .protitle{
  margin-bottom: rpx(10);
}
.product .content .price{
    color: #ef2f72;
  }
.product .shuliang .icon-jian,.product .shuliang .icon-jia{
  font-size: rpx(36);
}
.product .shuliang{
  flex: 0 0 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}


.totalbar{
  display: flex;
  height: rpx(100);
  width: 100%;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 rpx(-1) rpx(5) #dedede;
  position: fixed;
  bottom: 0;
  padding: 0 rpx(30);
  box-sizing: border-box;
}
.totalbar .tick{
  display: flex;
}
.totalbar .tick .delete{
  margin-left: rpx(28);
}
.totalbar .tick img{
  width: rpx(38);
  height: rpx(38);
  margin-right: rpx(15);
}
.totalbar .total{
  display: flex;
  height: 100%;
  align-items: center;
}
.totalbar .total .value{
  color: #ef2f72;
}
.totalbar .total .totalbtn{
  width: rpx(140);
  height: rpx(80);
  margin: rpx(0) 0 0 rpx(20);
}
.totalbar .total .totalbtn .btn{
  background: #f5c816;
  color: #fff;
  font-size: rpx(30);
}

</style>