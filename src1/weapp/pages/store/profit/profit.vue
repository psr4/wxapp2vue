<template>
    <div class="page">
        <div class="header">      <img :src="(store.img)"></img>      <div class="tip">{{store.title}}</div>  </div>  <div class="form">      <navigator url="/pages/store/order/order" hover-class="none">          <div class="row">              <div class="label">                  总销售额              </div>              <div class="content">                  共 {{total.count}} 单 ,合计 {{total.money}} 元              </div>              <div class="detail">详情>></div>          </div>      </navigator>      <navigator url="/pages/store/order/order" hover-class="none">          <div class="row">              <div class="label">                  发放奖金              </div>              <div class="content">                  {{total.bonus}}元              </div>              <div class="detail">详情>></div>          </div>      </navigator>      <navigator url="/pages/store/order/order" hover-class="none">          <div class="row">              <div class="label">                  总盈利额              </div>              <div class="content">                  {{total.profit}}元              </div>              <div class="detail">详情>></div>          </div>      </navigator>      <navigator url="/pages/store/order/user" hover-class="none">          <div class="row">              <div class="label">                  会员提现              </div>              <div class="content">                  {{total.cash}}元              </div>              <div class="detail">详情>></div>          </div>      </navigator>      <navigator url="/pages/store/order/user" hover-class="none">          <div class="row">              <div class="label">                  会员账户              </div>              <div class="content">                  {{ total.bonus - total.cash }}元              </div>              <div class="detail">详情>></div>          </div>      </navigator>        <navigator url="/pages/store/order/detail" hover-class="none">          <div class="row">              <div class="label">                  今日销售              </div>              <div class="content">                  共 {{day.count}} 单,合计 {{day.money}} 元              </div>              <div class="detail">详情>></div>          </div>      </navigator>      <navigator url="/pages/store/order/detail" hover-class="none">          <div class="row">              <div class="label">                  今日盈利              </div>              <div class="content">                  {{day.profit}}元              </div>              <div class="detail">详情>></div>          </div>      </navigator>        <navigator url="/pages/store/order/order" hover-class="none">          <div class="row">              <div class="label">                  今日提现              </div>              <div class="content">                  {{day.cash}}元              </div>              <div class="detail">详情>></div>          </div>      </navigator>    </div> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
let util = require('../../../utils/util.js')
const pageData = Page({
	data: {
		total: {},
		day: {},
		store: {},
		customer: {}
	},
	onLoad: function (options) {
		util.getAjaxData('store', {}).then((res) => {
			if (res.msg == "ok") {
				this.setData({
					store: res.data.store,
					total: res.data.total,
					day: res.data.day
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
	onPullDownRefresh: function () {
		this.onLoad();
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../../common/style/page.scss';
table{display:table;width:rpx(750)}table tr{display:table-row}table tr th{display:table-cell}table tr td{font-size:10px;display:table-cell;vertical-align:middle}table thead{display:table-header-group;text-align:center;background:#FF9935;color:white;font-size:12px;line-height:32px}table tbody{display:table-row-group;text-align:center}table tbody td{height:32px;line-height:32px}table tbody tr:nth-child(odd){background:rgba(125,125,125,0.1)}table tbody tr:nth-child(even){background:transparent}button{display:block;width:60px;height:16px;line-height:16px;text-align:center;font-size:10px}page{background:#eee}.header{background:#FF9935;height:100px;text-align:center}.header img{width:60px;height:60px;border-radius:60px;background:#FF9935;margin:10px auto 4px}.header .tip{color:white}.form .row{display:flex;margin-bottom:8px;background:white}.form .row .label{flex:0 0 80px;line-height:32px;text-align:center}.form .row .content{flex:1;line-height:32px;text-align:center}.form .row .detail{flex:0 0 80px;color:#FF9935;line-height:32px;text-align:center}
</style>