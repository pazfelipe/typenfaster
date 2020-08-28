<template>
  <div class="container">
    <header class="header"></header>
    <main class="main">
      <div class="header"></div>
      <div class="container-teclado">
        <div style="background-color: blue">
          <div style="background-color: tomato; width: 100%; height: 100%">fadf</div>
          <div style="background-color: purple; width: 100%; height: 100%;">fadf</div>
          <div style="background-color: orange; width: 100%;">fadf</div>
          <div style="background-color: yellow; width: 100%;">fadf</div>
          <div style="background-color: navy; width: 100%;">fadf</div>
          <div style="background-color: brown; width: 100%;">fadf</div>
        </div>
        <div style="background-color: green"></div>
        <div style="background-color: orange"></div>
      </div>
      <div class="bottom"></div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      tecla: null,
      teclas: [],
      palavras: [
        {
          palavra: ['n', 'a', 'd', 'a'],
          teclas: [78, 65, 68, 65],
          digitado: [],
          errado: [],
          nivel: 1,
          tempo: 0,
          tempoEstimado: 0
        },
        {
          palavra: ['f', 'a', 'd', 'a', 's'],
          teclas: [70, 65, 68, 65, 83],
          digitado: [],
          errado: [],
          nivel: 1,
          tempo: 0,
          tempoEstimado: 0
        },
        {
          palavra: ['d', 'a', 'd', 'a'],
          teclas: [68, 65, 68, 65],
          digitado: [],
          errado: [],
          nivel: 1,
          tempo: 0,
          tempoEstimado: 0
        }
      ],
      incPalavra: 0,
      incLetra: 0,
      timer: null
    }
  },
  filters: {
    joining (value) {
      return value.join('')
    }
  },
  computed: {
    segundo () {
      if (this.timer === null) return ''
      if (this.timer === 0) return 'segundo'
      return 'segundos'
    }
  },
  mounted () {
    window.addEventListener('keydown', this.mapeandoTeclas)
  },
  methods: {
    mapeandoTeclas (event) {
      event.preventDefault()

      const tl = this.incLetra
      const pl = this.incPalavra

      if (!this.timer) {
        this.timer = setInterval(() => {
          this.palavras[pl].tempo++
        }, 1000)
      }

      if (event.keyCode === this.palavras[pl].teclas[tl]) {
        if (tl === this.palavras[pl].teclas.length - 1) {
          this.incLetra = 0
          if (pl === this.palavras.length - 1) {
            this.reseta()
            this.incPalavra = 0
          } else {
            this.reseta()
            this.incPalavra++
          }
        } else {
          this.incLetra++
          this.palavras[pl].digitado.push(event.key)
        }
      } else {
        this.palavras[pl].errado.push(event.key)
      }
      this.tecla = event.key
      // console.log(event.keyCode)
    },
    reseta () {
      this.palavras[this.incPalavra].digitado = []
      this.palavras[this.incPalavra].errado = []
      this.palavras[this.incPalavra].tempo = 0
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>
