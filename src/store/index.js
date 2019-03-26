import Vue from 'vue'
import Vuex from 'vuex'

/* 全局Loading模块 */
import ModuleLoading from './modules/loading'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    showLoading: false,
    isLoading: false
  },
  mutations: {

  },
  getters: {

  },
  actions: {

  },
  modules: {
    loading: ModuleLoading
  }
})