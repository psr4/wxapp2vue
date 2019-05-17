import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import _pages_article_list from '@/weapp/pages/article/list.vue'; 
import _pages_article_article from '@/weapp/pages/article/article.vue'; 
import _pages_index_index from '@/weapp/pages/index/index.vue'; 
import _pages_recommend_recommend from '@/weapp/pages/recommend/recommend.vue'; 
import _pages_brand_brand from '@/weapp/pages/brand/brand.vue'; 
import _pages_list_list from '@/weapp/pages/list/list.vue'; 
import _pages_detail_detail from '@/weapp/pages/detail/detail.vue'; 
import _pages_class_class from '@/weapp/pages/class/class.vue'; 
import _pages_cart_cart from '@/weapp/pages/cart/cart.vue'; 
import _pages_pay_pay from '@/weapp/pages/pay/pay.vue'; 
import _pages_dopay_dopay from '@/weapp/pages/dopay/dopay.vue'; 
import _pages_my_my from '@/weapp/pages/my/my.vue'; 
import _pages_info_info from '@/weapp/pages/info/info.vue'; 
import _pages_coupon_coupon from '@/weapp/pages/coupon/coupon.vue'; 
import _pages_address_address from '@/weapp/pages/address/address.vue'; 
import _pages_account_account from '@/weapp/pages/account/account.vue'; 
import _pages_accountdetail_accountdetail from '@/weapp/pages/accountdetail/accountdetail.vue'; 
import _pages_recharge_recharge from '@/weapp/pages/recharge/recharge.vue'; 
import _pages_withdraw_withdraw from '@/weapp/pages/withdraw/withdraw.vue'; 
import _pages_order_order from '@/weapp/pages/order/order.vue'; 
import _pages_orderinfo_orderinfo from '@/weapp/pages/orderinfo/orderinfo.vue'; 
import _pages_group_group from '@/weapp/pages/group/group.vue'; 
import _pages_grouplist_grouplist from '@/weapp/pages/grouplist/grouplist.vue'; 
import _pages_detaillist_detaillist from '@/weapp/pages/detaillist/detaillist.vue'; 
import _pages_qrcode_qrcode from '@/weapp/pages/qrcode/qrcode.vue'; 
import _pages_coupon_get from '@/weapp/pages/coupon/get.vue'; 
import _pages_site_site from '@/weapp/pages/site/site.vue'; 
import _pages_site_order from '@/weapp/pages/site/order.vue'; 
import _pages_stock_stock from '@/weapp/pages/stock/stock.vue'; 
import _pages_stock_quotes from '@/weapp/pages/stock/quotes.vue'; 
import _pages_stock_rank from '@/weapp/pages/stock/rank.vue'; 
import _pages_stock_mining from '@/weapp/pages/stock/mining.vue'; 
import _pages_stock_control from '@/weapp/pages/stock/control.vue'; 
import _pages_stock_bi from '@/weapp/pages/stock/bi.vue'; 
import _pages_my_account from '@/weapp/pages/my/account.vue'; 
import _pages_stock_record from '@/weapp/pages/stock/record.vue'; 
import _pages_store_setting_setting from '@/weapp/pages/store/setting/setting.vue'; 
import _pages_store_profit_profit from '@/weapp/pages/store/profit/profit.vue'; 
import _pages_store_cash_cash from '@/weapp/pages/store/cash/cash.vue'; 
import _pages_store_scan_scan from '@/weapp/pages/store/scan/scan.vue'; 
import _pages_customer_cash_cash from '@/weapp/pages/customer/cash/cash.vue'; 
import _pages_customer_profit_profit from '@/weapp/pages/customer/profit/profit.vue'; 
import _pages_customer_order_order from '@/weapp/pages/customer/order/order.vue'; 
import _pages_customer_pay_pay from '@/weapp/pages/customer/pay/pay.vue'; 
import _pages_store_order_order from '@/weapp/pages/store/order/order.vue'; 
import _pages_store_order_user from '@/weapp/pages/store/order/user.vue'; 
import _pages_store_order_detail from '@/weapp/pages/store/order/detail.vue'; 
import _pages_store_order_account from '@/weapp/pages/store/order/account.vue'; 
import _pages_customer_account_account from '@/weapp/pages/customer/account/account.vue'; 


const router = new Router({
    // mode: 'history',
    base: '/',
    routes: [	{
		path: '/pages/article/list',
		name: '_pages_article_list',
		component: _pages_article_list
	},
	{
		path: '/pages/article/article',
		name: '_pages_article_article',
		component: _pages_article_article
	},
	{
		path: '/pages/index/index',
		name: '_pages_index_index',
		component: _pages_index_index
	},
	{
		path: '/pages/recommend/recommend',
		name: '_pages_recommend_recommend',
		component: _pages_recommend_recommend
	},
	{
		path: '/pages/brand/brand',
		name: '_pages_brand_brand',
		component: _pages_brand_brand
	},
	{
		path: '/pages/list/list',
		name: '_pages_list_list',
		component: _pages_list_list
	},
	{
		path: '/pages/detail/detail',
		name: '_pages_detail_detail',
		component: _pages_detail_detail
	},
	{
		path: '/pages/class/class',
		name: '_pages_class_class',
		component: _pages_class_class
	},
	{
		path: '/pages/cart/cart',
		name: '_pages_cart_cart',
		component: _pages_cart_cart
	},
	{
		path: '/pages/pay/pay',
		name: '_pages_pay_pay',
		component: _pages_pay_pay
	},
	{
		path: '/pages/dopay/dopay',
		name: '_pages_dopay_dopay',
		component: _pages_dopay_dopay
	},
	{
		path: '/pages/my/my',
		name: '_pages_my_my',
		component: _pages_my_my
	},
	{
		path: '/pages/info/info',
		name: '_pages_info_info',
		component: _pages_info_info
	},
	{
		path: '/pages/coupon/coupon',
		name: '_pages_coupon_coupon',
		component: _pages_coupon_coupon
	},
	{
		path: '/pages/address/address',
		name: '_pages_address_address',
		component: _pages_address_address
	},
	{
		path: '/pages/account/account',
		name: '_pages_account_account',
		component: _pages_account_account
	},
	{
		path: '/pages/accountdetail/accountdetail',
		name: '_pages_accountdetail_accountdetail',
		component: _pages_accountdetail_accountdetail
	},
	{
		path: '/pages/recharge/recharge',
		name: '_pages_recharge_recharge',
		component: _pages_recharge_recharge
	},
	{
		path: '/pages/withdraw/withdraw',
		name: '_pages_withdraw_withdraw',
		component: _pages_withdraw_withdraw
	},
	{
		path: '/pages/order/order',
		name: '_pages_order_order',
		component: _pages_order_order
	},
	{
		path: '/pages/orderinfo/orderinfo',
		name: '_pages_orderinfo_orderinfo',
		component: _pages_orderinfo_orderinfo
	},
	{
		path: '/pages/group/group',
		name: '_pages_group_group',
		component: _pages_group_group
	},
	{
		path: '/pages/grouplist/grouplist',
		name: '_pages_grouplist_grouplist',
		component: _pages_grouplist_grouplist
	},
	{
		path: '/pages/detaillist/detaillist',
		name: '_pages_detaillist_detaillist',
		component: _pages_detaillist_detaillist
	},
	{
		path: '/pages/qrcode/qrcode',
		name: '_pages_qrcode_qrcode',
		component: _pages_qrcode_qrcode
	},
	{
		path: '/pages/coupon/get',
		name: '_pages_coupon_get',
		component: _pages_coupon_get
	},
	{
		path: '/pages/site/site',
		name: '_pages_site_site',
		component: _pages_site_site
	},
	{
		path: '/pages/site/order',
		name: '_pages_site_order',
		component: _pages_site_order
	},
	{
		path: '/pages/stock/stock',
		name: '_pages_stock_stock',
		component: _pages_stock_stock
	},
	{
		path: '/pages/stock/quotes',
		name: '_pages_stock_quotes',
		component: _pages_stock_quotes
	},
	{
		path: '/pages/stock/rank',
		name: '_pages_stock_rank',
		component: _pages_stock_rank
	},
	{
		path: '/pages/stock/mining',
		name: '_pages_stock_mining',
		component: _pages_stock_mining
	},
	{
		path: '/pages/stock/control',
		name: '_pages_stock_control',
		component: _pages_stock_control
	},
	{
		path: '/pages/stock/bi',
		name: '_pages_stock_bi',
		component: _pages_stock_bi
	},
	{
		path: '/pages/my/account',
		name: '_pages_my_account',
		component: _pages_my_account
	},
	{
		path: '/pages/stock/record',
		name: '_pages_stock_record',
		component: _pages_stock_record
	},
	{
		path: '/pages/store/setting/setting',
		name: '_pages_store_setting_setting',
		component: _pages_store_setting_setting
	},
	{
		path: '/pages/store/profit/profit',
		name: '_pages_store_profit_profit',
		component: _pages_store_profit_profit
	},
	{
		path: '/pages/store/cash/cash',
		name: '_pages_store_cash_cash',
		component: _pages_store_cash_cash
	},
	{
		path: '/pages/store/scan/scan',
		name: '_pages_store_scan_scan',
		component: _pages_store_scan_scan
	},
	{
		path: '/pages/customer/cash/cash',
		name: '_pages_customer_cash_cash',
		component: _pages_customer_cash_cash
	},
	{
		path: '/pages/customer/profit/profit',
		name: '_pages_customer_profit_profit',
		component: _pages_customer_profit_profit
	},
	{
		path: '/pages/customer/order/order',
		name: '_pages_customer_order_order',
		component: _pages_customer_order_order
	},
	{
		path: '/pages/customer/pay/pay',
		name: '_pages_customer_pay_pay',
		component: _pages_customer_pay_pay
	},
	{
		path: '/pages/store/order/order',
		name: '_pages_store_order_order',
		component: _pages_store_order_order
	},
	{
		path: '/pages/store/order/user',
		name: '_pages_store_order_user',
		component: _pages_store_order_user
	},
	{
		path: '/pages/store/order/detail',
		name: '_pages_store_order_detail',
		component: _pages_store_order_detail
	},
	{
		path: '/pages/store/order/account',
		name: '_pages_store_order_account',
		component: _pages_store_order_account
	},
	{
		path: '/pages/customer/account/account',
		name: '_pages_customer_account_account',
		component: _pages_customer_account_account
	}]
  })

router.afterEach((to, from) => {
  if (window.tabBar && window.tabBar.list) {
    let tabbar = false
    let list = window.tabBar.list
    for (let i = 0; i < list.length; i++) {
      if ('/' + list[ i ].pagePath === to.path) {
        tabbar = true
      }
    }
    const timer = setInterval(() => {
      console.log('tabbar')
      if (!window.vm) {
        return
      }
      clearInterval(timer)
      window.vm.$store.commit('SET_WEAPP_TABBAR', tabbar)
    }, 10)
  }
  if (to.path === '/') {
    router.push(router.options.routes[ 0 ].path)
  }
  clearTimeout(this.timer)
  this.timer = setTimeout(() => {
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent('Redirect')
    document.dispatchEvent(e, true, true);
  }, 500)
})

export default router