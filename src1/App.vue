<template>
  <div id="app">
    <div class="weapp-weappbar">
      <weappbar :canBack="!tabbar" :window="window"></weappbar>
    </div>
    <div class="weapp-content" :class="{showTabbar:tabbar}">
      <scroll-view class="weapp-scroll" :pullDownRefresh="pullDownRefresh" :pullUpLoad="pullUpLoad" :click="click"
                   ref="scroll"
                   @pullingDown="pullingDown" @pullingUp="pullingUp">
        <div>
          <keep-alive>
            <router-view ref="page"></router-view>
          </keep-alive>
        </div>
      </scroll-view>
    </div>
    <div v-if="tabbar" class="weapp-tabBar">
      <tabbar :tabBar="tabBar"></tabbar>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import tabbar from '@/common/components/tabbar.vue'
  import scrollView from '@/common/components/scrollView.vue'
  import weappbar from '@/common/components/weappbar.vue'

  const appJson = require('./weapp/app.json')
  window.tabBar = appJson.tabBar
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
      // appData.onLaunch && appData.onLaunch(this.$route)
    },
    computed: {
      ...mapGetters([ 'tabbar' ])
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
          width > maxWidth && ( width = maxWidth )
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
          function () {
            clearTimeout(tid) //防止执行两次
            tid = setTimeout(refreshRem, 300)
          },
          false
        )

        win.addEventListener(
          'pageshow',
          function (e) {
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
            function (e) {
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
<style lang="scss">
  @import './weapp/app.scss';
</style>