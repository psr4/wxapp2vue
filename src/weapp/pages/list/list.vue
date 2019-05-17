<template>
    <div class="page">
        <!--pages/list/list.wxml--> <div src="/template/common.wxml" import="1" />  <!--view class="filterbar">   <view class="zonghe {{order == '1'?'active':''}}" data-id="1" catchtap="sortitem">综合排序</view>   <view class="xiaoliang {{order == '3'?'active':''}}" data-id="3" catchtap="sortitem">销量</view>   <view class="zuixin {{order == '2'?'active':''}}" data-id="2" catchtap="sortitem">最新</view>   <view class="jiage {{order == '4'?'active':''}}" data-id="4" catchtap="sortitem">价格</view> </view-->  <div class="list">   <div class="item" :key="index" v-for="(item,index) in list">     <navigator :url="('/pages/detail/detail?id='+(item.id))">       <div class="itemimg">         <img mode="widthFix" :src="(item.img)"></img>       </div>       <!--view class="wenzi">         <view class="title">{{item.title}}</view>         <view class="price">￥{{item.price}}</view>         <view class="xiaoshou">已售{{item.buy_num}}件</view>       </view-->     </navigator>   </div>  </div>  <div style="height:60px;"></div> <tabbar is="tabbar"></tabbar> 
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
    onLoad: function (options) {
        var me = this;
        options.p = 1;
        util.getAjaxData("lists", { method: options.method, id: options.id, text: options.text }, function (res) {
            me.sort(res.data.data.list, 1);
            me.setData({
                titlebar: {
                    title: res.data.data.title,
                    back: 1
                },
                options: options,
                page: res.data.data.page
            })
        });
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
/* pages/list/list.wxss */
.page{
  background: #f8f7f7;
}
.filterbar{
  display: flex;
  justify-content: space-around;
  height: rpx(80);
  box-shadow: 0 rpx(1) rpx(5) #dedede;
  align-items: center;
  background: #fff;
}
.filterbar .active{
 color: #ef2f72;
}

.list{
  display: flex;
  flex-flow: wrap;
  width: 100%;
  padding: rpx(5) rpx(10) rpx(20) rpx(10);
  justify-content: space-between;
  box-sizing: border-box;
}
.list .item{
  background: #fff;
  width:48%;
  margin-top: rpx(15);
  box-sizing: border-box;
  flex:0 0 100%;
}
.list .item .wenzi{
  padding: rpx(10) rpx(10) rpx(20) rpx(10); 
}
.list .item .itemimg{
  border-bottom: rpx(1) solid #f0f0f0;
  width: 100%;
  text-align: center;

}
.list .item .itemimg img{
  width: 100%;
  height:rpx(300);
}
.list .item .title{
  width: 90%;
  text-overflow:ellipsis;
  overflow: hidden;
   white-space: nowrap;
   color: #242424;
   margin-bottom: rpx(10);
}
.list .item .price{
  color: #979797;
  line-height: rpx(64);
  font-size: rpx(32);
}
.list .item .xiaoshou{
  font-size: rpx(24);
  color: #979797;
}
</style>