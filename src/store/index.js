import Vue from 'vue'
import Vuex from 'vuex'

/* 全局Loading模块 */
import ModuleLoading from './modules/loading'
import {
  USERINFO_UPDATE,
  IS_LOGIN,
  NAVLIST_UPDATE,
  MENU_DISPLAY_STATUS_CHANGE
} from './mutation-types';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {},
    isWaitAni: false,
    isShowMenu: false,
    navList: []
  },
  mutations: {
    [USERINFO_UPDATE](state, options) {
      state.userInfo = options;
    },
    [IS_LOGIN](state, s) {
      state.isLogin = s;
    },
    [MENU_DISPLAY_STATUS_CHANGE](state, value) {
      state.isShowMenu = value || !state.isShowMenu;
    },
    [NAVLIST_UPDATE](state, value) {
      state.navList = value;
    },
    changeWaitAniStatus(state, tf) {
      state.isWaitAni = tf;
    }
  },
  getters: {},
  actions: {

  },
  modules: {
    loading: ModuleLoading
  }
})