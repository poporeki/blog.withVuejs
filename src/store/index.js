import Vue from 'vue'
import Vuex from 'vuex'

/* 全局Loading模块 */
import ModuleLoading from './modules/loading'
import {
  UPDATE_USERINFO,
  IS_LOGIN
} from './mutation-types';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {},
    showLoading: false,
    isLoading: false,
    isWaitAni: false
  },
  mutations: {
    [UPDATE_USERINFO](state, options) {
      state.userInfo = options;
    },
    [IS_LOGIN](state, s) {
      state.isLogin = s;
    },
    changeWaitAniStatus(state, tf) {
      state.isWaitAni = tf;
    }
  },
  getters: {
    user(state) {
      return state.userInfo
    },
    isWaitAni(state) {
      return state.isWaitAni
    }
  },
  actions: {

  },
  modules: {
    loading: ModuleLoading
  }
})