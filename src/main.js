import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import Axios from "./config/axios";
import VueQrcode from '@chenfengyuan/vue-qrcode';
import progressive from "progressive-image/dist/vue";
import commonFn from '@/util/utils.js'
import Highlight from '@/util/highlight';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload);
Vue.config.productionTip = true;
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(Highlight);

Vue.prototype.commonFn = commonFn;
Vue.prototype.$axios = Axios;

Vue.use(progressive, {
  removePreview: true,
  scale: true
});
new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount("#app");