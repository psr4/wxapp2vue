<template>
  <div id="app">
    <div class="weapp-weappbar">
      <weappbar :window="window"></weappbar>
    </div>
    <div class="weapp-content">
      <scroll-view :pullDownRefresh="pullDownRefresh" :pullUpLoad="pullUpLoad" :click="click" ref="scroll" @pullingDown="pullingDown" @pullingUp="pullingUp">
        <div>
          <keep-alive>
            <router-view ref="page"></router-view>
          </keep-alive>
        </div>
      </scroll-view>
    </div>
    <div class="weapp-tabBar">
    <tabbar :tabBar="tabBar"></tabbar>
    </div>
  </div>
</template>

<script>
import tabbar from '@/common/components/tabbar.vue'
import scrollView from '@/common/components/scrollView.vue'
import weappbar from '@/common/components/weappbar.vue'
const appJson = require('./app.json')
export default {
  data() {
    return {
      ...appJson,
      pullDownRefresh: true,
      pullUpLoad: true,
      click: true
    }
  },
  mounted() {
    this.loading()
    this._mounted(750, 750)
    document.addEventListener('Redirect', this.Redirect, false)
  },
  methods: {
    loading() {},
    Redirect() {
      this.$nextTick(() => {
        this.$refs.scroll && this.$refs.scroll.refresh()
      })
    },
    pullingDown() {
      this.$refs.scroll.finishPullDown()
      this.$refs.page.onPullDownRefresh && this.$refs.page.onPullDownRefresh()
    },
    pullingUp() {
      this.$refs.scroll.finishPullUp()
      this.$refs.page.onPullUpLoad && this.$refs.page.onPullUpLoad()
    },
    _mounted(designWidth, maxWidth) {
      var doc = document,
        win = window,
        docEl = doc.documentElement,
        remStyle = document.createElement('style'),
        tid

      function refreshRem() {
        var width = docEl.getBoundingClientRect().width
        maxWidth = maxWidth || 540
        width > maxWidth && (width = maxWidth)
        var rem = width * 100 / designWidth
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}'
      }

      if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle)
      } else {
        var wrap = doc.createElement('div')
        wrap.appendChild(remStyle)
        doc.write(wrap.innerHTML)
        wrap = null
      }
      //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
      refreshRem()
      win.addEventListener(
        'resize',
        function() {
          clearTimeout(tid) //防止执行两次
          tid = setTimeout(refreshRem, 300)
        },
        false
      )

      win.addEventListener(
        'pageshow',
        function(e) {
          if (e.persisted) {
            // 浏览器后退的时候重新计算
            clearTimeout(tid)
            tid = setTimeout(refreshRem, 300)
          }
        },
        false
      )

      if (doc.readyState === 'complete') {
        doc.body.style.fontSize = '16px'
      } else {
        doc.addEventListener(
          'DOMContentLoaded',
          function(e) {
            doc.body.style.fontSize = '16px'
          },
          false
        )
      }
    }
  },
  components: {
    tabbar,
    weappbar,
    scrollView
  }
}
</script>

<style lang="less">
@import './iconfont/iconfont.wxss';
#app {
  display: flex;
  flex-flow: column;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  .weapp-weappbar {
    flex: 0 0 45px;
  }
  .weapp-tabbar {
    flex: 0 0 53px;
  }
  .weapp-content {
    position: relative;
    flex: 0 1 auto;
    height: calc(100vh - 98px);
    .scroll {
      position: absolute;
      left: 0px;
      top: 0px;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
  }
}

.page {
  font-family: Microsoft yahei;
  font-size: 0.24rem;
  overflow-x: hidden;
}

.tabbar {
  height: 45px;
}
.tabbar ul {
  padding: 0;
  display: flex;
  height: 1.1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 0.01rem solid #ababab;
  background: #fff;
  text-align: center;
  justify-content: space-between;
  z-index: 999;
}

.tabbar ul li {
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.tabbar ul li .icon {
  flex: 0 0 0.48rem;
}

.tabbar ul li .icon,
.tabbar ul li .icon img {
  width: 0.48rem;
  height: 0.48rem;
  margin: 0.04rem auto;
}

.tabbar ul li .title {
  font-size: 0.24rem;
  line-height: 0.48rem;
  color: #b7b7b7;
}

.titlebar {
  height: 0.5rem;
  line-height: 0.5rem;
  color: white;
  font-size: 18px;
  text-align: center;
  background: black;
  padding: 0 10%;
}

.titlebar .icon-return {
  position: absolute;
  left: 0px;
  padding: 0 10px;
  font-size: 20px;
}

.titlebar .icon-home,
.titlebar .icon-my {
  position: absolute;
  right: 0px;
  padding: 0 10px;
  font-size: 20px;
}

.kfbtn::after {
  display: none;
}

.kfbtn {
  padding: 15px 5px;
  margin: 0;
  position: fixed;
  right: 0px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  width: 30px;
  bottom: 100px;
  border-radius: 5px 0 0 5px;
  line-height: 1.2;
  font-size: 14px;
  text-align: center;
  height: 92px;
}
/* 通用样式 */
.bor20 {
  border-bottom: 20px solid #f7f7f2;
}
.bor-gray {
  border-bottom: 20px solid #f9f9f9;
}
.box .item.clearbor {
  border: none;
}
.c-show {
  display: block;
}
.c-hidden {
  display: none;
}
.c-orange {
  color: #ff9935;
}

/* 联系客服 */
.contact {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 100%;
  left: 0;
}
.contact.c-show {
  top: 0;
}
.contact image {
  width: 100%;
  margin: 36% auto;
  z-index: 100;
}

.title_boom {
  position: relative;
  display: inline-block;
  font-size: 0.32rem;
  color: #333;
}
.title_boom:after {
  position: absolute;
  content: '';
  top: 50%;
  left: 0;
  width: 110%;
  height: 50%;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: rgba(255, 153, 53, 0.4);
}
/* 标题 */
.tyBi .bi_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.15rem 0.1rem;
}
.bi_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem;
}
</style>
