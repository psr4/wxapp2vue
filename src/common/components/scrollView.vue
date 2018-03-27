<template>
  <div class="scroll" ref="scroll">
    <slot></slot>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
export default {
  props: {
    click: {
      type: Boolean,
      default: false
    },
    probeType: {
      type: Number,
      defalut: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: Boolean,
      default: false
    },
    data: {}
  },
  data() {
    return {
      Scroll: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
    window.addEventListener('resize', this.resize, false)
    window.addEventListener('orientationchange', this.resize, false)
    document.addEventListener('refreshDom', this.resize, false)
  },
  activated() {
    if (!this.Scroll) {
      return
    }
    window.addEventListener('resize', this.resize, false)
    window.addEventListener('orientationchange', this.resize, false)
    document.addEventListener('refreshDom', this.resize, false)
    this.Scroll.enable()
    let pageIndex = this.Scroll.getCurrentPage().pageX
    this.Scroll.goToPage(pageIndex, 0, 0)
    this.currentPageIndex = pageIndex
    if (this.autoplay) {
      this._play()
    }
  },
  deactivated() {
    window.removeEventListener('resize', this.resize, false)
    window.removeEventListener('orientationchange', this.resize, false)
    document.removeEventListener('refreshDom', this.resize, false)
    this.Scroll.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize, false)
    window.removeEventListener('orientationchange', this.resize, false)
    document.removeEventListener('refreshDom', this.resize, false)
    this.Scroll.disable()
    clearTimeout(this.timer)
  },
  watch: {
    data() {
      this.refresh()
      this.Scroll.finishPullUp()
    }
  },
  methods: {
    finishPullDown() {
      this.Scroll && this.Scroll.finishPullDown()
    },
    finishPullUp(){
      this.Scroll && this.Scroll.finishPullUp()
    },
    resize() {
      if (!this.Scroll) {
        return
      }
      this.Scroll.refresh()
    },
    _initScroll() {
      this.el = this.$refs.scroll
      this.Scroll = new Bscroll(this.el, {
        click: this.click,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        pullDownRefresh: this.pullDownRefresh
          ? {
              threshold: 50,
              stop: 20
            }
          : false
      })
      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }
    },
    _initPullDownRefresh() {
      this.Scroll.on('pullingDown', () => {
        // this.beforePullDown = false
        // this.isPullingDown = true
        console.log('pullingDown')
        this.$emit('pullingDown')
      })
    },
    _initPullUpLoad() {
      this.Scroll.on('pullingUp', () => {
        console.log('pullUpLoad')
        this.$emit('pullingUp')
      })
    },
    refresh() {
      setTimeout(() => {
        this.Scroll.refresh()
      }, 20)
    }
  }
}
</script>
<style lang="stylus">
.scroll
  overflow: hidden
</style>

