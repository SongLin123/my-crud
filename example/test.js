/*
 * @Date: 2020-06-09 14:08:35
 * @LastEditors: songlin
 * @LastEditTime: 2020-08-07 14:56:40
 * @FilePath: \my-crud\example\test.js
 */
import Vue from 'vue'
import App from './app.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import crud from "../index.js"

Vue.use(ElementUI)
Vue.use(crud)

new Vue({
  render: h => h(App)
}).$mount('#app')
