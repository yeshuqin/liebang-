import Vue from 'vue'

import 'normalize.css/normalize.css'
import http from '@/utils/request'
import api from '@/utils/api'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

Vue.prototype.$http = http
Vue.prototype.$api = api

console.log(http, 'http')
console.log(api, 'api')

import '@/icons'
// import '@/permission'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
