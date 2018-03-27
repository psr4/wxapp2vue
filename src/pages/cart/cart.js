//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
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