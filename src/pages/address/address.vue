<template>
    <page>
        <!--pages/adderss/address.wxml-->  <div src="/template/common.wxml" import="1" />    <template v-if="additem">    <form @submit="submit">      <div class="from">        <input type="text" placeholder="请填写您的真实姓名" name="consignee" :value="data.consignee" />        <div class="area">          <picker data-index="0" @change="bindChange" :value="select[0]" :range="dsyitem[0]">            <div class="choose">              {{sheng_T}}            </div>          </picker>          <picker data-index="1" @change="bindChange" :value="select[1]" :range="dsyitem['0_'+select[0]]">            <div class="choose">              {{shi_T}}            </div>          </picker>          <picker data-index="2" @change="bindChange" :value="select[2]" :range="dsyitem['0_'+select[0]+'_'+select[1]]">            <div class="choose">              {{qu_T}}            </div>          </picker>        </div>        <input type="text" placeholder="不必重复填写地区" name="address" :value="data.address" />        <input type="text" placeholder="电话号码" name="mobile" :value="data.mobile" />      </div>      <button type="submit">保存</button>      <button @click="cancel">取消</button>    </form>  </template>  <template :wx:else="additem">    <div :class="'item '+( defaultid==item.id?'active':'' )" :data-id="item.id" :data-index="index" @click="default_address" :key="index" v-for="(item,index) in list">      <div class="info">{{item.consignee}}({{item.mobile}})</div>      <div class="address">{{item.sheng}} {{item.shi}} {{item.qu}} {{item.address}}</div>      <div class="btns">        <div class="btn" @click="edit" :data-id="item.id" :data-index="index"><i class="iconfont icon-edit"></i>编辑</div>        <div class="btn" @click="del" :data-id="item.id"><i class="iconfont icon-delete"></i>删除</div>      </div>    </div>    <button @click="additem">新增地址</button>  </template>        <div class="address_selector" v-if="isShow">    <div class="main">      <div class="btnbar">        <div class="cancel" @click="address_cancel">          <span>取消</span>        </div>        <div class="confirm" @click="address_confirm">          <span>确认</span>        </div>      </div>      <div class="content">          <picker-view style="width:100%;" class="area-selector box box-lr" @change="bindChange">          <picker-view-column class="selector province flex">            <div class="items" data-index="0" :data-id="index" :key="index" v-for="(item,index) in dsyitem[select[0]]">{{item}}</div>          </picker-view-column>          <picker-view-column v-if=" dsyitem[select[0]+'_'+select[1]].length>0 ">            <div class="items" data-index="1" :data-id="index" :key="index" v-for="(item,index) in dsyitem[select[0]+'_'+select[1]]">{{item}}</div>          </picker-view-column>          <picker-view-column v-if=" qu.length>0 ">            <div class="items" data-index="2" :data-id="index" :key="index" v-for="(item,index) in qu">{{item}}</div>          </picker-view-column>        </picker-view>            <!--scroll-view scroll-y>          <view class="items {{index == dsy[0]?'active':''}}" wx:for="{{sheng}}" data-index="0" wx:key="sheng" data-id="{{index}}" bindtap="address_choose">{{item}}</view>        </scroll-view>        <scroll-view scroll-y wx:if="{{ shi.length>0 }}">          <view class="items {{index == dsy[1]?'active':''}}" wx:for="{{shi}}" data-index="1" wx:key="shi" data-id="{{index}}"  bindtap="address_choose">{{item}}</view>        </scroll-view>        <scroll-view scroll-y wx:if="{{ qu.length>0 }}">          <view class="items {{index == dsy[2]?'active':''}}" wx:for="{{qu}}" data-index="2" wx:key="qu" data-id="{{index}}"  bindtap="address_choose">{{item}}</view>        </scroll-view-->      </div>    </div>  </div>  <tabbar is="tabbar"></tabbar>
    </page>
</template>
<script>
    import {Page,getApp,wx} from '@/common/js/Weapp'
    var DSY = require('../../selectarea/selectarea.js')
var util = require('../../utils/util.js')
var app = getApp()
const pageData = Page({
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
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../common/style/page.scss';
/* pages/adderss/address.wxss */
picker{
  display: inline-block;
  flex:1;
}
.area{
  display: flex;
}
.item{
  background: white;
  margin:20px 10px;
  box-shadow: 0 0 4px #ccc;
  border-radius: 3px;
  font-size: 14px;
  padding:10px 15px 0;
  line-height: 20px;
}
.active{
  background: #FABCBC;
}
button{
  margin:20px 10px;
  background: #ef2f72;
  color:white;
  border-radius:3px;
  height:36px;
  line-height: 36px;
}
.item .btns{
  display: flex;
  border-top:solid 1px #ddd;
  margin:10px 0;
}
.item .btns .btn{
  flex:1;
  text-align: center;
  border-right: solid 1px #ddd;
  margin:8px 0;
}
.item .btns .btn:last-child{
  border-right: 0px;
}
.item .btns .btn .iconfont{
  display: inline-block;
  width:28px;
  font-size: 12px;
}
.from{
  margin:20px 10px;
}
.from input,.from .area{
  margin: 10px 5%;
  border:solid 1px #ddd;
  background: white;
  border-radius: 3px;
  padding:4px 20px;
  font-size: 14px;
  height:1.4rem;
  line-height:1.4rem;
}
.from .area .choose{
  font-size: 12px;
  color:deepskyblue;
  white-space: nowrap;
  text-align: center;
}
</style>