import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)

Vue.use(VueAxios, axios, moment)

//时间格式化
Vue.prototype.moment = moment
//时间格式化过滤器
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dateStr).format(pattern)
})
// import VueResource from 'vue-resource';
// Vue.use(VueResource);

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(Antd)

// Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
