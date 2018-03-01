import Vue from 'vue'
import Router from 'vue-router'
import Footprint from '@/uilayout/Footprint'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Footprint',
      component: Footprint
    }
  ]
})
