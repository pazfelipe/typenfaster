import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import './assets/css/app.scss'

import TIcon from './components/TIcon.vue'

import './boot'

import './core/database/connection'

Vue.component('TIcon', TIcon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
