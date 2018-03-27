<template>
  <div class="loading"></div>
</template>
<script>
export default {}
</script>
<style lang="stylus" scoped>
.loading
  position: absolute
  top: 50%
  left: 50%
  width: 32px
  height: 32px
  margin: -16px 0 0 -16px
  background-image: url('./assets/loading.png')
  background-size: 32px 32px
  animation: animations linear 0.8s infinite
  z-index: 50
@keyframes animations
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
