<template>
    <div class="page">
        <div src="/template/common.wxml" import="1" />  <div class="classname" v-if="(loginWrapper)">      <div class="login-wrapper" :style="('background: url('+(host)+'/data/upload/background.png) no-repeat;background-size:100% 100%;')">          <div class="loginBtn">              <button open-type="getUserInfo" @getuserinfo="login">                  登陆              </button>          </div>      </div>  </div>    <div class="classname" wx:else=1>        <!-- <url url="/pages/user/info"> -->          <div class="user-wrapper">              <div class="bg">                  <img mode="widthFix" :src="(user.headimgurl)"></img>                  <div class="orange"></div>              </div>              <div class="headimgurl">                  <img :src="(user.headimgurl)"></img>              </div>              <div class="info">                 <div class="nickname">                  {{user.nickname}}                  <div>                   　                  </div>                 </div>              </div>              <div class='member'>                  <img src='/image/img/gerenzhongxin_tubiao_putonghuiyuan.png'></img>                  <span>{{level}}</span>              </div>              <i class="iconfont icon-qr-code" @click.stop="scan"></i>                        </div>      <!-- </url> -->        <div class='wrapper'>          <!-- 余额模块 -->        <div class='infotap'>            <div class="item">账号:{{username}}</div>            <div class="item">                 <url url='/pages/customer/profit/profit'>                   <div class='money'>{{user.store_profit}}</div>                  <div class='name'>余额</div>                </url>                </div>                       <div class="item">              <url url="/pages/customer/pay/pay">                <img src='/image/img/userma.png'></img>                <div class='name'>会员码</div>              </url>            </div>                   </div>          <!-- 我的账户 -->         <div class='tit'>         <img src='/image/img/hy.png' class=''></img>         会员账户          </div>           <div class="btns-wrapper" >            <div class="btn" >                <url url="/pages/customer/account/account">                    <img src='/image/img/offline.png'></img>                    <div class="title">数据汇总</div>                </url>            </div>            <div class="btn">                <url url="/pages/customer/order/order">                     <img src='/image/img/consume.png'></img>                    <div class="title">我的消费</div>                </url>            </div>            <div class="btn">                <url url="/pages/customer/cash/cash">                    <img src='/image/img/jsrecord.png'></img>                    <div class="title">提现记录</div>                </url>            </div>            <div class="btn">                <url url="/pages/customer/profit/profit">                    <img src='/image/img/income.png'></img>                    <div class="title">我的收益</div>                </url>            </div>        </div>      </div>      <div class='bor20'></div>          <div class='tit' v-if="(user.is_show==1)">          <url url="/pages/account/account">                <img src='/image/img/money.png' class='image2'></img>              商家钱包：<span class='blue'>{{user.user_account}}</span>               <i class="iconfont icon-return1" style="float:right;">              </i>          </url>      </div>      <div class="btns-wrapper" v-if="(user.is_show==1)">          <div class="btn" >              <url url="/pages/accountdetail/accountdetail?status=1">                  <i class="iconfont icon-tabdaikuan"></i>                  <div class="title">贷款</div>              </url>          </div>          <div class="btn">              <url url="/pages/accountdetail/accountdetail?status=2">                  <i class="iconfont icon-daifukuan"></i>                  <div class="title">套现</div>              </url>          </div>          <div class="btn">              <url url="/pages/accountdetail/accountdetail?status=3">                  <i class="iconfont icon-jiangjin"></i>                  <div class="title">奖金</div>              </url>          </div>          <div class="btn">              <url url="/pages/accountdetail/accountdetail?status=4">                  <i class="iconfont icon-tixian"></i>                  <div class="title">提现</div>              </url>          </div>               </div>       <div class="btns-wrapper" v-if="(user.is_show==1)">      <div class="btn">                          <url url="/pages/store/scan/scan">                              <i class="iconfont icon-fukuan"></i>                              <div class="name">收款</div>                          </url>                      </div>                      <div class="btn">                          <url url="/pages/store/cash/cash">                              <i class="iconfont icon-tixian1"></i>                              <div class="name">提现</div>                          </url>                      </div>                      <div class="btn">                          <url url="/pages/store/profit/profit">                              <i class="iconfont icon-yingyeting"></i>                              <div class="name">营业</div>                          </url>                      </div>                      <div class="btn">                          <url url="/pages/store/setting/setting">                              <i class="iconfont icon-dianpu"></i>                              <div class="name">店铺</div>                          </url>                      </div>          </div>      <div class='bor20'></div>        <div class="btn-ul">          <div class="btn-li">              <url class="navigator" url="/pages/info/info" block="1">                  <img src='/image/img/user.png'></img>                  <div class="title">会员中心</div>              </url>          </div>            <div class="btn-li">              <url class="navigator" url="/pages/group/group" block="1">                  <img src='/image/img/team.png'></img>                  <div class="title"> 我的团队</div>              </url>          </div>            <div class="btn-li">              <url class="navigator" url="/pages/qrcode/qrcode" block="1">                  <img src='/image/img/erweima.png'></img>                  <div class="title">专属二维码</div>              </url>          </div>            <div class="btn-li" v-if="(ty_show)">              <url class="navigator" url="/pages/stock/stock">                  <img src='/image/img/bi.png'></img>                  <div class="title">天羽币 </div>              </url>          </div>          <div class="btn-li" v-if="(user.article)">              <url class="navigator" :url="('/pages/article/article?id='+(item.id))" :key="index" v-for="(item,index) in user.article">                  <img src='/image/img/xiaoxi.png'></img>                  <div class="title">{{item.title}}</div>              </url>          </div>          <div class="btn-li">              <url class="navigator" @click.stop="call">                  <img src='/image/img/phone.png'></img>                  <div class="title">维权热线</div>              </url>          </div>      </div>      <div class='bor20'></div>        <!-- <view class="form" animation="{{animation}}" catchtap='getout'>          <view class="content" catchtap='pleasehitme'>              <view class="title"> 联系客服</view>              <button class="yijian" catchtap="call">一键拨打</button>              <button class="online" session-from="user" open-type="contact">在线客服</button>              <button class="cancel" catchtap="getout">取消</button>          </view>      </view> -->  </div>    <div left="(_left)" top="(_top)"/> 
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
    title: "个人中心",
    user: {},
    loginWrapper: null,
    avatarUrl: null,
    level: null,
    username: null,
    ty_show: null,
  },

  onShow: function () {
    const _left = wx.getStorageSync('_left')
    const _top = wx.getStorageSync('_top')
    if (_left) {
      this.setData({ _left, _top })
    }

    util.contactInit(this);
    var me = this;
    util.getAjaxData("my", {}, function (res) {
      app.globalData.user = res.data.data;
      app.globalData.telephone = res.data.data.telephone;
      app.globalData.myInit = true
      me.setData({
        ads: res.data.data.ad.content,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        username: res.data.data.username,
        level: res.data.data.level,
        user: res.data.data,
        ty_show: res.data.data.ty_show
      })
    }, "POST");
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: app.globalData.telephone,
    })
  },
  onPullDownRefresh: function () {
    this.onShow();
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: util.onShareAppMessage
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../common/style/page.scss';
/* .info {
    position: relative;
}

.info .bg {
    left: 0;
    width: 100%;
    position: absolute;
}

.info, .info .bg img {
    height: rpx(300);
    width: 100%;
}

.info .user {
    text-align: center;
    z-index: 9;
    position: relative;
    top: 10%;
}

.info .user img {
    width: rpx(180);
    height: rpx(180);
    border-radius: rpx(98);
    border: rpx(8) solid rgba(255, 255, 255, 0.3);
}

.info .user .usename {
    color: #fff;
}

.box {
    display: flex;
    height: rpx(80);
    line-height: rpx(80);
    justify-content: center;
    padding: rpx(20) 0;
    box-shadow:  0 rpx(5) rpx(10) #efefef;
    margin-bottom: rpx(5);
}

.box .list {
    flex: 0 0 50%;
}

.box .line {
    border-right: rpx(1) solid #f0f0f0;
}

.box .list .zhi {
    color: #bbb;
    font-size: rpx(28);
}



.btngroup ul {
    display: flex;
    justify-content: space-around;
    text-align: center;
    background: #fff;
    padding: rpx(20) 0;
}

.btngroup ul .iconfont {
    font-size: rpx(40);
}

.btngroup ul li .name {
    margin-top: rpx(8);
}

.box1 {
    background: #FCFAF7;
    margin: rpx(20) 0 0 ;
}

/* .box1 .btnlist {
    border-top: rpx(10) solid #FCFAF7;
    border-bottom: rpx(20) solid #FCFAF7;
} */

/* .box1 .btnlist .list {
    line-height: rpx(80);
    border-bottom: rpx(1) solid #f0f0f0;
    padding: 0 rpx(30);
    display: flex;
    justify-content: space-between;
    background: #fff;
}

.box .btnlist .list:last-child {
    border-bottom: 0px;
}

.box1 .icon-return1 {
    font-size: rpx(26);
    color: #bbb;
} */ 
.user-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow:hidden;
}
.user-wrapper .bg{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    z-index: -1;
}
.user-wrapper .orange{
    position:absolute;
    left: 0px;
    top: 0px; 
    width: rpx(750);
    height: rpx(750);
    background: #FF9935;
    opacity: .5;
}
.user-wrapper .bg img{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    filter: blur(15px);
    animation: move 5s linear infinite alternate;
}

@keyframes move{
    from{
        top : rpx(0);
    }
    to {
        top: rpx(-180);
    }
}

.user-wrapper .headimgurl {
    text-align: center;
}

.user-wrapper .headimgurl img {
    width: 65px;
    height: 65px;
    border-radius: 60px;
    margin: rpx(61) 0 rpx(19) 0;
    border: rpx(5) solid rgba(255, 255, 255, 0.5);
}

.user-wrapper .info {
    flex: 1;
    /* margin: 20px 10px; */
    color: #fff;
    text-align: center;
    line-height:24px;
    padding:rpx(13) 0 rpx(69) 0;

}

.user-wrapper .info .nickname {
    line-height: 20px;
    font-size: rpx(34);
    
}

.user-wrapper .info .userid {
    font-size: 12px;
    line-height: 20px;
}
.user-wrapper .info .address{
  font-size: 12px;
  line-height: 24px;
  padding:rpx(13) 0 rpx(69) 0;
  color: #eeeeee;
}
.user-wrapper .info .address img{
  width: rpx(18);
  height: rpx(24);
  padding-right: rpx(5);
}
.infotap{
  display: flex;
  position: absolute;
  top: rpx(-150);
  left: 4%;
  width: 92%;
  font-size: rpx(34);

  background: #fff;
  height: 62px;
  align-items: center;
  border-radius: 31px;
  z-index: 100;
}
.infotap .item{
  flex: 1;
  text-align: center;
 
}
.infotap .item .money{
  color: #1891F9;
}
.infotap .item img{
  width:rpx(55);
  height:rpx(33);
  margin-bottom:rpx(-6);
  padding: rpx(2) 0;

}
.infotap .item .name{
  color: #626262;
  font-size: 12px;

}
.infotap .item:first-child{
  background: #FF9935;
  color: #fff;
  border-radius: 31px;
  font-family: 'MicrosoftYaHei';
   line-height: 62px;
  font-size: 12px;
}

.user-wrapper .iconfont {
    position: absolute;
    left: rpx(29);
    top: rpx(41);
    color: #fff;
}
.wrapper{
  position: relative;
  margin-top: rpx(80);
}
 
.tit{
  margin: 0 15px;
  border-bottom: rpx(1) solid #efefef;
  font-size: rpx(26);
  color: #616161;
  line-height:rpx(86);
  position: relative;
}
.tit .icon-goto{
  font-size: 12px;
  color: #999;
  padding-top: rpx(8);
 
}

.tit img{
  height: rpx(36);
  width: rpx(36);
  vertical-align:middle;
  padding-bottom: rpx(5);
}
.tit .image2{
  height: rpx(33);
  width: rpx(33);
}
.btns-wrapper {
    display: flex;
    margin: rpx(35) 0;
    
}

.btns-wrapper .btn {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #616161;
    line-height: 20px;
    position: relative;
}

.btn .iconfont {
    font-size: rpx(40);
}

.msg {
    position: absolute;
    right: 22px;
    top: 12px;
    z-index: 1000;
    width: 15px;
    height: 15px;
    line-height: 15px;
    border-radius: 15px;
    background: #d60f1c;
    color: #fff;
    font-size: 10px;
}

.btns-wrapper .btn .border {
    content: "";
    display: block;
    width: 0px;
    height: 50px;
    position: absolute;
    right: 0px;
    top: 0px;
    border-left: solid 1px #f0f0f0;
}

.btns-wrapper .btn img {
    width: 24px;
    height: 24px;
}

.btn-ul {
    display: flex;
    margin: 4px 0;
    flex-wrap: wrap;
    padding: 0 0.5%;
    text-align: center;

}

.btn-ul .btn-li {
    flex:0 0 33%; 
    /* padding: rpx(50) 0; */
     display: flex; 
     flex-direction: column;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    border-right: rpx(1) solid #efefef;
    border-bottom: rpx(1) solid #efefef;
}
.btn-ul .btn-li:nth-child(3n){
  border-right: none;
}
.btn-ul .btn-li:nth-child(4),.btn-ul .btn-li:nth-child(5),.btn-ul .btn-li:nth-child(6){
  border-bottom: none;
}


.btn-ul .btn-li img{
  width: rpx(45);
  height: rpx(45);
}
.btn-ul .btn-li .tip {
    position: absolute;
    left: 35px;
    top: 5px;
    background: #ed242e;
    line-height: 1.8;
    padding: 0 6px;
    border-radius: 30px;
    font-size: 10px;
    color: white;
}


.btn-ul .btn-li .title {
    color: #616161;
    
    font-size: 12px;
}
.btn-ul .btn-li .title .tip span{
	color:#ED242E;
}
/* .btn-ul .btn-li .title:before {
    content: "\e6be";
    position: absolute;
    display: block;
    right: 10px;
    top: 0px;
    height: 38px;
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    color: #ccc;
} */

.btn-ul .btn-li:last-child .title {
    border-bottom: solid 0px;
}

.user-wrapper .icon-qr-code:before {
    color: #fff;
}
.member{
  position: absolute;
  top: rpx(141);
  right: 0;
  height: rpx(55);
  font-size: rpx(26);
  line-height: rpx(55);
  color: #fff;
  border-top-left-radius: rpx(28);
  border-bottom-left-radius: rpx(28);
  background: rgba(0, 0, 0, 0.16);
  padding: 0 rpx(29) 0 rpx(35);
}
.member img{
  width: 16px;
  height: 13px;
  padding-right: rpx(6);
}
.login-wrapper {
    position: fixed;
    top: 0px;
    bottom: 0px;
    width: 100%;
    background: #543333;
}

.login-wrapper:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    z-index: -10;
}

.loginBtn{
  position: fixed;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.login-wrapper button {
    width: 55%;
    border-radius: rpx(375);
    border: rpx(1) solid #FF9935;
    color: #FF9935;
    background-color:rgba(0,0,0,0);
    font-size: 16px;
    line-height: rpx(74);

}

.login-wrapper .content .title span {
    color: #c30d23;
}

.login-wrapper .logo {
    width: 32px;
    height: 32px;
}

.contact {
    background: #c30d23;
    color: white;
    text-align: center;
    height: 42px;
    line-height: 42px;
    width: 90%;
    margin: 20px auto 30px;
    border-radius: rpx(10);
}

.form {
    position: fixed;
    left: 0;
    right: 0;
    top: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100000;
    overflow: hidden;
}

.form .content {
    position: absolute;
    background: white;
    bottom: 0px;
    left: 0px;
    right: 0px;
}

.form .title {
    font-size: 16px;
    font-weight: 600;
    line-height: 42px;
    text-align: center;
    color: #d60f1c;
}

.form button {
    width: 80%;
    line-height: 35px;
    font-size: 14px;
    margin: rpx(30) auto;
    color: #fff;
}

.yijian {
    background: #ff5050;
}

.online {
    background: #0dbb30;
}

.cancel {
    background: #ffc900;
}

.btn-li .navigator{
  height: 100%;
  padding:rpx(50) 0;
}
/* .tit{
  padding-top: rpx(25);
} */

.blue{
  color: #3FA3FA;
}
</style>