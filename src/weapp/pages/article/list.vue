<template>
    <div class="page">
        <div class="list">     <myurl block="1" :url="('article?id='+(item.id))" :key="index" v-for="(item,index) in list">         <div class="item">             <div class="pic">                 <img mode="widthFix" :src="(item.img)"></img>             </div>             <div class="content">                 <div class="title">                     {{item.title}}                 </div>                 <div class="desc">                     {{item.intro}}                 </div>             </div>         </div>     </myurl> </div> <button open-type="contact" class="kfbtn">     <span>联 系 客 服 </span> </button> 
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
    },
    onLoad: function (options) {
        var me = this;
        util.getAjaxData("article", {}, function (res) {
			console.log(res)
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
    background: #F3F3F3;
}
.list .item {
    background: white;
    border-radius: 3px;
    box-shadow: 0 0 4px #ccc;
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