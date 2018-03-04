let MainLayout = resolve => {
  require.ensure(['./MainLayout.vue'], () => {
    resolve(require('./MainLayout.vue'))
  })
}

let Where = resolve => {
  require.ensure(['./Where.vue'], () => {
    resolve(require('./Where.vue'))
  })
}

let Journey = resolve => {
  require.ensure(['./Journey.vue'], () => {
    resolve(require('./Journey.vue'))
  })
}

let Account = resolve => {
  require.ensure(['./Account.vue'], () => {
    resolve(require('./Account.vue'))
  })
}

export default {
  path: '/mainlayout',
  name: 'MainLayout',
  component: MainLayout,
  beforeEnter (to, from, next) {
    if (/mainlayout\/?$/.test(to.path)) {
      next({path: '/mainlayout/where'})
      return;
    }
    next()
  },
  redirect: '/mainlayout/where',
  children: [
    {
      path: 'where',
      name: 'Where',
      component: Where,
      meta: {
        title: '哪儿'
      }
    },
    {
      path: 'journey',
      name: 'Journey',
      component: Journey,
      meta: {
        title: '拼途'
      }
    },
    {
      path: 'account',
      name: 'Account',
      component: Account,
      meta: {
        title: '我的'
      }
    }
  ]
}
