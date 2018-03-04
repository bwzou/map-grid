// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Mint)

// Compatible with vue-resource
Vue.prototype.$http = axios

// Compatible with vue 1.0 message bus
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
