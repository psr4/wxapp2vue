<template>
  <div class="modalWrapp">
    <div class="tusi">
      {{text}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      types: String,
      default: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.modalWrapp
  position: fixed
  top: 0
  left: 0
  width: 100%
  bottom: 0
  display: flex
  justify-content: center
  align-items: center
  z-index: 50
  .tusi
    width: 150px
    color: white
    line-height: 1.4
    text-align: center
    padding: 10px
    border-radius: 5px
    background: rgba(0, 0, 0, 0.8)
</style>

