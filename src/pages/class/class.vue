<template>
    <page>
        <div src="/template/common.wxml" import="1" /> <div class='head'>     <!-- <view class="topbar">         <i class="iconfont icon-jiantou"></i>         <view class='input'>           <i class="iconfont icon-search"></i>           <input placeholder='请输入店家关键字' bindconfirm="showsearch" bindinput="input"></input>         </view>     </view> -->          <div class='category-wrapper'>           <div data-tab='0' :class="'item '+(tab=='0'?'active':'')" @click.stop="changetab">{{cate_name}}<i :class="'iconfont icon-plus-select-down '+(tab=='0'&&show?'active2':'')"></i></div>           <div data-tab='1' :class="'item '+(tab=='1'?'active':'')" @click.stop="changetab">附近<i :class="'iconfont icon-plus-select-down '+(tab=='1'&&show?'active2':'')"></i></div>            <div data-tab='2' :class="'item '+(tab=='2'?'active':'')" @click.stop="changetab">商圈<i :class="'iconfont icon-plus-select-down '+(tab=='2'&&show?'active2':'')"></i></div>            <div data-tab='3' :class="'item '+(tab=='3'?'active':'')" @click.stop="changetab">模式<i :class="'iconfont icon-plus-select-down '+(tab=='3'&&show?'active2':'')"></i></div>         </div>       <!--隐藏分类区  -->             <div :class="show?'translate':'categoryTap'" >                 <div class='item-top' v-if="tab == '0'" >                     <div class='cate-title'>全部分类</div>                     <div class='cate-ul'>                       <div @click.stop="bindChangeClass" :data-id="item.id" :data-index="index" :data-name="item.name" :class="'li '+( item.id == classid ? 'active' : '')" :key="index" v-for="(item,index) in this.class"  >{{item.name}}</div>                     </div>                 </div>                  <div class='item-top' v-if="tab == '1'" >                     <div class='cate-title'>附近</div>                       <div class='cate-ul'>                       <div data-id='-1' @click="bindDistance" :class="'li sq '+(distance_id==-1?'active':'')"  >全部</div>                       <div data-id='1' :class="'li sq '+(distance_id==1?'active':'')" @click="bindDistance">1公里以内</div>                       <div data-id='2' :class="'li sq '+(distance_id==2?'active':'')" @click="bindDistance">1公里~2公里</div>                       <div data-id='3' :class="'li sq '+(distance_id==3?'active':'')" @click="bindDistance">2公里以上</div>                     </div>                 </div>                  <div class='item-top' v-if="tab == '2'" >                   <div class='cate-title'>泉州商圈</div>                     <div class='cate-ul'>                     <div data-id='-1' @click="bindTradingArea" :class="'li sq '+(tradingArea_id==-1?'active':'')">全部</div>                     <div @click="bindTradingArea" :class="'li sq '+(tradingArea_id==item.id?'active':'')" :data-id="item.id" v-for="(item,index) in TradingArea" :key="index">                       {{item.name}}                     </div>                    </div>                 </div>                  <div class='item-top' v-if="tab == '3'" >                   <div class='cate-title'>全部模式</div>                     <div class='cate-ul ms-ul'>                       <div data-id='-1' @click="bindReturn" :class="'li ms '+(return_id==-1?'active':'')">全部</div>                       <div data-id='1' @click="bindReturn" :class="'li ms '+(return_id==1?'active':'')">有全返</div>                       <div data-id='2' @click="bindReturn" :class="'li ms '+(return_id==2?'active':'')">无全返</div>                   </div>                 </div>                  <div class='item-bottom' @click="cancelTap"></div>             </div>   </div>  <div class='top'></div>    <!-- <view class='sortTap'>   <ul class="{{sort?'c-show':'c-hidden'}}" wx:if="{{class.length > 0}}">     <li wx:for="{{class}}" wx:key="class1" class="{{item.id == classid?'active':''}}" catchtap="bindChangeClass" data-id="{{item.id}}" data-index="{{index}}" data-name="{{item.name}}">       <text>{{item.name}}</text>     </li>     <li></li>   </ul> </view> -->  <!-- 分类产品列表 -->  <div class="book-ul">     <div class='book-li' :data-id="item.id" @click="bindGotoDetail" :data-distance="item.distance" v-if="items" v-for="(item,index) in items" :key="index">        <img :src="item.img"></img>       <div class='info'>         <div class='tit'><span>{{item.title}}</span><img src='/image/img/shouye_tubiao_huore.png' class='huore' v-if="item.price>0"></img></div>         <div class='other'>           <div class='cate'>{{item.cate_name}}</div>           <div class='line'></div>           <div class='distant'>{{item.distance}}</div>         </div>         <div class='address'>           <img     src='/image/img/xiaochengxu_quanzhoushangquanlianmeng_shouye_tubiao_dizhi.png'           ></img>           <div>地址:{{item.sheng}}{{item.shi}}{{item.qu}}{{item.detail}}</div>         </div>       </div>      </div> </div>   <!-- <template is="contact" data="{{contaction}}"></template> --> <div left="_left" top="_top"/>   <div style='height:30px;'></div> 
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
        title: "商城分类",
        class: [],
        classid: 0,
        index: 0,
        searchtxt: "",
        goods: [],
        load: [],
        search:false,
        sort:false,
        current:0,
        tab: 0,
        show: false, //判断是否展示动画
        cate_name:'',
        init:false, //判断
        distance_id:-1,// 附近距离的id
        tradingArea_id :-1,//商圈的id,
        return_id :-1, // 是否全返的id
        items:[]
  },
  onShow(){
    //获取首页传来的全局变量id和name
    let cate_id = app.globalData.cate_id;
    let cate_name = app.globalData.cate_name;
    if(cate_id>0){
      let init = false;
      this.setData({ cate_name, init, tab:0});

      this.changeClass(cate_id);//更新数据和样式
      app.globalData.cate_id = -1;  //清除历史数据
    }
    const _left = wx.getStorageSync('_left')
    const _top = wx.getStorageSync('_top')
    if (_left) {
      this.setData({ _left, _top })
    }
  },
  //改变分类标签
  changetab(e) {
    var tab = e.currentTarget.dataset.tab;
    if(tab==this.data.tab){
      this.setData({
        show: !this.data.show
      })
    }else{
      this.setData({
        show: true,  //显示
      })
    }
    this.setData({
      tab: tab
    })

  },

  cancelTap() {
      this.setData({
        show: !this.data.show
      })
  },
  // 根据距离显示内容
  bindDistance(e){
    let distance_id = e.currentTarget.dataset.id
    this.setData({ distance_id})
    this.changeItem()
  },
  // 选择商圈
  bindTradingArea(e){
    let tradingArea_id = e.currentTarget.dataset.id
    this.setData({ tradingArea_id })
    this.changeItem()
  },
  // 是否全返
  bindReturn(e){
    let return_id = e.currentTarget.dataset.id
    this.setData({ return_id })
    this.changeItem()
  },
  // 根据上面3个改变显示
  changeItem(){
    let distance_id = this.data.distance_id// 附近距离的id
    let tradingArea_id = this.data.tradingArea_id //商圈的id,
    let return_id = this.data.return_id // 是否全返的id
    let list = this.data.items2
    let items = list
    let temp = []
    console.log(distance_id)
    if(distance_id !=-1){

      for(let i = 0;i<items.length;i++){
        switch (distance_id-0){
          case 1:
          console.log(items[i].dis)
            if(items[i].dis<=1000)
              temp.push(items[i])
            break;
          case 2:
            if (items[i].dis > 1000 && items[i].dis<=2000)
              temp.push(items[i])
            break;
          case 3:
            if (items[i].dis > 2000)
              temp.push(items[i])
            break;
        }
      }
      items = temp
    }
    if (tradingArea_id!=-1){
      temp = []
      for (let i = 0; i < items.length; i++) {
        if (items[i].brand == tradingArea_id)
          temp.push(items[i])
      }
      items = temp
    }
    if (return_id!=-1){
      temp = []
      for (let i = 0; i < items.length; i++) {
        if (return_id ==1){
          //全返
          if (items[i].price>0){
            temp.push(items[i])
          }
        }else{
          //无全返
          if (items[i].price == 0 || items[i].price ==null)
            temp.push(items[i])
        }
      }
      items = temp
    }
    this.setData({items,show:false})

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
  showSorts: function () {
    this.setData({
      sort: !this.data.sort
    });
  },

  onLoad: function (options) {
    // options加载一次就会消失
      util.contactInit(this);
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
              load:load,
              TradingArea: res.data.data.TradingArea
          })
          //点击底部栏默认是第个个数据
          if (me.data.cate_name==''){
            me.setData({ cate_name: res.data.data.cate[0].name })
            me.changeClass(res.data.data.cate[0].id)
          }

      });
  },
    // 跳往商家详情页
    bindGotoDetail(e) {
      const id = e.currentTarget.dataset.id
      const distance = e.currentTarget.dataset.distance
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + id + "&distance=" + distance,
      })
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
    bindChangeClass(res){
      let cate_name = res.currentTarget.dataset.name
      let classid = res.currentTarget.dataset.id
      this.setData({ cate_name, classid})
      this.changeClass(classid)
    },

    changeClass: function (id) {
      const _this = this
      util.getLocation(res => {

        util.getAjaxData("getIndexItemsByCate", { lat: res.lat, lng: res.lng, id }, res => {
          _this.setData({
             items: res.data.data,items2:res.data.data, classid:id,
             distance_id: -1,// 附近距离的id
             tradingArea_id: -1,//商圈的id,
             return_id: -1 // 是否全返的id

             })
        })
      })
      //第一次加载时候，暂时不要改变show样式
      if (this.data.init)
        this.setData({show:!this.data.show})
      else
         this.setData({init:true})
        // if (data.currentTarget.dataset.id == this.data.classid) return;
        // var me = this;
        // var goods = me.data.goods;
        // var load = me.data.load;
        // var name = data.currentTarget.dataset.name;
        // if (!load[data.currentTarget.dataset.id]) {
        //     util.getAjaxData("categoods", { id: data.currentTarget.dataset.id }, function (res) {
        //         goods[data.currentTarget.dataset.id] = res.data.data.goods;
        //         load[data.currentTarget.dataset.id] = true
        //         me.setData({
        //             classid: data.currentTarget.dataset.id,
        //             index: data.currentTarget.dataset.index,
        //             name: name,
        //             goods: goods,
        //             load: load,
        //             menu:0
        //         })
        //     });
        // }else{
        //     me.setData({
        //         name: name,
        //         classid: data.currentTarget.dataset.id,
        //         index: data.currentTarget.dataset.index,
        //         menu: 0
        //     })
        // }
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
    onShareAppMessage: util.onShareAppMessage,
    onHide(){
      //页面隐藏时候，要隐藏
      this.setData({show:false})

    }
})

    export default pageData
</script>
<style lang="scss" scoped>
@import '../../common/style/page.scss';
.head{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
}
.top{
  height: rpx(96);
  border-bottom: rpx(10) solid #F0F0F0;
  z-index: 98;
}
.topbar {
  display: flex;
  height: rpx(100);
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border-bottom: rpx(1) solid #eee;
}
.topbar .icon-jiantou{
  font-size: rpx(42);
  margin: 0 rpx(32);
  color: #3785FD;
}
.topbar .input{
  flex: 1;
  margin-right: rpx(30);
  background: #EFEFEF;
  height: rpx(60);
  border: rpx(1) solid #eee;
  position: relative;
  display: flex;
}
.topbar .input input{
  width: 100%;
  height: 100%;
}
.topbar .input .icon-search{
  margin: auto rpx(12) auto rpx(27);
  color: #808080;
} 


.category-wrapper {
  display: flex;
  align-items: center;
  height: rpx(96);
  box-sizing: border-box;
  border-bottom: rpx(1) solid #eee;
  /* justify-content: space-around; */
  color: #8B8B8B;
  font-size: rpx(28);
  z-index: 100;
  background: #fff;
  text-align: center;
}
.category-wrapper div{
  width: 25%;
}
.category-wrapper .active{
  color: #FF9935;
}
.categoryTap{
  position: fixed;
  top: rpx(-104);
  height: 0;
  width: 100%;
  opacity: 0; 
  transform:translate3d(0,-50%,0);    
  z-index: -100;
  box-sizing: border-box;
  transition:none;
}
.hide{
  display: none;
}

.translate{
  position: fixed;
  top: rpx(104);
  transition:height 0.1s cubic-bezier(0.62,0.18,0.01,0),top 0.1s cubic-bezier(0.22,0.48,1,0.8),opacity 0.1s ease-in-out,transform 0.1s ease-in-out;  
  height: 100%;
  opacity: 1;
  transform:translate3d(0,0,0);  
  width: 100%;
  z-index: -100;
} 
.item-top{
  background: #fff;
  padding: rpx(18) rpx(32);
  font-size: rpx(28);
  min-height: rpx(420);
}
.item-bottom{
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.cate-ul,ms-ul{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  z-index: -99;
  justify-content: space-between;
}
.ms-ul{
  justify-content: flex-start;
}
.cate-title{
  color: #7c7c7c;
  line-height: rpx(88);
}
.cate-ul .li{
  flex: 0 0 20%;
  text-align: center;
  border:rpx(1) solid #D5D5D5;
  line-height: rpx(65);
  border-radius: rpx(10);
  margin-bottom: rpx(25);

}
.ms-ul .ms{
  margin-right: rpx(32);
}

.cate-ul .li.active{
  color: #FF9935;
}
.cate-ul .li.sq{
  flex: 0 0 45%;
}
.category-wrapper .active .icon-plus-select-down{

  display: inline-block;
}
.category-wrapper .active2{
  transform: rotate(-180deg);
  transition: all 0.2s linear;
}
/* .category-wrapper.c-hidden{
  display: none;
}

.category-wrapper .li {
  flex:0 0 auto;
  background:white;
  padding:rpx(20) rpx(23) rpx(14);
  font-size:rpx(26);
  border-bottom:rpx(1) solid #efefef;

}

.category-wrapper .li.active {
  color: #3785fd;
}
ul.c-show li.active span{
   color: #3785fd;
}
.category-wrapper .category {
  flex: 1 1 auto;
  overflow: hidden;
}
.category-wrapper .category scroll-view{
  max-height: rpx(85);
  border-bottom:solid rpx(1) #efefef;
   padding: 0 rpx(30);
}
.category-wrapper .category scroll-view .swiper ul {
  display: flex;
 
}
.category-wrapper .category scroll-view .swiper ul.c-hidden{
  display: none;
  transition: all .5s ease-out;
} */
.sortTap ul{
 
}
ul.c-show{
  display:flex;
  flex-wrap:wrap;
  padding: 0 rpx(10);
  transition: all .2s ease-out;
}
ul.c-show li{
  flex: 0 0 auto;
  margin: 5px;
  padding: 5px 0;
}
ul.c-show li span{
  padding:0 rpx(30);
  font-size:12px;
  color:#666;
  border-right:0.5px solid #efefef;

}
.category-wrapper .category scroll-view .swiper ul li {
  flex: 1 0 auto;
  box-sizing: border-box;
  font-size: rpx(26);
  
}

.category-wrapper .category scroll-view .swiper ul li span {
  background: white;
  padding: rpx(19) 0 rpx(16);
  display: inline-block;
}

.category-wrapper .category scroll-view .swiper ul li text::after {
  content: "";
  display: inline-block;
  width: rpx(46);
}

.category-wrapper .category scroll-view .swiper ul li.active {
  color: #3785fd;
}

.category-wrapper .more {
  flex: 0 0 auto;
  background: white;
  border-bottom:rpx(1) solid #efefef;

}

.category-wrapper .more img {
  width:rpx(38);
  height:rpx(38);
  padding:rpx(19) rpx(20) 0;

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
/* 商圈列表 */
.book-ul .book-li{
  overflow: hidden;
  display: flex;
  padding: rpx(21) rpx(30);
  border-bottom: rpx(1) solid #efefef;
}
.book-ul .book-li img{
  width: rpx(168);
  height: rpx(163);
  border-radius: rpx(10);
}
.book-ul .book-li .info{
  padding-left: rpx(27);
  flex: 1;
  overflow: hidden;
  font-size: 12px;
  color: #333;
}
.book-ul .book-li .info .tit{
  font-size: rpx(32);
  line-height: rpx(42);
  padding-top: rpx(5);
  color: #222;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.book-ul .book-li .info  img.huore{
  width: rpx(32);
  height: rpx(32);
  margin: rpx(-5) 0 0 rpx(17);
  vertical-align: middle;
}
.book-ul .book-li .info .desc{
  color:#999;
  overflow:hidden;
  text-overflow:ellipsis;
  line-height:24px;
  padding-bottom:rpx(20);
  white-space:nowrap;

}
.book-ul .book-li .info .other{
  display: flex;
  color: #676767;
  line-height: rpx(64);
}
.book-ul .book-li .info .address{
  display: flex;
  color: #676767;
  line-height: rpx(57);
  font-size: rpx(22);
}
.book-ul .book-li .info .address img{
  width: rpx(20);
  height: rpx(24);
  margin: auto rpx(10) auto 0;
}
.book-ul .book-li .info .other .cate{

  margin-right: rpx(15);

}
.book-ul .book-li .info .other .line{
  width: rpx(1);
  height: rpx(24);
  background: #eee;
  margin: auto 0;
  margin-right: rpx(15);
}
.distant{
  background: #f1f1f1;
  border: rpx(1) solid #eee;
  border-right: none;
  border-radius: rpx(8);
  text-align: center;
  padding: 0 rpx(7);
  color: #666;
  height:rpx(38);
  line-height:rpx(38);
  margin: auto 0;
}
/* .book-ul .book-li{
  overflow: hidden;
  display: flex;
  padding: rpx(30);
  border-bottom: rpx(1) solid #efefef;
}
.book-ul .book-li img{
  width: rpx(200);
  height: rpx(120);
  margin: auto;
}
.book-ul .book-li .info{
  padding-left: rpx(30);
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
} */
</style>