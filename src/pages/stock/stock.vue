<template>
    <page>
        <div class="banner">      <!-- <view class='xiaoxi'>      <image src='/image/img/message.png'></image>      <view class='num'>1</view>    </view> -->      <swiper autoplay="true">          <swiper-item :key="index" v-for="(item,index) in arc">              <div>  				<url :url="'/pages/article/article?id='+(item.id)+'&kfShow=1'">                  	<img :src="item.img"> </img>  				</url>              </div>          </swiper-item>      </swiper>  </div>    <swiper autoplay='true' duration='1000' vertical='true' circular='true' class='swiGS'>      <swiper-item>          <div class='stockBox'>              <div class='sto_item'>                  <img src='/image/img/deep.png'></img>                  <div class="sto_day">                      <div v-if="stock['isToday']"> 今</div>                      <div wx:else=1>昨</div>                  </div>                  <div class='sto_bi'>                      <div>{{stock.nowpri}}</div>                      <div class='per'>{{stock.percent}}%</div>                  </div>              </div>              <div class='sto_item'>                  <img src='/image/img/bi.png'></img>                  <div class="sto_day">                      <div>昨</div>                      <div>今</div>                  </div>                  <div class='sto_bi'>                      <div>{{stock.old_price}}</div>                      <div>{{stock.price}}</div>                  </div>              </div>          </div>      </swiper-item>      <swiper-item>          <div class='news'>              <url :url="'/pages/article/article?cate_id='+(ty_articles[0].cate_id)">                  <img src="/image/img/cj.png"></img>                  <div class='news_content'>                      {{ty_articles[0]["title"]}}                  </div>              </url>          </div>      </swiper-item>  </swiper>  <div class='bor20'></div>    <scroll-view scroll-x=1>      <div class="areaList">  		<url class='li' @click="goto" :data="( {url:'mining'} )">  			挖矿操作  		</url>          <url class='li' @click="goto" :data="( {url:'quotes'} )" >              行情          </url>          <url class='li' @click="goto" :data="( {url:'rank'} )" >              排行榜          </url>            <url class='li' @click="gotoArticle" :data="( {id:ty_articles[1].cate_id} )">              新手指南          </url>          <url class='li' @click="gotoArticle" :data="( {id:ty_articles[2].cate_id} )">              联系客服          </url>      </div>  </scroll-view>    <div class='bor20'></div>      <div class='tyBi'>      <url url='bi'>          <div class='bi_title'>                <div class='title_boom'>我的天羽币</div>                <div class='more'>                  <i class="iconfont icon-return1"></i>              </div>            </div>      </url>      <scroll-view scroll-x=1>          <div class='bi_list'>                <div class='bi_li' :data-id="item.id" v-for="(item,index) in list[1]" :key="index">                  <url :url="'record?id='+(item.id)">                      <img src='/image/img/bi.png'></img>                      <div class='bi'>{{item.id6}}</div>                  </url>              </div>                <div class='bi_li' v-if="!list[1]||list[1].length==0">                  <div class='no'>暂无</div>              </div>            </div>      </scroll-view>  </div>            <div class='tyBi'>      <div class='bi_title'>          <div class='title_boom'>正在挖矿中</div>      </div>      <scroll-view scroll-x=1>          <div class='bi_list'>              <url :url="'record?id='+(item.id)" v-for="(item,index) in list[0]" :key="index">                  <div class='bi_li'>                      <img src='/image/img/wkbi.png'>                          <div class='num'>{{item.num}}</div>                      </img>                      <div class='bi'>{{item.id6}}</div>                  </div>              </url>              <div class='bi_li' v-if="!list[0]||list[0].length==0">                  <div class='no'>暂无</div>              </div>          </div>      </scroll-view>  </div>
    </page>
</template>
<script>
    import {Page,getApp,wx} from '@/common/js/Weapp'
    var util = require('../../utils/util.js')

var app = getApp()
const pageData = Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "商城首页",
    banner: [],
  },
  // url 跳转
  goto(e){
    let url = e.detail.url
    if(url){
      wx.navigateTo({
        url,
      })
    }else{
      wx.showToast({
        title: '稍等再试哟',
        icon: "loading"
      })
    }
   
  },
  // 
  gotoArticle(e){
    let id = e.detail.id
    
    if(id){
      wx.navigateTo({
        url: '/pages/article/article?cate_id=' + id,
      })
    }else{
      wx.showToast({
        title: '稍等再试哟',
        icon:"loading"
      })
    }
  
  },
  /**
   * 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow(){
    let _this = this
    util.getAjaxData("stock", {}).then(data => {
      _this.setData({ ...data.data })
      console.log(_this.data)
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
@import '../../common/style/page.scss';
.banner{
  position: relative;
}
.banner img, .banner .slideitem {
  width: 100%;
  height: rpx(515);
  z-index: 1;
}
.banner swiper img{
	width: rpx(750)
}
.bi_li .no{
  height: 66px;
  line-height: 66px;
  font-size: rpx(30);
}
.xiaoxi {
  top: 10px;
  left: 15px;
  z-index: 100;
  position: absolute;
}
.xiaoxi img{
  width: rpx(48);
  height:rpx(47);
}
.xiaoxi .num{
 position: absolute;
 top: rpx(-10);
 right: rpx(-20);
 display: block;
 width: rpx(36);
 height:rpx(36);
 text-align: center;
 line-height: rpx(36);
 border-radius: rpx(18);
 background: red;
 color: #fff;
 font-size: 11px;
}
.slideitem.swiGS{
  height: 60px;
}
.stockBox{
  display: flex;
  padding: 10px 0;
  font-size: 14px;
}
.news img{
  width: rpx(146);
  height: rpx(34);
}
.stockBox .sto_item{
  flex: 1;
  display: flex;
  justify-content: center;
}
.stockBox .sto_item img{
  width: 40px;
  height:40px;
}
.sto_day{
  margin: 0 rpx(28);
  vertical-align: top;
}
.sto_bi{
  color: #58A5EA;
  font-size: 15px;
  line-height: 20px;
}
.sto_bi .per{
  font-size: 12px;
}
.stockBox .newsList{
  color: #333;
  padding:0 10px;
  flex: 1;
  overflow: hidden;
  font-size: 12px;
}
.news{
  padding: 10px;
}
.news .news_content{
  line-height: 24px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.stockBox .news_li span{
  margin-right: 10px;
  color: #999;
}
.areaList{
  display: flex;
  flex-wrap: nowrap;
  height: 52px;
  align-items: center;
}
.areaList .li{
  padding: 7px 18px;
  text-align: center;
  flex: 1 0 15%;
  margin: 0 10px;
  background: red;
  color: #fff;
  border-radius: 4px;
}
.areaList .li:nth-of-type(1){
   background: -webkit-linear-gradient(right, #FF999D , #F4B390); /* Safari 5.1 - 6.0 */
  background: linear-gradient(to right, #FF999D , #F4B390); /* 标准的语法 */
}
.areaList .li:nth-child(2){
   background: -webkit-linear-gradient(right, #F193C8 , #E4ABE4); /* Safari 5.1 - 6.0 */
  background: linear-gradient(to right, #F193C8 , #E4ABE4); /* 标准的语法 */
}
.areaList .li:nth-child(3){
  background: -webkit-linear-gradient(right, #58A5EA , #92D8E4); /* Safari 5.1 - 6.0 */
  background: linear-gradient(to right, #58A5EA , #92D8E4); /* 标准的语法 */
}
.areaList .li:nth-child(4){
   background: -webkit-linear-gradient(right, #FCD69D , #FCB9A0); /* Safari 5.1 - 6.0 */
  background: linear-gradient(to right, #FCD69D , #FCB9A0); /* 标准的语法 */
}
.areaList .li:nth-child(5){
   background: -webkit-linear-gradient(right, #95D889 , #F0D89B); /* Safari 5.1 - 6.0 */
  background: linear-gradient(to right, #95D889 , #F0D89B); /* 标准的语法 */
}

/* 我的天羽币 */
.tyBi:last-of-type{
  padding-bottom:rpx(30);
}

.more .iconfont{
  font-size: 14px;
}
.bi_list{
  display: flex;
  flex-wrap: nowrap;
  padding: 0 10px;
}
.bi_list .bi_li{
  flex:0 0 60px;
  text-align: center;
  margin-right: 12px;
}
.bi_list .bi_li img{
  width: 50px;
  height: 50px;
}
.bi_li img{
  position: relative;
}
.bi_li .num{
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: rpx(-20);
  margin-top: rpx(-20);
  line-height: rpx(40);
  width: rpx(40);
  height: rpx(40);
  text-align: center;
  border-radius: 50%;
  font-size: rpx(25);

}
</style>