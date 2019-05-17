<template>
    <div class="page">
        <div class="container">      <div class="qrcode">
            <canvas style="width: 6.86rem;height: 6.86rem;background:#f1f1f1;" canvas-id="mycanvas" width="686" height="686"/>

        </div>  </div>
    </div>
</template>
<script>
      import {wx,getApp,App,Page} from '@/common/js/Weapp' 
let QR = require("../../../utils/qrcode.js");
let util = require('../../../utils/util.js');
let app = getApp();
const pageData = Page({
  data: {},
  onLoad: function (options) {
    let user = app.globalData.user
    const size = this.setCanvasSize();
    if (!user || !user.id) {
      util.login().then((res) => {
        user = app.globalData.user
        this.createQrCode(user.id, "mycanvas", size.w, size.h);
      })
    } else {
      this.createQrCode(user.id, "mycanvas", size.w, size.h);
    }
  },

  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686; //不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
  },
  onShareAppMessage: util.onShareAppMessage
})
    export default pageData
</script>
<style lang="scss" scoped>
@import '../../../../common/style/page.scss';
.container .qrcode canvas{margin:10px auto}
</style>