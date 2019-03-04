import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import BLOG from './blog/index.js'
import Blank from '../views/blog/Blank.vue'
import aaaa from '../views/a'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    // 如果你的連結是帶 # 這種
    // to.hash 就會有值(值就是連結)
    // 例如 #3
    if (to.hash) {
      return {
        // 這個是透過 to.hash 的值來找到對應的元素
        // 照你的 html 來看是不用多加處理這樣就可以了
        // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
        selector: to.hash
      }
    }
  },
  routes: [{
      path: '/',
      meta: {
        title: "YANSK'S BLOG",
        notshow: {
          loading: true
        }
      },
      redirect: '/blog'
    },
    BLOG,
    {
      path: '/a',
      component: aaaa
    },
    {
      path: '/blank',
      name: '空白页',
      component: Blank
    }, {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登陆'
      },
      component: Login
    }
  ]
})