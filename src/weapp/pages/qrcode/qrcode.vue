<template>
    <div class="page">
        <div src="/template/common.wxml" import="1"/> <!--template is="titlebar" data="{{...titlebar}}"></template-->   <div class="conetent"> <img mode="widthFix" :src="(url)" @click="view"></img>  </div>   <tabbar is="tabbar" :data="(showtabbar)"></tabbar> 
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
			title: "我的专属二维码",
			back: 2
		},
		showtabbar: true
	},
	onLoad: function (options) {
		this.setData({
			url: util.getAjaxUrl("getqrcode") + "?timestamp="+(new Date()).getTime()+"&userid=" + getApp().globalData.user.id
		})
	},
	view() {
		wx.previewImage({
			current: this.data.url,
			urls: [this.data.url]
		})
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
.conetent{
  position: fixed;
  top:0;
  bottom:55px;
  width:100%;
}
.conetent img{
  width:100%;
}
</style>