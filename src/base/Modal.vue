<template>
  <transition is="div" class="modal-wrapper" name="move" @click="hide">
    <div class="modal-content">
      <div class="modal-slot">
        <div class="content">
        <slot></slot>
        </div>
      </div>
      <div class="modal-btn">
        <button class="modal-cancel" @click="cancel">
          {{cancalBtn}}
        </button>
        <button class="modal-confirm" @click="confirm">
          {{confirmBtn}}
          </button>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    active: {
      type: Boolean,
      defalut: false
    },
    showBtn: {
      type: Boolean,
      defalut: true
    },
    cancalBtn: {
      type: String,
      default: '取消'
    },
    confirmBtn: {
      type: String,
      default: '确认'
    }
  },
  methods: {
    hide() {
      this.active = !this.active
    },
    cancel() {},
    confirm() {}
  }
}
</script>
<style lang="stylus" scoped>
@import '../../stylus/variable'

.modal-wrapper
  position: fixed
  top: 0
  left: 0
  bottom: 0
  width: 100%
  background: rgba(0, 0, 0, 0.8)
  z-index: 100
  display: flex
  flex-flow: column
  justify-content: center
  &.move-enter-active, &.move-leave-active
    transition: 0.4s
    left: 100%
  &.move-enter, &.move-leave-to
    left: 0
  .modal-content
    width: 90%
    margin: 0 auto
    padding: 15px
    background: #6D4BA8
    border-radius: 5px
    box-sizing: border-box
    .modal-slot
      border-radius: 5px
      background: #281D45
      display: flex
      flex-flow: column
      justify-content: center
      min-height: 100px
      .content
        color: white
        text-align: center
    .modal-btn
      display: flex
      justify-content: space-between
      -webkit-justify-content: space-between
      width: 100%
      button
        flex: 0 0 45%
        line-height: 28px
        color: white
        margin-top: 15px
        border: none
        border-radius: 28px
      .modal-cancel
        btn-cancel()
      .modal-confirm
        btn-primary()
</style>
