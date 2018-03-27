<template>
  <div ref="slide" class="slide">
    <div class="slideitem" ref="slideitem">
      <slot></slot>
    </div>
    <div class="dot-wrapper" v-if="showDots">
      <ul v-if="slideCount > 0">
        <li v-for="(i, index) in slideCount" :key="index" :class="{active:currentIndex===index}"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
export default {
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    click: {
      type: Boolean,
      default: true
    },
    showDots: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: String,
      default: 'false'
    },
    interval: {
      type: String,
      default: '2000'
    },
    vertical: {
      type: String,
      default: 'false'
    }
  },
  data() {
    return {
      currentIndex: 0,
      slideCount: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initSlide()
    })
    window.addEventListener('resize', this.resize, false)
    window.addEventListener('orientationchange', this.resize, false)
    document.addEventListener('refreshDom', this.refreshDom, false)
  },
  activated() {
    if (!this.slide) {
      return
    }
    window.addEventListener('resize', this.resize, false)
    window.addEventListener('orientationchange', this.resize, false)
    document.addEventListener('refreshDom', this.refreshDom, false)
    this.slide.enable()
    let pageIndex = this.slide.getCurrentPage().pageX
    this.slide.goToPage(pageIndex, 0, 0)
    this.currentPageIndex = pageIndex
    if (this.autoplay) {
      this._play()
    }
  },
  deactivated() {
    window.removeEventListener('resize', this.resize, false)
    window.removeEventListener('orientationchange', this.resize, false)
    document.removeEventListener('refreshDom', this.refreshDom, false)
    this.slide.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize, false)
    window.removeEventListener('orientationchange', this.resize, false)
    document.removeEventListener('refreshDom', this.refreshDom, false)
    this.slide.disable()
    clearTimeout(this.timer)
  },
  methods: {
    resize() {
      if (!this.Scroll) {
        return
      }
      this.Scroll.refresh()
    },
    refreshDom() {
      if (this.el) {
        setTimeout(() => {
          if (this.slideCount != this.el.children.length) {
            this._initSlide()
          }
        }, 20)
      }
    },
    refresh() {
      this.scroll && this.slide.refresh()
    },
    _initSlide() {
      const scrollX = this.vertical == 'false'
      this.slide = new Bscroll(this.$refs.slide, {
        scrollX: scrollX,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 300
        },
        click: this.click,
        probeType: 2
      })
      if (scrollX) {
        this.el = this.$refs.slideitem
        this.slideCount = this.el.children.length
        let width = this.slideCount * 100
        this.el.style.width = width + '%'
      }
      this.slide.on('scrollEnd', this._onScrollEnd)
      if (this.autoplay !== 'false') {
        this._play()
      }
      this.slide.on('scroll', pos => {
        if (pos.x === pos.y && pos.y === 0 && this.slideCount > 1) {
          this.slide.refresh()
        }
      })
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.vertical == 'false') {
          const thisPage = this.slide.getCurrentPage().pageX
          const finalPage = this.slide.pages.length - 1
          if (thisPage == finalPage) {
            this.slide.goToPage(0, 0)
          } else {
            this.slide.next()
          }
        } else {
          const thisPage = this.slide.getCurrentPage().pageY
          const finalPage = this.slide.pages[0].length - 2
          if (thisPage == finalPage) {
            this.slide.goToPage(0, 0)
          } else {
            this.slide.next()
          }
        }
      }, this.interval)
    },
    _initDots() {},
    _onScrollEnd() {
      let currentIndex = this.slide.getCurrentPage().pageX
      this.currentIndex = currentIndex
      this.$emit('change', {
        detail: {
          current: currentIndex
        }
      })
      if (this.autoplay !== 'false') {
        this._play()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.slideitem
  width: 100%
  height: 100%;
  overflow hidden;
  &:after
    content: ''
    clear: both
    display: block
  .swiper-item
    display: block
    float: left
    width: 100vw
    &:after
      content: ''
      clear: both
      display: block
.dot-wrapper
  width: 100%
  ul
    text-align: center
    li
      display: inline-block
      width: 10px
      height: 10px
      border-radius: 10px
      background: rgba(255, 255, 255, 0.5)
      transition: 0.2s
      margin-right: 6px
      &.active
        width: 20px
        background: rgba(255, 255, 255, 0.9)
</style>
