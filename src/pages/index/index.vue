<template>
    <page>
        <div src="/template/common.wxml" import="1" />  <div class="head">      <div @click.stop="locateTap">          <!-- <i class="iconfont icon-dingwei" bindtap="search"><text>定位中</text></i> -->      </div>        <div class="searchbox">          <div class="search">              <i class="iconfont icon-search" @click="search"></i>              <input placeholder="请输入店家关键字" @change="bindKeyInput" @confirm="search" />          </div>          <div :class="'location '+(localte?'c-hidden':'')" @click="bindSelectSq">              <i class="iconfont icon-dingwei">                  <span>商圈</span>              </i>          </div>      </div>        <div class="banner">          <swiper autoplay="true" :current="swiperCurrent" @change="bannerChange">              <swiper-item :key="index" v-for="(item,index) in banner">                  <url block="1" :url="'/pages/detail/detail?id='+(item.url)">                      <img :src="item.content"> </img>                  </url>              </swiper-item>          </swiper>          <!-- 指示面板 -->          <div class="dots">              <template v-for="(item,index) in banner">                  <div :class="'dot'+(index == bannerCurrent ? ' active' : '')"> </div>              </template>          </div>      </div>        <div class='article'>          <img src="/image/img/today.png"></img>          <i class="iconfont icon-gonggao"></i>          <swiper autoplay='true' duration='1000' vertical='true' circular='true' class='swiGS'>              <swiper-item v-for="(item,index) in notice" :key="index">                  <div class='news'>                      <url block="1" :url="'/pages/article/article?id='+(item.id)">                          <div class='news_content'>{{item.title}}</div>                      </url>                  </div>              </swiper-item>            </swiper>      </div>    </div>    <div :class="'nearbyTap '+(locate?'show':'')">      <div class='near-top' @click.stop="locateTap"></div>      <div class='near-ul' :animation="animation">            <div class='near-title title'>选择商圈</div>            <div class="province">              <div :class="'item '+(item.id==brandId?'select':'')" :data-id="item.id" @click="bindGetIndexItemsBybrand" v-for="(item,index) in TradingArea" :key="index">{{item.name}}</div>>          </div>                <!-- <view class='near-title'>选择商圈</view>        <view class='near-li {{item.id==brandId?"select":""}}' wx:for="{{TradingArea}}" data-id="{{item.id}}"          bindtap='bindGetIndexItemsBybrand'>{{item.name}}</view>> -->      </div>  </div>    <!-- 分类 -->  <div class="nav-wrapper">      <swiper class="swiper-nav" :current="swiperCurrent" @change="swiperChange">          <swiper-item v-for="(tj,index) in tjs" :key="index">              <div class="nav-ul">                  <div class="nav-li" v-for="(item,index) in tj" :key="index">                      <url block="1" @click="binGetItemsByCate" :data="( {id:item.id,name:item.name} )">                          <div class="btn-img">                              <img :src="item.img1"></img>                          </div>                          <div class="btn-tit">{{item.name}}</div>                      </url>                  </div>              </div>          </swiper-item>      </swiper>  </div>      <div class='bor20'></div>      <!-- 附近商圈 01-->  <div class="book-wrapper">      <div class='title'>          <div class='title_boom'>热门推荐</div>      </div>      <!-- 商圈二级分类 -->      <!-- <scroll-view scroll-x >       <view class='sort-nav' > -->      <!-- <view class="sort-item {{sec?'active':''}}"wx:for="{{tuijian}}" data-id='{{item.id}}'  bindtap='binGetSecByCate'>{{item.name}}</view> -->      <!-- <view class='sort-item active'>东方红</view>          <view class='sort-item'>东红</view>          <view class='sort-item'>方红</view>          <view class='sort-item'>胜多负少</view>          <view class='sort-item'>东方红</view>          <view class='sort-item'>东红</view>          <view class='sort-item'>方红</view>          <view class='sort-item'>胜多负少</view>       </view>    </scroll-view> -->        <!-- 商圈列表 -->      <div class="book-ul">          <url block="1" @click="bindGotoDetail" :data="( {distance:item.distance,id:item.id} )" v-for="(item,index) in items" :key="index">              <div class='book-li'>                  <img :src="item.img"></img>                  <div class='info'>                      <div class='tit'>                          <span>{{item.title}}</span>                          <img src='/image/img/shouye_tubiao_huore.png' class='huore' v-if="item.price>0"></img>                      </div>                      <div class='other'>                          <div class='cate'>{{item.cate_name}}</div>                          <div class='line'></div>                          <div class='distant'>{{item.distance}}</div>                      </div>                      <div class='address'>                          <img src='/image/img/xiaochengxu_quanzhoushangquanlianmeng_shouye_tubiao_dizhi.png'></img>                          <div>地址:{{item.sheng}}{{item.shi}}{{item.qu}}{{item.detail}}</div>                      </div>                    </div>              </div>          </url>        </div>  </div>  <div top="_top" left="_left" />    <!-- <template is="contact" data='{{contaction}}'></template>  -->
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
		title: "商城首页",
		banner: [],
		tuijian: [],
		class: [],
		searchtxt: "",
		locate: false,
		swiperCurrent: 0,
		bannerCurrent: 0,
    localte:0,
    notice:0,
    animation:0,
    TradingArea:0,
    tjs:0,
    items:0,
    _top:0,
    _left:0,
    brandId:0
	},
	bannerChange: function (e) {
		this.setData({
			bannerCurrent: e.detail.current
		})
	},
	swiperChange: function (e) {
		this.setData({
			swiperCurrent: e.detail.current
		})
	},
	locateTap() {

		this.setData({
			locate: !this.data.locate
		});

	},
	onShow() {
		const _left = wx.getStorageSync('_left')
		const _top = wx.getStorageSync('_top')
		if (_left) {
			this.setData({ _left, _top })
		}
	},
	loading() {
		var animation = wx.createAnimation({ duration: 900, timingFunction: 'ease-in-out', transformOrigin: "0% 80%" });
		animation.height("80%").step({ duration: 600 });
		animation.scale(1).rotateX(0).skewY(0).step({ duration: 300 });
		this.animation = animation;
		this.setData({
			animation: animation.export()
		})
	},

	onLoad: function () {
		this.getLocation()
		util.contactInit(this);
		app.globalData.scene = this.options.scene;
		var me = this;
		util.getAjaxData("index", this.options, function (res) {
			console.log(res)
			let tuijian = res.data.data.tuijian
			let length = res.data.data.tuijian.length
			let tjs = []
			let tj = []  //
			for (let i = 1; i <= tuijian.length; i++) {
				tj.push(tuijian[i - 1])
				if (i % 8 == 0) {
					tjs.push(tj)  //每8个就推进tjs
					tj = []  //每8个清空tj
				}
			}
			if (tj.length != 0) {
				tjs.push(tj)
			}
			console.log(tj)
			console.log(tjs)
			length = Math.ceil(length / 8)
			console.log(length)
			me.setData({
				tjs,
				banner: res.data.data.ad,
				notice: res.data.data.ad2,
				tuijian,
				class: res.data.data.class,
				coupon: res.data.data.coupon,
				TradingArea: res.data.data.TradingArea,
				length
			})
		}, "POST");
	},
	// 定位获取经纬度
	getLocation() {

		let _this = this

		console.log('定位')
		util.getLocation(res => {
			var latitude = res.lat
			var longitude = res.lng
			app.globalData.lat = latitude
			app.globalData.lng = longitude
			// 获取首页推荐的店
			_this.getIndexItems(longitude, latitude)
		})

		wx.getLocation({
			type: 'gcj02',
			success: function (res) {
				console.log('定位成功')

				console.log(app.globalData)
			},
			fail: rs => {
				wx.showToast("请开启手机定位！")
				wx.authorize({
					scope: 'scope.userLocation',
					success: res => {
						_this.getLocation()
					},
					fail: res => {
						wx.showToast("请开启手机定位！")
						// wx.showModal({
						//   title: '提示',
						//   content: '请开启手机定位！',
						// }}
					}

				})

			}
		})
	},
	// 获取首页推荐的店
	getIndexItems(lng, lat) {
		console.log('123')
		var _this = this
		util.getAjaxData('getIndexItems', { lat, lng }, res => {

			_this.setData({ items: res.data.data, brandId: -1 })
		})
	},
	// 跳往商家详情页
	bindGotoDetail(e) {
		const id = e.detail.id
		const distance = e.detail.distance
		wx.navigateTo({
			url: '/pages/detail/detail?id=' + id + "&distance=" + distance,
		})
	},
	// 根据分类id获取商家
	binGetItemsByCate(e) {
		const id = e.detail.id;
		const name = e.detail.name;
		app.globalData.cate_id = id
		app.globalData.cate_name = name
		wx.switchTab({
			url: '/pages/class/class'
		})
		// const _this = this
		// util.getLocation(res => {

		//   util.getAjaxData("getIndexItemsByCate", { lat: res.lat, lng: res.lng, id }, res => {
		//     _this.setData({ items: res.data.data, brandId: -1 })
		//   })
		// })

	},
	// 选择具体的商圈后 ，获取数据
	bindGetIndexItemsBybrand(e) {
		const id = e.currentTarget.dataset.id
		const _this = this
		this.setData({ locate: false, brandId: id })
		util.getLocation(res => {
			util.getAjaxData('getIndexItemsBybrand', { id, lat: res.lat, lng: res.lng }, info => {
				_this.setData({ items: info.data.data })
			})
		})

	},
	// 选择商圈
	bindSelectSq(e) {
		this.setData({ locate: true })
	},
	bindKeyInput: function (e) {
		const title = e.detail.value
		const _this = this
		this.setData({ searchtxt: title })
		console.log('内容：' + title)
	},
	iteminfo: function (data) {
		wx.navigateTo({
			url: '/pages/detail/detail?id=' + data.currentTarget.dataset.id
		})
	},
	// 搜索內容
	search: function (data) {
		wx.navigateTo({
			url: '/pages/list/list?method=search&text=' + this.data.searchtxt
		})
		// const title = this.data.searchtxt
		// const _this = this
		// console.log('内容：'+title)
		// util.getLocation(res => {
		//   util.getAjaxData('getIndexItemsByTitle', { title, lat: res.lat, lng: res.lng }, info => {
		//     _this.setData({ items: info.data.data })
		//   })
		// })



		// wx.navigateTo({
		//     url: '/pages/list/list?method=search&text=' + this.data.searchtxt
		// })
	},
	classlist: function (data) {
		wx.navigateTo({
			url: '/pages/detail/detail?id=' + data.currentTarget.dataset.id
		})
	},
	onPullDownRefresh: function () {
		this.onLoad();
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage,
	previewimage: util.previewimage
})

    export default pageData
</script>
<style lang="scss" scoped>
@import '../../common/style/page.scss';
page {
  font-size: 0px;
}

.head .location{
  padding: 0 rpx(30);
}
.searchbox {
  display: flex;
  align-items: center;
  width: 100%;
  padding: rpx(11) 0 rpx(11) rpx(36);
  box-sizing:border-box;
  justify-content: space-between;
}

.searchbox .search {
  position: relative;
  flex: 1;
  padding-right: rpx(36);
}

.searchbox .search input {
  height:32px;
  border-radius:rpx(32);
  background:#eee;
  z-index:100;
  opacity:0.9;
  padding: 0 rpx(38) 0  15%;
  font-size: 12px;
  color: #666;
}


.searchbox .icon-search {
  position:absolute;
  left:rpx(30);
  top:20%;
  color:#666;
  z-index:99;
  font-size:18px;

}

.searchbox .location{
  flex: 0 0 20%;
   padding: 0;
}
.location .iconfont {

  color:#67646B;
  z-index:99;
  font-size:18px;

}
 .location span{
  font-size: 14px;
  color:#67646B;
  padding-left: rpx(9);
}


.banner{
  position: relative;
}
.banner img, .banner .slideitem {
  width: 100%;
  height: rpx(537);
}

/* 分类 */

.sort {
  border-top: rpx(14) solid #efefef;
  border-bottom: rpx(10) solid #efefef;
}

.sort ul {
  display: flex;
  width: 100%;
  padding: 0 rpx(16) rpx(14) rpx(16);
  justify-content: space-between;
  align-content: center;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.sort ul li {
  flex: 0 0 32%;
  background: #fff;
  height: rpx(120);
  line-height: rpx(120);
  padding: 0 rpx(18) 0 rpx(30);
  margin-top: rpx(16);
  box-sizing: border-box;
  box-shadow: 1px 1px 5px #eee;
}

.sort ul li .sorttitle {
  float: left;
  color: #9a9a9a;
}

.sort ul li .sortimg {
  float: right;
  padding-top: 8%;
}

.sort ul li img {
  width: rpx(90);
  height: rpx(90);
}

.area {
  width: 100%;
  display: flex;
  border-bottom: rpx(1) solid #efefef;
  padding: 0 0 0 rpx(20);
  box-sizing: border-box;
}

.area .left {
  flex: 0 0 50%;
}

.left .tuijian {
  padding: rpx(30) rpx(10) 0 rpx(10);
  border-right: 1px solid #efefef;
}

.area .left img {
  width: rpx(240);
  height: rpx(240);
}

.area .title {
  color: #3d3d3d;
  font-size: rpx(32);
  margin-bottom: rpx(10);
}

.area .miaoshu {
  color: #9a9a9a;
  font-size: rpx(26);
}

.area .right {
  flex: 0 0 50%;
}

.area .right .rexiao, .area .right .all {
  clear: both;
  height: 50%;
}

.area .right .all {
  border-top: rpx(1) solid #efefef;
}

.area .right .txt {
  float: left;
  padding: rpx(30) rpx(20);
}

.area .right img {
  width: rpx(150);
  height: rpx(150);
  float: right;
  margin-top: rpx(10);
}

/* 优惠券 */

.coupons {
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  border-top: rpx(10) solid #efefef;
  border-bottom: rpx(10) solid #efefef;
}

.coupons  img {
  width: 100%;
  height: rpx(320);
  border-right: rpx(1) solid #f0f0f0;
}

/* 产品展示 */

.shows img {
  width: 100%;
  height: rpx(80);
  margin: rpx(20) 0 rpx(30) 0;
}

.show .bl  img {
  width: 100%;
  height: rpx(332);
}

.goods ul {
  display: flex;
}

.goods ul li {
  margin: 0 rpx(20) rpx(20) rpx(20);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
}

.goods ul li .goodsimg img {
  width: rpx(150);
  height: rpx(150);
  margin: rpx(10) auto;
}

.goods ul li .title {
  font-size: rpx(26);
  color: #9a9a9a;
  width: rpx(120);
  padding: 0 rpx(10);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  text-align: center;
  margin: rpx(10) auto;
}

.goods ul li .price {
  color: #ef2f72;
}

.goods ul li .price {
  display: flex;
  justify-content: center;
  align-content: flex-end;
}

.goods ul li .price .value {
  font-size: rpx(26);
  vertical-align: bottom;
}

.goods ul li .price .unit {
  font-size: rpx(20);
  vertical-align: bottom;
}

.adviser {
  background-color: #ef2f72;
}

.adviser img, .adviser .slideitem {
  width: rpx(520);
  height: rpx(320);
  margin: 0 auto;
}

.platform {
  display: flex;
  height: rpx(450);
  justify-content: space-between;
  align-items: center;
  margin-bottom: rpx(30);
}

.platform .left {
  width: 50%;
  text-align: center;
}

.platform .left .english {
  font-size: rpx(32);
  color: #3d3d3d;
  font-style: italic;
  margin-bottom: rpx(5);
  font-family: 'Franklin Gothic Medium';
}

.platform .left .zhongwen {
  font-size: rpx(26);
  color: #3d3d3d;
  margin-bottom: rpx(30);
}

.platform .left .likedo {
  font-size: rpx(24);
  color: #9b9b9b;
}

.platform .left .line {
  border-bottom: 1px solid #dedede;
  padding-bottom: rpx(25);
  margin: 0 rpx(60) rpx(25) rpx(60);
}

.platform .left img {
  width: rpx(50);
  height: rpx(50);
}

.platform .right img {
  width: rpx(360);
  height: rpx(450);
}

.dibu img {
  width: 100%;
  height: rpx(240);
}

/* 新增 */


.nav-wrapper {
  background: white;
  padding: rpx(47) 0 0;
  position: relative;
}
.nav-wrapper .slideitem{
  height: rpx(430);
}
/* 指示点样式 */
.dots{
  position: absolute;
  left: 0;
  right: 0;
  bottom: rpx(24);
  display: flex;
  justify-content: center;
}
.dots .dot{
  width:rpx(40);
  height: rpx(10);
  background: #FEF2CC;
  transition: all .6s;
  margin-right: rpx(-10);
}
.dots .dot:first-child{
  border-radius:rpx(10) 0 0 rpx(10);
}
.dots .dot:last-child{
  border-radius:0  rpx(10) rpx(10) 0;
}
.dots .dot.active{
  border-radius: rpx(10);
  width: rpx(60);
  background: #f80;
  z-index: 10;
}
 .nav-wrapper .nav-ul {
  width: 100%;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

 .nav-wrapper .nav-ul .nav-li {
  flex: 0 0 25%;
  text-align: center;
   padding-bottom: rpx(56);
}

.nav-wrapper .nav-ul .nav-li .btn-img img {
  width: rpx(86);
  height: rpx(86);
}

.nav-wrapper .nav-ul .nav-li .btn-tit {
  font-size: rpx(28);
  color: #333;
  padding-top:rpx(20);

}
/*二级分类  */
.book-wrapper scroll-view{
  padding: rpx(47) 0 0 rpx(5);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.sort-nav{
  display: flex;

}
.sort-nav .sort-item{
  flex:1 0 auto;
  font-size: rpx(28);
  font-weight: 500;
  color: #666;
  padding:0 rpx(27) rpx(26) rpx(27);
  border-bottom: rpx(1) solid #eee;
}
.sort-nav .active{
  color: #ff4e00;
  border-bottom: rpx(4) solid #ff4e00;
}

.book-wrapper .title{
  padding:rpx(22) rpx(30);
  box-sizing: border-box;
  border-bottom: rpx(1) solid #eee;
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
.nearbyTap{
  position: fixed;
  top: 100%;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
}
.nearbyTap.show{
 top: 0;
}
.near-top{
  height: 20%;
  background: rgba(0, 0, 0, 0.2);
}
.near-ul{
  width: 100%;
  z-index: 2000;
  height:100%;
  position: fixed;
  background: #E5E5E5;
  text-align: center;
  display: flex;
  flex-direction: column;
  transition: height .5s ease-in-out;
}

.near-title{
  text-align: left;
  font-size: 15px;
  border-bottom: rpx(1) solid #efefef;
  line-height: 45px;
  padding-left: rpx(30);
  margin-bottom: rpx(20);
}
.near-title scroll-view{
  height: 100%;
}
.near-li{
  flex: 0 0 auto;
  border:rpx(1) solid #FF9935;
  color: #666;
  font-size: 17px;
  padding: 3px 10px;
  margin: 5px auto;
  border-radius: 3px;
}
/* 选中商圈 */
.select{
  background: #FF9935!important;
  color: white;

}

.area{
  color: #FF4891;
  margin:5px 10px;
  padding: 5px;
  height: rpx(60);
  border-bottom: 1px solid #fff;
}
.province{
  display: flex;
  flex-flow: wrap;
  margin: 10px 10px;
  justify-content:space-around;
}
.province .item{
  flex: 0 0 40%;
  font-size: rpx(28);
  margin-bottom: 10px;
  border-radius: 7px;
  background: #fff;
  text-align: center;
  line-height: 45px;
}
.hide{
  visibility:hidden;
}

/* 文章公告栏 */
.article{
  display: flex;
  padding: 0 rpx(30);
  height: rpx(76);
  box-sizing: border-box;
  align-items: center;
}
.article .swiGS{
  height: 100%;
}
.article img{
  width: rpx(64);
  height: rpx(30);
  margin-right: rpx(12);
}
.article .iconfont{
  color: #FF6736;
  font-size: rpx(36);
  padding-left: rpx(10);
  border-left: rpx(1) solid #eee;
}
.article .slideitem,.article .slideitem .news{
  flex: 1;
  height: rpx(76);
}
.article .slideitem .news{
  padding-left: rpx(20);
}
.article .slideitem .news .news_content{
  font-size: rpx(24);
  color: #666;
  line-height: rpx(74);
  /* height: rpx(74); */
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>