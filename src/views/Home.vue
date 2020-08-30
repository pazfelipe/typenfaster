<template>
  <div
    class="container"
    :class="toggleDarkMode ? 'dark' : ''"
  >
    <header class="header">
      <div
        class="container-toggle"
        :class="toggleDarkMode ? 'dark' : ''"
        style="margin-right: 10px;"
      >
        <label for="toggle">Modo escuro</label>
        <input
          id="toggle"
          ref="toggleDark"
          type="checkbox"
          v-model="toggleDarkMode"
        />
      </div>
      <div
        class="container-toggle"
        :class="toggleDarkMode ? 'dark' : ''"
      >
        <label for="tooltip">Mostrar dica</label>
        <input
          id="tooltip"
          ref="tooltip"
          type="checkbox"
          v-model="tooltip"
        />
      </div>
      <div style="margin-left: auto; min-width: 155px; display: flex; justify-content: space-between;">
        <button
          class="t-btn"
          @click="start = true"
          v-if="!start"
        >
          <span>Iniciar</span>
          <t-icon
            name="las la-flag-checkered"
            color="black"
            size="24px"
          ></t-icon>
        </button>
        <button
          class="t-btn"
          @click="reiniciar"
          v-else
        >
          <span>Reiniciar</span>
          <t-icon
            name="las la-redo-alt"
            color="black"
            size="24px"
          ></t-icon>
        </button>
        <button
          style="background-color: tomato;"
          class="t-btn"
          @click="fechaAplicacao"
        >
          <t-icon
            name="las la-power-off"
            color="#fff"
            size="24px"
          ></t-icon>
        </button>
      </div>
    </header>
    <main class="main">
      <div
        class="header"
        :class="toggleDarkMode ? 'dark' : ''"
      >

        <div v-if="start">
          <div>
            <p>Palavra:
              <span class="letras">
                <span
                  v-for="(letra, indice) in palavras[incPalavra].palavra"
                  :key="indice"
                  :class="indice === incLetra ? 'letra ativa' : 'letra'"
                >{{letra}}</span>
              </span>
            </p>
          </div>
          <div>
            <p>Tempo percorrido: {{palavras[incPalavra].tempo}}{{segundo}} </p>
          </div>
        </div>

      </div>
      <div
        class="container-teclado"
        :class="toggleDarkMode ? 'dark' : ''"
      >
        <section>
          <div
            style="width: 100%; height: 100%"
            class="row"
            v-for="(btns, indice) in botoes"
            :key="indice"
          >
            <botao-teclado
              v-for="(botao, i) in btns"
              :key="i"
              :labels="botao.label"
              :tecla="botao.tecla"
              :class="botao.classe"
              :style="botao.style"
              :tecla-digitada="tecla"
              :tecla-ativa="teclaAtiva"
              :left="botao.left"
              :dedo="botao.dedo"
              :start="start"
              :tooltip-ativa="tooltip"
            />
          </div>
        </section>
        <!-- <section style="background-color: red">
          <div
            style="background-color: brown; width: 100%; height: 100%; justify-content: center"
            class="row"
          >
            <button class="btn"><span>Ctrl</span></button>
            <button class="btn"><span>Win</span></button>
            <button class="btn"><span>Alt</span></button>
          </div>
          <div
            style="background-color: brown; width: 100%; height: 100%; justify-content: center"
            class="row"
          >
            <button class="btn"><span>Ctrl</span></button>
            <button class="btn"><span>Win</span></button>
            <button class="btn"><span>Alt</span></button>
          </div>
          <div
            style="background-color: brown; width: 100%; height: 100%; justify-content: center"
            class="row"
          >
            <button class="btn"><span>Ctrl</span></button>
            <button class="btn"><span>Win</span></button>
            <button class="btn"><span>Alt</span></button>
          </div>
          <div
            style="background-color: brown; width: 100%; height: 100%; justify-content: center"
            class="row"
          >
            <button class="btn"><span>Alt</span></button>
          </div>
          <div
            style="background-color: brown; width: 100%; height: 100%; justify-content: center"
            class="row"
          >
            <button class="btn"><span>Ctrl</span></button>
            <button class="btn"><span>Win</span></button>
            <button class="btn"><span>Alt</span></button>
          </div>
        </section> -->
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
      </div>
      <div
        class="bottom"
        :class="toggleDarkMode ? 'dark' : ''"
      >
        Letras digitadas erradas: {{palavras[incPalavra].errado.length}}
      </div>
    </main>
  </div>
</template>

<script>

import BotaoTeclado from '@/components/Botao'
import btns from '../helpers/botoes'
import words from '../temp/data'

export default {
  name: 'HomePage',
  components: { BotaoTeclado },
  data() {
    return {
      tecla: null,
      teclas: [],
      botoes: [...btns],
      toggleDarkMode: false,
      palavras: [],
      incPalavra: 0,
      incLetra: 0,
      start: false,
      timer: null,
      tooltip: false
    }
  },
  filters: {
    joining(value) {
      return value.join('')
    }
  },
  computed: {
    segundo() {
      return 's'
    },
    labels() {
      return [
        ['"', '\'']
      ]
    },
    teclaAtiva() {
      return this.palavras[this.incPalavra]?.teclas[this.incLetra]
    },
  },
  watch: {
    toggleDarkMode: {
      handler() {
        this.$refs.toggleDark.blur()
      }
    },
    tooltip: {
      handler() {
        this.$refs.tooltip.blur()
      }
    },
  },
  beforeMount() {
    this.palavras = [...words]
  },
  mounted() {
    this.start = false
    window.addEventListener('keydown', this.mapeandoTeclas)
    window.addEventListener('keyup', this.limpaTecla)
  },
  methods: {
    limpaTecla() {
      this.tecla = null
    },
    mapeandoTeclas(event) {
      if (!this.start) return
      // event.preventDefault()
      this.tecla = event.keyCode
      this.start = true

      const tl = this.incLetra
      const pl = this.incPalavra

      if (!this.timer) {
        if (this.incPalavra === null) return
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

      // console.log(event.keyCode, event.key)
    },
    reseta() {
      this.palavras[this.incPalavra].digitado = []
      this.palavras[this.incPalavra].errado = []
      this.palavras[this.incPalavra].tempo = 0
      clearInterval(this.timer)
      this.timer = null
    },
    reiniciar() {
      this.incLetra = 0
      clearInterval(this.timer)
      this.timer = null
      this.palavras[this.incPalavra].tempo = 0
      document.activeElement.blur()
    },
    fechaAplicacao() {
      const remote = require('electron').remote
      let w = remote.getCurrentWindow()
      w.close()
    }
  }
}
</script>
