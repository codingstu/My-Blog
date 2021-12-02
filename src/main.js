import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// import VueResource from 'vue-resource';
// Vue.use(VueResource);

Vue.config.productionTip = false

Vue.use(Antd)

// Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
