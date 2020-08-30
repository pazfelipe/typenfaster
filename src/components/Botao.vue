<template>
  <button
    :class="classe"
    class="btn"
    ref="botao"
    @click="onClicked"
    @mouseover="getPosicao"
    @mouseleave="onLeave"
  >
    <span
      v-for="label in labels"
      :key="label"
    >{{label}}</span>
    <div
      ref="tooltip"
      class="tooltip"
      v-show="showTooltip"
    >
      <p>Tecla {{labels[0]}}</p>
      <p>Dedo {{dedo}} deve ser usado</p>
    </div>
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
    dedo: { type: String, default: null },
    teclaAtiva: { type: Number, default: null },
    left: { type: Boolean, default: true },
    start: { type: Boolean, default: false },
    tooltipAtiva: { type: Boolean, default: false }
  },
  data() {
    return {
      showTooltip: false
    }
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
    },
  },
  watch: {
    start: {
      handler(value) {
        if (value) {
          if (this.teclaAtiva === this.tecla) {
            this.showTooltip = true
            this.$refs.tooltip.style.color = 'black'
          } else {
            this.showTooltip = false
          }
        } else {
          this.showTooltip = false
        }
      }
    },
    tooltipAtiva: {
      handler(value) {
        if (value) {
          if (!this.start) return
          if (this.teclaAtiva === this.tecla) {
            this.showTooltip = true
            this.$refs.tooltip.style.color = 'black'
          } else {
            this.showTooltip = false
          }
        } else {
          this.showTooltip = false
        }
      }
    },
    teclaAtiva: {
      handler() {
        this.$refs.tooltip.style.color = 'black'
        if (this.tooltipAtiva) {
          if (this.teclaAtiva === this.tecla) {
            this.showTooltip = true
          } else {
            this.showTooltip = false
          }
        }
      }
    }
  },
  methods: {
    onClicked() {
      document.activeElement.blur()
    },
    getPosicao() {
      this.showTooltip = true
      const container = document.querySelector('.container-teclado')

      const offsetL = this.$refs.botao.offsetLeft
      const offsetT = this.$refs.botao.offsetTop

      if (offsetL < 180) {
        this.$refs.tooltip.style.transform = `translate(10%, 0%)`
      } else {
        this.$refs.tooltip.style.left = '50%'
      }

      if (offsetT > (container.offsetTop + container.offsetHeight - 80)) {
        this.$refs.tooltip.style.top = '-120%'
      } else {
        this.$refs.tooltip.style.top = '120%'
      }
    },
    onLeave() {
      if (this.tooltipAtiva) {
        if (this.teclaAtiva === this.tecla) {
          this.showTooltip = true
          return
        }
      }
      this.showTooltip = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>