<template>
    <div class="page">
        <div class="content" v-if="(needpwd == 1)">     <div class="pwd-wrapper">         <form @submit="submit">             <div class="title">请输入查看密码</div>             <div class="input">                 <input name="pwd" type="password" />                 <button type="submit">点击查看</button>             </div>         </form>     </div> </div> <div class="content" wx:else=1>     <div class="title">{{arc.title}}</div>     <img mode="widthFix" :src="(arc.img)"></img>     <div class="desc">         <div class="content"> 			<div src="../../wxParse/wxParse.wxml" import="1"/> 			<wxParse is="wxParse" :data="({wxParseData:article.nodes})"/>             <!--rich-text nodes="{{arc.info}}" /-->         </div>     </div> </div> <button open-type="contact" class="kfbtn"> <span>联 系 客 服 </span> </button> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
//index.js
//获取应用实例
var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js')
var app = getApp()
const pageData = Page({
	data: {
		title: "商城分类",
		needpwd: 0
	},
	onLoad: function (options) {
		var me = this;
		util.getAjaxData("arcdata", { id: options.id }, function (res) {
			me.setData({
				needpwd: res.data.data.needpwd,
				arc: res.data.data.arc
			})
			WxParse.wxParse('article', 'html', res.data.data.arc.info, me, 5);
		});
	},
	submit(e) {
		var pwd = e.detail.value.pwd;
		var me = this;
		util.getAjaxData("arcdata", { id: this.options.id, pwd: pwd }, function (res) {
			me.setData({
				needpwd: res.data.data.needpwd,
				arc: res.data.data.arc
			})
			WxParse.wxParse('article', 'html', res.data.data.arc.info, me, 5);
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
@import '../../wxParse/wxParse';
.content .title {
    padding: 20px 5%;
    font-size: 14px;
    font-weight: 600;
}

.content img {
    max-width: 100%;
    margin: 0 auto;
    display: block;
}

.content .desc {
    font-size: 12px;
    padding: 0 10px;
    box-sizing: border-box;
}

.content {
    width: 100%;
}

.pwd-wrapper {
    margin: 100px 30px;
    border-radius: 5px;
    border: solid 1px #ccc;
    box-shadow: 0 2px 4px #ccc;
}

.pwd-wrapper .title {
    background: #ef2f72;
    line-height: 42px;
    padding: 0 10px;
    border-radius: 5px 5px 0 0;
    color: white;
}

.pwd-wrapper .input {
    background: white;
    padding-bottom: 10px;
    border-radius: 0 0 5px 5px;
}

.pwd-wrapper .input input {
    margin: 20px 10px;
    border: solid 1px #ccc;
    border-radius: 3px;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    box-sizing: border-box;
}

.pwd-wrapper button {
    background: #ef2f72;
    color: white;
    height: 32px;
    line-height: 32px;
    margin: 10px;
}

</style>