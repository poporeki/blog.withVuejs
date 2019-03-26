const SHOW_LOADING = 'SHOW_LOADING';
const HIDE_LOADING = 'HIDE_LOADING';


const state = {
  showLoading: false,
  isLoading: false,
  isLogin: false
}

const mutations = {
  SHOW_LOADING(state) {
    state.showLoading = true;
  },
  HIDE_LOADING(state) {
    state.showLoading = false;
  }
}
const getters = {
  showLoading(state) {
    return state.showLoading
  }
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
  state,
  mutations,
  getters,
  actions
}