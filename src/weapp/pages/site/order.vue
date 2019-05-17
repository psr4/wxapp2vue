<template>
    <div class="page">
        <div src="/template/common.wxml" import="1" /> <div :key="index" v-for="(item,index) in list">     <div class="item">         <div class="li header"> 			<div>订单号:{{item.orderId}}</div> 			<div>{{item.status}}</div> 		</div> 		<div class="li">	 			<div :key="index" v-for="(text,index) in item.content">{{text}}</div> 		</div> 		<div class="li footer"> 			<div>合计:{{item.price}}元  				<!--button class="btn" catchtap='qrcode' data-id="item.itemId" >生成二维码</button--> 			</div> 		</div>     </div> </div>  <div :class="('qrcode-wrapper '+(showqrcode?'active':''))" @click.stop="hide"> 	<div class="qrcode"> 		<img :src="(url)" @click.stop="previewimage" :data-src="(url)"></img> 	</div> </div> <tabbar is="tabbar"></tabbar>  
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
		util.getAjaxData("reserver_order", {}, function (res) {
			me.setData({
				list: res.data.data.list
			})
		}, "POST");
	},
	qrcode(e) {
		var id = e.currentTarget.dataset.id;
		var url = util.getAjaxUrl("reserverqrcode") + "?&timestamp=" + (new Date()).getTime() + "&userid=" + app.globalData.user.id + "&id=" + id
		this.setData({
			url: url,
			showqrcode: true
		})
	},
	hide(e) {
		this.setData({
			showqrcode: false
		})
	},
	onPullDownRefresh: function () {
		this.loadDetail();
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
	background: #eee;
}
.item{
	margin-bottom:4px;
	background: white;
}
.item .li {
	padding:8px;
	flex-flow: wrap;
}
.item .header{
	display: flex;
	border-bottom:solid 1px #eee;
}
.item .header > div{
	flex:1;
}
.item .header > view:last-child{
	text-align: right;
}
.item .footer{
	border-top:solid 1px #eee;
	line-height: 24px;
}
.item .footer > div{
	text-align: right;
}

button.btn{
	display: inline-block;
	width:50px;
	height: 24px;
	line-height: 24px;
	background: #EF2F72;
	color:white;
	font-size: 10px;
	padding: 0 4px;
	vertical-align: top;
}

.qrcode-wrapper{
	position: fixed;
	left:100%;
	top:0px;
	width:100%;
	bottom: 0px;
	background: rgba(0,0,0,0.5);
	opacity: 0;
	transition: 0.4s;
}
.qrcode-wrapper.active{
	left:0px;
	opacity: 1;
}

.qrcode-wrapper .qrcode{
	position: absolute;
	top:	50%;
	left:50%;
	width:rpx(700);
	height: rpx(700);
	margin:rpx(-350) 0 0 rpx(-350);
	background: white;
	border-radius: 3px;
}
.qrcode-wrapper .qrcode img{
	width:100%;
	height: 100%;
}
</style>