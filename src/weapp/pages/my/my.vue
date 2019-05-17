<template>
    <div class="page">
        <div class="info">      <div class="bg">          <img :src="(ads)"></img>      </div>      <div class="user">          <img :src="(avatarUrl)"></img>          <div class="usename">{{nickName}}</div>      </div>  </div>      <div class="box">      <div class="list line">          <myurl block="1" url="/pages/account/account">              <div class="zhi">{{user.user_account}}</div>              <div class="name">余额</div>          </myurl>      </div>      <div class="list line">          <myurl block="1" url="/pages/coupon/coupon">              <div class="zhi">{{user.discount}}</div>              <div class="name">优惠券</div>          </myurl>      </div>  </div>  <div class="box1">      <div class="btnlist">          <myurl block="1" url="/pages/order/order">              <div class="list">                  我的订单                  <i class="iconfont icon-return1"></i>              </div>          </myurl>          <div class="btngroup">              <ul>                  <li>                      <myurl block="1" url="/pages/order/order?status=1">                          <i class="iconfont icon-daifukuan"></i>                          <div class="name">待付款</div>                      </myurl>                  </li>                  <li>                      <myurl block="1" url="/pages/order/order?status=2">                          <i class="iconfont icon-fahuo"></i>                          <div class="name">待发货</div>                      </myurl>                  </li>                  <li>                      <myurl block="1" url="/pages/order/order?status=3">                          <i class="iconfont icon-daishouhuo"></i>                          <div class="name">待收货</div>                      </myurl>                  </li>                  <li>                      <myurl block="1" url="/pages/order/order?status=4">                          <i class="iconfont icon-yiwancheng"></i>                          <div class="name">已完成</div>                      </myurl>                  </li>              </ul>          </div>          <myurl block="1" url="/pages/info/info">              <div class="list">个人信息                  <i class="iconfont icon-return1"></i>              </div>          </myurl>          <myurl block="1" url="/pages/address/address">              <div class="list">收货地址                  <i class="iconfont icon-return1"></i>              </div>          </myurl>          <myurl block="1" url="/pages/group/group">              <div class="list">我的团队                  <i class="iconfont icon-return1"></i>              </div>          </myurl>          <myurl block="1" url="/pages/qrcode/qrcode">              <div class="list">我的专属二维码                  <i class="iconfont icon-return1"></i>              </div>          </myurl>      </div>        <div class="btnlist">          <myurl block="1" url="/pages/site/order">              <div class="list">活动订单                  <i class="iconfont icon-return1"></i>              </div>          </myurl>          <myurl block="1" :url="('/pages/site/site?id='+(item.id))" :key="index" v-for="(item,index) in user.hot">              <div class="list">                  {{item.title}}                  <i class="iconfont icon-return1"></i>              </div>          </myurl>      </div>      <div class="btnlist" v-if="(user.article)">          <myurl block="1" :url="('/pages/article/article?id='+(item.id))" :key="index" v-for="(item,index) in user.article">              <div class="list">                  {{item.title}}                  <i class="iconfont icon-return1"></i>              </div>          </myurl>      </div>        <div class="btnlist">          <myurl block="1" @click="call">              <div class="list">一键拨号                  <i class="iconfont icon-return1"></i>              </div>          </myurl>      </div>  </div>  <button open-type="contact" class="kfbtn">      <span>联  系  客  服  </span>  </button> 
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
        title: "个人中心",
        user: {}
    },
    onShow: function () {
        var me = this;
        util.getAjaxData("my", { }, function (res) {
            app.globalData.user = res.data.data;
            app.globalData.telephone = res.data.data.telephone;
            me.setData({
                ads:res.data.data.ad.content,
                avatarUrl: app.globalData.user.headimgurl,
                nickName: app.globalData.user.nickname,
                user: res.data.data
            })
        }, "POST");
    },
    call(){
        wx.makePhoneCall({
            phoneNumber: app.globalData.telephone,
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
.info {
    position: relative;
}

.info .bg {
    left: 0;
    width: 100%;
    position: absolute;
}

.info, .info .bg img {
    height: rpx(300);
    width: 100%;
}

.info .user {
    text-align: center;
    z-index: 9;
    position: relative;
    top: 10%;
}

.info .user img {
    width: rpx(180);
    height: rpx(180);
    border-radius: rpx(98);
    border: rpx(8) solid rgba(255, 255, 255, 0.3);
}

.info .user .usename {
    color: #fff;
}

.box {
    display: flex;
    height: rpx(80);
    text-align: center;
    padding: rpx(20) 0;
    box-shadow: 0 rpx(1) rpx(10) #bbb;
}

.box .list {
    flex: 0 0 50%;
}

.box .line {
    border-right: rpx(1) solid #f0f0f0;
}

.box .list .zhi {
    color: #bbb;
    font-size: rpx(28);
}

.btngroup {
    border-bottom: rpx(10) solid #f0f0f0;
}

.btngroup ul {
    display: flex;
    justify-content: space-around;
    text-align: center;
    background: #fff;
    padding: rpx(20) 0;
}

.btngroup ul .iconfont {
    font-size: rpx(40);
}

.btngroup ul li .name {
    margin-top: rpx(8);
}

.box1 {
    background: #f0f0f0;
    margin: rpx(7) 0;
}

.box1 .btnlist {
    border-top: rpx(10) solid #f0f0f0;
    border-bottom: rpx(10) solid #f0f0f0;
}

.box1 .btnlist .list {
    line-height: rpx(80);
    border-bottom: rpx(1) solid #f0f0f0;
    padding: 0 rpx(30);
    display: flex;
    justify-content: space-between;
    background: #fff;
}

.box .btnlist .list:last-child {
    border-bottom: 0px;
}

.box1 .icon-return1 {
    font-size: rpx(26);
    color: #bbb;
}

</style>