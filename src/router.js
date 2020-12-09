import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
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