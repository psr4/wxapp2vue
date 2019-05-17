<template>
    <div class="page">
        <div src="/template/common.wxml" import="1"/> <!--template is="titlebar" data="{{...titlebar}}"></template-->  <div class="tabbtn">   <div data-id="1" :class="('btn1 '+(tabid==1?'active':''))" @click="changtab">已完成订单</div>   <div data-id="2" :class="('btn2 '+(tabid==2?'active':''))" @click="changtab">未完成订单</div> </div>   <div class="userlist" :style="(tabid==2?'display:none;':'')">   <div class="list" :key="index" v-for="(item,index) in u1">       <div class="userinfo">         <div class="nickname" style="font-size:10px;">订单号:{{item.orderSn}}</div>       </div>       <div class="userinfo">         <div class="nickname"  style="color:red;">{{item.intro}}</div>       </div>       <div class="userinfo">         <div class="nickname"   style="color:red;">分成金额:{{item.order_fcprice}}</div>         <div class="nickname"  style="font-size:10px;">{{item.addtime}}</div>       </div>   </div> </div> <div class="userlist" :style="(tabid==1?'display:none;':'')">   <div class="list" :key="index" v-for="(item,index) in u2">       <div class="userinfo">         <div class="nickname">订单号:{{item.orderSn}}</div>       </div>       <div class="userinfo">         <div class="nickname" style="color:red;">{{item.intro}}</div>       </div>       <div class="userinfo">         <div class="nickname" style="color:red;">分成金额:{{item.order_fcprice}}</div>         <div class="nickname">{{item.addtime}}</div>       </div>   </div> </div> <button open-type="contact" class="kfbtn"> <span>联 系 客 服 </span> </button> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
const pageData = Page({
  data: {
    titlebar: {
      title: "团队订单",
      back: 2
    },
    tabid:1,
    showtabbar: true
  },
  onLoad: function (options) {
    var me = this;
    util.getAjaxData("detaillist", {}, function (res) {
      me.setData({
        u1: res.data.data.u1,
        u2: res.data.data.u2
      })
    }, "POST");
  },
  changtab(e){
    this.setData({
      tabid:e.currentTarget.dataset.id
    })
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
@import '../../../common/style/page.scss';
.tabbtn{
  display: flex;
  width:200px;
  margin:10px auto;
}
.tabbtn .btn1,.tabbtn .btn2{
  flex:1;
  text-align: center;
  width:100px;
  line-height: 30px;
  font-size:12px;
  color:#EF2F72;
  border: solid 1px  #EF2F72;
}
.tabbtn .active{
  background: #EF2F72;
  color:white;
}

.tabbtn .btn1{
  border-radius:5px 0 0 5px;
}
.tabbtn .btn2{
  border-radius: 0 5px 5px 0;
}

.userlist .list{
  width:80%;
  margin:0 auto;
  background: white;
  border-bottom:solid 1px #ddd;
  padding:10px;
  border-top:solid 1px #EF2F72;
}
.userlist .list:first-child{
  border-radius:5px 5px 0 0 ;
}
.userlist .list:last-child{
  border-bottom:0px;
  border-radius:0 0 5px 5px;
}

.userlist .list .headimg img{
  width:40px;
  height: 40px;
  border-radius:40px;
  background: red;
  margin:10px;
}
.userlist .list .userinfo{
  display: flex;
}
.userlist .list .userinfo .nickname{
  font-size: 12px;
  line-height: 20px ;
  flex:1;
}
.userlist .list .userinfo .regtime{
  font-size:12px;
  color:red;
}
</style>