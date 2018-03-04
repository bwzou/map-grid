import Vue from 'vue'
import Router from 'vue-router'
import Device from '../uilayout/router'
import MainLayout from '../uilayout/MainLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout
    },
    Device
  ]
})
