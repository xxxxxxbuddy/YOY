import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'
import { Loading } from 'element-ui';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/BuyTicket',
      name: 'BuyTicket',
      component: resolve => require(['../views/buy/BuyTicket.vue'], resolve)
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: resolve => require(['../views/buy/confirm.vue'], resolve)
    },
    {
      path: '/payment',
      name: 'payment',
      component: resolve => require(['../views/buy/payment.vue'], resolve)
    },
    {
      path: '/VisitorLogin',
      name: 'VisitorLogin',
      component: resolve => require(['../views/visit/login.vue'], resolve)
    },
    {
      path: '/Visit',
      name: 'Visit',
      component: resolve => require(['../views/visit/Visit.vue'], resolve)
    },
    {
      path: '/Route',
      name: 'Route',
      component: resolve => require(['../views/visit/Route.vue'], resolve)
    },
    {
      path: '/Team',
      name: 'Team',
      component: resolve => require(['../views/visit/Team.vue'], resolve)
    }
  ]
})
router.beforeEach((to, from, next) => {
  let loadingInstance = Loading.service();
  next();
})

router.afterEach((to, from) => {
  let loadingInstance = Loading.service();
  loadingInstance.close();
})

export default router;
