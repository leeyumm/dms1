import Vue from 'vue'
import App from './App.vue'
import router from './router'

import utils from '@/utils/util'
import http from '@/api/data-http'
import filters from '@/global/filters'

import './css/dms.css'
import './css/remove-default.css'
import './css/box.css'
import './css/button.css'
import './css/flex.css'
import './css/badge.css'
import './css/table.css'
import './css/animation.css'
import './css/bg-color.css'
import './css/text.css'
import './css/form.css'

import 'font-awesome/css/font-awesome.css'


Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.prototype.$http = http
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key,filters[key])
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
