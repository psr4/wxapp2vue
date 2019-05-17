<template>
    <div class="page">
        <div class="topbar">      <myurl block="1" @click="showmenu">          <div class="menu">              <div class='button'>                  <i class="iconfont icon-tubiaozhizuomoban-copy"></i>              </div>          </div>      </myurl>      <div :class="( search?'onsearch':'showinput')">          <input placeholder='请输入搜索产品' @keyDown="input"></input>      </div>      <div class='search' @click="showsearch">          <img src='/image/img/search.png'></img>      </div>  </div>  <div :class="('daohang '+( menu?'onclick':''))">        <div :class="('li '+( item.id == classid ? 'active' : ''))" :key="index" v-for="(item,index) in this.class">          <myurl block="1" :data-id="(item.id)" :data-index="(index)" :data-name="(item.name)" @click="changeClass">              {{item.name}}          </myurl>      </div>  </div>  <!--view class='sort'>      <view class='tubiao'></view>      <view class='sortname' >{{name}}</view>  </view-->  <div class="picture">      <!--swiper current="{{current}}" autoplay="true" indicator-dots="true" indicator-active-color="#ef2f72">          <swiper-item  -->      <!-- <navigator wx:for="{{ goods[classid] }}" wx:key="*this" url="/pages/detail/detail?id={{item.id}}"> -->      <myurl block="1" :url="('/pages/detail/detail?id='+(item.id))" :key="index" v-for="(item,index) in  goods[classid] ">          <img mode="widthFix" :src="(item.img)"></img>          <!--view class="tit">{{item.title}}</view-->      </myurl>      <!--swiper-item>      </swiper>      <view class='pre' bindtap='pretap'>          <image src='/image/img/pre.png'></image>      </view>      <view class='next' bindtap='nexttap'>          <image src='/image/img/next2.png'></image>      </view-->  </div>  <button open-type="contact" class="kfbtn">      <span>联  系  客  服  </span>  </button>  <div style='height:30px;'></div> 
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
        title: "商城分类",
        class: [],
        classid: 0,
        index: 0,
        searchtxt: "",
        goods: [],
        load: [],
        menu:true,
        search:false,
        current:0
    },
    showmenu() {
      this.setData({
        menu: !this.data.menu
      })
    },
    showsearch() {
        var keyword = this.data.keyword;
        if (this.data.search && keyword){
            wx.navigateTo({
                url: '/pages/list/list?method=search&text=' + keyword,
            })
        } else {
            this.setData({
                search: !this.data.search
            })
        }
    },
    onLoad: function (options) {
        var me = this;
        util.getAjaxData("classes", {}, function (res) {
            var goods = me.data.goods;
            goods[res.data.data.cate[0].id] = res.data.data.goods;
            var load = me.data.load;
            load[res.data.data.cate[0].id] = true;
            me.setData({
                class: res.data.data.cate,
                classid: res.data.data.cate[0].id,
                name:res.data.data.cate[0].name,
                goods: goods,
                load:load
            })
        });
    },
    bindKeyInput: function (e) {
        this.setData({
            searchtxt: e.detail.value
        })
    },
    search: function (data) {
        wx.navigateTo({
            url: '/pages/list/list?method=search&text=' + this.data.searchtxt
        })
    },
    input(e){
        var keyword = e.detail.value;
        this.setData({
            keyword:keyword
        })
    },
    changeClass: function (data) {
        if (data.currentTarget.dataset.id == this.data.classid) return; 
        var me = this;
        var goods = me.data.goods;
        var load = me.data.load;
        var name = data.currentTarget.dataset.name;
        if (!load[data.currentTarget.dataset.id]) {
            util.getAjaxData("categoods", { id: data.currentTarget.dataset.id }, function (res) {
                goods[data.currentTarget.dataset.id] = res.data.data.goods;
                load[data.currentTarget.dataset.id] = true
                me.setData({
                    classid: data.currentTarget.dataset.id,
                    index: data.currentTarget.dataset.index,
                    name: name,
                    goods: goods,
                    load: load,
                    menu:0
                })
            });
        }else{
            me.setData({
                name: name,
                classid: data.currentTarget.dataset.id,
                index: data.currentTarget.dataset.index,
                menu: 0
            })  
        }
    },
    nexttap() {
        var current = this.data.current;
        if (current < this.data.goods[this.data.classid].length - 1){
            current++;
        }else{
            current = 0;
        }
        this.setData({
            current:current
        })
    },
    pretap() {
        var current = this.data.current;
        if (current >0) {
            current--;
        } else {
            current = this.data.goods[this.data.classid].length - 1;
        }
        this.setData({
            current: current
        })
    },
    itemlist: function (data) {
        wx.navigateTo({
            url: '/pages/list/list?method=class&id=' + data.currentTarget.dataset.id
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

.topbar {
  display: flex;
  height: rpx(100);
  background: #ef2f72;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
}

.topbar .menu .button {
   height: rpx(60); 
  line-height: rpx(60);
  background: #fff;
  padding: 0 7px;
  border-radius: 1px;
}

.topbar .menu .iconfont {
  font-size: 20px;
  font-weight: bold;
  color: #ef2f72;
}
.daohang {
  display: none;
  width: 100%;
  background: #fafafa;
  transition:2s;
  box-shadow: 2px 0 4px #ccc;
}

.onclick {
  display: flex;
  flex-direction: row;
  /* width: 100%; */
   
}

.daohang .active {
  font-size: rpx(24);
  line-height: rpx(90);
  background: white;
  box-shadow: 1px 0 4px #ccc;
}

.daohang  .li {
  flex: 1;
  text-align: center;
  font-size: 12px;
  line-height: 40px;
}

.topbar .showinput {
  width: 0;
}

.topbar .showinput input {
  width: 0%;
  border-bottom: 1px solid #f8a8c3;
}

.onsearch {
  display: block;
  flex: 1;
  margin: 0 10px 0px 20px;
}

.onsearch input {
  border-bottom: 1px solid #f8a8c3;
  padding-left: 10px;
  width: 100%;
  transition: all .5s ease-out;
}

.topbar .search img {
  width: 24px;
  height: 24px;
}


.sort {
  display: flex;
  height: 40px;
  align-items: center;
  margin: 10px 0;
  box-shadow: 2px 2px 4px #ccc;
}

.sort .tubiao {
  width: 5px;
  height: 15px;
  margin: 0 5px 0 10px;
  background: #ef2f72;
}

.picture {
  position: relative;
  margin-top: 10px;
}

.picture .slideitem {
  width: 100%;
  height: rpx(850);
}

.picture img {
  width: 100%;
}

.picture .tit{
  text-align: center;
  margin: 5px 0 15px 0;
}

.picture .pre, .picture .next {
  position: absolute;
  bottom: -10px;
  width: 14px;
  height: 14px;
  background: #ef2f72;
  padding: 4px;
}

.picture .pre img, .picture .next img {
  width: 12px;
  height: 12px;
}

.picture .pre {
  left: 10%;
}

.picture .next {
  right: 10%;
}

</style>