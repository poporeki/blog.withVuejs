import Axios from 'axios';
import router from '../router'
import store from '../store'
import {
  BASE_URL
} from '@/config/baseURL';

Axios.defaults.baseURL = BASE_URL;
Axios.defaults.withCredentials = true;
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

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

export default Axios;