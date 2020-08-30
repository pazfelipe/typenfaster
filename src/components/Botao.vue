<template>
  <button
    :class="classe"
    class="btn"
    ref="botao"
    @click="onClicked"
  >
    <span
      v-for="label in labels"
      :key="label"
    >{{label}}</span>
  </button>
</template>

<script>
export default {
  name: 'ComponentBotao',
  props: {
    labels: {
      type: Array, default: () => []
    },
    tecla: { type: Number, default: null },
    teclaDigitada: { type: Number, default: null },
    teclaAtiva: { type: Number, default: null },
    left: { type: Boolean, default: true },
    start: { type: Boolean, default: false }
  },
  computed: {
    classe() {
      if (!this.start) return ''
      if (this.tecla === null) return ''
      if (this.teclaDigitada === this.tecla) {
        return 'typed'
      }
      if (this.teclaAtiva === this.tecla) {
        return 'active'
      }
      return ''
    }
  },
  methods: {
    onClicked() {
      document.activeElement.blur()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>