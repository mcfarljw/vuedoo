import Vue from 'vue'
import VuexRouterSync from 'vuex-router-sync'
import App from '~/src/App.vue'
import router from '~/src/router'
import store from '~/src/store'
import { isCordova } from '~/src/utils'

VuexRouterSync.sync(store, router)

function start () {
  const app = new Vue({
    template: '<app/>',
    components: { App },
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
