<template>
  <div class="weappbar"
  :style="'background:' +window.navigationBarBackgroundColor+';color:'+window.navigationBarTextStyle">
    <div class="left" @click="back">
      <
    </div>
    <div class="title">
      {{window.navigationBarTitleText}}
      </div>
    <div class="right">
      <ul>
        <li>分</li>
        <li>隐</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    window: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {}
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.weappbar {
  position: relative;
  display: flex;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  text-align: center;
  .left {
    z-index: 1;
    position: absolute;
    left: 0px;
    width: 40px;
  }
  .title {
    left: 0px;
    width: 100%;
  }
  .right {
    position: absolute;
    right: 0px;
    align-self: flex-end;
    ul {
      margin: 6px;
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      height: 32px;
      border-radius: 32px;
      border: solid 1px rgba(255, 255, 255, 0.3);
      color: white;
      line-height: 30px;
      padding: 0;
      width: 80px;
      li {
        flex: 1;
        position: relative;
      }
      li:first-child:after {
        content: '';
        position: absolute;
        display: block;
        height: 16px;
        top: 8px;
        right: 0;
        border-right: solid 1px rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>

