import Vue from 'vue'
import Router from 'vue-router'
import {
  BASE_URL
} from '@/config/baseURL';

import BLOG from './blog/index.js'
import About from '@/router/about'
import Login from '@/router/login'
import SignUp from '@/router/signup'
import NotFound from './404.js'
import Ganhuo from '@/router/ganhuo'

Vue.use(Router)

const routes = [{
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
];
const router = new Router({
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
  routes
})
router.beforeEach((to, from, next) => {
  let meta = to.meta;
  window.document.title = (meta.title || '') + "-" + window.document.title;
  // 用户时效验证
  router.app.$axios.post(BASE_URL + "/auth")
    .then(({
      data
    }) => {
      if (data.auth.status) {
        router.app.$store.state.isLogin = true;
        router.app.$store.state.userInfo = data.auth.info.user;
      } else {
        router.app.$store.state.isLogin = false;
        router.app.$store.state.userInfo = {};
      }

      if (meta.checkAuth) {
        setTimeout(() => {
          router.app.$store.commit('changeWaitAniStatus', false)
        }, 1000)
        if (!router.app.$store.state.isLogin) {

          router.push("/login");

        }

      }
      next();
    });

});
router.afterEach((to, from) => {
  router.app.$store.commit('changeMenuDisplayStatus', false);
})
export default router;