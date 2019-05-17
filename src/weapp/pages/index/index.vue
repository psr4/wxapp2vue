<template>
    <div class="page">
        <!-- <import src="/template/common.wxml" /> -->  <div class="head">      <!--view class="searchbox">          <view class="search">              <i class="iconfont icon-search"></i>              <input placeholder="请输入商品名称" bindinput="bindKeyInput" bindconfirm="search" />          </view>          <view class="searchbtn">              <button class="sousuo" bindtap="search">搜索</button>          </view>      </view-->        <div class="banner">          <swiper autoplay="true">              <swiper-item :key="index" v-for="(item,index) in banner">                  <myurl block="1" :url="('/pages/detail/detail?id='+(item.url))">                      <img :src="(item.content)"> </img>                  </myurl>              </swiper-item>          </swiper>      </div>  </div>  <!--view class="sort">      <ul>          <li wx:for="{{class}}" wx:key="*this" data-id="{{item.id}}" bindtap="classlist">              <view class="sorttitle">{{item.name}}</view>              <view class="sortimg">                  <image src="{{item.img}}"></image>              </view>          </li>      </ul>    </view-->      <!-- 优惠券 -->  <!--navigator url="/pages/coupon/get">      <view class="coupons">          <image src="{{coupon.content}}"></image>      </view>  </navigator-->      <!-- 产品展示 01-->  <template v-for="(item,index) in tuijian">      <div class="show">          <myurl block="1" :data-id="(item.itemid)" @click="classlist">              <div class="bl">                  <img mode="widthFix" :src="(item.img1)"></img>              </div>          </myurl>          <!--scroll-view scroll-x="true">              <view class="goods">                  <ul>                      <li wx:for="{{item.goods}}" wx:for-item="goods" wx:key="*this" bindtap="iteminfo" data-id="{{goods.id}}">                          <view class="goodsimg">                              <image src="{{goods.img}}"></image>                          </view>                          <view class="title">{{goods.title}}</view>                          <view class="price">                              <view class="unit">￥</view>                              <view class="value">{{goods.price}}</view>                          </view>                      </li>                  </ul>              </view>          </scroll-view-->      </div>  </template>    <button open-type="contact" class="kfbtn">      <span>联  系  客  服  </span>  </button>  <!-- <template is="tabbar "></template> --> 
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
        title: "商城首页",
        banner: [],
        tuijian: [],
        class: [],
        searchtxt: ""
    },
    onLoad: function () {
        app.globalData.scene = this.options.scene;
        var me = this;
        util.getAjaxData("index", this.options, function (res) {
            me.setData({
                banner: res.data.data.ad,
                tuijian: res.data.data.tuijian,
                class: res.data.data.class,
                coupon: res.data.data.coupon
            })
        }, "POST");
    },
    bindKeyInput: function (e) {
        this.setData({
            searchtxt: e.detail.value
        })
    },
    iteminfo: function (data) {
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + data.currentTarget.dataset.id
        })
    },
    search: function (data) {
        wx.navigateTo({
            url: '/pages/list/list?method=search&text=' + this.data.searchtxt
        })
    },
    classlist: function (data) {
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + data.currentTarget.dataset.id
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
.page{
    font-size:0px;
}
.searchbox{
  display: flex;
  padding: rpx(15) rpx(30);
  background: #efefef;
  width: 100%;
  justify-content:space-between;
  box-sizing: border-box;
}
 .searchbox .search{
   flex: 0 0 70%;
   position: relative;
}
.searchbox .search input{
  width: 95%;
  border-radius: rpx(10);
  padding: rpx(10) rpx(15) rpx(10) rpx(60);
  background: #fff;
}
.searchbox .searchbtn{
  flex: 0 0 19%;
}

.searchbox .iconfont{
  position: absolute;
  left:rpx(20);
  top:rpx(20);
  color:black;
  z-index: 99;
}
.searchbox .searchbtn button{
  width:100%;
  border-radius: rpx(10);
  background: #dedede;
  color: #9b9b9b;
  font-size: rpx(30);
}
.searchbox button::after{
  border: 0;
}

.banner img,.banner .slideitem{
  width: 100%;
  height: rpx(350);
} 

/* 分类 */
.sort{
  border-top:rpx(14) solid #efefef;
  border-bottom:rpx(10) solid #efefef;
}
.sort ul{
 display: flex;
 width: 100%;
 padding: 0 rpx(16) rpx(14) rpx(16);
 justify-content: space-between;
 align-content: center;
 box-sizing: border-box;
 flex-wrap:wrap;
}
.sort ul li{
  flex: 0 0 32%;
  background: #fff;
  height: rpx(120);
  line-height: rpx(120);
  padding: 0 rpx(18) 0 rpx(30);
  margin-top:rpx(16);
  box-sizing: border-box; 
  box-shadow: 1px 1px 5px #eeeeee;
}
.sort ul li .sorttitle{
  float: left;
  color:#9a9a9a;
}
.sort ul li .sortimg{
  float: right;
  padding-top:8%;
}
.sort ul li img{
  width: rpx(90);
  height: rpx(90);
}

.area{
  width: 100%;
  display: flex;

  border-bottom:rpx(1) solid #efefef;
  padding: 0 0 0 rpx(20);
  box-sizing: border-box;
}

.area .left{
  flex: 0 0 50%; 

}
.left .tuijian{
  padding: rpx(30) rpx(10) 0 rpx(10);
  border-right:1px solid #efefef;
}
.area .left img{
  width: rpx(240);
  height: rpx(240);
}
.area .title{
  color: #3d3d3d;
  font-size: rpx(32);
  margin-bottom: rpx(10);
}
.area .miaoshu{
  color: #9a9a9a;
  font-size: rpx(26);
}
.area .right{
  flex: 0 0 50%;
}

.area .right .rexiao,.area .right .all{
 clear: both;
 height: 50%;
}

.area .right .all{
  border-top:rpx(1) solid #efefef;
}
.area .right .txt{
  float: left;
  padding: rpx(30) rpx(20);
}
.area .right img{
  width: rpx(150);
  height: rpx(150);
  float: right;
  margin-top: rpx(10);
}

/* 优惠券 */
.coupons{
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  border-top:rpx(10) solid #efefef;
  border-bottom:rpx(10) solid #efefef;
}
.coupons  img{
  width: 100%;
  height: rpx(320);
  border-right:rpx(1) solid #f0f0f0;
}

/* 产品展示 */
.shows img{
  width: 100%;
  height: rpx(80);
  margin: rpx(20) 0 rpx(30) 0;
}
.show .bl  img{
  width: 100%;
  height: rpx(332);
}
.goods ul{
  display: flex;
}
.goods ul li{
  margin: 0 rpx(20) rpx(20) rpx(20);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.goods ul li .goodsimg img{
  width: rpx(150);
  height: rpx(150);
  margin: rpx(10) auto;
}
.goods ul li .title{
  font-size: rpx(26);
  color: #9a9a9a;
  width: rpx(120);
  padding: 0 rpx(10);
  white-space: nowrap;
  overflow: hidden;
  text-overflow:clip;
  text-align: center;
  margin: rpx(10) auto;
}
.goods ul li .price{
  color: #ef2f72;
}
.goods ul li .price{
  display: flex;
  justify-content: center;
  align-content:flex-end;
}
.goods ul li .price .value{
  font-size: rpx(26); 
  vertical-align: bottom;
}
.goods ul li .price .unit{
  font-size: rpx(20);
  vertical-align: bottom;
}

.adviser{
  background-color: #ef2f72; 
}
.adviser img,.adviser .slideitem{
  width: rpx(520);
  height: rpx(320);
  margin: 0 auto;
} 

.platform{
  display: flex;
  height: rpx(450);
  justify-content: space-between;
  align-items: center;
  margin-bottom: rpx(30);
}
.platform .left{
  width: 50%;
  text-align:center;
}
.platform .left .english{
  font-size: rpx(32);
  color: #3d3d3d;
  font-style:italic;
  margin-bottom: rpx(5);
  font-family:'Franklin Gothic Medium';
}
.platform .left .zhongwen{
  font-size: rpx(26);
  color: #3d3d3d;
  margin-bottom: rpx(30);
}
.platform .left .likedo{
  font-size: rpx(24);
  color:#9b9b9b;
}
.platform .left .line{
 border-bottom: 1px solid #dedede;
 padding-bottom:rpx(25);
 margin: 0 rpx(60) rpx(25) rpx(60);
}
.platform .left img{
  width: rpx(50);
  height: rpx(50);
}
.platform .right img{
  width:rpx(360);
  height: rpx(450);
}
.dibu img{
  width: 100%;
  height: rpx(240);
}
</style>