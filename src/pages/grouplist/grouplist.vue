<template>
    <page>
        <div src="/template/common.wxml" import="1"/>  <!--template is="titlebar" data="{{...titlebar}}"></template-->    <div class="tabbtn">    <div data-id="1" :class="'btn1 '+(tabid==1?'active':'')" @click="changtab">我的伙伴</div>    <!-- <view class="btn2 {{tabid==2?'active':''}}" bindtap="changtab" data-id="2">我的团队</view> -->  </div>      <div class="userlist" :style="tabid==2?'display:none;':''">    <div class="list" :key="index" v-for="(item,index) in u1">      <div class="headimg">        <img :src="item.headimgurl"></img>      </div>      <div class="userinfo">        <div class="nickname">{{item.nickname}}</div>        <div class="regtime">{{item.reg_time}}</div>      </div>    </div>  </div>  <div class="userlist" :style="tabid==1?'display:none;':''">    <div class="list" :key="index" v-for="(item,index) in u2">      <div class="headimg">        <img :src="item.headimgurl"></img>      </div>      <div class="userinfo">        <div class="nickname">{{item.nickname}}</div>        <div class="regtime">{{item.reg_time}}</div>      </div>    </div>  </div>  <div />   <!-- <template is="contact" data='{{contaction}}'></template>  -->
    </page>
</template>
<script>
    import {Page,getApp,wx} from '@/common/js/Weapp'
    //index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
const pageData = Page({
  data: {
    titlebar: {
      title: "我的团队",
      back: 2
    },
    tabid:1,
    showtabbar: true
  },
 
  onLoad: function (options) {
    util.contactInit(this);
    var me = this;
    util.getAjaxData("grouplist", {}, function (res) {
      me.setData({
        u1: res.data.data.u1.list,
        u2: res.data.data.u2.list
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
@import '../../common/style/page.scss';
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
  color:#FF9935;
  border: solid 1px  #FF9935;
}
.tabbtn .active{
  background: #FF9935;
  color:white;
}

.tabbtn .btn1{
  border-radius:5px;
}
.tabbtn .btn2{
  border-radius: 0 5px 5px 0;
}
.userlist{
    overflow: visible;
}
.userlist .list{
  display: flex;
  width:80%;
  margin:0 auto;
  background: white;
  border-bottom:solid 1px #ddd;
  border-top:solid 1px #FF9935;
}
.userlist .list:first-child{
  border-radius:5px 5px 0 0 ;
}
.userlist .list:last-child{
  border-bottom:0px;
  border-radius:0 0 5px 5px;
}
.userlist .list .headimg{
  flex:0 0 60px;
}

.userlist .list .headimg img{
  width:40px;
  height: 40px;
  border-radius:40px;
  background: red;
  margin:10px;
}
.userlist .list .userinfo{
  flex:1;
  padding: 10px 0;
}
.userlist .list .userinfo .nickname{
  font-size: 14px;
}
.userlist .list .userinfo .regtime{
  font-size:12px;
  color:red;
}
</style>