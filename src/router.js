import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '~/src/pages/Dashboard.vue'
import { isCordova } from '~/src/utils'

Vue.use(VueRouter)

export default new VueRouter({

  mode: isCordova() ? 'hash' : 'history',

  routes: [
    { path: '/', redirect: {name: 'dashboard'} },
    { path: '/dashboard', name: 'dashboard', component: Dashboard }
  ]

})
