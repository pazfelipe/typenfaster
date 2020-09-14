<template>
  <div
    class="container"
    :class="theme"
  >
    <header class="header">
      <div
        class="container-toggle"
        :class="theme"
        style="margin-right: 10px;"
      >
        <label for="toggle">Modo escuro</label>
        <input
          id="toggle"
          ref="toggleDark"
          type="checkbox"
          v-model="toggleDarkMode"
          @change="toggleTheme"
        />
      </div>
      <div
        class="container-toggle"
        :class="theme"
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
        :class="theme"
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
        :class="theme"
      >
        <TecladoAlfa
          :btns="btns"
          :botoes="botoes"
          :start="start"
          :tecla="tecla"
          :tooltip="tooltip"
          :tecla-ativa="teclaAtiva"
        />

        <TecladoNumerico />

      </div>
      <LetrasDigitadas :letras="palavras[incPalavra].errado.length" />
      <Footer />
    </main>
  </div>
</template>

<script>

import btns from '../helpers/botoes'
import TecladoAlfa from '@/components/TecladoAlfa'
import TecladoNumerico from '@/components/TecladoNumerico'
import LetrasDigitadas from '@/components/LetrasDigitadas'
import Footer from '@/components/Footer'
import words from '../temp/data'
import { update } from '../core/services/Configuracoes.Services'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    TecladoAlfa,
    TecladoNumerico,
    LetrasDigitadas,
    Footer
  },
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
    ...mapGetters(['getTheme']),
    theme() {
      return this.toggleDarkMode ? 'dark' : ''
    },
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
    tooltip: {
      handler() {
        this.$refs.tooltip.blur()
        this.updateConfiguracoes()
      }
    },
  },
  beforeMount() {
    this.palavras = [...words]
    this.getThemeFromDB()
      .then(() => {
        this.toggleDarkMode = this.getTheme
      })
  },
  mounted() {
    this.start = false
    window.addEventListener('keydown', this.mapeandoTeclas)
    window.addEventListener('keyup', this.limpaTecla)
  },
  methods: {
    ...mapActions(['setTheme', 'getThemeFromDB']),
    limpaTecla() {
      this.tecla = null
    },
    mapeandoTeclas(event) {
      console.log(event.keyCode, event.key)
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
    },
    async updateConfiguracoes() {
      await update({
        modoNoturno: this.toggleDarkMode,
        mostrarDicas: this.tooltip
      })
    },
    toggleTheme() {
      this.$refs.toggleDark.blur()
      this.setTheme(this.toggleDarkMode)
      this.updateConfiguracoes()
    }
  }
}
</script>
