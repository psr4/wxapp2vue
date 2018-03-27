<template>
    <page>
        <div src="/template/common.wxml" import="1" />    <scroll-view scroll-y =1  class="scorebox" data-method="acc" @scrolltolower="loadDetail" v-if="list.length>0">  <div class="box">    <div class="item" :key="index" v-for="(item,index) in list">      <div class="left">        <div>{{item.info}}</div>        <div>{{item.addtime}}</div>      </div>      <div class="right">        <div class="money">{{item.jiner}}</div>        <div>{{item.type}}</div>      </div>    </div>  </div>  </scroll-view>  <div class="box tips" v-if="list.length<=0">     没有任何记录  </div>    <!--scroll-view scroll-y class="scorebox" wx:if="{{status == 3 && score.length>0}}" bindscrolltolower="loadDetail" data-method="score">  <view class="box">    <view class="item" wx:for="{{score}}" wx:key="score">      <view class="left">        <view>{{item.action}}</view>        <view>{{item.addtime}}</view>      </view>      <view class="right">        <view class="money">{{item.score}}</view>        <view>{{item.status}}</view>      </view>    </view>  </view>  </scroll-view>  <view class="box tips" wx:elif="{{status == 3}}">     没有任何记录  </view-->          <!-- <template is="contact" data='{{contaction}}'></template>  -->  <div/>  <div style="height:0.01rem;"></div>  <tabbar is="tabbar"></tabbar>
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
        titlebar: {
            title: "账户中心",
            back: 2
        },
        showtabbar: true,
        status: 0,
        model: true,
        form: {},
        p1: 0,
        p2: 0,
        list: [],
        score: []
  },
    onLoad: function (options) {
        util.contactInit(this)
        if (options.status > 0) {
            this.setData({
                status: options.status
            })
        }
        this.loadDetail()
    },
    loadDetail: function (e) {
        if (!this.data.loading) {
            this.setData({
                loading: true
            })
        const _this = this 
      
        util.getAjaxData("acclog", { p1: this.data.p1,type: _this.data.status},
          res=>{
            _this.setData({
              list: _this.data.list.concat(res.data.data.list),
              p1: res.data.data.page_1
            })
        },'POST')
            // var me = this;     
            // util.getAjaxData("account", { p1: this.data.p1, p2: this.data.p2, method: method }, function (res) {
            //     if (method == "acc" || method == "all") {
            //         me.setData({
            //             list: me.data.list.concat(res.data.data.list),
            //             p1: res.data.data.page_1
            //         })
            //     }
            //     if (method == "score" || method == "all") {
            //         me.setData({
            //             score: me.data.score.concat(res.data.data.score),
            //             p2: res.data.data.page_2
            //         })
            //     }

            //     me.setData({
            //         loading: false
            //     })
            // }, 'POST');

        }
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
@import '../../common/style/page.scss';
/* pages/accountdetial/accountdetail.wxss */
.box{
  margin: 10px 5px;
  border-radius: 3px;
  box-shadow: 0 0 4px #ccc;
  background: white;
}
.box .item{
  display: flex;
  border-bottom:solid 1px #ddd;
  padding:10px;
  font-size: 12px;
  color:#666;
}
.box .item .left{
  flex:1;
}
.box .item .right{
  flex: 0 0 20%;
  text-align:right;
}
.box .item .right .money{
  color:red;
  font-size:14px;
  font-weight: 600;
}
.tips{
  text-align: center;
  padding: 20px 0;
}
</style>