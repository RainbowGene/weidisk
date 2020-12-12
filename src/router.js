import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const router = new Router({
  routes: [{
    path: "/login",
    name: 'login',
    mate: {
      title: '登录页'
    },
    component: () => import('./pages/login.vue')
  }, {
    path: "/",
    name: 'layout',
    redirect: { name: 'index' },
    component: () => import('./pages/layout.vue'),
    children: [{
      path: '/index', name: 'index', component: () => import('./pages/template/index.vue')
    }]
  }]
})

// 路由守卫：权限验证
router.beforeEach((to, from, next) => {
  // 获取token
  let token = window.localStorage.getItem('token')
  let user = window.localStorage.getItem('user')
  if (token && user) { // 已登录
    if (to.path === '/login') {
      Vue.prototype.$Message.error('请勿重复登录')
      return next({ name: from.name ? from.name : 'index' })
    }
    next()
  } else { // 未登录
    if (to.path === '/login') return next()
    Vue.prototype.$Message.error('请先登录')
    next({ name: 'login' })
  }
})

export default router

