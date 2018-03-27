//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        titlebar: {
            title: "商品列表",
            back: 1
        },
        style: 1,
        order: 1,
        list: [],
        options: {},
        page: 0
  },

    onShow: function () {
      const _left = wx.getStorageSync('_left')
      const _top = wx.getStorageSync('_top')
      if (_left) {
        this.setData({ _left, _top })
      }
    },
  // 跳往商家详情页
  bindGotoDetail(e){
    const id = e.currentTarget.dataset.id
       const distance = e.currentTarget.dataset.distance
       wx.navigateTo({
      url: '/pages/detail/detail?id=' + id + "&distance=" + distance,
    })
  },
    onLoad: function (options) {
      util.contactInit(this);
      //   var me = this;
      //   options.p = 1;
      const _this = this
        util.getLocation(res => {
          util.getAjaxData('getIndexItemsByTitle', { title: options.text, lat: res.lat, lng: res.lng }, info => {
            _this.setData({ items: info.data.data })
          })
        })
        // util.getAjaxData("lists", { method: options.method, id: options.id, text: options.text }, function (res) {
        //     me.sort(res.data.data.list, 1);
        //     me.setData({
        //         titlebar: {
        //             title: res.data.data.title,
        //             back: 1
        //         },
        //         options: options,
        //         page: res.data.data.page
        //     })
        // });
    },
    load: function () {
        var me = this;
        var options = this.data.options;
        if (this.data.page > options.p) {
            options.p = options.p + 1;
            this.setData({
                options: options
            })
            util.getAjaxData("lists", { method: options.method, id: options.id, text: options.text, p: options.p }, function (res) {
                me.sort(me.data.list.concat(res.data.data.list), me.data.order);
            });
        } else {
            wx.showToast({
                title: '已全部加载',
                icon: 'success',
                duration: 800
            })
        }
    },
    iteminfo: function (data) {
        wx.navigateTo({
            url: '/pages/item/item?id=' + data.currentTarget.dataset.id
        })
    },
    sort: function (arr, sort) {
        var len = arr.length;
        var preIndex, current;
        for (var i = 1; i < len; i++) {
            preIndex = i - 1;
            current = arr[i];
            while (preIndex >= 0) {
                if (sort == 1 && arr[preIndex].ordid > current.ordid) {
                    arr[preIndex + 1] = arr[preIndex];
                    preIndex--;
                } else if (sort == 3 && parseInt(arr[preIndex].buy_num) < parseInt(current.buy_num)) {
                    arr[preIndex + 1] = arr[preIndex];
                    preIndex--;
                } else if (sort == 4 && parseFloat(arr[preIndex].price) > parseFloat(current.price)) {
                    arr[preIndex + 1] = arr[preIndex];
                    preIndex--;
                } else if (sort == 2 && arr[preIndex].id < current.id) {
                    arr[preIndex + 1] = arr[preIndex];
                    preIndex--;
                } else {
                    break;
                }
            }
            arr[preIndex + 1] = current;
        }
        this.setData({
            list: arr
        })
    },
    changstyle: function () {
        this.setData({
            style: (this.data.style + 1) % 3 + 1
        })
    },
    sortitem: function (data) {
        this.sort(this.data.list, data.currentTarget.dataset.id);
        this.setData({
            order: data.currentTarget.dataset.id
        })
        console.log(this.data.order);
    },
    onPullDownRefresh: function () {
        this.load();
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: util.onShareAppMessage
})