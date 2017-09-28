import Vue from 'vue'
import VuexRouterSync from 'vuex-router-sync'
import App from '~/src/App.vue'
import router from '~/src/router.js'
import store from '~/src/store.js'

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

if (window.cordova !== undefined) {
  document.addEventListener('deviceready', start, false)
} else {
  document.addEventListener('DOMContentLoaded', start, false)
}
