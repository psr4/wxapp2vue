<template>
  <div class="tabbar">
    <ul v-if="tabBar.list && tabBar.list.length > 0" :style="'background:'+tabBar.backgroundColor">
      <li v-for="(item,index) in tabBar.list" :key="index">
      <router-link :to="'/'+item.pagePath" @event="navigator">
        <div class="icon">
          <img :src="item.iconPath" alt="">
        </div>
        <div class="icon1">
          <img :src="item.selectedIconPath" alt="">
        </div>
        <div class="title" :style="'color:'+tabBar.color">{{item.text}}</div>
        <div class="title1" :style="'color:'+tabBar.selectedColor">{{item.text}}</div>
      </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    tabBar: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {}
  },
  methods: {
    navigator(path) {
      console.lol(path)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabbar ul {
  padding: 0;
  display: flex;
  height: 1.1rem;
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
.icon1,
.title1 {
  display: none;
}
.router-link-active {
  .icon1,
  .title1 {
    display: block;
  }
  .icon,
  .title {
    display: none;
  }
}

.tabbar ul li {
  .icon,
  .icon1 {
    flex: 0 0 0.48rem;
    width: 0.48rem;
    height: 0.48rem;
  }
}

.tabbar ul li {
  .icon img,
  .icon1 img {
    width: 0.48rem;
    height: 0.48rem;
    margin: 0.04rem auto;
  }
}

.tabbar ul li {
  .title,
  .title1 {
    font-size: 0.24rem;
    line-height: 0.48rem;
    color: #b7b7b7;
  }
}
</style>
