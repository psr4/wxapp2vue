<template>
    <div class="page">
        <div class='warpper'>     <div class='bi_title'>        <div class='title_boom'>挖矿记录</div>      </div>      <scroll-view scroll-x=1>        <div class='list'>          <div class='li' v-for="(item,index) in detailList" :key="index">            <img class='head' :src="(item.user.headimgurl)"></img>            <div class='name'>{{item.user.nickname}}</div>            <div class='time'>{{item.time}}</div>          </div>        </div>      </scroll-view>       <div class='bi_title' v-if="(payList)">        <div class='title_boom'>交易记录</div>      </div>       <ul class="business">  		   		<li class="item" v-for="(item,index) in payList" :key="index">  		   			<img class='head' :src="(item.sell_user.headimgurl)"></img>  		   			<div>  		   				<span class="arrow"></span>  		   				<span class="bus_time">{{item.time}}</span>  		   			</div>  		   			<img class='head' :src="(item.buy_user.headimgurl)"></img>   		   		</li>              		   </ul>  </div> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 

var util = require('../../utils/util.js')

var app = getApp()
const pageData = Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let id = options.id 
     if(!id){
        wx.showModal({
          title: '提示',
          content: '该天羽币不存在',
        })
        wx.navigateBack({
          
        });
       return;
     }
     this.setData({id})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let id = this.data.id
    let _this = this 
    util.getAjaxData('Tydetail',{id}).then(res=>{
      _this.setData({...res.data})
      console.log(_this.data)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../common/style/page.scss';

.list{
  display: flex;

}
.list .li{
  flex: 0 0 25%;
  padding:10px 0;
  text-align: center;
}

.list .li img{
  width: 60px;
  height: 60px;
}
.list .li .name{
  color: #333;
  line-height: 28px;
}
.time{
  color: #999;
  font-size: 12px;
  line-height: 18px;
}

.business .item{
	display: -webkit-flex;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: #fff;
	padding: 10px 0;
	border-bottom: 1px solid #F0F0F0;
}
.business .item .bus_time{
	display: inline-block;
    width: 100%;
    text-align: center;
    color: #81BFFF;
}
.business .item img{
	width: 60px;
	height: 60px;
}
.arrow{
   width: 180px;
   height: 2px;
   background: #81BFFF;
   border-radius: 2px;
   position: relative;
   display:block;
   margin-bottom: -25px;
}
.arrow:after{
	border: 10px solid transparent;
    border-left: 15px solid #81BFFF;
    width: 0;
    height: 0;
    position: absolute;
    content: ' ';
    right: -15px;
    top: -9px;
}
.head{
  border-radius: 50%;
}
</style>