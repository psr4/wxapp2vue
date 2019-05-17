<template>
    <div class="page">
        <div class="showcoupon">   <div class="touming" @click="addcoupon"></div>   <div class="coupons" >     <div :class="('coupon '+(item.hasget==1?'':'active'))" :key="index" v-for="(item,index) in discount">       <div class="info">           <div class="value"><span>￥</span>{{item.price}}</div>           <div class="manjian">           {{item.type == 1?'现金券':'订单满'+item.usable+'元可使用'}}           </div>           <div class="time">{{item.sykssj}}-{{item.syjssj}}</div>       </div>       <div class="lingqu" :bindtap="(item.hasget==1?'':'receive')" :data-id="(item.id)"> 	  {{item.hasget==1?'领取成功':'立即领取'}} 	  </div>     </div>   </div> </div> <button open-type="contact" class="kfbtn"> <span>联 系 客 服 </span> </button> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
var util = require('../../utils/util.js')
var app = getApp()
const pageData = Page({
	data: {
		titlebar: {
			title: "商品详情",
			back: 1
		},
		discount: [],
	},
	onLoad: function (options) {
		var me =this
        util.getAjaxData("dislist", {}, function (res) {
			me.setData({
				discount: res.data.data
			})
		});
	},
	receive(e) {
		var id = e.currentTarget.dataset.id;
		var me = this;
		util.getAjaxData("disget", { id: id }, function (res) {
            wx.showModal({
                title: '提示',
                content: res.data.data,
                success() {
                    if (res.data.msg == "success") {
                        me.onLoad();
                    }
                }
            })
		});
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
@import '../../../common/style/page.scss';
 .touming {
  height: 24%;
  background: rgba(0, 0, 0, 0.9);
}

 .coupons {
	height: 76%; 
	background: #f8f7f7;
	padding: rpx(20) 0;
}

 .coupons .title {
  	text-align: center;
}
.coupons .coupon.active{
	background: #FD5992;
}
 .coupons .coupon {
	width: 90%;
	margin: rpx(30) auto;
	background: #bbb;
	border-radius: 0 5px 5px 0 ;
	display: flex;
	padding: rpx(20) rpx(20);
	align-items: center;
}
 .coupons .coupon  .info{
	flex: 1;
	padding-left: rpx(20);
	color: #fff;
	position: relative;
	border-right: dashed 1px #fff;
}
 .coupons .coupon  .info::before{
	position: absolute;
	display: block;
	height:16px;
	width:16px;
	border-radius: 16px;
	top:-18px;
	right: -8px;
	background: #F8F7F7;
	content: "";
 }
.coupons .coupon  .info::after{
	position: absolute;
	display: block;
	height:16px;
	width:16px;
	border-radius: 16px;
	bottom:-18px;
	right:-8px;
	background:  #F8F7F7;
	content: "";
}
 .coupons .coupon  .info .value{
  line-height: rpx(90);
  font-size: rpx(54);
  
}
 .coupons .coupon  .info .value span,.manjian,.time{
  font-size: rpx(20);
  line-height: rpx(30);
}
 .coupons .coupon .lingqu{
  flex: 0 0 25%;
  text-align: center;
  color: #fff;
}
 .coupons .complete{
  width: 100%;
  height: rpx(120);
  background: -webkit-linear-gradient(left, #ef582f, #efa02f);
  bottom: 0;
  left:0;
  z-index: 100;
  text-align: center;
  font-size: rpx(28);
  line-height: rpx(80);
  color: #fff;
}
</style>