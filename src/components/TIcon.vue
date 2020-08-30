<template>
  <i
    :class="name"
    :style="styling"
  ></i>
</template>

<script>
export default {
  name: 'TIcon',
  props: {
    name: { type: String, default: null },
    color: { type: String, default: '#FFF' },
    size: { type: String, default: '13px' }
  },
  computed: {
    styling() {
      return `font-size: ${this.size}; color: ${this.color}`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>