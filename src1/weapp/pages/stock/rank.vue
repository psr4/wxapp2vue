<template>
    <div class="page">
        <div class='box'>    <div class="switch">        <div data-tab="0" :class="('tab '+(tab=='0'?'active':''))" @click.stop="changetab">持币榜</div>        <div data-tab="1" :class="('tab '+(tab=='1'?'active':''))" @click.stop="changetab">创币榜</div>    </div>  </div>    <div class='items' v-if="(tab == '0')">    <div class='item' v-for="(item,index) in ranks" :key="index">      <div class='sort' v-if="(index<3)"><img :src="('/image/img/hg'+(index+1)+'.png')"></img></div>         <div class='sort' v-if="(index>=3)">{{index+1}}</div>      <img :src="(item.user.headimgurl)"></img>      <div class='info'>        <div class='name'>{{item.user.nickname}}</div>        <div class='account'>账号：{{item.user.username}}</div>        <div class='num'>          <img src='/image/img/bi.png'></img>          <span class='rank_num'>{{item.num}}</span>        </div>      </div>    </div>     </div>      <div class='items' v-if="(tab == '1')">    <div class='item' v-for="(item,index) in birth_rank" :key="index">    <div class='sort' v-if="(index<3)"><img :src="('/image/img/hg'+(index+1)+'.png')"></img></div>         <div class='sort' v-if="(index>=3)">{{index+1}}</div>      <img :src="(item.user.headimgurl)"></img>      <div class='info'>        <div class='name'>{{item.user.nickname}}</div>        <div class='account'>账号：{{item.user.username}}</div>        <div class='num'>            <img src='/image/img/bi.png'></img>            <span class='rank_num'>{{item.num}}</span>          <!-- <image src='/image/img/time.png'></image><text>{{item.time}}</text> -->        </div>      </div>    </div>        </div> 
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
    tab:0,
    ranks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    util.getAjaxData('rank',{}).then(
      res=>{
        _this.setData({...res.data})
        console.log(_this.data)
      }
    )
  },
  changetab(e) {
    var tab = e.currentTarget.dataset.tab;
    this.setData({
      tab: tab
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
.page{
   background: #FAF2EA;
}
.box{
  background: #F2E0CE;
  padding: 10px 0;
  box-shadow: 0 0 3px #999;
}
.switch {
    width: 80%;
    margin: 0 auto;
    display: flex;
    background: #f0f0f0;
    border-radius: 20px;
    z-index: -1;
}

.switch .tab {
    text-align: center;
    font-size: 16px;
    line-height: rpx(72);
    color: #999;
    background: #f0f0f0;
    position: relative;
    flex: 1;
    border-radius: 20px;
}

.switch .tab.active {
    color: white;
    background: #FF9935;
}

.items{
  padding: 15px;
}

.item{
  display: flex;
  background: #FCFAF5;
  align-items: center;
  padding: 10px 0;
  border-radius: 8px;
  box-shadow: 1px 2px 2px #EDE5DB;
  margin-bottom: 10px;
}
.item .sort{
  flex: 0 0 18%;
  text-align: center;
  font-size: 16px;
  color: #333;
}
.item .sort img{
  width: rpx(90);
  height: rpx(54);
  margin: 0 10px;
}
.item img{
  width: rpx(140);
  height: rpx(140);
  margin-right: 15px;
  border-radius: 5px;
}
.item .info .name{
  font-size: 14px;
  padding-bottom: 5px;
}
.item .info .account{
  color: #666;
  padding-bottom: 8px;
  
}
.item .info .num{
  background: #EBD9B9;
  border-radius:rpx(20);
  position: relative;
  line-height: rpx(40);
  padding-left: rpx(50);
  padding-right:rpx(15);
  width: rpx(200);
  color: #fff;
  box-sizing: border-box;
}
.rank_num{
  display: inline-block;
  text-align: center;
  width: 100%;
  margin-left: rpx(-10);
}
.item .info .num img{
  position: absolute;
  top: rpx(-5);
  left:rpx(-5);
  width: rpx(52);
  height: rpx(52);
}
</style>