<template>
  <div
    class="bottom"
    :class="theme"
  >
    Letras digitadas erradas: {{letras}}
  </div>
</template>

<script>
export default {
  name: 'ComponentLetrasDigitadas',
  props: {
    letras: { type: Number, default: null }
  }
}
</script>

<style lang="scss" scoped>
</style>