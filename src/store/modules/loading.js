const SHOW_LOADING = 'loading_show';
const HIDE_LOADING = 'loading_hide';


const state = {
  showLoading: false,
  isLoading: false,
  isLogin: false
}

const mutations = {
  [SHOW_LOADING](state) {
    state.showLoading = true;
  },
  [HIDE_LOADING](state) {
    state.showLoading = false;
  }
}
const getters = {

}
const actions = {

  showloader: ({
    commit
  }) => {
    commit(SHOW_LOADING)
  },
  hideloader: ({
    commit
  }) => {
    commit(HIDE_LOADING)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}