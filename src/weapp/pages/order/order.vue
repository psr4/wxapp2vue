<template>
    <div class="page">
        <div src="/template/common.wxml" import="1" />  <div class="tap">   <div data-status="0" :class="('item '+(status == 0?'active':''))" @click="changetap">全部</div>   <div data-status="1" :class="('item '+(status == 1?'active':''))" @click="changetap">待付款</div>   <div data-status="2" :class="('item '+(status == 2?'active':''))" @click="changetap">待发货</div>   <div data-status="3" :class="('item '+(status == 3?'active':''))" @click="changetap">待收货</div>   <div data-status="4" :class="('item '+(status == 4?'active':''))" @click="changetap">已完成</div> </div>  <div :class="('details '+((status == item.status || status == 0)?'show':'hide'))" :key="index" v-for="(item,index) in detail" >   <div class="detail">     <div class="id">订单号：{{item.orderId}}</div>     <div class="status">{{item.status_T}}</div>   </div>   <div class="items">     <div class="item" :key="index" v-for="(list,index) in item.items">       <div class="pic">         <img :src="(list.img)"></img>       </div>       <div class="desc">         <div class="title">{{list.title}}</div>         <div class="xiangqing">{{list.item_attr}} </div>       </div>       <div class="info">         <div class="price">￥{{list.price}} </div>         <div class="amount"> {{list.quantity}}</div>       </div>     </div>     <div class="btns">       <div class="time">日期：{{item.add_time}}</div>       <button @click="controller" :data-status="(item.status)" :data-id="(item.orderId)" :data-rid="(item.id)">操作</button>     </div>   </div> </div> <div style="height:60px"></div> <tabbar is="tabbar"></tabbar>       
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
            title: "订单中心",
            back: 2
        },
        showtabbar: true,
        status: 0,
        detail: []
    },
    onLoad: function (options) {
        if (options.status > 0) {
            this.setData({
                status: options.status
            })
        }
        this.loadDetail()
    },
    loadDetail: function () {
        var me = this;
        util.getAjaxData("detail", {}, function (res) {
            me.setData({
                detail: res.data.data
            })
        }, "POST");

    },
    changetap: function (data) {
        this.setData({
            status: data.currentTarget.dataset.status
        })
    },
    controller: function (data) {
        var list = [
            ["查看订单"],
            ["查看订单", "取消订单", "去付款"],
            ["查看订单", "申请退款"],
            ["查看订单", "申请退款", "确认收货"],
            ["查看订单"],
            ["查看订单"],
            ["查看订单", "取消退款"],
            ["查看订单"]
        ];
        var me = this;
        var status = data.currentTarget.dataset.status;
        wx.showActionSheet({
            itemList: list[status],
            success: function (res) {
                if (res.tapIndex == 0) {
                    console.log("查看订单");
                    wx.navigateTo({
                        url: '/pages/orderinfo/orderinfo?id=' + data.currentTarget.dataset.id,
                    })
                } else if ((status == 2 || status == 3) && res.tapIndex == 1) {
                    console.log("申请退款");
                    util.getAjaxData("detail_C", { id: data.currentTarget.dataset.id, method: "refund" }, function (res) {
                        me.loadDetail();
                    }, "POST");
                } else if (status == 6 && res.tapIndex == 1) {
                    console.log("取消退款");
                    util.getAjaxData("detail_C", { id: data.currentTarget.dataset.id, method: "refund1" }, function (res) {
                        me.loadDetail();
                    }, "POST");
                } else if (status == 1 && res.tapIndex == 1) {
                    console.log("取消订单");
                    var closemsg = ["改选其他商品", "改选其他配送方式", "改选其他卖家", "其他原因"];
                    wx.showActionSheet({
                        itemList: closemsg,
                        success: function (res) {
                            util.getAjaxData("detail_C", { id: data.currentTarget.dataset.id, method: "cancel", msg: closemsg[res.tapIndex] }, function (res) {
                                me.loadDetail();
                            }, "POST");
                        }
                    })
                } else if (status == 1 && res.tapIndex == 2) {
                    console.log("付款");
                    wx.navigateTo({
                        url: '/pages/dopay/dopay?id=' + data.currentTarget.dataset.rid,
                    })
                } else if (status == 3 && res.tapIndex == 2) {
                    console.log("确认");
                    util.getAjaxData("detail_C", { id: data.currentTarget.dataset.id, method: "ok" }, function (res) {
                        me.loadDetail();
                    }, "POST");
                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
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
/* pages/order/order.wxss */

.page {
    background: #f0f0f0;
}

.tap {
    display: flex;
    padding: rpx(20) 0;
    box-shadow: 0 0 4px #ddd;
    background: #fff;
}

.tap .item {
    flex: 1;
    text-align: center;
}

.tap .active {
    color: #ef2f72;
}

.detail {
    margin-top: rpx(20);
    padding: rpx(20) rpx(30);
    background: white;
    display: flex;
    justify-content: space-between;
}

.hide {
    height: 0px;
    overflow: hidden;
}

.details .detail .status {
    color: #ef2f72;
}

.details .item {
    display: flex;
    padding: rpx(10) rpx(20);
    background: #f8f8f8;
    justify-content: space-between;
    border-bottom: solid rpx(1) #f0f0f0;
}

.details .item .pic {
    flex: 0 0 rpx(16);
    height: rpx(160);
    background: #fff;
}

.details .item .pic img {
    width: rpx(120);
    height: rpx(120);
    margin: 10px;
}

.details .item .desc {
    flex: 1;
    padding: 0 rpx(20);
}

.details .item .desc .title {
    font-size: rpx(24);
    line-height: rpx(32);
    height: rpx(64);
}

.details .item .desc .xiangqing {
    font-size: rpx(24);
    color: #bbb;
}

.details .item .info {
    text-align: right;
    color: #bbb;
}

.details .item .info .price {
    color: #000;
    line-height: rpx(32);
}

.details .item .info .yuanjia {
    text-decoration: line-through;
    line-height: rpx(32);
}

.details .btns {
    text-align: right;
    padding: rpx(15) rpx(20);
    background: #fff;
    overflow: hidden;
}

.details .btns  button {
    font-size: rpx(24);
    height: rpx(60);
    line-height: rpx(60);
    border-radius: rpx(20);
    background: white;
    border: rpx(1) solid #ef2f72;
    width: rpx(150);
    float: right;
    margin-left: rpx(10);
}

.details .btns .delete {
    border: rpx(1) solid #bbb;
}

.details .time {
    font-size: rpx(24);
    color: #333;
    text-align: left;
    line-height: rpx(64);
    float: left;
}

</style>