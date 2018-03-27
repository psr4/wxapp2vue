import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import pages_article_list from '@/pages/article/list.vue'; 
import pages_article_article from '@/pages/article/article.vue'; 
import pages_index_index from '@/pages/index/index.vue'; 
import pages_recommend_recommend from '@/pages/recommend/recommend.vue'; 
import pages_brand_brand from '@/pages/brand/brand.vue'; 
import pages_list_list from '@/pages/list/list.vue'; 
import pages_detail_detail from '@/pages/detail/detail.vue'; 
import pages_class_class from '@/pages/class/class.vue'; 
import pages_cart_cart from '@/pages/cart/cart.vue'; 
import pages_pay_pay from '@/pages/pay/pay.vue'; 
import pages_dopay_dopay from '@/pages/dopay/dopay.vue'; 
import pages_my_my from '@/pages/my/my.vue'; 
import pages_info_info from '@/pages/info/info.vue'; 
import pages_coupon_coupon from '@/pages/coupon/coupon.vue'; 
import pages_address_address from '@/pages/address/address.vue'; 
import pages_account_account from '@/pages/account/account.vue'; 
import pages_accountdetail_accountdetail from '@/pages/accountdetail/accountdetail.vue'; 
import pages_recharge_recharge from '@/pages/recharge/recharge.vue'; 
import pages_withdraw_withdraw from '@/pages/withdraw/withdraw.vue'; 
import pages_order_order from '@/pages/order/order.vue'; 
import pages_orderinfo_orderinfo from '@/pages/orderinfo/orderinfo.vue'; 
import pages_group_group from '@/pages/group/group.vue'; 
import pages_grouplist_grouplist from '@/pages/grouplist/grouplist.vue'; 
import pages_detaillist_detaillist from '@/pages/detaillist/detaillist.vue'; 
import pages_qrcode_qrcode from '@/pages/qrcode/qrcode.vue'; 
import pages_coupon_get from '@/pages/coupon/get.vue'; 
import pages_site_site from '@/pages/site/site.vue'; 
import pages_site_order from '@/pages/site/order.vue'; 
import pages_stock_stock from '@/pages/stock/stock.vue'; 
import pages_stock_quotes from '@/pages/stock/quotes.vue'; 
import pages_stock_rank from '@/pages/stock/rank.vue'; 
import pages_stock_mining from '@/pages/stock/mining.vue'; 
import pages_stock_control from '@/pages/stock/control.vue'; 
import pages_stock_bi from '@/pages/stock/bi.vue'; 
import pages_my_account from '@/pages/my/account.vue'; 
import pages_stock_record from '@/pages/stock/record.vue'; 
import pages_store_setting_setting from '@/pages/store/setting/setting.vue'; 
import pages_store_profit_profit from '@/pages/store/profit/profit.vue'; 
import pages_store_cash_cash from '@/pages/store/cash/cash.vue'; 
import pages_store_scan_scan from '@/pages/store/scan/scan.vue'; 
import pages_customer_cash_cash from '@/pages/customer/cash/cash.vue'; 
import pages_customer_profit_profit from '@/pages/customer/profit/profit.vue'; 
import pages_customer_order_order from '@/pages/customer/order/order.vue'; 
import pages_customer_pay_pay from '@/pages/customer/pay/pay.vue'; 
import pages_store_order_order from '@/pages/store/order/order.vue'; 
import pages_store_order_user from '@/pages/store/order/user.vue'; 
import pages_store_order_detail from '@/pages/store/order/detail.vue'; 
import pages_store_order_account from '@/pages/store/order/account.vue'; 
import pages_customer_account_account from '@/pages/customer/account/account.vue'; 


const router = new Router({
    // mode: 'history',
    base: '/',
    routes: [            {
                path: '/pages/article/list',
                name: 'pages_article_list',
                component: pages_article_list
            },
            {
                path: '/pages/article/article',
                name: 'pages_article_article',
                component: pages_article_article
            },
            {
                path: '/pages/index/index',
                name: 'pages_index_index',
                component: pages_index_index
            },
            {
                path: '/pages/recommend/recommend',
                name: 'pages_recommend_recommend',
                component: pages_recommend_recommend
            },
            {
                path: '/pages/brand/brand',
                name: 'pages_brand_brand',
                component: pages_brand_brand
            },
            {
                path: '/pages/list/list',
                name: 'pages_list_list',
                component: pages_list_list
            },
            {
                path: '/pages/detail/detail',
                name: 'pages_detail_detail',
                component: pages_detail_detail
            },
            {
                path: '/pages/class/class',
                name: 'pages_class_class',
                component: pages_class_class
            },
            {
                path: '/pages/cart/cart',
                name: 'pages_cart_cart',
                component: pages_cart_cart
            },
            {
                path: '/pages/pay/pay',
                name: 'pages_pay_pay',
                component: pages_pay_pay
            },
            {
                path: '/pages/dopay/dopay',
                name: 'pages_dopay_dopay',
                component: pages_dopay_dopay
            },
            {
                path: '/pages/my/my',
                name: 'pages_my_my',
                component: pages_my_my
            },
            {
                path: '/pages/info/info',
                name: 'pages_info_info',
                component: pages_info_info
            },
            {
                path: '/pages/coupon/coupon',
                name: 'pages_coupon_coupon',
                component: pages_coupon_coupon
            },
            {
                path: '/pages/address/address',
                name: 'pages_address_address',
                component: pages_address_address
            },
            {
                path: '/pages/account/account',
                name: 'pages_account_account',
                component: pages_account_account
            },
            {
                path: '/pages/accountdetail/accountdetail',
                name: 'pages_accountdetail_accountdetail',
                component: pages_accountdetail_accountdetail
            },
            {
                path: '/pages/recharge/recharge',
                name: 'pages_recharge_recharge',
                component: pages_recharge_recharge
            },
            {
                path: '/pages/withdraw/withdraw',
                name: 'pages_withdraw_withdraw',
                component: pages_withdraw_withdraw
            },
            {
                path: '/pages/order/order',
                name: 'pages_order_order',
                component: pages_order_order
            },
            {
                path: '/pages/orderinfo/orderinfo',
                name: 'pages_orderinfo_orderinfo',
                component: pages_orderinfo_orderinfo
            },
            {
                path: '/pages/group/group',
                name: 'pages_group_group',
                component: pages_group_group
            },
            {
                path: '/pages/grouplist/grouplist',
                name: 'pages_grouplist_grouplist',
                component: pages_grouplist_grouplist
            },
            {
                path: '/pages/detaillist/detaillist',
                name: 'pages_detaillist_detaillist',
                component: pages_detaillist_detaillist
            },
            {
                path: '/pages/qrcode/qrcode',
                name: 'pages_qrcode_qrcode',
                component: pages_qrcode_qrcode
            },
            {
                path: '/pages/coupon/get',
                name: 'pages_coupon_get',
                component: pages_coupon_get
            },
            {
                path: '/pages/site/site',
                name: 'pages_site_site',
                component: pages_site_site
            },
            {
                path: '/pages/site/order',
                name: 'pages_site_order',
                component: pages_site_order
            },
            {
                path: '/pages/stock/stock',
                name: 'pages_stock_stock',
                component: pages_stock_stock
            },
            {
                path: '/pages/stock/quotes',
                name: 'pages_stock_quotes',
                component: pages_stock_quotes
            },
            {
                path: '/pages/stock/rank',
                name: 'pages_stock_rank',
                component: pages_stock_rank
            },
            {
                path: '/pages/stock/mining',
                name: 'pages_stock_mining',
                component: pages_stock_mining
            },
            {
                path: '/pages/stock/control',
                name: 'pages_stock_control',
                component: pages_stock_control
            },
            {
                path: '/pages/stock/bi',
                name: 'pages_stock_bi',
                component: pages_stock_bi
            },
            {
                path: '/pages/my/account',
                name: 'pages_my_account',
                component: pages_my_account
            },
            {
                path: '/pages/stock/record',
                name: 'pages_stock_record',
                component: pages_stock_record
            },
            {
                path: '/pages/store/setting/setting',
                name: 'pages_store_setting_setting',
                component: pages_store_setting_setting
            },
            {
                path: '/pages/store/profit/profit',
                name: 'pages_store_profit_profit',
                component: pages_store_profit_profit
            },
            {
                path: '/pages/store/cash/cash',
                name: 'pages_store_cash_cash',
                component: pages_store_cash_cash
            },
            {
                path: '/pages/store/scan/scan',
                name: 'pages_store_scan_scan',
                component: pages_store_scan_scan
            },
            {
                path: '/pages/customer/cash/cash',
                name: 'pages_customer_cash_cash',
                component: pages_customer_cash_cash
            },
            {
                path: '/pages/customer/profit/profit',
                name: 'pages_customer_profit_profit',
                component: pages_customer_profit_profit
            },
            {
                path: '/pages/customer/order/order',
                name: 'pages_customer_order_order',
                component: pages_customer_order_order
            },
            {
                path: '/pages/customer/pay/pay',
                name: 'pages_customer_pay_pay',
                component: pages_customer_pay_pay
            },
            {
                path: '/pages/store/order/order',
                name: 'pages_store_order_order',
                component: pages_store_order_order
            },
            {
                path: '/pages/store/order/user',
                name: 'pages_store_order_user',
                component: pages_store_order_user
            },
            {
                path: '/pages/store/order/detail',
                name: 'pages_store_order_detail',
                component: pages_store_order_detail
            },
            {
                path: '/pages/store/order/account',
                name: 'pages_store_order_account',
                component: pages_store_order_account
            },
            {
                path: '/pages/customer/account/account',
                name: 'pages_customer_account_account',
                component: pages_customer_account_account
            }]
  })
router.push('/pages/article/list')
export default router