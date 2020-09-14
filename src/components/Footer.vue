<template>
  <footer class="footer">
    <button @click="showModal">
      <t-icon
        name="las la-cogs"
        size="30px"
      ></t-icon>
    </button>
  </footer>
</template>

<script>
export default {
  name: 'ComponentFooter',
  methods: {
    showModal() {
      alert('Vai ser mostrada a modal aqui')
    },
  }
}
</script>

<style lang="scss" scoped>
</style>