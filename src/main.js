import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import Axios from "axios";
import VueQrcode from '@chenfengyuan/vue-qrcode';
import progressive from "progressive-image/dist/vue";
import commonFn from '@/util/utils.js'
import Highlight from '@/util/highlight';
import VueLazyload from 'vue-lazyload';
import {
  BASE_URL
} from '@/config/baseURL';
import '@/util/rem';

Vue.use(VueLazyload);
Vue.config.productionTip = true;
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(Highlight);


Axios.defaults.baseURL = BASE_URL;
Axios.defaults.withCredentials = true;
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.prototype.commonFn = commonFn;
Vue.prototype.$axios = Axios;

router.beforeEach((to, from, next) => {

  let _store = store;
  window.document.title = (to.meta.title || '') + "-" + window.document.title;
  let notshow = to.meta.notshow;
  notshow
    ?
    notshow.loading ?
    (store.state.isLoading = false) :
    (store.state.isLoading = true) :
    "";
  // 用户时效验证
  Axios.post(BASE_URL + "/auth").then(({
    data
  }) => {
    next();
    console.log("auth");
    if (data.auth.status) {
      _store.state.isLogin = true;
      _store.state.userInfo = data.auth.info.user;
      return;
    }

    _store.state.isLogin = false;
    _store.state.userInfo = {};
  });

});
//定义一个请求拦截器
Axios.interceptors.request.use(function (config) {
  if (config.url === BASE_URL + "/auth") return config;
  store.dispatch("showloader");
  if ((config.data && config.data.isGlobalLoading === false) || (config.params && config.params.isGlobalLoading === false)) {
    store.state.loading.isLoading = false;
  } else {
    let notshow = vm.$route.meta.notshow;
    if (notshow) {
      notshow.loading ?
        (store.state.loading.isLoading = false) :
        (store.state.loading.isLoading = true);
    } else {
      store.state.loading.isLoading = true;
    }
  }

  return config;
});
//定义一个响应拦截器
Axios.interceptors.response.use(function (config) {
  store.dispatch("hideloader");
  store.state.loading.isLoading = false;
  let data = config.data;
  if (data.status === -9) {
    /* router.replace({
      path: "login",
      query: {
        redirect: router.currentRoute.fullPath
      }
    }); */
    router.push("/login")
  }

  return config;
});
Vue.use(progressive, {
  removePreview: true,
  scale: true
});
const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");