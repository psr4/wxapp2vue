import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import _weapp_pages_article_list from '@/weapp/pages/article/list.vue'; 
import _weapp_pages_article_article from '@/weapp/pages/article/article.vue'; 
import _weapp_pages_index_index from '@/weapp/pages/index/index.vue'; 
import _weapp_pages_recommend_recommend from '@/weapp/pages/recommend/recommend.vue'; 
import _weapp_pages_brand_brand from '@/weapp/pages/brand/brand.vue'; 
import _weapp_pages_list_list from '@/weapp/pages/list/list.vue'; 
import _weapp_pages_detail_detail from '@/weapp/pages/detail/detail.vue'; 
import _weapp_pages_class_class from '@/weapp/pages/class/class.vue'; 
import _weapp_pages_cart_cart from '@/weapp/pages/cart/cart.vue'; 
import _weapp_pages_pay_pay from '@/weapp/pages/pay/pay.vue'; 
import _weapp_pages_dopay_dopay from '@/weapp/pages/dopay/dopay.vue'; 
import _weapp_pages_my_my from '@/weapp/pages/my/my.vue'; 
import _weapp_pages_info_info from '@/weapp/pages/info/info.vue'; 
import _weapp_pages_coupon_coupon from '@/weapp/pages/coupon/coupon.vue'; 
import _weapp_pages_address_address from '@/weapp/pages/address/address.vue'; 
import _weapp_pages_account_account from '@/weapp/pages/account/account.vue'; 
import _weapp_pages_accountdetail_accountdetail from '@/weapp/pages/accountdetail/accountdetail.vue'; 
import _weapp_pages_recharge_recharge from '@/weapp/pages/recharge/recharge.vue'; 
import _weapp_pages_withdraw_withdraw from '@/weapp/pages/withdraw/withdraw.vue'; 
import _weapp_pages_order_order from '@/weapp/pages/order/order.vue'; 
import _weapp_pages_orderinfo_orderinfo from '@/weapp/pages/orderinfo/orderinfo.vue'; 
import _weapp_pages_group_group from '@/weapp/pages/group/group.vue'; 
import _weapp_pages_grouplist_grouplist from '@/weapp/pages/grouplist/grouplist.vue'; 
import _weapp_pages_detaillist_detaillist from '@/weapp/pages/detaillist/detaillist.vue'; 
import _weapp_pages_qrcode_qrcode from '@/weapp/pages/qrcode/qrcode.vue'; 
import _weapp_pages_coupon_get from '@/weapp/pages/coupon/get.vue'; 
import _weapp_pages_site_site from '@/weapp/pages/site/site.vue'; 
import _weapp_pages_site_order from '@/weapp/pages/site/order.vue'; 
import _weapp_pages_stock_stock from '@/weapp/pages/stock/stock.vue'; 
import _weapp_pages_stock_quotes from '@/weapp/pages/stock/quotes.vue'; 
import _weapp_pages_stock_rank from '@/weapp/pages/stock/rank.vue'; 
import _weapp_pages_stock_mining from '@/weapp/pages/stock/mining.vue'; 
import _weapp_pages_stock_control from '@/weapp/pages/stock/control.vue'; 
import _weapp_pages_stock_bi from '@/weapp/pages/stock/bi.vue'; 
import _weapp_pages_my_account from '@/weapp/pages/my/account.vue'; 
import _weapp_pages_stock_record from '@/weapp/pages/stock/record.vue'; 
import _weapp_pages_store_setting_setting from '@/weapp/pages/store/setting/setting.vue'; 
import _weapp_pages_store_profit_profit from '@/weapp/pages/store/profit/profit.vue'; 
import _weapp_pages_store_cash_cash from '@/weapp/pages/store/cash/cash.vue'; 
import _weapp_pages_store_scan_scan from '@/weapp/pages/store/scan/scan.vue'; 
import _weapp_pages_customer_cash_cash from '@/weapp/pages/customer/cash/cash.vue'; 
import _weapp_pages_customer_profit_profit from '@/weapp/pages/customer/profit/profit.vue'; 
import _weapp_pages_customer_order_order from '@/weapp/pages/customer/order/order.vue'; 
import _weapp_pages_customer_pay_pay from '@/weapp/pages/customer/pay/pay.vue'; 
import _weapp_pages_store_order_order from '@/weapp/pages/store/order/order.vue'; 
import _weapp_pages_store_order_user from '@/weapp/pages/store/order/user.vue'; 
import _weapp_pages_store_order_detail from '@/weapp/pages/store/order/detail.vue'; 
import _weapp_pages_store_order_account from '@/weapp/pages/store/order/account.vue'; 
import _weapp_pages_customer_account_account from '@/weapp/pages/customer/account/account.vue'; 


const router = new Router({
    // mode: 'history',
    base: '/',
    routes: [	{
		path: '/weapp/pages/article/list',
		name: '_weapp_pages_article_list',
		component: _weapp_pages_article_list
	},
	{
		path: '/weapp/pages/article/article',
		name: '_weapp_pages_article_article',
		component: _weapp_pages_article_article
	},
	{
		path: '/weapp/pages/index/index',
		name: '_weapp_pages_index_index',
		component: _weapp_pages_index_index
	},
	{
		path: '/weapp/pages/recommend/recommend',
		name: '_weapp_pages_recommend_recommend',
		component: _weapp_pages_recommend_recommend
	},
	{
		path: '/weapp/pages/brand/brand',
		name: '_weapp_pages_brand_brand',
		component: _weapp_pages_brand_brand
	},
	{
		path: '/weapp/pages/list/list',
		name: '_weapp_pages_list_list',
		component: _weapp_pages_list_list
	},
	{
		path: '/weapp/pages/detail/detail',
		name: '_weapp_pages_detail_detail',
		component: _weapp_pages_detail_detail
	},
	{
		path: '/weapp/pages/class/class',
		name: '_weapp_pages_class_class',
		component: _weapp_pages_class_class
	},
	{
		path: '/weapp/pages/cart/cart',
		name: '_weapp_pages_cart_cart',
		component: _weapp_pages_cart_cart
	},
	{
		path: '/weapp/pages/pay/pay',
		name: '_weapp_pages_pay_pay',
		component: _weapp_pages_pay_pay
	},
	{
		path: '/weapp/pages/dopay/dopay',
		name: '_weapp_pages_dopay_dopay',
		component: _weapp_pages_dopay_dopay
	},
	{
		path: '/weapp/pages/my/my',
		name: '_weapp_pages_my_my',
		component: _weapp_pages_my_my
	},
	{
		path: '/weapp/pages/info/info',
		name: '_weapp_pages_info_info',
		component: _weapp_pages_info_info
	},
	{
		path: '/weapp/pages/coupon/coupon',
		name: '_weapp_pages_coupon_coupon',
		component: _weapp_pages_coupon_coupon
	},
	{
		path: '/weapp/pages/address/address',
		name: '_weapp_pages_address_address',
		component: _weapp_pages_address_address
	},
	{
		path: '/weapp/pages/account/account',
		name: '_weapp_pages_account_account',
		component: _weapp_pages_account_account
	},
	{
		path: '/weapp/pages/accountdetail/accountdetail',
		name: '_weapp_pages_accountdetail_accountdetail',
		component: _weapp_pages_accountdetail_accountdetail
	},
	{
		path: '/weapp/pages/recharge/recharge',
		name: '_weapp_pages_recharge_recharge',
		component: _weapp_pages_recharge_recharge
	},
	{
		path: '/weapp/pages/withdraw/withdraw',
		name: '_weapp_pages_withdraw_withdraw',
		component: _weapp_pages_withdraw_withdraw
	},
	{
		path: '/weapp/pages/order/order',
		name: '_weapp_pages_order_order',
		component: _weapp_pages_order_order
	},
	{
		path: '/weapp/pages/orderinfo/orderinfo',
		name: '_weapp_pages_orderinfo_orderinfo',
		component: _weapp_pages_orderinfo_orderinfo
	},
	{
		path: '/weapp/pages/group/group',
		name: '_weapp_pages_group_group',
		component: _weapp_pages_group_group
	},
	{
		path: '/weapp/pages/grouplist/grouplist',
		name: '_weapp_pages_grouplist_grouplist',
		component: _weapp_pages_grouplist_grouplist
	},
	{
		path: '/weapp/pages/detaillist/detaillist',
		name: '_weapp_pages_detaillist_detaillist',
		component: _weapp_pages_detaillist_detaillist
	},
	{
		path: '/weapp/pages/qrcode/qrcode',
		name: '_weapp_pages_qrcode_qrcode',
		component: _weapp_pages_qrcode_qrcode
	},
	{
		path: '/weapp/pages/coupon/get',
		name: '_weapp_pages_coupon_get',
		component: _weapp_pages_coupon_get
	},
	{
		path: '/weapp/pages/site/site',
		name: '_weapp_pages_site_site',
		component: _weapp_pages_site_site
	},
	{
		path: '/weapp/pages/site/order',
		name: '_weapp_pages_site_order',
		component: _weapp_pages_site_order
	},
	{
		path: '/weapp/pages/stock/stock',
		name: '_weapp_pages_stock_stock',
		component: _weapp_pages_stock_stock
	},
	{
		path: '/weapp/pages/stock/quotes',
		name: '_weapp_pages_stock_quotes',
		component: _weapp_pages_stock_quotes
	},
	{
		path: '/weapp/pages/stock/rank',
		name: '_weapp_pages_stock_rank',
		component: _weapp_pages_stock_rank
	},
	{
		path: '/weapp/pages/stock/mining',
		name: '_weapp_pages_stock_mining',
		component: _weapp_pages_stock_mining
	},
	{
		path: '/weapp/pages/stock/control',
		name: '_weapp_pages_stock_control',
		component: _weapp_pages_stock_control
	},
	{
		path: '/weapp/pages/stock/bi',
		name: '_weapp_pages_stock_bi',
		component: _weapp_pages_stock_bi
	},
	{
		path: '/weapp/pages/my/account',
		name: '_weapp_pages_my_account',
		component: _weapp_pages_my_account
	},
	{
		path: '/weapp/pages/stock/record',
		name: '_weapp_pages_stock_record',
		component: _weapp_pages_stock_record
	},
	{
		path: '/weapp/pages/store/setting/setting',
		name: '_weapp_pages_store_setting_setting',
		component: _weapp_pages_store_setting_setting
	},
	{
		path: '/weapp/pages/store/profit/profit',
		name: '_weapp_pages_store_profit_profit',
		component: _weapp_pages_store_profit_profit
	},
	{
		path: '/weapp/pages/store/cash/cash',
		name: '_weapp_pages_store_cash_cash',
		component: _weapp_pages_store_cash_cash
	},
	{
		path: '/weapp/pages/store/scan/scan',
		name: '_weapp_pages_store_scan_scan',
		component: _weapp_pages_store_scan_scan
	},
	{
		path: '/weapp/pages/customer/cash/cash',
		name: '_weapp_pages_customer_cash_cash',
		component: _weapp_pages_customer_cash_cash
	},
	{
		path: '/weapp/pages/customer/profit/profit',
		name: '_weapp_pages_customer_profit_profit',
		component: _weapp_pages_customer_profit_profit
	},
	{
		path: '/weapp/pages/customer/order/order',
		name: '_weapp_pages_customer_order_order',
		component: _weapp_pages_customer_order_order
	},
	{
		path: '/weapp/pages/customer/pay/pay',
		name: '_weapp_pages_customer_pay_pay',
		component: _weapp_pages_customer_pay_pay
	},
	{
		path: '/weapp/pages/store/order/order',
		name: '_weapp_pages_store_order_order',
		component: _weapp_pages_store_order_order
	},
	{
		path: '/weapp/pages/store/order/user',
		name: '_weapp_pages_store_order_user',
		component: _weapp_pages_store_order_user
	},
	{
		path: '/weapp/pages/store/order/detail',
		name: '_weapp_pages_store_order_detail',
		component: _weapp_pages_store_order_detail
	},
	{
		path: '/weapp/pages/store/order/account',
		name: '_weapp_pages_store_order_account',
		component: _weapp_pages_store_order_account
	},
	{
		path: '/weapp/pages/customer/account/account',
		name: '_weapp_pages_customer_account_account',
		component: _weapp_pages_customer_account_account
	}]
  })
// router.push('/weapp/pages/article/list')

router.afterEach((to, from) => {
  clearTimeout(this.timer)
  this.timer = setTimeout(() => {
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent('Redirect')
    document.dispatchEvent(e, true, true);
  }, 500)
})

export default router