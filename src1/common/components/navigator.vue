<template>
  <a href="javascript:;" class="navigator" @click="navigator">
    <slot></slot>
  </a>
</template>
<script>
  export default {
    props: {
      url: {
        type: String,
        default: ''
      },
      data: {}
    },
    methods: {
      navigator() {
        console.log('123')
        const obj = {
          detail: {
            ...this.data
          }
        }
        console.log('obj')
        this.$emit('click', obj)
        if (this.url != '') {
          this.$router.push(this.url)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  a {
    display: block;
  }
</style>
