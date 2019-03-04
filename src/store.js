import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const SHOWLOADING = 'SHOWLOADING';
const HIDELOADING = 'HIDELOADING';
export default new Vuex.Store({
  state: {
    showLoading: false,
    isLoading: false,
    isLogin: false,
    userInfo: {}
  },
  mutations: {
    SHOWLOADING(state) {
      state.showLoading = true;
    },
    HIDELOADING(state) {
      state.showLoading = false;
    }
  },
  getters: {
    showLoading(state) {
      return state.showLoading
    }
  },
  actions: {
    showloader: ({
      commit
    }) => {
      commit(SHOWLOADING)
    },
    hideloader: ({
      commit
    }) => {
      commit(HIDELOADING)
    }
  }
})