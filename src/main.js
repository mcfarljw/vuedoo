import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VuexRouterSync from 'vuex-router-sync'
import App from '~/src/App.vue'
import router from '~/src/router'
import store from '~/src/store'
import { isCordova } from '~/src/utils'

Vue.use(Vuetify)

VuexRouterSync.sync(store, router)

function start () {
  const app = new Vue({
    render: h => h(App),
    router,
    store
  })

  app.$mount('#app')
}

if (isCordova()) {
  document.addEventListener('deviceready', start, false)
} else {
  document.addEventListener('DOMContentLoaded', start, false)
}
