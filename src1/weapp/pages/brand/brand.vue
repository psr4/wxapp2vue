<template>
    <div class="page">
        <div src="/template/common.wxml" import="1" />    <div class="goodsitem">    <div class="title">      <i class="iconfont icon-pinpai"></i> 品牌故事    </div>    <div class="lists">      <div class="list">        <div class="pic">          <img src="http://kod.qztywl.com/temp/brand.png"></img>        </div>        <div class="info">          <div class="til">欧亮国际，源于美容国度—瑞士。</div>          <div class="decrition">这里有美丽的阿尔贝斯山，终年积雪，汇聚天地间的精髓，天然纯净;这里天空蔚蓝，湖水澄澈，森林葱郁，纯净自然环境与优雅生活方式融为一体，洋溢如童话般宁静悠远的欧洲风情。迷人的日内瓦湖、纯净的水、毫无污染的植物、清新的空气和先进的生化科技，使得“欧亮”品牌在全球美容界显得尊贵无比、身份不凡，并在全世界赢得了高品质的口碑。          </div>        </div>      </div>        <div class="list">        <div class="info">          <div class="til">品牌介绍</div>          <div class="decrition">欧亮国际(香港)生物有限公司总部位于香港，另设有广州分公司和泉州分公司，是集科研、开发、生产、销售、教育培训及直营连锁为一体的国际性多元化企业，欧亮国际是祛斑祛痘，控斑修复、养生保健为一体的传奇品牌。          </div>        </div>      </div>        <div class="list">        <div class="info">          <div class="til">品牌价值</div>          <div class="decrition">            <span>欧亮国际拥有20年的祛斑祛痘，控斑修复技术，因为专注，注定了欧亮的品质、大爱和不凡。</span>            <span>欧亮焕颜祛斑祛痘项目可以有效祛除面部各种斑点、痘痘、痘印、痘疤，解决皮肤暗黄粗糙皱纹等问题。</span>            <span>欧亮国际拥有20年的祛斑祛痘，控斑修复技术，因为专注，注定了欧亮的品质、大爱和不凡。欧亮注重祛斑祛痘修复的结合，做出来的效果，皮肤光滑细腻，干净无暇，透亮紧致，不敏感，不红，不干。祛斑祛痘后公司提供人性化的售后服务，让顾客轻松达到理想效果。</span>            <span>欧亮采取36种提取精华原液相互作用的理念，以促进皮肤细胞新陈代谢和加速皮肤血液循环为依托，目的是将皮肤底部的毒素和黑色素在细胞代谢的同时排出于皮肤表面角化脱落的一个过程，同时搭配欧亮的修复体系给皮肤补充充足的胶原蛋白和氨基酸成分，让代谢激活后的肌肤，吃够营养，体现通透亮白，无暇紧致的效果。</span>            <span>欧亮国际拥有20年的祛斑祛痘，控斑修复技术，因为专注，注定了欧亮的品质、大爱和不凡。</span> 欧亮焕颜祛斑祛痘发展至今20余年，以实战的经验技术，临床的顾客成功案例，赢得了顾客以及加盟商、代理商的认可与好评，欧亮已经帮助了上千家美容院实现盈利、转型，让众多的女性在美丽蜕变的同时实现财富共赢!          </div>        </div>      </div>        <div class="list">        <div class="info">          <div class="til">品牌理念</div>          <div class="decrition">            <span>承载着欧洲文化深厚历史积淀的传奇品牌“欧亮”续写了举世瞩目的美丽篇章。基于“自然智慧，科技精粹”的品牌理念，汲取自然智慧，融汇科技精粹，为消费者带来纯净的个人护理用品，以大自然的神奇能量唤醒肌肤内在魅力光彩。</span>            <span>“欧亮”相信科技对于实现自然所蕴藏的力量和美，更相信科技对于实现自然之美的重要价值。多年来，“欧亮”全球技术，凝聚生物、化学、皮肤学等各领域专业研发人员的集体智慧，实现了自然精华与现代科技的集合，成就了“欧亮”产品历久弥新的品质与优雅品味。</span>          </div>        </div>      </div>        <div class="list">        <div class="info">          <div class="til">欧亮人的使命</div>          <div class="decrition">            <span>　欧亮人的使命是为中国女性创造美丽，创造价值，创造快乐服务!</span>          </div>        </div>      </div>      </div>  </div>  <button class="kfbtn" @click.stop="contact">   <span>联  系  客  服  </span>  </button>    <div :class="('contact '+(contaction?'c-show':''))" @click.stop="contact">      <img src='/image/img/cantact.png' mode='aspectFit'></img>  </div>     <!-- <template is="contact"></template> -->  <tabbar is="tabbar"></tabbar> 
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
// pages/brand/brand.js
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
    util.contactInit(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
.page{
  background: #f8f7f7;
}
.goodsitem{
  margin-bottom: rpx(140);
}
.goodsitem .iconfont{
  font-size: rpx(32);
  color: #ef2f72;
}
.goodsitem .title {
  padding: rpx(20) rpx(40);
  box-shadow: 0px rpx(1) rpx(8) #bbb;
   background: white;
}


.lists{
  margin: rpx(20) 0; 
}
.list{
  width: 90%;
  margin: rpx(20) auto; 
  background: white; 
  box-shadow: 0px rpx(1) rpx(8) #f0f0f0;
}
.list img{
  width: 100%;
  height: rpx(300);
}
.list .info{
  padding: rpx(20);
}
.list .info .til{
  line-height: rpx(56);
}
.list .info .decrition{
  color: #999;
  font-size: rpx(22);
  line-height: rpx(44);
  display: flex;
  flex-direction: column;
}
</style>