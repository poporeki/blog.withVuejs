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
  let meta = to.meta;
  window.document.title = (meta.title || '') + "-" + window.document.title;
  // 用户时效验证
  Axios.post(BASE_URL + "/auth")
    .then(({
      data
    }) => {
      if (data.auth.status) {
        store.state.isLogin = true;
        store.state.userInfo = data.auth.info.user;
      } else {
        store.state.isLogin = false;
        store.state.userInfo = {};
      }

      if (meta.checkAuth) {
        setTimeout(() => {
          store.commit('changeWaitAniStatus', false)
        }, 1000)
        if (!store.state.isLogin) {

          router.push("/login");

        }

      }
      next();
    });

});
//定义一个请求拦截器
Axios.interceptors.request.use(function (config) {
  if (config.url === BASE_URL + "/auth") return config;
  store.commit("loading/loading_show");
  return config;
});
//定义一个响应拦截器
Axios.interceptors.response.use(function (config) {
  store.commit("loading/loading_hide");
  store.state.loading.isLoading = false;
  let data = config.data;
  if (data.status === -9) {
    router.push("/login")
  }

  return config;
});
Vue.use(progressive, {
  removePreview: true,
  scale: true
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");