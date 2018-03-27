<template>
    <page>
        <!--设置背景图片，服务器加载-->  <div class='bg'>      <img src='/image/bg.jpg'></img>  </div>  <!-- 光效 -->  <div class='preloader' v-if="!show">      <div :class="status==1?'loader':''"></div>  </div>  <div class='bi' v-if="!show">      <img src='/image/img/bi.png' :style="'transform:translate3d('+(x)+'px,'+(y)+'px,'+(z)+'px);transition:all 0.2s'"></img>      <div v-if="status==1">正在生长中...</div>      <div v-if="status==0">未出生</div>  </div>  <div class='right_code'>      <url @click="showQrcode">          <img src='/image/img/code.png'></img>      </url>  </div>  <div class='wrapper'>      <div class='item'>          <img src='/image/img/tyb_user.png'></img>          <span>帐号</span>          <span>{{username}}</span>      </div>      <div class='item'>          <img src='/image/img/bi.png'></img>          <span>可买数量</span>          <span>{{cansell}}</span>      </div>      <div class='item'>          <img src='/image/img/bi.png'></img>          <span>可卖数量</span>          <span>{{have_num}}</span>      </div>  </div>    <div class='yaoqing'>      <url class='li' block="1" @click="showQrcode" v-if="status == 0">          <div @click="bindCreateMining">              开始挖矿              <img src='/image/annu.png' mode='aspectFix'></img>          </div>      </url>      <url class='li' block="1" @click="showQrcode" v-if="status == 1">          <div class='li select'>              挖矿中              <img src='/image/annu.png' mode='aspectFix'></img>          </div>      </url>        <div class='li'>          <button open-type='share' class='share' v-if="status==1">              邀请好友帮忙挖矿              <img src='/image/annu.png' mode='aspectFix'></img>          </button>          <button class='share' wx:else=1 @click="bindShare">              邀请好友帮忙挖矿              <img src='/image/annu.png' mode='aspectFix'></img>          </button>      </div>  </div>    <div :class="'qrcode '+(show?'show':'')" @click.stop="hideQrcode">      <img :src="url"></img>  </div>
    </page>
</template>
<script>
    import {Page,getApp,wx} from '@/common/js/Weapp'
    var util = require('../../utils/util.js')

var app = getApp()
const pageData = Page({
	data: {
		status: 0,
		url: '',
		show: false
	},
	onLoad: function (options) {
		let _this = this
		util.getAjaxData('mining_page', {}).then(res => {
			_this.setData({ ...res.data })
			console.log(_this.data)
		})
    console.log(this.data.run_mining)
    let obj = {
      show: false
    }
    if (this.data.url == '') {
      const token = wx.getStorageSync('token')
      obj.url =
        util.getAjaxUrl("getsharecode") +
        "?token=" + token +
        "&ty_id=" + (this.data.run_mining ? this.data.run_mining.id : 0)
    }
    this.setData(obj)
	},
	// 开始挖矿
	bindCreateMining() {
		let _this = this
		util.getAjaxData('createMining', {}).then(res => {
			console.log(res)
			if (res.status == 1) {
        util.getAjaxData('mining', { ty_id:res.data});
				_this.setData({ status: 1 })
			} else {
				wx.showModal({
					title: '提示',
					content: res.msg
				})
			}
		})
	},
	onShow: function () {
		var _this = this
		wx.onAccelerometerChange(function (e) {
			let x = e.x * 10
			let y = e.y * 10
			let z = e.z * 10

			_this.setData({
				x, y, z
			})
			// if (e.x > 1 && e.y > 1) {
			//   wx.showToast({
			//     title: '摇一摇成功',
			//     icon: 'success',
			//     duration: 2000
			//   })
			// }
		})
	},
	showQrcode() {
		let obj = {
			show: true
		}
    this.setData(obj)
	},
	hideQrcode() {
		this.setData({
			show: false
		})
	},
	onPullDownRefresh: function () {
		this.onLoad();
		wx.stopPullDownRefresh()
	},
	//tip mining
	bindShare() {
		let _this = this
		wx.showModal({
			title: '提示',
			content: '请先创建一个天羽币',
			confirmText: "创建",
			success(e) {
				if (e.confirm) {
					_this.bindCreateMining()
				}
			}
		})
	},
	//分享的定义
	onShareAppMessage(e) {

		var option = "?scene=" + app.globalData.user.id;
		var indexurl;
		var title
		if (this.data.status == 1) {
			option += "&ty_id=" + this.data.run_mining.id;
			indexurl = "/pages/stock/control" + option;
			title = "天羽币-助力挖矿";
		} else {
			indexurl = this.route + option;
			if (this.data.titlebar) {
				title = this.data.titlebar.title + "-";
			} else if (this.data.title) {
				title = this.data.title + "-";
			} else {
				title = app.globalData.title;
			}
		}
		console.log(indexurl);
		return {
			title: title,
			path: indexurl
		}
	}
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../common/style/page.scss';
page{
  width: 100%;
  height: 100%;
  
  /* background:url('/image/bg.jpg') #032740 no-repeat; */
}
.bg{
   width: 100%;
   height: 100%;
   position: fixed;
  
}
.bg img{
  width: 100%;
  height: 100%;
}
.bi {
  z-index: 1001;
  position: fixed;
  top: 25%;
  left: 50%;
  margin-left: rpx(-75);
  text-align: center;
  color: #fff
}
.bi div{
  margin-top: rpx(20);
}
.bi img{
  width: rpx(140);
  height: rpx(140);
}
.wrapper{
  position: fixed;
  top: rpx(70);
  left: rpx(40);
  font-size: 14px;
}
.wrapper .item{
  color: #fff;
  padding-bottom: 10px;
}
.wrapper .item img{
  width: rpx(42);
  height: rpx(42);
  
  vertical-align: middle;
  margin-right: rpx(20);
  margin-top: rpx(-5);
}
.wrapper .item:first-of-type img{

  margin-left: rpx(-5);
  width: rpx(50);
  height: rpx(50);
}
.wrapper .item span{
  padding-right: 10px;
}
.yaoqing{
  position: fixed;
  display: flex;
  bottom: 20%;
  left: 0;
  color: #fff;
  font-size: 14px;
  width: 100%;
  height: rpx(85);
  justify-content: space-around;
  /* background: url('/image/annu.png') no-repeat; */
}
.yaoqing .li{
  flex: 0 0 40%;
  height: 50px;
  text-align:center;
  line-height:50px;
  position: relative;
}
.yaoqing .li img{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.bi div{
  font-size: rpx(28);
}
div.select{
  color: #E44CF9;
}
button {
  position:relative;
  display:block;
  margin-left:auto;
  margin-right:auto;
  padding-left:0;
  padding-right:0;
  box-sizing:border-box;
  font-size:14px;
  text-align:center;
  text-decoration:none;
  line-height:50px;
  border-radius:0;
  -webkit-tap-highlight-color:transparent;
  overflow:auto;
  color:#fff;
  background-color:transparent;

}
button::after{
  display: none;
}
button::before{
  display: none;
}
.button-hover{
  background-color: transparent;
  color: #D36DF3;
  opacity: 1;
}
.right_code{
  position: absolute;
  right: rpx(20);
  top: rpx(138);
}
.right_code img{
  width: rpx(100);
  height: rpx(100);
}
/*动画特效  */
.preloader {
    position: fixed;
    top: 31%;
    left: 0;
    width: 100%;
    z-index: 100;
}
.loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: rpx(240);
    height: rpx(240);
    margin: rpx(-120) 0 0 rpx(-120);
    border-radius: 50%;
    border:rpx(6) solid transparent;
    border-top-color: #9370DB;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}
.loader:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #BA55D3;
    -webkit-animation: spin 3s linear infinite;
    animation: spin 3s linear infinite;
}
.loader:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #FF00FF;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
}
@-webkit-keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

.qrcode{
	position: fixed;
	left:0px;
	top: 0px;
	right: 0px;
	bottom: 0px;
	z-index: 1002;
	text-align: center;
	transform: scale(0);
	transform-origin: 50% 50%;
	transition: .2s;
}
.qrcode img{
	width: rpx(500);
	height: rpx(500);
	position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

	/* top: rpx(20);
	right: rpx(140); */
}
.qrcode.show {
	transform: scale(1)
}

</style>