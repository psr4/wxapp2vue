<template>
    <div class="page">
        <!--pages/list/list.wxml-->  <div src="/template/common.wxml" import="1" />    <!--view class="filterbar">    <view class="zonghe {{order == '1'?'active':''}}" data-id="1" catchtap="sortitem">综合排序</view>    <view class="xiaoliang {{order == '3'?'active':''}}" data-id="3" catchtap="sortitem">销量</view>    <view class="zuixin {{order == '2'?'active':''}}" data-id="2" catchtap="sortitem">最新</view>    <view class="jiage {{order == '4'?'active':''}}" data-id="4" catchtap="sortitem">价格</view>  </view-->    <!-- <view class="list">    <view class="item" wx:for="{{list}}" wx:key="*this">      <navigator url="/pages/detail/detail?id={{item.id}}">        <view class="itemimg">          <image src="{{item.img}}" mode="widthFix"></image>        </view>        <!--view class="wenzi">          <view class="title">{{item.title}}</view>          <view class="price">￥{{item.price}}</view>          <view class="xiaoshou">已售{{item.buy_num}}件</view>        </view>      </navigator>    </view>  </view> -->    <!-- 分类产品列表 -->  <div class="book-ul">    <div class='book-li' :data-id="(item.id)" @click="bindGotoDetail" :data-distance="(item.distance)" v-for="(item,index) in items" :key="index">        <img :src="(item.img)"></img>      <div class='info'>        <div class='tit'>{{item.title}}</div>        <div class='desc'>{{item.cate_name}}</div>        <div class='other'>          <div>地址:{{item.sheng}}{{item.shi}}{{item.qu}}{{item.detail}}</div>          <div>{{item.distance}}</div>        </div>        </div>      </div>    </div>     <!-- <template is="contact" data='{{contaction}}'></template>  -->    <div style="height:60px;"></div>  <tabbar is="tabbar"></tabbar>  <div left="(_left)" top="(_top)"/> 
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
            title: "商品列表",
            back: 1
        },
        style: 1,
        order: 1,
        list: [],
        options: {},
        page: 0
  },

    onShow: function () {
      const _left = wx.getStorageSync('_left')
      const _top = wx.getStorageSync('_top')
      if (_left) {
        this.setData({ _left, _top })
      }
    },
  // 跳往商家详情页
  bindGotoDetail(e){
    const id = e.currentTarget.dataset.id
       const distance = e.currentTarget.dataset.distance
       wx.navigateTo({
      url: '/pages/detail/detail?id=' + id + "&distance=" + distance,
    })
  },
    onLoad: function (options) {
      util.contactInit(this);
      //   var me = this;
      //   options.p = 1;
      const _this = this
        util.getLocation(res => {
          util.getAjaxData('getIndexItemsByTitle', { title: options.text, lat: res.lat, lng: res.lng }, info => {
            _this.setData({ items: info.data.data })
          })
        })
        // util.getAjaxData("lists", { method: options.method, id: options.id, text: options.text }, function (res) {
        //     me.sort(res.data.data.list, 1);
        //     me.setData({
        //         titlebar: {
        //             title: res.data.data.title,
        //             back: 1
        //         },
        //         options: options,
        //         page: res.data.data.page
        //     })
        // });
    },
    load: function () {
        var me = this;
        var options = this.data.options;
        if (this.data.page > options.p) {
            options.p = options.p + 1;
            this.setData({
                options: options
            })
            util.getAjaxData("lists", { method: options.method, id: options.id, text: options.text, p: options.p }, function (res) {
                me.sort(me.data.list.concat(res.data.data.list), me.data.order);
            });
        } else {
            wx.showToast({
                title: '已全部加载',
                icon: 'success',
                duration: 800
            })
        }
    },
    iteminfo: function (data) {
        wx.navigateTo({
            url: '/pages/item/item?id=' + data.currentTarget.dataset.id
        })
    },
    sort: function (arr, sort) {
        var len = arr.length;
        var preIndex, current;
        for (var i = 1; i < len; i++) {
            preIndex = i - 1;
            current = arr[i];
            while (preIndex >= 0) {
                if (sort == 1 && arr[preIndex].ordid > current.ordid) {
                    arr[preIndex + 1] = arr[preIndex];
                    preIndex--;
                } else if (sort == 3 && parseInt(arr[preIndex].buy_num) < parseInt(current.buy_num)) {
                    arr[preIndex + 1] = arr[preIndex];
                    preIndex--;
                } else if (sort == 4 && parseFloat(arr[preIndex].price) > parseFloat(current.price)) {
                    arr[preIndex + 1] = arr[preIndex];
                    preIndex--;
                } else if (sort == 2 && arr[preIndex].id < current.id) {
                    arr[preIndex + 1] = arr[preIndex];
                    preIndex--;
                } else {
                    break;
                }
            }
            arr[preIndex + 1] = current;
        }
        this.setData({
            list: arr
        })
    },
    changstyle: function () {
        this.setData({
            style: (this.data.style + 1) % 3 + 1
        })
    },
    sortitem: function (data) {
        this.sort(this.data.list, data.currentTarget.dataset.id);
        this.setData({
            order: data.currentTarget.dataset.id
        })
        console.log(this.data.order);
    },
    onPullDownRefresh: function () {
        this.load();
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: util.onShareAppMessage
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../common/style/page.scss';
.page {
  font-size: 0px;
}
.head{
  background: #FF9935;
}
.head .location{
  padding: 0 rpx(30);
  text-align: center;
}
.searchbox {
  display: flex;
  align-items: center;
  
  width: 100%;
  padding: rpx(18) rpx(30);
  box-sizing:border-box;
  justify-content: space-between;
}

.searchbox .search {
  position: relative;
  flex: 1;
}

.searchbox .search input {
  height:32px;
  border-radius:rpx(32);
  background:white;
  z-index:100;
  opacity:0.9;
  text-align:center;
  padding: 0 rpx(38);
  font-size: 12px;
}


.searchbox .icon-search {
  position:absolute;
  left:rpx(30);
  top:rpx(14);
  color:#333;
  z-index:99;
  font-size:18px;
}

.searchbox .location{
  flex: 0 0 20%;
  text-align: right;
   padding: 0;
}
.location .iconfont {

  color:white;
  z-index:99;
  font-size:18px;

}
 .location span{
  font-size: 14px;
}


.banner img, .banner .slideitem {
  width: 100%;
  height: rpx(350);
}

/* 分类 */

.sort {
  border-top: rpx(14) solid #efefef;
  border-bottom: rpx(10) solid #efefef;
}

.sort ul {
  display: flex;
  width: 100%;
  padding: 0 rpx(16) rpx(14) rpx(16);
  justify-content: space-between;
  align-content: center;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.sort ul li {
  flex: 0 0 32%;
  background: #fff;
  height: rpx(120);
  line-height: rpx(120);
  padding: 0 rpx(18) 0 rpx(30);
  margin-top: rpx(16);
  box-sizing: border-box;
  box-shadow: 1px 1px 5px #eee;
}

.sort ul li .sorttitle {
  float: left;
  color: #9a9a9a;
}

.sort ul li .sortimg {
  float: right;
  padding-top: 8%;
}

.sort ul li img {
  width: rpx(90);
  height: rpx(90);
}

.area {
  width: 100%;
  display: flex;
  border-bottom: rpx(1) solid #efefef;
  padding: 0 0 0 rpx(20);
  box-sizing: border-box;
}

.area .left {
  flex: 0 0 50%;
}

.left .tuijian {
  padding: rpx(30) rpx(10) 0 rpx(10);
  border-right: 1px solid #efefef;
}

.area .left img {
  width: rpx(240);
  height: rpx(240);
}

.area .title {
  color: #3d3d3d;
  font-size: rpx(32);
  margin-bottom: rpx(10);
}

.area .miaoshu {
  color: #9a9a9a;
  font-size: rpx(26);
}

.area .right {
  flex: 0 0 50%;
}

.area .right .rexiao, .area .right .all {
  clear: both;
  height: 50%;
}

.area .right .all {
  border-top: rpx(1) solid #efefef;
}

.area .right .txt {
  float: left;
  padding: rpx(30) rpx(20);
}

.area .right img {
  width: rpx(150);
  height: rpx(150);
  float: right;
  margin-top: rpx(10);
}

/* 优惠券 */

.coupons {
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  border-top: rpx(10) solid #efefef;
  border-bottom: rpx(10) solid #efefef;
}

.coupons  img {
  width: 100%;
  height: rpx(320);
  border-right: rpx(1) solid #f0f0f0;
}

/* 产品展示 */

.shows img {
  width: 100%;
  height: rpx(80);
  margin: rpx(20) 0 rpx(30) 0;
}

.show .bl  img {
  width: 100%;
  height: rpx(332);
}

.goods ul {
  display: flex;
}

.goods ul li {
  margin: 0 rpx(20) rpx(20) rpx(20);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
}

.goods ul li .goodsimg img {
  width: rpx(150);
  height: rpx(150);
  margin: rpx(10) auto;
}

.goods ul li .title {
  font-size: rpx(26);
  color: #9a9a9a;
  width: rpx(120);
  padding: 0 rpx(10);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  text-align: center;
  margin: rpx(10) auto;
}

.goods ul li .price {
  color: #ef2f72;
}

.goods ul li .price {
  display: flex;
  justify-content: center;
  align-content: flex-end;
}

.goods ul li .price .value {
  font-size: rpx(26);
  vertical-align: bottom;
}

.goods ul li .price .unit {
  font-size: rpx(20);
  vertical-align: bottom;
}

.adviser {
  background-color: #ef2f72;
}

.adviser img, .adviser .slideitem {
  width: rpx(520);
  height: rpx(320);
  margin: 0 auto;
}

.platform {
  display: flex;
  height: rpx(450);
  justify-content: space-between;
  align-items: center;
  margin-bottom: rpx(30);
}

.platform .left {
  width: 50%;
  text-align: center;
}

.platform .left .english {
  font-size: rpx(32);
  color: #3d3d3d;
  font-style: italic;
  margin-bottom: rpx(5);
  font-family: 'Franklin Gothic Medium';
}

.platform .left .zhongwen {
  font-size: rpx(26);
  color: #3d3d3d;
  margin-bottom: rpx(30);
}

.platform .left .likedo {
  font-size: rpx(24);
  color: #9b9b9b;
}

.platform .left .line {
  border-bottom: 1px solid #dedede;
  padding-bottom: rpx(25);
  margin: 0 rpx(60) rpx(25) rpx(60);
}

.platform .left img {
  width: rpx(50);
  height: rpx(50);
}

.platform .right img {
  width: rpx(360);
  height: rpx(450);
}

.dibu img {
  width: 100%;
  height: rpx(240);
}

/* 新增 */


 .nav-wrapper {
  background: white;
  padding: rpx(36) 0 rpx(20);
}

 .nav-wrapper .nav-ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

 .nav-wrapper .nav-ul .nav-li {
  flex: 0 0 25%;
  text-align: center;
  padding-bottom: rpx(16);
}

.nav-wrapper .nav-ul .nav-li .btn-img img {
  width: rpx(80);
  height: rpx(80);
}

.nav-wrapper .nav-ul .nav-li .btn-tit {
  font-size: rpx(28);
  color: #333;
}
.book-wrapper .book-desc{
  text-align: right;
}
.book-wrapper .book-desc .title {
  position: relative;
  display: inline-block;
  margin: rpx(32) rpx(45);
  font-size: rpx(32);
  color: #333;
}

 .book-wrapper .book-desc .title:after {
  position: absolute;
  content: "";
  top: 50%;
  right: 0;
  width: 110%;
  height: 50%;
  box-sizing: border-box;
  border-radius: rpx(50);
  background: rgba(255, 153, 53, 0.4);
}
.book-ul{
 
}
 
.book-ul .book-li{
  overflow: hidden;
  display: flex;
  padding: rpx(20) rpx(30);
  border-bottom: rpx(1) solid #efefef;
}
.book-ul .book-li img{
  width: rpx(200);
  height: rpx(120);
  margin: auto;
}
.book-ul .book-li .info{
  padding-left: rpx(20);
  flex: 1;
  overflow: hidden;
  font-size: 12px;
  color: #333;
}
.book-ul .book-li .info .tit{
  font-size: 15px;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;

}
.book-ul .book-li .info .desc{
  color:#999;
  overflow:hidden;
  text-overflow:ellipsis;
  line-height:24px;
  padding-bottom:rpx(10);
  white-space:nowrap;

}
.book-ul .book-li .info .other{
  display: flex;
  justify-content: space-between;
}

.nearbyTap{
  position: fixed;
  top: 100%;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
}
.nearbyTap.show{
 top: 0;
}
.near-top{
  height: 20%;
  background: rgba(0, 0, 0, 0.2);
}
.near-ul{
  height:100%;
  position: relative;
  background: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  transition: height .5s ease-in-out;
}

.near-title{
  text-align: left;
  font-size: 15px;
  border-bottom: rpx(1) solid #efefef;
  line-height: 45px;
  padding-left: rpx(30);
  margin-bottom: rpx(20);
}
.near-li{
  flex: 0 0 auto;
  border:rpx(1) solid #FF9935;
  color: #666;
  font-size: 17px;
  padding: 3px 10px;
  margin: 5px auto;
  border-radius: 3px;
}
/* 选中商圈 */
.select{
  background: #FAFFC9;
 
}
</style>