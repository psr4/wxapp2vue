<template>
    <div class="page">
        <div class="header">      <img :src="(store.img)"></img>      <div class="tip">{{store.title}}</div>  </div>  <form @submit="submit">      <div class="form">          <div class="row">              <img src='/image/img/huiyuan.png'></img>              <div class="label">                  会员名              </div>              <div class="content">                  <div class="input">                      <input type="text" name="username" :value="(customer.username)" />                  </div>              </div>              <div class="tip">                  <button @click.stop="scan">扫码</button>              </div>          </div>          <div class='bor20'></div>          <div class="row">              <img src='/image/img/jine.png'></img>              <div class="label">                  提现金额              </div>              <div class="content">                  <div class="input">                      <input type="text" name="price" />                  </div>                                </div>          </div>          <div class="note">当前可提现金额:{{customer.money}}</div>          <div class='bor20'></div>          <div class="row">              <div class="btn">                  <button type="submit">提交保存</button>              </div>          </div>      </div>  </form> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
let util = require('../../../utils/util.js')
const pageData = Page({
	data: {
		username: "",
		store: {},
		customer: {}
	},
	onLoad: function (options) {
		util.getAjaxData('storeScan', {}).then((res) => {
			if (res.msg == 'ok') {
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
	scan() {
		wx.scanCode({
			success: (e) => {
				util.getAjaxData('customer', { data: e.result }).then((res) => {
					if (res.msg == "ok") {
						this.setData({
							customer: res.data
						})
					} else {
						wx.showModal({
							title: '提示',
							content: res.data,
							showCancel: false
						})
					}
				})
			}
		})
	},
	submit(e) {
		if (this.ajax) {
			return;
		}
		const price = e.detail.value.price;
		const username = e.detail.value.username;
		if (/^[0-9]+(\.[0-9]{1,2})?$/.test(price) && parseFloat(price) >= 0.01) {
			this.ajax = true;
			util.getAjaxData("store_cash", {
				username: username,
				money: price
			}).then((res) => {
				this.ajax = false;
				wx.showModal({
					title: '提示',
					content: res.data
				})
			})
		} else {
			wx.showModal({
				title: '提示',
				content: "输入的金额有误!"
			})
		}
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
table {
  display: table;
  width: rpx(750);
}
table tr {
  display: table-row;
}
table tr th {
  display: table-cell;
}
table tr td {
  font-size: 10px;
  display: table-cell;
  vertical-align: middle;
}
table thead {
  display: table-header-group;
  text-align: center;
  background: #FF9935;
  color: white;
  font-size: 12px;
  line-height: 32px;
}
table tbody {
  display: table-row-group;
  text-align: center;
}
table tbody td {
  height: 32px;
  line-height: 32px;
}
table tbody tr:nth-child(odd) {
  background: rgba(125, 125, 125, 0.1);
}
table tbody tr:nth-child(even) {
  background: transparent;
}
button {
  display: block;
  width: 60px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size: 10px;
}
.page {
  background: #eee;
}
.header {
  background: #FF9935;
  height: 100px;
  text-align: center;
}
.header img {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background: #FF9935;
  margin: 10px auto 4px;
}
.header .tip {
  color: white;
}
.form .row {
  display: flex;
  background: white;
}
.form .row img {
  width: 20px;
  height: 20px;
  margin: auto 5px auto 10px;
}
.form .row .label {
  flex: 0 0 70px;
  line-height: 32px;
  margin: 4px 0;
  position: relative;
}
.form .row .label:after {
  content: "";
  position: absolute;
  right: 4px;
  top: 4px;
  height: 24px;
  border-right: solid 1px #ccc;
}
.form .row .content {
  flex: 1;
}
.form .row .content .input {
  height: 32px;
  font-size: 10px;
  line-height: 32px;
  padding: 4px 0 0;
}
.form .row .content .input input,
.form .row .content .input .text {
  width: 100%;
  height: 32px;
  line-height: 32px;
  font-size: 10px;
  padding: 0 4px;
  box-sizing: border-box;
}
.form .row .tip {
  flex: 0 0 80px;
  text-align: center;
}
.form .row .tip button {
  height: 24px;
  line-height: 24px;
  margin: 7px auto;
}
.form .row .btn {
  flex: 1;
}
.form .row .btn button {
  width: 40%;
  height: 32px;
  line-height: 32px;
  color: white;
  background: #FF9935;
  margin: 10px auto;
}
.note {
  color: #FF9935;
  background: #fff;
  line-height: 32px;
  font-size: 12px;
  padding: 0 10px;
}

</style>