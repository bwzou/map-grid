// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Mint);

// Compatible with vue-resource
Vue.prototype.$http = axios;

// Compatible with vue 1.0 message bus
Vue.prototype.$bus = new Vue();

// 获取屏幕宽高
function getScreenSize() {
  return {
    width:window.screen.width,
    height:window.screen.height
  }

}

// 判断使用终端
function IsPC(){
  let userAgentInfo = navigator.userAgent;
  let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
  }
  return flag;
}

// Vuex配置
const store = new Vuex.Store({
  state: {
    screenSize: {
      width: null,
      height: null
    },
    server : 'http://120.79.214.239',
  },
  mutations: {
    //更新屏幕信息
    updateScreenSize(state, newSize) {
      state.screenSize = newSize;
    }
  }
});

new Vue({
  el: '#app',
  router,
  store,
  created(){
    const size = getScreenSize();
    this.$store.commit('updateScreenSize', size);
  },
  mounted(){

  },
  components: { App },
  template: '<App/>'
})
