<template>
    <page>
        <div class="header">      <img :src="store.img"></img>      <div class="tip">{{store.title}}</div>  </div>  <form @submit="submit">      <div class="form">          <div class="row">              <div class="label">                  店铺名称              </div>              <div class="content">                  <div class="input">                      <div class="text">{{store.title}}</div>                  </div>                  <div class="tip">                      如要修改请联系客服!                  </div>              </div>          </div>          <div class="row">              <div class="label">                  联系地址              </div>              <div class="content">                  <div class="input">                      {{store.sheng}} {{store.shi}} {{store.qu}} {{store.detail}}                  </div>                  <div class="tip">                    </div>              </div>          </div>          <div class="row">              <div class="label">                  联系电话              </div>              <div class="content">                  <div class="input">                      {{store.tel}}                  </div>                  <div class="tip">                      如要修改请联系客服!                  </div>              </div>          </div>            <div class="row">              <div class="label">                  奖励比例              </div>              <div class="content">                  <div class="input">                      <input type="text" name="price" :value="store.price" />                  </div>                  <div class="tip">                      例: 输入20,则奖励比例为20%,商家每家订单实时的20%进入奖金池来划分给队列客户!                  </div>              </div>          </div>            <div class="row">              <div class="btn">                  <button type="submit">提交保存</button>              </div>          </div>      </div>  </form>
    </page>
</template>
<script>
    import {Page,getApp,wx} from '@/common/js/Weapp'
    let util = require('../../../utils/util.js')
const pageData = Page({
	data: {},
	onLoad: function (options) {
		util.getAjaxData('storeScan', {}).then((res) => {
			if (res.msg == "ok") {
				this.setData({
					store: res.data
				})
			} else {
				wx.showModal({
					title: '提示',
					content: res.data,
					showCancel: false,
					success() {
						wx.switchTab({
							url: '/pages/my/my',
						})
					}
				})
			}
		});
	},
	submit(e) {
		let price = e.detail.value.price;
		price = parseFloat(price)
		if (price >= 100 || price < 0) {
			wx.showModal({
				title: "提示",
				content: "请确认奖金比例是否正确!",
				showCancel: false
			})
			return;
		}
		
		util.getAjaxData("store_set", { price: price }).then((res) => {
			wx.showModal({
				title: "提示",
				content: res.data,
				showCancel: false
			})
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
table{display:table;width:rpx(750)}table tr{display:table-row}table tr th{display:table-cell}table tr td{font-size:10px;display:table-cell;vertical-align:middle}table thead{display:table-header-group;text-align:center;background:#FF9935;color:white;font-size:12px;line-height:32px}table tbody{display:table-row-group;text-align:center}table tbody td{height:32px;line-height:32px}table tbody tr:nth-child(odd){background:rgba(125,125,125,0.1)}table tbody tr:nth-child(even){background:transparent}button{display:block;width:60px;height:16px;line-height:16px;text-align:center;font-size:10px}page{background:#eee}.header{background:#FF9935;height:100px;text-align:center}.header img{width:60px;height:60px;border-radius:60px;background:#FF9935;margin:10px auto 4px}.header .tip{color:white}.form .row{display:flex;margin-bottom:8px;background:white}.form .row .label{flex:0 0 80px;line-height:32px;text-align:center;margin:4px 0;position:relative}.form .row .label:after{content:"";position:absolute;right:4px;top:4px;height:24px;border-right:solid 1px #ccc}.form .row .content{flex:1}.form .row .content .input{height:32px;font-size:10px;line-height:32px;padding:4px 0 0}.form .row .content .input input,.form .row .content .input .text{width:100%;height:32px;line-height:32px;font-size:10px;padding:0 4px;box-sizing:border-box}.form .row .content .tip{color:#999;margin-bottom:4px}.form .row .btn{flex:1}.form .row .btn button{width:80%;height:32px;line-height:32px;color:white;background:#FF9935;margin:10px auto}
</style>