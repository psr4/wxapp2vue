<template>
    <page>
        <table>      <thead>          <tr>              <th>会员</th>              <!-- <th>详情</th> -->              <th>时间</th>              <th>金额</th>          </tr>      </thead>      <tbody>          <tr :key="index" v-for="(item,index) in list">              <td>{{item.username}}</td>              <!-- <td>会员消费100元</td> -->              <td>{{item.add_time}}</td>              <td>{{item.money}}</td>          </tr>      </tbody>  </table>
    </page>
</template>
<script>
    import {Page,getApp,wx} from '@/common/js/Weapp'
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
		data.userid = this.options.userid
		util.getAjaxData('store_myuser_account', data).then((res) => {
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
	onReachBottom() {
		this.getPageData()
	},
	onShareAppMessage: util.onShareAppMessage
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../common/style/page.scss';
table{display:table;width:rpx(750)}table tr{display:table-row}table tr th{display:table-cell}table tr td{font-size:10px;display:table-cell;vertical-align:middle}table thead{display:table-header-group;text-align:center;background:#FF9935;color:white;font-size:12px;line-height:32px}table tbody{display:table-row-group;text-align:center}table tbody td{height:32px;line-height:32px}table tbody tr:nth-child(odd){background:rgba(125,125,125,0.1)}table tbody tr:nth-child(even){background:transparent}button{display:block;width:60px;height:16px;line-height:16px;text-align:center;font-size:10px}
</style>