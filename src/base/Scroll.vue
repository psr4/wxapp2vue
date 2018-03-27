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
    data: {
    }
  },
  data() {
    return {
      Scroll: {}
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.Scroll) {
        return
      }
      this.Scroll.refresh()
    })
    window.addEventListener(
      'orientationchange',
      () => {
        if (!this.Scroll) {
          return
        }
        this.Scroll.refresh()
      },
      false
    )
  },
  watch: {
    data() {
      this.Scroll.refresh()
      this.Scroll.finishPullUp()
    }
  },
  methods: {
    _initScroll() {
      this.Scroll = new Bscroll(this.$refs.scroll, {
        click: this.click,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    _initPullUpLoad() {
      this.Scroll.on('pullingUp', () => {
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

