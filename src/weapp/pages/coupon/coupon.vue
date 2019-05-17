<template>
    <div class="page">
        <!--pages/coupon/coupon.wxml--> <div src="/template/common.wxml" import="1" />  <div class="tab" v-if="(method != 'choose')">   <div data-status="1" :class="('item '+(status == 1?'active':''))" @click="changetab">未使用</div>   <div data-status="2" :class="('item '+(status == 2?'active':''))" @click="changetab">已使用/已过期</div> </div>  <div class="box">   <div :class="('coupon '+(((item.canuse == 1 || method != 'choose') && status == 1)?'active':''))" :catchtap="(method)" :data-index="(index)" v-if="(status == item.used)" :key="index" v-for="(item,index) in discount"   >     <div class="left">       <div class="name">{{item.type == 1?'现金券':'满减券'}}</div>       <div class="value"><span>￥</span>{{item.price}}</div>     </div>     <div class="right">       <div class="manjian">{{item.type == 1?'立减 ￥'+item.price:'满'+item.usable+'减'+item.price}}</div>       <div class="tongyong">{{item.name}}</div>       <div class="time">{{item.stime}} - {{item.etime}}</div>     </div>   </div> </div>    <tabbar is="tabbar" v-if="(method != 'choose')"></tabbar> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
var util = require('../../utils/util.js')
var app = getApp()
const pageData = Page({
    data: {
        status: 1,
        model: true,
        form: {}
    },
    onLoad: function (options) {
        var me = this;
        var buy = wx.getStorageSync("buy");
        this.setData({
            method: options.method
        })
        util.getAjaxData("mydis", {}, function (res) {

            var carts = wx.getStorageSync('buy');
            var totalmoney = 0;
            for (var i = 0; i < carts.length; i++) {
                totalmoney += carts[i].price * carts[i].num;
            }
            var discount = res.data.data.dis;
            if (options.method == "choose") {
                for (var i = 0; i < discount.length; i++) {
                    for (var l = 0; l < buy.length; l++) {
                        if (discount[i].type == 1 ||
                            (discount[i].type == 2 && discount[i].usable <= totalmoney)
                        ) {
                            for (var m = 0; m < discount[i].cate.length; m++) {
                                if (buy[i] && buy[i].cate_id == discount[i].cate[m]) {
                                    discount[i]['canuse'] = 1;
                                }
                            }
                            for (var m = 0; m < discount[i].ids.length; m++) {
                                if (buy[i] && buy[i].id == discount[i].ids[m]) {
                                    discount[i]['canuse'] = 1;
                                }
                            }
                        }
                    }
                }
            }
            me.setData({
                discount: discount
            })
        }, "POST");
    },
    choose(e) {
        var index = e.currentTarget.dataset.index;
        app.globalData.discount = this.data.discount[index];
        wx.navigateBack();
    },
    switch(e) {
        var form = this.data.form;
        form['model'] = e.detail.value

        this.setData({
            form: form,
            model: e.detail.value
        })
    },
    changetab: function (data) {
        this.setData({
            status: data.currentTarget.dataset.status
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
/* pages/coupon/coupon.wxss */

.page {
    background: #f8f7f7;
}

.tab {
    background: white;
    display: flex;
    box-shadow: 0 0 4px #ddd;
}

.tab .item {
    flex: 1;
    text-align: center;
    line-height: 40px;
    border-left: solid 1px #ddd;
}

.tab .active {
    color: #ef2f72;
}

.coupon.active {
    background: white;
    color: #ef2f72;
    border-left: solid 3px #ef2f72;
}

.coupon {
    width: 90%;
    margin: rpx(30) auto;
    padding: rpx(20) rpx(20) rpx(20) 0;
    display: flex;
    background: #eee;
    color: #666;
    border-radius: 3px 0 0 3px;
    border-left: solid 3px #666;
}

.coupon .left::after {
    content: "";
    position: absolute;
    right: -6px;
    bottom: -15px;
    height: 12px;
    width: 12px;
    border-radius: 12px;
    background: #f8f7f7;
}

.coupon .left::before {
    content: "";
    position: absolute;
    right: -6px;
    top: -15px;
    height: 12px;
    width: 12px;
    border-radius: 12px;
    background: #f8f7f7;
}

.coupon .left {
    position: relative;
    border-right: dotted 1px #ccc;
    flex: 0 0 30%;
}

.coupon .left .name {
    padding-left: rpx(20);
}

.coupon .left .name, .coupon .left .value span {
    font-size: rpx(20);
}

.coupon .left .value {
    text-align: center;
    font-size: rpx(56);
    line-height: rpx(90);
}

.coupon .right {
    flex: 1;
    padding: 0 rpx(40);
    line-height: rpx(40);
}

.coupon .right .tongyong {
    color: #000;
    font-size: rpx(20);
}

.coupon .right .time {
    color: #bbb;
    font-size: rpx(20);
}

</style>