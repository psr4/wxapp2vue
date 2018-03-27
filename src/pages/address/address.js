var DSY = require('../../selectarea/selectarea.js')
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    titlebar: {
      title: "地址管理",
      back: 2
    },
    showtabbar: true,
    additem: true,
    data: {},
    list: [],
    select: ['0', '0', '0'],
    sheng_T: DSY.dsy.Items[0][0],
    shi_T: DSY.dsy.Items['0_0'][0],
    qu_T: DSY.dsy.Items['0_0_0'][0],
    dsyitem: DSY.dsy.Items
  },
  onLoad: function (options) {
    if (options.method && options.method == "chooseaddress") {
      this.setData({
        options: options,
        titlebar: {
          title: "选择地址"
        }
      })
    }
    this.additem();
  },
  default_address: function (data) {
    if (this.data.options.method == "chooseaddress") {
      var id = data.currentTarget.dataset.id;
      var index = data.currentTarget.dataset.index;
      this.setData({
        defaultid: id
      });
      app.globalData.address = this.data.list;
      app.globalData.defaultid = id;
      app.globalData.defaultaddress = this.data.list[index];
      wx.navigateBack()
    }
  },
  additem: function () {
    var me = this;
    if (me.data.additem) {
      util.getAjaxData("addresslist", {}, function (result) {
        me.setData({
          additem: !me.data.additem,
          list: result.data.data,
          id: 0
        });
      }, "POST")
    } else {
      me.setData({
        additem: !me.data.additem
      });
    }
  },
  edit: function (data) {
    var id = data.currentTarget.dataset.id;
    var index = data.currentTarget.dataset.index;
    var item = this.data.list[index];
    var data = {
      consignee: item.consignee,
      mobile: item.mobile,
      address: item.address,
      id: id
    }
    this.setData({
      sheng_T: item.sheng,
      shi_T: item.shi,
      qu_T: item.qu,
      data: data
    })
    this.additem();
  },
  del: function (data) {
    var id = data.currentTarget.dataset.id;
    var me = this;
    util.getAjaxData("addresslist", { method: "delete", id: id }, function (result) {
      me.setData({
        list: result.data.data
      });
    }, "POST")
  },
  submit: function (e) {
    var me = this;
    var data = e.detail.value;
    data["id"] = this.data.data.id;
    data["sheng"] = this.data.sheng_T;
    data["shi"] = this.data.shi_T;
    data["qu"] = this.data.qu_T;
    util.getAjaxData("address", data, function (result) {
		if (result.data.msg == "ok") {
			me.additem();
		}else{
			wx.showModal({
				title: '提示',
				content: result.data.data,
			})
		}
    }, "POST")
  },
  bindChange(e) {
    var index = e.currentTarget.dataset.index;
    for (var i = index; i < 3; i++) {
      this.data.select[parseInt(i)] = 0;
    }
    this.data.select[parseInt(index)] = parseInt(e.detail.value);
    this.setData({
      sheng_T: DSY.dsy.Items[0][this.data.select[0]],
      shi_T: DSY.dsy.Items['0_' + this.data.select[0]][this.data.select[1]],
      qu_T: DSY.dsy.Items['0_' + this.data.select[0] + '_' + this.data.select[1]][this.data.select[2]],
      select: this.data.select
    })
    console.log(this.data.select);
  },
  onPullDownRefresh: function () {
    this.setData({
      additem: true
    });
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})