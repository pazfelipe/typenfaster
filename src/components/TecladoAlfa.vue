<template>
  <section>
    <div
      style="width: 100%; height: 100%"
      class="row"
      v-for="(btns, indice) in botoes"
      :key="indice"
    >
      <Botao
        v-for="(botao, i) in btns"
        :key="i"
        :labels="botao.label"
        :class="botao.classe"
        :tecla="botao.tecla"
        :style="botao.style"
        :dedo="botao.dedo"
        :left="botao.left"
        :start="start"
        :tecla-digitada="tecla"
        :tooltip-ativa="tooltip"
        :tecla-ativa="teclaAtiva"
      />
    </div>
  </section>
</template>

<script>
import Botao from './Botao'
export default {
  name: 'ComponentTecladoAlfa',
  components: {
    Botao
  },
  props: {
    botoes: { type: Array, default: () => [] },
    btns: { type: Array, default: () => [] },
    start: { type: Boolean, default: false },
    tecla: { type: Number, default: null },
    tooltip: { type: Boolean, default: false },
    teclaAtiva: { type: Number, default: null },
  }
}
</script>

<style lang="scss" scoped>
</style>