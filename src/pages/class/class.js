//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
    data: {
        title: "商城分类",
        class: [],
        classid: 0,
        index: 0,
        searchtxt: "",
        goods: [],
        load: [],
        search:false,
        sort:false,
        current:0,
        tab: 0,
        show: false, //判断是否展示动画
        cate_name:'',
        init:false, //判断
        distance_id:-1,// 附近距离的id
        tradingArea_id :-1,//商圈的id,
        return_id :-1, // 是否全返的id
        items:[]
  },
  onShow(){
    //获取首页传来的全局变量id和name
    let cate_id = app.globalData.cate_id;
    let cate_name = app.globalData.cate_name;
    if(cate_id>0){
      let init = false;
      this.setData({ cate_name, init, tab:0});

      this.changeClass(cate_id);//更新数据和样式
      app.globalData.cate_id = -1;  //清除历史数据
    }
    const _left = wx.getStorageSync('_left')
    const _top = wx.getStorageSync('_top')
    if (_left) {
      this.setData({ _left, _top })
    }
  },
  //改变分类标签
  changetab(e) {
    var tab = e.currentTarget.dataset.tab;
    if(tab==this.data.tab){
      this.setData({
        show: !this.data.show
      })
    }else{
      this.setData({
        show: true,  //显示
      })
    }
    this.setData({
      tab: tab
    })

  },

  cancelTap() {
      this.setData({
        show: !this.data.show
      })
  },
  // 根据距离显示内容
  bindDistance(e){
    let distance_id = e.currentTarget.dataset.id
    this.setData({ distance_id})
    this.changeItem()
  },
  // 选择商圈
  bindTradingArea(e){
    let tradingArea_id = e.currentTarget.dataset.id
    this.setData({ tradingArea_id })
    this.changeItem()
  },
  // 是否全返
  bindReturn(e){
    let return_id = e.currentTarget.dataset.id
    this.setData({ return_id })
    this.changeItem()
  },
  // 根据上面3个改变显示
  changeItem(){
    let distance_id = this.data.distance_id// 附近距离的id
    let tradingArea_id = this.data.tradingArea_id //商圈的id,
    let return_id = this.data.return_id // 是否全返的id
    let list = this.data.items2
    let items = list
    let temp = []
    console.log(distance_id)
    if(distance_id !=-1){

      for(let i = 0;i<items.length;i++){
        switch (distance_id-0){
          case 1:
          console.log(items[i].dis)
            if(items[i].dis<=1000)
              temp.push(items[i])
            break;
          case 2:
            if (items[i].dis > 1000 && items[i].dis<=2000)
              temp.push(items[i])
            break;
          case 3:
            if (items[i].dis > 2000)
              temp.push(items[i])
            break;
        }
      }
      items = temp
    }
    if (tradingArea_id!=-1){
      temp = []
      for (let i = 0; i < items.length; i++) {
        if (items[i].brand == tradingArea_id)
          temp.push(items[i])
      }
      items = temp
    }
    if (return_id!=-1){
      temp = []
      for (let i = 0; i < items.length; i++) {
        if (return_id ==1){
          //全返
          if (items[i].price>0){
            temp.push(items[i])
          }
        }else{
          //无全返
          if (items[i].price == 0 || items[i].price ==null)
            temp.push(items[i])
        }
      }
      items = temp
    }
    this.setData({items,show:false})

  },

  showsearch() {
      var keyword = this.data.keyword;
      if (this.data.search && keyword){
          wx.navigateTo({
              url: '/pages/list/list?method=search&text=' + keyword,
          })
      } else {
          this.setData({
              search: !this.data.search
          })
      }
  },
  showSorts: function () {
    this.setData({
      sort: !this.data.sort
    });
  },

  onLoad: function (options) {
    // options加载一次就会消失
      util.contactInit(this);
      var me = this;
      util.getAjaxData("classes", {}, function (res) {
          var goods = me.data.goods;
          goods[res.data.data.cate[0].id] = res.data.data.goods;
          var load = me.data.load;
          load[res.data.data.cate[0].id] = true;
          me.setData({
              class: res.data.data.cate,
              classid: res.data.data.cate[0].id,
              name:res.data.data.cate[0].name,
              goods: goods,
              load:load,
              TradingArea: res.data.data.TradingArea
          })
          //点击底部栏默认是第个个数据
          if (me.data.cate_name==''){
            me.setData({ cate_name: res.data.data.cate[0].name })
            me.changeClass(res.data.data.cate[0].id)
          }

      });
  },
    // 跳往商家详情页
    bindGotoDetail(e) {
      const id = e.currentTarget.dataset.id
      const distance = e.currentTarget.dataset.distance
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + id + "&distance=" + distance,
      })
    },
    bindKeyInput: function (e) {
        this.setData({
            searchtxt: e.detail.value
        })
    },
    search: function (data) {
        wx.navigateTo({
            url: '/pages/list/list?method=search&text=' + this.data.searchtxt
        })
    },
    input(e){
        var keyword = e.detail.value;
        this.setData({
            keyword:keyword
        })
    },
    bindChangeClass(res){
      let cate_name = res.currentTarget.dataset.name
      let classid = res.currentTarget.dataset.id
      this.setData({ cate_name, classid})
      this.changeClass(classid)
    },

    changeClass: function (id) {
      const _this = this
      util.getLocation(res => {

        util.getAjaxData("getIndexItemsByCate", { lat: res.lat, lng: res.lng, id }, res => {
          _this.setData({
             items: res.data.data,items2:res.data.data, classid:id,
             distance_id: -1,// 附近距离的id
             tradingArea_id: -1,//商圈的id,
             return_id: -1 // 是否全返的id

             })
        })
      })
      //第一次加载时候，暂时不要改变show样式
      if (this.data.init)
        this.setData({show:!this.data.show})
      else
         this.setData({init:true})
        // if (data.currentTarget.dataset.id == this.data.classid) return;
        // var me = this;
        // var goods = me.data.goods;
        // var load = me.data.load;
        // var name = data.currentTarget.dataset.name;
        // if (!load[data.currentTarget.dataset.id]) {
        //     util.getAjaxData("categoods", { id: data.currentTarget.dataset.id }, function (res) {
        //         goods[data.currentTarget.dataset.id] = res.data.data.goods;
        //         load[data.currentTarget.dataset.id] = true
        //         me.setData({
        //             classid: data.currentTarget.dataset.id,
        //             index: data.currentTarget.dataset.index,
        //             name: name,
        //             goods: goods,
        //             load: load,
        //             menu:0
        //         })
        //     });
        // }else{
        //     me.setData({
        //         name: name,
        //         classid: data.currentTarget.dataset.id,
        //         index: data.currentTarget.dataset.index,
        //         menu: 0
        //     })
        // }
    },
    nexttap() {
        var current = this.data.current;
        if (current < this.data.goods[this.data.classid].length - 1){
            current++;
        }else{
            current = 0;
        }
        this.setData({
            current:current
        })
    },
    pretap() {
        var current = this.data.current;
        if (current >0) {
            current--;
        } else {
            current = this.data.goods[this.data.classid].length - 1;
        }
        this.setData({
            current: current
        })
    },
    itemlist: function (data) {
        wx.navigateTo({
            url: '/pages/list/list?method=class&id=' + data.currentTarget.dataset.id
        })
    },
    onPullDownRefresh: function () {
        this.onLoad();
        wx.stopPullDownRefresh()
    },
    onShareAppMessage: util.onShareAppMessage,
    onHide(){
      //页面隐藏时候，要隐藏
      this.setData({show:false})

    }
})
