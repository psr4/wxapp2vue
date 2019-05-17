<template>
    <div class="page">
        <table>      <thead>          <tr>              <th>会员</th>              <th>余额</th>              <th>提现</th>          </tr>      </thead>      <tbody>          <tr @click.stop="showAccount" :data-userid="(item.userid)" :key="index" v-for="(item,index) in list">              <td>{{item.username}}</td>              <td>{{item.money}}</td>              <td>{{item.cash}}</td>          </tr>      </tbody>  </table> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
let QR = require("../../../utils/qrcode.js");
let util = require('../../../utils/util.js');
let app = getApp();
const pageData = Page({
	data: {
		status: '0',
		list: [],
		page: 0,
		total: 1
	},
	onLoad: function (options) {
		this.getPageData()
	},
	getPageData() {
		const status = this.data.status;
		let data = {
			p: this.data.page,
			status: status
		}
		if (this.data.page >= this.data.total) {
			return;
		}
		util.getAjaxData('store_useraccount', data).then((res) => {
			if (res.data.list == null) {
				return
			}
			let page = this.data.page
			let list = this.data.list
			let total = this.data.total
			page = res.data.page;
			console.log(list)
			list = list ? list.concat(res.data.list) : res.data.list;
			total = res.data.total;
			this.setData({
				page: page,
				list: list,
				total: total
			})
		})
	},
	showAccount(e){
		let userid = e.currentTarget.dataset.userid;
		wx.navigateTo({
			url: '/pages/store/order/account?userid='+userid,
		})
	},
	onReachBottom() {
		this.getPageData()
	},
	onShareAppMessage: util.onShareAppMessage
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../../common/style/page.scss';
table{display:table;width:rpx(750)}table tr{display:table-row}table tr th{display:table-cell}table tr td{font-size:10px;display:table-cell;vertical-align:middle}table thead{display:table-header-group;text-align:center;background:#FF9935;color:white;font-size:12px;line-height:32px}table tbody{display:table-row-group;text-align:center}table tbody td{height:32px;line-height:32px}table tbody tr:nth-child(odd){background:rgba(125,125,125,0.1)}table tbody tr:nth-child(even){background:transparent}button{display:block;width:60px;height:16px;line-height:16px;text-align:center;font-size:10px}
</style>