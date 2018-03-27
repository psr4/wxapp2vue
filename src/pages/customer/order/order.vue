<template>
    <page>
        <div class="tab">      <ul>          <li data-status="0" :class="status=='0'?'active':''" @click.stop="changeTab">排队中</li>          <li data-status="1" :class="status=='1'?'active':''" @click.stop="changeTab">已结算</li>      </ul>  </div>  <table>      <thead>          <tr>              <th>商家</th>              <th>金额</th>              <th>返还</th>              <th>时间</th>              <!-- <th>操作</th> -->          </tr>      </thead>      <tbody>          <tr :key="index" v-for="(item,index) in list[status]" >              <td>{{item.store}}</td>              <td>{{item.pay}}</td>              <td>{{item.bonus}}</td>              <td>{{item.add_time}}</td>              <!-- <td>                  <button>退出</button>              </td> -->          </tr>      </tbody>  </table>
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
		list: {

		},
		page: {

		},
		total: {

		}
	},
	onLoad: function (options) {
		this.getPageData()
	},
	changeTab(e) {
		let status = e.currentTarget.dataset.status;
		this.setData({
			status: status
		})
		this.getPageData()
	},
	getPageData() {
		const status = this.data.status;
		let data = {
			p: this.data.page[status],
			status: status
		}
		if (this.data.page[status] >= this.data.total[status]) {
			return;
		}
		util.getAjaxData('store_user_order', data).then((res) => {
			if (res.data.list == null) {
				return
			}
			let page = this.data.page
			let list = this.data.list
			let total = this.data.total
			page[status] = res.data.page;
			console.log(list[status])
			list[status] = list[status] ? list[status].concat(res.data.list) : res.data.list;
			total[status] = res.data.total;
			console.log({
				page: page,
				list: list,
				total: total
			})
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
table{display:table;width:rpx(750)}table tr{display:table-row}table tr th{display:table-cell}table tr td{font-size:10px;display:table-cell;vertical-align:middle}table thead{display:table-header-group;text-align:center;background:#FF9935;color:white;font-size:12px;line-height:32px}table tbody{display:table-row-group;text-align:center}table tbody td{height:32px;line-height:32px}table tbody tr:nth-child(odd){background:rgba(125,125,125,0.1)}table tbody tr:nth-child(even){background:transparent}button{display:block;width:60px;height:16px;line-height:16px;text-align:center;font-size:10px}.tab{padding:10px 0}.tab ul{display:flex;width:rpx(460);margin:0 auto;background: #f0f0f0;border-radius:32px}.tab ul li{line-height:24px;text-align:center;background: #f0f0f0;color:#FF9935;flex:1}.tab ul li.active{background:#FF9935;color:white}.tab ul li:first-child{border-radius:32px}.tab ul li:last-child{border-radius:32px}
</style>