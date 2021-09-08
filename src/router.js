import Vue from 'vue'
import Router from 'vue-router'
import Ess from './views/Ess.vue'
import Detail from './views/Detail'
import Log from './views/Log.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/ess',
      name: 'ess',
      component: Ess
    },
    {
      path:'/detail',
      name:'detail',
      component:Detail
    },
    {
      path:'/log',
      name:'log',
      component:Log
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
  ]
})
