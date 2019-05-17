<template>
    <div class="page">
        <div class='quotesBox'>    <div class='title'>行情</div>    <div class='list'>      <div class='li'>        <div class='tit'>深证成指</div>        <div class='day'>          <span v-if="(isToday)">今</span>          <span wx:else=1>今</span>{{stock[0]["nowpri"]}}</div>        <div class='per'>{{stock[0]["percent"]}}%</div>      </div>      <div class='li'>        <div class='tit'>币价格</div>        <div class='day'>          <span>昨</span>￥{{stock[1]["price"]}}</div>        <div class='day'>          <span>今</span>￥{{stock[0]["price"]}}</div>      </div>      <div class='li'>        <div class='tit'>日产币数量</div>        <div class='day'>          <span>昨</span>{{nums[1]}}</div>        <div class='day'>          <span>今</span>{{nums[0]}}</div>      </div>    </div>  </div>    <div class='items'>    <div class='item' data-tab='0' @click.stop="changeTap">      <i :class="('iconfont '+(tab=='0'?'icon-xiala1':'icon-next'))"></i>      <span>深证成指</span>      <i class='iconfont icon-more'></i>    </div>    <div :class="('tap '+(tab=='0'?'show':'hidden'))" :animation="(animation)" v-for="(item,index) in stock" :key="index">      <div class='name'>{{item.time}}</div>      <img src='/image/img/shangshen.png' mode='aspectFit' v-if="(item.percent>0)"></img>       <img src='/image/img/xiajiang.png' mode='aspectFi' v-if="(item.percent<0)"></img>            <img src='/image/img/ping.png' mode='aspectFi' v-if="(item.percent==0)"></img>      <div class='digital'>{{item.percent}}%</div>    </div>      <div class='item' data-tab='1' @click.stop="changeTap" >      <i :class="('iconfont '+(tab=='1'?'icon-xiala1':'icon-next'))"></i>      <span>天羽币价格</span>      <i class='iconfont icon-more'></i>    </div>    <div :class="('tap '+(tab=='1'?'show':'hidden'))" :animation="(animation)" v-for="(item,index) in stock" :key="index">      <div class='name'>{{item.time}}</div>      <img src='/image/img/shangshen.png' v-if="(item.status==1)"></img>              <img src='/image/img/ping.png' v-if="(item.status==0)"></img>          <img src='/image/img/xiajiang.png' v-if="(item.status==-1)"></img>      <div class='digital'>￥{{item.price}}</div>    </div>      <div class='item' data-tab='2' @click.stop="changeTap">      <i :class="('iconfont '+(tab=='2'?'icon-xiala1':'icon-next'))"></i>      <span>日产币数量</span>      <i class='iconfont icon-more'></i>    </div>    <div :class="('tap '+(tab=='2'?'show':'hidden'))" :animation="(animation)" v-for="(item,index) in nums" :key="index" >      <div class='name'>{{num_times[index]}} </div>        <img  src='/image/img/shangshen.png' v-if="(num_status[index]==1)"></img>      <img  src='/image/img/ping.png' v-if="(num_status[index]==0)"></img>      <img src='/image/img/xiajiang.png' v-if="(num_status[index]==-1)"></img>      <div class='digital'>{{item}}</div>      </div>    </div> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
let util = require('../../utils/util.js')
let app = getApp()

const pageData = Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: -1,
    isToday: false,
    stock: [ { price: 0 },{ price: 0 } ],
    nums:[],
    animation:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    util.getAjaxData("quotes", {}).then(data => {
      console.log(data)
      _this.setData({ ...data.data })
      console.log(_this.data)
    })
  },
  changeTap(e) {
    
    var tab = e.currentTarget.dataset.tab;
    if(tab == this.data.tab){
      tab = -1
    }
    this.setData({
      tab
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
.quotesBox .title{
    font-size: 15px;
    color: #333;
    background: #f0f0f0;
    line-height: 36px;
    padding: 0 15px;
}
.quotesBox .list{
  padding: 14px;
  display: flex;
  justify-content: space-between;
}
.quotesBox .list .li{
  background: #f0f0f0;
  padding: 10px 20px;
  text-align: center;
  border-radius: 3px;
}
.li .tit{
  font-size: 15px;
  padding-bottom: 10px;
}
.li .day{
  font-size: 13px;
  padding-bottom: 3px;
  color: #FF9935;
  text-align: left;
}
.li .per{
   color: #FF9935;
   padding-left: 0px;
}
.li .day span{
  display: inline-block;
  width: 18px;
  color: #666;
}

.item{
  background: #f0f0f0;
  line-height: 30px;
  padding:0 15px;
  font-size: 13px;
  margin-bottom: 1px;
}
.item span{
  padding-left: 5px;
}
.item .iconfont{
  color: #FF9935;
  font-size: 14px;
}
.item .icon-more{
  float: right;
  font-size: 16px;
}
.tap{
  padding: 10px 15px;
  justify-content: space-between;
}
.tap img{
  width: 15px;
   height: 15px; 
}
.digital{
  color: red;
}
.show{
  display: flex;
}
.hidden{
  display: none;
}

</style>