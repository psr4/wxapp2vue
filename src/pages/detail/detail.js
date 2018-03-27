var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js')
var app = getApp()
Page({
	data: {
		titlebar: {
			title: "商品详情",
			back: 1
		},
		item: {},
		img: [],
		show: 1,
        buy:0,
		cart: [],
		money: 0.00,
		coupon: false,
    nownum:1,
    contaction:false,
    sall:false
  },
  call(e) {
    console.log(e)
    const phoneNumber = e.currentTarget.dataset.tel
    console.log(phoneNumber)
    wx.makePhoneCall({
      phoneNumber
    })
  },
  contact() {
    this.setData({
      contaction: !this.data.contaction
    });
  },
  sall() {

    wx.previewImage({
      current: this.data.item.menu_img, // 当前显示图片的http链接
      urls: [this.data.item.menu_img] // 需要预览的图片http链接列表
    })
    // this.setData({
    //   sall: !this.data.sall
    // });
  },
	onLoad: function (options) {
    this.setData({ options})
    const url = util.getAjaxUrl("getCode")
    this.setData({url})

    util.contactInit(this);
		var me = this;
		var cart = wx.getStorageSync('cart');
		var nownum = 1;
		if (cart) {
			for (var i = 0; i < cart.length; i++) {
				if (cart[i].id === options.id) {
					nownum = cart[i].num;
				}
			}
		} else {
			cart = [];
		}
   
    this.setData({distance:options.distance});
    util.getLocation(point=>{
      util.getAjaxData("item", {lng:point.lng,lat:point.lat, id: options.id }, function (res) {
        if (!res.data.data.item.id) {
          wx.showModal({
            title: '读取失败',
            content: "未找到对应商品!",
            success: function (res) {
              wx.navigateBack()
            }
          })
        } else {
          me.setData({
            nowprice: res.data.data.item.price,
            item: res.data.data.item,
            img: res.data.data.img,
            // attr: res.data.data.attr,
            // attr1: res.data.data.attr1,
            id: options.id,
            // cartcount: cart.length,
            // nownum: nownum,
            // cart: cart,
            // discount: res.data.data.discount,
            titlebar: {
              title: res.data.data.item.title,
              back: 1
            }
          })
          WxParse.wxParse('article', 'html', res.data.data.item.info, me, 0);
        }
      });
    });
	},
	receive(e) {
		var id = e.currentTarget.dataset.id;
		var index = e.currentTarget.dataset.index;
		var me = this;

		util.getAjaxData("disget", { id: id }, function (res) {
			if(res.data.msg == "success"){
				var discount = me.data.discount ;
				discount[index].hasget = 1;
				me.setData({
					discount: discount
				})
			}
			wx.showToast({
				icon: res.data.msg,
				title: res.data.data,
			})
		});
    },
	numinput(e) {
		if (e.detail.value == ""){
			return;
		}
		var method = e.currentTarget.dataset.id;
		var nownum = this.data.nownum;
		var newnum = parseInt(e.detail.value);
		if (this.data.item.is_xianggou == 1) {
			if (this.data.item.xiangou_num < newnum) {
				newnum = this.data.item.xiangou_num;
			}
		}
		if (newnum >= 1) {
			this.setData({
				nownum: newnum
			})
		} else {
			this.setData({
				nownum: nownum
			})
		}
	},
    changenum(e){
        var method = e.currentTarget.dataset.id;
        var nownum = this.data.nownum;
        if(method == "sub" && nownum > 1){
            nownum--;
        }else if (method == "add" ){
            if(this.data.item.is_xianggou == 1){
                if (this.data.item.xiangou_num > num) {
                    nownum++;
                }
            } else {
                nownum++;
            }
        }
        this.setData({
            nownum: nownum
        })
    },
    test(){

    },
    hidebuy() {
        this.setData({
            buy: 0
        })
    },
    buy(e){
        var method = e.currentTarget.dataset.method;
        this.setData({
            method:method,
            buy:1
        })
    },
	addcoupon() {
		this.setData({
			coupon: !this.data.coupon
		})
	},
	return() {
		this.setData({
			showtip: !this.data.showtip
		})
	},
	radioChange(e) {
		var id = e.detail.value;
		for (var i = 0; i < this.data.attr1.length; i++) {
			var attr1 = this.data.attr1;
			if (attr1[i].id == id) {
				this.setData({
					nowprice: parseFloat(this.data.item.price) + parseFloat(attr1[i].attr_value)
				})
			}
		}
	},
	addcart: function (data) {
		var goodsinfo = [{
			id: this.data.item.id,
			pic: this.data.img[0].url,
			title: this.data.item.title,
			price: this.data.nowprice,
			pingyou: this.data.item.pingyou,
			kuaidi: this.data.item.kuaidi,
			ems: this.data.item.ems,
			free: this.data.item.free,
			num: this.data.nownum,
			is_xiangou: this.data.item.is_xiangou,
			xiangou_num: this.data.item.xiangou_num,
            cate_id :this.data.item.cate_id
		}];
		var value = this.data.cart;
		var itemindex = -1;
		for (var i = 0; i < value.length; i++) {
			if (value[i].id == goodsinfo[0].id ) {
				var itemindex = i;
			}
		}
		if (itemindex == -1) {
			value = value.concat(goodsinfo);
		} else {
            value[itemindex] = goodsinfo[0];
        }
        wx.setStorageSync('cart', value);
        if (this.data.method == "cart"){
            wx.switchTab({
                url: '/pages/cart/cart',
            })
        } else if (this.data.method == "buy") {
            wx.setStorageSync('buy', goodsinfo);
            wx.redirectTo({
                url: '/pages/pay/pay',
            })
        }
	},
	showinfo: function () {
		this.setData({
			show: !this.data.show
		})
	},
	onPullDownRefresh: function () {
    this.onLoad(this.data.options)
		wx.stopPullDownRefresh()
	},
	onShareAppMessage: util.onShareAppMessage,
	previewimage: util.previewimage
})
