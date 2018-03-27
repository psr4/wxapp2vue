<template>
  <div class="check">
    <img src="./checkbox/gou.png" v-if="checked">
  </div>
</template>
<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.check
  position: relative
  display: inline-block
  width: 20px
  height: 20px
  background-image: url('./checkbox/bg3.png')
  img
    position: absolute
    left: 0
    bottom: 0
    width: 130%
    height: 130%
</style>
