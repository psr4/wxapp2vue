<template>
    <div class="page">
        <div class="list">      <url block="1" :url="('article?id='+(item.id))" :key="index" v-for="(item,index) in list">          <div class="item">              <div class="pic">                  <img mode="widthFix" :src="(item.img)"></img>              </div>              <div class="content">                  <div class="title">                      {{item.title}}                  </div>                  <div class="desc">                      {{item.intro}}                  </div>              </div>          </div>      </url>  </div>  <div left="(_left)" top="(_top)" />    <!-- <template is="contact"></template> --> 
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
    title: "品牌中心",
    list: [],
  },
  onShow() {
    const _left = wx.getStorageSync('_left')
    const _top = wx.getStorageSync('_top')
    if (_left) {
      this.setData({ _left, _top })
    }
  },
  onLoad: function (options) {
    util.contactInit(this);
    var me = this;
    util.getAjaxData("article", {}, function (res) {
      me.setData({
        list: res.data.data.arc,
      })
    });
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
.list{
    padding:10px;
}
.page{
    background: #FAF7F5;
}
.list .item {
    background: white;
    border-radius: 3px;
    box-shadow: 0 0 4px #F2F0EA;
    margin-bottom: 15px;
}
.list .item .pic img{
    width:100%;
    border-radius: 3px 3px 0 0 ;
}
.list .item .content .title{
    color:#333;
    font-size: 12px;
    font-weight: 600;
    white-space: norap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 8px;
}
.list .item .content {
    padding: 10px 10px;
}
</style>