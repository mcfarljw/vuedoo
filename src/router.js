import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '~/src/pages/Home.vue'
import { isCordova } from '~/src/utils'

Vue.use(VueRouter)

export default new VueRouter({

  mode: isCordova() ? 'hash' : 'history',

  routes: [
    { path: '/', redirect: {name: 'home'} },
    { path: '/home', name: 'home', component: Home }
  ]

})
