<template>
  <section>
    <div
      style="width: 100%; height: 100%; justify-content: space-between"
      class="row"
    >
      <button class="btn"><span>Num</span> <span>Lock</span> </button>
      <button class="btn"><span>/</span></button>
      <button class="btn"><span>*</span></button>
      <button class="btn"><span>-</span></button>
    </div>
    <div
      style="width: 100%; height: 100%; justify-content: space-between"
      class="row"
    >
      <button class="btn"><span>7</span></button>
      <button class="btn"><span>8</span></button>
      <button class="btn"><span>9</span></button>
      <button class="btn"><span>+</span></button>
    </div>
    <div
      style="width: 100%; height: 100%; justify-content: space-between"
      class="row"
    >
      <button class="btn"><span>4</span></button>
      <button class="btn"><span>5</span></button>
      <button class="btn"><span>6</span></button>
      <button class="btn"><span>.</span></button>
    </div>
    <div
      style="width: 100%; height: 100%; justify-content: space-between; align-items: flex-start"
      class="row"
    >
      <button class="btn"><span>1</span></button>
      <button class="btn"><span>2</span></button>
      <button class="btn"><span>3</span></button>
      <button class="btn num-enter"><span>Enter</span></button>
    </div>
    <div
      style="width: 127px; height: 100%; justify-content: space-between;margin-top: -29px;"
      class="row"
    >
      <button
        class="btn"
        style="width: 75px;"
      ><span>0</span></button>
      <button class="btn"><span>,</span></button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ComponentTecladoNumerico'
}
</script>

<style lang="scss" scoped>
</style>