<template>
    <div class="page">
         <div class="info">     <div src="../../wxParse/wxParse.wxml" import="1" />     <wxParse is="wxParse" :data="({wxParseData:article.nodes})" /> </div>  <!--view>     <view class='tit'>订单列表</view>     <view class="ul">         <view class="li" wx:for="{{detail}}" wx:key="index">             <view class="fl">{{item.nickname}}</view>             <view class="fr">{{item.addtime}}</view>         </view>     </view> </view--> <div style="height:70px;"></div> <div v-if="(!show)">     <button class="btn" @click.stop="showwrapper">立即下单</button> </div> <div :class="('showwrapper '+(show?'show':''))" @click.stop="showwrapper">     <div class="order" @click.stop="none">         <div class='tit'>填写你的订单信息</div>         <form @submit="formSubmit" @reset="formReset">             <div class='item'>                 <label>名称</label>                 <div>{{item.title}}</div>             </div>             <div class='item'>                 <label>金额</label>                 <div class='price'>￥{{price}}</div>             </div>             <div class="item" v-if="(item.server == '1')">                 <label>数量</label>                  <div class="control">                     <button class="buy_btn iconfont icon-sub" data-id="sub" @click="changenum">-</button>                     <div class="input">{{nownum}}</div>                     <button class="buy_btn iconfont icon-add" data-id="add" @click="changenum">+</button>                 </div>             </div>             <template v-for="(item,index) in item.diydata">                 <template v-if="(item.method == 'ftext')">                     <div class='item'>                         <label>{{item.name}}</label>                         <input type='text' class="input" :name="('data'+(index))" :placeholder="(item.content)" />                     </div>                 </template>                 <template :wx:elif="(item.method == 'ftextarea')">                     <div class='item'>                         <label>{{item.name}}</label>                         <textarea class="input" :name="('data'+(index))" :placeholder="(item.content)"></textarea>                     </div>                 </template>                 <template :wx:elif="(item.method == 'fselect')">                     <div class='item'>                         <label>{{item.name}}</label>                         <div class="input">                             <span :data-key="(i)" :data-index="(index)" :data-text="(text)" :class="('selitem '+(select['data'+index]==i ?'active':'' ))" @click.stop="choose" v-for="(text,i) in item.content" :key="index">{{text}}</span>                         </div>                     </div>                 </template>                 <template :wx:elif="(item.method == 'fdate')">                     <div class='item'>                         <label>{{item.name}}</label>                         <div class="input">                             <picker mode="time" start="09:01" end="21:01" :value="(date)" @change="bindTimeChange">                                 <div class="picker">                                     {{date}}                                 </div>                             </picker>                         </div>                     </div>                 </template>              </template>             <div class="btn-area">                 <button formtype="submit">立即支付</button>             </div>         </form>     </div> </div> <button open-type="contact" class="kfbtn"> <span>联 系 客 服 </span> </button> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
// pages/product/product.js
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js')
var app = getApp()
const pageData = Page({
	data: {
		select: {},
		nownum: 1,
		show: 0
	},
	onLoad: function (options) {
		util.getAjaxData("reserver", this.options, (res) => {
			if (!res.data.data.item.id) {
				wx.showModal({
					title: '读取失败',
					content: "未找到对应商品!",
					success: function (res) {
						wx.navigateBack()
					}
				})
			} else {
				this.setData({
					item: res.data.data.item,
					detail: res.data.data.detail,
					price: res.data.data.item.price,
					page: res.data.data.page,
					p: 1
				})
				WxParse.wxParse('article', 'html', res.data.data.item.info, this, 0);
			}
		});
	},
	onReachBottom() {
		this.loadDetail();
	},
	loadDetail() {
		if (!this.data.loading) {
			this.setData({
				loading: true
			})
			var me = this;
			var p = this.data.p + 1;
			if (p <= parseInt(this.data.page)) {
				util.getAjaxData("reserver", { p: p, method: "order" }, function (res) {
					me.setData({
						detail: me.data.detail.concat(res.data.data.detail),
						p: p,
						page: res.data.data.page,
						loading: false
					})
				});
			}
		}
	},
	choose(e) {
		var index = e.currentTarget.dataset.index;
		var key = e.currentTarget.dataset.key;
		var text = e.currentTarget.dataset.text;
		var select = this.data.select;
		select["data" + index] = key;
		this.setData({
			select: select
		})
	},
	buy(e) {
		var method = e.currentTarget.dataset.method;
		this.setData({
			method: method,
			buy: 1
		})
	},
	changenum(e) {
		var method = e.currentTarget.dataset.id;
		var nownum = this.data.nownum;
		if (method == "sub" && nownum > 1) {
			nownum--;
		} else if (method == "add") {
			nownum++;
		}
		var price = parseInt(nownum) * parseFloat(this.data.item.price);

		this.setData({
			nownum: nownum,
			price: price.toFixed(2)
		})
	},
	showwrapper(e) {
		var show = !this.data.show;
		console.log(show);
		this.setData({
			show: show
		})
	},
	formSubmit(e) {
		var data = e.detail.value;
		var select = this.data.select;
		for (var i in select) {
			data[i] = select[i]
		}
		var diydata = this.data.item.diydata;
		for (var i = 0; i < diydata.length; i++) {
			if ((!data["data" + i] || data["data" + i] === "") && data["data" + i] !== 0 && diydata[i].require == "required") {
				wx.showModal({
					title: '提示',
					showCancel: false,
					content: '请填写' + diydata[i].name,
				})
				return;
			}
		}
		data.num = this.data.nownum;
		data.id = this.options.id;
		util.getAjaxData("reserver_pay", data, (res) => {
			if (res.data.msg == "no") {
				wx.showModal({
					title: '提示',
					showCancel: false,
					content: res.data.data,
				})
			} else if (res.data.msg == "pay") {
				wx.requestPayment({
					'timeStamp': res.data.data.api.timeStamp + "",
					'nonceStr': res.data.data.api.nonceStr + "",
					'package': res.data.data.api.package + "",
					'signType': 'MD5',
					'paySign': res.data.data.api.paySign + "",
					'success': function (res) {
						wx.showModal({
							title: '提示',
							content: '支付成功!',
							showCancel: false,
							success() {
								wx.redirectTo({
									url: 'order',
								})
							}
						})
					},
					'fail': function (res) {
						wx.showModal({
							title: '提示',
							content: '支付失败!',
							success() {
								wx.redirectTo({
									url: 'order',
								})
							}
						})
					}
				})
			} else if (res.data.msg == "ok") {
				wx.showModal({
					title: '提示',
					content: res.data.data,
					success() {
						wx.redirectTo({
							url: 'order',
						})
					}
				})
			}
		}, "post");
	},
	onPullDownRefresh: function () {
		this.onLoad();
		this.setDate({
			address: app.globalData.defaultaddress
		})
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage,
	previewimage: util.previewimage
})

    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../common/style/page.scss';
/* pages/product/product.wxss */

/* pages/detail/detail.wxss */
@import '../../wxParse/wxParse';
.section video {
    width: 100%;
}

.information {
    padding: rpx(40);
}

.information .title {
    font-size: rpx(34);
    color: #242424;
    text-align: center;
    font-weight: 600;
}

.information .jiage {
    margin-top: rpx(20);
    align-items: flex-end;
    color: #4a4a4a;
    font-size: rpx(26);
    text-align: center;
}

.information .jiage .value {
    font-size: rpx(36);
    font-weight: bold;
    color: #f50808;
    margin-right: rpx(40);
}

.info {
    box-sizing: border-box;
    font-size: 0px;
	overflow: hidden;
}
.wxParse-img{
	max-width:100%
}

.shuliang {
    display: flex;
    width: 100%;
    text-align: center;
    border-bottom: rpx(1) solid #f4f4f4;
    padding: rpx(40) 0;
    color: #a1a1a1;
}

.shuliang .shuxing {
    flex: 0 0 30%;
}

.shuliang .line {
    border-right: rpx(1) solid #f4f4f4;
}

.shuliang .shuxing .zhi {
    padding: rpx(10) 0;
}

.desc {
    line-height: 30px;
}

/*购买人数  */

.buyers {
    width: 85%;
    margin: 0 auto;
}

.buyers .nums {
    font-size: 15px;
    line-height: 30px;
}

.buyers .buyer {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
}

.buyer .person {
    flex: 1;
}

/* 订单栏 */

.order {
    margin: 30px auto 0;
    width: 100%;
    border: 1px solid #f0f0f0;
}

.tit {
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    background: #ef2f72;
    color: #fff;
    padding: 7px 0;
}

.order .btn-area button {
    background: #56ad3b;
    color: #fff;
    font-size: 15px;
    border-radius: 0;
    line-height: 32px;
    height: 32px;
    margin: 4px 10px;
}

.order .btn-area button.cancel {
    background: #999;
}

.item {
    padding: 0 10px;
    display: flex;
    margin: 10px 0;
    align-items: center;
}

.item .input {
    box-sizing: border-box;
    padding: 4px 8px;
    width: 100%;
    line-height: 30px;
    min-height: 30px;
    border: 1px solid #f0f0f0;
    max-height: 60px;
    flex: 1;
}

.item .selitem {
    display: inline-block;
    line-height: 10px;
    padding: 2px 5px;
    border-radius: 3px;
    color: #ef2f72;
    border: solid 1px #ef2f72;
    margin: 0 4px;
}

.item .selitem.active {
    background: #ef2f72;
    color: white;
}

.ipts {
    flex: 1;
    display: flex;
}

.ipts div {
    width: 30px;
    background: #f0f0f0;
    text-align: center;
    line-height: 28px;
}

.ipts input {
    padding: 0;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border: 1px solid #f0f0f0;
    width: 32px;
}

.item label {
    flex: 0 0 18%;
}

.price {
    color: #f50808;
    font-size: 18px;
    font-weight: 500px;
}

.arrdess .navigator {
    flex: 1;
    position: relative;
}

.arrdess i {
    position: absolute;
    top: 7px;
    right: 5px;
    color: #dededb;
}

.control {
    padding: 8px;
    display: flex;
    flex: 1;
    line-height: 24px;
}

.control .input {
    border-top: solid 1px #ccc;
    border-bottom: solid 1px #ccc;
    text-align: center;
    width: 40px;
    box-sizing: border-box;
    height: 24px;
    min-height: 24px;
    flex: 0 0 50px;
    line-height: 1.4;
}

.control button {
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    width: 32px;
    margin: 0;
    border-radius: 0px;
    border: solid 1px #ccc;
    box-sizing: border-box;
    flex: 0 0 32px;
}

.control button::after {
    display: none;
}

.ul .li {
    line-height: 2.4;
    display: flex;
    padding: 0 10px;
    border-bottom: solid 1px #eee;
}

.ul .li .fl, .ul .li .fr {
	font-size:14px;
    flex: 1;
}

.ul .li .fr {
    text-align: right;
}

.btn {
    width: 100%;
    line-height: 68px;
    height: 68px;
    background: #ef2f72;
    color: white;
    text-align: center;
    position: fixed;
    bottom: 0px;
}

.cancel {
}

.showwrapper {
    position: fixed;
    transition: 0.4s;
    background: white;
    bottom: -1000000px;
    opacity: 0;
    width: 100%;
	z-index: 1;
}

.show {
    top: 0px;
    bottom: 0px;
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
}

.show .order {
    position: absolute;
    width: 100%;
    max-height: 100%;
    overflow: scroll;
    bottom: 0px;
    background: white;
}

</style>