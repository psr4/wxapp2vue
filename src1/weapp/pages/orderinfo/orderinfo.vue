<template>
    <div class="page">
        <!--pages/orderinfo/orderinfo.wxml-->  <div src="/template/common.wxml" import="1" />    <div class="details">    <div class="detail">      <div class="detailid">        <div class="info">日期:{{item.add_time}}</div>        <div class="info">订单号:{{item.orderId}}</div>        <div class="info">订单状态:{{item.status_T}}</div>        <div class="info">收货地址:{{item.address_name}} ({{item.mobile}}) {{item.address}}</div>        <div class="info" v-if="(item.fahuo_time)">配送方式:{{item.userfree + ":" + item.freecode}}</div>        <div class="info">订单金额:{{item.order_sumPrice}}</div>      </div>      <div class="items">        <div class="item" :key="index" v-for="(list,index) in item.items">          <div class="pic">            <img :src="(list.img)"></img>          </div>          <div class="desc">            <div class="title">{{list.title}}</div>            <div class="info">单价:{{list.price}} 数量:{{list.quantity}}</div>            <div class="info">{{list.item_attr}} </div>          </div>        </div>      </div>    </div>  </div>       <contact is="contact" :data="(contaction)"></contact>     <tabbar is="tabbar"></tabbar>   
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
            title: "订单详情",
            back: 2
        },
        showtabbar: true
  },
  
    onLoad: function (options) {
      util.contactInit(this);
        var me = this;
        util.getAjaxData("detailinfo", { id: options.id }, function (res) {
            if (!res.data.data.id) {
                wx.showModal({
                    title: '读取失败',
                    content: "未找到对应订单!",
                    success: function (res) {
                        wx.navigateTo({
                            url: '/pages/detail/detail',
                        })
                    }
                })
            }
            me.setData({
                item: res.data.data
            });
        }, "POST")
    },
    onPullDownRefresh: function () {
        this.onLoad();
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: util.onShareAppMessage
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../common/style/page.scss';
/* pages/orderinfo/orderinfo.wxss */

.detail{
  margin: 10px 0;
  box-shadow: 0 0 4px #ccc;
  background: white;
}
.detail .detailid{
  font-size: 12px;
  color:#999;
  padding: 8px 0;
  margin:0 20px;
  border-bottom:solid 1px #ddd;
}
.detail .item{
  display: flex;
  margin:0 20px ;
  border-bottom:solid 1px #ddd;
}
.detail .item .pic{
  flex:0 0 80px;
  height: 80px;
}
.detail .item .pic img{
  width:60px;
  height: 60px;
  margin:10px;
}
.detail .item .desc{
  padding: 10px;
}
.detail .item .desc .title{
  font-size:12px;
  line-height: 16px;
  height: 32px;
}
.detail .item .desc .info{
  font-size:12px;
  color:#333;
}
.detail .info{
  font-size: 12px;
  color:#333;
  text-align: left;
  line-height: 28px;
}
</style>