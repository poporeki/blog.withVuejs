import Vue from 'vue'
import Router from 'vue-router'

import BLOG from './blog/index.js'
import About from '@/router/about'
import Login from '@/router/login'
import SignUp from '@/router/signup'
import NotFound from './404.js'
import Ganhuo from '@/router/ganhuo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.hash) {
        return {
          selector: to.hash
        }
      }
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
      path: '/',
      meta: {
        notshow: {
          loading: true
        }
      },
      redirect: '/blog'
    },
    BLOG,
    Login,
    SignUp,
    NotFound,
    Ganhuo,
    About
  ]
})