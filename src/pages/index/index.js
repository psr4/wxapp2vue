//index.js
//获取应用实例
var util = require('../../utils/util.js')

var app = getApp()
Page({
	data: {
		title: "商城首页",
		banner: [],
		tuijian: [],
		class: [],
		searchtxt: "",
		locate: false,
		swiperCurrent: 0,
		bannerCurrent: 0,
    localte:0,
    notice:0,
    animation:0,
    TradingArea:0,
    tjs:0,
    items:0,
    _top:0,
    _left:0,
    brandId:0
	},
	bannerChange: function (e) {
		this.setData({
			bannerCurrent: e.detail.current
		})
	},
	swiperChange: function (e) {
		this.setData({
			swiperCurrent: e.detail.current
		})
	},
	locateTap() {

		this.setData({
			locate: !this.data.locate
		});

	},
	onShow() {
		const _left = wx.getStorageSync('_left')
		const _top = wx.getStorageSync('_top')
		if (_left) {
			this.setData({ _left, _top })
		}
	},
	loading() {
		var animation = wx.createAnimation({ duration: 900, timingFunction: 'ease-in-out', transformOrigin: "0% 80%" });
		animation.height("80%").step({ duration: 600 });
		animation.scale(1).rotateX(0).skewY(0).step({ duration: 300 });
		this.animation = animation;
		this.setData({
			animation: animation.export()
		})
	},

	onLoad: function () {
		this.getLocation()
		util.contactInit(this);
		app.globalData.scene = this.options.scene;
		var me = this;
		util.getAjaxData("index", this.options, function (res) {
			console.log(res)
			let tuijian = res.data.data.tuijian
			let length = res.data.data.tuijian.length
			let tjs = []
			let tj = []  //
			for (let i = 1; i <= tuijian.length; i++) {
				tj.push(tuijian[i - 1])
				if (i % 8 == 0) {
					tjs.push(tj)  //每8个就推进tjs
					tj = []  //每8个清空tj
				}
			}
			if (tj.length != 0) {
				tjs.push(tj)
			}
			console.log(tj)
			console.log(tjs)
			length = Math.ceil(length / 8)
			console.log(length)
			me.setData({
				tjs,
				banner: res.data.data.ad,
				notice: res.data.data.ad2,
				tuijian,
				class: res.data.data.class,
				coupon: res.data.data.coupon,
				TradingArea: res.data.data.TradingArea,
				length
			})
		}, "POST");
	},
	// 定位获取经纬度
	getLocation() {

		let _this = this

		console.log('定位')
		util.getLocation(res => {
			var latitude = res.lat
			var longitude = res.lng
			app.globalData.lat = latitude
			app.globalData.lng = longitude
			// 获取首页推荐的店
			_this.getIndexItems(longitude, latitude)
		})

		wx.getLocation({
			type: 'gcj02',
			success: function (res) {
				console.log('定位成功')

				console.log(app.globalData)
			},
			fail: rs => {
				wx.showToast("请开启手机定位！")
				wx.authorize({
					scope: 'scope.userLocation',
					success: res => {
						_this.getLocation()
					},
					fail: res => {
						wx.showToast("请开启手机定位！")
						// wx.showModal({
						//   title: '提示',
						//   content: '请开启手机定位！',
						// }}
					}

				})

			}
		})
	},
	// 获取首页推荐的店
	getIndexItems(lng, lat) {
		console.log('123')
		var _this = this
		util.getAjaxData('getIndexItems', { lat, lng }, res => {

			_this.setData({ items: res.data.data, brandId: -1 })
		})
	},
	// 跳往商家详情页
	bindGotoDetail(e) {
		const id = e.detail.id
		const distance = e.detail.distance
		wx.navigateTo({
			url: '/pages/detail/detail?id=' + id + "&distance=" + distance,
		})
	},
	// 根据分类id获取商家
	binGetItemsByCate(e) {
		const id = e.detail.id;
		const name = e.detail.name;
		app.globalData.cate_id = id
		app.globalData.cate_name = name
		wx.switchTab({
			url: '/pages/class/class'
		})
		// const _this = this
		// util.getLocation(res => {

		//   util.getAjaxData("getIndexItemsByCate", { lat: res.lat, lng: res.lng, id }, res => {
		//     _this.setData({ items: res.data.data, brandId: -1 })
		//   })
		// })

	},
	// 选择具体的商圈后 ，获取数据
	bindGetIndexItemsBybrand(e) {
		const id = e.currentTarget.dataset.id
		const _this = this
		this.setData({ locate: false, brandId: id })
		util.getLocation(res => {
			util.getAjaxData('getIndexItemsBybrand', { id, lat: res.lat, lng: res.lng }, info => {
				_this.setData({ items: info.data.data })
			})
		})

	},
	// 选择商圈
	bindSelectSq(e) {
		this.setData({ locate: true })
	},
	bindKeyInput: function (e) {
		const title = e.detail.value
		const _this = this
		this.setData({ searchtxt: title })
		console.log('内容：' + title)
	},
	iteminfo: function (data) {
		wx.navigateTo({
			url: '/pages/detail/detail?id=' + data.currentTarget.dataset.id
		})
	},
	// 搜索內容
	search: function (data) {
		wx.navigateTo({
			url: '/pages/list/list?method=search&text=' + this.data.searchtxt
		})
		// const title = this.data.searchtxt
		// const _this = this
		// console.log('内容：'+title)
		// util.getLocation(res => {
		//   util.getAjaxData('getIndexItemsByTitle', { title, lat: res.lat, lng: res.lng }, info => {
		//     _this.setData({ items: info.data.data })
		//   })
		// })



		// wx.navigateTo({
		//     url: '/pages/list/list?method=search&text=' + this.data.searchtxt
		// })
	},
	classlist: function (data) {
		wx.navigateTo({
			url: '/pages/detail/detail?id=' + data.currentTarget.dataset.id
		})
	},
	onPullDownRefresh: function () {
		this.onLoad();
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage,
	previewimage: util.previewimage
})
