/*
 * @Date: 2020-06-09 14:08:35
 * @LastEditors: songlin
 * @LastEditTime: 2020-06-09 15:31:27
 * @FilePath: \d2-crud\test.js
 */
import Vue from 'vue'
import App from './app.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import crud from "./index.js"

Vue.use(ElementUI)
Vue.use(crud)

new Vue({
  render: h => h(App)
}).$mount('#app')
